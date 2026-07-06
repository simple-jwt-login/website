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

**Success behaviour** The response is an HTTP redirect (302) to the WordPress home URL or the custom `redirectUrl`. The browser session is authenticated as the resolved user.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 404
* 422
* 500

Login successful. Two possible responses depending on the plugin's "Redirect after auto-login" setting:

* **Redirect (default)**: The browser is redirected (302) to the WordPress home URL, dashboard, or a custom URL. The response body is empty HTML.
* **No redirect**: When "No redirect" is configured, returns a JSON body: `{"success": true, "message": "User was logged in."}`.

Bad request. The JWT has a structural encoding error (wrong number of segments, invalid base64 encoding of header, claims, or signature).

Unauthorized. One of:

* The JWT algorithm is unsupported or not allowed (`error_code` 6-10).
* The JWT signature verification failed (`error_code` 11).
* The JWT has `nbf`/`iat` violations or is expired (`error_code` 12-14).
* The JWT has been revoked (`error_code` 55).
* The JWT is structurally invalid for auto-login (`error_code` 25).
* The `iss` claim is not on the allowed-issuer list (`error_code` 68).
* The provided auth code is wrong (`error_code` 27).

Forbidden. One of:

* Auto-login is disabled in the plugin settings (`error_code` 26).
* The client IP address is not on the allow-list (`error_code` 28).

The WordPress user identified by the JWT payload could not be found.

Unprocessable entity. One of:

* The JWT is completely absent from the request (`error_code` 23).
* The auth code is required by the plugin settings but was not provided (`error_code` 94).
* The JWT is a short-lived interim token issued during a 2FA challenge and cannot be used for auto-login (`error_code` 110).

Internal server error. Typically caused by an OpenSSL signing/verification failure or an unexpected internal error.
