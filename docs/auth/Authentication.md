---
slug: /authentication/
title: Authentication
sidebar_position: 2
author: Nicu Micle
author_url: https://github.com/nicumicle
keywords: [jwt, auth, wordpress jwt]
---

This plugin allows users to generate JWT tokens based from WordPress user email and password.
You will use this endpoint, in order to generate a new JWT.

## Endpoint

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth`

**URL Example**: `http://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth&email={{email}}&password={{password}}`


**PARAMETERS**: 

| Parameter       |   Type           |   Description|
| :-------------: | :--------------: | ------------ |
|   email  | `required` `string` | User email address. It is not required when username is provided.|
| username | `optional` `string` | WordPress username.|
| password | `required` `string` | User plain password. It is not required if password_hash is provided.|
| password_hash | `optional` `string` | User password hash that it is stored in the Database. |
| AUTH_CODE | `optional` `string` | Auth Code from the "Auth codes" section. Required only if "Authentication Requires Auth Code" is enabled.|

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

```shell
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth -d '{"email":"test@simplejwtlogin.com","password":"mySecretPassword"}'
```

### PHP

```php
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient('https://simplejwtlogin.com', '/simple-jwt-login/v1');
$result = $simpleJwtLogin->authenticate('email@simplejwtlogin.com', 'your password', 'AUTH CODE');
```


## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-7.png?raw=true)


## Features

### JWT Payload parameters

You can choose what parameters you want to include in the JWT payload.

You can choose from:
- "iat" : Timestamp when the JWT has been generated
- "exp": Timestamp when JWT will expire. If not added in the payload, JWT will never expire
- "email": User Email address
- "id" : User ID
- "site" : The site where the JWT has been generated 
- "username" : Username


### JWT time to live

You can specify the time (in minutes) that the token will be valid for. 

By default, the token is valid for 60minutes.

### Allow Authentication only from the following IP addresses

This feature will add an extra security layer for the authentication. You can specify a list of IP addresses where you want to allow authentication.

Example:
```
    192.0.1.1, 192.2.2.2
```
You can also use the wildcard for IP `*`. This is helpful when you want for example to allow authentication only from a specific country.
```
    85.*.*.*, 86.*.*.*
```

### Authentication password/passhash is base64 encoded

You can send base64 encoded passwords while this option is checked. If not checked, the plugin will check to match the password provided by you and the one that it is stored in the database.

This feature is helpful, when you have passwords that contains special characters and you want to send the password in the query parameters.

