---
slug: /authentication/
title: Authentication
sidebar_position: 2
description: Generate, refresh, validate, and revoke JWT tokens via the WordPress REST API using Simple JWT Login. Supports HS256/384/512 and RS256/384/512 algorithms.
keywords: [WordPress JWT authentication, generate JWT token WordPress, JWT REST API WordPress, HS256 WordPress, RS256 WordPress, token-based login WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Use this endpoint to exchange WordPress credentials for a signed JWT. The returned token can then be included in subsequent requests to protected endpoints or used to auto-login users.

You can authenticate using any of the following combinations:
- **email** + **password** — standard credential pair
- **username** + **password** — use the WordPress username instead of email
- **login** + **password** — mirrors the WordPress login page behaviour; accepts either email or username

## Endpoint

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth`

**URL Example**: `http://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth&email={{email}}&password={{password}}`


**PARAMETERS**: 

| Parameter       |   Type           |   Description|
| :-------------: | :--------------: | ------------ |
|   email  | `required` `string` | User email address. It is **required** when the `username` or `login` is missing.|
| username | `optional` `string` | WordPress username. It is **required** when the `email` or `login` is missing. |
| login    | `optional` `string` | WordPress username or email. Simulates the flow from WordPress login page. It is **required** when the `email` or `username` is missing. |
| password | `required` `string` | User plain password. It is required if the `password_hash` is missing.|
| password_hash | `optional` `string` | User password hash that it is stored in the Database. It is required if the `password` is missing. |
| AUTH_CODE | `optional` `string` | Auth Code from the "Auth codes" section. Required only if the "Authentication Requires Auth Code" option is enabled. |

## Request

```json
{
  "email" : "test@simplejwtlogin.com",
  "password": "SomeSuperSecretPassword",
  "AUTH_CODE": "MySecretAuthCode"
}
```

OR

```json
{
  "username": "myuser",
  "password_hash" : "PasswordStoredInTheDB",
  "AUTH_CODE": "MySecretAuthCode"
}
```

OR

```json
{
  "login": "username or email",
  "password" : "SomeSuperSecretPassword",
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
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth \
  -H "Content-type: application/json" \
  -d '{"email":"test@simplejwtlogin.com","password":"mySecretPassword"}'
```

### PHP

```php
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->authenticate('email@simplejwtlogin.com', 'your password', 'AUTH CODE');
```


## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-7.png?raw=true)


## Features

### JWT Payload parameters

You can choose what parameters you want to include in the JWT payload.

You can choose from:
- **iat** : Timestamp when the JWT has been generated
- **exp**: Timestamp when JWT will expire. If not added in the payload, JWT will never expire
- **email**: The user email address
- **id** : The user's ID
- **site** : The site where the JWT has been generated 
- **username** : The user's username


### JWT time to live

You can specify the time (in minutes) that the token will be valid for. 

By default, the token is valid for 60 minutes.

### Allow Authentication only from specific IP addresses

Restrict authentication requests to a whitelist of trusted IP addresses for an extra layer of security. Separate multiple entries with commas.

```
192.0.1.1, 192.2.2.2
```

The wildcard `*` is supported in any octet, which is useful for allowing an entire subnet or IP range (e.g., all addresses from a specific country or hosting provider):

```
85.*.*.*, 86.*.*.*
```

### Base64-encoded passwords

Enable this option when your passwords contain special characters that would otherwise be mangled in query string parameters. When active, the plugin expects the `password` (or `password_hash`) value to be Base64-encoded before sending.

