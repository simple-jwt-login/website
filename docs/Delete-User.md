---
slug: /delete-user/
title: Delete User
sidebar_position: 7
description: Delete WordPress user accounts via a JWT-authenticated REST API call. Useful for self-service account deletion in mobile apps and headless front-ends.
keywords: [WordPress delete user API, REST API delete user WordPress, JWT delete account, headless WordPress user deletion]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

The Delete User endpoint removes a WordPress user account via a REST API call authenticated with a valid JWT. The user to delete is identified from the claims inside the JWT.

Deletion is **disabled by default**. Enable it in **Settings → Simple JWT Login → Delete User**.

:::caution
Enable "Require Authentication Code" unless you have a specific reason not to. Without it, any holder of a valid JWT can delete their account.
:::

## Endpoint

**METHOD**: `DELETE`

**ENDPOINT**: `/simple-jwt-login/v1/users`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/users&JWT={{JWT}}&AUTH_KEY={{AUTH_KEY_VALUE}}`

The JWT can be passed in any of these ways:
- Query parameter or request body: `JWT=your_token`
- Authorization header: `Authorization: Bearer YOUR_JWT`

**PARAMETERS**:

| Parameter | Type | Description |
| :-------: | :--: | ----------- |
| `JWT` | `required` `string` | A valid JWT identifying the user to delete. Can alternatively be passed as `Authorization: Bearer <token>`. |
| `AUTH_KEY` | `optional` `string` | Auth Code value. Required only if "Require Authentication Code" is enabled. The parameter name matches the **Auth Code URL Key** in Auth Codes settings (default: `AUTH_KEY`). |

## Request

```json
{
  "JWT": "YOUR_JWT_HERE",
  "AUTH_KEY": "SUPER_SECRET_AUTH_CODE"
}
```

Or via Authorization header:

```bash
DELETE /wp-json/simple-jwt-login/v1/users
Authorization: Bearer YOUR_JWT_HERE
```

## Responses

### 200

```json
{
  "success": true,
  "message": "User was successfully deleted.",
  "id": 1
}
```

### 400

JWT parameter is missing or cannot be decoded.

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

JWT is invalid, has a bad signature, is expired, is revoked, or the auth code is wrong.

```json
{
  "success": false,
  "data": {
    "message": "JWT has expired.",
    "errorCode": 14
  }
}
```

### 403

User deletion is disabled in plugin settings, or the client IP is not on the allow-list.

```json
{
  "success": false,
  "data": {
    "message": "Delete is not enabled.",
    "errorCode": 39
  }
}
```

### 404

No WordPress user matches the claims in the JWT.

```json
{
  "success": false,
  "data": {
    "message": "User not found.",
    "errorCode": 24
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
curl -X DELETE 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users' \
  -H "Content-type: application/json" \
  -d '{"JWT":"YOUR_JWT","AUTH_KEY":"SECRET_AUTH_CODE"}'
```

Or using the Authorization header:

```bash
curl -X DELETE 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users' \
  -H "Authorization: Bearer YOUR_JWT"
```

### PHP

```php
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$simpleJwtLogin->deleteUser('Your JWT');
```

### JavaScript

```js
fetch('https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT'
  }
}).then(r => r.json()).then(console.log);
```

## Error responses

| Code | Meaning |
| :--: | ------- |
| `24` | No WordPress user matches the JWT claims. |
| `39` | User deletion is not enabled in plugin settings. |
| `40` | Auth Code is missing when it is required. |
| `41` | Client IP is not on the allowed IP list. |
| `42` | JWT is missing from the request. |

JWT decoding errors (`1`-`22`) may also appear when the token cannot be parsed or its signature is invalid.

---

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-5.png?raw=true)

---

## Settings

Configure under **Settings → Simple JWT Login → Delete User**.

### Delete User

Enable or disable the delete endpoint. When disabled, all DELETE requests to `/users` return a 403 error.

### Require Authentication Code

When enabled, every deletion request must include a valid Auth Code alongside the JWT. The parameter name is the **Auth Code URL Key** from the Auth Codes settings (default: `AUTH_KEY`).

### Access Control

Comma-separated list of IP addresses allowed to call the delete endpoint. Leave blank to allow all IPs. Supports wildcards in any octet (e.g. `192.168.*.*`).
