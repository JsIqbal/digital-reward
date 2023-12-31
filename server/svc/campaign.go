package svc

import (
	"gorm.io/gorm"
)

type Campaign struct {
	gorm.Model
	ID            string `json:"ID"`
	UserID        string `json:"user_id"` // Reference to User
	TransactionId string `json:"transaction_id"`
	CampaignName  string `json:"campaign_name"`
	StartTime     string `json:"start_time"`
	EndTime       string `json:"end_time"`
	Masking       string `json:"masking"`
	Number        int64  `json:"number"`
	Operator      string `json:"operator"`
	Reward        string `json:"reward"`
	Description   string `json:"description"`
	Status        string `json:"status"`
	CreatedAt     int64  `json:"CreatedAt"`
}
