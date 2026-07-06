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

User deleted successfully.

Bad request. The JWT has a structural encoding error (wrong number of segments, invalid base64 encoding of header, claims, or signature).

Unauthorized. One of:

* The JWT signature verification failed or algorithm is unsupported (`error_code` 6-11).
* The JWT has `nbf`/`iat` violations or is expired (`error_code` 12-14).
* The JWT has been revoked (`error_code` 55).
* The provided auth code is wrong (`error_code` 27).

Forbidden. One of:

* User deletion is disabled in the plugin settings (`error_code` 39).
* The client IP address is not on the allow-list (`error_code` 41).

The WordPress user identified by the JWT payload could not be found.

Unprocessable entity. One of:

* The JWT is completely absent from the request (`error_code` 42).
* The auth code is required but was not provided (`error_code` 94).

Internal server error.
