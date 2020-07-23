package models

import (
	"github.com/jinzhu/gorm"
)

type Label struct {
	gorm.Model
	Name string
	X1 uint
	Y1 uint
	X2 uint
	Y2 uint
	ImageID uint
}
