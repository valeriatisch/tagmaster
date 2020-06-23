package models

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Email    string `gorm:"type:varchar(100);unique_index"`
	Password string `gorm:"size:255;not null"`
	Projects []Project
}

func (user *User) Id() uint {
	return user.Model.ID
}

func (user *User) BeforeDelete(tx *gorm.DB) error {
	// Cascading delete of associated images.
	// We use this instead of a foreign key constraint,
	// because this only soft-deletes things
	return tx.Where(&Project{
		UserID: user.Id(),
	}).Delete(Project{}).Error
}
