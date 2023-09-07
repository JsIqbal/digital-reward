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

func (r *dataCampaignRepo) CreateCampaign(ctx context.Context, ID string, campaigns []*svc.Campaign) ([]*svc.Campaign, error) {
    // Create campaigns in the database
    if err := r.db.Create(&campaigns).Error; err != nil {
        return nil, err
    }

    return campaigns, nil
}
