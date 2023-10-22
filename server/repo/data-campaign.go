package repo

import (
	"archive/zip"
	"bytes"
	"context"
	"encoding/csv"
	"encoding/json"
	"errors"
	"fmt"
	"go-rest/config"
	"go-rest/svc"
	"go-rest/util"
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"gorm.io/gorm"
)

var appConfig = config.GetApp()

type dataCampaignRepo struct {
	db *gorm.DB
}

func NewDataCampaignRepo(db *gorm.DB) svc.DataCampaignRepo {
	return &dataCampaignRepo{
		db: db,
	}
}

// helper function for creating a new data campaign
func (r *dataCampaignRepo) findMobiCredsByMasking(ctx context.Context, masking string) (*svc.Masking, error) {
	var m svc.Masking
	if err := r.db.Where("masking = ?", masking).First(&m).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Handle the case when no record is found
			return nil, fmt.Errorf("no matching record found for masking: %s", masking)
		}
		// Handle other database errors
		return nil, err
	}

	return &m, nil
}

func (r *dataCampaignRepo) CreateCampaign(ctx context.Context, ID string, masking string, campaigns []*svc.Campaign) ([]*svc.Campaign, error) {
	maskingCreds, err := r.findMobiCredsByMasking(ctx, masking)
	if err != nil {
		return nil, err
	}

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
		// Execute singleDataPack for this campaign
		recurring := "No"
		transactionID, err := singleDataPack(campaign.Number, recurring)
		fmt.Printf("--------------transactionID-----------------%+v", transactionID)
		if err != nil {
			// Handle the error from singleDataPack, e.g., log it
			fmt.Printf("Failed to provision data pack for %d: %v\n", campaign.Number, err)
			continue // Move to the next campaign if singleDataPack fails
		}

		// Send SMS
		err = sendSMS(maskingCreds.Username, maskingCreds.Password, maskingCreds.Masking, campaign.Number, campaign.Description)
		if err != nil {
			// Handle the error, e.g., log it
			fmt.Printf("Failed to send SMS to %d: %v\n", campaign.Number, err)
		} else {
			// SMS sent successfully, mark the number as completed
			fmt.Printf("SMS sent to %d\n", campaign.Number)

			// Update the campaign's status and TransactionId in the database as completed
			if err := r.db.Model(&campaign).Updates(map[string]interface{}{"Status": "completed", "TransactionId": transactionID}).Error; err != nil {
				// Handle the error, e.g., log it
				fmt.Printf("Failed to update campaign status: %v\n", err)
			}
		}
	}

	return campaigns, nil
}

// helper function for creating a new data campaign
func sendSMS(username string, password string, maskingName string, to int64, message string) error {
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
	q.Set("From", maskingName)
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

// helper function to create data campaign
func getAccessToken() (string, error) {
	// Define the token endpoint URL
	tokenURL := "https://api.robi.com.bd/token"

	// Create the request payload
	data := url.Values{}
	data.Set("grant_type", appConfig.ROBIGrantType)
	data.Set("username", appConfig.ROBIUsername)
	data.Set("password", appConfig.ROBIPass)
	data.Set("scope", appConfig.ROBIScope)

	// Encode the data
	payload := data.Encode()

	// Create a new HTTP POST request
	req, err := http.NewRequest("POST", tokenURL, bytes.NewBufferString(payload))
	if err != nil {
		return "", err
	}

	// Set the request headers
	req.Header.Set("Authorization", appConfig.ROBIAuth)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	// Send the HTTP request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Read and parse the response
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("failed to obtain access token: %s", body)
	}

	// Extract the access token from the response
	var tokenResponse map[string]interface{}
	if err := json.Unmarshal(body, &tokenResponse); err != nil {
		return "", err
	}

	accessToken, ok := tokenResponse["access_token"].(string)
	if !ok {
		return "", fmt.Errorf("access token not found in response")
	}

	return accessToken, nil
}

// provisionDataPack sends a data pack provisioning request

// helper function to create data campaign
func provisionDataPack(accessToken string, msisdn int64, recurring string) (string, error) {
	// Define the API endpoint URL
	apiURL := "https://api.robi.com.bd/adcs/adcspackProvisioningNormal/v1/packProvisioningNormal"

	// Create the request payload
	data := url.Values{}
	data.Set("MSISDN", strconv.FormatInt(msisdn, 10))
	data.Set("name", "1GB_OKB_EB_7D")
	data.Set("Recurring", recurring)
	data.Set("CN_THIRDPARTYID", "620")

	// Create a new HTTP POST request
	req, err := http.NewRequest("POST", apiURL, strings.NewReader(data.Encode()))
	if err != nil {
		return "", err
	}

	// Set the request headers
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	// Send the HTTP request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Read and parse the response
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	// if resp.StatusCode != http.StatusOK {
	// 	return "", fmt.Errorf("failed to send data pack provisioning request: %s", body)
	// }

	return string(body), nil
}

// helper function to create data campaign
func singleDataPack(msisdn int64, recurring string) (string, error) {
	accessToken, err := getAccessToken()
	if err != nil {
		fmt.Println("Error obtaining access token:", err)
		return "", err
	}

	response, err := provisionDataPack(accessToken, msisdn, recurring)
	if err != nil {
		return "", err
	}

	fmt.Println("Data Pack Provisioning Response:", response)

	var responseData map[string]interface{}
	if err := json.Unmarshal([]byte(response), &responseData); err != nil {
		return "", err
	}

	transactionID, ok := responseData["TransactionId"].(string)
	if !ok {
		return "", fmt.Errorf("TransactionId not found in response")
	}

	return transactionID, nil
}

func (r *dataCampaignRepo) SingleDatapack(ctx context.Context, std *util.SingleDataPack) error {
	return nil
}
