# Updating the upstream version

## Determining the upstream version

Upstream is the `frappe/erpnext` Docker image, which bundles the Frappe framework and the
ERPNext app. The pin lives in `startos/manifest/index.ts` under `images.erpnext.source.dockerTag`.

Find the latest release:

```bash
gh release view -R frappe/erpnext --json tagName -q .tagName
```

and confirm an image was actually published for it, on both architectures:

```bash
curl -s "https://hub.docker.com/v2/repositories/frappe/erpnext/tags/<tag>" \
  | jq -r '[.images[].architecture] | unique'
```

A release existing does not mean the image exists — check before bumping.

## Applying the bump

1. Set `images.erpnext.source.dockerTag` to `frappe/erpnext:<tag>`.
2. Set `version` in `startos/versions/current.ts` to `<upstream version>:0`, dropping the
   leading `v` (image tag `v16.32.3` → version `16.32.3:0`). A packaging-only change instead
   keeps the upstream part and increments the revision (`16.32.3:1`).
3. Write real release notes in every locale — what the user gets, not "internal updates".
4. `npm run check && make`.

## The database and cache images

`mariadb` and `redis` are pinned in the same file. Upstream's `frappe_docker` overrides
(`overrides/compose.mariadb.yaml`, `overrides/compose.redis.yaml`) are the reference for
which major versions ERPNext is tested against — follow them rather than tracking latest,
and keep MariaDB on the major line upstream uses.

## Frappe framework upgrades

The image carries the framework and the app together, so bumping the tag bumps both.
Frappe supports upgrading one major version at a time; do not skip a major line.
