package application

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-gonic/gin"
	"github.com/valeriatisch/tagmaster/middleware"
	"github.com/valeriatisch/tagmaster/bucket"

)

type App struct {
	database *models.Database
	config config
	bucket bucket.Bucket
}

func NewApp() *App {
	conf := loadConfig()
	db := models.NewDatabase(conf.databaseURI)
	var bkt bucket.Bucket

	if conf.isProduction {
		bkt = bucket.NewCloudBucket()
	} else {
		bkt = bucket.NewLocalBucket()
	}

	return &App{
		database: db,
		config: conf,
		bucket: bkt,
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
	api.POST(	"/upload/:name",	app.upload)
	api.GET(	"/serve/:name",	app.serve)
	
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
