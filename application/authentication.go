package application

import (
	"errors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"github.com/valeriatisch/tagmaster/models"
	"golang.org/x/crypto/bcrypt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"
)

const (
	userkey    = "user"
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
		user        models.User
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
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	if err != nil {
		log.Println("falsches passwort")
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

func (app *App) getUser(c *gin.Context) (*models.User, error) {
	var user models.User

	session := sessions.Default(c)
	db := app.database

	val := session.Get(userkey)
	if val == nil {
		return nil, errors.New("no valid session")
	}

	uid, ok := val.(uint)
	if !ok {
		return nil, errors.New("user id is not uint")
	}

	err := db.Take(&user, uid).Error

	return &user, err
}

func (app *App) sendPassword(c *gin.Context) {
	var (
		credentials Credentials
		user        models.User
	)

	session := sessions.Default(c)
	db := app.database

	_ = c.ShouldBindJSON(&credentials)

	email := credentials.Email

	res := db.Where(&models.User{Email: email}).First(&user)
	if res.Error != nil {
		abortRequest(c, errorNotRegistered)
		return
	}

	password := generatePassword()
	bytes, _ := bcrypt.GenerateFromPassword([]byte(password), difficulty)

	db.Model(&user).Update("password", string(bytes))

	from := mail.NewEmail("Tagmaster", "not-reply@tagmaster.ml")
	to := mail.NewEmail("Tagmaster User", email)
	subject := "Tagmaster password update"
	plainTextContent := "Your new password is " + password
	htmlContent := "<strong>Your new password is " + password + "</strong>"
	msg := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(msg)
	if err != nil {
		log.Println(err)
	} else {
		log.Println(response.StatusCode)
		log.Print(response.Body)
		log.Println(response.Headers)
	}

	session.Set(userkey, user.Id())

	if err := session.Save(); err != nil {
		abortRequest(c, err)
		return
	}

	c.Status(http.StatusOK)

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
