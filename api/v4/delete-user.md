# Delete a WordPress user

```
DELETE 
/users
```

Permanently deletes the WordPress user identified by the JWT payload. The JWT is decoded to extract the user identifier (email, ID, or login, depending on plugin settings), the user is looked up, and `wp_delete_user()` is called.

**Requirements**

* User deletion must be enabled in the plugin settings.
* The JWT must be valid, not expired, and not revoked.
* If "Delete Requires Auth Code" is enabled, `AUTH_KEY` must be provided.
* The calling IP must pass any IP allow-list configured in the plugin settings.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 404
* 422
* 500

User deleted. Their refresh tokens and revoked-token records are removed too. The body can be changed with the `simple_jwt_login_response_delete_user` filter.

The JWT could not be decoded or validated (all JWT library errors return 400): malformed token (`error_code` 2-5), algorithm/`kid` problems (`error_code` 6-10), bad signature (`error_code` 11), not yet valid or expired (`error_code` 12-14).

Unauthorized. One of:

* The JWT has been revoked, or was issued before the user's last password change (`error_code` 55).
* The `aud` claim does not match the expected audience (`error_code` 130).
* The provided auth code is wrong (`error_code` 27).
* The JWT is a 2FA interim token: finish the `/auth/2fa` step first (`error_code` 110).
* The JWT does not contain the claim configured as "JWT login by" parameter (`error_code` 29, 30).

Forbidden. One of:

* User deletion is disabled in the plugin settings (`error_code` 39).
* The client IP address is not on the allow-list (`error_code` 41).

The WordPress user identified by the JWT payload could not be found (`error_code` 24).

Unprocessable entity. One of:

* The JWT is absent from the request (`error_code` 42).
* The auth code is required but was not provided (`error_code` 94).

Internal server error (any other unexpected error).
