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


**METHOD** : `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/validate`

**URL Example** : `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/validate&JWT={{YOUR_JWT}}`

**PARAMETERS**:

| Parameter       |   Type           |   Description|
| :-------------: | :--------------: | ------------ |
|   JWT  | `required` `string` | Your JWT |
| AUTH_CODE | `optional` `string` | Auth Code from the "Auth codes" section. Required only if the "Authentication Requires Auth Code" option is enabled.|


## Request

```json
{
  "JWT" : "YOUR_JWT_HERE",
  "AUTH_CODE": "MySecretAuthCode"
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
      "user_login": "myusser",
      "user_nicename": "My  User",
      "user_email": "myuser@simplejwtlogin.com",
      "user_url": "https://simplejwtlogin.com",
      "user_registered": "2021-01-01 23:31:50",
      "user_activation_key": "test",
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
          "iat": 123123,
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

```json
{
  "success": false,
  "error" : "Error message"
}
```

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
