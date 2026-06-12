---
slug: /integrations/oauth/
title: OAuth
sidebar_position: 1
description: Connect Simple JWT Login with Google, Auth0, Facebook, and GitHub OAuth 2.0 providers. Let users sign in with their existing accounts and exchange provider tokens for WordPress JWTs.
keywords: [WordPress OAuth, Google login WordPress, Auth0 WordPress, Facebook login WordPress, GitHub OAuth WordPress, social login JWT, OAuth 2.0 WordPress plugin]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Simple JWT Login supports OAuth 2.0 authentication with four providers: **Google**, **Auth0**, **Facebook**, and **GitHub**. When configured, users can sign in with their existing provider accounts and receive a WordPress JWT in return.

Configure OAuth under **Settings → Simple JWT Login → Integrations → OAuth**.

---

## Login Page Button Layout

Controls how the "Continue with..." buttons are displayed on the WordPress login and registration page.

| Option | Description |
| :----- | :---------- |
| **Stacked** | One full-width button per provider, stacked vertically |
| **Side by side** | All buttons in a single row |
| **Icons stacked** | Icon-only buttons, one per line |
| **Icons side by side** | Icon-only buttons in a single row |

---

## OAuth Providers

Each provider panel has the same structure: enable/disable toggle, credentials, optional login page button, and token exchange endpoints.

### Shared options (all providers)

#### Enable

Toggle the provider on or off. When disabled, the provider's endpoints return errors.

#### OAuth on Login / Register

When enabled, a "Continue with [Provider]" button appears on the WordPress login and registration page. To make the OAuth redirect work, you must register the **Redirect URI** shown in the settings panel into the provider's developer console:

```
https://example.com/?rest_route=/simple-jwt-login/v1/oauth/token&provider={provider}
```

#### Allow usage on all endpoints

When enabled, a valid provider token can authenticate requests to any WordPress REST endpoint (not just Simple JWT Login routes). The plugin looks up the WordPress user by the email address returned by the provider. Requires "All WordPress endpoints check for JWT authentication" to also be enabled in **General** settings.

#### Create user if not exists

When enabled, the plugin automatically creates a new WordPress user if no account is found matching the email from the provider. New users receive the default role configured in the **Register** settings.

---

## Google

