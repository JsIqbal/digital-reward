package repo

import (
	"context"
	"fmt"

	"go-rest/svc"
	service "go-rest/svc"

	"gorm.io/gorm"
)

type ErrorRepo interface {
	service.ErrorRepo
}

type errorRepo struct {
	db *gorm.DB
}

func NewErrorRepo(db *gorm.DB) svc.ErrorRepo {
	return &errorRepo{
		db: db,
	}
}

func (r *errorRepo) GetError(ctx context.Context, internalCode string) (*service.ErrorDetail, error) {
    var errorDetail service.ErrorDetail

    // Use GORM to query for the error detail
    result := r.db.Table("ErrorTable").Select("InternalCode", "Message").
        Where("InternalCode = ?", internalCode).Scan(&errorDetail)

    if result.Error != nil {
        if result.Error == gorm.ErrRecordNotFound {
            return nil, nil // Not found
        }
        return nil, fmt.Errorf("failed to retrieve error detail: %v", result.Error)
    }

    return &errorDetail, nil
}

