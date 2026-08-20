import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  bench,
  configuratorScript,
  frappeOwner,
  getErpnextSub,
  getFrontendEnv,
  getMariadbEnv,
  getMariadbSub,
  getRedisSub,
  mariadbFlags,
  mariadbReady,
  redisCachePort,
  redisQueuePort,
  redisReady,
  sitesDir,
  socketioPort,
  backendPort,
  uiPort,
} from './utils'

// The workers and the scheduler expose no port and no status endpoint, so there
// is nothing to probe: the daemon supervisor restarts them if they exit.
const alwaysReady = async () => ({ result: 'success' as const, message: null })

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting ERPNext!'))

  const store = await storeJson.read().const(effects)
  if (!store?.dbRootPassword) {
    throw new Error(
      'ERPNext is not initialized: no database password was stored during install.',
    )
  }

  const mariadbSub = getMariadbSub(effects)
  const cacheSub = getRedisSub(effects, 'redis-cache')
  const queueSub = getRedisSub(effects, 'redis-queue')
  const configuratorSub = getErpnextSub(effects, 'configurator')
  const backendSub = getErpnextSub(effects, 'backend')
  const websocketSub = getErpnextSub(effects, 'websocket')
  const schedulerSub = getErpnextSub(effects, 'scheduler')
  const queueShortSub = getErpnextSub(effects, 'queue-short')
  const queueLongSub = getErpnextSub(effects, 'queue-long')
  const frontendSub = getErpnextSub(effects, 'frontend')

  return (
    sdk.Daemons.of(effects)
      // StartOS creates volume subpaths owned by root, and every frappe process
      // runs as uid 1000, so the sites volume has to be handed over first.
      .addOneshot('chown', {
        subcontainer: configuratorSub,
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
        exec: {
          command: sdk.useEntrypoint(['--port', String(redisCachePort)]),
        },
        ready: {
          display: null,
          fn: redisReady(cacheSub, redisCachePort),
        },
        requires: [],
      })
      .addDaemon('redis-queue', {
        subcontainer: queueSub,
        exec: {
          command: sdk.useEntrypoint(['--port', String(redisQueuePort)]),
        },
        ready: {
          display: null,
          fn: redisReady(queueSub, redisQueuePort),
        },
        requires: [],
      })
      .addOneshot('configurator', {
        subcontainer: configuratorSub,
        exec: { command: bench(configuratorScript) },
        requires: ['chown', 'mariadb', 'redis-cache', 'redis-queue'],
      })
      .addDaemon('backend', {
        subcontainer: backendSub,
        exec: {
          command: sdk.useEntrypoint(),
          env: {
            GUNICORN_WORKERS: '2',
            GUNICORN_THREADS: '4',
            GUNICORN_TIMEOUT: '120',
          },
        },
        ready: {
          display: null,
          gracePeriod: 120_000,
          fn: () =>
            sdk.healthCheck.checkPortListening(effects, backendPort, {
              successMessage: i18n('Ready'),
              errorMessage: i18n('Not ready'),
            }),
        },
        requires: ['configurator'],
      })
      .addDaemon('websocket', {
        subcontainer: websocketSub,
        exec: {
          command: [
            'node',
            '/home/frappe/frappe-bench/apps/frappe/socketio.js',
          ],
        },
        ready: {
          display: null,
          gracePeriod: 60_000,
          fn: () =>
            sdk.healthCheck.checkPortListening(effects, socketioPort, {
              successMessage: i18n('Ready'),
              errorMessage: i18n('Not ready'),
            }),
        },
        requires: ['configurator'],
      })
      .addDaemon('scheduler', {
        subcontainer: schedulerSub,
        exec: { command: bench('bench schedule') },
        ready: { display: null, fn: alwaysReady },
        requires: ['backend'],
      })
      .addDaemon('queue-short', {
        subcontainer: queueShortSub,
        exec: { command: bench('bench worker --queue short,default') },
        ready: { display: null, fn: alwaysReady },
        requires: ['backend'],
      })
      .addDaemon('queue-long', {
        subcontainer: queueLongSub,
        exec: { command: bench('bench worker --queue long,default,short') },
        ready: { display: null, fn: alwaysReady },
        requires: ['backend'],
      })
      .addDaemon('frontend', {
        subcontainer: frontendSub,
        exec: {
          command: ['nginx-entrypoint.sh'],
          env: getFrontendEnv(),
        },
        ready: {
          display: i18n('Web Interface'),
          gracePeriod: 60_000,
          fn: () =>
            sdk.healthCheck.checkPortListening(effects, uiPort, {
              successMessage: i18n('The web interface is ready'),
              errorMessage: i18n('The web interface is not ready'),
            }),
        },
        requires: ['backend', 'websocket'],
      })
  )
})
