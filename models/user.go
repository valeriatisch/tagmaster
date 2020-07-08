package models

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Email    string `gorm:"type:varchar(100);unique_index"`
	First    string
	Last     string
	Password string
	Projects []Project
}

func (user *User) Id() uint {
	return user.Model.ID
}

func (user *User) BeforeDelete(tx *gorm.DB) error {
	var projects []Project
	tx.Model(user).Related(&projects)

	for _, p := range projects {
		tx.Delete(&p)
	}

	return nil
}
