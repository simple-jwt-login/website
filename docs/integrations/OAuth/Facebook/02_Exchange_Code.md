---
slug: /integrations/oauth/facebook/exchange-code
title: Exchange a Facebook OAuth Code for Tokens
sidebar_label: Exchange OAuth Code for Facebook Tokens
description: Exchange a Facebook OAuth authorization code for Facebook tokens through the WordPress REST API - endpoint, parameters, curl request, and responses.
keywords: [Facebook OAuth code exchange, Facebook authorization code, Facebook access_token, Facebook OAuth WordPress REST API]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Overview

This endpoint exchanges the `code` returned from Facebook's OAuth flow for Facebook tokens. Use this when your OAuth flow happens in a separate app and you need to obtain the Facebook tokens server-side.

Enable **Exchange Facebook OAuth code for Facebook tokens** in **Settings → Simple JWT Login → Integrations → OAuth → Facebook**.

:::note
The `redirect_uri` used here must exactly match the one registered in your Facebook app and saved in the plugin settings.
:::

---

## Endpoint

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `provider` | `required` `string` | Set to `facebook` |
| `code` | `required` `string` | The authorization code received from Facebook |
| `redirect_uri` | `optional` `string` | Override the redirect URI saved in settings for this request |

---

## Request Example

```bash
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"facebook","code":"YOUR_FACEBOOK_AUTH_CODE","redirect_uri":"https://your-site.com/callback"}'
```

---

## Response Examples

### Success

```json
{
  "success": true,
  "data": {
    "access_token": "EAABwzLixnjYBO...",
    "token_type": "bearer",
    "expires_in": 5183944
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

- [Exchange the Facebook token for a WordPress JWT](./03_Exchange_Token.md)
- [Check the Facebook OAuth setup](./01_Setup.md)
