import { SmtpSelection, T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

// A package's subcontainers share one network namespace, so every process below
// reaches the others on 127.0.0.1 and no two may claim the same port.
export const uiPort = 8080
export const backendPort = 8000
export const socketioPort = 9000
export const dbPort = 3306
export const redisCachePort = 6379
export const redisQueuePort = 6380

// nginx serves this site regardless of the Host header the user arrives with,
// which is what lets one site answer on LAN, .local and Tor addresses alike.
export const siteName = 'erpnext.localhost'

export const benchDir = '/home/frappe/frappe-bench'
export const sitesDir = `${benchDir}/sites`
export const dbDir = '/var/lib/mysql'

// uid:gid of the `frappe` user inside the upstream image.
export const frappeOwner = '1000:1000'

export const sitesMount = sdk.Mounts.of().mountVolume({
  volumeId: 'sites',
  subpath: null,
  mountpoint: sitesDir,
  readonly: false,
})

export const dbMount = sdk.Mounts.of().mountVolume({
  volumeId: 'db',
  subpath: null,
  mountpoint: dbDir,
  readonly: false,
})

export const getErpnextSub = (effects: T.Effects, name: string) =>
  sdk.SubContainer.of(effects, { imageId: 'erpnext' }, sitesMount, name)

// Where the seeding subcontainer mounts the sites volume. It has to differ from
// sitesDir: mounting the volume over its own path hides the image's copy of the
// directory, which is exactly what we need to read from.
export const seedMountpoint = '/seed'

export const getSeedSub = (effects: T.Effects, name: string) =>
  sdk.SubContainer.of(
    effects,
    { imageId: 'erpnext' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'sites',
      subpath: null,
      mountpoint: seedMountpoint,
      readonly: false,
    }),
    name,
  )

// The image ships sites/ prepopulated (common_site_config.json, apps.txt,
// apps.json) and Docker copies that into a fresh named volume on first use.
// StartOS volumes start genuinely empty and mask the image's directory, so
// `bench set-config` fails on a missing common_site_config.json unless we seed
// it ourselves. `cp -n` never clobbers, so this is safe on every later start.
export const seedSitesScript = [
  `cp -rn ${sitesDir}/. ${seedMountpoint}/ 2>/dev/null || true`,
  `chown -R ${frappeOwner} ${seedMountpoint}`,
].join('; ')

export const getMariadbSub = (effects: T.Effects, name = 'mariadb') =>
  sdk.SubContainer.of(effects, { imageId: 'mariadb' }, dbMount, name)

export const getRedisSub = (effects: T.Effects, name: string) =>
  sdk.SubContainer.of(effects, { imageId: 'redis' }, sdk.Mounts.of(), name)

// bench resolves apps and sites relative to the bench directory, so every
// invocation runs from there.
export const bench = (script: string): [string, ...string[]] => [
  'bash',
  '-c',
  `cd ${benchDir} && ${script}`,
]

export const mariadbFlags = [
  `--bind-address=127.0.0.1`,
  `--port=${dbPort}`,
  '--character-set-server=utf8mb4',
  '--collation-server=utf8mb4_unicode_ci',
  '--skip-character-set-client-handshake',
]

export const getMariadbEnv = (rootPassword: string) => ({
  MYSQL_ROOT_PASSWORD: rootPassword,
  MARIADB_AUTO_UPGRADE: '1',
})

export const getFrontendEnv = () => ({
  BACKEND: `127.0.0.1:${backendPort}`,
  SOCKETIO: `127.0.0.1:${socketioPort}`,
  FRAPPE_SITE_NAME_HEADER: siteName,
  UPSTREAM_REAL_IP_ADDRESS: '127.0.0.1',
  UPSTREAM_REAL_IP_HEADER: 'X-Forwarded-For',
  UPSTREAM_REAL_IP_RECURSIVE: 'off',
  PROXY_READ_TIMEOUT: '120',
  CLIENT_MAX_BODY_SIZE: '50m',
})

// Writes the bench-wide config the backend, workers and scheduler all read from
// the shared sites volume. Re-run on every start so a changed port or a restored
// backup never leaves stale endpoints behind.
export const configuratorScript = [
  `ls -1 apps > sites/apps.txt`,
  `bench set-config -g db_host 127.0.0.1`,
  `bench set-config -gp db_port ${dbPort}`,
  `bench set-config -g redis_cache redis://127.0.0.1:${redisCachePort}`,
  `bench set-config -g redis_queue redis://127.0.0.1:${redisQueuePort}`,
  `bench set-config -g redis_socketio redis://127.0.0.1:${redisQueuePort}`,
  `bench set-config -gp socketio_port ${socketioPort}`,
  `bench set-config -g chromium_path /usr/bin/chromium-headless-shell`,
].join(' && ')

type Sub = Awaited<ReturnType<typeof sdk.SubContainer.of>>

