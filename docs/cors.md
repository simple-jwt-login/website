# CORS

Simple JWT Login includes built-in Cross-Origin Resource Sharing (CORS) support, implemented in compliance with the [W3C CORS specification](https://www.w3.org/TR/cors/).

CORS controls which external origins (domains, ports, protocols) are permitted to call the plugin's REST endpoints from a browser. Without the appropriate CORS headers, browsers block cross-origin requests for security reasons.

Configure CORS under **Settings → Simple JWT Login → CORS**.

## When you need CORS[​](#when-you-need-cors "Direct link to When you need CORS")

Enable CORS if your front-end application lives on a different domain than your WordPress site. Common scenarios:

* **Headless WordPress** - front-end on `app.example.com`, WordPress on `api.example.com`
* **Single-page applications** built with React, Vue, Angular, or similar frameworks
* **Mobile apps** that enforce CORS in their HTTP client

## Settings[​](#settings "Direct link to Settings")

### Allow CORS Support[​](#allow-cors-support "Direct link to Allow CORS Support")

![Allow CORS Support](data:image/png;base64,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)

Enable or disable CORS header injection on all plugin responses. When disabled, no CORS headers are added.

***

### CORS Headers Configuration[​](#cors-headers-configuration "Direct link to CORS Headers Configuration")

![CORS Headers Configuration](/assets/images/cors-headers-configuration-e3f9c48ee871494d4e1f8d564f4adce9.png)

Enable each header individually and configure its value:

#### `Access-Control-Allow-Origin`[​](#access-control-allow-origin "Direct link to access-control-allow-origin")

Specifies which origins are permitted to access the resource.

| Value                                | Behaviour                                                     |
| ------------------------------------ | ------------------------------------------------------------- |
| `*`                                  | Any origin is allowed (permissive - suitable for public APIs) |
| `https://app.example.com`            | Only that specific origin is allowed                          |
| `https://app1.com, https://app2.com` | Multiple specific origins (comma-separated)                   |

Default example value: `*`

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)

***

#### `Access-Control-Allow-Methods`[​](#access-control-allow-methods "Direct link to access-control-allow-methods")

Lists the HTTP methods permitted when accessing the resource in response to a browser preflight (`OPTIONS`) request.

Example value: `GET, POST, OPTIONS`

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)

***

#### `Access-Control-Allow-Headers`[​](#access-control-allow-headers "Direct link to access-control-allow-headers")

Lists which HTTP request headers can be used during the actual cross-origin request.

Example value: `Content-Type, Authorization`

Include `Authorization` if you send JWT tokens via the `Authorization: Bearer` header.

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers)

***

## Recommended configuration for headless WordPress[​](#recommended-configuration-for-headless-wordpress "Direct link to Recommended configuration for headless WordPress")

```
Access-Control-Allow-Origin:  https://your-frontend-domain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

A wildcard `Access-Control-Allow-Origin: *` is simpler to configure and generally safe for JWT-protected APIs (tokens cannot be forged), but restricting to your specific front-end origin is a good defence-in-depth measure.
