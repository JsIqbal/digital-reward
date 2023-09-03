package svc

import (
	"context"
	"encoding/json"
	"errors"
	"go-rest/logger"
	"go-rest/util"
)

type service struct {
	dashboardRepo DashboardRepo
	userRepo      UserRepo

	errRepo ErrorRepo
	cache   Cache
}

func NewService(dashboardRepo DashboardRepo, userRepo UserRepo, errorRepo ErrorRepo, cache Cache) Service {
	return &service{
		dashboardRepo: dashboardRepo,
		userRepo:      userRepo,

		errRepo: errorRepo,
		cache:   cache,
	}
}

func (s *service) GetDashboardImages() []*Dashboard {
	return s.dashboardRepo.Get()
}

func (s *service) CreateUser(std *User) error {
	return s.userRepo.Create(std)
}

func (s *service) FindUserByUsername(username string) (*User, error) {
	user, err := s.userRepo.Find(username)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}
	return user, nil
}

func (s *service) Error(ctx context.Context, internalCode string, description string) *ErrorResponse {
	var errDetail *ErrorDetail

	// get from cache
	errString, err := s.cache.Get(internalCode)
	if err != nil {
		logger.Error(ctx, "cannot get from redis", err)
	}
	if len(errString) > 0 {
		err = json.Unmarshal([]byte(errString), &errDetail)
		if err != nil {
			logger.Error(ctx, "cannot unmarshal error detail", err)
		}
	}

	// found in cache
	if errDetail != nil && len(errDetail.InternalCode) == 0 {
		return &ErrorResponse{
			Timestamp:   util.GetCurrentTimestamp(),
			Description: description,
			Error:       errDetail,
		}
	}

	// not found in cache
	// get from db
	errDetail, err = s.errRepo.GetError(ctx, internalCode)
	if err != nil {
		logger.Error(ctx, "cannot get from db", err)
		return &ErrorResponse{
			Timestamp:   util.GetCurrentTimestamp(),
			Description: description,
			Error: &ErrorDetail{
				InternalCode: internalCode,
				MessageEn:    "Not Set",
				MessageBn:    "Not Set",
			},
		}
	}

	errResponse := &ErrorResponse{
		Timestamp:   util.GetCurrentTimestamp(),
		Description: description,
		Error:       errDetail,
	}

	return errResponse
}

func (s *service) Response(ctx context.Context, description string, data interface{}) *ResponseData {
	return &ResponseData{
		Timestamp:   util.GetCurrentTimestamp(),
		Description: description,
		Data:        data,
	}
}

func (s *service) FindUserByID(userID string) (*User, error) {
	user, err := s.userRepo.FindByID(userID) // Use FindByID method in userRepo
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}
	return user, nil
}
