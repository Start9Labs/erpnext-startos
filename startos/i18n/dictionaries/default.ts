export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting ERPNext!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  // internal daemon readiness (display: null — never rendered, but the API requires text)
  Ready: 4,
  'Not ready': 5,
  // interfaces.ts
  'Web UI': 6,
  'The ERPNext web interface': 7,
  // init/bootstrapErpnext.ts
  'Starting the database': 8,
  'Installing the Frappe framework': 9,
  'Installing the ERPNext app': 19,
  'Migrating the database': 20,
  // init/watchCredentials.ts
  'Set the Administrator password before signing in to ERPNext': 10,
  // actions/setAdminPassword.ts
  'Set Administrator Password': 11,
  'Generate a new random password for the Administrator account and apply it. Use this to set the first password, or if you are locked out of ERPNext.': 12,
  'ERPNext Administrator Credentials': 13,
  'Use these credentials to sign in to ERPNext.': 14,
  Username: 15,
  Password: 16,
  // actions/manageSmtp.ts
  'Configure Email (SMTP)': 17,
  'Choose how ERPNext sends email — invoices, notifications and password resets. Use the StartOS system SMTP server, your own provider, or turn email off.': 18,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
