package repo

import (
	"context"
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

func (r *userRepo) CreateProfile(ctx context.Context, ID string, profile *svc.Profile) (*svc.UserProfile, error) {
    userProfile := &svc.UserProfile{
        ProfileID: profile.ID, 
        UserID:    ID,        
    }

    if err := r.db.Create(userProfile).Error; err != nil {
        return nil, err
    }

	p := &svc.Profile{
        ID :        profile.ID,  
		UserID    :   ID,
		BusinessName :profile.BusinessName,
		BusinessLead : profile.BusinessLead,
		Email      :  profile.Email,
		KAMName   :   profile.KAMName,
		Nid        :  profile.Nid,
		PocMobile    : profile.PocMobile,
    }

	if err := r.db.Create(p).Error; err != nil {
        return nil, err
    }

    return userProfile, nil
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

func (r *userRepo) Find(ctx context.Context, username string) (*svc.User, error) {
	var user svc.User
	result := r.db.Where("username = ?", username).First(&user)

	if result.Error != nil {
		fmt.Println("Error while fetching user:", result.Error)
		return nil, result.Error
	}

	return &user, nil
}

func (r *userRepo) FindByID(ctx context.Context, userID string) (*svc.User, error) {
	var user svc.User
	result := r.db.Where("id = ?", userID).First(&user)

	if result.Error != nil {
		fmt.Println("Error while fetching user:", result.Error)
		return nil, result.Error
	}

	return &user, nil
}

func (r *userRepo) GetProfileById(ctx context.Context, userID string) (*svc.Profile, error) {
    var profile svc.Profile

    if err := r.db.Where("user_id = ?", userID).First(&profile).Error; err != nil {
        return nil, err
    }

    return &profile, nil
}

func (r *userRepo) GetProfileByBusiness(ctx context.Context, name string) (*svc.Profile, error)   {
	var profile svc.Profile
	result := r.db.Where("business_name = ?", name).First(&profile)

	if result.Error != nil {
		fmt.Println("Error while fetching user:", result.Error)
		return nil, result.Error
	}

	return &profile, nil
}

func (r *userRepo) GetProfileByLead(ctx context.Context, lead string) (*svc.Profile, error)  {
	var profile svc.Profile
	result := r.db.Where("business_lead = ?", lead).First(&profile)

	if result.Error != nil {
		fmt.Println("Error while fetching user:", result.Error)
		return nil, result.Error
	}

	return &profile, nil
}

func (r *userRepo) GetProfileByEmail(ctx context.Context, email string) (*svc.Profile, error)  {
	var profile svc.Profile
	result := r.db.Where("email = ?", email).First(&profile)

	if result.Error != nil {
		fmt.Println("Error while fetching user:", result.Error)
		return nil, result.Error
	}

	return &profile, nil
}

func (r *userRepo) GetProfileByNid(ctx context.Context, nid string) (*svc.Profile, error)  {
	var profile svc.Profile
	result := r.db.Where("nid = ?", nid).First(&profile)

	if result.Error != nil {
		fmt.Println("Error while fetching user:", result.Error)
		return nil, result.Error
	}

	return &profile, nil
}

func (r *userRepo) GetProfileByKam(ctx context.Context, kam string) (*svc.Profile, error)   {
	var profile svc.Profile
	result := r.db.Where("kam_name = ?", kam).First(&profile)

	if result.Error != nil {
		fmt.Println("Error while fetching user:", result.Error)
		return nil, result.Error
	}

	return &profile, nil
}

func (r *userRepo) GetProfileByPoc(ctx context.Context, poc string) (*svc.Profile, error)  {
	var profile svc.Profile
	result := r.db.Where("poc_mobile = ?", poc).First(&profile)

	if result.Error != nil {
		fmt.Println("Error while fetching user:", result.Error)
		return nil, result.Error
	}

	return &profile, nil
}