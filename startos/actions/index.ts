import { sdk } from '../sdk'
import { getAdminCredentials } from './getAdminCredentials'
import { manageSmtp } from './manageSmtp'
import { resetAdminPassword } from './resetAdminPassword'

export const actions = sdk.Actions.of()
  .addAction(getAdminCredentials)
  .addAction(resetAdminPassword)
  .addAction(manageSmtp)
