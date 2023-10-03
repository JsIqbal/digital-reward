package svc

import (
	"gorm.io/gorm"
)

type SingleDataPack struct {
	gorm.Model
	ID            string `json:"ID"`
	Username      string `json:"username"`
	Password      string `json:"password"`
	Masking       string `json:"masking"`
	Reciever      string `json:"reciever"`
	ProvisionName string `json:"provision_name"`
	RewardMessage string `json:"reward_message"`
	Status        bool   `json:"status" gorm:"default:false"`
	CreatedAt     int64  `json:"CreatedAt"`
}
