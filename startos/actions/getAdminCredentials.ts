import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const getAdminCredentials = sdk.Action.withoutInput(
  'get-admin-credentials',

  async () => ({
    name: i18n('View Administrator Credentials'),
    description: i18n(
      'Show the password for the ERPNext Administrator account, generated when this service was installed.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const store = await storeJson.read().const(effects)
    if (!store?.adminPassword) {
      throw new Error(
        'No administrator password is stored yet. Wait for the install to finish, then try again.',
      )
    }

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
            value: store.adminPassword,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
