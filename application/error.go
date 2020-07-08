package application

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type appError struct {
	statusCode int
	description string
}

func (err appError) Error() string {
	return err.description
}

var (
	errorAuthenticationFailed = newError(
		http.StatusUnauthorized, 
		"Incorrect password",
	)

	errorNotRegistered = newError(
		http.StatusBadRequest, 
		"Email not registered",
	)

	errorMissingCredentials = newError(
		http.StatusBadRequest, 
		"No credentials found",
	)

	errorNotLoggedIn = newError(
		http.StatusBadRequest, 
		"Not logged in",
	)

	errorFailedToCreateUser = newError(
		http.StatusBadRequest, 
		"Failed to create user",
	)

	errorNotFound = newError(
		http.StatusNotFound, 
		"Not found",
	)

	errorUnauthorized = newError(
		http.StatusUnauthorized, 
		"Unauthorized",
	)

	errorBadRequest = newError(
		http.StatusBadRequest, 
		"Bad request",
	)

	errorInternal = newError(
		http.StatusInternalServerError, 
		"Internal server error",
	)

	errorEmailNotUnique = newError(
		http.StatusBadRequest, 
		"Email address already in use",
	)

	errorNoImageAvailable = newError(
		http.StatusInternalServerError, 
		"No image available",
	)
)

// Abort request with json payload {"error":"description"}
// If e is an appError use Error() as description
// Otherwise use Error() as description only in debug mode
func abortRequest(c *gin.Context, e error) {
	code := http.StatusInternalServerError
	msg := e.Error()

	if a, ok := e.(appError); ok {
		code = a.statusCode
	} else if gin.Mode() == gin.ReleaseMode {
		msg = "Unknown"
	}

	c.AbortWithStatusJSON(code, gin.H{
		"error": msg,
	})
}

func newError(status int, msg string) appError {
	return appError{
		statusCode: status,
		description: msg,
	}
}