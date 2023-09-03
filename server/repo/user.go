package repo

import (
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

func (r *userRepo) Login(user *svc.User) *svc.User {
	var participant svc.User
	result := r.db.Where("username = ?", user.Username).First(&participant)

	if result.Error != nil {
		fmt.Println("Error while fetching user:", result.Error)
		return nil
	}

	storedPassword := participant.Password
	providedPassword := user.Password

	fmt.Println("Stored Password:", storedPassword)
	fmt.Println("Provided Password:", providedPassword)

	if storedPassword == providedPassword {
		fmt.Println("Login Succeeded")
		return &participant
	} else {
		fmt.Println("Login Failed")
		return nil
	}
}

func (r *userRepo) Create(user *svc.User) error {
	result := r.db.Create(user)

	if result.Error != nil {
		fmt.Println("Error while creating user:", result.Error)
		return result.Error
	}

	return nil
}

func (r *userRepo) Find(username string) (*svc.User, error) {
	var user svc.User
	result := r.db.Where("username = ?", username).First(&user)

	if result.Error != nil {
		fmt.Println("Error while fetching user:", result.Error)
		return nil, result.Error
	}

	return &user, nil
}

func (r *userRepo) FindByID(userID string) (*svc.User, error) {
	var user svc.User
	result := r.db.Where("id = ?", userID).First(&user)

	if result.Error != nil {
		fmt.Println("Error while fetching user:", result.Error)
		return nil, result.Error
	}

	return &user, nil
}
