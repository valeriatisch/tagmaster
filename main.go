package main

import (
	"github.com/valeriatisch/tagmaster/auth"
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
	"net/http"
)



func main() {
	db, err := gorm.Open("postgres", "host=localhost port=5432 user=felix dbname=felix sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
  	defer db.Close()

  	db.AutoMigrate(&models.User{})

	r := gin.Default()
	r.Use(sessions.Sessions("tagmaster", cookie.NewStore([]byte("secret"))))
	r.Use(func(ctx *gin.Context) {
		ctx.Set("db", db)
	})

	r.POST("/register", auth.Register)
	r.POST("/login", auth.Login)
	r.GET("/logout", auth.Logout)
	
	api := r.Group("/api")
	api.Use(auth.Middleware)
	api.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello",
		})
	})

	r.Run()
}

