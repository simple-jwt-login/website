# Autologin

The Autologin endpoint lets you log a user into WordPress by passing a valid JWT - no username or password form needed. This is ideal for:

* **Magic-link emails** - generate a signed link and email it to the user
* **SSO flows** - redirect users from an external system directly into WordPress
* **Mobile apps** - open a webview session without re-prompting for credentials
* **Cross-domain redirects** - seamlessly land users on a specific page after authentication

The plugin validates the JWT, identifies the WordPress user from the token payload, creates the authenticated session, and redirects the user to the configured destination.

API Reference

Explore and test this endpoint using the [interactive API reference →](/api/v4/autologin.md)

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD**: `GET`

**ENDPOINT**: `/simple-jwt-login/v1/autologin`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/autologin&JWT={{JWT}}&AUTH_KEY={{AUTH_KEY_VALUE}}`

| Parameter     | Type                | Description                                                                                                                                                                    |
| ------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `JWT`         | `required` `string` | Your JWT. Can alternatively be passed as `Authorization: Bearer <token>`.                                                                                                      |
| `AUTH_KEY`    | `optional` `string` | Auth Code value. Required only if "Require Authentication Code" is enabled. The parameter name matches the **Auth Code URL Key** in Auth Codes settings (default: `AUTH_KEY`). |
| `redirectUrl` | `optional` `string` | If provided and "Honor the redirectUrl parameter" is enabled in settings, the user is redirected here after a successful login instead of the configured destination.          |

Parameters can be sent as query params.

## Request[​](#request "Direct link to Request")

```
https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/autologin&JWT={{JWT}}&AUTH_KEY={{AUTH_KEY_VALUE}}
```

Or via Authorization header:

```
GET /wp-json/simple-jwt-login/v1/autologin
Authorization: Bearer YOUR_JWT_HERE
```

## Responses[​](#responses "Direct link to Responses")

### 200[​](#200 "Direct link to 200")

The browser is redirected (HTTP 302) to the WordPress site or the custom `redirectUrl`. The response body is empty HTML; the redirect is handled via HTTP headers.

### 400[​](#400 "Direct link to 400")

Bad request - unclassified error (e.g. malformed JWT encoding).

```
{
  "success": false,
  "data": {
    "message": "Invalid JWT.",
    "errorCode": 25
  }
}
```

### 401[​](#401 "Direct link to 401")

Unauthorized - JWT is invalid, has a bad signature, is expired, is revoked, or the auth code is wrong.

```
{
  "success": false,
  "data": {
    "message": "JWT has expired.",
    "errorCode": 14
  }
}
```

### 403[​](#403 "Direct link to 403")

Forbidden - auto-login is disabled in plugin settings, or the client IP is not on the allow-list.

```
{
  "success": false,
  "data": {
    "message": "Auto-login is not enabled.",
    "errorCode": 26
  }
}
```

### 404[​](#404 "Direct link to 404")

The WordPress user identified by the JWT payload could not be found.

```
{
  "success": false,
  "data": {
    "message": "User not found.",
    "errorCode": 24
  }
}
```

### 500[​](#500 "Direct link to 500")

Internal server error.

```
{
  "success": false,
  "data": {
    "message": "An unexpected error occurred.",
    "errorCode": 22
  }
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
    '/simple-jwt-login/v1'
);
$url = $simpleJWT->login('Your JWT');
header('Location: ' . $url);
```

### JavaScript[​](#javascript "Direct link to JavaScript")

```
var JWT = 'myJWT';
var AUTH_KEY = 'MY_SECRET_AUTH_CODE';

window.location.href =
  'https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=' + JWT + '&AUTH_KEY=' + AUTH_KEY;
