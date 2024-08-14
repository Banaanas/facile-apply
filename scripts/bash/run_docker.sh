#!/bin/bash

# Function to print messages
print_message() {
  echo -e "\033[1;32m$1\033[0m"  # Green color for messages
}

# Function to print error messages
print_error() {
  echo -e "\033[1;31m$1\033[0m"  # Red color for errors
}

# Check if Docker daemon is running
if ! docker info > /dev/null 2>&1; then
  print_message "Docker daemon is not running. Attempting to start Docker..."

  # Start Docker for macOS
  open --background -a Docker

  # Wait until Docker daemon is running
  while ! docker info > /dev/null 2>&1; do
    print_message "Waiting for Docker to start..."
    sleep 1
  done

  print_message "Docker daemon started successfully."
else
  print_message "Docker daemon is already running."
fi

# Start the Postgres container if it isn't already running
if docker ps -q -f name=facile-apply-postgres-db | grep -q .; then
  print_message "Postgres container is already running."
else
  print_message "Starting the Postgres container..."
  if docker start facile-apply-postgres-db; then
    print_message "Postgres container started successfully."
  else
    print_error "Failed to start the Postgres container."
    exit 1
  fi
fi
