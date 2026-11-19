# Endpoints Overview

All endpoints live under the `simple-jwt-login/v1` namespace (configurable in [Route Namespace](/docs/configuration.md#route-namespace)):

```
https://example.com/wp-json/simple-jwt-login/v1/{endpoint}
https://example.com/?rest_route=/simple-jwt-login/v1/{endpoint}
```

info

Every endpoint except `/revoked-tokens` is **disabled by default**. Enable the ones you need in the settings tab listed below. A disabled endpoint returns `403`.

## Tokens[​](#tokens "Direct link to Tokens")

| Method       | Endpoint         | What it does                                      | Enable in                               | Guide                                                      | API                                    |
| ------------ | ---------------- | ------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------- | -------------------------------------- |
| `POST`       | `/auth`          | Exchange email/username + password for a JWT      | Authentication                          | [Authentication](/docs/authentication.md)                  | [Try it](/api/v4/get-jwt.md)           |
| `POST`       | `/auth/refresh`  | Exchange a refresh token for a new JWT            | Refresh Token                           | [Refresh token](/docs/refresh-token.md)                    | [Try it](/api/v4/refresh-jwt.md)       |
| `GET` `POST` | `/auth/validate` | Check a JWT and return its user                   | Validate Token                          | [Validate token](/docs/validate-token.md)                  | [Try it](/api/v4/validate-jwt.md)      |
| `POST`       | `/auth/revoke`   | Invalidate a JWT (logout)                         | Revoke Token                            | [Revoke token](/docs/revoke-token.md)                      | [Try it](/api/v4/revoke-jwt.md)        |
| `POST`       | `/auth/2fa`      | Exchange an interim JWT + 2FA code for a full JWT | Integrations → Third Party → Two-Factor | [Two-Factor](/docs/integrations/third-party/two-factor.md) | [Try it](/api/v4/verify-two-factor.md) |

## Users[​](#users "Direct link to Users")

| Method   | Endpoint               | What it does                                      | Enable in      | Guide                                                                 | API                                                 |
| -------- | ---------------------- | ------------------------------------------------- | -------------- | --------------------------------------------------------------------- | --------------------------------------------------- |
| `GET`    | `/autologin`           | Log a user into WordPress with a JWT and redirect | Autologin      | [Autologin](/docs/autologin.md)                                       | [Try it](/api/v4/autologin.md)                      |
| `POST`   | `/users`               | Register a new WordPress user                     | Register User  | [Register user](/docs/register-user.md)                               | [Try it](/api/v4/register-a-new-word-press-user.md) |
| `DELETE` | `/users`               | Delete the user identified by the JWT             | Delete User    | [Delete user](/docs/delete-user.md)                                   | [Try it](/api/v4/delete-user.md)                    |
| `POST`   | `/user/reset_password` | Send a password reset code by email               | Reset Password | [Reset password](/docs/reset-password.md#step-1---request-reset-code) | [Try it](/api/v4/send-reset-password-code.md)       |
| `PUT`    | `/user/reset_password` | Set a new password with a reset code or a JWT     | Reset Password | [Reset password](/docs/reset-password.md#step-2---set-new-password)   | [Try it](/api/v4/change-user-password.md)           |

## OAuth (social login)[​](#oauth-social-login "Direct link to OAuth (social login)")

| Method       | Endpoint       | What it does                                                                                                                       | Enable in            | Guide                                | API                                   |
| ------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------ | ------------------------------------- |
| `GET` `POST` | `/oauth/token` | Exchange a Google, Auth0, Facebook, or GitHub code or token for a WordPress JWT. Select the provider with the `provider` parameter | Integrations → OAuth | [OAuth](/docs/integrations/oauth.md) | [Try it](/api/v4/oauth-token-post.md) |

## Administration[​](#administration "Direct link to Administration")

These endpoints need a logged-in WordPress user: a session cookie with an `X-WP-Nonce` header, or a JWT in the `Authorization` header or the JWT cookie (not in the query string).

| Method   | Endpoint                | What it does                            | Enable in        | Guide                                                              | API                                 |
| -------- | ----------------------- | --------------------------------------- | ---------------- | ------------------------------------------------------------------ | ----------------------------------- |
| `GET`    | `/api-keys`             | List API keys                           | API Keys         | [API keys](/docs/api-keys.md#list-api-keys)                        | [Try it](/api/v4/list-api-keys.md)  |
| `POST`   | `/api-keys`             | Create an API key                       | API Keys         | [API keys](/docs/api-keys.md#create-an-api-key)                    | [Try it](/api/v4/create-api-key.md) |
| `PUT`    | `/api-keys/{id}`        | Update an API key                       | API Keys         | [API keys](/docs/api-keys.md#update-an-api-key)                    | [Try it](/api/v4/update-api-key.md) |
| `POST`   | `/api-keys/{id}/revoke` | Revoke an API key                       | API Keys         | [API keys](/docs/api-keys.md#revoke-an-api-key)                    | [Try it](/api/v4/revoke-api-key.md) |
| `DELETE` | `/api-keys/{id}`        | Permanently delete an API key           | API Keys         | [API keys](/docs/api-keys.md#permanently-delete-an-api-key)        | [Try it](/api/v4/delete-api-key.md) |
| `GET`    | `/revoked-tokens`       | List revoked JWTs (administrators only) | Always available | [Revoke token](/docs/revoke-token.md#list-revoked-tokens)          | -                                   |
| `DELETE` | `/revoked-tokens/{id}`  | Un-revoke a JWT (administrators only)   | Always available | [Revoke token](/docs/revoke-token.md#delete-a-revoked-token-entry) | -                                   |

## Your own and WordPress endpoints[​](#your-own-and-wordpress-endpoints "Direct link to Your own and WordPress endpoints")

Simple JWT Login can also authenticate requests to **any** REST route (`/wp/v2/*`, WooCommerce, your custom routes):

* [JWT Middleware](/docs/configuration.md#jwt-middleware-for-all-wordpress-endpoints) - a valid JWT logs the request in as its user.
* [Protect Endpoints](/docs/protect-endpoints.md) - require a JWT, or specific roles, for chosen routes.
* [WPGraphQL](/docs/integrations/third-party/wpgraphql.md) - the same JWT works on `/graphql`.

## Common to all endpoints[​](#common-to-all-endpoints "Direct link to Common to all endpoints")

* **Sending the JWT** - `Authorization: Bearer <jwt>` header (recommended), or the `JWT` query/body parameter, cookie, or session. See [JWT Input Sources](/docs/configuration.md#jwt-input-sources).
* **Sending parameters** - JSON body, form data, or query string. See [Request Parameters](/docs/configuration.md#request-parameters).
* **Auth codes** - most endpoints can additionally require an auth code (`AUTH_KEY` parameter). See [Auth Codes](/docs/auth-codes.md).
* **Errors** - `{"success": false, "data": {"message": "...", "error_code": 48}}`. See [Error codes](/docs/error-codes.md).
* **Browser clients** - enable [CORS](/docs/cors.md).
