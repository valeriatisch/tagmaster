package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
)

type Database struct {
	*gorm.DB
}

func NewDatabase() *Database {
	db, err := gorm.Open("postgres", "host=localhost port=5432 user=felix dbname=felix sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}

	db.AutoMigrate(&User{})

	return &Database{db}
}