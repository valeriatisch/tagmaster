package application

import (
	"os"
	"context"
	"log"
	"fmt"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	secretmanagerpb "google.golang.org/genproto/googleapis/cloud/secretmanager/v1"
)

type config struct {
	sessionSecret string
	isProduction bool
	databaseURI string
}

func loadConfig() config {
	if os.Getenv("PLATFORM") == "appengine" {
		return loadProduction()
	}
	
	return loadDevelopment()
}

func loadProduction() config {
	return config{
		isProduction: true,
		databaseURI: mustGetSecret("database-uri"),
		sessionSecret: mustGetSecret("session-secret"),
	}
}

func loadDevelopment() config {
	return config{
		isProduction: false,
		databaseURI: mustGetEnvironment("DATABASE_URI"),
		sessionSecret: "secret",
	}
}

func mustGetEnvironment(name string) string {
	e := os.Getenv(name)
	if len(e) == 0 {
		log.Fatal(name, " not set")
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
		log.Fatal(err)
	}
	
	return string(result.Payload.Data)
}