# Authentication

Use this endpoint to exchange WordPress credentials for a signed JWT. The returned token can then be included in subsequent requests to protected endpoints or used to auto-login users.

You can authenticate using any of the following combinations:

* **email** + **password** - standard credential pair
* **username** + **password** - use the WordPress username instead of email
* **login** + **password** - mirrors the WordPress login page behaviour; accepts either email or username

API Reference

Explore and test this endpoint using the [interactive API reference →](/api/v4/get-jwt.md)

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth`

**URL Example**: `http://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth&email={{email}}&password={{password}}`

**PARAMETERS**:

| Parameter       | Type                            | Description                                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email`         | `required*` `string`            | User email address. Required when `username` and `login` are absent.                                                                                                                                                                                                                      |
| `username`      | `required*` `string`            | WordPress username. Required when `email` and `login` are absent.                                                                                                                                                                                                                         |
| `login`         | `required*` `string`            | WordPress username or email. Simulates the WordPress login page flow. Required when `email` and `username` are absent.                                                                                                                                                                    |
| `password`      | `required*` `string`            | User plain-text password. Required when `password_hash` is absent.                                                                                                                                                                                                                        |
| `password_hash` | `optional` `string`             | The user's hashed password as stored in the database. Required when `password` is absent.                                                                                                                                                                                                 |
| `AUTH_KEY`      | `optional` `string`             | Auth Code value. Required only if "Require Authentication Code" is enabled. The parameter name matches the **Auth Code URL Key** configured in Auth Codes settings (default: `AUTH_KEY`).                                                                                                 |
| `payload`       | `optional` `string` \| `object` | Extra claims merged into the JWT payload. Send a JSON-encoded string for form-encoded/query-string requests, or a native JSON object for JSON body requests. [Reserved claims](#custom-payload-claims) are always overridden by the authenticated user's data and cannot be set this way. |

## Request[​](#request "Direct link to Request")

```
{
  "email": "test@simplejwtlogin.com",
  "password": "SomeSuperSecretPassword"
}
```

With username and password hash:

```
{
  "username": "myuser",
  "password_hash": "PasswordStoredInTheDB"
}
```

With login (accepts email or username) and auth code:

```
{
  "login": "username or email",
  "password": "SomeSuperSecretPassword",
  "AUTH_KEY": "MySecretAuthCode"
}
```

With extra payload claims (JSON body - native object):

```
{
  "email": "test@simplejwtlogin.com",
  "password": "SomeSuperSecretPassword",
  "payload": {
    "department": "engineering",
    "region": "eu"
  }
}
```

With extra payload claims (form-encoded/query-string - JSON-encoded string):

```
email=test@simplejwtlogin.com&password=SomeSuperSecretPassword&payload={"department":"engineering","region":"eu"}
```

## Responses[​](#responses "Direct link to Responses")

### 200[​](#200 "Direct link to 200")

```
{
  "success": true,
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refresh_token": "a1b2c3d4e5f678901234567890123456789012345678901234567890123456789012"
  }
}
```

`refresh_token` is only present when the refresh token feature is enabled in plugin settings.

### 400[​](#400 "Direct link to 400")

Bad request - required parameters are missing.

```
{
  "success": false,
  "data": {
    "message": "Email or username is required.",
    "errorCode": 46
  }
}
```

### 401[​](#401 "Direct link to 401")

Unauthorized - credentials are incorrect or the auth code is invalid.

```
{
  "success": false,
  "data": {
    "message": "Wrong user credentials.",
    "errorCode": 48
  }
}
```

### 403[​](#403 "Direct link to 403")

Forbidden - authentication is disabled in plugin settings.

```
{
  "success": false,
  "data": {
    "message": "Authentication is not enabled.",
    "errorCode": 45
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
    "errorCode": 16
  }
}
```

## Examples[​](#examples "Direct link to Examples")

### SHELL[​](#shell "Direct link to SHELL")

```
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth \
  -H "Content-type: application/json" \
  -d '{"email":"test@simplejwtlogin.com","password":"mySecretPassword"}'
