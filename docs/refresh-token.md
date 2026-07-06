# Refresh token

Use this endpoint to exchange a refresh token for a new JWT, without requiring the user to re-enter their credentials. This is the standard mechanism for keeping long-running sessions alive.

A `refresh_token` is returned alongside the JWT whenever you call the Authentication endpoint (`POST /auth`), provided the Refresh Token feature is enabled.

API Reference

Explore and test this endpoint using the [interactive API reference →](/api/v4/refresh-jwt.md)

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/refresh`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/refresh&refresh_token={{YOUR_REFRESH_TOKEN}}`

**PARAMETERS**:

| Parameter       | Type                | Description                                                                                                                                                                                                            |
| --------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `refresh_token` | `required` `string` | The refresh token returned by the Authentication endpoint.                                                                                                                                                             |
| `AUTH_KEY`      | `optional` `string` | Auth Code value. Required only if "Require Authentication Code" is enabled in Refresh Token settings. The parameter name matches the **Auth Code URL Key** configured under Auth Codes settings (default: `AUTH_KEY`). |
| `payload`       | `optional` `json`   | Custom JSON object to merge into the new JWT payload. Keys provided here are merged with the standard payload generated from the user record.                                                                          |

## Request[​](#request "Direct link to Request")

```
{
  "refresh_token": "YOUR_REFRESH_TOKEN_HERE"
}
```

With an Auth Code and custom payload:

```
{
  "refresh_token": "YOUR_REFRESH_TOKEN_HERE",
  "AUTH_KEY": "MySecretAuthCode",
  "payload": "{\"custom_claim\": \"value\"}"
}
```

## Responses[​](#responses "Direct link to Responses")

### 200[​](#200 "Direct link to 200")

```
{
  "success": true,
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "refresh_token": "f6e7g8h9i0j123456789012345678901234567890123456789012345678901234567"
  }
}
```

Token rotation is applied on every successful refresh: the submitted token is invalidated immediately, and the new `refresh_token` in the response replaces it. Store the new token before discarding the old one.

### 400[​](#400 "Direct link to 400")

The `refresh_token` parameter is missing from the request.

```
{
  "success": false,
  "data": {
    "message": "Refresh token is missing.",
    "errorCode": 51
  }
}
```

### 401[​](#401 "Direct link to 401")

The refresh token was not found or has expired.

```
{
  "success": false,
  "data": {
    "message": "Invalid refresh token.",
    "errorCode": 51
  }
}
```

### 403[​](#403 "Direct link to 403")

The refresh token feature is disabled in plugin settings.

```
{
  "success": false,
  "data": {
    "message": "Refresh Token endpoint is not enabled.",
    "errorCode": 81
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
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth/refresh \
  -H "Content-type: application/json" \
  -d '{"refresh_token":"YOUR_REFRESH_TOKEN"}'
```

### PHP[​](#php "Direct link to PHP")

```
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->refreshToken('your refresh token here', 'AUTH CODE');
```

### JavaScript[​](#javascript "Direct link to JavaScript")

```
fetch('https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refresh_token: 'YOUR_REFRESH_TOKEN_HERE' })
}).then(r => r.json()).then(console.log);
```

## Error responses[​](#error-responses "Direct link to Error responses")

| Code | Meaning                                                                             |
| ---- | ----------------------------------------------------------------------------------- |
| `51` | The `refresh_token` parameter is missing, or the token was not found / has expired. |
| `81` | The refresh token feature is disabled in plugin settings.                           |

***

## Settings[​](#settings "Direct link to Settings")

Configure the refresh token feature under **Settings → Simple JWT Login → Refresh Token**.

### Allow Refresh Token Endpoint[​](#allow-refresh-token-endpoint "Direct link to Allow Refresh Token Endpoint")

![Allow Refresh Token Endpoint](/assets/images/allow-refresh-token-endpoint-b65060ee8cd8c56e98880dc12c93a601.png)

Enable or disable the refresh token endpoint. When disabled, the `/auth/refresh` route returns a 403 error. When enabled, a `refresh_token` is also returned alongside the JWT from the Authentication endpoint.

### Require Authentication Code[​](#require-authentication-code "Direct link to Require Authentication Code")

![Require Authentication Code](data:image/png;base64,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)

When enabled, the client must include a valid Auth Code in the refresh request. The parameter name used to pass the code is the **Auth Code URL Key** configured under **Auth Codes** settings (default: `AUTH_KEY`).

### JWT Refresh Window[​](#jwt-refresh-window "Direct link to JWT Refresh Window")

![Refresh Token Settings](/assets/images/refresh-token-settings-b1d875c0fe767310252e6fa750370049.png)

How long (in minutes) a refresh token remains valid from the time it was issued. The window is **rolling** - each successful refresh issues a new token with a fresh TTL, so an active client never expires as long as it refreshes within the window.

Default: **20,160 minutes** (2 weeks).

### Refresh Token Secret Key[​](#refresh-token-secret-key "Direct link to Refresh Token Secret Key")

A separate secret used to encrypt refresh tokens stored in the database. This key is independent of the JWT signing key. Use a long, random string - the **Generate Secure Key** button creates a cryptographically secure value.

caution

Never reuse your JWT signing key as the refresh token secret. If one is compromised, the other remains safe.
