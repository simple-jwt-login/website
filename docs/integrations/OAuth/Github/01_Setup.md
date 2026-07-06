---
slug: /integrations/oauth/github/setup
title: Setup
sidebar_position: 1
description: Configure GitHub OAuth credentials in Simple JWT Login to enable GitHub sign-in for your WordPress site.
keywords: [GitHub OAuth WordPress, GitHub Developer Settings, GitHub Client ID, GitHub Client Secret, social login WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers).
2. Click **OAuth Apps → New OAuth App**.
3. Fill in the **Application name** and **Homepage URL**.
4. Set the **Authorization callback URL** to your site's callback URL:
   ```
   https://your-site.com/?rest_route=/simple-jwt-login/v1/oauth/token&provider=github
   ```
5. Click **Register application**.
6. Copy the **Client ID**, then click **Generate a new client secret** and copy the **Client Secret**.

:::warning
Keep your credentials secure - never commit them to version control or expose them publicly. Use separate OAuth apps for each environment (development, staging, production).
:::

---

## Configure in WordPress

1. Go to **Simple JWT Login → Integrations → OAuth → GitHub**.
2. Enter the **Client ID** and **Client Secret** from the GitHub OAuth App settings.
3. Set the **Redirect URI** to match what you registered in GitHub.
4. Toggle **Enable** to activate the GitHub provider.

| Field | Description |
| :---- | :---------- |
| **Client ID** | The OAuth App Client ID |
| **Client Secret** | The OAuth App Client Secret |
