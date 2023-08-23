package rest

type Product struct {
	ProductID    string  `json:"product_id"`
	ProductName  string  `json:"product_name"`
	ProductDesc  string  `json:"product_desc"`
	ProductPrice float64 `json:"product_price"`
}

type PurchaseRequest struct {
	UserID     string   `json:"user_id"`
	ProductIDs []string `json:"product_ids"`
}

// Define the SuccessResponse struct
type SuccessResponse struct {
	Message string `json:"message"`
}

// Define the ErrorResponse struct
type ErrorResponse struct {
	Message string `json:"message"`
}

// Define the eventData struct outside the controller
type EventData struct {
	Data struct {
		ID             string `json:"id"`
		EmailAddresses []struct {
			EmailAddress string `json:"email_address"`
		} `json:"email_addresses"`
	} `json:"data"`
	// You can add more fields here based on the request body
	// For example: birthday, created_at, etc.
}

type userResponse struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
}

type CreateAdminRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type loginResponse struct {
	Token string `json:"token"`
}