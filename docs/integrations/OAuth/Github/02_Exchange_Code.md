---
slug: /integrations/oauth/github/exchange-code
title: Exchange OAuth Code for GitHub Tokens
sidebar_position: 2
description: Exchange the GitHub authorization code for GitHub tokens using Simple JWT Login.
keywords: [GitHub OAuth code, GitHub access_token, exchange code, WordPress REST API, Simple JWT Login]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Overview

This endpoint exchanges the `code` returned from GitHub's OAuth flow for GitHub tokens. Use this when your OAuth flow happens in a separate app and you need to obtain the GitHub tokens server-side.

Enable **Exchange GitHub OAuth code for GitHub tokens** in **Settings → Simple JWT Login → Integrations → OAuth → GitHub**.

:::note
The `redirect_uri` used here must exactly match the one registered in your GitHub OAuth App and saved in the plugin settings.
:::

---

## Endpoint

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `provider` | `required` `string` | Set to `github` |
| `code` | `required` `string` | The authorization code received from GitHub |
| `redirect_uri` | `optional` `string` | Override the redirect URI saved in settings for this request |

---

## Request Example

```bash
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"github","code":"YOUR_GITHUB_AUTH_CODE","redirect_uri":"https://your-site.com/callback"}'
```

---

## Response Examples

### Success

```json
{
  "success": true,
  "data": {
    "access_token": "gho_16C7e42F292c6912E7710c838347Ae178B4a",
    "token_type": "bearer",
    "scope": "user:email"
  }
}
```

### Error

```json
{
  "success": false,
  "data": {
    "message": "The code you provided is invalid.",
    "errorCode": 72
  }
}
```
