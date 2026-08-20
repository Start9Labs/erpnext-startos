export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting ERPNext!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  // interfaces.ts
  'Web UI': 4,
  'The ERPNext web interface': 5,
  // init/bootstrapErpnext.ts
  'Installing ERPNext': 6,
  'View the Administrator password generated for you, so you can sign in to ERPNext': 7,
  // actions/getAdminCredentials.ts
  'View Administrator Credentials': 8,
  'Show the password for the ERPNext Administrator account, generated when this service was installed.': 9,
  'ERPNext Administrator Credentials': 10,
  'Use these credentials to sign in to ERPNext.': 11,
  Username: 12,
  Password: 13,
  // actions/resetAdminPassword.ts
  'Reset Administrator Password': 14,
  'Generate a new random password for the ERPNext Administrator account and apply it.': 15,
  // internal daemon readiness (display: null — never rendered, but the API requires text)
  Ready: 16,
  'Not ready': 17,
  'Updating ERPNext': 18,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
