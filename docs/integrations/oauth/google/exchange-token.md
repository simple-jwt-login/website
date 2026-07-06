# Exchange id\_token for WordPress JWT

## Overview[​](#overview "Direct link to Overview")

This endpoint accepts a Google `id_token` and returns a WordPress JWT. Use this as the final step of the Google OAuth flow to authenticate the user in WordPress.

Enable **Exchange Google id\_token for a WordPress JWT** in **Settings → Simple JWT Login → Integrations → OAuth → Google**.

![Exchange Google id\_token for a WordPress JWT](/assets/images/exchange-google-idtoken-for-a-wordpress-jwt-2d5965a501e739f01bbf8eecf2343801.png)

***

## Endpoint[​](#endpoint "Direct link to Endpoint")

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter  | Type                | Description                                |
| ---------- | ------------------- | ------------------------------------------ |
| `provider` | `required` `string` | Set to `google`                            |
| `id_token` | `required` `string` | The Google `id_token` from your OAuth flow |

***

## Request Example[​](#request-example "Direct link to Request Example")

```
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"google","id_token":"YOUR_GOOGLE_ID_TOKEN"}'
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
