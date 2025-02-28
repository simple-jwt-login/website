---
slug: /reset-password/
title: Reset password
author: Nicu Micle
author_url: https://github.com/nicumicle
---

This endpoint will trigger the reset password, and the user will be informed about this change.

**METHOD** : `POST`

**ENDPOINT** : `/simple-jwt-login/v1/users/reset_password`

**URL Example** : `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/users/reset_password&email={{email}}&code={{code}}&&new_password={{new_password}}&AUTH_KEY={{AUTH_KEY_VALUE}}`

**PARAMETERS**:

| Parameter       |   Type           |   Description|
| :-------------: | :--------------: | ------------ |
| email | `required` `string` |  The email that requests the password change |
| AUTH_CODE | `optional` `string`|  Required only when option "Reset password requires AUTH CODE". |


## Request

```json
{
  "email" : "my_email",
  "AUTH_CODE" : "MY_SECRET_AUTH_KEY"
}
```

## Response

### 200

```json
{
  "success": true,
  "message": "Reset password email has been sent."
}
```
### 400

```json
{
  "success": false,
  "data": {
    "message": "string",
    "errorCode": 0
  }
}
```

## Examples

### SHELL
```bash
curl -X POST https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users/reset_password -d '{"email":"test@simplejwtlogin.com", "AUTH_CODE": "123"}'
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

xhr.open("POST", "https://simplejwtlogin.com" + "/simple-jwt-login/v1/users/reset_password");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
```

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-6.png?raw=true)



## Features

Send reset password offers 3 possible modes:

- Do not send any email, just save reset code in the database
- Send the default WordPress reset password email
- Send custom email


### Custom email

When you choose custom email template, you can set how the email can be sent:
- plain text
- HTML

Also, you can set a custom email subject and custom email body.

### Send custom email variables:
These variables can be used inside the email body template. They will be replaced when the email will be sent.


| Variable       |Description|
| :-------------: | ------------ |
| `{{CODE}}` | `madatory`  The reset password Code|
| `{{NAME}}` | User first and last name |
| `{{EMAIL}}` | User email address |
| `{{NICKNAME}}` | User nickname |
| `{{FIST_NAME}}` | User first name |
| `{{LAST_NAME}}` | User last name |
| `{{SITE}}` | Website URL |
| `{{IP}}` | Client IP |

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

