package models

import (
	"github.com/jinzhu/gorm"
)

type Label struct {
	gorm.Model
	LabelName   string
	Topright    uint
	Topleft     uint
	Bottomright uint
	Bottomleft  uint
	ImageID     uint
}
