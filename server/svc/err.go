package svc

import (
	"gorm.io/gorm"
)

type ErrorModel struct {
	gorm.Model
    InternalCode string
    Message      string
    // Additional fields if any
}
