---
slug: /quick-start/
title: Quick Start
description: Get a JWT from WordPress and call the REST API with it in 5 minutes - set the signing key, enable authentication, and send a Bearer token.
keywords: [Simple JWT Login quick start, WordPress JWT tutorial, get JWT WordPress REST API, Bearer token WordPress, headless WordPress authentication]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

This page takes you from a fresh install to an authenticated REST API call in five steps. Each step links to the full reference if you need more options.

All examples use `https://example.com` - replace it with your site URL. If your site does not use pretty permalinks, replace `/wp-json/` with `/?rest_route=/` (see [Server](./Configuration.mdx#server)).

## 1. Install the plugin

Install and activate **Simple JWT Login** from **Plugins → Add New** in WordPress, or with WP-CLI:

```bash
wp plugin install simple-jwt-login --activate
```

More options: [Installation guide](./Introduction.md#installation-guide).

## 2. Set the signing key

Go to **Settings → Simple JWT Login → General**. In the **JWT Verification Rules** ELSE row:

1. Choose an algorithm - `HS256` is the simplest choice.
2. Enter a long, random secret key.
3. Click **Save Changes**.

:::caution
Anyone who knows the secret key can forge valid tokens. For production, consider storing it in `wp-config.php` instead of the database - see [Key source](./Configuration.mdx#the-else-rule-required-default).
:::

## 3. Enable authentication

Go to **Settings → Simple JWT Login → Authentication**, turn on **Allow JWT Authentication**, and save. While you are there, also turn on **Allow Validate Token Endpoint** - step 5 uses it.

:::info
Every endpoint is **disabled by default**. A disabled endpoint returns a `403` with an error code such as `45` (authentication) or `82` (validate token). The [Endpoints overview](./Endpoints.md) lists the setting that enables each one.
:::

## 4. Get a JWT

Send the user's credentials to the `/auth` endpoint:

```bash
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"the-user-password"}'
```

Response:

```json
{
  "success": true,
  "data": {
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
}
```

You can also log in with `username` or `login` instead of `email`. Full reference: [Authentication](./auth/Authentication.md).

## 5. Use the JWT

Send the token in the `Authorization` header:

```bash
curl "https://example.com/wp-json/simple-jwt-login/v1/auth/validate" \
  -H "Authorization: Bearer YOUR_JWT"
```

The [validate endpoint](./auth/ValidateToken.md) returns the user the token belongs to, so it is a quick way to check that everything works.

To use the token with the **WordPress REST API** (`/wp/v2/posts`, `/wp/v2/users/me`, ...) or with your own endpoints, enable **JWT Middleware for all WordPress endpoints** under **General → Integration Options**. WordPress then treats every request with a valid JWT as coming from that user:

```bash
curl "https://example.com/wp-json/wp/v2/users/me" \
  -H "Authorization: Bearer YOUR_JWT"
```

The plugin can also read the JWT from a query parameter, the request body, a cookie, or the session - see [JWT Input Sources](./Configuration.mdx#jwt-input-sources).

## Handling errors

Every error has the same shape. Branch on `data.error_code`, not on the message text:

```json
{
  "success": false,
  "data": {
    "message": "Wrong user credentials.",
    "error_code": 48
  }
}
```

Look up any code in [Error codes](./Error-Codes.md).

## Next steps

- **Keep users logged in** - enable [refresh tokens](./auth/RefreshToken.md) and [revoke](./auth/RevokeToken.md) tokens on logout.
- **Lock down the REST API** - require a JWT, or a specific role, for any route with [Protect Endpoints](./Protect-Endpoints.md).
- **Call from a browser** - configure [CORS](./Cors.md) for your front-end origin.
- **Let users sign up** - enable [Register User](./Register-User.md).
- **Social login** - exchange Google, Auth0, Facebook, or GitHub tokens for a WordPress JWT with [OAuth](./integrations/OAuth/index.md).
- **Server-to-server calls** - use [API keys](./API-Keys.md) instead of user passwords.
- **See every endpoint** - [Endpoints overview](./Endpoints.md).
- **Full working apps** - [Code examples](./code_examples/index.mdx).
