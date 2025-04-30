# Forever Faded Backend - Database Management

This guide outlines the database management workflow for the Forever Faded Strapi v5 backend using SQLite.
NOTE: THIS IS FOR LOCAL DEVELOPMENT VS. STRAPI CLOUD this project is hosted in the cloud.

## Setup

1. **Clone the Repository**
```bash
git clone https://github.com/vande012/forever-faded.git
cd dev/forever-faded/backend/forever-faded
npm install
```
2. **Initialize Database**
```bash
npm run develop
```
This will create a new SQLite database at `.tmp/data.db`

## Database Management Scripts

The project includes two utility scripts for database management:

### Backup Script
Located at `scripts/backup-db.sh`, this script creates timestamped backups of your database.

Make script executable (first time only)
```bash 
chmod +x scripts/backup-db.sh
```

Create a backup
./scripts/backup-db.sh


Backups are stored in `database_backups/` with format: `data_YYYYMMDD_HHMMSS.db`

### Restore Script
Located at `scripts/restore-db.sh`, this script restores a database from a backup.

Make script executable (first time only)
```bash
chmod +x scripts/restore-db.sh
```

Restore from a backup

```bash 
./scripts/restore-db.sh data_20240320_143000.db
```

## Development Workflow

### Daily Development
1. Create a backup before making changes:
```./scripts/backup-db.sh```

2. Make your changes and test

3. Create another backup if needed

### After Pulling Updates
1. Pull latest changes:

```bash
git pull origin main
```

2. If database schema has changed, you may need to:
   - Start fresh with a new database
   - OR restore from a compatible backup:
   ```bash
   ./scripts/restore-db.sh <backup-filename>
   ```

### Sharing Database State
To share your database state with team members:

1. Export schema and data:
   ```bash
   sqlite3 .tmp/data.db .dump > schema_and_data.sql
   ```

   2. Share the SQL file with team members

3. Team members can import it:
   ```bash
   sqlite3 .tmp/data.db < schema_and_data.sql
   ```
   ## Important Notes

- The database file (`.tmp/data.db`) is git-ignored
- Always backup before significant changes
- Keep your backup files organized
- Document schema changes in your commit messages
- Never commit database files to the repository

## Emergency Recovery

If something goes wrong:

1. List available backups:

```bash
ls database_backups
```

2. Restore from a backup:
```bash
./scripts/restore-db.sh data_TIMESTAMP.db
```

## Project Structure
```
├── .tmp/
│ └── data.db # Active database (git ignored)
├── database_backups/ # Backup directory
│ └── data_TIMESTAMP.db # Database backups
├── scripts/
│ ├── backup-db.sh # Backup script
│ └── restore-db.sh # Restore script
└── .gitignore # Includes database ignore rules
```
