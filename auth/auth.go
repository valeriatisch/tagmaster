package auth

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/sessions"
	"net/http"
)

const (
	userkey = "user"
	authkey = "auth"
)

type Credentials struct {
	Email    string `json:"email"    binding:"required"`
	Password string `json:"password" binding:"required"`
}

type Authenticator interface {
	Authenticate(c Credentials) (uint, bool)
	Get(uid uint)               (models.User, error)
	Register(c Credentials)     (uint, error)	
}

func Middleware(c *gin.Context) {
	session := sessions.Default(c)
	uid    := session.Get(userkey)

	if uid == nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
	}
}

func Register(c *gin.Context) {

	a       := c.MustGet(authkey).(Authenticator)
	session := sessions.Default(c)

	var cred Credentials

	if err := c.ShouldBindJSON(&cred); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Missing credentials",
		})
		return
	}

	uid, err := a.Register(cred)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create user",
		})
		return
	}

	session.Set(userkey, uid)

	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save session",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func Login(c *gin.Context) {

	a       := c.MustGet(authkey).(Authenticator)
	session := sessions.Default(c)

	var cred Credentials
	
	if err := c.ShouldBindJSON(&cred); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Missing credentials",
		})
		return
	}

	uid, ok := a.Authenticate(cred)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Wrong Credentials",
		})
		return
	}

	session.Set(userkey, uid)

	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save session",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func Logout(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get(userkey)
	if user == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No valid session",
		})
		return
	}
	session.Delete(userkey)
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save session",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}



func GetUser(c *gin.Context) models.User {
	a       := c.MustGet(authkey).(Authenticator)
	session := sessions.Default(c)
	uid, ok := session.Get(userkey).(uint)
	if !ok {
		panic("cannot get userid")
	}

	user, err := a.Get(uid)
	if err != nil {
		panic(err)
	}

	return user
}