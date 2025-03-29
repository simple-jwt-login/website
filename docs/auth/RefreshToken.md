---
slug: /refresh-token/
title: Refresh token
author: Nicu Micle
author_url: https://github.com/nicumicle
---

You can use this endpoint in order to refresh an expired token.

**METHOD** : `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/refresh`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/refresh&JWT={{YOUR_JWT}}`

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
```
 {
     "success": true,
     "data": {
         "jwt": "NEW_GENERATED_JWT_HERE"
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
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth/refresh \
-d '{"JWT":"YOUR_EXPIRED_JWT"}'
```

### PHP

```php
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->refreshToken('your JWT here', 'AUTH CODE');
```


## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-7.png?raw=true)

## Features

### Refresh time to live

You can specify the length of time (in minutes) that the token can be refreshed within.

For example, the user can refresh their token within a 2-week window of the original token being created until they must re-authenticate.

Defaults value is set to 2 weeks. 