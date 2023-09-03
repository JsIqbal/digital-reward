package svc

import (
	"gorm.io/gorm"
)

type UserProfile struct {
	gorm.Model
	UserID    string `json:"user_id"`
	ProfileID string `json:"profile_id"`
}
