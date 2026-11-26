---
slug: /integrations/oauth/github/exchange-token
title: Exchange a GitHub Token for a JWT
sidebar_label: Exchange access_token for WordPress JWT
description: Exchange a GitHub access_token for a WordPress JWT through the REST API - endpoint, parameters, curl request, and success and error responses.
keywords: [GitHub access_token to WordPress JWT, GitHub token exchange, GitHub login headless WordPress, GitHub JWT WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Overview

This endpoint accepts a GitHub `access_token` and returns a WordPress JWT. Use this as the final step of the GitHub OAuth flow to authenticate the user in WordPress.

Enable **Exchange GitHub access_token for a WordPress JWT** in **Settings → Simple JWT Login → Integrations → OAuth → GitHub**.

:::note
Since version 4.2.0, the `access_token` must have been issued for the GitHub OAuth app configured in the plugin, so a token obtained by another app can't log its users in. GitHub personal access tokens are rejected. The **Client ID** and **Client Secret** must both be set.
:::

:::danger Allow tokens issued for other GitHub apps
Turn on **Allow tokens issued for other GitHub apps** (off by default) to keep applications built for versions before 4.2.0 backward compatible: tokens issued for other GitHub apps and personal access tokens are accepted again. But then any GitHub OAuth app, including one you don't own, and any personal access token with the `user:email` scope can be exchanged for a WordPress JWT of the matching user. Turn it on only while you migrate your apps to the configured OAuth app. See [Backward compatibility](/docs/integrations/oauth/#backward-compatibility).
:::

---

## Endpoint

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/oauth/token`

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `provider` | `required` `string` | Set to `github` |
| `access_token` | `required` `string` | The `access_token` from your GitHub OAuth flow |

---

## Request Example

```bash
curl -X POST "https://your-site.com/wp-json/simple-jwt-login/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"provider":"github","access_token":"YOUR_GITHUB_ACCESS_TOKEN"}'
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
    "error_code": 71
  }
}
```

## Next steps

- [Protect WordPress REST API endpoints with the JWT](../../../Protect-Endpoints.md)
- [Refresh the JWT](../../../auth/RefreshToken.md)
- [Look up error codes](../../../Error-Codes.md)
