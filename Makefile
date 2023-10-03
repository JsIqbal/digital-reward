# Makefile to start Docker Compose

# Define the default target
.DEFAULT_GOAL := start

.PHONY: start

# Target to stop and restart the Docker Compose stack
start:
    @echo "Stopping existing containers..."
    docker-compose down
    @echo "Starting containers with build..."
    docker-compose up --build
