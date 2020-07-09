package application

import (
	"github.com/gin-gonic/gin"
	"github.com/valeriatisch/tagmaster/models"
	"net/http"
	"strconv"
)

type LabelJSON struct {
	LabelName   string `json:"LabelName"`
	Topright    uint   `json:"Topright"`
	Topleft     uint   `json:"Topleft"`
	Bottomright uint   `json:"Bottomright"`
	Bottomleft  uint   `json:"Bottomleft"`
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

	var l LabelJSON
	err = c.ShouldBindJSON(&l)
	if err != nil {
		abortRequest(c, errorBadRequest)
		return
	}

	// Insert in database
	label := models.Label{
		LabelName:   l.LabelName,
		Topleft:     l.Topleft,
		Topright:    l.Topright,
		Bottomright: l.Bottomright,
		Bottomleft:  l.Bottomleft,
		ImageID:     i.Id(),
	}

	err = app.database.Create(&label).Error
	if err == nil {
		responseOK(c)
		return
	}

	return
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
		LabelName:   label.LabelName,
		Topright:    label.Topright,
		Topleft:     label.Topleft,
		Bottomleft:  label.Bottomleft,
		Bottomright: label.Bottomright,
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
			LabelName:   lbl.LabelName,
			Topright:    lbl.Topright,
			Topleft:     lbl.Topleft,
			Bottomleft:  lbl.Bottomleft,
			Bottomright: lbl.Bottomright,
		}
	}
	c.JSON(http.StatusOK, json)
}
