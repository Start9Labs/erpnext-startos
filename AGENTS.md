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
`instructions.md` (end-user docs) in sync with your changes. This file restates neither:
whoever changes the package has both, so it carries only what they don't — repo mechanics,
a change that looks right and is not, where the next thing gets added, a naming trap, a
build or test invocation particular to this repo.

**Fix a defect you spot rather than reporting it** — you have the package open and the
context to be sure. File **a GitHub issue on this repo** only when the call isn't yours to
make: you can't pin the cause down, two defensible fixes exist, or it's too large to ride on
the work in hand. An open issue is a report, not a queue — implement one when you're asked
to or when it's labelled `Approved`, then close it with `Closes #<n>`.

Don't record work in the repo instead: no `TODO.md`, no `NOTES.md`, no `PLAN.md`. What you
verified, tried, and decided belongs in the commit message and the PR body.

## This repo

- **Keep `startos/main.ts` in step with upstream's `frappe_docker`.** Its commands, env vars
  and startup ordering come from `compose.yaml` and `overrides/` in
  <https://github.com/frappe/frappe_docker>; read those before changing any of them.
- **Every daemon chain starts with the `seed-sites` oneshot** — `main.ts` and both init chains
  in `init/bootstrapErpnext.ts`. A chain without it runs frappe against a root-owned, empty
  `sites` volume.
- **`bench migrate` stays in init on `kind === 'update'`.** Moved to a oneshot in `main`, a
  failed migration no longer rolls the update back.
- **Keep backups as a copy of the `db`, `sites` and `main` volumes; don't move them to
  `withMariadbDump`.** StartOS stops the service for a backup, so the data-directory copy is
  consistent, and a dump adds a MariaDB process and SQL to run at both ends. Slow restores
  were a StartOS bug fixed in 0.4.0.2 (start-technologies#3779), not a reason to dump.
- **Re-check `bench`'s stdout markers when bumping the image** (`Installing frappe...`,
  `Installing erpnext...`, `Updating DocTypes … NN%` in `init/bootstrapErpnext.ts`). A reworded
  marker leaves an install phase indeterminate without failing anything.
