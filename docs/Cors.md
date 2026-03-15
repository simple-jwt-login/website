---
slug: /cors/
title: CORS
sidebar_position: 98
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Simple-JWT-Login includes built-in Cross-Origin Resource Sharing (CORS) support, implemented in compliance with the [W3C CORS specification](https://www.w3.org/TR/cors/).

CORS controls which external origins (domains, ports, protocols) are permitted to call the plugin's REST endpoints from a browser. Without CORS headers, browsers block cross-origin requests for security reasons.

## What the plugin does

When CORS is enabled, the plugin adds a wildcard `Access-Control-Allow-Origin: *` header to all responses from its endpoints. This makes the endpoints publicly accessible from any origin, including front-end JavaScript running on a different domain than your WordPress site.

This is the recommended configuration for:
- **Headless WordPress** sites where the front-end lives on a separate domain
- **Single-page applications (SPA)** built with React, Vue, Angular, etc.
- **Mobile apps** using a WebView or HTTP client that enforces CORS

## When to be cautious

A wildcard CORS policy is intentionally permissive. Because Simple-JWT-Login endpoints are protected by JWT authentication (and optionally by Auth Codes and IP restrictions), this is generally safe. However, if your site exposes sensitive unauthenticated endpoints, consider restricting access at the web server or firewall level in addition to using CORS.

## Screenshot
![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-10.png?raw=true)
