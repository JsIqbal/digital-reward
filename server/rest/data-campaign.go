package rest

import (
	"fmt"
	"go-rest/logger"
	"go-rest/svc"
	"go-rest/util"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func (s *Server) createCampaign(ctx *gin.Context) {
	var requestData CreateCampaignRequestData

	// Bind the JSON data from the request
	if err := ctx.BindJSON(&requestData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Access masking value
	masking := requestData.Masking

	// Access campaign requests
	reqs := requestData.Arra

	// The rest of your code to process campaign requests
	// ...

	fmt.Printf("Incoming Create Campaign Request (masking): %s\n", masking)
	fmt.Printf("Incoming Create Campaign Request (campaigns): %+v\n", reqs)
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
			ID:           campaignID.String(), // Generate a UUID as the ID
			UserID:       authPayload.ID,      // Use the UserID from authPayload
			CampaignName: req.CampaignName,
			StartTime:    req.StartTime,
			EndTime:      req.EndTime,
			Masking:      req.Masking,
			Number:       req.Number,
			Operator:     req.OperatorName,
			Reward:       req.RewardName,
			Status:       "pending",
			Description:  req.CampaignDescription,
		}
		campaigns = append(campaigns, campaign)
	}

	// Call the service method to create the campaigns
	createdCampaigns, err := s.svc.CreateDataCampaign(ctx, authPayload.ID, masking, campaigns)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Respond with success and the created campaigns if needed
	ctx.JSON(http.StatusOK, gin.H{"message": "Campaigns created successfully", "campaigns": createdCampaigns})
}

func setOperator(number int64) string {
	prefixes := []string{
		"88019",
		"88018",
		"88017",
		"88014",
		"88016",
		"88013",
		"88015",
	}
	operators := []string{
		"Banglalink",
		"Airtel/Robi",
		"Grameenphone",
		"Banglalink",
		"Airtel/Robi",
		"Grameenphone",
		"Teletalk",
	}

	numberString := strconv.FormatInt(number, 10) // Convert to string

	for i := 0; i < len(prefixes); i++ {
		if strings.HasPrefix(numberString, prefixes[i]) {
			return operators[i]
		}
	}

	// If the number doesn't match any of the prefixes, return a default value
	return "Unknown"
}

func (s *Server) apiCampaign(ctx *gin.Context) {
	var requestData util.SingleDataPack

	// Bind the JSON data from the request
	if err := ctx.BindJSON(&requestData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Access masking, receiver, and reward message
	masking := requestData.Masking
	operator := setOperator(requestData.Reciever)
	receiver := requestData.Reciever
	rewardMessage := requestData.RewardMessage
	provisionName := requestData.ProvisionName

	authPayload := ctx.MustGet(authorizationPayloadKey).(Payload)

	user, err := s.svc.FindUserByID(ctx, authPayload.ID)
	if err != nil {
		logger.Error(ctx, "cannot find user", err)
		ctx.JSON(http.StatusBadRequest, s.svc.Error(ctx, util.EN_INTERNAL_SERVER_ERROR, "Bad request"))
		return
	}

	campaignID, err := uuid.NewUUID()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// You can set the start time and end time to the requested time
	startTime := time.Now()
	startTimeStr := startTime.Format("2006-01-02T15:04")
	endTimeStr := startTime.Format("2006-01-02T15:04")

	campaign := &svc.Campaign{
		ID:           campaignID.String(), // Generate a UUID as the ID
		UserID:       authPayload.ID,      // Use the UserID from user
		CampaignName: "API_" + user.Username,
		StartTime:    startTimeStr,
		EndTime:      endTimeStr,
		Masking:      masking,
		Number:       receiver,
		Operator:     operator,
		Reward:       provisionName,
		Status:       requestData.Status,
		Description:  rewardMessage,
	}

	// Call the service method to create the campaign
	createdCampaign, err := s.svc.CreateApiDataCampaign(ctx, authPayload.ID, masking, campaign)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Campaigns created successfully", "campaigns": createdCampaign})
}

func (s *Server) rewardApiChecker(ctx *gin.Context) {
	transactionID := ctx.Param("id")

	checkRewardTransaction, err := s.svc.CheckRewardTransaction(ctx, transactionID)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, checkRewardTransaction)
}

func (s *Server) getCampaign(ctx *gin.Context) {
	// Get the user's ID from the authorization payload
	authPayload := ctx.MustGet(authorizationPayloadKey).(Payload)

	// Call the service method to get campaigns by user ID
	campaigns, err := s.svc.GetDataCampaignByUserId(ctx, authPayload.ID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Respond with the list of campaigns
	ctx.JSON(http.StatusOK, gin.H{"campaigns": campaigns})
}

func (s *Server) getCampaignReport(ctx *gin.Context) {
	// Retrieve 'from' and 'to' query parameters
	from := ctx.Query("from")
	to := ctx.Query("to")

	// Check if 'from' and 'to' are not empty
	if from == "" || to == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Both 'from' and 'to' query parameters are required"})
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(Payload)

	// Call the service method to get campaign data within the specified date range
	campaignData, err := s.svc.GetUserDataCampaignReport(ctx, authPayload.ID, from, to)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Respond with the campaign data
	ctx.JSON(http.StatusOK, gin.H{"campaignData": campaignData})
}
