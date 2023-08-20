package repo

import (
	"context"
	"errors"
	"fmt"
	"go-rest/svc"

	"gorm.io/gorm"
)

type userRepo struct {
    db *gorm.DB
}

func NewUserRepo(db *gorm.DB) svc.UserRepo {
    return &userRepo{
        db: db,
    }
}

func (r *userRepo) Create(ctx context.Context, user *svc.User) error {
    result := r.db.Create(user)

    if result.Error != nil {
        fmt.Println("Error while creating user:", result.Error)
        return result.Error
    }

    return nil
}

func (r *userRepo) Find(ctx context.Context, email string) (*svc.User, error) {
	var user svc.User

	result := r.db.Where("email = ?", email).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil // Not found
		}
		return nil, fmt.Errorf("failed to retrieve user: %v", result.Error)
	}

	fmt.Println("the user from find->>", user)

	return &user, nil
}
