# Exchange OAuth authorization code for a WordPress JWT (GET)

```
GET 
/oauth/token
```

Browser-redirect flow: exchanges a provider authorization code for a WordPress session and redirects the browser to the WordPress admin (or login page on failure). The provider must be enabled in the plugin settings.

Supported providers: `google`, `auth0`, `facebook`, `github`.

**Google flow** - pass `provider=google` with `code`.

**Auth0 flow** - pass `provider=auth0` with `code`.

**Facebook flow** - pass `provider=facebook` with `code`.

**GitHub flow** - pass `provider=github` with `code`.

If the OAuth identity matches an existing WordPress user (by email), the user is logged in. If no match is found and "Register on OAuth login" is enabled, a new user is created automatically. On failure the browser is redirected to the WordPress login page.

> **Note**: this endpoint is designed for browser redirect callbacks (OAuth consent screen redirect\_uri). To obtain a JWT programmatically, use `POST /oauth/token` instead.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 403
* 500

Browser redirected to the WordPress admin URL after a successful login, or to the WordPress login page on failure. The response body is empty HTML.

Bad request. The `code` parameter is missing, or the provider slug is unrecognised. (`error_code` 69 for invalid provider slug.)

Forbidden. The requested OAuth provider is not enabled in the plugin settings.

Internal server error.
