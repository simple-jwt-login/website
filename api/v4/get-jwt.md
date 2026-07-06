# Authenticate and obtain a JWT

```
POST 
/auth
```

Validates the user's WordPress credentials and returns a signed JWT. An optional refresh token is also returned when the refresh-token feature is enabled in the plugin settings.

**Credentials** Supply either `email` or `username` (not both), plus one of:

* `password` — plaintext password (verified with `wp_check_password`)
* `password_hash` — the hashed password as stored in the WordPress database (must be enabled in the plugin settings)

**Requirements**

* Authentication must be enabled in the plugin settings.
* If "Authentication Requires Auth Code" is enabled, `AUTH_KEY` must be provided.

**Two-Factor Authentication** When the authenticated user has Two-Factor Authentication enabled and the 2FA integration is active, the endpoint returns HTTP 200 with a challenge response instead of a regular JWT. The `two_factor_required` field is `true` and `jwt` contains a short-lived interim token. Submit that interim token together with the 2FA code to `POST /auth/2fa` to obtain the final JWT.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 401
* 403
* 422
* 500

Authentication successful. Returns a signed JWT and an optional refresh token.

**Two-Factor challenge**: when the user has 2FA enabled, this response is returned instead of a regular JWT. `two_factor_required` will be `true` and `jwt` will contain a short-lived interim token. Submit it with the 2FA code to `POST /auth/2fa` to obtain the final JWT.

Unauthorized. One of:

* The provided credentials (password or password hash) are incorrect (`error_code` 48).
* The provided auth code is wrong (`error_code` 27).

Forbidden. One of:

* Authentication is disabled in the plugin settings (`error_code` 45).
* The client IP address is not on the allow-list configured in the plugin settings (`error_code` 41).

Unprocessable entity. One of:

* The `email`, `username`, or `login` field is missing (`error_code` 46).
* The `password` or `password_hash` field is missing (`error_code` 47).
* The `password_hash` field was provided but "Allow login with password hash" is not enabled in the plugin settings (`error_code` 113).
* The auth code is required but was not provided (`error_code` 94).

Internal server error. Typically an OpenSSL signing failure when generating the JWT.