Credentials from the [Google Cloud Console](https://console.cloud.google.com/).

| Field | Description |
| :---- | :---------- |
| **Client ID** | Required. The OAuth 2.0 client ID. |
| **Client Secret** | Required. The OAuth 2.0 client secret. |

### Exchange Google OAuth code for Google id_token

Enable to allow clients to submit the `code` returned from Google's OAuth flow and receive a Google `id_token` in return.

**Redirect URI** - Pre-configure the redirect URI used during the code exchange. This stored value is sent to Google when exchanging the code. You can also override it per-request via the `redirect_uri` parameter.

**Endpoint:** `POST /simple-jwt-login/v1/oauth/token`

| Parameter | Description |
| :-------- | :---------- |
| `provider` | `google` |
| `code` | The authorization code received from Google |
| `redirect_uri` | *(optional)* Override the redirect URI saved in settings for this request |

### Exchange Google id_token for a WordPress JWT

Enable to allow clients to submit a Google `id_token` and receive a WordPress JWT.

**Endpoint:** `POST /simple-jwt-login/v1/oauth/token`

| Parameter | Description |
| :-------- | :---------- |
| `provider` | `google` |
| `id_token` | The Google id_token from your OAuth flow |

**Example:**

```bash
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"google","id_token":"YOUR_GOOGLE_ID_TOKEN"}'
```

---

## Auth0

Credentials from the [Auth0 Dashboard](https://manage.auth0.com/).

| Field | Description |
| :---- | :---------- |
| **Domain** | Required. Your Auth0 tenant domain, e.g. `your-tenant.auth0.com`. |
| **Client ID** | Required. The application Client ID. |
| **Client Secret** | Required. The application Client Secret. |

### Exchange Auth0 OAuth code for Auth0 tokens

Enable to allow clients to submit the authorization `code` from Auth0's OAuth flow and receive Auth0 tokens.

**Redirect URI** - Pre-configure the redirect URI used during the code exchange. This stored value is sent to Auth0 when exchanging the code. You can also override it per-request via the `redirect_uri` parameter.

**Endpoint:** `POST /simple-jwt-login/v1/oauth/token`

| Parameter | Description |
| :-------- | :---------- |
| `provider` | `auth0` |
| `code` | The authorization code received from Auth0 |
| `redirect_uri` | *(optional)* Override the redirect URI saved in settings for this request |

### Exchange Auth0 access_token for a WordPress JWT

Enable to allow clients to submit an Auth0 `access_token` and receive a WordPress JWT.

**Endpoint:** `POST /simple-jwt-login/v1/oauth/token`

| Parameter | Description |
| :-------- | :---------- |
| `provider` | `auth0` |
| `access_token` | The access_token from your Auth0 OAuth process |

**Example:**

```bash
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"auth0","access_token":"YOUR_AUTH0_ACCESS_TOKEN"}'
```

---

## Facebook

Credentials from the [Meta for Developers](https://developers.facebook.com/) console.

| Field | Description |
| :---- | :---------- |
| **App ID** | Required. The Facebook App ID. |
| **App Secret** | Required. The Facebook App Secret. |

### Exchange Facebook OAuth code for Facebook tokens

Enable to allow clients to submit the authorization `code` from Facebook's OAuth flow and receive Facebook tokens.

**Redirect URI** - Pre-configure the redirect URI used during the code exchange. This stored value is sent to Facebook when exchanging the code. You can also override it per-request via the `redirect_uri` parameter.

**Endpoint:** `POST /simple-jwt-login/v1/oauth/token`

| Parameter | Description |
| :-------- | :---------- |
| `provider` | `facebook` |
| `code` | The authorization code received from Facebook |
| `redirect_uri` | *(optional)* Override the redirect URI saved in settings for this request |

### Exchange Facebook access_token for a WordPress JWT

Enable to allow clients to submit a Facebook `access_token` and receive a WordPress JWT.

**Endpoint:** `POST /simple-jwt-login/v1/oauth/token`

| Parameter | Description |
| :-------- | :---------- |
| `provider` | `facebook` |
| `access_token` | The access_token from your Facebook OAuth process |

**Example:**

```bash
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"facebook","access_token":"YOUR_FACEBOOK_ACCESS_TOKEN"}'
```

---

## GitHub

Credentials from [GitHub Developer Settings](https://github.com/settings/developers).

| Field | Description |
| :---- | :---------- |
| **Client ID** | Required. The OAuth App Client ID. |
| **Client Secret** | Required. The OAuth App Client Secret. |

### Exchange GitHub OAuth code for GitHub tokens

Enable to allow clients to submit the authorization `code` from GitHub's OAuth flow and receive GitHub tokens.

**Redirect URI** - Pre-configure the redirect URI used during the code exchange. This stored value is sent to GitHub when exchanging the code. You can also override it per-request via the `redirect_uri` parameter.

**Endpoint:** `POST /simple-jwt-login/v1/oauth/token`

| Parameter | Description |
| :-------- | :---------- |
| `provider` | `github` |
| `code` | The authorization code received from GitHub |
| `redirect_uri` | *(optional)* Override the redirect URI saved in settings for this request |

### Exchange GitHub access_token for a WordPress JWT

Enable to allow clients to submit a GitHub `access_token` and receive a WordPress JWT.

**Endpoint:** `POST /simple-jwt-login/v1/oauth/token`

| Parameter | Description |
| :-------- | :---------- |
| `provider` | `github` |
| `access_token` | The access_token from your GitHub OAuth process |

**Example:**

```bash
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"github","access_token":"YOUR_GITHUB_ACCESS_TOKEN"}'
```

---

## Typical OAuth flow

The full browser-based OAuth flow for any provider looks like this:

1. User clicks "Continue with [Provider]" on your login page.
2. They are redirected to the provider's authorization page.
3. After authorization, the provider redirects back to your site's callback URI (`/simple-jwt-login/v1/oauth/token?provider=...&code=...`).
4. Simple JWT Login exchanges the `code` for a provider token, then verifies the user's email.
5. If a matching WordPress user exists (or `Create user if not exists` is on), a WordPress JWT is issued.
6. The user is logged in to WordPress.

For headless setups (no browser redirect), skip steps 1-3 and call the token exchange endpoint directly with the provider token your client already obtained.
