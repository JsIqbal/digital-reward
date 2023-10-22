package svc

import (
	"context"
	"encoding/json"
	"errors"
	"go-rest/logger"
	"go-rest/util"
)

type service struct {
	dashboardRepo    DashboardRepo
	userRepo         UserRepo
	dataCampaignRepo DataCampaignRepo

	errRepo ErrorRepo
	cache   Cache
}

func NewService(dashboardRepo DashboardRepo, userRepo UserRepo, dataCampaignRepo DataCampaignRepo, errorRepo ErrorRepo, cache Cache) Service {
	return &service{
		dashboardRepo:    dashboardRepo,
		userRepo:         userRepo,
		dataCampaignRepo: dataCampaignRepo,

		errRepo: errorRepo,
		cache:   cache,
	}
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

func (s *service) CreateUser(ctx context.Context, std *User) error {
	return s.userRepo.Create(ctx, std)
}

func (s *service) FindUserByID(ctx context.Context, userID string) (*User, error) {
	user, err := s.userRepo.FindByID(ctx, userID) // Use FindByID method in userRepo
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}
	return user, nil
}

func (s *service) FindUserByUsername(ctx context.Context, username string) (*User, error) {
	user, err := s.userRepo.Find(ctx, username)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}
	return user, nil
}

func (s *service) CreateUserProfile(ctx context.Context, ID string, profile *Profile) (*UserProfile, error) {
	return s.userRepo.CreateProfile(ctx, ID, profile)
}

func (s *service) GetUserProfile(ctx context.Context, userID string) (*Profile, error) {
	return s.userRepo.GetProfileById(ctx, userID)
}

func (s *service) GetUserProfileByBusinessName(ctx context.Context, name string) (*Profile, error) {
	return s.userRepo.GetProfileByBusiness(ctx, name)
}

func (s *service) GetUserProfileByLeadName(ctx context.Context, lead string) (*Profile, error) {
	return s.userRepo.GetProfileByLead(ctx, lead)
}

func (s *service) GetUserProfileByEmailAddress(ctx context.Context, address string) (*Profile, error) {
	return s.userRepo.GetProfileByEmail(ctx, address)
}

func (s *service) GetUserProfileByNidNumber(ctx context.Context, nid string) (*Profile, error) {
	return s.userRepo.GetProfileByNid(ctx, nid)
}

func (s *service) GetUserProfileByKamNumber(ctx context.Context, kam string) (*Profile, error) {
	return s.userRepo.GetProfileByNid(ctx, kam)
}

func (s *service) GetUserProfileByPocNumber(ctx context.Context, poc string) (*Profile, error) {
	return s.userRepo.GetProfileByPoc(ctx, poc)
}

func (s *service) CreateDataCampaign(ctx context.Context, userID string, masking string, campaigns []*Campaign) ([]*Campaign, error) {
	// Iterate through the list of campaigns and associate each one with the provided userID
	for _, campaign := range campaigns {
		campaign.UserID = userID
	}

	// Call the repository method to create the campaigns
	return s.dataCampaignRepo.CreateCampaign(ctx, userID, masking, campaigns)
}

func (s *service) GetUserDataCampaignReport(ctx context.Context, ID string, from string, to string) ([]byte, error) {
	return s.dataCampaignRepo.GetDataCampaignReport(ctx, ID, from, to)
}

func (s *service) GetDataCampaignByUserId(ctx context.Context, userID string) ([]*Campaign, error) {
	return s.dataCampaignRepo.GetCampaignByUserId(ctx, userID)
}

func (s *service) SubmitSingleDatapack(ctx context.Context, std *util.SingleDataPack) error {
	return s.dataCampaignRepo.SingleDatapack(ctx, std)
}
