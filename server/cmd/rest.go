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
	userRepo := repo.NewUserRepo(db)
	dashRepo := repo.NewDashboardRepo(db)
	admnRepo := repo.NewAdminRepo(db)
	errorRepo := repo.NewErrorRepo(db)

	redisClient := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
	cache := cache.NewCache(redisClient)
	svc := svc.NewService(dashRepo, userRepo, admnRepo, errorRepo, cache)

	// createDefaultAdmin(db)

	server, err := rest.NewServer(svc, appConfig, saltConfig, tokenConfig)

	if err != nil {
		panic(err)
	}

	err = server.Start()
	if err != nil {
		panic(err)
	}
}

// func createDefaultAdmin(db *gorm.DB) {
// 	// db.Exec("DELETE FROM admins")
// 	// Hash password
// 	hashedPass, err := bcrypt.GenerateFromPassword([]byte("P@ssword"), config.GetSalt().SecretKey)
// 	if err != nil {
// 		log.Printf("Error hashing password: %v", err)
// 		return
// 	}

// 	adminID, err := uuid.NewUUID()
// 	if err != nil {
// 		log.Printf("Error generating UUID: %v", err)
// 		return
// 	}

// 	// Create admin in the database
// 	admin := svc.Admin{
// 		ID:        adminID.String(),
// 		Username:  "admin",
// 		Password:  string(hashedPass),
// 		CreatedAt: time.Now().Unix(),
// 	}

// 	err = db.Create(&admin).Error
// 	if err != nil {
// 		log.Printf("Error creating default admin: %v", err)
// 		return
// 	}

// 	log.Println("Default admin created successfully")
// }


