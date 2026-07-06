# Exchange access\_token for WordPress JWT

## Overview[​](#overview "Direct link to Overview")

This endpoint accepts an Auth0 `access_token` and returns a WordPress JWT. Use this as the final step of the Auth0 OAuth flow to authenticate the user in WordPress.

Enable **Exchange Auth0 access\_token for a WordPress JWT** in **Settings → Simple JWT Login → Integrations → OAuth → Auth0**.

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
    "errorCode": 71
  }
}
```
