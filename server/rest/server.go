package rest

import (
	"fmt"
	"go-rest/config"
	"go-rest/logger"
	"go-rest/svc"
	"net/http"

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

func (server *Server) setupRouter() {
	server.router = gin.Default() // Assign the created router to the router field

	// CORS middleware
	server.router.Use(corsMiddleware)

	// log middleware
	server.router.Use(logger.ModifyContext)

	// healtch check
	server.router.GET("/api/test", server.test)

	// public routes
	server.router.POST("/api/users/signup", server.createUser)
}

func (s *Server) Start() error {
	return s.router.Run(fmt.Sprintf("%s:%s", s.appConfig.Host, s.appConfig.Port))
}

func (server *Server) test(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, "testing")
}
