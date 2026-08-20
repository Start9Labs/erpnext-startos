import { storeJson } from './fileModels/store.json'
import { sdk } from './sdk'
import { dbDir, dbName } from './utils'

// The ledger lives in MariaDB, so it is dumped rather than copied from a live
// data directory. `sites` carries uploaded files, the site config and the
// encryption key that the dump is useless without; `main` carries the stored
// credentials.
export const { createBackup, restoreInit } = sdk.setupBackups(
  async ({ effects }) =>
    sdk.Backups.withMysqlDump({
      imageId: 'mariadb',
      dbVolume: 'db',
      datadir: dbDir,
      database: dbName,
      user: 'root',
      password: async () => {
        const store = await storeJson.read().const(effects)
        if (!store?.dbRootPassword) {
          throw new Error(
            'No database password stored; cannot back up ERPNext.',
          )
        }
        return store.dbRootPassword
      },
      engine: 'mariadb',
    })
      .addVolume('sites')
      .addVolume('main'),
)
