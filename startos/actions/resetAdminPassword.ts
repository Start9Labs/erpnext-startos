import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import {
  bench,
  getMariadbEnv,
  getMariadbSub,
  mariadbFlags,
  mariadbReady,
  siteName,
} from '../utils'

const RESET_TIMEOUT = 300_000

export const resetAdminPassword = sdk.Action.withoutInput(
  'reset-admin-password',

  async () => ({
    name: i18n('Reset Administrator Password'),
    description: i18n(
      'Generate a new random password for the ERPNext Administrator account and apply it.',
    ),
    warning: null,
    // ERPNext keeps the password hashed in its database, so applying a new one
    // means running bench against MariaDB. This action brings up its own
    // database rather than sharing the running service's.
    allowedStatuses: 'only-stopped',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const store = await storeJson.read().const(effects)
    if (!store?.dbRootPassword) {
      throw new Error(
        'ERPNext is not initialized yet, so there is no account to reset.',
      )
    }

    const adminPassword = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 24,
    })

    const mariadbSub = getMariadbSub(effects, 'mariadb-reset')
    const benchSub = sdk.SubContainer.of(
      effects,
      { imageId: 'erpnext' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'sites',
        subpath: null,
        mountpoint: '/home/frappe/frappe-bench/sites',
        readonly: false,
      }),
      'bench-reset',
    )

    await sdk.Daemons.of(effects)
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
      .addOneshot('set-password', {
        subcontainer: benchSub,
        exec: {
          command: bench(
            `bench --site ${siteName} set-admin-password "$NEW_ADMIN_PASSWORD"`,
          ),
          env: { NEW_ADMIN_PASSWORD: adminPassword },
        },
        requires: ['mariadb'],
      })
      .runUntilSuccess(RESET_TIMEOUT)

    await storeJson.merge(effects, { adminPassword })

    return {
      version: '1',
      title: i18n('ERPNext Administrator Credentials'),
      message: i18n('Use these credentials to sign in to ERPNext.'),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: 'Administrator',
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: adminPassword,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
