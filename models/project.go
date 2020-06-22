package models

import (
	"github.com/jinzhu/gorm"
)

type Project struct {
	gorm.Model
	Name string
	UserID uint
	Images []Image
}

func (project *Project) Id() uint {
	return project.Model.ID
}