---
slug: /validate-token/
title: Validate token
author: Nicu Micle
author_url: https://github.com/nicumicle
---

You can validate if a token is valid or not, by sending a request to this endpoint.

If you have a valid JWT, details about the available WordPress user will be returned, and some JWT details.


**METHOD** : `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/validate`

**URL Example** : `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/validate&JWT={{YOUR_JWT}}`

**PARAMETERS**:

| Parameter       |   Type           |   Description|
| :-------------: | :--------------: | ------------ |
|   JWT  | `required` `string` | Your JWT |
| AUTH_CODE | `optional` `string` | Auth Code from the "Auth codes" section. Required only if "Authentication Requires Auth Code" is enabled.|


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
