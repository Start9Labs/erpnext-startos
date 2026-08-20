import { FileHelper, smtpShape, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  // Applied to the Administrator account when the site is created, then shown
  // to the user by the View Administrator Credentials action.
  adminPassword: z.string().optional().catch(undefined),
  // MariaDB root password. Internal only: the user never sees it, but bench
  // needs it to create the site and to run schema migrations.
  dbRootPassword: z.string().optional().catch(undefined),
  // Defaults to disabled through .catch(), so there is nothing to seed at
  // install and a corrupt value repairs itself to "no email".
  smtp: smtpShape.catch({ selection: 'disabled', value: {} }),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: 'store.json' },
  shape,
)
