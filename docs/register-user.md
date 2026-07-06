# Register User

The Register User endpoint lets you create new WordPress users programmatically via the REST API. Useful for headless registration forms, mobile app sign-ups, or any external system that needs to provision WordPress accounts without going through the standard WordPress UI.

Registration is **disabled by default**. Enable it in **Settings → Simple JWT Login → Register User**.

API Reference

Explore and test this endpoint using the [interactive API reference →](/api/v4/register-a-new-word-press-user.md)

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/users`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/users&email=NEW_USER_EMAIL&password=NEW_USER_PASSWORD`

**PARAMETERS**:

| Parameter              | Type                 | Description                                                                                                                                                                    |
| ---------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `email`                | `required` `string`  | The user email address.                                                                                                                                                        |
| `password`             | `required*` `string` | The plain-text user password. Not required when **Generate a random password** is enabled in settings.                                                                         |
| `AUTH_KEY`             | `optional` `string`  | Auth Code value. Required only if "Require Authentication Code" is enabled. The parameter name matches the **Auth Code URL Key** in Auth Codes settings (default: `AUTH_KEY`). |
| `user_login`           | `optional` `string`  | The user's login username.                                                                                                                                                     |
| `user_nicename`        | `optional` `string`  | The URL-friendly username.                                                                                                                                                     |
| `user_url`             | `optional` `string`  | The user URL.                                                                                                                                                                  |
| `display_name`         | `optional` `string`  | The user's display name. Default is the username.                                                                                                                              |
| `nickname`             | `optional` `string`  | The user's nickname. Default is the username.                                                                                                                                  |
| `first_name`           | `optional` `string`  | The user's first name.                                                                                                                                                         |
| `last_name`            | `optional` `string`  | The user's last name.                                                                                                                                                          |
| `description`          | `optional` `string`  | The user's biographical description.                                                                                                                                           |
| `rich_editing`         | `optional` `string`  | Whether to enable the rich editor. Accepts `'true'` or `'false'` as a string. Default `'true'`.                                                                                |
| `syntax_highlighting`  | `optional` `string`  | Whether to enable the rich code editor. Accepts `'true'` or `'false'` as a string. Default `'true'`.                                                                           |
| `comment_shortcuts`    | `optional` `string`  | Whether to enable comment moderation keyboard shortcuts. Default `'false'`.                                                                                                    |
| `admin_color`          | `optional` `string`  | Admin color scheme. Default `'fresh'`.                                                                                                                                         |
| `use_ssl`              | `optional` `boolean` | Whether the user always accesses the admin over HTTPS. Default `false`.                                                                                                        |
| `user_registered`      | `optional` `string`  | Date the user registered. Format: `Y-m-d H:i:s`.                                                                                                                               |
| `user_activation_key`  | `optional` `string`  | Password reset key. Default empty.                                                                                                                                             |
| `spam`                 | `optional` `boolean` | Multisite only. Whether the user is marked as spam. Default `false`.                                                                                                           |
| `show_admin_bar_front` | `optional` `string`  | Whether to show the Admin Bar on the front end. Accepts `'true'` or `'false'` as a string. Default `'true'`.                                                                   |
| `locale`               | `optional` `string`  | User locale. Default empty.                                                                                                                                                    |
| `user_meta`            | `optional` `string`  | Custom user meta as a JSON string. Only keys listed in **Allowed User Meta Keys** (in plugin settings) are saved. Example: `{"plan":"premium","source":"app"}`                 |

## Request[​](#request "Direct link to Request")

Minimal registration:

```
{
  "email": "test@simplejwtlogin.com",
  "password": "SomeSuperSecretPassword"
}
```

Full registration with optional fields:

```
{
  "email": "test@simplejwtlogin.com",
  "password": "SomeSuperSecretPassword",
  "user_login": "myuser",
  "first_name": "John",
  "last_name": "Doe",
  "user_meta": "{\"plan\":\"premium\",\"referral_source\":\"landing_page\"}"
}
```

## Responses[​](#responses "Direct link to Responses")

### 200[​](#200 "Direct link to 200")

```
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

### 400[​](#400 "Direct link to 400")

Required parameters are missing.

```
{
  "success": false,
  "data": {
    "message": "The email address or password is missing.",
    "errorCode": 35
  }
}
```

### 401[​](#401 "Direct link to 401")

Auth code is invalid or missing when required.

```
{
  "success": false,
  "data": {
    "message": "Invalid auth code.",
    "errorCode": 32
  }
}
```

### 403[​](#403 "Direct link to 403")

Registration is disabled, or the client IP is not on the allow-list.

```
{
  "success": false,
  "data": {
    "message": "Register is not allowed.",
    "errorCode": 31
  }
}
```

### 409[​](#409 "Direct link to 409")

A user with this email already exists.

```
{
  "success": false,
  "data": {
    "message": "User already exists.",
    "errorCode": 38
  }
}
```

### 422[​](#422 "Direct link to 422")

Email format is invalid or the email domain is not on the allow-list.

```
{
  "success": false,
  "data": {
    "message": "The email address is invalid.",
    "errorCode": 36
  }
}
```

### 500[​](#500 "Direct link to 500")

`wp_insert_user()` failed or an unexpected error occurred.

```
{
  "success": false,
  "data": {
    "message": "User could not be created.",
    "errorCode": 52
  }
}
```

## Examples[​](#examples "Direct link to Examples")

### SHELL[​](#shell "Direct link to SHELL")

```
curl -X POST 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users' \
  -H "Content-type: application/json" \
  -d '{"email":"myemail@simplejwtlogin.com","password":"test"}'
