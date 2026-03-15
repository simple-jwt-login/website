Version: 3.6.0

# Simple-JWT-Login

![Simple-Jwt-Login Logo](https://raw.githubusercontent.com/nicumicle/simple-jwt-login/refs/heads/master/wordpress.org/assets/icon-128x128.png)![Simple-Jwt-Login Logo](https://raw.githubusercontent.com/nicumicle/simple-jwt-login/refs/heads/master/wordpress.org/assets/icon-128x128.png)

REST API reference for the **Simple-JWT-Login** WordPress plugin — add token-based authentication to your WordPress site without writing a single line of code.

## Base URL[​](#base-url "Direct link to Base URL")

All endpoints are available via two URL formats:

| Mode              | Pattern                                                        |
| ----------------- | -------------------------------------------------------------- |
| Pretty permalinks | `https://{domain}/wp-json/simple-jwt-login/v1/{endpoint}`      |
| Query string      | `https://{domain}/?rest_route=/simple-jwt-login/v1/{endpoint}` |

## Authentication[​](#authentication "Direct link to Authentication")

Most write endpoints accept a `JWT` token delivered in one of four ways:

* **Authorization header** — `Authorization: Bearer <token>`
* **Query parameter** — `?JWT=<token>`
* **Request body** — `{"JWT": "<token>"}`
* **Cookie / Session** — configurable in plugin settings

## Cross-Origin Resource Sharing[​](#cross-origin-resource-sharing "Direct link to Cross-Origin Resource Sharing")

This API is CORS-enabled in compliance with the [W3C spec](https://www.w3.org/TR/cors/).

All responses include a wildcard `Access-Control-Allow-Origin: *` header, making the API accessible from any browser, SPA, or mobile app.

## Try it out[​](#try-it-out "Direct link to Try it out")

* **Swagger Editor** — paste the spec at [editor.swagger.io](https://editor.swagger.io/)
* **Postman** — import `openapi.yaml` directly for a ready-made collection with local test support

### License

[GPL 3.0](https://github.com/nicumicle/simple-jwt-login/blob/master/LICENSE)
