# New Plugin Release 4.2.0

November 18, 2026 ·

<!-- -->

7 min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle)

[Nicu Micle](/releases/authors/nicumicle)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `4.2.0` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

Upgrade notice

Important security release. It fixes multiple security vulnerabilities affecting authentication, authorization, and REST API endpoints. All users are strongly encouraged to upgrade as soon as possible. Review the **Breaking Changes** section before upgrading.

## Security[​](#security "Direct link to Security")

* Fixed multiple security vulnerabilities affecting authentication, authorization, and REST API endpoints
* Strengthened validation and authorization across the affected endpoints
* Improved the data returned by REST API endpoints
* Added security regression tests to prevent these issues from coming back

## New Features[​](#new-features "Direct link to New Features")

* **Expected audience (aud)** - new optional setting for the plugin's own JWTs (Authentication) and for each JWT Rule. When set, new JWTs carry that `aud` and only JWTs whose `aud` contains it are accepted (new error code `130`). Read more about the [audience setting](/docs/authentication.md#audience-aud).
* **Revoke sessions on password change** - new option in Authentication, off by default. When on, changing a password deletes the user's refresh tokens and rejects every JWT issued before the change. JWTs without an `iat` claim are then also rejected for that user. Read more about [revoking sessions](/docs/authentication.md#revoke-sessions-on-password-change).
* `/auth` now checks the password with `wp_authenticate()`, so brute-force and user-block plugins (Limit Login Attempts, Wordfence and similar) protect it like `wp-login.php`. Application passwords can't be exchanged for a JWT. Read more about [password checks](/docs/authentication.md#password-checks).
* **OAuth backward-compatibility options** - new options, off by default, to accept tokens that aren't bound to the configured app. They are **Allow tokens issued for other Google clients**, **Allow tokens issued for other Facebook apps**, **Allow tokens issued for other GitHub apps** (also accepts personal access tokens) and Auth0 **Allow opaque access tokens**. The admin screen shows a security warning while one is on, because any app on that provider could then log its users into the matching WordPress accounts. See [OAuth backward compatibility](/docs/integrations/oauth.md#backward-compatibility).
* **Dashboard security notices** - a new **Security notices** section lists the enabled options and settings that weaken security (the critical and warning findings of the security report), most severe first. Click a notice to open the matching settings tab. The dashboard and the AI `security-report` ability also report the OAuth options above when they are on. See the [Dashboard](/docs/dashboard.md).
* The AI Abilities security report now warns when authentication with `password_hash` is enabled
* Admin: optional support banner with a donation link at the top of the settings page. It can be dismissed for 6 months, and no features are locked behind donations

## Breaking Changes[​](#breaking-changes "Direct link to Breaking Changes")

Why these changes are breaking

These changes were introduced on purpose to strengthen the security of your WordPress site, so most of them can't be kept optional. The OAuth token checks are the exception. The new options **Allow tokens issued for other Google clients**, **Allow opaque access tokens**, **Allow tokens issued for other Facebook apps**, and **Allow tokens issued for other GitHub apps** turn them off for one provider each. When one is on, your applications stay backward compatible and keep working as before 4.2.0, but without the security fix for that provider. See [OAuth backward compatibility](/docs/integrations/oauth.md#backward-compatibility).

* **WordPress 6.2 or newer** is required (was 4.4). The plugin's database queries use the `%i` identifier placeholder added in WordPress 6.2.

* **OAuth login links** - the OAuth login buttons (Google, Auth0, Facebook, GitHub) now go through the plugin, which redirects to the provider. Custom login buttons or links that send visitors straight to the provider with the plugin's callback as `redirect_uri` stop working. Link to `GET /oauth/token?provider=<provider>` instead. See the [OAuth flow](/docs/integrations/oauth.md#typical-oauth-flow).

* **OAuth tokens** - tokens sent to the OAuth endpoint (and Google `id_token`s used on all endpoints) must be issued for the app configured in the plugin:

  * a Facebook or GitHub `access_token` must belong to the configured app (GitHub personal access tokens are rejected)
  * a Google `id_token` must have the configured Client ID as `aud`
  * an Auth0 `access_token` must be a JWT issued for the configured Auth0 Client ID (`azp` or `aud`), so opaque Auth0 access tokens are rejected

  To stay backward compatible, turn on the matching new OAuth option. See [OAuth backward compatibility](/docs/integrations/oauth.md#backward-compatibility).

* **Reset password** - `POST /user/reset_password` with an unknown email now answers `200` instead of `404` with the "Wrong user." message.

* **Reverse proxy** - with "Trust reverse proxy IP headers" on, the client IP is read from the last `X-Forwarded-For` entry only. Sites whose proxy sends the client IP only in `Client-IP` must switch the proxy to `X-Forwarded-For`. See [Trust reverse proxy IP headers](/docs/configuration.md#trust-reverse-proxy-ip-headers).

* **Two-factor** - after too many wrong two-factor codes (30 by default, Two Factor filter `two_factor_failed_attempt_limit`) sent to `POST /auth/2fa` or the OAuth two-factor form, the user's password is reset and the user and admin are emailed, as on `wp-login.php`. Read more about [two-factor failed codes](/docs/integrations/third-party/two-factor.md#failed-codes-and-reuse).

* **API keys on `/batch/v1`** - API keys need the `create`, `update` and `delete` permissions, otherwise they get `401`. See [API Keys](/docs/api-keys.md).

* **HTTP status of error responses** - client errors that used to answer `500` now answer their real status (`401`, `403`, `404`, `422` or `429`). The `error_code` values didn't change, so code that checks `error_code` keeps working. See the [full list of changed statuses](/docs/error-codes.md).

* **Audience** - once you set an expected audience, JWTs issued before it have no `aud` and stop working, so users must log in again

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Fix the Facebook browser login returning a `500` error instead of the login page with the error message when Facebook rejects the code
* Fix two parallel `/auth/refresh` calls with the same refresh token both getting a new JWT: a refresh token can now be used once only
* Fix API keys and refresh tokens staying in the database when a user is deleted in wp-admin, and an API key of a deleted user causing a `500` error instead of `401`
* Fix `/auth` rejecting Base64 passwords that contain `'`, `"` or `\`. Invalid Base64 now answers "Wrong user credentials."
* Fix `/auth` and `/auth/refresh` returning a refresh token that couldn't be saved: they now answer `500` (new error code `131`)
* Fix API key `expires_at` accepting any text: it must be a date, a date time or an ISO 8601 date (new error code `132`), is read as UTC and stored as UTC. The admin form now sends the browser's local time converted to UTC
* Fix the **Delete** button in **Security > Revoked Tokens**, which always failed with "Invalid revoked token ID."
* Failing to store the two-factor session now has its own error code `133` (`500`). It used to share code `107` with "two-factor session expired"

## API Reference[​](#api-reference "Direct link to API Reference")

* Every endpoint in the [API reference](/api/v4/simple-jwt-login.md) now documents its real request parameters, status codes and error codes, with examples taken from the plugin messages
* The endpoints used by the plugin admin screens (`/api-keys*` and [`/revoked-tokens*`](/api/v4/list-revoked-tokens.md)) are tagged `internal`, with their access rules: revoked tokens are for administrators only, and API keys can be managed by their owner, while administrators can manage every user's keys

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [security](/releases/tags/security)
* [feature](/releases/tags/feature)
* [bugfix](/releases/tags/bugfix)
