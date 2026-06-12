---
slug: /change-password/
title: Change password
author: Nicu Micle
author_url: https://github.com/nicumicle
---

This endpoint completes the password reset flow by applying a new password. The user must supply the reset code they received by email (from the [Reset Password](../reset_password/Reset-Password.md) step), along with their email address and the desired new password.

Alternatively, if **"Allow Reset password with JWT"** is enabled in the plugin settings, a valid JWT can be used instead of a reset code.

**METHOD** : `PUT`

**ENDPOINT** : `/simple-jwt-login/v1/users/reset_password`

**URL Example** : `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/users/reset_password&email={{email}}&code={{code}}&new_password={{new_password}}&AUTH_KEY={{AUTH_KEY_VALUE}}`

**PARAMETERS**:

| Parameter       |   Type           |   Description|
| :-------------: | :--------------: | ------------ |
| email | `required` `string` |  The email address that wants to reset the password. |
| code  | `required` `string` |  The reset password code. |
| new_password |  `required` `string` |  The new user password. |
| AUTH_KEY | `optional` `string` | Required only when option "Reset password requires AUTH CODE". |
| JWT | `optional` `string` | To reset the password with a JWT, enable "Allow Reset password with JWT" in the plugin settings. If a valid JWT is provided, the `code` parameter is no longer required. |

## Request

```json
{
  "email" : "test@simplejwtlogin.com",
  "code": "MY_CODE",
  "new_password": "YOUR_SECRET_PASSWORD",
  "AUTH_KEY" : "MY_SECRET_AUTH_KEY"
}
```

## Responses

### 200

```json
{
  "success": true,
  "message": "User password has been changed."
}
```

### 400

Bad request - `email`, `code`, or `new_password` is missing.

```json
{
  "success": false,
  "data": {
    "message": "New password is required.",
    "errorCode": 61
  }
}
```

### 401

Unauthorized - the JWT is invalid or expired, the JWT was issued by a reset-password flow and cannot be reused, or the auth code is wrong.

```json
{
  "success": false,
  "data": {
    "message": "This JWT cannot be used to change the password.",
    "errorCode": 93
  }
}
```

### 403

Forbidden - password reset is disabled in plugin settings.

```json
{
  "success": false,
  "data": {
    "message": "Reset password is not allowed.",
    "errorCode": 56
  }
}
```

### 404

No WordPress user with the provided email address was found.

```json
{
  "success": false,
  "data": {
    "message": "User not found.",
    "errorCode": 64
  }
}
```

### 422

Unprocessable entity - the one-time reset code is invalid or expired.

```json
{
  "success": false,
  "data": {
    "message": "Invalid reset password code.",
    "errorCode": 62
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
curl -X PUT https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users/reset_password \
  -H "Content-type: application/json" \
  -d '{"email":"test@simplejwtlogin.com", "code": "123", "new_password": "test"}'
```

### PHP

```php
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->changePassword('email@simplejwtlogin.com', 'new password', 'code', null, 'AUTH CODE');
```

### JavaScript

```js
var data = JSON.stringify({
    "email":"test@simplejwtlogin.com",
    "code": "123",
    "new_password": "test"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
    }
});

xhr.open("PUT", "https://simplejwtlogin.com" + "/simple-jwt-login/v1/users/reset_password");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
```

## Error responses

All error responses follow the standard envelope:

```json
{
  "success": false,
  "data": {
    "message": "Human-readable error description",
    "errorCode": 56
  }
}
```

Common error codes:

| Code | Meaning |
| :--: | ------- |
| `56` | Password reset is not enabled in plugin settings. |
| `60` | The reset code is missing from the request. |
| `61` | The new password is missing from the request. |
| `62` | The reset code is invalid or does not match the email address. |
| `63` | Email address is missing from the request. |
| `64` | No WordPress user found with the provided email address. |
| `93` | The provided JWT cannot be used to change the password. |

JWT decoding errors (`1`-`22`) may also appear when a JWT is supplied and cannot be parsed or its signature is invalid.

---

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-6.png?raw=true)



