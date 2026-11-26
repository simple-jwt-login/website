---
slug: /integrations/oauth/auth0/exchange-code
title: Exchange an Auth0 OAuth Code for Tokens
sidebar_label: Exchange OAuth Code for Auth0 Tokens
description: Exchange an Auth0 OAuth authorization code for Auth0 tokens through the WordPress REST API - endpoint, parameters, curl request, and responses.
keywords: [Auth0 OAuth code exchange, Auth0 authorization code, Auth0 access_token, Auth0 OAuth WordPress REST API]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Overview

This endpoint exchanges the `code` returned from Auth0's OAuth flow for Auth0 tokens (`access_token`, `id_token`). Use this when your OAuth flow happens in a separate app and you need to obtain the Auth0 tokens server-side.

Enable **Exchange Auth0 OAuth code for Auth0 tokens** in **Settings → Simple JWT Login → Integrations → OAuth → Auth0**.

:::note
The `redirect_uri` used here must exactly match the one registered in your Auth0 application and saved in the plugin settings.
:::

---

## Endpoint

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `provider` | `required` `string` | Set to `auth0` |
| `code` | `required` `string` | The authorization code received from Auth0 |
| `redirect_uri` | `optional` `string` | Override the redirect URI saved in settings for this request |

---

## Request Example

```bash
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"auth0","code":"YOUR_AUTH0_AUTH_CODE","redirect_uri":"https://your-site.com/callback"}'
```

---

## Response Examples

### Success

```json
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

### Error

```json
{
  "success": false,
  "data": {
    "message": "The code you provided is invalid.",
    "error_code": 72
  }
}
```

## Next steps

- [Exchange the Auth0 token for a WordPress JWT](./03_Exchange_Token.md)
- [Check the Auth0 OAuth setup](./01_Setup.md)
