# Validate a JWT and retrieve user details

```
GET 
/auth/validate
```

Verifies the JWT signature, checks expiry and revocation status, and returns the decoded token information together with the matching WordPress user profile and roles.

**Audience** When an expected audience is configured (plugin setting `authorization.aud`, or the `audience` of the JWT Rule the token matches), the JWT `aud` claim (a string or a list) must contain it. Otherwise this and every other JWT endpoint answers `401` with `error_code` 130. JWTs from `/auth`, `/auth/refresh`, register and OAuth carry the plugin audience when it is set.

**JWT delivery** The JWT can be passed via:

* `JWT` query parameter
* `Authorization: Bearer <token>` header (when enabled in plugin General Settings)
* Cookie or session (when enabled in plugin General Settings)

A header, cookie, or session JWT is ignored on cross-site requests (`Sec-Fetch-Site: cross-site`, or an `Origin` / `Referer` naming another site) to prevent CSRF. Cross-origin browser apps must be listed in the CORS "Allow origin" setting; a `*` entry trusts the header JWT only, never the cookie or session JWT. Requests without these headers (mobile apps, servers) are not affected.

**Requirements**

* Authentication and the validate endpoint must be enabled in the plugin settings.
* The calling IP must pass the authentication IP allow-list.
* If "Validate Token Requires Auth Code" is enabled, `AUTH_KEY` must be provided.

The response can be changed with the `simple_jwt_login_response_validate_token` filter.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 404
* 422
* 500

JWT is valid. Returns the decoded token and the associated WordPress user.

The JWT could not be decoded or validated (all JWT library errors return 400):

* Malformed token: wrong number of segments, bad header/claims/signature encoding (`error_code` 2-5).
* Algorithm missing, unsupported or not allowed, bad `kid` (`error_code` 6-10).
* Signature verification failed (`error_code` 11).
* Token not yet valid (`nbf`/`iat`) or expired (`error_code` 12-14).

Unauthorized. One of:

* The JWT has been revoked, or was issued before the user's last password change (`error_code` 55).
* The `aud` claim does not match the expected audience (`error_code` 130).
* The provided auth code is wrong (`error_code` 27).
* The JWT is a 2FA interim token: finish the `/auth/2fa` step first (`error_code` 110).
* The JWT does not contain the claim configured as "JWT login by" parameter (`error_code` 29, 30).

Forbidden. One of:

* Authentication is disabled in the plugin settings (`error_code` 45).
* The validate endpoint is disabled in the plugin settings (`error_code` 82).
* The client IP address is not on the authentication allow-list (`error_code` 41).

The WordPress user identified by the JWT payload could not be found (`error_code` 24).

Unprocessable entity. One of:

* The JWT is absent from the request (`error_code` 53).
* The auth code is required but was not provided (`error_code` 94).

Internal server error (any other unexpected error).
