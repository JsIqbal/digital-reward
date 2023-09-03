package svc

// import "gorm.io/gorm"

// type Profile struct {
// 	gorm.Model
// 	ID           string `json:"ID"`
// 	BusinessName string `json:"business_name"`
// 	BusinessLead string `json:"business_lead"`
// 	Email        string `json:"email"`
// 	KAMName      string `json:"kam_name"`
// 	Nid          string `json:"nid"`
// 	PocMobile    string `json:"poc_mobile"`
// 	CreatedAt    int64  `json:"CreatedAt"`
// }

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
    KAMName      string `json:"kam_name"`
    Nid          string `json:"nid"`
    PocMobile    string `json:"poc_mobile"`
    CreatedAt    int64  `json:"CreatedAt"`
}
