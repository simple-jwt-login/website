# Exchange OAuth Code for Auth0 Tokens

## Overview[​](#overview "Direct link to Overview")

This endpoint exchanges the `code` returned from Auth0's OAuth flow for Auth0 tokens (`access_token`, `id_token`). Use this when your OAuth flow happens in a separate app and you need to obtain the Auth0 tokens server-side.

Enable **Exchange Auth0 OAuth code for Auth0 tokens** in **Settings → Simple JWT Login → Integrations → OAuth → Auth0**.

note

The `redirect_uri` used here must exactly match the one registered in your Auth0 application and saved in the plugin settings.

***

## Endpoint[​](#endpoint "Direct link to Endpoint")

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter      | Type                | Description                                                  |
| -------------- | ------------------- | ------------------------------------------------------------ |
| `provider`     | `required` `string` | Set to `auth0`                                               |
| `code`         | `required` `string` | The authorization code received from Auth0                   |
| `redirect_uri` | `optional` `string` | Override the redirect URI saved in settings for this request |

***

## Request Example[​](#request-example "Direct link to Request Example")

```
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"auth0","code":"YOUR_AUTH0_AUTH_CODE","redirect_uri":"https://your-site.com/callback"}'
```

***

## Response Examples[​](#response-examples "Direct link to Response Examples")

### Success[​](#success "Direct link to Success")

```
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIs...",
    "id_token": "eyJhbGciOiJSUzI1NiIs...",
    "expires_in": 86400,
    "token_type": "Bearer"
  }
}
```

### Error[​](#error "Direct link to Error")

```
{
  "success": false,
  "data": {
    "message": "The code you provided is invalid.",
    "errorCode": 72
  }
}
```
