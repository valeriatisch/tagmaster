package models

import (
	"github.com/jinzhu/gorm"
)

type Image struct {
	gorm.Model
	UUID string
	Name string
	Done bool
	ProjectID uint
	label Label
}

func (img *Image) Id() uint {
	return img.Model.ID
}
