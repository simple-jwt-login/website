---
slug: /troubleshooting/
title: WordPress JWT Troubleshooting
sidebar_label: Troubleshooting
description: Fix common WordPress JWT problems - missing Authorization header on Apache or nginx, 404, 401 and 403 errors, expired tokens, and CORS.
keywords: [WordPress JWT not working, Authorization header missing WordPress, HTTP_AUTHORIZATION Apache, rest_no_route, JWT 401 WordPress, JWT 403 WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Most WordPress JWT problems come from a missing `Authorization` header, a disabled endpoint, a wrong signing key, or CORS. Find your symptom below.

First read `data.error_code` in the response, then look it up in [Error codes](./Error-Codes.md).

## Authorization Header Is Missing

The symptom is a "missing JWT" error, or a request treated as anonymous, although you send `Authorization: Bearer YOUR_JWT`. Some web servers don't pass this header to PHP.

Check that the **HEADER** source is enabled under [JWT Input Sources](./Configuration.mdx#jwt-input-sources).

### Easiest Fix - Another Header Name

Servers that strip the `Authorization` header pass other headers through. Rename the **HEADER** source under [JWT Input Sources](./Configuration.mdx#jwt-input-sources), for example to `X-Token`, and send the JWT in that header:

```bash
curl https://example.com/wp-json/wp/v2/users/me \
  -H "X-Token: Bearer YOUR_JWT"
```

The `Bearer` prefix is optional, unless **Require "Bearer" prefix** is on. For browser apps, add `X-Token` to **Allow headers** in the [CORS](./Cors.md) settings.

If you'd rather keep `Authorization`, fix the server configuration instead.

### Apache

With Apache 2.4.13 or later and PHP running as CGI or FastCGI, add this to `.htaccess`, above the WordPress rules:

```apache
CGIPassAuth On
```

If your host doesn't allow `CGIPassAuth`, use:

```apache
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```

### nginx

nginx passes the header to PHP-FPM by default. If a proxy or a custom configuration drops it, add this to the PHP `location` block:

```nginx
fastcgi_param HTTP_AUTHORIZATION $http_authorization;
```

When nginx is a reverse proxy in front of another server, add:

```nginx
proxy_set_header Authorization $http_authorization;
```

## 404 With `rest_no_route`

WordPress didn't find the route. Check the following:

- The plugin is active.
- The HTTP method matches the [endpoint list](./Endpoints.md). For example, `/auth` needs `POST`.
- The namespace matches [Route Namespace](./Configuration.mdx#route-namespace).

If `/wp-json/` returns an HTML 404 page, use the [query-string format](./Configuration.mdx#server) instead: `/?rest_route=/simple-jwt-login/v1/auth`.

## 403 When Calling an Endpoint

Almost every endpoint is disabled by default. Codes such as `45` (authentication) and `82` (validate token) mean you need to turn on the endpoint. The [Endpoints overview](./Endpoints.md) lists the setting for each one.

## JWT Is Rejected

| Code | Cause | Fix |
| :--- | :---- | :-- |
| `2` | The token doesn't have three parts | Send the complete JWT |
| `11` | The signature doesn't match | Use the same key and algorithm for signing and verification |
| `12`, `13` | The token isn't valid yet | Synchronize the server clocks |
| `14` | The token expired | [Refresh the JWT](./auth/RefreshToken.md) or log in again |
| `55` | The token was [revoked](./auth/RevokeToken.md) | Log in again |
| `110` | Two-factor verification isn't complete | Complete the [two-factor step](./integrations/ThirdParty/02_TwoFactor.md) |

## Token Works on Plugin Endpoints but Not on wp/v2

Enable **JWT Middleware for all WordPress endpoints** under [Integration Options](./Configuration.mdx#jwt-middleware-for-all-wordpress-endpoints).

## Request Works in curl but Fails in the Browser

The most common cause is CORS. Add your front-end origin to **Allow origin**, and include `Authorization` in the allowed headers. Since version 4.1.1, a JWT sent from an origin that isn't listed is ignored. See [CORS settings](./Cors.md) and [Cross-site requests](./Configuration.mdx#cross-site-requests).

### Preflight Fails on a Protected Route

Browsers send an `OPTIONS` preflight without the JWT before a request that has an `Authorization` header. A [Protect Endpoints](./Protect-Endpoints.md) rule with the method **ALL**, or the **Protect all** default, also covers that preflight and rejects it with error `75`. Set the rule to the methods you use, such as `GET` and `POST`.
