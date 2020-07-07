package application

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-gonic/gin"
	"time"
	"net/http"
)

func (app *App) nextImage(c *gin.Context) {
	var img models.Image
	db := app.database

	_, err := app.getUser(c)
	if err != nil {
		abortRequest(c, errorUnauthorized)
		return
	}

	limit := time.Now().Add(-10 * time.Minute)
	query := db.Where("last_served < ?", limit).Order("last_served asc")

	res := query.First(&img)
	if res.Error != nil {
		abortRequest(c, errorInternal)
		return
	}

	img.LastServed = time.Now()
	if app.database.Save(&img).Error != nil {
		abortRequest(c, errorInternal)
		return
	}

	json := gin.H{
		"id": img.Id(),
		"tags": "one,two,three",
	}

	c.JSON(http.StatusOK, json)
}