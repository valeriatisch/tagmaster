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
	ID uint `json:"id" binding:"required"`
	Name string `json:"filename" binding:"required"`
	Done bool `json:"done" binding:"required"`
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

	err = app.bucket.WriteFile(name, f)
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

func (app *App) imageRead(c *gin.Context) {
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

	if p.UserID != user.Id() {
		abortRequest(c, errorUnauthorized)
		return
	}
	

	r, err := app.bucket.ReadFile(img.Name)
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
	json := make([]ImageJSON, len(images))

	err = app.database.Model(&p).Related(&images, "Images").Error
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	for _, img := range images {
		json = append(json, ImageJSON{
			ID: img.Id(),
			Name: img.Name,
			Done: img.Done,
		})
	}

	c.JSON(http.StatusOK, json)
}













