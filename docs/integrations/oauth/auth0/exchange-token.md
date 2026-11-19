# Exchange access\_token for WordPress JWT

## Overview[​](#overview "Direct link to Overview")

This endpoint accepts an Auth0 `access_token` and returns a WordPress JWT. Use this as the final step of the Auth0 OAuth flow to authenticate the user in WordPress.

Enable **Exchange Auth0 access\_token for a WordPress JWT** in **Settings → Simple JWT Login → Integrations → OAuth → Auth0**.

note

Since version 4.2.0, the `access_token` must be a JWT issued for the Auth0 **Client ID** configured in the plugin (its `azp` or `aud` claim), so Auth0 tokens are rejected when the Client ID isn't set. Opaque access tokens (Auth0 issues them when no API audience is requested) are rejected with error code `79`.

Allow opaque access tokens

Turn on **Allow opaque access tokens** (off by default) to keep applications built for versions before 4.2.0 backward compatible: opaque access tokens are accepted again. But opaque tokens can't be bound to your Client ID, so any application in your Auth0 tenant, including a third-party or compromised one, can send a token of its users and get a WordPress JWT for the matching account. Prefer requesting an API audience so Auth0 issues JWT access tokens. See [Backward compatibility](/docs/integrations/oauth.md#backward-compatibility).

***

## Endpoint[​](#endpoint "Direct link to Endpoint")

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter      | Type                | Description                                   |
| -------------- | ------------------- | --------------------------------------------- |
| `provider`     | `required` `string` | Set to `auth0`                                |
| `access_token` | `required` `string` | The `access_token` from your Auth0 OAuth flow |

***

## Request Example[​](#request-example "Direct link to Request Example")

```
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"auth0","access_token":"YOUR_AUTH0_ACCESS_TOKEN"}'
```

***

## Response Examples[​](#response-examples "Direct link to Response Examples")

### Success[​](#success "Direct link to Success")

```
{
  "success": true,
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Error[​](#error "Direct link to Error")

```
{
  "success": false,
  "data": {
    "message": "The code or jwt parameter is missing from request.",
    "error_code": 71
  }
}
```
