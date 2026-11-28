# Register a new WordPress user

```
POST 
/users
```

Creates a new WordPress user account. At minimum, `email` and `password` must be supplied. All standard WordPress user fields (display name, locale, etc.) are accepted and passed to `wp_insert_user()`.

**Requirements**

* User registration must be enabled in the plugin settings.
* If "Register Requires Auth Code" is enabled, `AUTH_KEY` must be provided.
* The calling IP must pass any IP allow-list configured in the plugin settings.
* The email address must be unique and well-formed.
* If email domain restrictions are configured, the domain must match.

**Success behaviour** Returns the new user's profile object, their roles, and optionally a JWT if "Generate JWT on register" is enabled in the plugin settings.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 302
* 400
* 401
* 403
* 409
* 422
* 500

User registered successfully.

User registered and logged in. Returned when auto-login is enabled together with "Force login after register": the browser is redirected the same way as `GET /autologin` (or a `200` JSON body is returned when "No redirect" is configured).

**Response Headers**

* **Location**

  **Example:<!-- -->&#x20;**`https://example.com/wp-admin/`

The JWT for the new user could not be signed (JWT library error, for example, OpenSSL signing failure `error_code` 16). Only when "Generate JWT on register" is enabled.

Unauthorized. The auth code does not match any configured auth code (`error_code` 27). An auth code is validated whenever it is sent, even when it is not required.

Forbidden. One of:

* User registration is disabled in the plugin settings (`error_code` 31).
* The client IP address is not on the allow-list (`error_code` 33).

A WordPress user with the provided email address or `user_login` already exists (`error_code` 38).

Unprocessable entity. One of:

* `email` is missing, or `password` is missing while "Random password" is off (`error_code` 35).
* The email address format is invalid (`error_code` 36).
* The `user_login` exceeds 60 characters, or the email address (used as login when `user_login` is omitted) exceeds 60 characters (`error_code` 36).
* The email domain is not permitted by the plugin's domain allow-list (`error_code` 37).
* The auth code is required but was not provided (`error_code` 94).

Internal server error. WordPress `wp_insert_user()` returned an error (`error_code` 52, the message is the WordPress error), or an unexpected internal failure occurred.
