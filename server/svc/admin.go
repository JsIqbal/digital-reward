// package svc

// import "gorm.io/gorm"

// type Admin struct {
// 	gorm.Model
// 	ID        string `json:"ID"`
// 	Username  string `json:"username"`
// 	Password string `json:"password"`
// 	CreatedAt int64  `json:"CreatedAt"`
// }

// admin.go

package svc

import "gorm.io/gorm"

type Admin struct {
    gorm.Model
    ID        string `json:"ID"`
    Username  string `json:"username"`
    Password  string `json:"password"`
    CreatedAt int64  `json:"CreatedAt"`

    // Define a relationship with AdminProfile
    AdminProfile AdminProfile `json:"admin_profile"`
}
