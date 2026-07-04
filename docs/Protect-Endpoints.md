---
slug: /protect-endpoints/
title: Protect Endpoints
sidebar_position: 11
description: Require a valid JWT for any WordPress REST API route using Simple JWT Login. Lock down sensitive endpoints by HTTP method with exact or prefix matching.
keywords: [protect WordPress REST API, require JWT WordPress, WordPress endpoint protection, secure REST API WordPress, JWT middleware WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

The Protect Endpoints feature lets you require a valid JWT for any WordPress REST API route. Use it to lock down sensitive data - such as user profiles, private posts, or custom post types - so they can only be accessed by authenticated callers, optionally restricted to specific WordPress roles.

When a protected endpoint is called without a valid JWT, the plugin returns a `401` error immediately, before WordPress processes the request:

```json
{
  "success": false,
  "data": {
    "message": "You are not authorized to access this endpoint.",
    "error_code": 75
  }
}
```

If a valid JWT is provided but the user doesn't have one of the roles required by a **JWT + Roles** rule, the plugin returns a `403` error instead:

```json
{
  "success": false,
  "data": {
    "message": "You do not have the required role to access this endpoint.",
    "error_code": 114
  }
}
```

## Settings

Configure under **Settings → Simple JWT Login → Protect Endpoints**.

### Protect Endpoints

![Protect Endpoints settings](/assets/images/screenshots/protect-endpoints/protect-endpoints.png)

Enable or disable the endpoint protection feature. When disabled, no JWT check is applied to any REST route.

### Endpoint Rules

![Endpoint Rules](/assets/images/screenshots/protect-endpoints/endpoint-rules.png)

Define per-endpoint rules. Click **+ Add Endpoint** to add a rule. Rules are evaluated top to bottom - the first matching rule wins.

**Each rule has the following fields:**

| Field | Options | Description |
| :---- | :------ | :---------- |
| HTTP Method | ALL, GET, POST, PUT, PATCH, DELETE | Which request methods the rule applies to. |
| Match type | Starts with, Exact match | Whether the path must start with the value or match it exactly. |
| Endpoint | text input | The REST API path to match (e.g. `/wp/v2/users`). |
| Type | Public, JWT required, JWT + Roles | **Public** - always accessible, even with protection enabled by default. **JWT required** - a valid JWT is required, for any authenticated user. **JWT + Roles** - a valid JWT is required *and* the user must have at least one of the specified WordPress roles. |
| Roles | comma-separated list | Only shown when Type is **JWT + Roles**. WordPress roles allowed to access the endpoint (e.g. `administrator, editor`). |

### Default Action

![Default Action](/assets/images/screenshots/protect-endpoints/default-action.png)

Controls what happens to any endpoint that doesn't match a rule above:

| Option | Behavior |
| :----- | :------- |
| **Allow access - protect only the endpoints listed above** | All REST routes are public by default. Only endpoints matching a **JWT required** or **JWT + Roles** rule need a JWT. |
| **Require a valid JWT - keep only the endpoints listed above public** | All REST routes require a JWT by default. Only endpoints matching a **Public** rule stay public. |

---

## Example Configurations

####  Example 1
Assume you add a rule for `/wp/v2/users` with `ALL` and `Exact Match`.

The rule applies to these URLs:
- `http://yoursite.com/?rest_route=/wp/v2/users`
- `http://yoursite.com/wp-json/wp/v2/users`

#### Example 2
Assume you add a rule for `/wp/v2/users` with `GET` and `Starts With`.

The rule applies to these URLs when called with `GET` only:
- `http://yoursite.com/?rest_route=/wp/v2/users`
- `http://yoursite.com/?rest_route=/wp/v2/users/1`
- `http://yoursite.com/wp-json/wp/v2/users`
- `http://yoursite.com/wp-json/wp/v2/users/1`
- `http://yoursite.com/wp-json/wp/v2/users/{any_other_path}`

#### Example 3
Assume you add a rule for `/wp/v2` with `ALL`, `Starts With` and Type `JWT required`, and set the **Default Action** to `Allow access - protect only the endpoints listed above`.

This way, you are making all the endpoints under `/wp/v2*` protected and they will be accessible only with a JWT.

For example, all these endpoints will be protected:
- `/wp/v2/users` 
- `/wp/v2/posts`
- `/wp/v2/comments`

#### Example 4
Assume you add a rule for `/wp/v2/users` with `ALL`, `Starts With` and Type `JWT + Roles`, with Roles set to `administrator, editor`.

Only users with a valid JWT *and* the `administrator` or `editor` role can access `/wp/v2/users` and its sub-paths. Any other authenticated or anonymous request receives the "You do not have the required role to access this endpoint." error.

## How to Pass the JWT

The JWT token can be provided in multiple ways, depending on the options set in the plugin’s General settings:
- Header
- Request URI
- Request Body
- Session
- Cookie

### Examples

#### Sending JWT in header

```bash
curl -X POST "http://localhost/wp-json/wp/v2/users" \
  -H "Authorization: Bearer YOUR_JWT"
```

#### Sending JWT as query parameter

```bash
curl -X POST "http://localhost/wp-json/wp/v2/users?jwt=YOUR_JWT"
```

#### Sending JWT using `rest_route`

```bash
curl -X POST "http://localhost/?rest_route=/wp/v2/users&jwt=YOUR_JWT"
```

#### Sending JWT in request body

```bash
curl -X POST "http://localhost/wp-json/wp/v2/users" \
  -H "Content-type: application/json" \
  -d '{"JWT":"YOUR_JWT"}'
```

