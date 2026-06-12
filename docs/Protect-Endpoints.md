---
slug: /protect-endpoints/
title: Protect Endpoints
sidebar_position: 11
description: Require a valid JWT for any WordPress REST API route using Simple JWT Login. Lock down sensitive endpoints by HTTP method with exact or prefix matching.
keywords: [protect WordPress REST API, require JWT WordPress, WordPress endpoint protection, secure REST API WordPress, JWT middleware WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

The Protect Endpoints feature lets you require a valid JWT for any WordPress REST API route. Use it to lock down sensitive data - such as user profiles, private posts, or custom post types - so they can only be accessed by authenticated callers.

When a protected endpoint is called without a valid JWT, the plugin returns a `403` error immediately, before WordPress processes the request.

The following error will be displayed, when an endpoint is protected and no JWT is provided:

```json
{
"success": false,
  "data": {
    "message": "You are not authorized to access this endpoint.",
    "errorCode": 403,
    "type": "simple-jwt-login-route-protect"
  }
}
```

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-11.png?raw=true)

---

## Settings

Configure under **Settings → Simple JWT Login → Protect Endpoints**.

### Protect Endpoints

Enable or disable the endpoint protection feature. When disabled, no JWT check is applied to any REST route.

### Protection Scope

Controls which endpoints are subject to JWT protection. Two options:

| Option | Behavior |
| :----- | :------- |
| **Apply on All REST Endpoints** | All REST API routes require a JWT. Endpoints in the **Whitelisted Endpoints** list are excluded from this requirement. |
| **Apply only on Specific REST endpoints** | Only the routes listed in the **Protected Endpoints** list require a JWT. All other routes remain public. |

### Whitelisted Endpoints

Visible when "Apply on All REST Endpoints" is selected. Add endpoint rules here to allow public access to those routes even though global protection is enabled.

### Protected Endpoints

Visible when "Apply only on Specific REST endpoints" is selected. Add endpoint rules here to require a JWT for those specific routes.

**Each endpoint rule has three fields:**

| Field | Options | Description |
| :---- | :------ | :---------- |
| HTTP Method | ALL, GET, POST, PUT, PATCH, DELETE | Which request methods the rule applies to. |
| Match type | Starts with, Exact match | Whether the path must start with the value or match it exactly. |
| URL path | text input | The REST API path to match (e.g. `/wp/v2/users`). |

---

## Protection Modes

You can choose between two protection modes:
- **Apply on All REST Endpoints**
- **Apply only on Specific REST endpoints**

### 1. Apply on All REST Endpoints
When enabled, this option secures all endpoints except those explicitly listed in the **Whitelisted Endpoints** section.
To exclude an endpoint from protection, add it to the whitelist using the "+ Add Endpoint" button.

### 2. Apply only on Specific REST endpoints
This option protects only the endpoints listed in the **Protected Endpoints** section.
To secure an endpoint, add it using the "+ Add Endpoint" button.

## Configuration Options

### Request Methods

For each endpoint, you can define which HTTP request methods (GET, POST, PUT, DELETE, etc.) require authentication.
Alternatively, selecting ALL will enforce the rule for every request method.

### Route Matching
There are two ways to define how an endpoint is matched:
- **Starts with**: The rule applies to any endpoint that begins with the specified path.
- **Exact match**: The rule applies only if the accessed endpoint exactly matches the specified path.
  
### Example Configurations

####  Example 1
Assume you specify `/wp/v2/users` with `ALL` and `Exact Match` in either the Protect or Whitelist settings.

The rule applies to these URLs:
- `http://yoursite.com/?rest_route=/wp/v2/users`
- `http://yoursite.com/wp-json/wp/v2/users`

#### Example 2
Assume you specify `/wp/v2/users` with `GET` and `Starts With` in either the Protect or Whitelist settings.

The rule applies to these URLs when called with `GET` only:
- `http://yoursite.com/?rest_route=/wp/v2/users`
- `http://yoursite.com/?rest_route=/wp/v2/users/1`
- `http://yoursite.com/wp-json/wp/v2/users`
- `http://yoursite.com/wp-json/wp/v2/users/1`
- `http://yoursite.com/wp-json/wp/v2/users/{any_other_path}`

#### Example 3
Assume you specify `/wp/v2` with `ALL` and `Starts With` in either the `Apply only on Specific Endpoints`.

This way, you are making all the endpoints under `/wp/v2*` protected and they will be accessible only with a JWT.

For example, all these endpoints will be protected:
- `/wp/v2/users` 
- `/wp/v2/posts`
- `/wp/v2/comments`

## How to Pass the JWT

The JWT token can be provided in multiple ways, depending on the options set in the plugin’s General settings:
- Header
- Request URI
- Request Body
- Session
- Cookie

### Examples

#### Sending JWT in header:
```bash
  curl -X POST "http://localhost/wp/v2/users" -H "Authorization: YOUR_JWT"
```

#### Sending JWT as query parameters:

```bash
  curl -X POST "http://localhost/wp/v2/users?jwt=YOUR_JWT"
```
or

```bash
  curl -X POST "http://localhost?rest_route=/wp/v2/users&jwt=YOUR_JWT"
```

#### Sending JWT as request body:
```bash
  curl -X POST "http://localhost/wp/v2/users" -H "Content-type: application/json" -d '{"JWT":"JYOUR JWT"}'
```


By following these instructions, you can efficiently protect and manage API access using Simple JWT Login.

