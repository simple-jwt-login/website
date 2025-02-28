---
slug: /autologin/
title: Autologin
sidebar_position: 3
author: Nicu Micle
author_url: https://github.com/nicumicle
---

This plugin is customizable and offers you multiple methods to login to your website, based on multiple scenarios.

In order to login, users have to send JWT. The plugin validates the JWT, and if everything is OK, it can extract the WordPress email address or user ID.

## Endpoint

**METHOD**:  `GET`

**ENDPOINT**: `/simple-jwt-login/v1/autologin`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/autologin&JWT={{JWT}}&AUTH_KEY={{AUTH_KEY_VALUE}}`


| Parameter       |   Type           |   Description|
| :-------------: | :--------------: | ------------ |
|   JWT  | `required` `string` | Your JWT |
| AUTH_CODE | `optional` `string` |  Auth Code from the "Auth codes" section. Required only if "Autologin require Auth code" is enabled.|
| redirectURL | `optional` `string`|  If provided, you will be redirected to this URL after successfully logged in. |

Parameters can be sent as query params.

## Request

```
    https://{{yoursite}}a/?rest_route=/simple-jwt-login/v1/autologin&JWT={{JWT}}&AUTH_KEY={{AUTH_KEY_VALUE}}
```

## Responses

### 200

You will be redirected to the specified URL in the plugin settings

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
curl 'https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=mysecretjwt&AUTH_KEY=mysecretauthcode'
```

### PHP

Using the simple-jwt-login PHP Client: 

```php
$simpleJWT = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login-v1'
);
$url = $simpleJWT->login('Your JWT');
header('Location: ' . $url);
```


### JavaScript

```js
var JWT='myJWT';
var AUTH_CODE='MY_SECRET_AUTH_CODE';

window.location.href="https://simplejwt-login.com?rest_route=/simple-jwt-login/v1/autologin?JWT="+JWT+'&AUTH_CODE='+AUTH_CODE;
```

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-3.png?raw=true)


## Features

### JWT request

Here are the methods how you can send the JWT in order to auto-login:
- URL
- Header
- Cookie
- Session

If the JWT is present in multiple places ( like URL and Header), the JWT will be overwritten.

This plugin supports multiple JWT Decryption algorithms, like *HS256*, *HS512*, *HS384*, *RS256*, *RS384*, and *RS512*.

### Redirect
After the user is logged in you can automatically redirect the user to a page like:
- Dashboard
- Homepage
- or any other custom Page ( this is mainly used for redirecting users to a landing page)

You can attach to your redirect a URL parameter `redirectUrl` that will be used for redirect instead of the defined ones.
In order to use this, you have to enable it by checking the option Allow redirect to a specific URL.

### Redirect Variables

Also, redirect after login offers some variables that you can use in the customURL and redirectUrl.

Here are the variables which you can use in your URL:
- `{{site_url}}` : Site URL
- `{{user_id}}` : Logged in user ID
- `{{user_email}}` : Logged in user email
- `{{user_login}}` : Logged in username
- `{{user_first_name}}` : User first name
- `{{user_last_name}}` : User last name
- `{{user_nicename}}` : User nice name

You can generate dynamic URLs with these variables, and, before the redirect, the specific value will be replaced.

Here is an example:

```
http://yourdomain.com?param1={{user_id}}&param2={{user_login}}
```

### Redirect on failed Login

If you don't want to display your users a JSON response, in case the autologin is failing, you can use this feature.
You just need to add a redirect URL in this section, and in case the JWT is invalid, or it is expired, the user will be redirected to this page.

Also, on this page, you can use the `simple-jwt-login:request` shortcode in order to display the error message that the plugin is returning.

Here is an example on how you can use the shortcode:

```html
[simple-jwt-login:request key="error_message"]
```

The `key` parameter from the shortcode represents the QUERY parameter that will be displayed in the page.
If you have multiple parameters in your QUERY params, you can use multiple shortcodes and display the values in your page. 

### Other features

Also, this plugin allows you to limit the auto-login based on the client IP address.

If you are concerned about security, you can limit the auto-login only from specific IP addresses.


---

## FAQ

## How to set up?

Users can specify the exact key of the JWT payload where this information can be found.

For example, if your payload looks like this:
```
 {
  "sub": "1234567890",
  "name": "John Doe",
  "UserID": 123456
}
```
You will have to set the property "JWT Parameter Key" to `UserID`.
