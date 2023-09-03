package svc

import (
	"context"
	"time"
)

type Service interface {
	Error(ctx context.Context, internalCode string, description string) *ErrorResponse
	Response(ctx context.Context, description string, data interface{}) *ResponseData

	FindUserByID(ctx context.Context, userID string) (*User, error)
	CreateUser(ctx context.Context, std *User) error
	FindUserByUsername(ctx context.Context, username string) (*User, error)
}

type UserRepo interface {
	Create(ctx context.Context, std *User) error
	Find(ctx context.Context, username string) (*User, error)
	FindByID(ctx context.Context, userID string) (*User, error) // Add this line
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
