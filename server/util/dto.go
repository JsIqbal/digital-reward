package util

type Credentials struct {
	ClientID       string
	ClientSecret   string
	Username       string
	Password       string
	MSISDN         string // Target mobile number
	Name           string // Name of the data pack
	Recurring      string // Yes/No
	CNThirdPartyID string // For reporting & complaint management
}

type SingleDataPack struct {
	ID            string `json:"ID"`
	Masking       string `json:"masking"`
	CampaignName  string `json:"campaign_name"`
	Reciever      string `json:"reciever"`
	ProvisionName string `json:"provision_name"`
	RewardMessage string `json:"reward_message"`
	Status        string `json:"status" default:"pending"`
	CreatedAt     int64  `json:"CreatedAt"`
}
