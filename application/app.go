package application

import (
	"github.com/gin-gonic/gin"
	"github.com/valeriatisch/tagmaster/bucket"
	"github.com/valeriatisch/tagmaster/middleware"
	"github.com/valeriatisch/tagmaster/models"
)

type App struct {
	database *models.Database
	config   config
	bucket   bucket.Bucket
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

	return &App{
		database: db,
		config:   conf,
		bucket:   bkt,
	}
}

func (app *App) Run() {
	router := gin.Default()

	router.Use(middleware.Session(app.config.sessionSecret))

	api := router.Group("/api")
	api.POST("/login", app.login)
	api.POST("/register", app.register)
	api.GET("/logout", app.logout)
	api.GET("/hello", app.hello)
	api.POST("/sendPassword", app.sendPassword)

	api.POST("/projects", app.projectCreate)
	api.GET("/projects/:id", app.projectRead)
	api.DELETE("/projects/:id", app.projectDelete)
	api.POST("/projects/:id/images", app.imageCreate)
	api.GET("/projects/:id/images", app.imageList)
	api.GET("/images/:id", app.imageRead)

	router.NoRoute(func(c *gin.Context) {
		abortRequest(c, errorNotFound)
	})

	_ = router.Run()
}

func (app *App) hello(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "hi",
	})
}

func responseOK(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "ok",
	})
}
