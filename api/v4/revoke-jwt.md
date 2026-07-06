# Revoke a JWT

```
POST 
/auth/revoke
```

Marks the provided JWT as revoked in the database. Once revoked, the token is rejected by all plugin endpoints that check for revocation (autologin, validate, refresh, etc.).

**JWT delivery** The JWT to revoke can be passed via:

* `JWT` field in the request body
* `Authorization: Bearer <token>` header (when enabled in plugin General Settings)

**Requirements**

* Token revocation must be enabled in the plugin settings.
* The JWT must be structurally valid (it does not need to be un-expired).
* If "Authentication Requires Auth Code" is enabled, `AUTH_KEY` must be provided.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 404
* 422
* 500

Token revoked successfully.

Bad request. The JWT has a structural encoding error (wrong number of segments, invalid base64 encoding of header, claims, or signature).

Unauthorized. One of:

* The JWT signature verification failed or algorithm is unsupported (`error_code` 6-11).
* The token was already revoked (`error_code` 55).
* The provided auth code is wrong (`error_code` 27).

Forbidden. One of:

* Authentication is disabled in the plugin settings (`error_code` 45).
* Token revocation is disabled in the plugin settings (`error_code` 83).
* The client IP address is not on the allow-list (`error_code` 41).

The WordPress user identified by the JWT payload could not be found.

Unprocessable entity. One of:

* The JWT is completely absent from the request (`error_code` 53).
* The auth code is required but was not provided (`error_code` 94).

Internal server error.
