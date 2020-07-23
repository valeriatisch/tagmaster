package application

import (
	"github.com/gin-gonic/gin"
	"github.com/valeriatisch/tagmaster/models"
	"net/http"
	"strconv"
	"log"
)

type LabelJSON struct {
	Name string `json:"name"`
	X1   uint   `json:"x1"`
	Y1   uint   `json:"y1"`
	X2   uint   `json:"x2"`
	Y2   uint   `json:"y2"`
}

func (app *App) labelCreate(c *gin.Context) {
	_, err := app.getUser(c)
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

	var labels []LabelJSON
	err = c.ShouldBindJSON(&labels)
	if err != nil {
		abortRequest(c, errorBadRequest)
		return
	}

	for _, l := range labels {
		// Insert in database
		label := models.Label{
			Name: l.Name,
			X1: l.X1,
			Y1: l.Y1,
			X2: l.X2,
			Y2: l.Y2,
			ImageID: i.Id(),
		}

		err = app.database.Create(&label).Error
		if err != nil {
			log.Println("failed to insert label")
			// TODO: How should we handle this?
		}
	}

	responseOK(c)
}

func (app *App) labelRead(c *gin.Context) {
	_, err := app.getUser(c)
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
		X1: label.X1,
		Y1: label.Y1,
		X2: label.X2,
		Y2: label.Y2,
	}

	c.JSON(http.StatusOK, lab)
}

func (app *App) labelList(c *gin.Context) {
	_, err := app.getUser(c)
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

	var labels []models.Label

	err = app.database.Model(&i).Related(&labels).Error
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	json := make([]LabelJSON, len(labels))

	for i, lbl := range labels {
		json[i] = LabelJSON{
			Name:   lbl.Name,
			Y1: lbl.Y1,
			X1: lbl.X1,
			Y2: lbl.Y2,
			X2: lbl.X2,
		}
	}
	c.JSON(http.StatusOK, json)
}
