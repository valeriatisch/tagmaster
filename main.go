package main

import (
	"github.com/valeriatisch/tagmaster/application"
	"os"
)

func main() {
	app := application.NewApp()
	app.Run()
}
