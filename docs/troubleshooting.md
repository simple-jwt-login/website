# WordPress JWT Troubleshooting

Most WordPress JWT problems come from a missing `Authorization` header, a disabled endpoint, a wrong signing key, or CORS. Find your symptom below.

First read `data.error_code` in the response, then look it up in [Error codes](/docs/error-codes.md).

## Authorization Header Is Missing[​](#authorization-header-is-missing "Direct link to Authorization Header Is Missing")

The symptom is a "missing JWT" error, or a request treated as anonymous, although you send `Authorization: Bearer YOUR_JWT`. Some web servers don't pass this header to PHP.

Check that the **HEADER** source is enabled under [JWT Input Sources](/docs/configuration.md#jwt-input-sources).

### Easiest Fix - Another Header Name[​](#easiest-fix---another-header-name "Direct link to Easiest Fix - Another Header Name")

Servers that strip the `Authorization` header pass other headers through. Rename the **HEADER** source under [JWT Input Sources](/docs/configuration.md#jwt-input-sources), for example to `X-Token`, and send the JWT in that header:

```
curl https://example.com/wp-json/wp/v2/users/me \

  -H "X-Token: Bearer YOUR_JWT"
```

The `Bearer` prefix is optional, unless **Require "Bearer" prefix** is on. For browser apps, add `X-Token` to **Allow headers** in the [CORS](/docs/cors.md) settings.

If you'd rather keep `Authorization`, fix the server configuration instead.

### Apache[​](#apache "Direct link to Apache")

With Apache 2.4.13 or later and PHP running as CGI or FastCGI, add this to `.htaccess`, above the WordPress rules:

```
CGIPassAuth On
```

If your host doesn't allow `CGIPassAuth`, use:

```
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```

### nginx[​](#nginx "Direct link to nginx")

nginx passes the header to PHP-FPM by default. If a proxy or a custom configuration drops it, add this to the PHP `location` block:

```
fastcgi_param HTTP_AUTHORIZATION $http_authorization;
```

When nginx is a reverse proxy in front of another server, add:

```
proxy_set_header Authorization $http_authorization;
```

## 404 With `rest_no_route`[​](#404-with-rest_no_route "Direct link to 404-with-rest_no_route")

WordPress didn't find the route. Check the following:

* The plugin is active.
* The HTTP method matches the [endpoint list](/docs/endpoints.md). For example, `/auth` needs `POST`.
* The namespace matches [Route Namespace](/docs/configuration.md#route-namespace).

If `/wp-json/` returns an HTML 404 page, use the [query-string format](/docs/configuration.md#server) instead: `/?rest_route=/simple-jwt-login/v1/auth`.

## 403 When Calling an Endpoint[​](#403-when-calling-an-endpoint "Direct link to 403 When Calling an Endpoint")

Almost every endpoint is disabled by default. Codes such as `45` (authentication) and `82` (validate token) mean you need to turn on the endpoint. The [Endpoints overview](/docs/endpoints.md) lists the setting for each one.

## JWT Is Rejected[​](#jwt-is-rejected "Direct link to JWT Is Rejected")

| Code       | Cause                                          | Fix                                                                          |
| ---------- | ---------------------------------------------- | ---------------------------------------------------------------------------- |
| `2`        | The token doesn't have three parts             | Send the complete JWT                                                        |
| `11`       | The signature doesn't match                    | Use the same key and algorithm for signing and verification                  |
| `12`, `13` | The token isn't valid yet                      | Synchronize the server clocks                                                |
| `14`       | The token expired                              | [Refresh the JWT](/docs/refresh-token.md) or log in again                    |
| `55`       | The token was [revoked](/docs/revoke-token.md) | Log in again                                                                 |
| `110`      | Two-factor verification isn't complete         | Complete the [two-factor step](/docs/integrations/third-party/two-factor.md) |

## Token Works on Plugin Endpoints but Not on wp/v2[​](#token-works-on-plugin-endpoints-but-not-on-wpv2 "Direct link to Token Works on Plugin Endpoints but Not on wp/v2")

Enable **JWT Middleware for all WordPress endpoints** under [Integration Options](/docs/configuration.md#jwt-middleware-for-all-wordpress-endpoints).

## Request Works in curl but Fails in the Browser[​](#request-works-in-curl-but-fails-in-the-browser "Direct link to Request Works in curl but Fails in the Browser")

The most common cause is CORS. Add your front-end origin to **Allow origin**, and include `Authorization` in the allowed headers. Since version 4.1.1, a JWT sent from an origin that isn't listed is ignored. See [CORS settings](/docs/cors.md) and [Cross-site requests](/docs/configuration.md#cross-site-requests).

### Preflight Fails on a Protected Route[​](#preflight-fails-on-a-protected-route "Direct link to Preflight Fails on a Protected Route")

Browsers send an `OPTIONS` preflight without the JWT before a request that has an `Authorization` header. A [Protect Endpoints](/docs/protect-endpoints.md) rule with the method **ALL**, or the **Protect all** default, also covers that preflight and rejects it with error `75`. Set the rule to the methods you use, such as `GET` and `POST`.
