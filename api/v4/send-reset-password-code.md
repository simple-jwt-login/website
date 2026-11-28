# Send reset password email

```
POST 
/user/reset_password
```

Sends a one-time reset code to the user's registered email address. The code must then be supplied to `PUT /user/reset_password` together with the new password.

**Requirements**

* Password reset must be enabled in the plugin settings.
* If "Reset Password Requires Auth Code" is enabled, `AUTH_KEY` must be provided.

An email that does not belong to a WordPress user gets the same `200` answer as one that does (nothing is sent), so the endpoint can not be used to find which emails have an account. Exception: the `simple_jwt_login_response_send_reset_password` filter and the reset password webhooks run only for real users. When they change the response or add a delay, callers can tell which emails exist.

**Flow**

1. Call `POST /user/reset_password` with `email` (and `AUTH_KEY` if required).
2. The user receives an email containing a one-time `code`.
3. Call `PUT /user/reset_password` with `email`, `code`, and `new_password`.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 422
* 500

Request accepted (also for emails without an account). The message depends on the "Reset password flow" setting.

WordPress core error: the `application/json` body is not valid JSON (for example, malformed UTF-8). The plugin is not called.

Unauthorized. The provided auth code is wrong (`error_code` 27).

Forbidden. Password reset is disabled in the plugin settings (`error_code` 56).

Unprocessable entity. One of:

* The `email` field is missing (`error_code` 63).
* The email address format is invalid (`error_code` 96).
* The auth code is required but was not provided (`error_code` 94).
* The configured reset password flow is invalid (`error_code` 65).

Internal server error, for example, WordPress could not send the reset email. The message is the one of the underlying error.
