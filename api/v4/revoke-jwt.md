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

* Authentication and token revocation must be enabled in the plugin settings.
* The calling IP must pass the authentication IP allow-list.
* The JWT must be valid: signed with the configured key and not expired (an expired JWT answers `400`, `error_code` 14).
* If "Revoke Token Requires Auth Code" is enabled, `AUTH_KEY` must be provided.

**Side effects** All refresh tokens of the user are deleted too. The response can be changed with the `simple_jwt_login_response_revoke_token` filter.

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

The JWT could not be decoded or validated (all JWT library errors return 400):

* Malformed token: wrong number of segments, bad header/claims/signature encoding (`error_code` 2-5).
* Algorithm missing, unsupported or not allowed, bad `kid` (`error_code` 6-10).
* Signature verification failed (`error_code` 11).
* Token not yet valid (`nbf`/`iat`) or expired (`error_code` 12-14).

Unauthorized. One of:

* The JWT was already revoked (`error_code` 55).
* The `aud` claim does not match the expected audience (`error_code` 130).
* The provided auth code is wrong (`error_code` 27).
* The JWT is a 2FA interim token: finish the `/auth/2fa` step first (`error_code` 110).
* The JWT does not contain the claim configured as "JWT login by" parameter (`error_code` 29, 30).

Forbidden. One of:

* Authentication is disabled in the plugin settings (`error_code` 45).
* Token revocation is disabled in the plugin settings (`error_code` 83).
* The client IP address is not on the authentication allow-list (`error_code` 41).

The WordPress user identified by the JWT payload could not be found (`error_code` 24).

Unprocessable entity. One of:

* The JWT is absent from the request (`error_code` 53).
* The auth code is required but was not provided (`error_code` 94).

Internal server error (any other unexpected error).
