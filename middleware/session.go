package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
)

const (
	sessionCookie = "session"
	sessionSecret = "notsecret"
)

func Session() gin.HandlerFunc {
	store := cookie.NewStore([]byte(sessionSecret))
	return sessions.Sessions(sessionCookie, store)
}
