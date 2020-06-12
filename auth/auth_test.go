package auth

import (
	"bytes"
	"errors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/valeriatisch/tagmaster/models"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
)

// Stub authentication provider
type AuthStub struct {
	nextId uint
	users  map[string]models.User
}

func (a AuthStub) Authenticate(c Credentials) (uint, bool) {
	user := a.users[c.Email]
	if user.Email == "" || user.Password != c.Password {
		return 0, false
	}

	return user.Model.ID, true
}

func (a AuthStub) Get(uid uint) (models.User, error) {
	// We dont need this for now...
	return models.User{}, nil
}

func (a AuthStub) Register(c Credentials) (uint, error) {
	user := models.User{
		Email:    c.Email,
		Password: c.Password,
	}

	if a.users[c.Email].Email != "" {
		return 0, errors.New("")
	}

	user.Model.ID = a.nextId
	a.nextId++

	a.users[c.Email] = user

	return user.Model.ID, nil
}

// Utilities for making requests
func post(r http.Handler, path, json string) *httptest.ResponseRecorder {
	var body = bytes.NewBuffer([]byte(json))
	req, err := http.NewRequest("POST", path, body)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

func get(r http.Handler, path string) *httptest.ResponseRecorder {
	req, _ := http.NewRequest("GET", path, nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

// Create handler with authentication middleware
func StubEngine() *gin.Engine {
	router := gin.Default()
	router.Use(sessions.Sessions(
		"session",
		cookie.NewStore([]byte("secret")),
	))

	// Use stub authentication provider without database
	stub := AuthStub{
		nextId: 5,
		users:  make(map[string]models.User),
	}

	router.Use(func(c *gin.Context) {
		c.Set("auth", stub)
	})

	router.GET("/logout", Logout)
	router.POST("/register", Register)
	router.POST("/login", Login)

	protected := router.Group("protected")
	protected.Use(Middleware)
	protected.GET("/test", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	return router
}

// Tests
func TestUnauthorized(t *testing.T) {
	router := StubEngine()

	w := get(router, "/protected/test")
	assert.Equal(t, http.StatusUnauthorized, w.Code)
}

func TestRegister(t *testing.T) {
	router := StubEngine()

	var json string
	var w *httptest.ResponseRecorder

	// Create new user
	json = `{"email":"test","password":"pass"}`
	w = post(router, "/register", json)
	assert.Equal(t, http.StatusOK, w.Code)

	// Create duplicate
	json = `{"email":"test","password":"pass"}`
	w = post(router, "/register", json)
	assert.Equal(t, http.StatusBadRequest, w.Code)

	// Incomplete payload
	json = `{"email":"test"}`
	w = post(router, "/register", json)
	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestLogin(t *testing.T) {
	router := StubEngine()

	var json string
	var w *httptest.ResponseRecorder

	// Create new user
	json = `{"email":"test","password":"pass"}`
	w = post(router, "/register", json)
	assert.Equal(t, http.StatusOK, w.Code)

	// Login wrong password
	json = `{"email":"test","password":"wrong"}`
	w = post(router, "/login", json)
	assert.Equal(t, http.StatusUnauthorized, w.Code)

	// Login correct password
	json = `{"email":"test","password":"pass"}`
	w = post(router, "/login", json)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestAuthorized(t *testing.T) {
	router := StubEngine()

	var json string
	var w *httptest.ResponseRecorder

	// Create new user
	json = `{"email":"test","password":"pass"}`
	w = post(router, "/register", json)
	assert.Equal(t, http.StatusOK, w.Code)

	// Login
	json = `{"email":"test","password":"pass"}`
	w = post(router, "/login", json)
	assert.Equal(t, http.StatusOK, w.Code)

	// Get protected with cookie from login
	req, _ := http.NewRequest("GET", "/protected/test", nil)
	req.Header = http.Header{"Cookie": w.HeaderMap["Set-Cookie"]}
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestLogout(t *testing.T) {
	router := StubEngine()

	var json string
	var w *httptest.ResponseRecorder

	// Logout without valid session
	w = get(router, "/logout")
	assert.Equal(t, http.StatusBadRequest, w.Code)

	// Create new user
	json = `{"email":"test","password":"pass"}`
	w = post(router, "/register", json)
	assert.Equal(t, http.StatusOK, w.Code)

	// Login
	json = `{"email":"test","password":"pass"}`
	w = post(router, "/login", json)
	assert.Equal(t, http.StatusOK, w.Code)

	cookiee := w.HeaderMap["Set-Cookie"]

	// Get protected with cookie from login
	req, _ := http.NewRequest("GET", "/protected/test", nil)
	req.Header = http.Header{"Cookie": cookiee}
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)

	// Logout with valid session
	req, _ = http.NewRequest("GET", "/logout", nil)
	req.Header = http.Header{"Cookie": cookiee}
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)

	// Get requested with cookie from logout
	req, _ = http.NewRequest("GET", "/protected/test", nil)
	req.Header = http.Header{"Cookie": w.HeaderMap["Set-Cookie"]}
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)
	assert.Equal(t, http.StatusUnauthorized, w.Code)
}
