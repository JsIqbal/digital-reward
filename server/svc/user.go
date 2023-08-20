package svc

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID        string `json:"ID"`
	Username  string `json:"Username"`
	Email     string `json:"Email"`
	Password  string `json:"Password"`
	CreatedAt int64  `json:"CreatedAt"`
}
