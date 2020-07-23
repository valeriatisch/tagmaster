package application

import (
	"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type ProjectJSON struct {
	Id uint     `json:"id"`
	Name string `json:"name" binding:"required"`
	Tags string `json:"tags" binding:"required"`
	Active bool `json:"active"`
	Done bool   `json:"done"`
	Images []uint `json:"images"`
}

func (app *App) projectCreate(c *gin.Context) {
	user, err := app.getUser(c)
	if err != nil {
		abortRequest(c, errorUnauthorized)
		return
	}

	var pj ProjectJSON
	err = c.ShouldBindJSON(&pj)
	if err != nil {
		abortRequest(c, errorBadRequest)
		return
	}

	// TODO: validate project fields

	project := models.Project{
		Name: pj.Name,
		Active: false,
		Done: false,
		UserID: user.Id(),
		Tags: pj.Tags,
	}

	err = app.database.Create(&project).Error
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	res := ProjectJSON{
		Id: project.Id(),
		Name: project.Name,
		Tags: project.Tags,
		Active: false,
		Done: false,
		Images: []uint{},
	}

	c.JSON(http.StatusOK, res)
}

func (app *App) projectActivate(c *gin.Context) {
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

	if p.Active {
		abortRequest(c, errorIsActive)
		return
	}

	imageIds := getImageIds(app.database, p)

	if len(imageIds) == 0 {
		abortRequest(c, errorActivateEmpty)
		return
	}

	p.Active = true
	err = app.database.Save(p).Error
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	responseOK(c)
}

func projectIsDone(db *models.Database, p models.Project) (bool, error) {
	var cnt uint
	err := db.Model(&models.Image{}).Where("project_id = ? AND done = ?", p.Id(), false).Count(&cnt).Error
	return cnt == 0, err
}

func (app *App) projectRead(c *gin.Context) {
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

	imageIds := getImageIds(app.database, p)
	done, err := projectIsDone(app.database, p)
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	res := ProjectJSON{
		Id: p.Id(),
		Name: p.Name,
		Tags: p.Tags,
		Images: imageIds,
		Done: done,
		Active: p.Active,
	}

	c.JSON(http.StatusOK, res)
}

func getImageIds(db *models.Database, p models.Project) []uint {
	var images []models.Image
	imageIds := make([]uint, 0)
	err := db.Model(&p).Related(&images).Error
	if err != nil {
		// TODO: better error handling
		return imageIds
	}

	
	for _, img := range images {
		imageIds = append(imageIds, img.Id())
	}

	return imageIds
}

func (app *App) projectList(c *gin.Context) {
	user, err := app.getUser(c)
	if err != nil {
		abortRequest(c, errorUnauthorized)
		return
	}

	var projects []models.Project

	err = app.database.Model(&user).Related(&projects).Error
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	json := make([]ProjectJSON, len(projects))

	for i, p := range projects {
		imageIds := getImageIds(app.database, p)
		done, err := projectIsDone(app.database, p)
		if err != nil {
			abortRequest(c, errorInternal)
			return
		}
		json[i] = ProjectJSON{
			Id: p.Id(),
			Name: p.Name,
			Tags: p.Tags,
			Images: imageIds,
			Done: done,
			Active: p.Active,
		}
	}

	c.JSON(http.StatusOK, json)
}

func (app *App) projectDelete(c *gin.Context) {
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

	err = app.database.Delete(&p).Error
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	responseOK(c)
}
