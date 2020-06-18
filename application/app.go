package application

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-gonic/gin"
	"github.com/valeriatisch/tagmaster/middleware"
)

type App struct {
	database *models.Database
	config config
}

func NewApp() *App {
	conf := loadConfig()
	db := models.NewDatabase(conf.databaseURI)

	return &App{
		database: db,
		config: conf,
	}
}

func (app *App) Run() {
	router := gin.Default()

	router.Use(middleware.Session(app.config.sessionSecret))

	api := router.Group("/api")	
	api.POST(	"/login",	app.login)
	api.POST(	"/register",	app.register)
	api.GET(	"/logout",	app.logout)
	api.GET(	"/hello",	app.hello)
	
	router.NoRoute(func(c *gin.Context) {
		abortRequest(c, errorNotFound)
	})

	router.Run()
}

func (app *App) hello(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "hi",
	})
}
