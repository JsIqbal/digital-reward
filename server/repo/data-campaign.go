package repo

import (
	"context"
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

func (r *dataCampaignRepo) CreateCampaign(ctx context.Context, ID string, campaign *svc.Campaign) (*svc.Campaign, error) {
	camp := &svc.Campaign{
        ID :        campaign.ID,  
		UserID    :   ID,
		CampaignName :campaign.CampaignName,
		StartTime : campaign.StartTime,
		EndTime      :  campaign.EndTime,
		Masking   :   campaign.Masking,
		Number        :  campaign.Number,
		Operator    : campaign.Operator,
		Reward    : campaign.Reward,
		Description    : campaign.Description,
    }

	if err := r.db.Create(camp).Error; err != nil {
        return nil, err
    }

    return camp, nil
}