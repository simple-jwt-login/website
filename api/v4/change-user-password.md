# Change user password

```
PUT 
/user/reset_password
```

Sets a new password for the user. Two authentication modes are supported:

**Code-based (default)** Provide `email`, the one-time `code` received by email (from `POST /user/reset_password`), and `new_password`.

**JWT-based (optional)** When "Allow Reset Password with JWT" is enabled in the plugin settings, provide a valid `JWT` and `new_password`. The `code` field is not required in this mode. Note: JWTs that were themselves issued via a reset-password flow cannot be reused to change a password again.

**Sessions are revoked** (when the `authorization.revoke_on_password_change` setting is on; off by default) After a password change through this endpoint or `wp-login.php` (and, on WordPress 5.8+, the user profile, the admin or `/wp/v2/users`), the user's refresh tokens are deleted and every JWT issued before the change (older `iat`, or no `iat`) is rejected with error code 55. Log in again to get a new JWT.

**Requirements**

* Password reset must be enabled in the plugin settings.
* If "Reset Password Requires Auth Code" is enabled, `AUTH_KEY` must be provided.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 422
* 500

Password changed. The body can be changed with the `simple_jwt_login_response_change_user_password` filter.

JWT mode only. The JWT could not be decoded or validated (JWT library errors, for example, expired `error_code` 14, bad signature `error_code` 11).

Unauthorized. One of:

* JWT mode: the JWT user does not exist or its email is not the `email` parameter (`error_code` 93).
* JWT mode: the JWT has been revoked or was issued before the last password change (`error_code` 55).
* The provided auth code is wrong (`error_code` 27).
* The JWT is a 2FA interim token: finish the `/auth/2fa` step first (`error_code` 110).
* The JWT does not contain the claim configured as "JWT login by" parameter (`error_code` 29, 30).

Forbidden. Password reset is disabled in the plugin settings (`error_code` 56).

Unprocessable entity. One of:

* The `email` field is missing (`error_code` 59).
* The `new_password` field is missing (`error_code` 61).
* "Password is base64 encoded" is on and `new_password` is not valid base64 (`error_code` 63).
* JWT-based reset is enabled but neither `code` nor a JWT was provided (`error_code` 53).
* JWT-based reset is disabled and the `code` field is missing (`error_code` 60).
* The email address format is invalid (`error_code` 95).
* The one-time reset code is invalid, expired, or belongs to another email (`error_code` 62).
* The auth code is required but was not provided (`error_code` 94).

Internal server error (any other unexpected error).
