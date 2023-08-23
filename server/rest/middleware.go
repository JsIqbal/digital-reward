package rest

import (
	"fmt"
	"net/http"
	"time"

	"go-rest/config"
	"go-rest/util"

	"go-rest/logger"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

const (
	authorizationHeaderKey  = "token"
	authorizationPayloadKey = "authorization_payload"
)

func (s *Server) authMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		accessToken, err := ctx.Cookie(authorizationHeaderKey)
		if err != nil {
			logger.Error(ctx, "error in getting cookie", err)
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, s.svc.Error(ctx, util.EN_UNAUTHENTICATED_ERROR, "Unauthorized"))
			return
		}

		if len(accessToken) == 0 {
			logger.Error(ctx, "authorization header is not provided", nil)
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, s.svc.Error(ctx, util.EN_UNAUTHENTICATED_ERROR, "Unauthorized"))
			return
		}

		// parse the JWT.
		token, err := jwt.Parse(accessToken, s.validateJWT)
		if err != nil {
			logger.Error(ctx, "failed to parse the JWT", err)
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, s.svc.Error(ctx, util.EN_UNAUTHENTICATED_ERROR, "Unauthorized"))
			return
		}

		// Check if the token is valid.
		if !token.Valid {
			logger.Error(ctx, "failed to create JWKS from resource at the given URL", err)
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, s.svc.Error(ctx, util.EN_UNAUTHENTICATED_ERROR, "Unauthorized"))
			return
		}

		logger.Info(ctx, "The token is valid", nil)

		// Get the token claims.
		claims := token.Claims.(jwt.MapClaims)

		payload := Payload{
			ID: claims["id"].(string),
			// UserName:     claims["sub"].(string),
			// BusinessName: claims["custom:businessName"].(string),
			// Role:         claims["custom:role"].(string),
			// WalletNumber: claims["custom:walletNumber"].(string),
			// Email:        claims["email"].(string),
		}

		logger.Info(ctx, "User Payload", payload)

		ctx.Set(authorizationPayloadKey, payload)
		ctx.Next()
	}
}

func GenerateToken(ID string, secret *config.Token) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	return token.SignedString([]byte(secret.JWToken))
}

func (s *Server) validateJWT(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
	}

	return []byte(s.jwt.JWToken), nil
}

func corsMiddleware(c *gin.Context) {
	// Get the origin from the request header
	origin := c.Request.Header.Get("Origin")

	// Set the Access-Control-Allow-Origin header to the origin of the client application
	c.Writer.Header().Set("Access-Control-Allow-Origin", origin)

	// Allow specific headers
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token")

	// Allow all methods
	c.Writer.Header().Set("Access-Control-Allow-Methods", "*")

	// Allow credentials
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

	// Handle OPTIONS method
	if c.Request.Method == "OPTIONS" {
		c.AbortWithStatus(204)
		return
	}

	c.Next()
}