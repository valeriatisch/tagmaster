package application

import (
	"github.com/gin-gonic/gin"
	"github.com/valeriatisch/tagmaster/models"
	"net/http"
	"strconv"
)

type LabelJSON struct {
	Name        string `json:"Labelname"`
	Topright    uint   `json:"Topright"`
	Topleft     uint   `json:"Topleft"`
	Bottomright uint   `json:"Bottomright"`
	Bottomleft  uint   `json:"Bottomleft"`
}

func (app *App) labelCreate(c *gin.Context) {

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
		ImageID:     i.Id(),
		Name:        l.Name,
		Topleft:     l.Topleft,
		Topright:    l.Topright,
		Bottomright: l.Bottomright,
		Bottomleft:  l.Bottomleft,
	}

	err = app.database.Create(&label).Error
	if err == nil {
		responseOK(c)
		return
	}

	return
}

func (app *App) labelRead(c *gin.Context) {

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
		Name:        label.Name,
		Topright:    label.Topright,
		Topleft:     label.Topleft,
		Bottomleft:  label.Bottomleft,
		Bottomright: label.Bottomright,
	}

	c.JSON(http.StatusOK, lab)
}

func (app *App) labelList(c *gin.Context) {

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
			Name:        lbl.Name,
			Topright:    lbl.Topright,
			Topleft:     lbl.Topleft,
			Bottomleft:  lbl.Bottomleft,
			Bottomright: lbl.Bottomright,
		}
	}
	c.JSON(http.StatusOK, json)
}
