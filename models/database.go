package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
)

type Database struct {
	*gorm.DB
}

func NewDatabase(uri string) *Database {
	db, err := gorm.Open("postgres", uri)
	if err != nil {
		log.Fatal(err)
	}

	db.AutoMigrate(&User{})
	db.AutoMigrate(&Project{})
	db.AutoMigrate(&Image{})

	return &Database{db}
}