import { sdk } from './sdk'

// Backups.withMysqlDump cannot drive a MariaDB 11 image: it invokes the mysql* binaries, which those images no longer ship (start-technologies#3766).
export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.ofVolumes('db', 'sites', 'main'),
)
