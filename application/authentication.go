package application

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

const (
	userkey = "user"
)

// These fields must be exported for bindJSON to find them
type CredentialsJSON struct {
	Email    string `json:"email"    binding:"required"`
	Password string `json:"password" binding:"required"`
}

type PasswordUpdateJSON struct {
	Old string `json:"old_password" binding:"required"`
	New string `json:"new_password" binding:"required,min=8"`
}


func (app *App) authLogin(c *gin.Context) {
	var (
		credentials CredentialsJSON
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

	responseOK(c)
}

func (app *App) authLogout(c *gin.Context) {
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

	responseOK(c)
}

func (app *App) authUpdate(c *gin.Context) {
	user, err := app.getUser(c)
	if err != nil {
		abortRequest(c, errorUnauthorized)
		return
	}

	var json PasswordUpdateJSON
	if err := c.ShouldBindJSON(&json); err != nil {
		abortRequest(c, errorBadRequest)
		return
	}

	if !checkPassword(user.Password, json.Old) {
		abortRequest(c, errorUnauthorized)
		return
	}

	user.Password = hashPassword(json.New)
	app.database.Save(user)

	responseOK(c)
}

func (app *App) authReset(c *gin.Context) {

}

func hashPassword(pw string) string {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(pw), 10)
	return string(bytes)
}

func checkPassword(hash, pw string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(pw))
	return err == nil
}
