package svc

import (
	"context"
	"time"
)

type Service interface {
	Error(ctx context.Context, internalCode string, description string) *ErrorResponse
	Response(ctx context.Context, description string, data interface{}) *ResponseData

	FindAdminByID(userID string) (*Admin, error)
	CreateAdmin(std *Admin) error
	FindAdminByUsername(username string) (*Admin, error)
}

type AdminRepo interface {
	Create(std *Admin) error
	Find(username string) (*Admin, error)
	FindByID(userID string) (*Admin, error) // Add this line
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
