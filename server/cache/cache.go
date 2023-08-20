package cache

import (
	"time"

	service "go-rest/svc"

	"github.com/go-redis/redis"
)

const (
	BASE_REDIS_KEY = "refund:"

	// WALLET_IDENTITYID_KEY = "WALLET_IDENTITYID_"
	// REASON_TYPE_ITEM_KEY  = "REASON_TYPE_ITEM_"
)

type Cache interface {
	service.Cache
}

type cache struct {
	client *redis.Client
}

func NewCache(client *redis.Client) Cache {
	return &cache{
		client: client,
	}
}

func (r *cache) Set(key string, value string, ttl time.Duration) error {
	err := r.client.Set(key, value, ttl).Err()
	if err != nil {
		return err
	}

	return nil
}

func (r *cache) Get(key string) (string, error) {
	val, err := r.client.Get(key).Result()
	if err == redis.Nil {
		return "", nil
	} else if err != nil {
		return "", err
	}

	return val, nil
}

func (r *cache) Delete(key string) error {
	err := r.client.Del(key).Err()
	if err != nil {
		return err
	}

	return nil
}

func (r *cache) GetTTL(key string) (time.Duration, error) {
	ttl, err := r.client.TTL(key).Result()
	if err != nil {
		return 0, err
	}

	return ttl, nil
}
