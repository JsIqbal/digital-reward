package svc

import (
	"gorm.io/gorm"
)

type Profile struct {
	gorm.Model
	ID           string `json:"ID"`
	UserID       string `json:"user_id"` // Reference to User
	BusinessName string `json:"business_name"`
	BusinessLead string `json:"business_lead"`
	Email        string `json:"email"`
	Nid          string `json:"nid"`
	KAMName      string `json:"kam_name"`
	PocMobile    string `json:"poc_mobile"`
	Status       bool   `json:"status" gorm:"default:false"`
	CreatedAt    int64  `json:"CreatedAt"`
}
