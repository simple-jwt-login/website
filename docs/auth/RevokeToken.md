---
slug: /revoke-token/
title: Revoke token
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Revoking a token immediately invalidates it — any subsequent request using that token will be rejected. Call this endpoint when a user logs out or when you need to terminate a specific session (e.g., after a password change or suspicious activity).

:::note
Once a token is revoked, it cannot be un-revoked. The user must authenticate again to obtain a new token.
:::

**METHOD** : `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/revoke`

**URL Example** : `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/revoke&JWT={{YOUR_JWT}}`

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
  "message": "Token was revoked"
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


## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-7.png?raw=true)
