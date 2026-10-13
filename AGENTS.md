# Contour

Read docs/releasing.md before changing distribution. Canonical visual sources are design/design-system/tokens and web/runtime/components; generated artifacts must be built, never edited manually. Keep rf-* compatibility API until a reviewed major release. Product data, credentials, authentication and Telegram SDK never enter this repository. Validate Core behavior, registry, generators and browser contracts before publishing a release. Consumers receive immutable releases through reviewed PRs; no automatic product deploys.
