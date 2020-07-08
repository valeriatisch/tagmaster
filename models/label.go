package models

import (
	"github.com/jinzhu/gorm"
)

type Label struct {
	gorm.Model
	Name string
	Topright uint
	Topleft uint
	Bottomright uint
	Bottomleft uint
	ImageID uint
}

func (label *Label) Id() uint {
	return label.Model.ID
}