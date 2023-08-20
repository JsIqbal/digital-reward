package rest

import "github.com/gin-gonic/gin"

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