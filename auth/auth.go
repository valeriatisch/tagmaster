package auth

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/sessions"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"log"
)

const (
	userkey = "user"
)

func Middleware(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get(userkey)
	if user == nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "Unauthorized",
		})
	}
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	return string(bytes), err
}

func checkPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}


func Register(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	session := sessions.Default(c)

	email := c.PostForm("email")
	password := c.PostForm("password")

	hash, _ := hashPassword(password)

	err := db.Create(&models.User{
		Email: email,
		Password: hash,
	}).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create",
		})
		log.Println(err)
		return
	}

	session.Set(userkey, email)
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save session",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func Login(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	session := sessions.Default(c)
	email := c.PostForm("email")
	password := c.PostForm("password")

	var user models.User
	err := db.Where(&models.User{Email: email}).First(&user).Error
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "User not found",
		})
		return
	}

	if !checkPassword(password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Incorrect Credentials",
		})
		return
	}

	session.Set(userkey, email)
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
			"error": "Invalid session",
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