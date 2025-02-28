---
slug: /register-user/
title: Register User
sidebar_position: 4
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Description

This plugin also allows you to create WordPress users.

This option is disabled by default, but you can enable it at any time.

In order to create users, you just have to make a POST request to the route URL, and send an email and a password as parameter and the new user will be created.

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
  "comment_shortcuts": "falsec",
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
curl -X POST 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users'  -d '{"email":"myemail@simplejwtlogin.com", "password":"test"}'
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

### New types of users

You can select the type for the new users:
- editor
- author
- contributor
- subscriber
- any custom role that you have set up in your WordPress

Also, you can set a specific user role on Auth Codes, and when that `AUTH_CODE` is used, the user will be created with that specific user role.

### Limit user registration

Also, you can limit the user creating only for specific IP addresses or specific email domains.

### Random password generator

Another cool option is “Generate a random password when a new user is created”.
If this option is selected, the password is no more required when a new user is created, instead, a random password will be generated.

Also, you can specify the length of the random password. The minimum length is `6` characters, and the maximum is `255`.

### Force login flow after register

Another option that you have for registered users is “Initialize force login after register”.
When the user registration is completed, the user will continue on the flow configured on the login configuration.

If auto-login is disabled, this feature will not work and the registered user will go on a normal flow and return a JSON response.


### Custom user meta

If you want to add custom user_meta on user creation, just add the parameter user_meta with a JSON.
This will create user_meta for the new user.

Example:

```
user_meta={“meta_key”:”meta_value”,”meta_key2″:”meta_value”}
```

---

## FAQ

### How we can set up?
In order to set up, please follow the guidelines.





