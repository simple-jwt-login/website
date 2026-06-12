---
slug: /refresh-token/
title: Refresh token
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Use this endpoint to exchange a refresh token for a new JWT, without requiring the user to re-enter their credentials. This is the standard mechanism for keeping long-running sessions alive.

A `refresh_token` is returned alongside the JWT whenever you call the Authentication endpoint (POST `/auth`), provided the Refresh Token feature is enabled.

**METHOD** : `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/refresh`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/refresh&refresh_token={{YOUR_REFRESH_TOKEN}}`

**PARAMETERS**:

| Parameter | Type | Description |
| :-------: | :--: | ----------- |
| `refresh_token` | `required` `string` | The refresh token returned by the Authentication endpoint |
| `AUTH_KEY` | `optional` `string` | Auth Code value. Required only if "Require Authentication Code" is enabled in Refresh Token settings. The parameter name matches the **Auth Code URL Key** configured under Auth Codes settings (default: `AUTH_KEY`). |
| `payload` | `optional` `json` | Custom JSON object to merge into the new JWT payload. Keys provided here are merged with the standard payload generated from the user record. |

## Request

```json
{
  "refresh_token": "YOUR_REFRESH_TOKEN_HERE"
}
```

With an Auth Code and custom payload:

```json
{
  "refresh_token": "YOUR_REFRESH_TOKEN_HERE",
  "AUTH_KEY": "MySecretAuthCode",
  "payload": "{\"custom_claim\": \"value\"}"
}
```

## Responses

### 200

```json
{
  "success": true,
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refresh_token": "f6e7g8h9i0j123456789012345678901234567890123456789012345678901234567"
  }
}
```

Token rotation is applied on every successful refresh: the submitted token is invalidated immediately, and the new `refresh_token` in the response replaces it. Store the new token before discarding the old one.

### 400

The `refresh_token` parameter is missing from the request.

```json
{
  "success": false,
  "data": {
    "message": "Refresh token is missing.",
    "errorCode": 51
  }
}
```

### 401

The refresh token was not found or has expired.

```json
{
  "success": false,
  "data": {
    "message": "Invalid refresh token.",
    "errorCode": 51
  }
}
```

### 403

The refresh token feature is disabled in plugin settings.

```json
{
  "success": false,
  "data": {
    "message": "Refresh Token endpoint is not enabled.",
    "errorCode": 81
  }
}
```

### 500

Internal server error.

```json
{
  "success": false,
  "data": {
    "message": "An unexpected error occurred.",
    "errorCode": 22
  }
}
```

## Examples

### SHELL

```bash
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth/refresh \
  -H "Content-type: application/json" \
  -d '{"refresh_token":"YOUR_REFRESH_TOKEN"}'
```

### PHP

```php
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->refreshToken('your refresh token here', 'AUTH CODE');
```

## Error responses

All error responses follow the standard envelope:

```json
{
  "success": false,
  "data": {
    "message": "Human-readable error description",
    "errorCode": 51
  }
}
```

Common error codes:

| Code | Meaning |
| :--: | ------- |
| `51` | The `refresh_token` parameter is missing, or the token was not found / has expired. |
| `81` | The refresh token feature is disabled in plugin settings. |

---

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-7.png?raw=true)

## Settings

Configure the refresh token feature under **Settings → Simple JWT Login → Refresh Token**.

### Allow Refresh Token Endpoint

Enable or disable the refresh token endpoint. When disabled, the `/auth/refresh` route returns a 403 error. When enabled, a `refresh_token` is also returned alongside the JWT from the Authentication endpoint.

### Require Authentication Code

When enabled, the client must include a valid Auth Code in the refresh request. The parameter name used to pass the code is the **Auth Code URL Key** configured under **Auth Codes** settings (default: `AUTH_KEY`).

### JWT Refresh Window

How long (in minutes) a refresh token remains valid from the time it was issued. The window is **rolling** - each successful refresh issues a new token with a fresh TTL, so an active client never expires as long as it refreshes within the window.

Default: **20,160 minutes** (2 weeks).

### Refresh Token Secret Key

A separate secret used to encrypt refresh tokens stored in the database. This key is independent of the JWT signing key. Use a long, random string - the **Generate Secure Key** button creates a cryptographically secure value.

:::caution
Never reuse your JWT signing key as the refresh token secret. If one is compromised, the other remains safe.
:::
