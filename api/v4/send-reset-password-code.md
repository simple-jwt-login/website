# Send reset password email

```
POST 
/user/reset_password
```

Sends a one-time reset code to the user's registered email address. The code must then be supplied to `PUT /user/reset_password` together with the new password.

**Requirements**

* Password reset must be enabled in the plugin settings.
* If "Reset Password Requires Auth Code" is enabled, `AUTH_KEY` must be provided.
* The email address must belong to an existing WordPress user.

**Flow**

1. Call `POST /user/reset_password` with `email` (and `AUTH_KEY` if required).
2. The user receives an email containing a one-time `code`.
3. Call `PUT /user/reset_password` with `email`, `code`, and `new_password`.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 401
* 403
* 404
* 422
* 500

Reset password email sent successfully.

Unauthorized. The provided auth code is wrong (`error_code` 27).

Forbidden. Password reset is disabled in the plugin settings (`error_code` 56).

No WordPress user with the provided email address was found.

Unprocessable entity. One of:

* The `email` field is missing (`error_code` 63).
* The email address format is invalid (`error_code` 96).
* The auth code is required but was not provided (`error_code` 94).

Internal server error (e.g. email sending failure).
