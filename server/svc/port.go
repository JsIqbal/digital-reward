package svc

import (
	"context"
	"time"
)

type UserRepo interface {
	////////// User Signatures /////////////////////
	Create(ctx context.Context, std *User) error
	Find(ctx context.Context, username string) (*User, error)
	FindByID(ctx context.Context, ID string) (*User, error)
	////////// User Profile Signatures ////////////
	CreateProfile(ctx context.Context, ID string, profile *Profile) (*UserProfile, error)
	GetProfileById(ctx context.Context, ID string) (*Profile, error) 
	GetProfileByBusiness(ctx context.Context, name string) (*Profile, error) 
	GetProfileByLead(ctx context.Context, lead string) (*Profile, error) 
	GetProfileByEmail(ctx context.Context, email string) (*Profile, error) 
	GetProfileByNid(ctx context.Context, nid string) (*Profile, error) 
	GetProfileByKam(ctx context.Context, kam string) (*Profile, error) 
	GetProfileByPoc(ctx context.Context, poc string) (*Profile, error) 
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

type DataCampaignRepo interface {
	CreateCampaign(ctx context.Context, userID string, campaigns []*Campaign) ([]*Campaign, error)
}

type Service interface {
	Error(ctx context.Context, internalCode string, description string) *ErrorResponse
	Response(ctx context.Context, description string, data interface{}) *ResponseData
	////////// User Signatures /////////////////////
	CreateUser(ctx context.Context, std *User) error
	FindUserByID(ctx context.Context, ID string) (*User, error)
	FindUserByUsername(ctx context.Context, username string) (*User, error)
	////////// User Profile Signatures ////////////
	GetUserProfile(ctx context.Context, ID string) (*Profile, error)
	CreateUserProfile(ctx context.Context, ID string, profile *Profile) (*UserProfile, error)
	GetUserProfileByBusinessName(ctx context.Context, name string) (*Profile, error) 
	GetUserProfileByLeadName(ctx context.Context, lead string) (*Profile, error) 
	GetUserProfileByEmailAddress(ctx context.Context, address string) (*Profile, error) 
	GetUserProfileByNidNumber(ctx context.Context, nid string) (*Profile, error) 
	GetUserProfileByKamNumber(ctx context.Context, kam string) (*Profile, error) 
	GetUserProfileByPocNumber(ctx context.Context, poc string) (*Profile, error)
	////////// Camapign Signatures //////////// 
	CreateDataCampaign(ctx context.Context, userID string, campaigns []*Campaign) ([]*Campaign, error)
}