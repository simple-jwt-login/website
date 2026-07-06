# Exchange OAuth Code for GitHub Tokens

## Overview[​](#overview "Direct link to Overview")

This endpoint exchanges the `code` returned from GitHub's OAuth flow for GitHub tokens. Use this when your OAuth flow happens in a separate app and you need to obtain the GitHub tokens server-side.

Enable **Exchange GitHub OAuth code for GitHub tokens** in **Settings → Simple JWT Login → Integrations → OAuth → GitHub**.

note

The `redirect_uri` used here must exactly match the one registered in your GitHub OAuth App and saved in the plugin settings.

***

## Endpoint[​](#endpoint "Direct link to Endpoint")

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter      | Type                | Description                                                  |
| -------------- | ------------------- | ------------------------------------------------------------ |
| `provider`     | `required` `string` | Set to `github`                                              |
| `code`         | `required` `string` | The authorization code received from GitHub                  |
| `redirect_uri` | `optional` `string` | Override the redirect URI saved in settings for this request |

***

## Request Example[​](#request-example "Direct link to Request Example")

```
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"github","code":"YOUR_GITHUB_AUTH_CODE","redirect_uri":"https://your-site.com/callback"}'
```

***

## Response Examples[​](#response-examples "Direct link to Response Examples")

### Success[​](#success "Direct link to Success")

```
{
  "success": true,
  "data": {
    "access_token": "gho_16C7e42F292c6912E7710c838347Ae178B4a",
    "token_type": "bearer",
    "scope": "user:email"
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
