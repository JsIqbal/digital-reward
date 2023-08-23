package svc

import "gorm.io/gorm"

type Dashboard struct {
	gorm.Model
	Id  string `json:"id"`
	Url string `json:"url"`
}
