// admin_profile.go

package svc

import "gorm.io/gorm"

type AdminProfile struct {
    gorm.Model
    ProfileID uint `json:"profile_id"`
    AdminID   uint `json:"admin_id"`
}
