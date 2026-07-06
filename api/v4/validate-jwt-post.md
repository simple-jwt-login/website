# Validate a JWT and retrieve user details (POST variant)

```
POST 
/auth/validate
```

Identical to `GET /auth/validate` but accepts the JWT in the request body instead of as a query parameter. Use this variant when the JWT is too long for a URL, or when sending it in the body is preferred for security reasons.

**JWT delivery** The JWT can be passed via:

* `JWT` field in the request body
* `Authorization: Bearer <token>` header (when enabled in plugin General Settings)

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

Unauthorized. The JWT signature verification failed, is expired, or has been revoked. The provided auth code is wrong.

Forbidden. JWT validation is disabled in the plugin settings (`error_code` 82).

Unprocessable entity. The `JWT` field is absent from the request body (`error_code` 53), or the auth code is required but not provided (`error_code` 94).

Internal server error.
