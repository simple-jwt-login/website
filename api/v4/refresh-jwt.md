# Refresh an expired JWT

```
POST 
/auth/refresh
```

Exchanges a valid refresh token for a new JWT (and a new refresh token). The original refresh token is invalidated after use.

**Requirements**

* The refresh-token feature must be enabled in the plugin settings.
* The refresh token must exist in the database and not have exceeded the maximum token age configured in the plugin settings.
* If "Authentication Requires Auth Code" is enabled, `AUTH_KEY` must be provided.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 401
* 403
* 422
* 500

JWT refreshed successfully. Returns a new JWT and a new refresh token.

Unauthorized. One of:

* The refresh token was not found in the database (expired, already rotated, or never issued) (`error_code` 51).
* A JWT was supplied alongside the refresh token but has been revoked - revoked JWTs cannot be used to obtain new tokens (`error_code` 55).
* The WordPress user linked to the refresh token no longer exists (`error_code` 55).
* The provided auth code is wrong (`error_code` 27).

Forbidden. One of:

* The refresh-token feature is disabled in the plugin settings (`error_code` 81).
* Authentication is disabled in the plugin settings (`error_code` 45).
* The client IP address is not on the allow-list (`error_code` 41).

Unprocessable entity. One of:

* The `refresh_token` field is absent from the request (`error_code` 51).
* The auth code is required but was not provided (`error_code` 94).

Internal server error.
