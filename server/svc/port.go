package svc

import (
	"context"
	"time"
)

type UserRepo interface {
	Create(ctx context.Context, usr *User) error
	Find(ctx context.Context, email string) (*User, error)
	// Get(ctx context.Context, id string) (*User, error)
	// Update(ctx context.Context, id string, user *User) error
	// Delete(ctx context.Context, id string) error
	// Login(ctx context.Context, email, password string) (*User, error)
	// Logout(ctx context.Context) error
	// GetAll(ctx context.Context) ([]*User, error)
}

type Service interface {
	Error(ctx context.Context, internalCode string, description string) *ErrorResponse
	Response(ctx context.Context, description string, data interface{}) *ResponseData

	CreateUser(ctx context.Context, usr *User) error
	FindUser(ctx context.Context, email string) (*User, error)
	// GetUser(ctx context.Context, id string) (*User, error)
	// UpdateUser(ctx context.Context, id string, user *User) error
	// DeleteUser(ctx context.Context, id string) error
	// LoginUser(ctx context.Context, email, password string) (*User, error)
	// LogoutUser(ctx context.Context) error
	// FindUser(ctx context.Context, email string) (*User, error)
	// GetAllUser(ctx context.Context) ([]*User, error)
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
