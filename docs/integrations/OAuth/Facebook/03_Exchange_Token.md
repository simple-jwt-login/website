---
slug: /integrations/oauth/facebook/exchange-token
title: Exchange access_token for WordPress JWT
sidebar_position: 3
description: Exchange a Facebook access_token for a WordPress JWT using Simple JWT Login.
keywords: [Facebook access_token, WordPress JWT, OAuth token exchange, Simple JWT Login, headless WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Overview

This endpoint accepts a Facebook `access_token` and returns a WordPress JWT. Use this as the final step of the Facebook OAuth flow to authenticate the user in WordPress.

Enable **Exchange Facebook access_token for a WordPress JWT** in **Settings → Simple JWT Login → Integrations → OAuth → Facebook**.

---

## Endpoint

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `provider` | `required` `string` | Set to `facebook` |
| `access_token` | `required` `string` | The `access_token` from your Facebook OAuth flow |

---

## Request Example

```bash
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"facebook","access_token":"YOUR_FACEBOOK_ACCESS_TOKEN"}'
```

---

## Response Examples

### Success

```json
{
  "success": true,
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Error

```json
{
  "success": false,
  "data": {
    "message": "The code or jwt parameter is missing from request.",
    "errorCode": 71
  }
}
```
