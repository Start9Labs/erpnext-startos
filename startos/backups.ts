import { sdk } from './sdk'

/**
 * All three volumes are copied as files rather than dumped logically.
 *
 * `sdk.Backups.withMysqlDump` would be the idiomatic choice, but it shells out
 * to `mysqld`, `mysqladmin`, `mysqldump`, `mysql` and `mysql_install_db`, and
 * MariaDB 11.8 ships none of those names — the image has only `mariadbd`,
 * `mariadb-admin`, `mariadb-dump`, `mariadb` and `mariadb-install-db`. The
 * helper therefore never gets the server up, and the backup fails with
 * "MySQL/MariaDB failed to become ready" (start-technologies#3763).
 *
 * Copying the data directory is sound here because StartOS stops the service
 * for the duration of a backup, so MariaDB has shut down cleanly and the files
 * are at rest — not a live-directory copy. `sites` carries uploads, the site
 * config and the encryption key that the database is useless without, and
 * `main` carries the stored credentials.
 */
export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.ofVolumes('db', 'sites', 'main'),
)
