package svc

import "gorm.io/gorm"

type User struct {
	gorm.Model
	ID        string `json:"ID"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	CreatedAt int64  `json:"CreatedAt"`
}
