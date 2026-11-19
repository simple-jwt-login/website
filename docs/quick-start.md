# Quick Start

This page takes you from a fresh install to an authenticated REST API call in five steps. Each step links to the full reference if you need more options.

All examples use `https://example.com` - replace it with your site URL. If your site does not use pretty permalinks, replace `/wp-json/` with `/?rest_route=/` (see [Server](/docs/configuration.md#server)).

## 1. Install the plugin[​](#1-install-the-plugin "Direct link to 1. Install the plugin")

Install and activate **Simple JWT Login** from **Plugins → Add New** in WordPress, or with WP-CLI:

```
wp plugin install simple-jwt-login --activate
```

For more options, see the [Installation guide](/docs.md#installation-guide).

## 2. Set the signing key[​](#2-set-the-signing-key "Direct link to 2. Set the signing key")

Go to **Settings → Simple JWT Login → General**. In the **JWT Verification Rules** ELSE row:

1. Choose an algorithm - `HS256` is the simplest choice.
2. Enter a long, random secret key.
3. Click **Save Changes**.

caution

Anyone who knows the secret key can forge valid tokens. For production, consider storing it in `wp-config.php` instead of the database - see [Key source](/docs/configuration.md#the-else-rule-required-default).

## 3. Enable authentication[​](#3-enable-authentication "Direct link to 3. Enable authentication")

Go to **Settings → Simple JWT Login → Authentication**, turn on **Allow JWT Authentication**, and save. While you are there, also turn on **Allow Validate Token Endpoint** - step 5 uses it.

info

Every endpoint is **disabled by default**. A disabled endpoint returns a `403` with an error code such as `45` (authentication) or `82` (validate token). The [Endpoints overview](/docs/endpoints.md) lists the setting that enables each one.

## 4. Get a JWT[​](#4-get-a-jwt "Direct link to 4. Get a JWT")

Send the user's credentials to the `/auth` endpoint:

```
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"the-user-password"}'
```

Response:

```
{
  "success": true,
  "data": {
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
}
```

You can also log in with `username` or `login` instead of `email`. For the full reference, see [Authentication](/docs/authentication.md).

## 5. Use the JWT[​](#5-use-the-jwt "Direct link to 5. Use the JWT")

Send the token in the `Authorization` header:

```
curl "https://example.com/wp-json/simple-jwt-login/v1/auth/validate" \
  -H "Authorization: Bearer YOUR_JWT"
```

The [validate endpoint](/docs/validate-token.md) returns the user the token belongs to, so it is a quick way to check that everything works.

To use the token with the **WordPress REST API** (such as `/wp/v2/posts` or `/wp/v2/users/me`) or with your own endpoints, enable **JWT Middleware for all WordPress endpoints** under **General → Integration Options**. WordPress then treats every request with a valid JWT as coming from that user:

```
curl "https://example.com/wp-json/wp/v2/users/me" \
  -H "Authorization: Bearer YOUR_JWT"
```

The plugin can also read the JWT from a query parameter, the request body, a cookie, or the session - see [JWT Input Sources](/docs/configuration.md#jwt-input-sources).

## Handling errors[​](#handling-errors "Direct link to Handling errors")

Plugin endpoints return errors in this shape. Branch on `data.error_code`, not on the message text (errors on other REST routes use the WordPress error format, with the code in the same `data.error_code` field):

```
{
  "success": false,
  "data": {
    "message": "Wrong user credentials.",
    "error_code": 48
  }
}
```

Look up any code in [Error codes](/docs/error-codes.md).

## Next steps[​](#next-steps "Direct link to Next steps")

* **Keep users logged in** - enable [refresh tokens](/docs/refresh-token.md) and [revoke](/docs/revoke-token.md) tokens on logout.
* **Lock down the REST API** - require a JWT, or a specific role, for any route with [Protect Endpoints](/docs/protect-endpoints.md).
* **Call from a browser** - configure [CORS](/docs/cors.md) for your front-end origin.
* **Let users sign up** - enable [Register User](/docs/register-user.md).
* **Social login** - exchange Google, Auth0, Facebook, or GitHub tokens for a WordPress JWT with [OAuth](/docs/integrations/oauth.md).
* **Server-to-server calls** - use [API keys](/docs/api-keys.md) instead of user passwords.
* **See every endpoint** - [Endpoints overview](/docs/endpoints.md).
* **Full working apps** - [Code examples](/docs/code-examples.md).
