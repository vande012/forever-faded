#!/bin/bash
if [ -z "$1" ]
then
    echo "Please provide backup file name"
    exit 1
fi
cp "database_backups/$1" .tmp/data.db 