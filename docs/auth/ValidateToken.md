---
slug: /validate-token/
title: Validate token
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Use this endpoint to verify whether a JWT is valid. On success, the response includes the corresponding WordPress user's profile, their roles, and the decoded JWT header and payload.

This endpoint is useful for:
- **Server-side token verification** before granting access to resources
- **Debugging** - inspect what user and claims a token resolves to
- **Client-side session checks** - confirm a stored token is still accepted before making other API calls


**METHOD** : `GET` `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/validate`

**URL Example** : `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/validate&JWT={{YOUR_JWT}}`

**PARAMETERS**:

| Parameter       |   Type           |   Description|
| :-------------: | :--------------: | ------------ |
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
    "user": {
      "ID": "1",
      "user_login": "myuser",
      "user_nicename": "myuser",
      "user_email": "myuser@simplejwtlogin.com",
      "user_url": "https://simplejwtlogin.com/myuser",
      "user_registered": "2021-01-01 23:31:50",
      "user_activation_key": "",
      "user_status": "0",
      "display_name": "myuser"
    },
    "roles": [
      "administrator"
    ],
    "jwt": [
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "header": {
          "typ": "JWT",
          "alg": "HS256"
        },
        "payload": {
          "iat": 1516239022,
          "email": "myuser@simplejwtlogin.com",
          "id": 1,
          "site": "https://simplejwtlogin.com",
          "username": "myuser"
        }
      }
    ]
  }
}
```

### 400

Bad request - the `JWT` parameter is missing.

```json
{
  "success": false,
  "data": {
    "message": "JWT is missing.",
    "errorCode": 53
  }
}
```

### 401

Unauthorized - JWT is invalid, has a bad signature, is expired, or has been revoked.

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

Forbidden - token validation is disabled in plugin settings.

```json
{
  "success": false,
  "data": {
    "message": "Validate token is not enabled.",
    "errorCode": 82
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

## Error responses

All error responses follow the standard envelope:

```json
{
  "success": false,
  "data": {
    "message": "Human-readable error description",
    "errorCode": 53
  }
}
```

Common error codes:

| Code | Meaning |
| :--: | ------- |
| `53` | The JWT parameter is missing from the request. |
| `54` | No WordPress user found for the claims in the JWT. |
| `55` | The JWT has been revoked and can no longer be used. |
| `82` | The validate-token feature is disabled in plugin settings. |

JWT decoding errors (`1`-`22`) may also appear when the supplied token cannot be parsed or its signature is invalid.

---

## Examples

### SHELL

```bash
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth/validate \
  -H "Content-type: application/json" \
  -d '{"JWT":"YOUR_JWT"}'
```

### PHP

```php
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->validateToken('your JWT here', 'AUTH CODE');
```

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-7.png?raw=true)

---

## Settings

Configure under **Settings → Simple JWT Login → Validate Token**.

### Allow Validate Token Endpoint

Enable or disable the validate token endpoint. When disabled, all requests to `/auth/validate` return a 403 error. When enabled, clients can verify a JWT and retrieve the associated WordPress user details.

### Require Authentication Code

When enabled, an additional Auth Code must be provided alongside the JWT to use the validate endpoint. The parameter name is the **Auth Code URL Key** from Auth Codes settings (default: `AUTH_KEY`). Configure the codes themselves in the **Auth Codes** tab.
