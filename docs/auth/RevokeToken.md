---
slug: /revoke-token/
title: Revoke token
sidebar_position: 4
description: Immediately invalidate a JWT so it's rejected by future requests - use on logout or when responding to suspicious activity.
keywords: [WordPress revoke JWT, invalidate JWT WordPress, logout WordPress JWT, revoke token WordPress REST API, Simple JWT Login revoke]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Revoking a token immediately invalidates it - any subsequent request using that token will be rejected. Call this endpoint when a user logs out or when you need to terminate a specific session (e.g., after a password change or suspicious activity).

:::note
Once a token is revoked, it cannot be un-revoked. The user must authenticate again to obtain a new token.
:::

:::tip[API Reference]
Explore and test this endpoint using the [interactive API reference →](/api/v4/revoke-jwt)
:::

## Endpoint

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/revoke`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/revoke&JWT={{YOUR_JWT}}`

**PARAMETERS**:

| Parameter | Type | Description |
| :-------: | :--: | ----------- |
| `JWT` | `required` `string` | Your JWT. Can alternatively be passed as `Authorization: Bearer <token>`. |
| `AUTH_KEY` | `optional` `string` | Auth Code value. Required only if "Require Authentication Code" is enabled. The parameter name matches the **Auth Code URL Key** in Auth Codes settings (default: `AUTH_KEY`). |

## Request

```json
{
  "JWT": "YOUR_JWT_HERE"
}
```

With optional Auth Code:

```json
{
  "JWT": "YOUR_JWT_HERE",
  "AUTH_KEY": "MySecretAuthCode"
}
```

## Responses

### 200

```json
{
  "success": true,
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
}
```

### 400

Bad request - the `JWT` field is missing from the request body.

```json
{
  "success": false,
  "data": {
    "message": "JWT is missing.",
    "errorCode": 42
  }
}
```

### 401

Unauthorized - JWT is structurally invalid, has a bad signature, or the auth code is wrong.

```json
{
  "success": false,
  "data": {
    "message": "JWT signature verification failed.",
    "errorCode": 11
  }
}
```

### 403

Forbidden - token revocation is disabled in plugin settings.

```json
{
  "success": false,
  "data": {
    "message": "Revoke token is not enabled.",
    "errorCode": 83
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
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth/revoke \
  -H "Content-type: application/json" \
  -d '{"JWT":"YOUR_JWT"}'
```

### PHP

```php
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->revokeToken('Your JWT here', 'AUTH CODE');
```

### JavaScript

```js
fetch('https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/auth/revoke', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ JWT: 'YOUR_JWT_HERE' })
}).then(r => r.json()).then(console.log);
```

## Error responses

| Code | Meaning |
| :--: | ------- |
| `42` | JWT is missing from the request. |
| `83` | The revoke-token feature is disabled in plugin settings. |

JWT decoding errors (`1`-`22`) may also appear when the supplied token cannot be parsed or its signature is invalid.

---

## Settings

Configure under **Settings → Simple JWT Login → Revoke Token**.

### Allow Revoke Token Endpoint

![Allow Revoke Token Endpoint](/assets/images/screenshots/revoke-token/allow-revoke-token-endpoint.png)

Enable or disable the revoke token endpoint. When disabled, all POST requests to `/auth/revoke` return a 403 error. When enabled, clients can invalidate a JWT for all future requests.

### Require Authentication Code

![Require Authentication Code](/assets/images/screenshots/revoke-token/require-authentication-code.png)

When enabled, an additional Auth Code must be provided alongside the JWT to use the revoke endpoint. The parameter name is the **Auth Code URL Key** from Auth Codes settings (default: `AUTH_KEY`). Configure the codes themselves in the **Auth Codes** tab.
