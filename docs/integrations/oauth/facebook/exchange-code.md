# Exchange OAuth Code for Facebook Tokens

## Overview[​](#overview "Direct link to Overview")

This endpoint exchanges the `code` returned from Facebook's OAuth flow for Facebook tokens. Use this when your OAuth flow happens in a separate app and you need to obtain the Facebook tokens server-side.

Enable **Exchange Facebook OAuth code for Facebook tokens** in **Settings → Simple JWT Login → Integrations → OAuth → Facebook**.

note

The `redirect_uri` used here must exactly match the one registered in your Facebook app and saved in the plugin settings.

***

## Endpoint[​](#endpoint "Direct link to Endpoint")

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter      | Type                | Description                                                  |
| -------------- | ------------------- | ------------------------------------------------------------ |
| `provider`     | `required` `string` | Set to `facebook`                                            |
| `code`         | `required` `string` | The authorization code received from Facebook                |
| `redirect_uri` | `optional` `string` | Override the redirect URI saved in settings for this request |

***

## Request Example[​](#request-example "Direct link to Request Example")

```
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"facebook","code":"YOUR_FACEBOOK_AUTH_CODE","redirect_uri":"https://your-site.com/callback"}'
```

***

## Response Examples[​](#response-examples "Direct link to Response Examples")

### Success[​](#success "Direct link to Success")

```
{
  "success": true,
  "data": {
    "access_token": "EAABwzLixnjYBO...",
    "token_type": "bearer",
    "expires_in": 5183944
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
