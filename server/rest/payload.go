package rest

type Payload struct {
	ID       string `json:"id"`
	UserName string `json:"username"` // Add this field
}
