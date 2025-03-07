#!/bin/bash

# Check if backup file name is provided
if [ -z "$1" ]; then
    echo "Error: Please provide backup file name"
    echo "Usage: ./scripts/restore-db.sh <backup_file_name>"
    echo "Available backups:"
    ls -1 database_backups/
    exit 1
fi

BACKUP_FILE="database_backups/$1"
DB_PATH=".tmp/data.db"

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "Error: Backup file not found at $BACKUP_FILE"
    echo "Available backups:"
    ls -1 database_backups/
    exit 1
fi

# Create backup of current database before restoring
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
CURRENT_BACKUP="database_backups/pre_restore_${TIMESTAMP}.db"
echo "Creating backup of current database..."
cp "$DB_PATH" "$CURRENT_BACKUP"

# Restore database
echo "Restoring database from $BACKUP_FILE..."
cp "$BACKUP_FILE" "$DB_PATH"

if [ $? -eq 0 ]; then
    echo "Database restored successfully!"
    echo "Previous database backed up to: $CURRENT_BACKUP"
else
    echo "Error: Database restore failed"
    exit 1
fi