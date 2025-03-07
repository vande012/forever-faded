#!/bin/bash

# Set variables
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="database_backups"
DB_PATH=".tmp/data.db"
BACKUP_PATH="$BACKUP_DIR/data_$TIMESTAMP.db"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Check if database exists
if [ ! -f "$DB_PATH" ]; then
    echo "Error: Database file not found at $DB_PATH"
    exit 1
fi

# Create backup using cp instead of sqlite3
echo "Creating backup of database..."
cp "$DB_PATH" "$BACKUP_PATH"

if [ $? -eq 0 ]; then
    echo "Backup created successfully at: $BACKUP_PATH"
else
    echo "Error: Backup failed"
    exit 1
fi