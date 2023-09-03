package svc

import "gorm.io/gorm"

type Profile struct {
	gorm.Model
	ID        string `json:"ID"`
	BusinessName  string `json:"business_name"`
	BusinessIdentificationNumber string `json:"business_id_num"`
	TinNumber string `json:"tin_num"`
	BusinessPocName string `json:"business_poc"`
	BusinessPocMobile string `json:"business_mobile"`
	PocNIDNumber string `json:"poc_nid_num"`
	KAMName string `json:"kam_name"`
	KAMNameBusinessPocEmail string `json:"kam_business_poc_email"`
	CreatedAt int64  `json:"CreatedAt"`
}
