package rest

import (
	"errors"
	"go-rest/config"
	"go-rest/logger"
	"go-rest/svc"
	"go-rest/util"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// @Summary Log in as an admin
// @Description Log in as an admin with a valid username and password
// @Tags admin
// @Accept json
// @Produce json
// @Param req body CreateAdminRequest true "Admin login request"
// @Success 200 {object} loginResponse
// @Failure 400 {object} ErrorResponse
// @Failure 404 {object} ErrorResponse
// @Failure 500 {object} ErrorResponse
// @Router /api/admins/login [post]
func (s *Server) loginAdmin(ctx *gin.Context) {

	var req CreateAdminRequest
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad request"))
		return
	}

	logger.Info(ctx, "failed", req)

	user, err := s.svc.FindAdminByUsername(req.Username)
	if err != nil {
		logger.Error(ctx, "cannot get user", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	if user == nil {
		logger.Error(ctx, "user not found", err)
		ctx.JSON(http.StatusNotFound, s.svc.Error(ctx, util.EN_NOT_FOUND, "Not Found"))
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), ([]byte(req.Password)))
	if err != nil {
		logger.Error(ctx, "cannot decrypt the password", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	token, err := GenerateToken(user.ID, &config.Token{JWToken: s.jwt.JWToken})
	if err != nil {
		logger.Error(ctx, "failed to generate token", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	loginRes := loginResponse{
		Token: token,
	}

	ctx.SetCookie("token", token, 3600, "/", "", false, true)
	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "successfully logged in", loginRes))
	
}


// @Summary Create a new admin
// @Description Create a new admin with a unique username and password
// @Tags admin
// @Accept json
// @Produce json
// @Param req body CreateAdminRequest true "Admin creation request"
// @Success 200 {string} string "Admin created successfully"
// @Failure 400 {object} ErrorResponse
// @Failure 500 {object} ErrorResponse
// @Router /api/admins/create [post]
func (s *Server) createAdmin(ctx *gin.Context) {
	var adminRequest CreateAdminRequest
	if err := ctx.ShouldBindJSON(&adminRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if admin already exists
	existingAdmin, err := s.svc.FindAdminByUsername(adminRequest.Username)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Admin not found, continue
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
			return
		}
	}

	if existingAdmin != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Admin with the same username already exists"})
		return
	}

	// Hash password
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(adminRequest.Password), s.salt.SecretKey)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Could not hash password"})
		return
	}

	// Create admin in database
	adminID, err := uuid.NewUUID()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	admin := svc.Admin{
		ID:        adminID.String(),
		Username:  adminRequest.Username,
		Password:  string(hashedPass),
		CreatedAt: util.GetCurrentTimestamp(),
	}

	err = s.svc.CreateAdmin(&admin)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Admin created successfully"})
}


// @Summary Get all users
// @Description Get a list of all users in the system
// @Tags admin
// @Accept json
// @Produce json
// @Success 200 {array} userResponse
// @Failure 500 {object} ErrorResponse
// @Router /api/admins/users [get]
func (s *Server) users(ctx *gin.Context) {
	allUsers := s.svc.GetAllUsers()

	var response []userResponse

	for _, user := range allUsers {
		response = append(response, userResponse{
			UserID: user.ID,
			Email:  user.Email,
		})
	}

	ctx.JSON(http.StatusOK, response)
}
