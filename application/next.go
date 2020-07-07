package application

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"time"
	"net/http"
)

func (app *App) nextImage(c *gin.Context) {
	var (
		img models.Image
		p models.Project
	)

	_, err := app.getUser(c)
	if err != nil {
		abortRequest(c, errorUnauthorized)
		return
	}

	limit := time.Now().Add(-10 * time.Minute)
	query := app.database.Where("last_served < ? AND done IS FALSE", limit)

	if err := query.First(&img).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			abortRequest(c, errorNoImageAvailable)
		} else {
			abortRequest(c, errorInternal)
		}		
		return
	}

	if app.database.Take(&p, img.ProjectID).Error != nil {
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
		"tags": p.Tags,
	}

	c.JSON(http.StatusOK, json)
}