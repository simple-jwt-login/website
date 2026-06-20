---
slug: /integrations/oauth/google/setup
title: Setup
sidebar_position: 1
description: Configure Google OAuth credentials in Simple JWT Login to enable Google sign-in for your WordPress site.
keywords: [Google OAuth WordPress, Google Cloud Console, Google Client ID, Google Client Secret, social login WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Create a Google OAuth Application

1. Navigate to the [Google Cloud Console](https://console.developers.google.com/apis/).
2. Create a new project (or select an existing one).
3. Go to **Credentials** and click **+ Create Credentials → OAuth client ID**.
4. Choose **Web application** as the application type.
5. Under **Authorized redirect URIs**, add your site's callback URL:
   ```
   https://your-site.com/?rest_route=/simple-jwt-login/v1/oauth/token&provider=google
   ```
6. Copy the **Client ID** and **Client Secret**.

:::warning
Keep your credentials secure - never commit them to version control or expose them publicly. Use separate OAuth client IDs for each environment (development, staging, production).
:::

---

## Configure in WordPress

1. Go to **Simple JWT Login → Integrations → OAuth → Google**.
2. Enter the **Client ID** and **Client Secret** from the Google Cloud Console.
3. Set the **Redirect URI** to match what you registered in Google.

![Google OAuth Credentials](/assets/screenshots/oauth/credentials.png)

4. Toggle **Enable** to activate the Google provider.
