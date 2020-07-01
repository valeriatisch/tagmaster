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

	// Authentication
	api.POST(  "/auth/login",          app.authLogin)
	api.POST(  "/auth/logout",         app.authLogout)
	api.POST(  "/auth/update",         app.authUpdate)
	api.POST(  "/auth/reset",          app.authReset)

	// User
	api.POST(  "/user",                app.userCreate)
	api.GET(   "/user",                app.userRead)
	api.PUT(   "/user",                app.userUpdate)
	api.DELETE("/user",                app.userDelete)

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
