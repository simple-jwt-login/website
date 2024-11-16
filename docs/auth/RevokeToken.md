---
slug: /revoke-token/
title: Revoke token
author: Nicu Micle
author_url: https://github.com/nicumicle
---

If you want to make sure a token can not be used anymore, just revoke it. This endpoint should be used on "log out".

**METHOD** : `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/revoke`

**URL Example** : `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/revoke&JWT={{YOUR_JWT}}`

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
```
 {
     "success": true,
     "message": "Token was revoked"
     "data": {
         "jwt": {
            "NEW_GENERATED_JWT_HERE"
          }
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

```shell
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth/revoke -d '{"JWT":"YOUR_JWT"}'
```

### PHP

```php
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient('https://simplejwtlogin.com', '/simple-jwt-login/v1'); 
$result = $simpleJwtLogin->revokeToken('Your JWT here', 'AUTH CODE');
```


## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-7.png?raw=true)
