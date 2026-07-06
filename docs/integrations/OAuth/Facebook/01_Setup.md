---
slug: /integrations/oauth/facebook/setup
title: Setup
sidebar_position: 1
description: Configure Facebook OAuth credentials in Simple JWT Login to enable Facebook sign-in for your WordPress site.
keywords: [Facebook OAuth WordPress, Meta for Developers, Facebook App ID, Facebook App Secret, social login WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Create a Facebook App

1. Log in to the [Meta for Developers](https://developers.facebook.com/) console.
2. Click **My Apps → Create App**.
3. Choose **Consumer** as the app type and click **Next**.
4. Fill in the app name and contact email, then click **Create App**.
5. In the app dashboard, go to **Settings → Basic** and copy the **App ID** and **App Secret**.
6. Add the **Facebook Login** product, then under its settings add your site's callback URL to **Valid OAuth Redirect URIs**:
   ```
   https://your-site.com/?rest_route=/simple-jwt-login/v1/oauth/token&provider=facebook
   ```
7. Save your changes.

:::warning
Keep your credentials secure - never commit them to version control or expose them publicly. Use separate Facebook apps for each environment (development, staging, production).
:::

---

## Configure in WordPress

1. Go to **Simple JWT Login → Integrations → OAuth → Facebook**.
2. Enter the **App ID** and **App Secret** from the Meta for Developers console.
3. Set the **Redirect URI** to match what you registered in Facebook.
4. Toggle **Enable** to activate the Facebook provider.

| Field | Description |
| :---- | :---------- |
| **App ID** | The Facebook App ID |
| **App Secret** | The Facebook App Secret |
