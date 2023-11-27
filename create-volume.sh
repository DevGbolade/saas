#!/bin/bash

VOLUME_NAME="pg-db-data"

# Check if the volume already exists
if docker volume inspect "$VOLUME_NAME" > /dev/null 2>&1; then
  echo "Volume '$VOLUME_NAME' already exists."
else
  # Create the named volume
  docker volume create "$VOLUME_NAME"
  echo "Volume '$VOLUME_NAME' created successfully."
fi
