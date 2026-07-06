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
* 400
* 401
* 403
* 409
* 422
* 500

User registered successfully.

Bad request. Missing required fields (`email` or `password`), or an unclassified validation error.

Unauthorized. The provided auth code is invalid or missing when required.

Forbidden. User registration is disabled in the plugin settings, or the client IP address is not on the allow-list.

A WordPress user with the provided email address already exists.

Unprocessable entity. One of:

* The email address format is invalid (`error_code` 36).
* The `user_login` exceeds 60 characters, or the email address (used as login when `user_login` is omitted) exceeds 60 characters (`error_code` 36).
* The email domain is not permitted by the plugin's domain allow-list (`error_code` 37).

Internal server error. WordPress `wp_insert_user()` returned an error, or an unexpected internal failure occurred.
