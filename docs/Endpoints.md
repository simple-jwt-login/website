---
slug: /endpoints/
title: Endpoints Overview
description: Every Simple JWT Login REST endpoint on one page - method, path, the setting that enables it, and links to the guide and the API reference.
keywords: [Simple JWT Login endpoints, WordPress JWT REST API routes, simple-jwt-login/v1, JWT auth endpoint WordPress, REST API reference]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

All endpoints live under the `simple-jwt-login/v1` namespace (configurable in [Route Namespace](./Configuration.mdx#route-namespace)):

```
https://example.com/wp-json/simple-jwt-login/v1/{endpoint}
https://example.com/?rest_route=/simple-jwt-login/v1/{endpoint}
```

:::info
Every endpoint except `/revoked-tokens` is **disabled by default**. Enable the ones you need in the settings tab listed below. A disabled endpoint returns `403`.
:::

## Tokens

| Method | Endpoint | What it does | Enable in | Guide | API |
| :----- | :------- | :----------- | :-------- | :---- | :-- |
| `POST` | `/auth` | Exchange email/username + password for a JWT | Authentication | [Authentication](./auth/Authentication.md) | [Try it](/api/v4/get-jwt) |
| `POST` | `/auth/refresh` | Exchange a refresh token for a new JWT | Refresh Token | [Refresh token](./auth/RefreshToken.md) | [Try it](/api/v4/refresh-jwt) |
| `GET` `POST` | `/auth/validate` | Check a JWT and return its user | Validate Token | [Validate token](./auth/ValidateToken.md) | [Try it](/api/v4/validate-jwt) |
| `POST` | `/auth/revoke` | Invalidate a JWT (logout) | Revoke Token | [Revoke token](./auth/RevokeToken.md) | [Try it](/api/v4/revoke-jwt) |
| `POST` | `/auth/2fa` | Exchange an interim JWT + 2FA code for a full JWT | Integrations → Third Party → Two-Factor | [Two-Factor](./integrations/ThirdParty/02_TwoFactor.md) | [Try it](/api/v4/verify-two-factor) |

## Users

| Method | Endpoint | What it does | Enable in | Guide | API |
| :----- | :------- | :----------- | :-------- | :---- | :-- |
| `GET` | `/autologin` | Log a user into WordPress with a JWT and redirect | Autologin | [Autologin](./Login-User.md) | [Try it](/api/v4/autologin) |
| `POST` | `/users` | Register a new WordPress user | Register User | [Register user](./Register-User.md) | [Try it](/api/v4/register-a-new-word-press-user) |
| `DELETE` | `/users` | Delete the user identified by the JWT | Delete User | [Delete user](./Delete-User.md) | [Try it](/api/v4/delete-user) |
| `POST` | `/user/reset_password` | Send a password reset code by email | Reset Password | [Reset password](./Reset-Password.md#step-1---request-reset-code) | [Try it](/api/v4/send-reset-password-code) |
| `PUT` | `/user/reset_password` | Set a new password with a reset code or a JWT | Reset Password | [Reset password](./Reset-Password.md#step-2---set-new-password) | [Try it](/api/v4/change-user-password) |

## OAuth (social login)

| Method | Endpoint | What it does | Enable in | Guide | API |
| :----- | :------- | :----------- | :-------- | :---- | :-- |
| `GET` `POST` | `/oauth/token` | Exchange a Google, Auth0, Facebook, or GitHub code or token for a WordPress JWT. Select the provider with the `provider` parameter | Integrations → OAuth | [OAuth](./integrations/OAuth/index.md) | [Try it](/api/v4/oauth-token-post) |

## Administration

These endpoints need a logged-in WordPress user: a session cookie with an `X-WP-Nonce` header, or a JWT in the `Authorization` header or the JWT cookie (not in the query string).

| Method | Endpoint | What it does | Enable in | Guide | API |
| :----- | :------- | :----------- | :-------- | :---- | :-- |
| `GET` | `/api-keys` | List API keys | API Keys | [API keys](./API-Keys.md#list-api-keys) | [Try it](/api/v4/list-api-keys) |
| `POST` | `/api-keys` | Create an API key | API Keys | [API keys](./API-Keys.md#create-an-api-key) | [Try it](/api/v4/create-api-key) |
| `PUT` | `/api-keys/{id}` | Update an API key | API Keys | [API keys](./API-Keys.md#update-an-api-key) | [Try it](/api/v4/update-api-key) |
| `POST` | `/api-keys/{id}/revoke` | Revoke an API key | API Keys | [API keys](./API-Keys.md#revoke-an-api-key) | [Try it](/api/v4/revoke-api-key) |
| `DELETE` | `/api-keys/{id}` | Permanently delete an API key | API Keys | [API keys](./API-Keys.md#permanently-delete-an-api-key) | [Try it](/api/v4/delete-api-key) |
| `GET` | `/revoked-tokens` | List revoked JWTs (administrators only) | Always available | [Revoke token](./auth/RevokeToken.md#list-revoked-tokens) | - |
| `DELETE` | `/revoked-tokens/{id}` | Un-revoke a JWT (administrators only) | Always available | [Revoke token](./auth/RevokeToken.md#delete-a-revoked-token-entry) | - |

## Your own and WordPress endpoints

Simple JWT Login can also authenticate requests to **any** REST route (`/wp/v2/*`, WooCommerce, your custom routes):

- [JWT Middleware](./Configuration.mdx#jwt-middleware-for-all-wordpress-endpoints) - a valid JWT logs the request in as its user.
- [Protect Endpoints](./Protect-Endpoints.md) - require a JWT, or specific roles, for chosen routes.
- [WPGraphQL](./integrations/ThirdParty/01_WPGraphQL.md) - the same JWT works on `/graphql`.

## Common to all endpoints

- **Sending the JWT** - `Authorization: Bearer <jwt>` header (recommended), or the `JWT` query/body parameter, cookie, or session. See [JWT Input Sources](./Configuration.mdx#jwt-input-sources).
- **Sending parameters** - JSON body, form data, or query string. See [Request Parameters](./Configuration.mdx#request-parameters).
- **Auth codes** - most endpoints can additionally require an auth code (`AUTH_KEY` parameter). See [Auth Codes](./Auth-Codes.md).
- **Errors** - `{"success": false, "data": {"message": "...", "error_code": 48}}`. See [Error codes](./Error-Codes.md).
- **Browser clients** - enable [CORS](./Cors.md).