```

### PHP[​](#php "Direct link to PHP")

```
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->authenticate('email@simplejwtlogin.com', 'your password', 'AUTH CODE');
```

## Error responses[​](#error-responses "Direct link to Error responses")

All error responses follow the standard envelope:

```
{
  "success": false,
  "data": {
    "message": "Human-readable error description",
    "errorCode": 48
  }
}
```

Common error codes:

| Code | Meaning                                           |
| ---- | ------------------------------------------------- |
| `45` | Authentication is not enabled in plugin settings. |
| `46` | Email or username is missing from the request.    |
| `47` | Password is missing from the request.             |
| `48` | Credentials are incorrect.                        |

***

## Settings[​](#settings "Direct link to Settings")

Configure the authentication feature under **Settings → Simple JWT Login → Authentication**.

### Allow JWT Authentication[​](#allow-jwt-authentication "Direct link to Allow JWT Authentication")

![Allow JWT Authentication](/assets/images/allow-jwt-authentication-d1026e3f9fdbe204be204310a0bc9911.png)

Enable or disable the authentication endpoint. When disabled, `POST /auth` returns a 403 error.

### Require Authentication Code[​](#require-authentication-code "Direct link to Require Authentication Code")

![Require Authentication Code for JWT generation](data:image/png;base64,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)

When enabled, every authentication request must include a valid Auth Code. The parameter name is the **Auth Code URL Key** from the Auth Codes settings (default: `AUTH_KEY`).

### Authentication Options[​](#authentication-options "Direct link to Authentication Options")

![Authentication Options](data:image/png;base64,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)

#### Base64-encoded password[​](#base64-encoded-password "Direct link to Base64-encoded password")

Enable when the `password` or `password_hash` value is Base64-encoded before sending. Useful when passwords contain special characters that would be mangled in query string parameters.

***

### JWT Header Configuration[​](#jwt-header-configuration "Direct link to JWT Header Configuration")

![JWT Header Configuration](/assets/images/jwt-header-configuration-880dc5df81fa65fa1ec2f622f4547455.png)

The JWT header always includes the standard `alg` and `typ` fields. You can add extra static key-value pairs to the header using **Custom Header Claims**.

The following header fields are reserved and cannot be overwritten by custom claims: `typ`, `alg`, `kid`.

**Example JWT header with a custom claim:**

```
{
  "alg": "HS256",
  "typ": "JWT",
  "x-app-id": "my-app"
}
```

***

### JWT Payload Configuration[​](#jwt-payload-configuration "Direct link to JWT Payload Configuration")

![JWT Payload Configuration](/assets/images/jwt-payload-configuration--5bb5fddf2f1d85c268f4f39ecf9b918b.png)

Choose which user data fields are included in the JWT payload. At minimum, `iat` (issued-at timestamp) is always present.

| Claim      | Description                                                                 |
| ---------- | --------------------------------------------------------------------------- |
| `iat`      | Unix timestamp when the JWT was issued. Always included, cannot be removed. |
| `exp`      | Unix timestamp when the JWT expires. If omitted, the token never expires.   |
| `email`    | The authenticated user's email address.                                     |
| `id`       | The WordPress user ID.                                                      |
| `site`     | The site URL where the token was generated.                                 |
| `username` | The WordPress `user_login` value.                                           |
| `iss`      | Issuer claim. The value is taken from the **Issuer value** field below.     |

#### Issuer (iss)[​](#issuer-iss "Direct link to Issuer (iss)")

When `iss` is enabled in the payload, this field sets its value. Defaults to the site URL if left blank. Used to identify the token's origin, especially in multi-provider setups.

#### Custom Payload Claims[​](#custom-payload-claims "Direct link to Custom Payload Claims")

Add static key-value pairs to the JWT payload. These are injected into every token generated by the plugin. To add claims on a per-request basis instead, use the [`payload` parameter](#endpoint) on `POST /auth`.

The following payload keys are reserved and cannot be overwritten - either from these settings or from the `payload` request parameter: `iat`, `exp`, `email`, `id`, `site`, `username`, `iss`.

**Example:**

```
{
  "iat": 1718000000,
  "exp": 1718003600,
  "email": "user@example.com",
  "id": 42,
  "department": "engineering",
  "app_version": "2.1.0"
}
```

***

### JWT Expiration[​](#jwt-expiration "Direct link to JWT Expiration")

![JWT Expiration setting](data:image/png;base64,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)

How long (in minutes) the generated JWT is valid. After this period the token is rejected by the plugin's validation and auto-login endpoints.

Default: **60 minutes**.

Set to `0` to disable expiry (not recommended for production).

***

### Access Control[​](#access-control "Direct link to Access Control")

![Access Control settings](data:image/png;base64,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)

Restrict authentication requests to a comma-separated list of trusted IP addresses. Leave blank to allow requests from any IP.

```
192.0.1.1, 192.2.2.2
```

The wildcard `*` is supported in any octet, which is useful for allowing an entire subnet:

```
85.*.*.*, 86.*.*.*
```
