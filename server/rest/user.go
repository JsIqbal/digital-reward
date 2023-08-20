package rest

import (
	"fmt"
	"net/http"

	"go-rest/logger"
	"go-rest/svc"
	"go-rest/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func (s *Server) createUser(ctx *gin.Context) {
	// validating req obj
	var req createUserReq
	err := ctx.ShouldBindJSON(&req)
	if err != nil {
		logger.Error(ctx, "cannot pass validation", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_API_PARAMETER_INVALID_ERROR, "Bad request"))
		return
	}

	user, err := s.svc.FindUser(ctx, req.Email)
	if err != nil {
		logger.Error(ctx, "cannot get user", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	if user != nil {
		logger.Error(ctx, "already registered user", nil)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_ALREADY_REGISTERED_ERROR, "Already registered"))
		return
	}

	fmt.Println("the salt", s.salt.SecretKey)
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(req.Password), s.salt.SecretKey)
	if err != nil {
		logger.Error(ctx, "cannot hash the password", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	fmt.Println("the hashed pass", hashedPass)

	// create random user id
	userID, err := uuid.NewUUID()
	if err != nil {
		logger.Error(ctx, "cannot generate user id", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	user = &svc.User{
		ID:        userID.String(),
		Username:  req.Username,
		Email:     req.Email,
		Password:  string(hashedPass),
		CreatedAt: util.GetCurrentTimestamp(),
	}

	err = s.svc.CreateUser(ctx, user)
	if err != nil {
		logger.Error(ctx, "cannot store user into db", err)
		ctx.JSON(http.StatusInternalServerError, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Internal server error"))
		return
	}

	// send response
	userRes := createUserRes{
		ID:        user.ID,
		Username:  user.Username,
		Email:     user.Email,
		CreatedAt: user.CreatedAt,
	}

	ctx.JSON(http.StatusCreated, s.svc.Response(ctx, "Successfully created", userRes))
}
