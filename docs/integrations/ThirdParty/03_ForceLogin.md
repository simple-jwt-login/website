---
slug: /integrations/third-party/force-login/
title: Force Login
sidebar_position: 3
description: Exempt Simple JWT Login endpoints from Force Login plugin restrictions so unauthenticated clients can still reach the authentication API.
keywords: [Force Login WordPress, bypass Force Login REST API, Simple JWT Login Force Login, WordPress REST API access]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Requires the [Force Login](https://wordpress.org/plugins/force-login/) plugin (or a similar plugin that restricts REST API access to authenticated users only).

![How third-party integrations work](/assets/images/screenshots/third-party-integrations/how-it-works.png)

## What it does

The Force Login plugin redirects unauthenticated users away from your site and can lock down the REST API. Enabling this integration **exempts all Simple JWT Login endpoints** from that restriction.

This is necessary because unauthenticated clients need to reach the login, register, and token endpoints in order to authenticate in the first place - they cannot provide a WordPress session cookie before they have logged in.

## Enable

Toggle **Enable Force Login integration** to allow unauthenticated access to Simple JWT Login REST routes even when Force Login is active.

:::caution
This integration only bypasses the Force Login restriction for Simple JWT Login's own endpoints. All other WordPress REST endpoints remain subject to the Force Login rules.
:::
