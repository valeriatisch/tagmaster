package main

import (
	"github.com/valeriatisch/tagmaster/application"
	"os"
)

func main() {
	_ = os.Setenv("SENDGRID_API_KEY", "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")
	_ = os.Setenv("DATABASE_URI", "host=localhost port=5432 user=postgres password=ultrasaur sslmode=disable")

	app := application.NewApp()
	app.Run()
}
