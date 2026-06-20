---
slug: /integrations/oauth/auth0/setup
title: Setup
sidebar_position: 1
description: Configure Auth0 OAuth credentials in Simple JWT Login to enable Auth0 sign-in for your WordPress site.
keywords: [Auth0 WordPress, Auth0 OAuth, Auth0 Client ID, Auth0 Client Secret, social login WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Create an Auth0 Application

1. Log in to the [Auth0 Dashboard](https://manage.auth0.com/).
2. Go to **Applications → Applications** and click **+ Create Application**.
3. Choose **Regular Web Applications** and click **Create**.
4. Open the **Settings** tab and copy the **Domain**, **Client ID**, and **Client Secret**.
5. Under **Allowed Callback URLs**, add your site's callback URL:
   ```
   https://your-site.com/?rest_route=/simple-jwt-login/v1/oauth/token&provider=auth0
   ```
6. Save your changes.

:::warning
Keep your credentials secure - never commit them to version control or expose them publicly. Use separate Auth0 applications for each environment (development, staging, production).
:::

---

## Configure in WordPress

1. Go to **Simple JWT Login → Integrations → OAuth → Auth0**.
2. Enter the **Domain**, **Client ID**, and **Client Secret** from the Auth0 Dashboard.
3. Set the **Redirect URI** to match what you registered in Auth0.
4. Toggle **Enable** to activate the Auth0 provider.

| Field | Description |
| :---- | :---------- |
| **Domain** | Your Auth0 tenant domain, e.g. `your-tenant.auth0.com` |
| **Client ID** | The application Client ID |
| **Client Secret** | The application Client Secret |
