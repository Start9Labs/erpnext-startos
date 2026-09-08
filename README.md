<p align="center">
  <img src="icon.svg" alt="ERPNext Logo" width="21%">
</p>

# ERPNext on StartOS

> Everything not listed in this document should behave the same as upstream ERPNext.
> If a feature, setting, or behavior is not mentioned here, the upstream
> documentation is accurate and fully applicable — see the Documentation section of
> `instructions.md` for links.

ERPNext is a double-entry accounting and business management suite built on the Frappe
framework — <https://github.com/frappe/erpnext>.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

Three upstream images, unmodified, pinned by tag in `startos/manifest/index.ts` and built
for `x86_64` and `aarch64`. Each runs its stock entrypoint except where a command is named
below.

| Image     | Source           | Role                                             |
| --------- | ---------------- | ------------------------------------------------ |
| `erpnext` | `frappe/erpnext` | Frappe framework + ERPNext app; nine subcontainers |
| `mariadb` | `mariadb`        | The database holding the ledger                  |
| `redis`   | `redis`          | Cache and job queue                              |

ERPNext is not one process. This package runs the same process split as upstream's
`frappe_docker` compose file, as twelve subcontainers. Attach to any of them with
`start-cli package attach erpnext -n <name>`.

| Subcontainer   | Kind    | Command                                   | Purpose                                |
| -------------- | ------- | ----------------------------------------- | -------------------------------------- |
| `seed-sites`   | oneshot | `cp -rn` + `chown`                        | Seeds the sites volume from the image  |
| `configurator` | oneshot | `bench set-config …`                      | Writes bench-wide config               |
| `smtp`         | oneshot | `bench execute frappe.client.*`           | Applies the email settings             |
| `mariadb`      | daemon  | image entrypoint                          | Database                               |
| `redis-cache`  | daemon  | `redis-server --port 6379`                | Frappe cache                           |
| `redis-queue`  | daemon  | `redis-server --port 6380`                | RQ job queue and socket.io pub/sub     |
| `backend`      | daemon  | image entrypoint (gunicorn)               | Application server                     |
| `websocket`    | daemon  | `node …/frappe/socketio.js`               | Realtime updates                       |
| `scheduler`    | daemon  | `bench schedule`                          | Cron-like scheduled jobs               |
| `queue-short`  | daemon  | `bench worker --queue short,default`      | Short background jobs                  |
| `queue-long`   | daemon  | `bench worker --queue long,default,short` | Long background jobs                   |
| `frontend`     | daemon  | `nginx-entrypoint.sh`                     | nginx; serves assets, proxies the rest |

Install, update and the Set Administrator Password action each run their own short-lived
copies of these outside the running service, and those are the names their logs carry:
`seed-sites-init` / `mariadb-init` / `redis-cache-init` / `redis-queue-init` / `site-init`
at install, the same set suffixed `-migrate` on update, and `mariadb-set-password` /
`bench-set-password` for the action.

All subcontainers in a package share one network namespace, so they address each other on
`127.0.0.1`. Ports are fixed: MariaDB 3306, redis 6379/6380, backend 8000, websocket 9000,
nginx 8080.

**StartOS-managed environment variables**

- `mariadb`: `MYSQL_ROOT_PASSWORD` (generated at install, stored in `store.json`),
  `MARIADB_AUTO_UPGRADE`
- `backend`: `GUNICORN_WORKERS`, `GUNICORN_THREADS`, `GUNICORN_TIMEOUT`
- `frontend`: `BACKEND`, `SOCKETIO`, `FRAPPE_SITE_NAME_HEADER`, `UPSTREAM_REAL_IP_ADDRESS`,
  `UPSTREAM_REAL_IP_HEADER`, `UPSTREAM_REAL_IP_RECURSIVE`, `PROXY_READ_TIMEOUT`,
  `CLIENT_MAX_BODY_SIZE`
- `smtp`: `SMTP_FIELDS` — the Email Account field set, as JSON
- install and password-set only: `DB_ROOT_PASSWORD`, `ADMIN_PASSWORD`,
  `NEW_ADMIN_PASSWORD` — passed through the environment so credentials never appear in a
  command line or the service log

## Volume and Data Layout

Four volumes. The ledger itself is MariaDB's data directory on `db`; everything a restore
needs to read it is on `sites`.

| Volume  | Mountpoint                        | Contents                                                      |
| ------- | --------------------------------- | ------------------------------------------------------------- |
| `sites` | `/home/frappe/frappe-bench/sites` | Site config, the encryption key, uploaded files, built assets |
| `db`    | `/var/lib/mysql`                  | MariaDB data directory                                        |
| `dump`  | `/dump`, `/docker-entrypoint-initdb.d` on restore | `erpnext.sql.zst`, the database dump a backup carries |
| `main`  | package store                     | `store.json`                                                  |

