# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

**Start every task at the recipe index** — `../start-technologies/projects/start-sdk/docs/src/recipes.md`
(or <https://docs.start9.com/packaging/recipes.html>). It maps an intent ("prompt the user to create
admin credentials", "expose a web UI") to the constructs, the reference pages, and a named production
package to copy. Find the recipe before you read this package's neighbours: a package you reach by
grepping may be non-conformant, and the recipe outranks it.

Freshly scaffolded? Work the
[New Package Checklist](../start-technologies/projects/start-sdk/docs/src/new-package-checklist.md)
(or <https://docs.start9.com/packaging/new-package-checklist.html>) from top to bottom. It is a
guide page, not a file in this repo — read it, don't copy it in.

Keep `README.md` (technical reference for an AI support or administering agent) and
`instructions.md` (end-user docs) in sync with your changes.

**Bugs and feature requests are GitHub issues on this repo** — file them as you find them.
Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

ERPNext is not a single process. This package runs the same split as upstream's
`frappe_docker` compose file — nginx, gunicorn, a socket.io server, a scheduler and two RQ
workers, over MariaDB and two redis instances. Before changing `startos/main.ts`, read
`compose.yaml` and `overrides/` in <https://github.com/frappe/frappe_docker>: the commands,
the env vars and the startup ordering here are taken from there, and they should stay in
step with it.

Things that will bite you:

- **All subcontainers share one network namespace**, so they talk over `127.0.0.1` and no
  two may bind the same port. The two redis instances differ only by port for that reason.
- **The `sites` volume is shared by every frappe container** and is created empty and
  root-owned, while the image runs as uid 1000. The `seed-sites` oneshot copies the image's
  `sites/` skeleton in and hands it over, and has to run before anything else — in `main.ts`
  and in both init chains.
- **The site is created once, at install**, by a `runUntilSuccess` chain — MariaDB has to be
  running for `bench new-site`, which is why this is not a plain `setupOnInit` step. The
  database name is pinned rather than left to bench, which would otherwise generate a random
  one per site.
- **`bench new-site` gets a throwaway Administrator password that is never stored.** The one
  the user gets is minted by the `set-admin-password` action, which a critical task sends
  them to before the service may start. Do not add an action that only displays a stored
  credential — one action generates, stores, applies and returns it, and the same one
  rotates it.
- **Backups copy volumes; they do not dump.** `Backups.withMysqlDump` cannot drive a MariaDB
  11.x image (it calls `mysqld`/`mysqladmin`/`mysqldump`, which no longer exist — see
  start-technologies#3766). Copying is sound only because StartOS stops the service for a
  backup; if that ever stops being true, this has to become a logical dump.
- **Bumping the image means a schema migration.** `bench migrate` runs on `kind === 'update'`
  inside init, where a failure rolls the update back. Do not move it to a oneshot in `main`.
- **Credentials never go on a command line** — `bench` reads them from the environment so
  they stay out of the process table and the service log.
