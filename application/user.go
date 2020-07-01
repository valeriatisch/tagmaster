package application

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"errors"
	"net/http"
	"log"
)

type UserJSON struct {
	Email    string `json:"email"    binding:"required,email"`
	First    string `json:"first"    binding:"required,min=2"`
	Last     string `json:"last"     binding:"required,min=2"`
	Password string `json:"password" binding:"required,min=8"`
}

func (app *App) userCreate(c *gin.Context) {
	// session := sessions.Default(c)
	db := app.database

	var json UserJSON
	if err := c.ShouldBindJSON(&json); err != nil {
		abortRequest(c, errorMissingCredentials)
		return
	}

	bytes, _ := bcrypt.GenerateFromPassword([]byte(json.Password), 10)

	user := models.User{
		Email: json.Email,
		First: json.First,
		Last: json.Last,
		Password: string(bytes),
	}

	if err := db.Create(&user).Error; err != nil {
		//TODO: Check if duplicate or something else
		abortRequest(c, errorFailedToCreateUser)
		return
	}

	// session.Set(userkey, user.Id())

	// if err := session.Save(); err != nil {
	// 	abortRequest(c, err)
	// 	return
	// }

	responseOK(c)
}

func (app *App) userRead(c *gin.Context) {
	user, err := app.getUser(c)
	if err != nil {
		abortRequest(c, errorUnauthorized)
		return
	}

	json := gin.H{
		"id": user.Id(),
		"email": user.Email,
		"first": user.First,
		"last": user.Last,
	}

	c.JSON(http.StatusOK, json)
}

func (app *App) userUpdate(c *gin.Context) {
	user, err := app.getUser(c)
	if err != nil {
		abortRequest(c, errorUnauthorized)
		return
	}

	var json UserJSON
	if err := c.ShouldBindJSON(&json); err != nil {
		abortRequest(c, errorMissingCredentials)
		return
	}

	if !checkPassword(user.Password, json.Password) {
		abortRequest(c, errorUnauthorized)
		log.Println(json.Password)
		return
	}

	user.Email = json.Email
	user.First = json.First
	user.Last  = json.Last

	app.database.Save(user)

	responseOK(c)	
}

func (app *App) userDelete(c *gin.Context) {
	user, err := app.getUser(c)
	if err != nil {
		abortRequest(c, errorUnauthorized)
		return
	}

	err = app.database.Delete(user).Error
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	sessions.Default(c).Delete(userkey)

	responseOK(c)
}

func (app *App) getUser(c *gin.Context) (*models.User, error) {
	var user models.User

	session := sessions.Default(c)
	db := app.database

	val := session.Get(userkey)
	if val == nil {
		return nil, errors.New("No valid session")
	}

	uid, ok := val.(uint)
	if !ok {
		return nil, errors.New("User id is not uint")
	}

	err := db.Take(&user, uid).Error

	return &user, err
}