// package svc

// import (
// 	"time"

// 	"gorm.io/gorm"
// )

// type Profile struct {
//     gorm.Model
//     ID                         uint      `json:"ID"`
//     BusinessName               string    `json:"business_name"`
//     BusinessIdentificationNumber string    `json:"business_id_num"`
//     TinNumber                  string    `json:"tin_num"`
//     BusinessPocName            string    `json:"business_poc"`
//     BusinessPocMobile          string    `json:"business_mobile"`
//     PocNIDNumber               string    `json:"poc_nid_num"`
//     KAMName                    string    `json:"kam_name"`
//     KAMNameBusinessPocEmail    string    `json:"kam_business_poc_email"`
//     CreatedAt                  time.Time `json:"created_at"`
// }

// profile.go

package svc

import (
	"time"

	"gorm.io/gorm"
)

type Profile struct {
    gorm.Model
    ID                         uint      `json:"ID"`
    BusinessName               string    `json:"business_name"`
    BusinessIdentificationNumber string    `json:"business_id_num"`
    TinNumber                  string    `json:"tin_num"`
    BusinessPocName            string    `json:"business_poc"`
    BusinessPocMobile          string    `json:"business_mobile"`
    PocNIDNumber               string    `json:"poc_nid_num"`
    KAMName                    string    `json:"kam_name"`
    KAMNameBusinessPocEmail    string    `json:"kam_business_poc_email"`
    CreatedAt                  time.Time `json:"created_at"`

    // Define a relationship with AdminProfile
    AdminProfile AdminProfile `json:"admin_profile"`
}
