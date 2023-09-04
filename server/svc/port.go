package svc

import (
	"context"
	"time"
)

type UserRepo interface {
	////////// User Signatures /////////////////////
	Create(ctx context.Context, std *User) error
	CreateProfile(ctx context.Context, ID string, profile *Profile) (*UserProfile, error)
	Find(ctx context.Context, username string) (*User, error)
	FindByID(ctx context.Context, ID string) (*User, error)
	////////// User Profile Signatures ////////////
	Get(ctx context.Context, ID string) (*Profile, error) 
	GetByBusiness(ctx context.Context, name string) (*Profile, error) 
	GetByLead(ctx context.Context, lead string) (*Profile, error) 
	GetByEmail(ctx context.Context, email string) (*Profile, error) 
	GetByNid(ctx context.Context, nid string) (*Profile, error) 
	GetByKam(ctx context.Context, kam string) (*Profile, error) 
	GetByPoc(ctx context.Context, poc string) (*Profile, error) 
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

type Service interface {
	Error(ctx context.Context, internalCode string, description string) *ErrorResponse
	Response(ctx context.Context, description string, data interface{}) *ResponseData
	////////// User Signatures /////////////////////
	CreateUser(ctx context.Context, std *User) error
	GetUserProfile(ctx context.Context, ID string) (*Profile, error)
	FindUserByID(ctx context.Context, ID string) (*User, error)
	FindUserByUsername(ctx context.Context, username string) (*User, error)
	////////// User Profile Signatures ////////////
	CreateUserProfile(ctx context.Context, ID string, profile *Profile) (*UserProfile, error)
	GetUserByBusinessName(ctx context.Context, name string) (*Profile, error) 
	GetUserByLeadName(ctx context.Context, lead string) (*Profile, error) 
	GetUserByEmailAddress(ctx context.Context, address string) (*Profile, error) 
	GetUserByNidNumber(ctx context.Context, nid string) (*Profile, error) 
	GetUserByKamNumber(ctx context.Context, kam string) (*Profile, error) 
	GetUserByPocNumber(ctx context.Context, poc string) (*Profile, error) 
}