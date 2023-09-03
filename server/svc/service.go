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
	adminRepo     AdminRepo

	errRepo ErrorRepo
	cache   Cache
}

func NewService(dashboardRepo DashboardRepo, userRepo UserRepo, adminRepo AdminRepo, errorRepo ErrorRepo, cache Cache) Service {
	return &service{
		dashboardRepo: dashboardRepo,
		userRepo:      userRepo,
		adminRepo:     adminRepo,

		errRepo: errorRepo,
		cache:   cache,
	}
}

func (s *service) GetDashboardImages() []*Dashboard {
	return s.dashboardRepo.Get()
}

func (s *service) CreateUser(std *User) {
	s.userRepo.CreateUser(std)
}

func (s *service) LoginAdmin(std *Admin) *Admin {
	return s.adminRepo.Login(std)
}

func (s *service) CreateAdmin(std *Admin) error {
	return s.adminRepo.Create(std)
}

func (s *service) FindAdminByUsername(username string) (*Admin, error) {
	admin, err := s.adminRepo.Find(username)
	if err != nil {
		return nil, err
	}
	if admin == nil {
		return nil, errors.New("admin not found")
	}
	return admin, nil
}

func (s *service) GetUserByEmail(email string) (*User, error) {
	return s.userRepo.GetUserByEmail(email)
}

func (s *service) GetUserByID(userID string) (*User, error) {
	return s.userRepo.GetUserByID(userID)
}

func (s *service) GetAllUsers() []*User {
	return s.userRepo.Get()
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

func (s *service) FindAdminByID(userID string) (*Admin, error) {
    admin, err := s.adminRepo.FindByID(userID) // Use FindByID method in adminRepo
    if err != nil {
        return nil, err
    }
    if admin == nil {
        return nil, errors.New("admin not found")
    }
    return admin, nil
}




