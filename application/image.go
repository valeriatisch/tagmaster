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

type ImageJSON struct {
	Id uint `json:"id"`
	Name string `json:"filename"`
	Done bool `json:"done"`
}

func (app *App) imageCreate(c *gin.Context) {
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

	var p models.Project

	err = app.database.Take(&p, id).Error
	if err != nil {
		abortRequest(c, errorNotFound)
		return
	}

	if p.UserID != user.Id() {
		abortRequest(c, errorUnauthorized)
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
	img := models.Image {
		UUID: uuid,
		Name: name,
		Done: false,
		ProjectID: p.Id(),
	}

	err = app.database.Create(&img).Error
	if err == nil {
		json := gin.H{
			"id": img.Id(),
			"done": img.Done,
		}

		c.JSON(http.StatusOK, json)
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

func (app *App) imageRead(c *gin.Context) {
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

	var img models.Image

	err = app.database.Take(&img, id).Error
	if err != nil {
		abortRequest(c, errorNotFound)
		return
	}

	var p models.Project

	err = app.database.Take(&p, img.ProjectID).Error
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	json := gin.H{
		"id": img.Id(),
		"done": img.Done,
		"tags": p.Tags,
	}

	c.JSON(http.StatusOK, json)
}

func (app *App) imageFile(c *gin.Context) {
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

	var img models.Image

	err = app.database.Take(&img, id).Error
	if err != nil {
		abortRequest(c, errorNotFound)
		return
	}

	r, err := app.bucket.ReadFile(img.UUID)
	if err != nil {
		log.Fatal(err)
	}

	w := c.Writer
	w.Header().Set("Content-Type", "image/jpeg")
	io.Copy(w, r)

	c.Status(http.StatusOK)
}

func (app *App) imageList(c *gin.Context) {
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

	var p models.Project

	err = app.database.Take(&p, id).Error
	if err != nil {
		abortRequest(c, errorNotFound)
		return
	}

	if p.UserID != user.Id() {
		abortRequest(c, errorUnauthorized)
		return
	}

	var images []models.Image

	err = app.database.Model(&p).Related(&images).Error
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	json := make([]ImageJSON, len(images))

	for i, img := range images {
		json[i] = ImageJSON{
			Id: img.Id(),
			Name: img.Name,
			Done: img.Done,
		}
	}

	c.JSON(http.StatusOK, json)
}


