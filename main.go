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
	router := MakeEngine()	
	router.Run()
}

func MakeEngine() *gin.Engine {
	db, err := gorm.Open("postgres", "host=localhost port=5432 user=felix dbname=felix sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
  	//defer db.Close()

  	db.AutoMigrate(&models.User{})

	r := gin.Default()
	r.Use(sessions.Sessions("session", cookie.NewStore([]byte("secret"))))

	provider := auth.AuthProvider{ Database: db }
	r.Use(func(c *gin.Context) {
		c.Set("auth", provider)
		//c.Set("db", db)
	})

	user := r.Group("/auth")
	user.GET( "/logout",   auth.Logout)
	user.POST("/register", auth.Register)
	user.POST("/login",    auth.Login)
	
	api := r.Group("/api")
	api.Use(auth.Middleware)
	api.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "hello",
		})
	})

	api.GET("/whoami", func(c *gin.Context) {
		user := auth.GetUser(c)
		c.JSON(http.StatusOK, gin.H{
			"email": user.Email,
		})
	})

	return r
}

