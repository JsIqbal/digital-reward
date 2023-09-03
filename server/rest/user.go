package rest

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// logout godoc
// @Summary Log out the admin
// @Description Log out the user by removing the token cookie from the browser
// @Tags admin
// @Accept json
// @Produce json
// @Success 200 {object} SuccessResponse
// @Router /api/users/logout [post]
func (s *Server) logout(ctx *gin.Context) {
	ctx.SetCookie("token", "", -1, "/", "", false, true)
	ctx.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}
