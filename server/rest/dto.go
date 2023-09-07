package rest

import (
	"go-rest/svc"
)

type Product struct {
	ProductID    string  `json:"product_id"`
	ProductName  string  `json:"product_name"`
	ProductDesc  string  `json:"product_desc"`
	ProductPrice float64 `json:"product_price"`
}

type PurchaseRequest struct {
	UserID     string   `json:"user_id"`
	ProductIDs []string `json:"product_ids"`
}

// Define the SuccessResponse struct
type SuccessResponse struct {
	Message string `json:"message"`
}

// Define the ErrorResponse struct
type ErrorResponse struct {
	Message string `json:"message"`
}

// Define the eventData struct outside the controller
type EventData struct {
	Data struct {
		ID             string `json:"id"`
		EmailAddresses []struct {
			EmailAddress string `json:"email_address"`
		} `json:"email_addresses"`
	} `json:"data"`
	// You can add more fields here based on the request body
	// For example: birthday, created_at, etc.
}

type userResponse struct {
	UserID   string `json:"user_id"`
	Username string `json:"username"`
}

type CreateUserRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}


type loginResponse struct {
	Token string `json:"token"`
}

type UserResponse struct {
	UserID   string `json:"user_id"`
	Username string `json:"username"`
}

type CreateUserProfileRequest struct {
	BusinessName string `form:"businessName" binding:"required"`
	BusinessLead string `form:"businessLead" binding:"required"`
	PocMobile    string `form:"pocMobile" binding:"required"`
	Email        string `form:"email" binding:"required,email"`
	NID          string `form:"nid" binding:"required"`
	KamName      string `form:"kamName"`
}

type CreateCampaignRequest struct {
    CampaignName       string    `json:"campaignName" binding:"required"`
    StartTime          string `json:"startTime" binding:"required"`
    EndTime            string `json:"endTime" binding:"required"`
    Masking            string    `json:"masking" binding:"required"`
    Number             int64     `json:"number" binding:"required"`
    OperatorName       string    `json:"operatorName" binding:"required"`
    RewardName         string    `json:"rewardName" binding:"required"`
    CampaignDescription string    `json:"campaignDescription" binding:"required"`
}



type GetUserProfileResponse struct {
	User    *svc.User
	Profile *svc.Profile
}