```

## Error responses[​](#error-responses "Direct link to Error responses")

All error responses follow the standard envelope:

```
{
  "success": false,
  "data": {
    "message": "Human-readable error description",
    "errorCode": 26
  }
}
```

Common error codes:

| Code | Meaning                                                                         |
| ---- | ------------------------------------------------------------------------------- |
| `23` | JWT is missing from the auto-login request.                                     |
| `24` | User not found - no WordPress user matches the JWT claims.                      |
| `26` | Auto-login is not enabled in plugin settings.                                   |
| `27` | Invalid Auth Code provided.                                                     |
| `28` | Client IP is not on the allowed IP list.                                        |
| `29` | The configured JWT payload property (sub-key) could not be found in the token.  |
| `30` | The configured JWT payload property (user key) could not be found in the token. |
| `68` | The JWT issuer (`iss`) is not on the allowed list.                              |

JWT decoding errors (`1`-`22`) may also appear when the supplied token cannot be parsed or its signature is invalid.

***

## Settings[​](#settings "Direct link to Settings")

Configure under **Settings → Simple JWT Login → Autologin**.

### Auto-Login[​](#auto-login "Direct link to Auto-Login")

![Auto-Login settings](/assets/images/auto-login-c5a9c5ce922a61a2816b14e54923c9b5.png)

Enable or disable the autologin endpoint. When disabled, all GET requests to `/autologin` return a 403 error. When enabled, users can log in by passing a valid JWT via URL parameter or `Authorization: Bearer` header.

### Require Authentication Code[​](#require-authentication-code "Direct link to Require Authentication Code")

![Require Authentication Code](data:image/png;base64,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)

When enabled, an additional Auth Code must be provided alongside the JWT to allow login. The parameter name is the **Auth Code URL Key** from Auth Codes settings (default: `AUTH_KEY`). Configure the codes themselves in the **Auth Codes** tab.

### Redirect Behavior[​](#redirect-behavior "Direct link to Redirect Behavior")

![Redirect Behavior settings](/assets/images/redirect-behavior-81997edf080673a63e25cbb110384414.png)

Controls where users are sent after login succeeds or fails.

**After successful login, redirect to:**

| Option      | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| Dashboard   | Redirects to the WordPress admin panel (`/wp-admin/`).                |
| Homepage    | Redirects to the site's front page.                                   |
| No redirect | No HTTP redirect is performed; the response is returned directly.     |
| Custom URL  | Redirects to the URL you specify in the text field below the options. |

**On login failure, redirect to:**

Enter a URL to redirect the user when login fails (e.g. expired token, invalid auth code). Leave blank to return an error JSON response without redirecting.

On the failure redirect page you can display the error message returned by the plugin using the `simple-jwt-login:request` shortcode:

```
[simple-jwt-login:request key="error_message"]
```

### Advanced Options[​](#advanced-options "Direct link to Advanced Options")

![Advanced Options](/assets/images/advanced-options-1020cee187c277b23d967a0efc3461e3.png)

#### Pass login request parameters to the redirect URL[​](#pass-login-request-parameters-to-the-redirect-url "Direct link to Pass login request parameters to the redirect URL")

When enabled, the original JWT and any other login request parameters are appended to the redirect URL as query string arguments.

#### Strip these parameters from the redirect URL[​](#strip-these-parameters-from-the-redirect-url "Direct link to Strip these parameters from the redirect URL")

Comma-separated list of query parameters to remove after redirect (e.g. `jwt, auth_code`). Useful for cleaning sensitive values out of the browser address bar. Leave blank to keep all parameters.

#### Honor the `redirectUrl` query parameter as a redirect override[​](#honor-the-redirecturl-query-parameter-as-a-redirect-override "Direct link to honor-the-redirecturl-query-parameter-as-a-redirect-override")

When enabled, including `redirectUrl` in the autologin request overrides the configured redirect destination. This allows per-request redirect targets, useful for magic-link emails that need to land users on a specific page.

**Available URL template variables:**

Use these placeholders in your custom redirect URL or in the `redirectUrl` parameter. They are replaced with actual values at redirect time.

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
https://yourdomain.com/profile?uid={{user_id}}&site={{site_url}}
```

### Access Control[​](#access-control "Direct link to Access Control")

![Access Control settings](data:image/png;base64,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)

Restrict autologin to requests from specific sources. Leave fields blank to allow all.

#### Allowed IP Addresses[​](#allowed-ip-addresses "Direct link to Allowed IP Addresses")

Comma-separated list of IP addresses allowed to use the autologin endpoint. Leave blank to allow all IPs.

#### Allowed JWT Issuers (iss)[​](#allowed-jwt-issuers-iss "Direct link to Allowed JWT Issuers (iss)")

Comma-separated list of accepted `iss` (issuer) claim values. When set, a JWT whose `iss` does not match any value in this list is rejected with error code `68`. Leave blank to accept any issuer.

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
