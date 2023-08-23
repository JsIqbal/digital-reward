package repo

import (
	"fmt"
	"go-rest/svc"

	"gorm.io/gorm"
)

type DashboardRepo interface {
	Get() []*svc.Dashboard
}

type dashboardRepo struct {
	db *gorm.DB
}

func NewDashboardRepo(db *gorm.DB) DashboardRepo {
	return &dashboardRepo{
		db: db,
	}
}

func (r *dashboardRepo) Get() []*svc.Dashboard {
	var dashboards []*svc.Dashboard
	result := r.db.Find(&dashboards)

	if result.Error != nil {
		fmt.Println("Error while fetching dashboard images:", result.Error)
	}

	return dashboards
}
