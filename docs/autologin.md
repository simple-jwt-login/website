# Autologin

The Autologin endpoint lets you log a user into WordPress by passing a valid JWT — no username or password form needed. This is ideal for:

* **Magic-link emails** — generate a signed link and email it to the user
* **SSO flows** — redirect users from an external system directly into WordPress
* **Mobile apps** — open a webview session without re-prompting for credentials
* **Cross-domain redirects** — seamlessly land users on a specific page after authentication

The plugin validates the JWT, identifies the WordPress user from the token payload, creates the authenticated session, and redirects the user to the configured destination.

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD**: `GET`

**ENDPOINT**: `/simple-jwt-login/v1/autologin`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/autologin&JWT={{JWT}}&AUTH_KEY={{AUTH_KEY_VALUE}}`

| Parameter   | Type                | Description                                                                                         |
| ----------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| JWT         | `required` `string` | Your JWT                                                                                            |
| AUTH\_CODE  | `optional` `string` | Auth Code from the "Auth codes" section. Required only if "Autologin require Auth code" is enabled. |
| redirectURL | `optional` `string` | If provided, you will be redirected to this URL after successfully logged in.                       |

Parameters can be sent as query params.

## Request[​](#request "Direct link to Request")

```
https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/autologin&JWT={{JWT}}&AUTH_KEY={{AUTH_KEY_VALUE}}
```

## Responses[​](#responses "Direct link to Responses")

### 200[​](#200 "Direct link to 200")

You will be redirected to the specified URL in the plugin settings

### 400[​](#400 "Direct link to 400")

```
{
  "success": false,
  "error" : "Error message"
}
```

## Examples[​](#examples "Direct link to Examples")

### SHELL[​](#shell "Direct link to SHELL")

```
curl 'https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=mysecretjwt&AUTH_KEY=mysecretauthcode'
```

### PHP[​](#php "Direct link to PHP")

Using the simple-jwt-login PHP Client:

```
$simpleJWT = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login-v1'
);
$url = $simpleJWT->login('Your JWT');
header('Location: ' . $url);
```

### JavaScript[​](#javascript "Direct link to JavaScript")

```
var JWT='myJWT';
var AUTH_CODE='MY_SECRET_AUTH_CODE';

window.location.href="https://simplejwt-login.com?rest_route=/simple-jwt-login/v1/autologin?JWT="+JWT+'&AUTH_CODE='+AUTH_CODE;
```

## Screenshot[​](#screenshot "Direct link to Screenshot")

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-3.png?raw=true)

## Features[​](#features "Direct link to Features")

### How to send the JWT[​](#how-to-send-the-jwt "Direct link to How to send the JWT")

The JWT can be delivered in any of the following ways:

* **URL parameter** — append `&JWT=<token>` to the autologin URL
* **Authorization Header** — `Authorization: Bearer <token>`
* **Cookie** — set a cookie containing the token
* **Session** — pass the token via the PHP session

If the JWT is present in more than one location, the last value encountered takes precedence.

**Supported decryption algorithms**: `HS256`, `HS384`, `HS512`, `RS256`, `RS384`, `RS512`

### Redirect after login[​](#redirect-after-login "Direct link to Redirect after login")

Once the user is authenticated, the plugin can redirect them to:

* **Dashboard** — the WordPress admin panel
* **Homepage** — the site's front page
* **Custom URL** — any URL you define in the plugin settings (ideal for landing pages or app entry points)

You can also append a `redirectUrl` query parameter to the autologin link to override the configured destination. Enable the **"Allow redirect to a specific URL"** option in the plugin settings to activate this.

### Dynamic redirect variables[​](#dynamic-redirect-variables "Direct link to Dynamic redirect variables")

Use these placeholders in your custom or redirect URLs. The plugin replaces them with the actual values at redirect time.

| Variable              | Description                        |
| --------------------- | ---------------------------------- |
| `{{site_url}}`        | The site URL                       |
| `{{user_id}}`         | The logged-in user's ID            |
| `{{user_email}}`      | The logged-in user's email address |
| `{{user_login}}`      | The logged-in user's username      |
| `{{user_first_name}}` | The user's first name              |
| `{{user_last_name}}`  | The user's last name               |
| `{{user_nicename}}`   | The user's URL-friendly name       |

Example:

```
http://yourdomain.com/profile?uid={{user_id}}&name={{user_login}}
```

### Redirect on failed login[​](#redirect-on-failed-login "Direct link to Redirect on failed login")

Instead of showing a raw JSON error when autologin fails (e.g., expired or invalid token), you can redirect the user to a custom error page. Set the failure redirect URL in the plugin settings.

On that page, use the `simple-jwt-login:request` shortcode to display the specific error message returned by the plugin:

```
[simple-jwt-login:request key="error_message"]
```

The `key` attribute maps to the query parameter appended to the redirect URL. Use multiple shortcodes if you need to display several parameters.

### IP address restrictions[​](#ip-address-restrictions "Direct link to IP address restrictions")

To tighten security, you can restrict autologin to requests originating from specific IP addresses. Requests from any other IP will be rejected.

***

## FAQ[​](#faq "Direct link to FAQ")

### How do I tell the plugin which field in the JWT contains the WordPress user ID or email?[​](#how-do-i-tell-the-plugin-which-field-in-the-jwt-contains-the-wordpress-user-id-or-email "Direct link to How do I tell the plugin which field in the JWT contains the WordPress user ID or email?")

In the plugin settings, set the **"JWT Parameter Key"** field to the name of the JWT payload property that holds the user identifier.

For example, if your JWT payload looks like this:

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "UserID": 123456
}
```

Set **JWT Parameter Key** to `UserID`. The plugin will use that value to look up the WordPress user.
