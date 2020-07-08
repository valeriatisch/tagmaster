package application

import (
	"log"
	"io"
	"strconv"
	"net/http"
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type LabelJSON struct {
	Name string `json:"Labelname"`
	Topright uint `json:"Topright"`
	Topleft uint `json:"Topleft"`
	Bottomright uint `json:"Bottomright"`
	Bottomleft uint `json:"Bottomleft"`
}

func (app *App) labelCreate(c *gin.Context) {
	user, err := app.getUser(c)
	if err != nil {
		abortRequest(c, errorUnauthorized)
		return
	}

	val := c.Param("id")

	id, err := strconv.Atoi(val)
	if err != nil {
		abortRequest(c, errorBadRequest)
		return
	}

	var i models.Image

	err = app.database.Take(&i, id).Error
	if err != nil {
		abortRequest(c, errorNotFound)
		return
	}

	var l LabelJSON
	err = c.ShouldBindJSON(&l)
	if err != nil {
		abortRequest(c, errorBadRequest)
		return
	}

	// Insert in database
	label := models.Label {
		ImageID: i.Id(),
		Name: l.Name,
		topleft: l.Topleft,
		topright: l.Topright,
		bottomright: l.Bottomright,
		bottomleft: l.Bottomleft,
	}

	err = app.database.Create(&label).Error
	if err == nil {
		responseOK(c)
		return
	}

	return
}

func (app *App) labelRead(c *gin.Context) {
	user, err := app.getUser(c)
	if err != nil {
		abortRequest(c, errorUnauthorized)
		return
	}

	val := c.Param("id")

	id, err := strconv.Atoi(val)
	if err != nil {
		abortRequest(c, errorBadRequest)
		return
	}

	var label models.Label

	err = app.database.Take(&label, id).Error
	if err != nil {
		abortRequest(c, errorNotFound)
		return
	}

	var i models.Image

	err = app.database.Take(&i, label.ImageID).Error
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	lab := LabelJSON{
		Name: label.Name,
		Topright: label.topright,
		Topleft: label.topleft,
		Bottomleft: label.bottomleft,
		Bottomright: label.bottomright,
	}
	
	c.JSON(http.StatusOK, lab)
}



