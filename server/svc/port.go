package svc

import (
	"context"
	"time"
)

type Service interface {
	Error(ctx context.Context, internalCode string, description string) *ErrorResponse
	Response(ctx context.Context, description string, data interface{}) *ResponseData

	FindUserByID(userID string) (*User, error)
	CreateUser(std *User) error
	FindUserByUsername(username string) (*User, error)
}

type UserRepo interface {
	Create(std *User) error
	Find(username string) (*User, error)
	FindByID(userID string) (*User, error) // Add this line
}

type DashboardRepo interface {
	Get() []*Dashboard
}

type ErrorRepo interface {
	GetError(ctx context.Context, internalCode string) (*ErrorDetail, error)
}

type Cache interface {
	Set(key string, value string, ttl time.Duration) error
	Get(key string) (string, error)
	Delete(key string) error
	GetTTL(key string) (time.Duration, error)
}
