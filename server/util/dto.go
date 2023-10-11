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