export const redisReady = (sub: Sub, port: number) => async () => {
  const res = await sub.exec(['redis-cli', '-p', String(port), 'ping'])
  return res.exitCode === 0
    ? { result: 'success' as const, message: null }
    : { result: 'loading' as const, message: null }
}

export const mariadbReady = (sub: Sub) => async () => {
  const res = await sub.exec([
    'healthcheck.sh',
    '--connect',
    '--innodb_initialized',
  ])
  return res.exitCode === 0
    ? { result: 'success' as const, message: null }
    : { result: 'loading' as const, message: null }
}

// Pinned rather than left to bench, which generates a random database name per
// site — a fixed name keeps the schema identifiable.
export const dbName = 'erpnext'

// The Email Account row this package owns. Anything the user creates by hand in
// ERPNext is left alone; a user-made default outgoing account even wins over
// this one (frappe: EmailAccount.find_default_outgoing).
export const smtpAccountName = 'StartOS'

/**
 * Resolve the stored selection into concrete credentials. `system` reads the
 * SMTP server configured once for the whole box in StartOS; `custom` is the
 * user's own relay; `disabled` means no outgoing mail.
 */
export const resolveSmtp = async (
  effects: T.Effects,
  smtp: SmtpSelection,
): Promise<T.SmtpValue | null> => {
  if (smtp.selection === 'system') {
    const system = await sdk.getSystemSmtp(effects).const()
    if (system && smtp.value.customFrom) system.from = smtp.value.customFrom
    return system
  }
  if (smtp.selection === 'custom') {
    const p = smtp.value.provider.value
    return {
      host: p.host,
      port: Number(p.security.value.port),
      from: p.from,
      username: p.username,
      password: p.password ?? null,
      security: p.security.selection,
    }
  }
  return null
}

/**
 * Field values for the Email Account doctype. `use_tls` is STARTTLS and
 * `use_ssl_for_outgoing` is implicit TLS — frappe reads exactly these two into
 * its SMTP client (EmailAccount.sendmail_config), so they must not both be set.
 * This is why the settings are written as a document rather than into site
 * config: the site-config path frappe offers has no key for implicit TLS, which
 * would silently strand everyone on a 465-only relay.
 */
export const buildSmtpFields = (smtp: T.SmtpValue) => {
  const separateLogin = !!smtp.username && smtp.username !== smtp.from
  return {
    email_id: smtp.from,
    smtp_server: smtp.host,
    smtp_port: String(smtp.port),
    use_tls: smtp.security === 'starttls' ? 1 : 0,
    use_ssl_for_outgoing: smtp.security === 'tls' ? 1 : 0,
    login_id_is_different: separateLogin ? 1 : 0,
    ...(separateLogin ? { login_id: smtp.username } : {}),
    // A relay that takes no credentials has to say so explicitly, or frappe
    // refuses to save the account at all.
    ...(smtp.password
      ? { password: smtp.password }
      : { no_smtp_authentication: 1 }),
    enable_outgoing: 1,
    default_outgoing: 1,
    enable_incoming: 0,
    always_use_account_email_id_as_sender: 1,
  }
}

/**
 * Upserts the managed account, or disables it when email is turned off.
 *
 * The credentials arrive in SMTP_FIELDS and are written to a file that bench
 * reads, so the password never appears in a command line. set-value updates an
 * existing row and falls through to insert the first time; the account is
 * disabled rather than deleted, because Email Queue rows link to it and frappe
 * refuses to delete a linked document.
 *
 * ERPNext opens a real SMTP session when saving an outgoing account, so bad
 * credentials or a relay that is merely down will fail here. That must never
 * stop ERPNext from starting, so the failure is reported and swallowed.
 */
export const smtpApplyScript = [
  `if [ -n "$SMTP_FIELDS" ]; then`,
  `printf '%s' "$SMTP_FIELDS" > /tmp/smtp.json;`,
  `bench --site ${siteName} execute frappe.client.set_value`,
  `--args '["Email Account","${smtpAccountName}",__import__("json").load(open("/tmp/smtp.json"))]'`,
  `|| bench --site ${siteName} execute frappe.client.insert`,
  `--args '[dict(__import__("json").load(open("/tmp/smtp.json")),doctype="Email Account",email_account_name="${smtpAccountName}")]'`,
  `|| echo "[smtp] ERPNext rejected the email settings — it tests the connection when saving an outgoing account. Mail is left unconfigured; check the credentials and that the relay is reachable, then restart." >&2;`,
  `rm -f /tmp/smtp.json;`,
  `else`,
  `bench --site ${siteName} execute frappe.client.set_value`,
  `--args '["Email Account","${smtpAccountName}",{"enable_outgoing":0,"default_outgoing":0}]' >/dev/null 2>&1 || true;`,
  `fi;`,
  `exit 0`,
].join(' ')
