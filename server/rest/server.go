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

	// CORS middleware
	s.router.Use(corsMiddleware)

	// log middleware
	s.router.Use(logger.ModifyContext)

	s.router.Static("/docs", "./docs")

	// healtch check
	s.router.GET("/api/test", s.test)

	// public routes

	s.router.POST("/api/auth/sign-in", s.loginAdmin)
	s.router.POST("/api/auth/sign-up", s.createAdmin)

	// protected routes
	authRoutes := s.router.Group("/").Use(s.authMiddleware())

	authRoutes.GET("/api/admins/users", s.users)
	authRoutes.POST("/api/admins/profile", s.createProfile)
	authRoutes.GET("/api/admins/profile", s.getLoggedInAdmin)
	authRoutes.POST("/api/users/logout", s.logout)

	// dashboardGroup.GET("/images", getDashboardImages(service))

}

func (s *Server) Start() error {
	return s.router.Run(fmt.Sprintf("%s:%s", s.appConfig.Host, s.appConfig.Port))
}
