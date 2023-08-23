package config

import (
	"fmt"
	"sync"

	"github.com/joho/godotenv"
	"github.com/spf13/viper"
)

var appOnce = sync.Once{}
var saltOnce = sync.Once{}
var tokenOnce = sync.Once{}

type Application struct {
	Host   string `mapstructure:"HOST"`
	Port   string `mapstructure:"PORT"`
	DBUser string `mapstructure:"DB_USER"`
	DBName string `mapstructure:"DB_NAME"`
	DBPass string `mapstructure:"DB_PASS"`
	DBHost string `mapstructure:"DB_HOST"`
	DBPort string `mapstructure:"DB_PORT"`
}

type Salt struct {
	SecretKey int `mapstructure:"SECRET_SALT_KEY"`
}

type Token struct {
	JWToken string `mapstructure:"JWT_TOKEN"`
}

var appConfig *Application
var saltConfig *Salt
var tokenConfig *Token

func loadApp() error {
	err := godotenv.Load()

	if err != nil {
		fmt.Println(".env file not found")
	}

	viper.AutomaticEnv()

	appConfig = &Application{
		Host:   viper.GetString("HOST"),
		Port:   viper.GetString("PORT"),
		DBUser: viper.GetString("DB_USER"),
		DBName: viper.GetString("DB_NAME"),
		DBPass: viper.GetString("DB_PASS"),
		DBHost: viper.GetString("DB_HOST"),
		DBPort: viper.GetString("DB_PORT"),
	}

	return nil
}

func loadSalt() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf(".env file was not found, that's okay")
	}

	viper.AutomaticEnv()

	saltConfig = &Salt{
		SecretKey: viper.GetInt("SECRET_SALT_KEY"),
	}
}

func loadToken() {
	err := godotenv.Load((".env"))
	if err != nil {
		fmt.Println(".env file was not found, that's okay")
	}
	viper.AutomaticEnv()

	tokenConfig = &Token{
		JWToken: viper.GetString("JWT_TOKEN"),
	}

}

func GetApp() *Application {
	appOnce.Do(func() {
		loadApp()
	})

	return appConfig
}

func GetSalt() *Salt {
	saltOnce.Do(func() {
		loadSalt()
	})
	return saltConfig
}

func GetToken() *Token {
	tokenOnce.Do(func() {
		loadToken()
	})
	return tokenConfig
}