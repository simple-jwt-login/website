---
slug: /register-user/
title: Register User
sidebar_position: 4
description: Register new WordPress users programmatically via a REST API endpoint using Simple JWT Login. Supports role assignment, auth codes, and IP restrictions.
keywords: [WordPress register user API, REST API create user WordPress, WordPress user registration endpoint, JWT register user, headless WordPress registration]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

The Register User endpoint lets you create new WordPress users programmatically via the REST API. Useful for headless registration forms, mobile app sign-ups, or any external system that needs to provision WordPress accounts without going through the standard WordPress UI.

Registration is **disabled by default**. Enable it in **Settings → Simple JWT Login → Register User**.

## Endpoint

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/users`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/users&email=NEW_USER_EMAIL&password=NEW_USER_PASSWORD`

**PARAMETERS**:

| Parameter | Type | Description |
| :-------: | :--: | ----------- |
| `email` | `required` `string` | The user email address. |
| `password` | `required*` `string` | The plain-text user password. Not required when **Generate a random password** is enabled in settings. |
| `AUTH_KEY` | `optional` `string` | Auth Code value. Required only if "Require Authentication Code" is enabled. The parameter name matches the **Auth Code URL Key** in Auth Codes settings (default: `AUTH_KEY`). |
| `user_login` | `optional` `string` | The user's login username. |
| `user_nicename` | `optional` `string` | The URL-friendly username. |
| `user_url` | `optional` `string` | The user URL. |
| `display_name` | `optional` `string` | The user's display name. Default is the username. |
| `nickname` | `optional` `string` | The user's nickname. Default is the username. |
| `first_name` | `optional` `string` | The user's first name. |
| `last_name` | `optional` `string` | The user's last name. |
| `description` | `optional` `string` | The user's biographical description. |
| `rich_editing` | `optional` `string` | Whether to enable the rich editor. Accepts `'true'` or `'false'` as a string. Default `'true'`. |
| `syntax_highlighting` | `optional` `string` | Whether to enable the rich code editor. Accepts `'true'` or `'false'` as a string. Default `'true'`. |
| `comment_shortcuts` | `optional` `string` | Whether to enable comment moderation keyboard shortcuts. Default `'false'`. |
| `admin_color` | `optional` `string` | Admin color scheme. Default `'fresh'`. |
| `use_ssl` | `optional` `boolean` | Whether the user always accesses the admin over HTTPS. Default `false`. |
| `user_registered` | `optional` `string` | Date the user registered. Format: `Y-m-d H:i:s`. |
| `user_activation_key` | `optional` `string` | Password reset key. Default empty. |
| `spam` | `optional` `boolean` | Multisite only. Whether the user is marked as spam. Default `false`. |
| `show_admin_bar_front` | `optional` `string` | Whether to show the Admin Bar on the front end. Accepts `'true'` or `'false'` as a string. Default `'true'`. |
| `locale` | `optional` `string` | User locale. Default empty. |
| `user_meta` | `optional` `string` | Custom user meta as a JSON string. Only keys listed in **Allowed User Meta Keys** (in plugin settings) are saved. Example: `{"plan":"premium","source":"app"}` |

## Request

Minimal registration:

```json
{
  "email": "test@simplejwtlogin.com",
  "password": "SomeSuperSecretPassword"
}
```

Full registration with optional fields:

```json
{
  "email": "test@simplejwtlogin.com",
  "password": "SomeSuperSecretPassword",
  "user_login": "myuser",
  "first_name": "John",
  "last_name": "Doe",
  "user_meta": "{\"plan\":\"premium\",\"referral_source\":\"landing_page\"}"
}
```

## Responses

### 200

