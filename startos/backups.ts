import { rm } from 'node:fs/promises'
import { T } from '@start9labs/start-sdk'
import { siteConfigJson } from './fileModels/siteConfig.json'
import { storeJson } from './fileModels/store.json'
import { sdk } from './sdk'
import {
  EagerSub,
  dbDir,
  dbMount,
  dbName,
  dbPort,
  dumpName,
  getMariadbEnv,
  mariadbFlags,
} from './utils'

// The restore imports the dump before MariaDB starts serving, so this covers a large database.
const READY_TIMEOUT = 1_800_000
const SHUTDOWN_TIMEOUT = 60_000

const dumpDir = '/dump'
const initdbDir = '/docker-entrypoint-initdb.d'

export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.ofVolumes('sites', 'main', 'dump')
    .setPreBackup(dumpDatabase, 80)
    .setPostBackup(discardDump, 1)
    .setPostRestore(loadDump, 80),
)

const mountDump = (mountpoint: string, readonly: boolean) =>
  dbMount.mountVolume({
    volumeId: 'dump',
    subpath: null,
    mountpoint,
    readonly,
  })

const rootPassword = async () => {
  const password = (await storeJson.read().once())?.dbRootPassword
  if (!password)
    throw new Error('ERPNext has no stored database password to back up with.')
  return password
}

// The entrypoint runs a temporary --skip-networking server while it initializes, so only a TCP
// connection proves the real one is up.
const serving = async (sub: EagerSub, password: string) =>
  (
    await sub.exec(
      [
        'mariadb-admin',
        '--protocol=tcp',
        '--host=127.0.0.1',
        `--port=${dbPort}`,
        '-u',
        'root',
        '--silent',
        'ping',
      ],
      { user: 'root', env: { MYSQL_PWD: password } },
    )
  ).exitCode === 0

/** Runs the image's entrypoint until MariaDB is serving, runs `fn`, then shuts it down. */
async function withMariadb(
  sub: EagerSub,
  password: string,
  env: Record<string, string>,
  fn?: () => Promise<void>,
) {
  let exited: Error | null = null
  const running = sub
    .exec(
      ['docker-entrypoint.sh', 'mariadbd', ...mariadbFlags],
      { user: 'root', env },
      null,
    )
    .then(
      ({ exitCode, stderr }) => {
        exited = new Error(`mariadbd exited (${exitCode}): ${String(stderr)}`)
      },
      (e) => {
        exited = e instanceof Error ? e : new Error(String(e))
      },
    )

  try {
    for (let waited = 0; waited < READY_TIMEOUT; waited += 1000) {
      if (exited) throw exited
      if (await serving(sub, password)) return await fn?.()
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    throw new Error(
      `MariaDB did not start serving within ${READY_TIMEOUT / 60_000} minutes.`,
    )
  } finally {
    await sub.exec(
      ['mariadb-admin', '-u', 'root', 'shutdown'],
      { user: 'root', env: { MYSQL_PWD: password } },
      SHUTDOWN_TIMEOUT,
    )
    await Promise.race([
      running,
      new Promise((resolve) => setTimeout(resolve, SHUTDOWN_TIMEOUT)),
    ])
    await sub.exec(['pkill', '-KILL', 'mariadbd'], { user: 'root' })
    await running
  }
}

async function dumpDatabase(effects: T.Effects) {
  const password = await rootPassword()

  await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'mariadb' },
    mountDump(dumpDir, false),
    'db-dump',
    (sub) =>
      withMariadb(sub, password, getMariadbEnv(password), () =>
        sub
          .execFail(
            [
              'bash',
              '-c',
              `set -o pipefail; mariadb-dump -u root --single-transaction --routines --events ${dbName} | zstd -3 -T0 > ${dumpDir}/${dumpName}`,
            ],
            { user: 'root', env: { MYSQL_PWD: password } },
            null,
          )
          .then(() => {}),
      ),
  )
}

const discardDump = async () => {
  await rm(sdk.volumes.dump.subpath(dumpName), { force: true })
}

async function loadDump(effects: T.Effects) {
  const password = await rootPassword()
  const site = await siteConfigJson.read().once()
  if (!site)
    throw new Error('The restored site is missing its site_config.json.')

  await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'mariadb' },
    mountDump(initdbDir, true),
    'db-restore',
    async (sub) => {
      // StartOS refuses to restore over an existing package, so anything here is a failed restore's leftovers.
      await sub.execFail(['find', dbDir, '-mindepth', '1', '-delete'], {
        user: 'root',
      })

      await withMariadb(
        sub,
        password,
        {
          ...getMariadbEnv(password),
          MARIADB_DATABASE: site.db_name,
          MARIADB_USER: site.db_user,
          MARIADB_PASSWORD: site.db_password,
          MARIADB_USER_HOST: '%',
        },
        async () => {
          const { stdout } = await sub.execFail(
            [
              'mariadb',
              '-u',
              'root',
              '-N',
              '-B',
              '-e',
              `select count(*) from information_schema.tables where table_schema = '${site.db_name}'`,
            ],
            { user: 'root', env: { MYSQL_PWD: password } },
          )
          if (Number(String(stdout).trim()) === 0)
            throw new Error(
              `The restored database ${site.db_name} has no tables — the dump did not import.`,
            )
        },
      )
    },
  )

  await discardDump()
}
