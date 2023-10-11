package svc

import (
	"gorm.io/gorm"
)

type Masking struct {
	gorm.Model
	ID        string `json:"ID"`
	UserID    string `json:"user_id"` // Reference to User
	Username  string `json:"username"`
	Password  string `json:"password"`
	Masking   string `json:"masking"`
	CreatedAt int64  `json:"CreatedAt"`
}
