package application

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"math/rand"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"errors"
	"net/http"
	"log"
	"time"
)

const userkey = "user"

type CredentialsJSON struct {
	Email    string `json:"email"    binding:"email"`
	Password string `json:"password" binding:"min=8,max=20"`
}

type UserJSON struct {
	Email    string `json:"email"    binding:"email"`
	First    string `json:"first"    binding:"min=2,max=20"`
	Last     string `json:"last"     binding:"min=2,max=20"`
	Password string `json:"password" binding:"min=8,max=20"`
}

type UpdateUserJSON struct {
	Email    string `json:"email"    binding:"omitempty,email"`
	First    string `json:"first"    binding:"omitempty,min=2,max=20"`
	Last     string `json:"last"     binding:"omitempty,min=2,max=20"`
	Password string `json:"password" binding:"omitempty,min=8,max=20"`
}

type EmailJSON struct {
	Email    string `json:"email"    binding:"email"`
}

func (app *App) userLogin(c *gin.Context) {
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

func (app *App) userLogout(c *gin.Context) {
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

func (app *App) userCreate(c *gin.Context) {
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

	var json UpdateUserJSON
	if err := c.ShouldBindJSON(&json); err != nil {
		abortRequest(c, errorBadRequest)
		return
	}

	// Make sure email is unique
	if json.Email != "" {
		user.Email = json.Email
		var users []models.User
		res := app.database.Where(models.User{Email: json.Email}).Find(&users)
		if res.Error != nil {
			abortRequest(c, errorInternal)
			return
		}

		for _, u := range users {
			if u.Id() == user.Id() {
				continue
			}

			abortRequest(c, errorEmailNotUnique)
			return
		}
	}

	if json.First != "" {
		user.First = json.First
	}

	if json.Last != "" {
		user.Last  = json.Last
	}
	
	if json.Password != "" {
		user.Password = hashPassword(json.Password)
	}

	if err := app.database.Save(user).Error; err != nil {
		abortRequest(c, errorInternal)
		return
	}

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

func (app *App) sendPassword(c *gin.Context) {
	var (
		json EmailJSON
		user models.User
	)

	db := app.database

	if err := c.ShouldBindJSON(&json); err != nil {
		abortRequest(c, errorBadRequest)
		return
	}

	email := json.Email

	res := db.Where(&models.User{Email: email}).First(&user)
	if res.Error != nil {
		abortRequest(c, errorNotRegistered)
		return
	}

	password := generatePassword()
	hash := hashPassword(password)

	db.Model(&user).Update("password", hash)

	from := mail.NewEmail("Tagmaster", "no-reply@tagmaster.ml")
	to := mail.NewEmail("Tagmaster User", email)
	subject := "Tagmaster password update"
	plainTextContent := "Your new password is " + password
	htmlContent := "<strong>Your new password is " + password + "</strong>"
	msg := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	client := sendgrid.NewSendClient(app.config.SENDGRID_API_KEY)
	_, err := client.Send(msg)
	if err != nil {
		log.Println(err)
	}

	responseOK(c)
}

func generatePassword() string {
	rand.Seed(time.Now().UnixNano())
	digits := "0123456789"
	specials := "~=+%^*/()[]{}/!@#$?|"
	all := "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"abcdefghijklmnopqrstuvwxyz" +
		digits + specials
	length := 10
	buf := make([]byte, length)
	buf[0] = digits[rand.Intn(len(digits))]
	buf[1] = specials[rand.Intn(len(specials))]
	for i := 2; i < length; i++ {
		buf[i] = all[rand.Intn(len(all))]
	}
	rand.Shuffle(len(buf), func(i, j int) {
		buf[i], buf[j] = buf[j], buf[i]
	})

	return string(buf)
}


func hashPassword(pw string) string {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(pw), 10)
	return string(bytes)
}

func checkPassword(hash, pw string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(pw))
	return err == nil
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