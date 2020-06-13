package application

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type appError struct {
	statusCode int
	description string
}

func (e appError) Error() string {
	return e.description
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