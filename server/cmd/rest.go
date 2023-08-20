package cmd

import (
	"fmt"
	"go-rest/cache"
	"go-rest/config"
	"go-rest/database"
	"go-rest/repo"
	"go-rest/rest"
	"go-rest/svc"

	"github.com/go-redis/redis"
)

func serveRest() {
	appConfig := config.GetApp()
	saltConfig := config.GetSalt()
	tokenConfig := config.GetToken()

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		appConfig.DBUser, appConfig.DBPass, appConfig.DBHost, appConfig.DBPort, appConfig.DBName)

	db := database.NewDatabase(dsn)
	userRepo := repo.NewUserRepo(db)
	errorRepo := repo.NewErrorRepo(db)

	redisClient := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
	cache := cache.NewCache(redisClient)

	svc := svc.NewService(userRepo, errorRepo, cache)
	server, err := rest.NewServer(svc, appConfig, saltConfig, tokenConfig)

	if err != nil {
		panic(err)
	}

	err = server.Start()
	if err != nil {
		panic(err)
	}
}
