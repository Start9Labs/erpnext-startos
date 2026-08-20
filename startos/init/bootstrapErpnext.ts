import { T, utils } from '@start9labs/start-sdk'
import { getAdminCredentials } from '../actions/getAdminCredentials'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import {
  bench,
  configuratorScript,
  dbName,
  frappeOwner,
  getErpnextSub,
  getMariadbEnv,
  getMariadbSub,
  getRedisSub,
  mariadbFlags,
  mariadbReady,
  redisCachePort,
  redisQueuePort,
  redisReady,
  siteName,
  sitesDir,
} from '../utils'

// Creating the site initializes the schema and installs the ERPNext app, which
// takes several minutes on slower hardware.
const INSTALL_TIMEOUT = 1_800_000

export const bootstrapErpnext = sdk.setupOnInit(
  async (effects, kind, progress) => {
    if (kind === 'update') {
      await runSiteMigrate(effects, progress)
      return
    }
    if (kind !== 'install') return

    const installing = progress.addPhase(i18n('Installing ERPNext'))
    installing.start()

    const adminPassword = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 24,
    })
    const dbRootPassword = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 32,
    })

    const mariadbSub = getMariadbSub(effects, 'mariadb-init')
    const cacheSub = getRedisSub(effects, 'redis-cache-init')
    const queueSub = getRedisSub(effects, 'redis-queue-init')
    const benchSub = getErpnextSub(effects, 'site-init')

    // Passwords go through the environment rather than the command line so they
    // do not show up in the process table or the service log.
    const newSite = [
      'bench new-site',
      '--mariadb-user-host-login-scope=%',
      '--db-root-password "$DB_ROOT_PASSWORD"',
      '--admin-password "$ADMIN_PASSWORD"',
      `--db-name ${dbName}`,
      '--install-app erpnext',
      siteName,
    ].join(' ')

    await sdk.Daemons.of(effects)
      .addOneshot('chown', {
        subcontainer: benchSub,
        exec: {
          command: ['chown', '-R', frappeOwner, sitesDir],
          user: 'root',
        },
        requires: [],
      })
      .addDaemon('mariadb', {
        subcontainer: mariadbSub,
        exec: {
          command: sdk.useEntrypoint(mariadbFlags),
          env: getMariadbEnv(dbRootPassword),
        },
        ready: {
          display: null,
          gracePeriod: 120_000,
          fn: mariadbReady(mariadbSub),
        },
        requires: [],
      })
      .addDaemon('redis-cache', {
        subcontainer: cacheSub,
        exec: {
          command: sdk.useEntrypoint(['--port', String(redisCachePort)]),
        },
        ready: { display: null, fn: redisReady(cacheSub, redisCachePort) },
        requires: [],
      })
      .addDaemon('redis-queue', {
        subcontainer: queueSub,
        exec: {
          command: sdk.useEntrypoint(['--port', String(redisQueuePort)]),
        },
        ready: { display: null, fn: redisReady(queueSub, redisQueuePort) },
        requires: [],
      })
      .addOneshot('configurator', {
        subcontainer: benchSub,
        exec: { command: bench(configuratorScript) },
        requires: ['chown', 'mariadb', 'redis-cache', 'redis-queue'],
      })
      .addOneshot('new-site', {
        subcontainer: benchSub,
        exec: {
          command: bench(`${newSite} && bench use ${siteName}`),
          env: {
            DB_ROOT_PASSWORD: dbRootPassword,
            ADMIN_PASSWORD: adminPassword,
          },
        },
        requires: ['configurator'],
      })
      .runUntilSuccess(INSTALL_TIMEOUT)

    await storeJson.merge(effects, { adminPassword, dbRootPassword })

    installing.complete()

    await sdk.action.createOwnTask(effects, getAdminCredentials, 'critical', {
      reason: i18n(
        'View the Administrator password generated for you, so you can sign in to ERPNext',
      ),
    })
  },
)

// Minimal structural view of the init FullProgressTracker, which the SDK does
// not export.
type InitProgress = {
  addPhase(
    name: string,
    contribution?: number | null,
  ): { start(): void; complete(): void }
}

/**
 * A package release carrying a newer ERPNext image ships new app code against a
 * database written by the old one, and Frappe refuses to serve until the schema
 * is migrated. Run it here in init, where StartOS has snapshotted the volumes,
 * so a failed migration rolls the whole update back instead of leaving a site
 * that boots into "Updating..." forever.
 */
async function runSiteMigrate(
  effects: T.Effects,
  progress: InitProgress,
): Promise<void> {
  const store = await storeJson.read().const(effects)
  if (!store?.dbRootPassword) return

  const migrating = progress.addPhase(i18n('Updating ERPNext'))
  migrating.start()

  const mariadbSub = getMariadbSub(effects, 'mariadb-migrate')
  const cacheSub = getRedisSub(effects, 'redis-cache-migrate')
  const queueSub = getRedisSub(effects, 'redis-queue-migrate')
  const benchSub = getErpnextSub(effects, 'site-migrate')

  await sdk.Daemons.of(effects)
    .addOneshot('chown', {
      subcontainer: benchSub,
      exec: { command: ['chown', '-R', frappeOwner, sitesDir], user: 'root' },
      requires: [],
    })
    .addDaemon('mariadb', {
      subcontainer: mariadbSub,
      exec: {
        command: sdk.useEntrypoint(mariadbFlags),
        env: getMariadbEnv(store.dbRootPassword),
      },
      ready: {
        display: null,
        gracePeriod: 120_000,
        fn: mariadbReady(mariadbSub),
      },
      requires: [],
    })
    .addDaemon('redis-cache', {
      subcontainer: cacheSub,
      exec: { command: sdk.useEntrypoint(['--port', String(redisCachePort)]) },
      ready: { display: null, fn: redisReady(cacheSub, redisCachePort) },
      requires: [],
    })
    .addDaemon('redis-queue', {
      subcontainer: queueSub,
      exec: { command: sdk.useEntrypoint(['--port', String(redisQueuePort)]) },
      ready: { display: null, fn: redisReady(queueSub, redisQueuePort) },
      requires: [],
    })
    .addOneshot('configurator', {
      subcontainer: benchSub,
      exec: { command: bench(configuratorScript) },
      requires: ['chown', 'mariadb', 'redis-cache', 'redis-queue'],
    })
    .addOneshot('migrate', {
      subcontainer: benchSub,
      exec: { command: bench(`bench --site ${siteName} migrate`) },
      requires: ['configurator'],
    })
    .runUntilSuccess(INSTALL_TIMEOUT)

  migrating.complete()
}
