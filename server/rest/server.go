package rest

import (
	"fmt"
	"go-rest/config"
	"go-rest/logger"
	"go-rest/svc"

	"github.com/gin-gonic/gin"
)

type Server struct {
	router    *gin.Engine
	svc       svc.Service
	appConfig *config.Application
	jwt       *config.Token
	salt      *config.Salt
}

func NewServer(svc svc.Service, appConfig *config.Application, salt *config.Salt, jwt *config.Token) (*Server, error) {
	server := &Server{
		svc:       svc,
		appConfig: appConfig,
		salt:      salt,
		jwt:       jwt,
	}

	server.setupRouter()

	return server, nil
}

func (s *Server) setupRouter() {
	s.router = gin.Default() // Initialize the router here

	// Middleware & configuration
	s.router.Use(corsMiddleware)
	s.router.Use(logger.ModifyContext)
	s.router.Static("/docs", "./docs")

	// healtch check
	s.router.GET("/api/test", s.test)

	// public routes

	s.router.POST("/api/auth/sign-up", s.createUser)
	s.router.POST("/api/auth/sign-in", s.loginUser)

	// protected routes
	authRoutes := s.router.Group("/").Use(s.authMiddleware())

	authRoutes.GET("/api/users/user", s.getLoggedInUser)
	authRoutes.POST("/api/users/logout", s.logout)
	authRoutes.POST("/api/users/profile", s.profile)
	authRoutes.GET("/api/users/profile", s.getUserProfile)
	authRoutes.POST("/api/users/campaign", s.createCampaign)
	authRoutes.GET("/api/users/campaign", s.getCampaign)
	authRoutes.GET("/api/campaign/report", s.getCampaignReport)

}

func (s *Server) Start() error {
	return s.router.Run(fmt.Sprintf("%s:%s", s.appConfig.Host, s.appConfig.Port))
}
