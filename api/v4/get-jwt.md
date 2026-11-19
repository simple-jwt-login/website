# Authenticate and obtain a JWT

```
POST 
/auth
```

Validates the user's WordPress credentials and returns a signed JWT. An optional refresh token is also returned when the refresh-token feature is enabled in the plugin settings.

**Credentials** Supply one of `email`, `username` or `login` (username or email). When several are sent, `username` wins over `email`, and `email` wins over `login`. Plus one of:

* `password` - plaintext password, verified with `wp_authenticate()`, so the `authenticate` / `wp_authenticate_user` filters of login protection plugins (lockouts, blocked users) apply. Application passwords are not accepted.
* `password_hash` - the hashed password as stored in the WordPress database (must be enabled in the plugin settings)

Every failed attempt (unknown user, wrong password or hash) fires `wp_login_failed`, so brute-force plugins count it.

**Requirements**

* Authentication must be enabled in the plugin settings.
* If "Authentication Requires Auth Code" is enabled, `AUTH_KEY` must be provided.

**Custom payload claims** Optionally supply `payload` as a JSON-encoded object to add extra claims to the issued JWT. Reserved identity claims are always derived from the authenticated user and cannot be overridden this way.

**Two-Factor Authentication** When the authenticated user has Two-Factor Authentication enabled and the 2FA integration is active, the endpoint returns HTTP 200 with a challenge response instead of a regular JWT. The `two_factor_required` field is `true` and `jwt` contains a short-lived interim token. Submit that interim token together with the 2FA code to `POST /auth/2fa` to obtain the final JWT.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 422
* 500

Authentication successful. Returns a signed JWT and an optional refresh token.

**Two-Factor challenge**: when the user has 2FA enabled, this response is returned instead of a regular JWT. `two_factor_required` is `true` and `jwt` contains a short-lived interim token. Submit it with the 2FA code to `POST /auth/2fa` to obtain the final JWT.

The JWT could not be signed (JWT library error, for example, OpenSSL signing failure `error_code` 16, or a bad private key / algorithm `error_code` 1, 7, 17).

Unauthorized. One of:

* The user does not exist, or the password / password hash is wrong (`error_code` 48). When "Password is base64 encoded" is on, a value that is not valid base64 is also treated as wrong credentials.
* The provided auth code is wrong (`error_code` 27).

Forbidden. One of:

* Authentication is disabled in the plugin settings (`error_code` 45).
* The client IP address is not on the allow-list configured in the plugin settings (`error_code` 41).

Unprocessable entity. One of:

* The `email`, `username`, or `login` field is missing (`error_code` 46).
* The `password` or `password_hash` field is missing (`error_code` 47).
* The `password_hash` field was provided but "Allow login with password hash" is not enabled in the plugin settings (`error_code` 113).
* The auth code is required but was not provided (`error_code` 94).

Internal server error. One of:

* The refresh token could not be saved in the database (`error_code` 131).
* The 2FA nonce for the challenge could not be created (`error_code` 133).
