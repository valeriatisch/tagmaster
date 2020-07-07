package application

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/valeriatisch/tagmaster/middleware"
	"github.com/valeriatisch/tagmaster/bucket"
	"github.com/jinzhu/gorm"
	"github.com/gin-gonic/gin"
)

type App struct {
	database *models.Database
	config config
	bucket bucket.Bucket
}

func (app *App) deletionCallback(scope *gorm.Scope) {
	img, ok := scope.Value.(*models.Image)
	if !ok {
		return	
	}

	go app.bucket.RemoveFile(img.UUID)	
}

func NewApp() *App {
	conf := loadConfig()
	db := models.NewDatabase(conf.databaseURI)
	var bkt bucket.Bucket

	if conf.isProduction {
		bkt = bucket.NewCloudBucket("sksy-tagmaster.appspot.com")
	} else {
		bkt = bucket.NewLocalBucket("./images/")
	}

	app := &App{
		database: db,
		config: conf,
		bucket: bkt,
	}

	db.Callback().Delete().After("gorm:delete").
		Register("app:delete", app.deletionCallback)

	return app
}

func (app *App) Run() {
	router := gin.Default()

	router.Use(middleware.Session(app.config.sessionSecret))

	api := router.Group("/api")

	// User
	api.POST(  "/register",            app.userCreate)
	api.POST(  "/login",               app.userLogin)
	api.GET(   "/logout",              app.userLogout)
	api.GET(   "/account",             app.userRead)
	api.PATCH( "/account",             app.userUpdate)
	api.DELETE("/account",             app.userDelete)

	// Project
	api.POST(  "/projects",            app.projectCreate)
	api.GET(   "/projects",            app.projectList)
	api.GET(   "/projects/:id",        app.projectRead)
	api.DELETE("/projects/:id",        app.projectDelete)

	// Image
	api.POST(  "/projects/:id/images", app.imageCreate)
	api.GET(   "/projects/:id/images", app.imageList)
	api.GET(   "/images/:id",          app.imageRead)

	// Label
	// TODO

	// Next
	api.GET(   "/next",                app.nextImage)

	router.NoRoute(func(c *gin.Context) {
		abortRequest(c, errorNotFound)
	})

	router.Run()
}

func responseOK(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "ok",
	})
}
