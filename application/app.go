package application

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-gonic/gin"
	"github.com/valeriatisch/tagmaster/middleware"
)

type App struct {
	Database *models.Database
}

func NewApp() *App {
	return &App{Database: models.NewDatabase()}
}

func (app *App) Run() {
	router := gin.Default()
	router.Use(middleware.Session())

	// Authorization route handlers
	auth := router.Group("/auth")
	auth.POST("/login", app.login)
	auth.POST("/register", app.register)
	auth.GET("/logout", app.logout)

	// API route handlers
	api := router.Group("/api")
	api.GET("/hello", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hi",
		})
	})
	
	router.Static("/static", "./static/build")
	router.NoRoute(app.index)

	router.Run()
}
