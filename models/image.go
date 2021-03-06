package models

import (
	"github.com/jinzhu/gorm"
	"time"
)

const urlPrefix = "https://sksy-tagmaster.appspot.com.storage.googleapis.com/"

type Image struct {
	gorm.Model
	UUID      string
	Name      string
	Done      bool
	ProjectID uint
	Labels    []Label
	LastServed time.Time
}

func (img *Image) Id() uint {
	return img.Model.ID
}

func (img *Image) PublicURL() string {
	return urlPrefix + img.UUID
}
