# Change user password

```
PUT 
/user/reset_password
```

Sets a new password for the user. Two authentication modes are supported:

**Code-based (default)** Provide `email`, the one-time `code` received by email (from `POST /user/reset_password`), and `new_password`.

**JWT-based (optional)** When "Allow Reset Password with JWT" is enabled in the plugin settings, provide a valid `JWT` and `new_password`. The `code` field is not required in this mode. Note: JWTs that were themselves issued via a reset-password flow cannot be reused to change a password again.

**Requirements**

* Password reset must be enabled in the plugin settings.
* If "Reset Password Requires Auth Code" is enabled, `AUTH_KEY` must be provided.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 401
* 403
* 404
* 422
* 500

Password changed successfully.

Unauthorized. One of:

* The JWT is invalid, expired, or does not match the provided email (`error_code` 93).
* The provided auth code is wrong (`error_code` 27).

Forbidden. Password reset is disabled in the plugin settings (`error_code` 56).

No WordPress user with the provided email address was found.

Unprocessable entity. One of:

* The `email` field is missing (`error_code` 59).
* The `new_password` field is missing (`error_code` 61).
* JWT-based reset is enabled but neither `code` nor a JWT was provided (`error_code` 53).
* JWT-based reset is disabled and the `code` field is missing (`error_code` 60).
* The email address format is invalid (`error_code` 95).
* The one-time reset code is invalid or expired (`error_code` 62).
* The auth code is required but was not provided (`error_code` 94).

Internal server error.
