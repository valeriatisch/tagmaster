package models

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Image struct {
	gorm.Model
	UUID string
	Name string
	Done bool
	ProjectID uint
	LastServed time.Time
}

func (img *Image) Id() uint {
	return img.Model.ID
}
