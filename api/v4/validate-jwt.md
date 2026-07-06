# Validate a JWT and retrieve user details

```
GET 
/auth/validate
```

Verifies the JWT signature, checks expiry and revocation status, and returns the decoded token information together with the matching WordPress user profile and roles.

**JWT delivery** The JWT can be passed via:

* `JWT` query parameter
* `Authorization: Bearer <token>` header (when enabled in plugin General Settings)
* Cookie or session (when enabled in plugin General Settings)

**Requirements**

* Token validation must be enabled in the plugin settings.
* If "Authentication Requires Auth Code" is enabled, `AUTH_KEY` must be provided.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 422
* 500

JWT is valid. Returns the decoded token and the associated WordPress user.

Bad request. The JWT has a structural encoding error (wrong number of segments, invalid base64 encoding of header, claims, or signature).

Unauthorized. One of:

* The JWT signature verification failed or algorithm is unsupported (`error_code` 6-11).
* The JWT has `nbf`/`iat` violations or is expired (`error_code` 12-14).
* The JWT has been revoked (`error_code` 55).
* The provided auth code is wrong (`error_code` 27).

Forbidden. JWT validation is disabled in the plugin settings (`error_code` 82).

Unprocessable entity. One of:

* The JWT is completely absent from the request (`error_code` 53).
* The auth code is required but was not provided (`error_code` 94).

Internal server error.
