import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { siteName } from '../utils'

// Written by bench when it creates the site; these are the credentials frappe itself connects with.
const shape = z.object({
  db_name: z.string(),
  db_user: z.string(),
  db_password: z.string(),
})

export const siteConfigJson = FileHelper.json(
  { base: sdk.volumes.sites, subpath: `${siteName}/site_config.json` },
  shape,
)
