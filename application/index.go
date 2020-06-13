package application

import (
	"github.com/gin-gonic/gin"
	"path"
	"fmt"
)

func (app *App) index(c *gin.Context) {
	p := c.Request.URL.Path
	fmt.Println(p)

	ok, _ := path.Match("/api/*", p)
	if ok {
		abortRequest(c, errorNotFound)
		return
	}

	c.File("./static/build/index.html")
}