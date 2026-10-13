# Contour distribution

Contour owns canonical tokens, Core CSS/TypeScript runtime, iconography, React anatomy and the catalog. Its initial visual contract is extracted from Reflower, with rf-* classes and token extension namespaces retained for compatibility. Product logic, user data, credentials, product logos and Telegram SDK are excluded.

A stable release consists of a versioned Git tag, a deterministic ZIP, a per-file manifest and archive SHA-256. The tag workflow rebuilds generators and React, rejects stale outputs, validates registry and runs browser behavior contracts with no skips. Only that successful workflow publishes a release. Never overwrite a published release/tag; use a new version.

Consumers pin version, Git revision, archive hash and managed file hashes in contour.lock.json. The standard-library scripts/consumer.py installs prebuilt assets and sources without executing downloaded code. Reflower retains product-specific legacy/lint baselines and product tests; imported Core sources are managed dependencies, never edited locally. Lavlio receives the runtime assets used by its prototype. Generated deployment assets are installed from the same release.

Each consumer runs its Contour update PR workflow on weekdays or manual dispatch. The workflow checks the current lock against the upstream immutable archive, downloads the latest stable release, replaces only managed files and creates/refreshes contour/update. It never merges or deploys. GitHub starts bot-created PR workflows in an approval-required state; the owner approves those runs after reviewing the update. The updater does not bypass that approval. Merge requires product tests and visual review. Keep component changes, new optional features and breaking API changes distinct in release notes; incompatible changes require a major version.

Local build: pnpm install --frozen-lockfile, pnpm --dir design/design-system/site install --frozen-lockfile, python scripts/build.py. Check: python scripts/check.py --browser (Playwright Chromium required). Catalog: serve this checkout and open design/design-system/web/catalog.html. React exports are built under design/design-system/adapters/react/dist. Root package.json also permits use as a version-pinned Git npm dependency; the product installations currently use the release bundle, not an npm registry.

Project source is public but no third-party reuse license has been assigned. Font licenses are included. The repository owner can use the system across their own products.
