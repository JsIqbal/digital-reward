package rest

import (
	"net/http"

	"go-rest/svc"

	"github.com/gin-gonic/gin"
)

func getDashboardImages(service svc.Service) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "Dashboard Images Request Recieved"})
	}
}