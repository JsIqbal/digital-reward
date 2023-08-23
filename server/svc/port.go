package svc

import (
	"context"
	"time"
)

type UserRepo interface {
	CreateUser(std *User)
	GetUserByID(userID string) (*User, error)
	GetUserByEmail(email string) (*User, error)

	Get() []*User
}

type Service interface {
	Error(ctx context.Context, internalCode string, description string) *ErrorResponse
	Response(ctx context.Context, description string, data interface{}) *ResponseData

	GetDashboardImages() []*Dashboard

	CreateUser(std *User)
	GetUserByID(userID string) (*User, error)
	GetUserByEmail(email string) (*User, error)

	LoginAdmin(std *Admin) *Admin
	CreateAdmin(std *Admin) error
	FindAdminByUsername(username string) (*Admin, error)
	GetAllUsers() []*User
}

type AdminRepo interface {
	Login(std *Admin) *Admin
	Create(std *Admin) error
	Find(username string) (*Admin, error)
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
