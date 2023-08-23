package repo

import (
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

func (r *userRepo) CreateUser(user *svc.User) {
	result := r.db.Create(user)

	if result.Error != nil {
		fmt.Println("Error while creating user:", result.Error)
	}
}

func (r *userRepo) GetUserByEmail(email string) (*svc.User, error) {
	var user svc.User
	result := r.db.Where("email = ?", email).First(&user)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}

	return &user, nil
}

func (r *userRepo) GetUserByID(userID string) (*svc.User, error) {
	var user svc.User
	result := r.db.Where("id = ?", userID).First(&user)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}

	return &user, nil
}


func (r *userRepo) Get() []*svc.User {
	// Declare a slice of pointers to svc.User
	var users []*svc.User

	// Find all records in the user table and append them to the slice
	result := r.db.Find(&users)
	if result.Error != nil {
		fmt.Println("Error while fetching all users:", result.Error)
		return nil
	}

	// Return the slice of users
	return users
}
