package rest

// Define the SuccessResponse struct
type SuccessResponse struct {
	Message string `json:"message"`
}

// Define the ErrorResponse struct
type ErrorResponse struct {
	Message string `json:"message"`
}

type userResponse struct {
	UserID   string `json:"user_id"`
	Username string `json:"username"`
}

type CreateAdminRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type loginResponse struct {
	Token string `json:"token"`
}

type AdminResponse struct {
	UserID   string `json:"user_id"`
	Username string `json:"username"`
}

type FormData struct {
    BusinessName   string `form:"businessName" binding:"required"`
    BusinessLead   string `form:"businessLead" binding:"required"`
    PocMobile      string `form:"pocMobile" binding:"required,matches=^[0-9]{13}$"`
    Email          string `form:"email" binding:"required,email"`
    NID            string `form:"nid" binding:"required,matches=^[0-9]{10,16}$"`
    KamName        string `form:"kamName"`
    KamBusinessPocEmail string `form:"kamBusinessPocEmail" binding:"email"`
}