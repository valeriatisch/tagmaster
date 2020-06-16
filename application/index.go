package application

import (
	"github.com/gin-gonic/gin"
	"strings"
	"fmt"
)

func (app *App) index(c *gin.Context) {
	p := c.Request.URL.Path
	fmt.Println(p)

	if strings.HasPrefix(p, "/api/") {
		abortRequest(c, errorNotFound)
		return
	}

	c.File("./static/build/index.html")
}