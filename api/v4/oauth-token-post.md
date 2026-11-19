# Exchange OAuth token for a WordPress JWT (POST)

```
POST 
/oauth/token
```

API flow: exchanges a provider-issued token for a WordPress JWT and returns the WordPress user profile. Use this variant for programmatic API clients. The provider must be enabled in the plugin settings.

Supported providers: `google`, `auth0`, `facebook`, `github`.

**Google** - supply `code` (authorization code) or `id_token` (Google Sign-In ID token). The `id_token` path returns a WordPress JWT directly; the `code` path returns the raw Google token response for the client to handle. The `id_token` must be issued for the configured client ID (unless "Allow tokens issued for other Google clients" is enabled in the Google settings) and carry a verified email.

**Auth0** - supply `code` (returns the raw Auth0 token response) or `access_token` (returns a WordPress JWT). The `access_token` must be a JWT issued for the configured Auth0 Client ID (`azp` or `aud`). Opaque access tokens are rejected (error code 79) unless "Allow opaque access tokens" is enabled in the Auth0 settings. The account email must be verified.

The `code` flow sends the provider the "exchange code" Redirect URI saved in the provider settings, so the code must have been issued for that URI.

**Facebook** - supply `access_token` (Facebook user access token). Returns a WordPress JWT. The token must have been issued for the configured Facebook app (checked with `debug_token`), and the App ID and App Secret must be set, unless "Allow tokens issued for other Facebook apps" is enabled in the Facebook settings.

**GitHub** - supply `access_token` (GitHub user access token). Returns a WordPress JWT. The token must have been issued for the configured GitHub OAuth app (personal access tokens are rejected), and the Client ID and Client Secret must be set, unless "Allow tokens issued for other GitHub apps" is enabled in the GitHub settings.

If the OAuth identity matches an existing WordPress user (by email), a WordPress JWT is returned. If no match is found and "Register on OAuth login" is enabled, a new user is created automatically.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 404
* 422
* 500

One of:

* `id_token` / `access_token` flow: a WordPress JWT, or a 2FA challenge (`two_factor_required: true`, finish with `POST /auth/2fa`) when the user has Two-Factor enabled and the 2FA integration is on.
* `code` flow: the raw token response of the provider, unchanged.

The WordPress JWT could not be signed (JWT library error, for example, `error_code` 16).

Unauthorized. One of:

* The authorization code was rejected by the provider (`error_code` 72 Google, 78 Auth0, 98 Facebook, 102 GitHub). The provider error is appended to the message.
* The `id_token` / `access_token` is invalid, expired, or issued by another issuer or for another application (`error_code` 73 Google, 79 Auth0, 99 Facebook, 103 GitHub).
* The Google `id_token` was issued for another client ID (`error_code` 118).

Forbidden. One of:

* The requested OAuth provider is not enabled in the plugin settings (`error_code` 70).
* The account email is not verified, for Auth0 (`error_code` 111), GitHub (`error_code` 112), Google `id_token` (`error_code` 119).

The identity email matches no WordPress user and "Register on OAuth login" is off (`error_code` 74 Google, 80 Auth0, 100 Facebook, 104 GitHub).

Unprocessable entity. One of:

* `provider` is missing or unknown (`error_code` 69).
* Neither `code` nor the token parameter was sent (`error_code` 71 Google, 77 Auth0, 97 Facebook, 101 GitHub).

Internal server error. One of:

* The 2FA nonce could not be created (`error_code` 133).
* The new user could not be created (`error_code` 52).
