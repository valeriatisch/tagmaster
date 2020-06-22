package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
)

const cookieName = "session"

func Session(secret string) gin.HandlerFunc {
	store := cookie.NewStore([]byte(secret))
	return sessions.Sessions(cookieName, store)
}
