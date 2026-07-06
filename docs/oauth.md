# OAuth

The OAuth endpoint lets users authenticate with a third-party provider (Google or Auth0) and receive a signed WordPress JWT - no WordPress password required. The plugin exchanges the provider-issued authorization code or ID token for a matching WordPress user, and returns a JWT that can be used in all subsequent API calls.

Supported providers:

* **Google** - via authorization code (server-side flow) or ID token (Sign In With Google)
* **Auth0** - via authorization code

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

![OAuth Applications overview](/assets/images/oauth-applications-ec070789eef042ff44f165d00c451c83.png)

1. Enable OAuth for the desired provider under **Settings → Simple JWT Login → Applications**.
2. Configure the provider's **Client ID**, **Client Secret**, and (for the code exchange flow) **Redirect URI** to match what you registered in the provider's developer console.
3. Optionally enable **"Register user if not found"** to automatically create a WordPress account when the OAuth email does not match any existing user.

API Reference

Explore and test this endpoint using the [interactive API reference →](/api/v4/oauth-token-get.md)

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHODS**: `GET` or `POST`

**ENDPOINT**: `/simple-jwt-login/v1/oauth/token`

**URL Example (GET)**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/oauth/token&provider=google&code={{AUTHORIZATION_CODE}}`

### Parameters[​](#parameters "Direct link to Parameters")

| Parameter   | Type                   | Description                                                                                                             |
| ----------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `provider`  | `required` `string`    | OAuth provider slug. Accepted values: `google`, `auth0`.                                                                |
| `code`      | `conditional` `string` | Authorization code returned by the provider's OAuth consent screen. Required for the code exchange flow.                |
| `id_token`  | `conditional` `string` | Google ID token from Sign In With Google. Google provider only. Either `code` or `id_token` must be present for Google. |
| `AUTH_CODE` | `optional` `string`    | Auth Code from the "Auth codes" section. Required only when "Authentication Requires Auth Code" is enabled.             |

Parameters can be sent as query params (`GET`) or in the request body (`POST`).

## Request (POST)[​](#request-post "Direct link to Request (POST)")

```
{
  "provider": "google",
  "code": "4/0AfJohXmX...",
  "AUTH_CODE": "MySecretAuthCode"
}
```

Or using a Google ID token instead of a code:

```
{
  "provider": "google",
  "id_token": "eyJhbGci..."
}
```

## Responses[​](#responses "Direct link to Responses")

### 200[​](#200 "Direct link to 200")

```
{
  "success": true,
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "ID": 1,
      "user_login": "myuser",
      "user_email": "myuser@example.com",
      "display_name": "My User"
    }
  }
}
```

### 400 - Missing parameters[​](#400---missing-parameters "Direct link to 400 - Missing parameters")

```
{
  "success": false,
  "data": {
    "message": "The code or id_token parameter is missing from request.",
    "errorCode": 71
  }
}
```

### 401 - Invalid code or token[​](#401---invalid-code-or-token "Direct link to 401 - Invalid code or token")

```
{
  "success": false,
  "data": {
    "message": "The code you provided is invalid.",
    "errorCode": 72
  }
}
```

### 403 - Provider not enabled[​](#403---provider-not-enabled "Direct link to 403 - Provider not enabled")

```
{
  "success": false,
  "data": {
    "message": "This Oauth provider is not available.",
    "errorCode": 70
  }
}
```

### 404 - User not found[​](#404---user-not-found "Direct link to 404 - User not found")

```
{
  "success": false,
  "data": {
    "message": "User not found.",
    "errorCode": 74
  }
}
```

## Examples[​](#examples "Direct link to Examples")

### SHELL - Google code exchange[​](#shell---google-code-exchange "Direct link to SHELL - Google code exchange")

```
curl -X POST 'https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/oauth/token' \
  -H "Content-Type: application/json" \
  -d '{"provider":"google","code":"4/0AfJohXmX..."}'
```

### SHELL - Google ID token (Sign In With Google)[​](#shell---google-id-token-sign-in-with-google "Direct link to SHELL - Google ID token (Sign In With Google)")

```
curl -X POST 'https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/oauth/token' \
  -H "Content-Type: application/json" \
  -d '{"provider":"google","id_token":"eyJhbGci..."}'
