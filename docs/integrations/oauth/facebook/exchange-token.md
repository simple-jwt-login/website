# Exchange access\_token for WordPress JWT

## Overview[​](#overview "Direct link to Overview")

This endpoint accepts a Facebook `access_token` and returns a WordPress JWT. Use this as the final step of the Facebook OAuth flow to authenticate the user in WordPress.

Enable **Exchange Facebook access\_token for a WordPress JWT** in **Settings → Simple JWT Login → Integrations → OAuth → Facebook**.

note

Since version 4.2.0, the `access_token` must have been issued for the Facebook app configured in the plugin (the plugin checks it with Facebook's `debug_token` endpoint), so a token obtained by another app can't log its users in. The **App ID** and **App Secret** must both be set.

Allow tokens issued for other Facebook apps

Turn on **Allow tokens issued for other Facebook apps** (off by default) to keep applications built for versions before 4.2.0 backward compatible: tokens issued for other Facebook apps are accepted again. But then any Facebook app, including one you don't own, can send a token of its users and get a WordPress JWT for the matching account. Turn it on only while you migrate your apps to the configured App ID. See [Backward compatibility](/docs/integrations/oauth.md#backward-compatibility).

***

## Endpoint[​](#endpoint "Direct link to Endpoint")

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter      | Type                | Description                                      |
| -------------- | ------------------- | ------------------------------------------------ |
| `provider`     | `required` `string` | Set to `facebook`                                |
| `access_token` | `required` `string` | The `access_token` from your Facebook OAuth flow |

***

## Request Example[​](#request-example "Direct link to Request Example")

```
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"facebook","access_token":"YOUR_FACEBOOK_ACCESS_TOKEN"}'
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
