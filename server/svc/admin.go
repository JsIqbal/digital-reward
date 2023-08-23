package svc

import "gorm.io/gorm"

type Admin struct {
	gorm.Model
	ID        string `json:"ID"`
	Username  string `json:"username"`
	Password string `json:"password"`
	CreatedAt int64  `json:"CreatedAt"`
}