```

### JavaScript - Google code exchange (POST preferred)[​](#javascript---google-code-exchange-post-preferred "Direct link to JavaScript - Google code exchange (POST preferred)")

```
const response = await fetch(
  'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/oauth/token',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider: 'google', code: authorizationCode }),
  }
);
const { data } = await response.json();
const jwt = data.jwt;
```

### SHELL - Auth0 code exchange[​](#shell---auth0-code-exchange "Direct link to SHELL - Auth0 code exchange")

```
curl -X POST 'https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/oauth/token' \
  -H "Content-Type: application/json" \
  -d '{"provider":"auth0","code":"AUTH0_AUTHORIZATION_CODE"}'
```

***

## Features[​](#features "Direct link to Features")

### Google - two authentication paths[​](#google---two-authentication-paths "Direct link to Google - two authentication paths")

![Google OAuth configuration](data:image/png;base64,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)

**Code exchange (server-side flow)**

The standard OAuth 2.0 authorization-code flow. Your front-end redirects the user to Google's consent screen with your Client ID and Redirect URI. Google returns a short-lived `code` to your redirect URI, which you pass to this endpoint. The plugin exchanges it for a Google ID token, extracts the email, and issues a WordPress JWT.

Requires: **Client ID**, **Client Secret**, and **Redirect URI** configured in plugin settings.

**ID token (Sign In With Google)**

The Google Identity Services library running in the browser can produce an `id_token` directly (no server-side code exchange needed). Pass the token to this endpoint as `id_token`. The plugin validates it against Google's tokeninfo endpoint and issues a WordPress JWT.

Requires: only the **Client ID** (no secret needed).

![Exchange Google ID token for WordPress JWT](/assets/images/exchange-google-idtoken-for-a-wordpress-jwt-2d5965a501e739f01bbf8eecf2343801.png)

### Auth0 - authorization code flow[​](#auth0---authorization-code-flow "Direct link to Auth0 - authorization code flow")

Your front-end redirects the user to Auth0's Universal Login. Auth0 returns an authorization `code` to your callback URL. Pass that code to this endpoint. The plugin exchanges it for an Auth0 token, extracts the user's email, and issues a WordPress JWT.

Requires: **Client ID**, **Client Secret**, and **Redirect URI** configured in plugin settings.

### Auto-register on first login[​](#auto-register-on-first-login "Direct link to Auto-register on first login")

![OAuth on Login / Register](/assets/images/oauth-on-login--register-913f2c5713fec154bf0fc8671bb7c754.png)

Enable **"Register user if not found"** in the provider settings. When the OAuth email address does not match any existing WordPress user, the plugin automatically creates a new account with the default role configured in Register Settings and returns a JWT for that new user.

When this option is disabled and no matching user exists, the endpoint returns a 404 error.

### Use `POST` to keep tokens out of logs[​](#use-post-to-keep-tokens-out-of-logs "Direct link to use-post-to-keep-tokens-out-of-logs")

The `GET` method appends the authorization code and other parameters to the URL, which may appear in server access logs and browser history. Use `POST` (with parameters in the JSON body) for production flows to avoid leaking short-lived codes.

***

## FAQ[​](#faq "Direct link to FAQ")

### Can I use OAuth without enabling JWT authentication?[​](#can-i-use-oauth-without-enabling-jwt-authentication "Direct link to Can I use OAuth without enabling JWT authentication?")

No. The OAuth endpoint is part of the Simple JWT Login plugin. It requires the plugin's JWT configuration (secret key, algorithm, payload options) to be set up, since the response always includes a signed WordPress JWT.

### What happens if the OAuth code has already been used?[​](#what-happens-if-the-oauth-code-has-already-been-used "Direct link to What happens if the OAuth code has already been used?")

Authorization codes are single-use. Sending a previously redeemed code returns a 401 error from the provider. Direct the user through the OAuth consent screen again to obtain a fresh code.

### Do I need to set up a Redirect URI for the ID token flow?[​](#do-i-need-to-set-up-a-redirect-uri-for-the-id-token-flow "Direct link to Do I need to set up a Redirect URI for the ID token flow?")

No. When using `id_token` with Google Sign In With Google, no redirect URI or client secret is needed. Only the Client ID is required in the plugin settings.
