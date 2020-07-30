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
	URLS []string `json:"urls"`
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
		URLS: []string{},
	}

	c.JSON(http.StatusOK, res)
}

type ExportJSON struct {
	Filename string `json:"filename"`
	Labels []LabelJSON `json:"tags"`
}

func (app *App) projectExport(c *gin.Context) {
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

	done, err := projectIsDone(app.database, p)
	if err != nil {
		abortRequest(c, errorInternal)
		return
	}

	if !done {
		// TODO
		abortRequest(c, errorInternal)
		return
	}

	var (
		export []ExportJSON
		images []models.Image
	)

	res := app.database.Model(&p).Related(&images)
	if res.Error != nil {
		// TODO
		abortRequest(c, errorInternal)
		return
	}

	for _, img := range images {
		exp, err := exportImage(app.database, &img)
		if err != nil {
			// TODO
			abortRequest(c, errorInternal)
			return
		}

		export = append(export, exp)
	}

	c.Writer.Header().Add("Content-Disposition", "attachment; filename=export.json")
	c.Writer.Header().Add("Content-Type", "application/octet-stream")
	c.JSON(http.StatusOK, export)
}

func exportImage(db *models.Database, img *models.Image) (ExportJSON, error) {
	var (
		labels []models.Label
		tags []LabelJSON
		export ExportJSON
	)

	res := db.Model(&img).Related(&labels)
	if res.Error != nil {
		return export, res.Error
	}

	for _, l := range labels {
		tags = append(tags, LabelJSON{
			Name: l.Name,
			X1: l.X1,
			Y1: l.Y1,
			X2: l.X2,
			Y2: l.Y2,
		})
	}

	export = ExportJSON{
		Filename: img.Name,
		Labels: tags,
	}

	return export, nil
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

	imageIds, _ := getImageIds(app.database, p, app.config.isProduction)

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

	imageIds, imageUrls := getImageIds(app.database, p, app.config.isProduction)
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
		URLS: imageUrls,
	}

	c.JSON(http.StatusOK, res)
}


func getImageIds(db *models.Database, p models.Project, production bool) ([]uint, []string) {
	var images []models.Image
	imageIds := make([]uint, 0)
	imageURLS := make([]string, 0)

	err := db.Model(&p).Related(&images).Error
	if err != nil {
		// TODO: better error handling
		return imageIds, imageURLS
	}

	
	for _, img := range images {
		url := "/api/images/" + strconv.Itoa(int(img.Id())) + "/file"
		if production {
			url = img.PublicURL()
		}

		imageIds = append(imageIds, img.Id())
		imageURLS = append(imageURLS, url)
	}

	return imageIds, imageURLS
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
		imageIds, imageUrls := getImageIds(app.database, p, app.config.isProduction)
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
			URLS: imageUrls,
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
