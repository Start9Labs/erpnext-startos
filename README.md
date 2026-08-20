<p align="center">
  <img src="icon.svg" alt="ERPNext Logo" width="21%">
</p>

# ERPNext on StartOS

> Everything not listed in this document should behave the same as upstream ERPNext.
> If a feature, setting, or behavior is not mentioned here, the upstream
> documentation is accurate and fully applicable — see the Documentation section of
> `instructions.md` for links.

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
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Limitations and Differences](#limitations-and-differences)
- [Contributing](#contributing)

## Image and Container Runtime

Three upstream images, all pinned by tag in `startos/manifest/index.ts`, all built for
`x86_64` and `aarch64`:

| Image     | Source            | Role                                            |
| --------- | ----------------- | ----------------------------------------------- |
| `erpnext` | `frappe/erpnext`  | Frappe framework + ERPNext app; six containers  |
| `mariadb` | `mariadb`         | The database holding the ledger                 |
| `redis`   | `redis`           | Cache and job queue                             |

ERPNext is not one process. This package runs the same process split as upstream's
`frappe_docker` compose file, as nine subcontainers:

| Subcontainer  | Kind    | Command                              | Purpose                                    |
| ------------- | ------- | ------------------------------------ | ------------------------------------------ |
| `configurator`| oneshot | `bench set-config …`                 | Writes bench-wide config; also runs `chown` |
| `mariadb`     | daemon  | image entrypoint                     | Database                                   |
| `redis-cache` | daemon  | `redis-server --port 6379`           | Frappe cache                               |
| `redis-queue` | daemon  | `redis-server --port 6380`           | RQ job queue and socket.io pub/sub         |
| `backend`     | daemon  | image entrypoint (gunicorn)          | Application server                         |
| `websocket`   | daemon  | `node …/frappe/socketio.js`          | Realtime updates                           |
| `scheduler`   | daemon  | `bench schedule`                     | Cron-like scheduled jobs                   |
| `queue-short` | daemon  | `bench worker --queue short,default` | Short background jobs                      |
| `queue-long`  | daemon  | `bench worker --queue long,default,short` | Long background jobs                  |
| `frontend`    | daemon  | `nginx-entrypoint.sh`                | nginx; serves assets, proxies the rest     |

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
- install/reset only: `DB_ROOT_PASSWORD`, `ADMIN_PASSWORD`, `NEW_ADMIN_PASSWORD` — passed
  through the environment so credentials never appear in a command line or the service log

## Volume and Data Layout

| Volume  | Mountpoint                      | Contents                                                     |
| ------- | ------------------------------- | ------------------------------------------------------------ |
| `sites` | `/home/frappe/frappe-bench/sites` | Site config, the encryption key, uploaded files, built assets |
| `db`    | `/var/lib/mysql`                | MariaDB data directory                                       |
| `main`  | package store                   | `store.json`                                                 |

The `sites` volume is created root-owned by StartOS while every frappe process runs as uid
1000, so a `chown` oneshot hands it over before anything else starts.

## File Models

`store.json` (`startos/fileModels/store.json.ts`) on the `main` volume, holding
`adminPassword` and `dbRootPassword`. Both are written once at install. Nothing else in the
package rewrites it, and ERPNext itself never reads it — it is the package's own record.

ERPNext's own configuration lives in `sites/common_site_config.json` inside the `sites`
volume. The `configurator` oneshot rewrites the host, port and redis entries on **every**
start, so hand edits to those keys do not survive a restart; other keys are left alone.

## Dependencies

None.

## Network Access and Interfaces

One interface: `ui`, an HTTP web interface on nginx's port. StartOS decides where it is
reachable — LAN, `.local`, or Tor if the user installs and enables it.

nginx is configured with a fixed site name header, so the single site answers on every
address StartOS offers it rather than on one hostname.

## Installation and First-Run Flow

Install generates a MariaDB root password and an Administrator password, then runs a
temporary daemon chain (`runUntilSuccess`): MariaDB and both redis instances come up, the
configurator writes bench config, and `bench new-site` creates the site, installs the ERPNext
app and sets the Administrator password. This takes several minutes and can take longer on
slower hardware; the install progress bar reports it as a phase.

When it finishes, a **critical** task points at the View Administrator Credentials action.
The service will not start until the user runs it — deliberately, so nobody ends up with a
running accounting system whose admin password they have never seen.

Sign in with username `Administrator` and that password, then work through ERPNext's own
setup wizard (company, fiscal year, chart of accounts, currency).

## Actions

| Action                           | When to run                            | Effect                                                                 |
| -------------------------------- | -------------------------------------- | ---------------------------------------------------------------------- |
| View Administrator Credentials   | After install, or whenever forgotten   | Reads and displays the stored password. Changes nothing. Safe to repeat |
| Reset Administrator Password     | Password lost or should be rotated     | Generates a new password, applies it with `bench set-admin-password`, stores and returns it |

Reset runs only while the service is stopped: ERPNext keeps the password hashed in its
database, so the action brings up its own MariaDB, applies the change, and tears it down.
It rotates only the `Administrator` account — user accounts created inside ERPNext are
managed in ERPNext.

## Tasks

One task, raised at the end of install: **critical**, pointing at View Administrator
Credentials. Running that action clears it and lets the service start.

## Health Checks

- **Web Interface** (user-visible): nginx is accepting connections. This is the only check
  surfaced in the UI, and it is the one that means "ERPNext is usable".
- Internal, not displayed: MariaDB via `healthcheck.sh --connect --innodb_initialized`,
  each redis via `redis-cli ping`, the backend and websocket via a port probe.
- The scheduler and both queue workers expose no port and no status endpoint, so they report
  ready as soon as they are running; the supervisor restarts them if they exit.

Startup is ordered by `requires`: chown → database and cache → configurator → backend and
websocket → workers, scheduler and nginx. A failure early in that chain leaves the later
daemons waiting rather than crash-looping.

## Backups and Restore

All three volumes are copied as files. StartOS stops the service for the duration of a
backup, so MariaDB has shut down cleanly and its data directory is at rest — this is not a
live-directory copy. `sites` holds uploads, the site config and the site encryption key,
without which the database is unreadable; `main` carries the stored credentials.

A logical dump via `sdk.Backups.withMysqlDump` would be the idiomatic choice, but it invokes
`mysqld`, `mysqladmin`, `mysqldump`, `mysql` and `mysql_install_db`, and MariaDB 11.8 ships
none of those names — only the `mariadb*` equivalents. Backups fail with "MySQL/MariaDB
failed to become ready" until that is fixed upstream (start-technologies#3763).

Verified end to end on StartOS 0.4.0: backup, uninstall, restore, then sign in with the
pre-backup password and find the same records.

## What Is Unchanged from Upstream

Everything about ERPNext itself: the accounting model, the setup wizard, the REST API at
`/api/resource/<DocType>`, the app installer, print formats, workflows, and the desk UI.
The process split and the images are upstream's. This package supplies the database,
the cache, the site bootstrap, credential handling, backups and the network interface.

## Limitations and Differences

- **Single site.** Frappe supports many sites per bench; this package creates and serves
  exactly one, with a fixed database name so backups know what to dump.
- **No email out of the box.** Configure an outgoing mail account inside ERPNext.
- **Password reset is offline.** See Actions above.
- **`bench` is not exposed as an action.** Administrative `bench` commands can be run with
  `start-cli package attach erpnext -n backend -- bench --site <site> <command>`.
- **Upstream app upgrades.** A package release that carries a newer ERPNext image runs
  `bench migrate` as part of the update; a failed migration rolls the update back.

## Contributing

Build and development workflow follow the StartOS packaging guide:
<https://docs.start9.com/packaging>. Keep `README.md`, `instructions.md`, and `AGENTS.md`
in sync with any change to user-visible behavior or package structure.

---

## Quick Reference for AI Consumers

```yaml
package_id: 'erpnext'
image: 'frappe/erpnext'
architectures: ['x86_64', 'aarch64']
subcontainers:
  [
    'configurator',
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
    main: 'package store',
  }
file_models: ['store.json']
startos_managed_env_vars:
  [
    'MYSQL_ROOT_PASSWORD',
    'MARIADB_AUTO_UPGRADE',
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
  ]
dependencies: []
interfaces: { ui: 'http web interface' }
actions: ['get-admin-credentials', 'reset-admin-password']
tasks: ['critical: view administrator credentials after install']
health_checks:
  ['Web Interface', 'mariadb', 'redis-cache', 'redis-queue', 'backend', 'websocket']
```
