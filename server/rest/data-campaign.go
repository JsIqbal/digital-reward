package rest

import (
	"go-rest/svc"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)


func (s *Server) createCampaign(ctx *gin.Context) {
    var reqs []CreateCampaignRequest

    // Bind the list of campaign data from the request
    if err := ctx.BindJSON(&reqs); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    authPayload := ctx.MustGet(authorizationPayloadKey).(Payload)

    // Create a slice to hold the Campaign structs
    var campaigns []*svc.Campaign

    // Convert the CreateCampaignRequest structs to Campaign structs
    for _, req := range reqs {
        // Generate a UUID for the ID field
        campaignID, err := uuid.NewUUID()
        if err != nil {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        campaign := &svc.Campaign{
            ID:                campaignID.String(), // Generate a UUID as the ID
            UserID:            authPayload.ID,     // Use the UserID from authPayload
            CampaignName:      req.CampaignName,
            StartTime:         req.StartTime,
            EndTime:           req.EndTime,
            Masking:           req.Masking,
            Number:            req.Number,
            Operator:          req.OperatorName,
            Reward:            req.RewardName,
            Status:            "pending",
            Description:       req.CampaignDescription,
        }
        campaigns = append(campaigns, campaign)
    }

    // Call the service method to create the campaigns
    createdCampaigns, err := s.svc.CreateDataCampaign(ctx, authPayload.ID, campaigns)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // Respond with success and the created campaigns if needed
    ctx.JSON(http.StatusOK, gin.H{"message": "Campaigns created successfully", "campaigns": createdCampaigns})
}



