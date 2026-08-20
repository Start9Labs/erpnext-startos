import { sdk } from '../sdk'
import { getAdminCredentials } from './getAdminCredentials'
import { resetAdminPassword } from './resetAdminPassword'

export const actions = sdk.Actions.of()
  .addAction(getAdminCredentials)
  .addAction(resetAdminPassword)
