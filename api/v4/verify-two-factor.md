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

**Failed codes and reuse**

* Each wrong code counts as a failed attempt for the Two Factor plugin (its rate limit then answers with error code 108) and fires `wp_login_failed`.
* After too many wrong codes (30 by default, filter `two_factor_failed_attempt_limit`) the user's password is reset and emailed, and the call answers error code 109 with a message asking the user to check their email.
* An interim JWT can be exchanged only once: after a valid code, call `POST /auth` again to start a new two-factor login.

**JWT delivery** The interim JWT can be passed via:

* `JWT` field in the request body
* `Authorization: Bearer <token>` header (when enabled in plugin General Settings)

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 404
* 422
* 429

2FA verification successful. Returns a signed JWT and optional refresh token.

The interim JWT could not be decoded or validated (JWT library error), for example, it expired (`error_code` 14) or its signature is wrong (`error_code` 11). Also returned when the final JWT cannot be signed (`error_code` 16).

Unauthorized. One of:

* The interim JWT has no `tfa_user_id` / `tfa_nonce` claims (`error_code` 106).
* The interim JWT was already used, or its 2FA session expired (`error_code` 107).
* The 2FA code is wrong (`error_code` 109). After too many wrong codes the message asks the user to check their email (the password was reset).

Forbidden. One of:

* Authentication is disabled in the plugin settings (`error_code` 45).
* The Two-Factor Authentication plugin is not active (`error_code` 105).

The WordPress user referenced by the interim JWT could not be found (`error_code` 24).

Unprocessable entity. One of:

* The interim JWT is missing from the request (`error_code` 23).
* The JWT is not an interim 2FA token (no `tfa_pending` claim, `error_code` 106).
* The `code` field is missing or empty (`error_code` 109).

Too many failed attempts, the Two Factor plugin rate limit applies (`error_code` 108).
