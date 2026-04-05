---
slug: /register-user/
title: Register User
sidebar_position: 4
description: Register new WordPress users programmatically via a REST API endpoint using Simple JWT Login. Supports role assignment, auth codes, and IP restrictions.
keywords: [WordPress register user API, REST API create user WordPress, WordPress user registration endpoint, JWT register user, headless WordPress registration]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Description

The Register User endpoint lets you create new WordPress users programmatically via the REST API. This is useful for headless registration forms, mobile app sign-ups, or any external system that needs to provision WordPress accounts without going through the standard WordPress UI.

Registration is **disabled by default**. Enable it in the plugin settings before use.

At minimum, a POST request with `email` and `password` is all that's needed. Additional profile fields are optional.

## Endpoint

**METHOD**:  `POST`

**ENDPOINT**: `/simple-jwt-login/v1/users`

**URL Example**: `https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/users&email=NEW_USER_EMAIL&password=NEW_USER_PASSWORD`

**PARAMETERS**:

| Parameter       |   Type           |   Description |
| :-------------: | :--------------: | :------------: |
| email | `required` `string` | The user email address.| 
| password | `required` `string` | The plain-text user password.|
| user_login | `optional` `string`| The user’s login username.| 
| user_nicename | `optional` `string` | The URL-friendly username.|
| user_url | `optional` `string` | The user URL.|
| display_name | `optional` `string` | The user’s display name. Default is the user’s username.|
| nickname | `optional` `string` | The user’s nickname. Default is the user’s username.|
| first_name | `optional` `string` | The user’s first name. For new users, will be used to build the first part of the user’s display name if $display_name is not specified.|
| last_name | `optional` `string` | The user’s last name. For new users, will be used to build the second part of the user’s display name if $display_name is not specified.|
| description | `optional` `string` | The user’s biographical description.|
| rich_editing | `optional` `string` | Whether to enable the rich-editor for the user. Accepts ‘true’ or ‘false’ as a string literal, not boolean. Default ‘true’.|
| syntax_highlighting | `optional` `string` | Whether to enable the rich code editor for the user. Accepts ‘true’ or ‘false’ as a string literal, not boolean. Default ‘true’.|
| comment_shortcuts | `optional` `string` | Whether to enable comment moderation keyboard shortcuts for the user. Accepts ‘true’ or ‘false’ as a string literal, not boolean. Default ‘false’.|
| admin_color | `optional` `string` | Admin color scheme for the user. Default ‘fresh’.|
| use_ssl | `optional` `boolean` | Whether the user should always access the admin over https. Default false.|
| user_registered | `optional` `string` | Date the user registered. Format is `Year-Month-Date Hours:Minutes:Seconds`.|
| user_activation_key | `optional` `string` | Password reset key. Default empty.|
| spam | `optional` `boolean` | Multisite only. Whether the user is marked as spam. Default false.|
| show_admin_bar_front | `optional` `string` | Whether to display the Admin Bar for the user on the site’s front end. Accepts ‘true’ or ‘false’ as a string literal, not boolean. Default ‘true’.|
| locale | `optional` `string` | User’s locale. Default empty.|
| user_meta | `optional` `string` | Add user meta on user registration. It should be a JSON string. Example: `{"meta_key":"meta_value","meta_key2":"meta_value"}`|


## Request

```json
{
  "email": "test@simplejwtlogin.com",
  "password": "string",
  "user_login": "myuser",
  "user_nicename": "myuser",
  "user_url": "https://simplejwtlogin.com",
  "display_name": "myuser",
  "nickname": "myuser",
  "first_name": "myuser",
  "last_name": "myuser",
  "description": "This is a sample description",
  "rich_editing": true,
  "syntax_highlighting": true,
  "comment_shortcuts": "false",
  "admin_color": "fresh",
  "use_ssl": true,
  "user_registered": "2022-01-31 23:15:30",
  "user_activation_key": "string",
  "spam": false,
  "show_admin_bar_front": true,
  "locale": ""
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
    "user_login": "myusser",
    "user_nicename": "My  User",
    "user_email": "myuser@simplejwtlogin.com",
    "user_url": "https://simplejwtlogin.com",
    "user_registered": "2021-01-01 23:31:50",
    "user_activation_key": "test",
    "user_status": "0",
    "display_name": "myuser",
    "user_level": 10
  },
  "roles": [
    "administrator"
  ],
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

### 400

```json
{
  "success": false,
  "data": {
    "message": "Error message string",
    "errorCode": 0
  }
}
```

## Examples

### SHELL

```bash
curl -X POST 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users' \
  -H "Content-type: application/json" \
  -d '{"email":"myemail@simplejwtlogin.com", "password":"test"}'
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
var data = JSON.stringify({
    "email": "email@simplejwtlogin.com",
    "password":"my-secret-passwor",
    "AUTH_CODE":"my-auth-code"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
    }
});

xhr.open("POST", "https://simplejwtlogin.com" + "/simple-jwt-login/v1/users");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
```

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-4.png?raw=true)


## Features

### User roles

You can set the default role assigned to newly registered users (e.g., `subscriber`, `contributor`, `author`, `editor`, or any custom role). You can also assign a different role per **Auth Code** - when a user registers using a specific `AUTH_CODE`, they receive the role tied to that code. This makes it easy to support multiple user types from a single registration endpoint.

### Restrict registration

Limit registrations to:
- **Specific IP addresses** - block registrations from untrusted origins
- **Specific email domains** - e.g., only allow `@yourcompany.com` addresses

### Random password generation

Enable “Generate a random password” to allow registration without a `password` field. The plugin generates a secure random password automatically. Password length is configurable between **6** and **255** characters.

### Auto-login after registration

Enable “Initialize force login after register” to automatically log the new user in immediately after their account is created, following the same redirect flow configured in the Autologin settings.

:::note
This option has no effect if the Autologin feature is disabled. In that case, the endpoint simply returns the new user's data as a JSON response.
:::

### Custom user meta

Pass any number of custom metadata fields during registration by including a `user_meta` JSON parameter. Each key-value pair will be saved as WordPress user meta.

Example:

```json
{
  “email”: “user@example.com”,
  “password”: “secret”,
  “user_meta”: “{\”plan\”:\”premium\”,\”referral_source\”:\”landing_page\”}”
}
```

---

## FAQ

### How do I configure the Register User endpoint?

1. Go to **Settings → Simple JWT Login** in your WordPress admin.
2. Open the **Register Settings** tab.
3. Enable registration and configure the desired role, restrictions, and options.
4. Save your settings, then send a `POST` request to the endpoint.





