---
slug: /integrations/third-party/two-factor/
title: Two-Factor
sidebar_position: 2
description: Require two-factor authentication before issuing a WordPress JWT using Simple JWT Login and the Two Factor plugin.
keywords: [WordPress 2FA JWT, two factor authentication JWT, WordPress two factor login, Simple JWT Login 2FA]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Requires the [Two Factor](https://wordpress.org/plugins/two-factor/) plugin to be installed and activated.

## What it does

When enabled, users who have 2FA configured in the Two Factor plugin must complete a second authentication step before receiving a full JWT. The flow is:

1. Client POSTs credentials to `POST /simple-jwt-login/v1/auth`. Instead of a full JWT, the response contains a short-lived **interim JWT**.
2. Client submits the interim JWT and the user's 2FA code to `POST /simple-jwt-login/v1/auth/2fa`.
3. On success, a full JWT (and optional refresh token) is returned - identical to a normal auth response.

Users without 2FA configured receive a full JWT directly from step 1, as usual.

## Settings

### Interim JWT TTL (minutes)

How long the interim JWT (issued after the password check, before 2FA verification) remains valid. Range: 1-60 minutes.

A short TTL (e.g. 5 minutes) minimises the window in which an intercepted interim JWT could be misused.

## 2FA Endpoint

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/auth/2fa`

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `JWT` | `required` `string` | The interim JWT returned by the `/auth` endpoint |
| `code` | `required` `string` | The 2FA code from the user's authenticator app or email |

**Example:**

```bash
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/auth/2fa" \
  -H "Content-Type: application/json" \
  -d '{"JWT":"INTERIM_JWT","code":"123456"}'
```

**Response (success):**

```json
{
  "success": true,
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

:::note
Users who have 2FA enabled in the Two Factor plugin but need to allow API logins without the 2FA step can use the `two_factor_user_api_login_enable` WordPress filter. This is a filter provided by the Two Factor plugin itself, not by Simple JWT Login.
:::