The backup set is `sites`, `main` and `dump`; `db` is not in it. See
[Backups and Restore](#backups-and-restore).

The `sites` volume is created root-owned and empty by StartOS while every frappe process
runs as uid 1000, so the `seed-sites` oneshot fills it from the image and hands it over
before anything else starts. It is a `cp -rn`, so it never overwrites an existing file and
is a no-op on every later start.

## File Models

Two models, plus one file ERPNext owns that the package rewrites on every start.

`store.json` (`startos/fileModels/store.json.ts`) on the `main` volume holds
`adminPassword`, `dbRootPassword` and `smtp`. `dbRootPassword` is generated once at install
and never rewritten. `adminPassword` is written only by the Set Administrator Password
action — nothing else generates it, and it is absent until the user runs that action.
`smtp` is written by the Configure Email action and defaults to disabled. ERPNext itself
never reads this file; it is the package's own record.

`site_config.json` (`startos/fileModels/siteConfig.json.ts`) at
`sites/erpnext.localhost/site_config.json` is bench's own file, read and never written. It
names the database and the credentials frappe connects with, which is what lets a restore
recreate that database user.

ERPNext's own configuration lives in `sites/common_site_config.json` inside the `sites`
volume, which has no file model. The `configurator` oneshot re-asserts the database host
and port, the three redis URLs, the socket.io port and the chromium path on **every**
start, so hand edits to those keys do not survive a restart. Every other key in that file —
anything ERPNext or the user writes — is seeded once and then belongs to them.

## Dependencies

None.

## Network Access and Interfaces

One interface: `ui`, an HTTP web interface served by nginx on port 8080. It serves the
ERPNext desk, the login screen and the REST API under the same origin.

nginx is configured with a fixed site name header, so the single site answers on every
address StartOS offers it rather than on one hostname.

## Installation and First-Run Flow

Install runs a temporary daemon chain (`runUntilSuccess`): MariaDB and both redis instances
come up, the configurator writes bench config, and `bench new-site` creates the site,
installs the ERPNext app and sets a throwaway Administrator password that is never stored.
This takes several minutes, longer on slower hardware; the install progress bar reports it
as a phase. The generated MariaDB root password is stored in `store.json`.

The Administrator password the user actually receives is minted afterwards, by the Set
Administrator Password action, which a critical task sends them to. The service cannot
start until they run it, so nobody ends up with a running accounting system whose admin
password they have never seen.

After signing in as `Administrator`, the user completes ERPNext's own setup wizard —
company, fiscal year, chart of accounts, currency. The package does not skip or pre-fill
it, and its answers are hard to change afterwards.

## Actions

Two actions, both user-facing. There are no hidden actions.

**Set Administrator Password.** Run it when the critical task asks at install, and again to
rotate. It starts its own MariaDB against the `db` volume, applies the new password with
`bench set-admin-password`, tears the database back down, stores the password and returns
it. Takes roughly a minute, most of it waiting for MariaDB. Safe to repeat — each run
replaces the previous password, and the previous one stops working immediately. It touches
only the `Administrator` account; users created inside ERPNext are managed there. This is
the only place an Administrator password is ever shown, so a password lost between runs is
recovered by rotating, not by looking it up.

**Configure Email (SMTP).** Run it to let ERPNext send invoices, quotes and notifications.
It writes the choice to `store.json` and nothing else — the `smtp` oneshot applies it to
ERPNext's Email Account on the next start, so the service must be restarted for a change to
take effect. Safe to repeat. Whether the settings work is decided by ERPNext, not by
StartOS: see [Limitations and Differences](#limitations-and-differences).

## Tasks

One task, raised whenever no Administrator password is stored — which is the case from the
end of install until the user acts, and again if the store is ever cleared.

- **What raises it:** `store.json` has no `adminPassword`.
- **Severity:** `critical`. ERPNext cannot start while it is outstanding, and the ordinary
  Start/Stop controls are replaced by the task.
- **What clears it:** running Set Administrator Password. It can return, but only if the
  stored password is removed.

## Health Checks

One check is displayed; the rest gate startup ordering without appearing in the UI.

- **Web Interface** (displayed): nginx is accepting connections on 8080. Green here means
  ERPNext is usable. A failure that persists past the grace period, with the backend
  healthy, points at nginx or the built assets rather than at the application.
- Not displayed: MariaDB via `healthcheck.sh --connect --innodb_initialized`, each redis via
  `redis-cli ping`, and the backend and websocket via a port probe. On first start these
  stay unready for a minute or two while MariaDB initializes; that is a slow start, not a
  fault. A backend that never becomes ready after MariaDB is up is usually a site-config or
  schema problem, and the `backend` subcontainer's log says which.
- The scheduler and both queue workers expose no port and no status endpoint, so they report
  ready as soon as they are running; the supervisor restarts them if they exit. Background
  jobs silently not running is therefore not visible as a failed check — read the
  `scheduler` and `queue-*` logs.

Startup is ordered by `requires`: `seed-sites` → database and cache → configurator →
backend and websocket → workers, scheduler and nginx. A failure early in that chain leaves
the later daemons waiting rather than crash-looping.

## Backups and Restore

A backup carries a logical dump of the database, not MariaDB's files. The pre-backup hook
starts MariaDB against the `db` volume, runs `mariadb-dump`, and writes
`erpnext.sql.zst` to the `dump` volume; the file copy that follows takes `sites`, `main`
and `dump`. The post-backup hook deletes the staged dump, so it does not sit on the data
disk between backups.

`sites` must be in the set alongside the dump, because it holds the site encryption key
without which the restored database cannot be read, and the credentials frappe connects
with; `main` carries the stored credentials, so a restored instance keeps the Administrator
password that was in force when the backup was taken.

Restore mounts the dump at `/docker-entrypoint-initdb.d` and runs the mariadb image's own
entrypoint against an empty data directory, which is the path a first install takes: the
entrypoint initializes the directory, creates the `root`, `healthcheck` and site users from
the restored credentials, and imports the dump. The hook then counts the tables in the
restored schema and fails the restore if there are none, so a dump that did not import can
never be mistaken for an empty ledger.

A restored instance needs nothing rebuilt and no credential re-entered. It comes back with
the same site, the same data and the same password.

## Limitations and Differences

What this package does differently from a stock `frappe_docker` deployment, and where a
StartOS control replaces an ERPNext one.

1. **Single site.** Frappe supports many sites per bench; this package creates and serves
   exactly one, under a fixed site name and a fixed database name.
2. **Email settings apply on the next start.** The Configure Email action stores the choice;
   the `smtp` oneshot writes it into ERPNext when the service starts.
3. **Email settings are validated by ERPNext, not by StartOS.** ERPNext opens a real SMTP
   session when it saves an outgoing account, so a wrong password or an unreachable relay is
   only discovered at start. It is reported in the service log as a `[smtp]` line and mail is
   left unconfigured — it never blocks startup.
4. **A mail account you create yourself wins.** If you set your own default outgoing Email
   Account inside ERPNext, ERPNext uses it in preference to the one this package manages.
5. **Setting the Administrator password requires the service to be stopped**, because the
   action runs its own database to apply it.
6. **`bench` is not exposed as an action.** Administrative `bench` commands can be run with
   `start-cli package attach erpnext -n backend -- bench --site <site> <command>`.
7. **Upstream app upgrades run a schema migration.** A package release carrying a newer
   ERPNext image runs `bench migrate` during the update; a failed migration rolls the update
   back.

---

## Quick Reference for AI Consumers

```yaml
package_id: 'erpnext'
images: ['frappe/erpnext', 'mariadb', 'redis']
architectures: ['x86_64', 'aarch64']
subcontainers:
  [
    'seed-sites',
    'configurator',
    'smtp',
    'mariadb',
    'redis-cache',
    'redis-queue',
    'backend',
    'websocket',
    'scheduler',
    'queue-short',
    'queue-long',
    'frontend',
  ]
volumes:
  {
    sites: '/home/frappe/frappe-bench/sites',
    db: '/var/lib/mysql',
    dump: 'backup staging',
    main: 'package store',
  }
backup_set: ['sites', 'main', 'dump'] # db is dumped logically
file_models: ['store.json', 'site_config.json']
startos_managed_env_vars:
  [
    'MYSQL_ROOT_PASSWORD',
    'MYSQL_PWD',
    'MARIADB_AUTO_UPGRADE',
    'MARIADB_DATABASE',
    'MARIADB_USER',
    'MARIADB_PASSWORD',
    'MARIADB_USER_HOST',
    'GUNICORN_WORKERS',
    'GUNICORN_THREADS',
    'GUNICORN_TIMEOUT',
    'BACKEND',
    'SOCKETIO',
    'FRAPPE_SITE_NAME_HEADER',
    'UPSTREAM_REAL_IP_ADDRESS',
    'UPSTREAM_REAL_IP_HEADER',
    'UPSTREAM_REAL_IP_RECURSIVE',
    'PROXY_READ_TIMEOUT',
    'CLIENT_MAX_BODY_SIZE',
    'SMTP_FIELDS',
    'DB_ROOT_PASSWORD',
    'ADMIN_PASSWORD',
    'NEW_ADMIN_PASSWORD',
  ]
dependencies: []
interfaces: { ui: { type: ui, port: 8080 } }
actions: ['set-admin-password', 'manage-smtp']
tasks: [{ action: set-admin-password, severity: critical }]
health_checks: ['frontend'] # the only one StartOS surfaces; the rest gate ordering only
```
