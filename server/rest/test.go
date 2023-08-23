package rest

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// test godoc
// @Summary Test the server
// @Description Test the server by sending a request to this endpoint
// @Tags test
// @Accept json
// @Produce json
// @Success 200 {object} SuccessResponse
// @Router /api/test [get]
func (s *Server) test(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "Testing Route"})
}

