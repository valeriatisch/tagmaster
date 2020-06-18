package application

import (
	"net/http"
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"log"
)

const (
	userkey = "user"
	difficulty = 10
)

// These fields must be exported for bindJSON to find them
type Credentials struct {
	Email    string `json:"email"    binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (app *App) register(c *gin.Context) {
	var credentials Credentials

	session := sessions.Default(c)
	db := app.database

	if err := c.ShouldBindJSON(&credentials); err != nil {
		abortRequest(c, errorMissingCredentials)
		return
	}

	email := credentials.Email
	password := credentials.Password

	log.Printf("Register email=%s, password=%s\n", email, password)

	//TODO: validate email + password

	bytes, _ := bcrypt.GenerateFromPassword([]byte(password), difficulty)
	user := models.User{Email: email, Password: string(bytes)}

	if err := db.Create(&user).Error; err != nil {
		//TODO: Check if duplicate or something else
		abortRequest(c, errorFailedToCreateUser)
		return
	}

	session.Set(userkey, user.Id())

	if err := session.Save(); err != nil {
		abortRequest(c, err)
		return
	}

	c.Status(http.StatusOK)
}

func (app *App) login(c *gin.Context) {
	var (
		credentials Credentials
		user models.User
	)

	session := sessions.Default(c)
	db := app.database

	if err := c.ShouldBindJSON(&credentials); err != nil {
		abortRequest(c, errorMissingCredentials)
		return
	}

	email := credentials.Email
	password := credentials.Password

	//TODO: validate email + password

	res := db.Where(&models.User{Email: email}).First(&user)
	if res.Error != nil {
		abortRequest(c, errorNotRegistered)
		return
	}

	hash := user.Password
	err  := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	if err != nil {
		abortRequest(c, errorAuthenticationFailed)
		return
	}

	session.Set(userkey, user.Id())

	if err := session.Save(); err != nil {
		abortRequest(c, err)
		return
	}

	c.Status(http.StatusOK)
}

func (app *App) logout(c *gin.Context) {
	session := sessions.Default(c)
	uid := session.Get(userkey)

	if uid == nil {
		abortRequest(c, errorNotLoggedIn)
		return
	}

	session.Delete(userkey)

	if err := session.Save(); err != nil {
		abortRequest(c, err)
		return
	}

	c.Status(http.StatusOK)
}
