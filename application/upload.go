package application

import (
	"net/http"
	//"github.com/valeriatisch/tagmaster/models"
	"github.com/gin-gonic/gin"
	"log"
	"fmt"
	"io"
)

func (app *App) upload(c *gin.Context) {
	name := c.Param("name")
	bkt := app.bucket

	f, header, err := c.Request.FormFile("file")
	if err != nil {
		c.String(http.StatusBadRequest, fmt.Sprintf("file err : %s", err.Error()))
		return
	}

	bkt.WriteFile(name, f)

	c.String(http.StatusOK, header.Filename)
}

func (app *App) serve(c *gin.Context) {
	name := c.Param("name")
	bkt := app.bucket

	w := c.Writer

	r, err := bkt.ReadFile(name)
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "image/jpeg")
	io.Copy(w, r)

	c.String(http.StatusOK, "ok")
}