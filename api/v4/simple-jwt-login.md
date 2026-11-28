Version: 4.3.0

# Simple-JWT-Login

![Simple JWT Login Logo](https://simplejwtlogin.com/assets/favicons/android-chrome-192x192.png)![Simple JWT Login Logo](https://simplejwtlogin.com/assets/favicons/android-chrome-192x192.png)

**Simple-JWT-Login** is a free, open-source WordPress plugin that adds JSON Web Token (JWT) authentication to the WordPress REST API. It lets mobile apps, single-page applications, and external services securely interact with your WordPress site - without exposing admin credentials.

With Simple-JWT-Login you can:

* **Authenticate** users and receive a signed JWT
* **Auto-login** users via a tokenized link
* **Register** and **delete** users programmatically
* **Reset and change passwords** through the REST API
* **Protect any REST endpoint** so it requires a valid JWT
* **Refresh, validate, and revoke** tokens to manage session lifecycle

Whether you're building a headless WordPress site, a React/Vue front-end, a mobile app, or a third-party integration, Simple-JWT-Login provides a clean, standards-based authentication layer.

## API Format[​](#api-format "Direct link to API Format")

This API is documented in **OpenAPI format**. You can open it in [Swagger Editor](https://editor.swagger.io/), view it on this website, or import it into Postman for local testing.

## Server[​](#server "Direct link to Server")

You can access the Simple-JWT-Login API in two modes:

* using permalink: `https://{domain}/wp-json/simple-jwt-login/v1/{endpoint}`
* using `rest_route`: `https://{domain}/?rest_route=/simple-jwt-login/v1/{endpoint}`

## Authentication[​](#authentication "Direct link to Authentication")

Most endpoints accept a JWT via the `JWT` query parameter, request body field, or `Authorization: Bearer <token>` header. API key and revoked-token management endpoints require an authenticated WordPress user: a logged-in session (cookie plus `X-WP-Nonce`) or a JWT in the header or cookie.

## Request parameters[​](#request-parameters "Direct link to Request parameters")

Every endpoint reads its parameters from the query string and the request body (JSON, `multipart/form-data` or `application/x-www-form-urlencoded`) merged together, so any parameter documented for the body can also be sent as a query parameter and the other way round. The `JWT` parameter name (matched case-insensitively) and the `AUTH_KEY` auth code parameter name are configurable in the plugin settings.

## Status codes[​](#status-codes "Direct link to Status codes")

* All JWT library errors (such as a malformed token, a bad signature, or an expired JWT: `error_code` 1-21) answer `400`.
* Validation errors answer `422`.
* Errors with no status of their own answer `500`. Each endpoint lists the `error_code` values it returns this way.

### Cross-site requests (CSRF protection)[​](#cross-site-requests-csrf-protection "Direct link to Cross-site requests (CSRF protection)")

A JWT sent in the `Authorization` header, a cookie or the session only authenticates requests that come from the site itself or from an origin listed in the CORS "Allow origin" setting. On a cross-site request (`Sec-Fetch-Site: cross-site`, or an `Origin` / `Referer` naming another site, including sibling subdomains and other ports) that JWT is ignored.

* A `*` entry in "Allow origin" trusts the `Authorization` header JWT only - cookie and session JWTs are never trusted.
* With CORS disabled (or "Allow origin" off), a browser page on another site can't authenticate with a JWT, even in the `Authorization` header.
* Requests without these headers (server-to-server calls, mobile apps, CLI tools) and JWTs passed in the URL (for example, autologin links) are not affected.

## Cross-Origin Resource Sharing[​](#cross-origin-resource-sharing "Direct link to Cross-Origin Resource Sharing")

This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/). Allowed origins, methods, and headers are configured in the plugin's CORS settings. Browser apps on another origin that send a JWT must have their origin listed in **Allow origin**.

## Error Response Format[​](#error-response-format "Direct link to Error Response Format")

All error responses share a common envelope:

```
{

  "success": false,

  "data": {

    "message": "Human-readable error description",

    "error_code": 42

  }

}
```

The `error_code` field maps to a specific internal error constant that can be used for programmatic error handling.

## Authentication[​](#authentication "Direct link to Authentication")

* HTTP: Bearer Auth
* API Key: QueryJWT
* API Key: WordPressSession

JWT passed in the `Authorization` header as `Bearer <token>`. The header key name is configurable in plugin General Settings (default: `Authorization`). This scheme must be enabled in the plugin General Settings under **JWT from Header**.

| Security Scheme Type:      | http   |
| -------------------------- | ------ |
| HTTP Authorization Scheme: | bearer |
| Bearer format:             | JWT    |

JWT passed as a URL query parameter. The parameter name defaults to `JWT` but is configurable in plugin General Settings under **Request Keys**.

| Security Scheme Type: | apiKey |
| --------------------- | ------ |
| Query parameter name: | JWT    |

WordPress logged-in cookie (`wordpress_logged_in_<hash>`). For REST calls WordPress also needs the `X-WP-Nonce` header (`wp_rest` nonce), otherwise the request is treated as logged out. Used by the `/api-keys` and `/revoked-tokens` endpoints, which also accept a JWT (`BearerAuth`).

| Security Scheme Type:  | apiKey                |
| ---------------------- | --------------------- |
| Cookie parameter name: | wordpress\_logged\_in |

### Contact

<contact@simplejwtlogin.com>

### License

[GPL 3.0](https://github.com/nicumicle/simple-jwt-login/blob/master/LICENSE)
