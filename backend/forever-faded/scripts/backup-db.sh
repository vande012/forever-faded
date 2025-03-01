#!/bin/bash
timestamp=$(date +%Y%m%d_%H%M%S)
backup_dir="database_backups"
mkdir -p $backup_dir
sqlite3 .tmp/data.db ".backup '$backup_dir/data_$timestamp.db'" 