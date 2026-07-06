Version: 4.0.0

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
* using rest\_route: `https://{domain}/?rest_route=/simple-jwt-login/v1/{endpoint}`

## Authentication[​](#authentication "Direct link to Authentication")

Most endpoints accept a JWT via the `JWT` query parameter, request body field, or `Authorization: Bearer <token>` header. API key management endpoints require an active WordPress session (cookie-based auth or equivalent).

## Cross-Origin Resource Sharing[​](#cross-origin-resource-sharing "Direct link to Cross-Origin Resource Sharing")

This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/). All responses have a wildcard same-origin which makes them completely public and accessible to everyone, including any code on any site.

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

JWT passed in the `Authorization` header as `Bearer <token>`. The header key name is configurable in plugin General Settings (default: `Authorization`). This scheme must be enabled in the plugin General Settings under "JWT from Header".

| Security Scheme Type:      | http   |
| -------------------------- | ------ |
| HTTP Authorization Scheme: | bearer |
| Bearer format:             | JWT    |

JWT passed as a URL query parameter. The parameter name defaults to `JWT` but is configurable in plugin General Settings under "Request Keys".

| Security Scheme Type: | apiKey |
| --------------------- | ------ |
| Query parameter name: | JWT    |

Active WordPress session cookie. Required for all `/api-keys` endpoints. The user must be authenticated in WordPress before calling API key management endpoints.

| Security Scheme Type:  | apiKey                |
| ---------------------- | --------------------- |
| Cookie parameter name: | wordpress\_logged\_in |

### Contact

<contact@simplejwtlogin.com>

### License

[GPL 3.0](https://github.com/nicumicle/simple-jwt-login/blob/master/LICENSE)
