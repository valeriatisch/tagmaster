package application

import (
	"context"
	"fmt"
	"log"
	"os"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	secretmanagerpb "google.golang.org/genproto/googleapis/cloud/secretmanager/v1"
)

type config struct {
	sessionSecret    string
	isProduction     bool
	databaseURI      string
	SENDGRID_API_KEY string
}

func loadConfig() config {
	if os.Getenv("PLATFORM") == "appengine" {
		return loadProduction()
	}

	return loadDevelopment()
}

func loadProduction() config {
	return config{
		isProduction:     true,
		databaseURI:      mustGetSecret("database-uri"),
		sessionSecret:    mustGetSecret("session-secret"),
		SENDGRID_API_KEY: mustGetSecret("SENDGRID_API_KEY"),
	}
}

func loadDevelopment() config {
	return config{
		isProduction:     false,
		databaseURI:      mustGetEnvironment("DATABASE_URI"),
		sessionSecret:    "secret",
		SENDGRID_API_KEY: mustGetEnvironment("SENDGRID_API_KEY"),
	}
}

func mustGetEnvironment(name string) string {
	// disabled windows 10
	//e := os.Getenv(name)
	e := "postgres://postgres:uwwmt81@localhost:5432/postgres?sslmode=disable";
	if len(e) == 0 {
		log.Fatal("Fatal: ", name, " not set")
	}

	return e
}

func mustGetSecret(name string) string {
	ctx := context.Background()

	client, err := secretmanager.NewClient(ctx)
	if err != nil {
		log.Fatal(err)
	}

	uri := fmt.Sprintf("projects/sksy-tagmaster/secrets/%s/versions/latest", name)
	req := &secretmanagerpb.AccessSecretVersionRequest{
		Name: uri,
	}

	result, err := client.AccessSecretVersion(ctx, req)
	if err != nil {
		log.Fatal("Fatal: ", name, " not set")
	}

	return string(result.Payload.Data)
}
