package repo

import (
	"context"
	"errors"
	"go-rest/svc"

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
        // Check if a campaign with the same name already exists
        existingCampaigns, err := r.FindByCampaignName(ctx, campaign.CampaignName)
        if err != nil {
            return nil, err
        }

        // If a campaign with the same name exists, return an error
        if len(existingCampaigns) > 0 {
            return nil, errors.New("campaign with the same name already exists")
        }
    }

    // Create campaigns in the database
    if err := r.db.Create(&campaigns).Error; err != nil {
        return nil, err
    }

    return campaigns, nil
}


func (r *dataCampaignRepo) FindByCampaignName(ctx context.Context, campaignName string) ([]*svc.Campaign, error) {
    var campaigns []*svc.Campaign

    if err := r.db.Where("campaign_name = ?", campaignName).Find(&campaigns).Error; err != nil {
        return nil, err
    }

    return campaigns, nil
}
