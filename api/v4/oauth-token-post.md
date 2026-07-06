# Exchange OAuth token for a WordPress JWT (POST)

```
POST 
/oauth/token
```

API flow: exchanges a provider-issued token for a WordPress JWT and returns the WordPress user profile. Use this variant for programmatic API clients. The provider must be enabled in the plugin settings.

Supported providers: `google`, `auth0`, `facebook`, `github`.

**Google** - supply `code` (authorization code) or `id_token` (Google Sign-In ID token). The `id_token` path returns a WordPress JWT directly; the `code` path returns the raw Google token response for the client to handle.

**Auth0** - supply `code` (authorization code).

**Facebook** - supply `access_token` (Facebook user access token). Returns a WordPress JWT.

**GitHub** - supply `access_token` (GitHub user access token). Returns a WordPress JWT.

If the OAuth identity matches an existing WordPress user (by email), a WordPress JWT is returned. If no match is found and "Register on OAuth login" is enabled, a new user is created automatically.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 404
* 500

OAuth login successful. Returns the WordPress user and a JWT.

Bad request. One of:

* The `provider` slug is unrecognised (`error_code` 69).
* Required parameters are missing - `code` for Google/Auth0/Facebook/GitHub, or `id_token` for Google, or `access_token` for Facebook/GitHub (`error_code` 71 Google, 75 Auth0, 97 Facebook, 101 GitHub).
* The authorization code or access token was rejected by the provider (`error_code` 72 Google code, 79 Auth0 code, 98 Facebook code, 102 GitHub code; or 73 Google id\_token, 80 Auth0 token, 99 Facebook token, 103 GitHub token).
* The OAuth identity email did not match any WordPress user and auto-register is disabled - Facebook (`error_code` 100) or GitHub (`error_code` 104).

Unauthorized. The Google `id_token` or Auth0 token is invalid or rejected by the provider (`error_code` 73, 80).

Forbidden. The requested OAuth provider is not enabled in the plugin settings.

The Google or Auth0 identity email does not match any WordPress user and automatic registration is disabled (`error_code` 74 Google, 78 Auth0).

Internal server error.
