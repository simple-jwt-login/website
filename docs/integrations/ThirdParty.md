---
slug: /integrations/third-party/
title: Third Party
sidebar_position: 2
description: Connect Simple JWT Login with WPGraphQL, Two-Factor authentication, and the Force Login plugin. Enable JWT auth on GraphQL queries, require 2FA before JWT issuance, and bypass forced-login restrictions on REST endpoints.
keywords: [WPGraphQL JWT authentication, WordPress two factor JWT, Force Login bypass WordPress, 2FA WordPress JWT, Simple JWT Login integrations, WordPress plugin integrations]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Simple JWT Login integrates with three third-party WordPress plugins: **WPGraphQL**, **Two-Factor**, and **Force Login**.

Configure these under **Settings → Simple JWT Login → Integrations → Third Party Integrations**.

---

## WPGraphQL

Requires the [WPGraphQL](https://www.wpgraphql.com/) plugin to be installed and activated.

### What it does

When a JWT is included with a WPGraphQL query, the plugin authenticates the request as the identified WordPress user before executing the query. This lets your GraphQL queries access user-specific data and perform mutations that require authentication - using the same JWT you already have from Simple JWT Login.

### Enable

Toggle **Enable WPGraphQL authentication** to activate the integration. No additional configuration is needed beyond providing a JWT with your GraphQL requests.

**Example request with a JWT:**

```bash
curl -X POST "https://example.com/graphql" \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ viewer { name email } }"}'
```

---

## Two-Factor

Requires the [Two Factor](https://wordpress.org/plugins/two-factor/) plugin to be installed and activated.

### What it does

When enabled, users who have 2FA configured in the Two Factor plugin must complete a second authentication step before receiving a full JWT. The flow is:

1. Client POSTs credentials to `POST /simple-jwt-login/v1/auth`. Instead of a full JWT, the response contains a short-lived **interim JWT**.
2. Client submits the interim JWT and the user's 2FA code to `POST /simple-jwt-login/v1/auth/2fa`.
3. On success, a full JWT (and optional refresh token) is returned - identical to a normal auth response.

Users without 2FA configured receive a full JWT directly from step 1, as usual.

### Settings

#### Interim JWT TTL (minutes)

How long the interim JWT (issued after the password check, before 2FA verification) remains valid. Range: 1-60 minutes.

A short TTL (e.g. 5 minutes) minimises the window in which an intercepted interim JWT could be misused.

### 2FA endpoint

**METHOD:** `POST`

**ENDPOINT:** `/simple-jwt-login/v1/auth/2fa`

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

---

## Force Login

Requires the [Force Login](https://wordpress.org/plugins/force-login/) plugin (or a similar plugin that restricts REST API access to authenticated users only).

### What it does

The Force Login plugin redirects unauthenticated users away from your site and can lock down the REST API. Enabling this integration **exempts all Simple JWT Login endpoints** from that restriction.

This is necessary because unauthenticated clients need to reach the login, register, and token endpoints in order to authenticate in the first place - they cannot provide a WordPress session cookie before they have logged in.

### Enable

Toggle **Enable Force Login integration** to allow unauthenticated access to Simple JWT Login REST routes even when Force Login is active.

:::caution
This integration only bypasses the Force Login restriction for Simple JWT Login's own endpoints. All other WordPress REST endpoints remain subject to the Force Login rules.
:::