```json
{
  "success": true,
  "id": 1,
  "message": "User was successfully created.",
  "user": {
    "ID": 1,
    "user_login": "myuser",
    "user_nicename": "myuser",
    "user_email": "myuser@simplejwtlogin.com",
    "user_url": "https://simplejwtlogin.com/myuser",
    "user_registered": "2021-01-01 23:31:50",
    "user_activation_key": "",
    "user_status": "0",
    "display_name": "myuser",
    "user_level": 0
  },
  "roles": [
    "subscriber"
  ],
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

`jwt` is only included when **Return a JWT in the registration response** is enabled in plugin settings.

### 400

Required parameters are missing.

```json
{
  "success": false,
  "data": {
    "message": "The email address or password is missing.",
    "errorCode": 35
  }
}
```

### 401

Auth code is invalid or missing when required.

```json
{
  "success": false,
  "data": {
    "message": "Invalid auth code.",
    "errorCode": 32
  }
}
```

### 403

Registration is disabled, or the client IP is not on the allow-list.

```json
{
  "success": false,
  "data": {
    "message": "Register is not allowed.",
    "errorCode": 31
  }
}
```

### 409

A user with this email already exists.

```json
{
  "success": false,
  "data": {
    "message": "User already exists.",
    "errorCode": 38
  }
}
```

### 422

Email format is invalid or the email domain is not on the allow-list.

```json
{
  "success": false,
  "data": {
    "message": "The email address is invalid.",
    "errorCode": 36
  }
}
```

### 500

`wp_insert_user()` failed or an unexpected error occurred.

```json
{
  "success": false,
  "data": {
    "message": "User could not be created.",
    "errorCode": 52
  }
}
```

## Examples

### SHELL

```bash
curl -X POST 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users' \
  -H "Content-type: application/json" \
  -d '{"email":"myemail@simplejwtlogin.com","password":"test"}'
```

### PHP

```php
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->registerUser('email@simplejwtlogin.com', 'password', 'AUTH CODE');
```

### JavaScript

```js
fetch('https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'email@simplejwtlogin.com',
    password: 'my-secret-password',
    AUTH_KEY: 'my-auth-code'
  })
}).then(r => r.json()).then(console.log);
```

## Error responses

| Code | Meaning |
| :--: | ------- |
| `31` | Registration is not enabled in plugin settings. |
| `32` | Invalid Auth Code. |
| `33` | Client IP is not on the allowed IP list. |
| `35` | Email or password is missing from the request. |
| `36` | Email address format is invalid. |
| `37` | Email domain is not on the allow-list. |
| `38` | A user with this email already exists. |
| `52` | User could not be created (`wp_insert_user` returned an error). |

---

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-4.png?raw=true)

---

## Settings

Configure under **Settings → Simple JWT Login → Register User**.

### User Registration

Enable or disable the registration endpoint. When disabled, all POST requests to `/users` return a 403 error.

### Require Authentication Code

When enabled, every registration request must include a valid Auth Code. Without it, anyone can create an account on your site.

:::warning
Leaving registration open without an Auth Code is a security risk on public-facing sites.
:::

### New User Settings

#### Default User Role

The WordPress role assigned to newly registered users (e.g. `subscriber`, `contributor`, `author`, `editor`, `administrator`, or any custom role).

You can also assign a **different role per Auth Code** - when a user registers using a specific code, they receive the role tied to that code. Configure this in the Auth Codes settings.

#### Generate a random password

When enabled, a cryptographically secure random password is generated automatically and the `password` field is no longer required in the request. The password length is configurable (minimum 6, maximum 255 characters, default 12).

### Post-Registration Options

#### Auto-login after registration

When enabled, the new user is automatically logged in immediately after their account is created, following the redirect flow configured in the **Login** settings. Requires the Auto-Login feature to also be enabled.

#### Return a JWT in the registration response

When enabled, the API response includes a signed JWT for the new user. The JWT payload follows the configuration from the **Authentication** settings. If Authentication is not configured, the payload includes `email`, `id`, and `username` by default.

#### Send WordPress welcome email

When enabled, WordPress sends its default new-user notification emails (to the new user and to the site admin) after a successful registration via this endpoint.

### Access Control

#### Allowed IP Addresses

Comma-separated list of IP addresses allowed to call the registration endpoint. Leave blank to allow all IPs. Supports wildcards in any octet (e.g. `85.*.*.*`).

#### Allowed Email Domains

Comma-separated list of email domains accepted during registration (e.g. `gmail.com, company.org`). Leave blank to accept all domains.

### User Data

#### Allowed User Meta Keys

Comma-separated list of `user_meta` keys that may be set via the `user_meta` request parameter. Keys not listed here are silently ignored, even if sent in the request. Leave blank to disallow all custom meta.

Example: `plan, referral_source, subscription_tier`
