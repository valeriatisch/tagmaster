package auth

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

const (
	difficulty = 10
)

type AuthProvider struct {
	Database *gorm.DB
}

func (a AuthProvider) Get(uid uint) (models.User, error) {
	var user models.User

	res := a.Database.Where(&models.User{Model: gorm.Model{ ID: uid }})
	err := res.First(&user).Error

	return user, err
}

func (a AuthProvider) Register(c Credentials) (uint, error) {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(c.Password), 10)

	hash := string(bytes)
	user := models.User{ Email: c.Email, Password: hash }

	uid := user.Model.ID

	return uid, a.Database.Create(&user).Error
}

func (a AuthProvider) Authenticate(c Credentials) (uint, bool) {
	res := a.Database.Where(&models.User{ Email: c.Email })

	var user models.User
	if res.First(&user).Error != nil {
		return 0, false
	}

	uid  := user.Model.ID
	hash := user.Password
	pass := c.Password
	err  := bcrypt.CompareHashAndPassword([]byte(hash), []byte(pass))

	return uid, err == nil
}

