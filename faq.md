# Frequently asked questions

Quick answers about JWT authentication for WordPress with Simple JWT Login.

## Getting started

### What does Simple JWT Login do?

It adds JWT authentication to the WordPress REST API. Apps can log users in, register them, reset passwords, and call any REST endpoint as that user, all configured from wp-admin.

[Introduction](/docs.md)

<!-- -->

[ →](/docs.md)

### Are any features paid?

No. Every feature is in the free version, under GPLv3, with no paid plan or add-on to buy.

[Compare JWT plugins](/wordpress-jwt-plugin-comparison.md)

<!-- -->

[ →](/wordpress-jwt-plugin-comparison.md)

### Which WordPress and PHP versions are supported?

WordPress 6.2 and later. The plugin code runs on PHP 5.5 to 8.5, but in practice your PHP version is set by the WordPress version you run.

[Compatibility](/docs.md#compatibility)

<!-- -->

[ →](/docs.md#compatibility)

### Why does every endpoint return "not enabled" after I install it?

Every plugin endpoint starts disabled, so you expose only what you need. Turn on Allow JWT Authentication, and any other feature you use, in the plugin settings.

[Quick start](/docs/quick-start.md)

<!-- -->

[ →](/docs/quick-start.md)

## Logging in

### Can users log in with a username instead of an email?

Yes. Send email, username, or login, which accepts either one, together with the password.

[Authentication](/docs/authentication.md)

<!-- -->

[ →](/docs/authentication.md)

### Can users log in with Google, Facebook, GitHub, or Auth0?

Yes. The app exchanges the provider token for a WordPress JWT, and the plugin can create the WordPress user on the first login.

[OAuth login](/docs/integrations/oauth.md)

<!-- -->

[ →](/docs/integrations/oauth.md)

### Does it support two-factor authentication?

Yes. With the Two Factor plugin installed, users who set up 2FA get a short-lived interim token and must pass the second step before they receive the full JWT.

[Two-factor login](/docs/integrations/third-party/two-factor.md)

<!-- -->

[ →](/docs/integrations/third-party/two-factor.md)

### How do I use the JWT on WordPress core endpoints such as /wp/v2/posts?

Turn on JWT Middleware for all WordPress endpoints. WordPress then treats any REST request with a valid JWT as coming from that user.

[JWT middleware](/docs/configuration.md#jwt-middleware-for-all-wordpress-endpoints)

<!-- -->

[ →](/docs/configuration.md#jwt-middleware-for-all-wordpress-endpoints)

## Tokens

### How long does a JWT last?

60 minutes by default. You can change the expiry in the Authentication settings. Keep it short and use refresh tokens to keep users logged in.

[JWT expiration](/docs/authentication.md#jwt-expiration)

<!-- -->

[ →](/docs/authentication.md#jwt-expiration)

### How do I keep users logged in after the JWT expires?

Turn on refresh tokens. The login response then includes a `refresh_token`, which the app exchanges for a new JWT before or after the old one expires.

[Refresh tokens](/docs/refresh-token.md)

<!-- -->

[ →](/docs/refresh-token.md)

### How do I log a user out?

Revoke the JWT. A revoked token is rejected even if it has not expired yet.

[Revoke a token](/docs/revoke-token.md)

<!-- -->

[ →](/docs/revoke-token.md)

### Can I add custom data to the JWT?

Yes. Choose the claims in the Authentication settings, or add your own with the `simple_jwt_login_jwt_payload_auth` filter.

[Hooks](/docs/hooks.md)

<!-- -->

[ →](/docs/hooks.md)

### Where is the signing key stored?

In the plugin settings by default. To keep it out of the database, define `SIMPLE_JWT_PRIVATE_KEY` in `wp-config.php` instead.

[Configuration](/docs/configuration.md)

<!-- -->

[ →](/docs/configuration.md)

## Security

### Should servers and scripts use a JWT?

Use an API key instead. API keys are long-lived, scoped to read, create, update, or delete, and can be revoked at any time.

[API keys](/docs/api-keys.md)

<!-- -->

[ →](/docs/api-keys.md)

### How do I require a JWT on a REST route?

Add a rule in Protect Endpoints. Requests to that route without a valid JWT are rejected.

[Protect Endpoints](/docs/protect-endpoints.md)

<!-- -->

[ →](/docs/protect-endpoints.md)

### How do I report a security vulnerability?

Report it privately through GitHub security advisories, never in a public issue or forum.

[Security policy](/security.md)

<!-- -->

[ →](/security.md)

## Troubleshooting

### Why is my JWT ignored even though I send it?

The web server most likely strips the Authorization header before it reaches PHP. Send the token in another header, such as `X-Token`, or fix the server configuration.

[Missing Authorization header](/docs/troubleshooting.md#authorization-header-is-missing)

<!-- -->

[ →](/docs/troubleshooting.md#authorization-header-is-missing)

### Why does my browser app get a CORS error?

Add the app origin to Allow origin in the CORS settings, and Authorization to Allow headers. Since version 4.1.1, a JWT from another site is trusted only when its origin is listed. A `*` entry trusts the `Authorization` header, but never cookie or session JWTs.

[CORS](/docs/cors.md)

<!-- -->

[ →](/docs/cors.md)

### What does an error code mean?

Every error response includes an `error_code`. The error codes page explains each one and how to fix it.

[Error codes](/docs/error-codes.md)

<!-- -->

[ →](/docs/error-codes.md)
