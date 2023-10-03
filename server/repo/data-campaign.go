package repo

import (
	"archive/zip"
	"bytes"
	"context"
	"encoding/csv"
	"errors"
	"fmt"
	"go-rest/svc"
	"net/http"
	"net/url"
	"strconv"
	"time"

	"gorm.io/gorm"
)

type dataCampaignRepo struct {
	db *gorm.DB
}

func NewDataCampaignRepo(db *gorm.DB) svc.DataCampaignRepo {
	return &dataCampaignRepo{
		db: db,
	}
}

func (r *dataCampaignRepo) CreateCampaign(ctx context.Context, ID string, campaigns []*svc.Campaign) ([]*svc.Campaign, error) {
	for _, campaign := range campaigns {
		// Check if a campaign with the same name already exists for the user
		existingCampaigns, err := r.FindByUserIDAndCampaignName(ctx, ID, campaign.CampaignName)
		if err != nil {
			return nil, err
		}

		// If a campaign with the same name exists for the user, return an error
		if len(existingCampaigns) > 0 {
			return nil, errors.New("campaign with the same name already exists for the user")
		}
	}

	// Create campaigns in the database
	if err := r.db.Create(&campaigns).Error; err != nil {
		return nil, err
	}

	// After campaign creation, iterate through the campaigns and send SMS
	for _, campaign := range campaigns {
		// Send SMS
		err := sendSMS("zamzam_nonmasking", "Windows@6677", "8801847121242", campaign.Number, campaign.Description)
		if err != nil {
			// Handle the error, e.g., log it
			fmt.Printf("Failed to send SMS to %d: %v\n", campaign.Number, err)
		} else {
			// SMS sent successfully, mark the number as completed
			fmt.Printf("SMS sent to %d\n", campaign.Number)

			// Update the campaign's status in the database as completed
			if err := r.db.Model(&campaign).Update("Status", "completed").Error; err != nil {
				return nil, err
			}
		}
	}

	return campaigns, nil
}

func sendSMS(username string, password string, from string, to int64, message string) error {
	apiUrl := "https://api.mobireach.com.bd/SendTextMessage"

	// Convert the 'to' variable to a string
	toStr := strconv.FormatInt(to, 10)

	// Create a URL with query parameters
	u, err := url.Parse(apiUrl)
	if err != nil {
		return err
	}

	q := u.Query()
	q.Set("Username", username)
	q.Set("Password", password)
	q.Set("From", from)
	q.Set("To", toStr) // Pass the string representation of 'to'
	q.Set("Message", message)

	u.RawQuery = q.Encode()

	// Send an HTTP GET request to the API
	resp, err := http.Get(u.String())
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Check the API response status code
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API returned status code %d", resp.StatusCode)
	}

	return nil
}

func (r *dataCampaignRepo) FindByCampaignName(ctx context.Context, campaignName string) ([]*svc.Campaign, error) {
	var campaigns []*svc.Campaign

	if err := r.db.Where("campaign_name = ?", campaignName).Find(&campaigns).Error; err != nil {
		return nil, err
	}

	return campaigns, nil
}

func (r *dataCampaignRepo) FindByUserIDAndCampaignName(ctx context.Context, userID string, campaignName string) ([]*svc.Campaign, error) {
	var campaigns []*svc.Campaign

	if err := r.db.Where("user_id = ? AND campaign_name = ?", userID, campaignName).Find(&campaigns).Error; err != nil {
		return nil, err
	}

	return campaigns, nil
}

func (r *dataCampaignRepo) GetCampaignByUserId(ctx context.Context, userID string) ([]*svc.Campaign, error) {
	var campaigns []*svc.Campaign

	if err := r.db.Where("user_id = ?", userID).Find(&campaigns).Error; err != nil {
		return nil, err
	}

	return campaigns, nil
}

func (r *dataCampaignRepo) GetDataCampaignReport(ctx context.Context, userID string, from string, to string) ([]byte, error) {
	userCampaigns, err := r.GetCampaignByUserId(ctx, userID)
	if err != nil {
		return nil, err
	}

	fromDate, err := time.Parse(time.RFC3339, from)
	if err != nil {
		return nil, fmt.Errorf("error parsing 'from' date: %v", err)
	}

	toDate, err := time.Parse(time.RFC3339, to)
	if err != nil {
		return nil, fmt.Errorf("error parsing 'to' date: %v", err)
	}

	var filteredCampaigns []*svc.Campaign

	for _, campaign := range userCampaigns {
		campaignStartTime, err := time.Parse("2006-01-02T15:04", campaign.StartTime)
		if err != nil {
			fmt.Printf("Error parsing campaign start time: %v\n", err)
			continue // Skip campaigns with invalid start time
		}

		campaignEndTime, err := time.Parse("2006-01-02T15:04", campaign.EndTime)
		if err != nil {
			fmt.Printf("Error parsing campaign end time: %v\n", err)
			continue // Skip campaigns with invalid end time
		}

		if campaignStartTime.After(fromDate) && campaignEndTime.Before(toDate) {
			filteredCampaigns = append(filteredCampaigns, campaign)
		}
	}

	// Generate CSV data
	var csvData bytes.Buffer
	csvWriter := csv.NewWriter(&csvData)

	// Write CSV headers
	headers := []string{"ID", "UserID", "CampaignName", "StartTime", "EndTime", "Masking", "Number", "Operator", "Reward", "Description", "Status"}
	csvWriter.Write(headers)

	// Write CSV rows
	for _, campaign := range filteredCampaigns {
		csvWriter.Write([]string{
			campaign.ID,
			campaign.UserID,
			campaign.CampaignName,
			campaign.StartTime,
			campaign.EndTime,
			campaign.Masking,
			strconv.FormatInt(campaign.Number, 10),
			campaign.Operator,
			campaign.Reward,
			campaign.Description,
			campaign.Status,
		})
	}

	csvWriter.Flush()

	// Create a zip archive
	var zipData bytes.Buffer
	zipWriter := zip.NewWriter(&zipData)

	// Create a file within the zip archive for the CSV data
	csvFile, err := zipWriter.Create("campaign_report.csv")
	if err != nil {
		return nil, err
	}

	// Write the CSV data to the file within the zip archive
	_, err = csvFile.Write(csvData.Bytes())
	if err != nil {
		return nil, err
	}

	// Close the zip archive
	if err := zipWriter.Close(); err != nil {
		return nil, err
	}

	return zipData.Bytes(), nil
}

func (r *dataCampaignRepo) SingleDatapack(ctx context.Context, std *svc.SingleDataPack) (*svc.SingleDataPack, error) {
	return nil, nil
}
