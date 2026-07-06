# Verify Two-Factor Authentication code

```
POST 
/auth/2fa
```

Completes the Two-Factor Authentication challenge issued by `POST /auth`. When credentials are valid but the user has 2FA enabled, `POST /auth` returns an interim JWT (`two_factor_required: true`). This endpoint accepts that interim token together with the user's 2FA code and, on success, returns the final signed JWT.

**Requirements**

* Authentication must be enabled in the plugin settings.
* The Two-Factor Authentication plugin must be installed and active.
* The interim JWT must be provided via the `Authorization: Bearer` header or the `JWT` body field.
* The `code` field must contain the TOTP code, email token, or backup code, depending on the user's configured 2FA provider.

**JWT delivery** The interim JWT can be passed via:

* `JWT` field in the request body
* `Authorization: Bearer <token>` header (when enabled in plugin General Settings)

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 403
* 404
* 422
* 500

2FA verification successful. Returns a signed JWT and optional refresh token.

Bad request. One of:

* The interim JWT payload is missing required 2FA claims (`error_code` 106).
* The 2FA session nonce is invalid or expired (`error_code` 107).
* Too many failed attempts - rate limited (`error_code` 108).
* The 2FA code is incorrect (`error_code` 109).

Forbidden. One of:

* Authentication is disabled in the plugin settings (`error_code` 45).
* The Two-Factor Authentication plugin is not active (`error_code` 105).

The WordPress user referenced by the interim JWT could not be found.

Unprocessable entity. The interim JWT is missing from the request (not supplied via `Authorization: Bearer` header or `JWT` body field).

Internal server error. Typically an OpenSSL signing failure when generating the final JWT.
