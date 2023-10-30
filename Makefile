.PHONY: start

start:
	docker-compose down && docker-compose up --build
