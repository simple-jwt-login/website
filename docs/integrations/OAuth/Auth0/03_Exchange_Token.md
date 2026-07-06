---
slug: /integrations/oauth/auth0/exchange-token
title: Exchange access_token for WordPress JWT
sidebar_position: 3
description: Exchange an Auth0 access_token for a WordPress JWT using Simple JWT Login.
keywords: [Auth0 access_token, WordPress JWT, OAuth token exchange, Simple JWT Login, headless WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Overview

This endpoint accepts an Auth0 `access_token` and returns a WordPress JWT. Use this as the final step of the Auth0 OAuth flow to authenticate the user in WordPress.

Enable **Exchange Auth0 access_token for a WordPress JWT** in **Settings → Simple JWT Login → Integrations → OAuth → Auth0**.

---

## Endpoint

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `provider` | `required` `string` | Set to `auth0` |
| `access_token` | `required` `string` | The `access_token` from your Auth0 OAuth flow |

---

## Request Example

```bash
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"auth0","access_token":"YOUR_AUTH0_ACCESS_TOKEN"}'
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
