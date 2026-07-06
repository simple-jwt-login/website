# Exchange access\_token for WordPress JWT

## Overview[​](#overview "Direct link to Overview")

This endpoint accepts a GitHub `access_token` and returns a WordPress JWT. Use this as the final step of the GitHub OAuth flow to authenticate the user in WordPress.

Enable **Exchange GitHub access\_token for a WordPress JWT** in **Settings → Simple JWT Login → Integrations → OAuth → GitHub**.

***

## Endpoint[​](#endpoint "Direct link to Endpoint")

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter      | Type                | Description                                    |
| -------------- | ------------------- | ---------------------------------------------- |
| `provider`     | `required` `string` | Set to `github`                                |
| `access_token` | `required` `string` | The `access_token` from your GitHub OAuth flow |

***

## Request Example[​](#request-example "Direct link to Request Example")

```
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"github","access_token":"YOUR_GITHUB_ACCESS_TOKEN"}'
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