```

### PHP[​](#php "Direct link to PHP")

```
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->registerUser('email@simplejwtlogin.com', 'password', 'AUTH CODE');
```

### JavaScript[​](#javascript "Direct link to JavaScript")

```
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

## Error responses[​](#error-responses "Direct link to Error responses")

| Code | Meaning                                                         |
| ---- | --------------------------------------------------------------- |
| `31` | Registration is not enabled in plugin settings.                 |
| `32` | Invalid Auth Code.                                              |
| `33` | Client IP is not on the allowed IP list.                        |
| `35` | Email or password is missing from the request.                  |
| `36` | Email address format is invalid.                                |
| `37` | Email domain is not on the allow-list.                          |
| `38` | A user with this email already exists.                          |
| `52` | User could not be created (`wp_insert_user` returned an error). |

***

## Settings[​](#settings "Direct link to Settings")

Configure under **Settings → Simple JWT Login → Register User**.

### User Registration[​](#user-registration "Direct link to User Registration")

![User Registration settings](data:image/png;base64,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)

Enable or disable the registration endpoint. When disabled, all POST requests to `/users` return a 403 error.

### Require Authentication Code[​](#require-authentication-code "Direct link to Require Authentication Code")

![Require Authentication Code](data:image/png;base64,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)

When enabled, every registration request must include a valid Auth Code. Without it, anyone can create an account on your site.

warning

Leaving registration open without an Auth Code is a security risk on public-facing sites.

### New User Settings[​](#new-user-settings "Direct link to New User Settings")

![New User Settings](/assets/images/new-user-settings-215c83a3fa8af10f878ff254e3a41a3d.png)

#### Default User Role[​](#default-user-role "Direct link to Default User Role")

The WordPress role assigned to newly registered users (e.g. `subscriber`, `contributor`, `author`, `editor`, `administrator`, or any custom role).

You can also assign a **different role per Auth Code** - when a user registers using a specific code, they receive the role tied to that code. Configure this in the Auth Codes settings.

#### Generate a random password[​](#generate-a-random-password "Direct link to Generate a random password")

When enabled, a cryptographically secure random password is generated automatically and the `password` field is no longer required in the request. The password length is configurable (minimum 6, maximum 255 characters, default 12).

### Post-Registration Options[​](#post-registration-options "Direct link to Post-Registration Options")

![Post-Registration Options](/assets/images/post-registration-options-3ccc7ff96f87500b8f17b57d3299840c.png)

#### Auto-login after registration[​](#auto-login-after-registration "Direct link to Auto-login after registration")

When enabled, the new user is automatically logged in immediately after their account is created, following the redirect flow configured in the **Login** settings. Requires the Auto-Login feature to also be enabled.

#### Return a JWT in the registration response[​](#return-a-jwt-in-the-registration-response "Direct link to Return a JWT in the registration response")

When enabled, the API response includes a signed JWT for the new user. The JWT payload follows the configuration from the **Authentication** settings. If Authentication is not configured, the payload includes `email`, `id`, and `username` by default.

#### Send WordPress welcome email[​](#send-wordpress-welcome-email "Direct link to Send WordPress welcome email")

When enabled, WordPress sends its default new-user notification emails (to the new user and to the site admin) after a successful registration via this endpoint.

### Access Control[​](#access-control "Direct link to Access Control")

![Access Control settings](data:image/png;base64,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)

#### Allowed IP Addresses[​](#allowed-ip-addresses "Direct link to Allowed IP Addresses")

Comma-separated list of IP addresses allowed to call the registration endpoint. Leave blank to allow all IPs. Supports wildcards in any octet (e.g. `85.*.*.*`).

#### Allowed Email Domains[​](#allowed-email-domains "Direct link to Allowed Email Domains")

Comma-separated list of email domains accepted during registration (e.g. `gmail.com, company.org`). Leave blank to accept all domains.

### User Data[​](#user-data "Direct link to User Data")

![User Data settings](/assets/images/user-data-f72eb25ec3254b62b066cdab4331ac07.png)

#### Allowed User Meta Keys[​](#allowed-user-meta-keys "Direct link to Allowed User Meta Keys")

Comma-separated list of `user_meta` keys that may be set via the `user_meta` request parameter. Keys not listed here are silently ignored, even if sent in the request. Leave blank to disallow all custom meta.

Example: `plan, referral_source, subscription_tier`
