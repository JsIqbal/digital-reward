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

var (
	// ErrProfileNotFound is returned when a user's profile is not found.
	ErrProfileNotFound = errors.New("profile not found controller")
)

// @Summary Create a new user
// @Description Create a new user with a unique username and password
// @Tags user
// @Accept json
// @Produce json
// @Param req body CreateUserRequest true "User creation request"
// @Success 200 {string} string "User created successfully"
// @Failure 400 {object} ErrorResponse
// @Failure 500 {object} ErrorResponse
// @Router /api/auth/sign-up [post]
func (s *Server) createUser(ctx *gin.Context) {
	var req CreateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	existingUser, err := s.svc.FindUserByUsername(ctx, req.Username)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
		} else {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
			return
		}
	}

	if existingUser != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "user with the same username already exists"})
		return
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(req.Password), s.salt.SecretKey)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Could not hash password"})
		return
	}

	userID, err := uuid.NewUUID()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	user := svc.User{
		ID:        userID.String(),
		Username:  req.Username,
		Password:  string(hashedPass),
		CreatedAt: util.GetCurrentTimestamp(),
	}

	err = s.svc.CreateUser(ctx, &user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "user created successfully"})
}

// @Summary Log in as an user
// @Description Log in as an user with a valid username and password
// @Tags user
// @Accept json
// @Produce json
// @Param req body CreateUserRequest true "User login request"
// @Success 200 {object} loginResponse
// @Failure 400 {object} ErrorResponse
// @Failure 404 {object} ErrorResponse
// @Failure 500 {object} ErrorResponse
// @Router /api/auth/sign-in [post]
func (s *Server) loginUser(ctx *gin.Context) {
	var req CreateUserRequest
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad request"))
		return
	}

	logger.Info(ctx, "failed", req)

	user, err := s.svc.FindUserByUsername(ctx, req.Username)

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

	// Generate token
	token, err := GenerateToken(user.ID, &config.Token{JWToken: s.jwt.JWToken})
	if err != nil {
		logger.Error(ctx, "failed to generate token", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	// Create a user response without the password
	loginRes := loginResponse{
		Token: token,
	}

	// Set the token as a cookie and send the login response
	ctx.SetCookie("token", token, 3600, "/", "http://localhost:3000", false, true)
	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "successfully logged in", loginRes))
}

// @Summary Get Logged In User
// @Description Get the details of the logged-in user
// @Tags user
// @Security ApiKeyAuth
// @Produce json
// @Success 200 {object} UserResponse
// @Failure 401 {object} ErrorResponse
// @Failure 500 {object} ErrorResponse
// @Router /api/users/user [get]
func (s *Server) getLoggedInUser(ctx *gin.Context) {
	authPayload := ctx.MustGet(authorizationPayloadKey).(Payload)

	user, err := s.svc.FindUserByID(ctx, authPayload.ID)
	if err != nil {
		logger.Error(ctx, "cannot find user", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Bad request"))
		return
	}

	userResponse := UserResponse{
		UserID:   user.ID,
		Username: user.Username,
	}

	ctx.JSON(http.StatusOK, userResponse)
}

// logout godoc
// @Summary Log out the user
// @Description Log out the user by removing the token cookie from the browser
// @Tags user
// @Accept json
// @Produce json
// @Success 200 {object} SuccessResponse
// @Router /api/users/logout [post]
func (s *Server) logout(ctx *gin.Context) {
	ctx.SetCookie("token", "", -1, "/", "", false, true)
	ctx.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}

// profile creates a user profile.
//
// @Summary Create user profile
// @Description Create a new user profile.
// @Tags user
// @Accept json
// @Produce json
// @Param Authorization header string true "Authorization header"
// @Param req body CreateUserProfileRequest true "User profile request"
// @Success 201 {object} map[string]interface{} "Successfully created user profile"
// @Failure 400 {object} ErrorResponse "Bad Request"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 409 {object} ErrorResponse "Conflict"
// @Failure 500 {object} ErrorResponse "Internal Server Error"
// @Router /api/users/profile [post]
func (s *Server) profile(ctx *gin.Context) {
	var req CreateUserProfileRequest
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad request"))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(Payload)

	profile, err := s.svc.GetUserProfile(ctx, authPayload.ID)
	if err != nil {
		logger.Error(ctx, "error fetching user profile", err)
		// If there's an error, it means the user's profile doesn't exist, so proceed to create it.
	} else if profile != nil {
		// A profile already exists for this user
		ctx.JSON(http.StatusConflict, s.svc.Error(ctx, util.EN_ALREADY_REGISTERED_ERROR, "Already Registered"))
		return
	}

	// If profile is nil or there's an error, it means the user's profile doesn't exist, so proceed to create the profile.

	userID, err := uuid.NewUUID()
	if err != nil {
		logger.Error(ctx, "cannot generate user id", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	profile = &svc.Profile{
		ID:           userID.String(),
		UserID:       authPayload.ID,
		BusinessName: req.BusinessName,
		BusinessLead: req.BusinessLead,
		Email:        req.Email,
		KAMName:      req.KamName,
		Nid:          req.NID,
		PocMobile:    req.PocMobile,
		CreatedAt:    util.GetCurrentTimestamp(),
	}

	userProfile, err := s.svc.CreateUserProfile(ctx, authPayload.ID, profile)

	if err != nil {
		logger.Error(ctx, "cannot store user into db", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	ctx.JSON(http.StatusCreated, s.svc.Response(ctx, "Successfully created", userProfile))
}

// @Summary Get User Profile
// @Description Retrieve the user's profile and associated user data.
// @Tags user
// @Security BearerAuth
// @Produce json
// @Success 200 {object} SuccessResponse
// @Failure 500 {object} ErrorResponse
// @Failure 401 {object} ErrorResponse
// @Failure 404 {object} ErrorResponse
// @Router /api/users/profile [get]
func (s *Server) getUserProfile(ctx *gin.Context) {
	authPayload := ctx.MustGet(authorizationPayloadKey).(Payload)

	profile, err := s.svc.GetUserProfile(ctx, authPayload.ID)
	if err != nil {
		logger.Error(ctx, "cannot get user profile", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	user, err := s.svc.FindUserByID(ctx, authPayload.ID)
	if err != nil {
		logger.Error(ctx, "user not found", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_NOT_FOUND, "Not Found"))
		return
	}

	responseData := GetUserProfileResponse{
		User:    user,
		Profile: profile,
	}

	ctx.JSON(http.StatusOK, s.svc.Response(ctx, "Logged in user data", responseData))
}
