package postgres

import (
	"fmt"
	"github.com/lib/pq"
)

const (
	UniqueConstraintEmail = "users_email_key"
)

type EmailDuplicateError struct {
	Email string
}

func (e *EmailDuplicateError) Error() string {
	return fmt.Sprintf("Email '%s' already exists", e.Email)
}

// Checks whether the given error is a unique constraint error or not
func IsUniqueConstraintError(err error, contraintName string) bool {
	if pqErr, ok := err.(*pq.Error); ok {
		return pqErr.Code == "23505" && pqErr.Constraint == contraintName
	}
	return false
}
