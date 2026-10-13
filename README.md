# Contour

Shared tokens, Core Web, iconography, React adapter and interactive catalog for Reflower, Lavlio and other products.

Source: design/design-system. Product deployments consume immutable tagged releases and accept updates through pull requests. See docs/releasing.md.

The rf-* CSS namespace and DTCG extension names are compatibility API, not a product dependency. Telegram SDK, authentication, business data and product logos are not part of Core. Onest licenses are included; project source is public but no third-party reuse license has been granted.

## Reviewing product updates

Lavlio and Reflower pin a release with its source revision and archive checksum. The update workflow proposes a new version through a normal PR. Review the lock and managed asset diff, approve any GitHub-required CI run, and merge only after the applicable product checks pass. Deployment remains a separate decision.
