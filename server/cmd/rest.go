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

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", appConfig.DBUser, appConfig.DBPass, appConfig.DBHost, appConfig.DBPort, appConfig.DBName)
	db := database.NewDatabase(dsn)
	dashRepo := repo.NewDashboardRepo(db)
	userRepo := repo.NewUserRepo(db)
	dataCampaignRepo := repo.NewDataCampaignRepo(db)
	errorRepo := repo.NewErrorRepo(db)

	redisClient := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
	cache := cache.NewCache(redisClient)
	svc := svc.NewService(dashRepo, userRepo, dataCampaignRepo, errorRepo, cache)

	// createDefaultUser(db)

	server, err := rest.NewServer(svc, appConfig, saltConfig, tokenConfig)

	if err != nil {
		panic(err)
	}

	err = server.Start()
	if err != nil {
		panic(err)
	}
}

// func createDefaultUser(db *gorm.DB) {
// 	// db.Exec("DELETE FROM users")
// 	// Hash password
// 	hashedPass, err := bcrypt.GenerateFromPassword([]byte("P@ssword"), config.GetSalt().SecretKey)
// 	if err != nil {
// 		log.Printf("Error hashing password: %v", err)
// 		return
// 	}

// 	userID, err := uuid.NewUUID()
// 	if err != nil {
// 		log.Printf("Error generating UUID: %v", err)
// 		return
// 	}

// 	// Create user in the database
// 	user := svc.User{
// 		ID:        userID.String(),
// 		Username:  "user",
// 		Password:  string(hashedPass),
// 		CreatedAt: time.Now().Unix(),
// 	}

// 	err = db.Create(&user).Error
// 	if err != nil {
// 		log.Printf("Error creating default user: %v", err)
// 		return
// 	}

// 	log.Println("Default user created successfully")
// }
