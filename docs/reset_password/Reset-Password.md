---
slug: /reset-password/
title: Reset password
author: Nicu Micle
author_url: https://github.com/nicumicle
---

This endpoint initiates the password reset flow for an existing WordPress user. Depending on the plugin configuration, it can silently save a reset code to the database, send the standard WordPress reset email, or deliver a fully customized email template.

**METHOD** : `POST`

**ENDPOINT** : `/simple-jwt-login/v1/users/reset_password`

**URL Example** : `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/users/reset_password&email={{email}}&AUTH_KEY={{AUTH_KEY_VALUE}}`

**PARAMETERS**:

| Parameter       |   Type           |   Description|
| :-------------: | :--------------: | ------------ |
| `email` | `required` `string` | The email address for which the password reset is requested. |
| `AUTH_KEY` | `optional` `string` | Auth Code value. Required only if "Require Authentication Code" is enabled. The parameter name matches the **Auth Code URL Key** in Auth Codes settings (default: `AUTH_KEY`). |


## Request

```json
{
  "email": "test@simplejwtlogin.com"
}
```

With optional Auth Code:

```json
{
  "email": "test@simplejwtlogin.com",
  "AUTH_KEY": "MY_SECRET_AUTH_KEY"
}
```

## Responses

### 200

```json
{
  "success": true,
  "message": "Reset password email has been sent."
}
```

### 400

Bad request - the `email` field is missing.

```json
{
  "success": false,
  "data": {
    "message": "Email is required.",
    "errorCode": 59
  }
}
```

### 401

Unauthorized - the provided auth code is invalid or missing when required.

```json
{
  "success": false,
  "data": {
    "message": "Invalid auth code.",
    "errorCode": 58
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

### 500

Internal server error (e.g. email sending failure).

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
curl -X POST https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users/reset_password \
  -H "Content-type: application/json" \
  -d '{"email":"test@simplejwtlogin.com"}'
```

### PHP

```php
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->resetPassword('email@simplejwtlogin.com', 'AUTH CODE');
```

### JavaScript

```js
fetch('https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users/reset_password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@simplejwtlogin.com' })
}).then(r => r.json()).then(console.log);
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
| `58` | Invalid Auth Code provided. |
| `59` | Email address is missing from the request. |
| `64` | No WordPress user found with the provided email address. |
| `65` | Invalid flow type configured in plugin settings. |
| `66` | The `{{CODE}}` variable is missing from the custom email template. |

---

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-6.png?raw=true)

---

## Settings

Configure under **Settings → Simple JWT Login → Reset Password**.

### Password Reset

Enable or disable the password reset feature. When disabled, both the Step 1 (send reset code) and Step 2 (change password) endpoints return a 403 error.

### Require Authentication Code

When enabled, an additional Auth Code must be included in password reset requests. The parameter name is the **Auth Code URL Key** from Auth Codes settings (default: `AUTH_KEY`). Configure the codes themselves in the **Auth Codes** tab.

### Reset Flow

Choose how the reset code is delivered to the user after a successful Step 1 request:

| Option | Behavior |
| :----- | :------- |
| **Save code in database only** | No email is sent. The reset code is saved to the database. Retrieve it programmatically or build your own delivery mechanism. |
| **Send default WordPress reset email** | Uses the standard WordPress password reset email template. |
| **Send custom email** | Sends a customizable email with your own subject and body. Subject and body are required when this option is selected. |

When **Send custom email** is selected, you can compose the subject and body and choose between **Plain text** or **HTML** format.

### Step 2 - Set New Password

The PUT endpoint (`/users/reset_password`) accepts:

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `email` | required | The email address of the account being reset. |
| `code` | required* | The reset code received by email. Not required when "Allow JWT-based password reset" is enabled and a valid JWT is provided. |
| `new_password` | required | The new password to set for the account. |
| `AUTH_KEY` | optional | Auth Code value (if Require Authentication Code is enabled). |
| `JWT` | optional | Valid JWT to identify the user. Required only when using the JWT-based reset flow. |

#### Allow JWT-based password reset (skip reset code)

When enabled, the `code` parameter is not required. The plugin identifies the user directly from the JWT payload. The JWT must be valid and not expired.

#### Send WordPress default password changed notification

When enabled, WordPress sends its default password changed notification email to the site admin after the password is successfully updated.

---

## Features

### Reset password modes

The plugin supports three delivery modes for the reset password flow:

| Mode | Behaviour |
| :--- | :-------- |
| **Silent (code only)** | Generates and saves a reset code to the database without sending any email. Use this when your front-end handles its own email delivery. |
| **Default WordPress email** | Sends the standard WordPress password reset email. |
| **Custom email** | Sends a fully customisable email (plain text or HTML) with your own subject and body. |

### Custom email template

When using the custom email mode you can write your own subject and body. The body supports the following variables, which are replaced with real values at send time:

| Variable | Description |
| :------- | :---------- |
| `{{CODE}}` | **Required.** The reset password code the user must submit to change their password. |
| `{{NAME}}` | User's full name (first + last) |
| `{{USERNAME}}` | WordPress username (user_login) |
| `{{EMAIL}}` | User's email address |
| `{{NICKNAME}}` | User's nickname |
| `{{FIRST_NAME}}` | User's first name |
| `{{LAST_NAME}}` | User's last name |
| `{{SITE}}` | Website URL |
| `{{IP}}` | IP address of the client that triggered the reset |

Email body example: 
```
    Welcome {{LAST_NAME}},
    
    Your reset code for {{SITE}} is {{CODE}}.
    
    This reset email has been generated from: {{IP}}
```

### Hooks:
In order to use a custom email template for reset password, you can use the simple_jwt_login_hook.

```php
add_filter('simple_jwt_login_reset_password_custom_email_template', function($template, $request) {
   return "
        Hello {{FIRST_NAME}},
        Here is your reset password code. 
        
        <b>Your code</b>: {{CODE}}
   ";
}, 10, 2);
```

