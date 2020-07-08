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
	Id uint `json:"id"`
	Name string `json:"filename"`
	Topright uint `json:"topright"`
	Topleft uint `json:"topleft"`
	Bottomright uint `json:"bottomright"`
	Bottomleft uint `json:"bottomleft"`
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

	f, h, err := c.Request.FormFile("file")
	if err != nil {
		abortRequest(c, errorBadRequest)
		return
	}

	// Store file in bucket
	uuid := uuid.New().String()
	name := h.Filename

	err = app.bucket.WriteFile(uuid, f)
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	// Insert in database
	label := models.Label {
		ID: uuid,
		Name: name,
		ImageID: i.Id(),
	}

	err = app.database.Create(&label).Error
	if err == nil {
		responseOK(c)
		return
	}

	// Cleanup if error	
	err = app.bucket.RemoveFile(name)
	if err != nil {
		// Inconsistent state
		log.Printf("Failed to delete file %s\n", name)
	}
	abortRequest(c, errorInternal)
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

	r, err := app.bucket.ReadFile(label.Name)
	if err != nil {
		log.Fatal(err)
	}

	w := c.Writer
	w.Header().Set("Content-Type", "image/jpeg")
	io.Copy(w, r)

	c.Status(http.StatusOK)
}

func (app *App) labelList(c *gin.Context) {
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

	var label models.Label

	err = app.database.Model(&i).Related(&label).Error
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	json := LableJSON{
		Id: label.Id(),
		Name: label.Name,
		Topright: label.Topright,
		Topleft: label.Topleft,
		Bottomright: label.Bottomright,
		Bottomleft: label.Bottomleft,
	}
	
	c.JSON(http.StatusOK, json)
}

