# Auto-login user into WordPress

```
GET 
/autologin
```

Validates the supplied JWT, resolves the matching WordPress user, and redirects the browser to the site (or to `redirectUrl` if provided and allowed by settings).

**Requirements**

* Auto-login must be enabled in the plugin settings.
* The JWT must be valid, not expired, and not revoked.
* If "Auto-Login Requires Auth Code" is enabled, `AUTH_KEY` must be provided.
* The calling IP must pass any IP allow-list configured in the plugin settings.

**JWT delivery** The JWT can be supplied via:

* `JWT` query parameter (default)
* `JWT` in request body
* `Authorization: Bearer <token>` header (when enabled in plugin General Settings)
* Cookie or session (when enabled in plugin General Settings)

A header, cookie, or session JWT is ignored on cross-site requests (`Sec-Fetch-Site: cross-site`, or an `Origin` / `Referer` naming another site) to prevent CSRF. Cross-origin browser apps must be listed in the CORS "Allow origin" setting; a `*` entry trusts the header JWT only, never the cookie or session JWT. Requests without these headers (mobile apps, servers) are not affected.

**Success behaviour** The response is an HTTP redirect (302) to the WordPress home URL or the custom `redirectUrl`. The browser session is authenticated as the resolved user.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 302
* 400
* 401
* 403
* 404
* 422
* 500

Login successful and the "Redirect after auto-login" setting is "No redirect." The body can be changed with the `simple_jwt_login_no_redirect_message` filter.

Two cases:

* **Login successful**: redirect to the dashboard (default), the home page, the custom URL from the settings or the `redirectUrl` parameter. The WordPress auth cookie is set.
* **Login failed and "Redirect on fail" is configured**: every error below becomes a redirect to that URL with `error_message` and `error_code` appended to the query string.

**Response Headers**

* **Location**

  **Example:<!-- -->&#x20;**`https://example.com/wp-admin/`

The JWT could not be decoded or validated (all JWT library errors return 400):

* Malformed token: wrong number of segments, bad header/claims/signature encoding (`error_code` 2-5).
* Algorithm missing, unsupported or not allowed, bad `kid` (`error_code` 6-10).
* Signature verification failed (`error_code` 11).
* Token not yet valid (`nbf`/`iat`) or expired (`error_code` 12-14).

Unauthorized. One of:

* The JWT has been revoked, or was issued before the user's last password change (`error_code` 55).
* The `iss` claim is not on the allowed-issuer list (`error_code` 68).
* The `aud` claim does not match the expected audience (`error_code` 130).
* The provided auth code is wrong (`error_code` 27).
* The JWT is a 2FA interim token: finish the `/auth/2fa` step first (`error_code` 110).
* The JWT does not contain the claim configured as "JWT login by" parameter (`error_code` 29, 30).

Forbidden. One of:

* Auto-login is disabled in the plugin settings (`error_code` 26).
* The client IP address is not on the allow-list (`error_code` 28).

The WordPress user identified by the JWT payload could not be found (`error_code` 24).

Unprocessable entity. One of:

* The JWT is absent from the request (`error_code` 23).
* The auth code is required by the plugin settings but was not provided (`error_code` 94).

Internal server error (any other unexpected error).
