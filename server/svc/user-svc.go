package svc

import (
	"context"
)

func (s *service) CreateUser(ctx context.Context, user *User) error {
    return s.userRepo.Create(ctx, user)
}

func (s *service) FindUser(ctx context.Context, email string) (*User, error) {
	user, err := s.userRepo.Find(ctx, email)
	if err != nil {
		return nil, err
	}
	return user, nil
}