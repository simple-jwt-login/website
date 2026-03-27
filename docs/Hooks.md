---
slug: /hooks/
title: Hooks
sidebar_position: 97
description: Simple JWT Login exposes 16 WordPress action and filter hooks — customize JWT payloads, authentication responses, user registration, redirects, and more without touching plugin code.
keywords: [WordPress JWT hooks, Simple JWT Login filters, custom JWT payload, WordPress authentication hooks, JWT plugin customization, WordPress action hooks, WordPress filter hooks]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Simple JWT Login exposes **16 WordPress action and filter hooks** that let you extend or customize the plugin's behaviour without modifying its source code. Use them to enrich JWT payloads, send notifications, apply business logic, gate requests, or build fully custom flows on top of the plugin.

:::warning Enable hooks first
Hooks must be enabled individually in the plugin settings before they fire. **All hooks are disabled by default.**
:::

## Quick Reference

| Hook | Type | Triggered |
|------|------|-----------|
| [`simple_jwt_login_before_endpoint`](#simple_jwt_login_before_endpoint) | action | Before any endpoint is processed |
| [`simple_jwt_login_login_hook`](#simple_jwt_login_login_hook) | action | After a user logs in |
| [`simple_jwt_login_redirect_hook`](#simple_jwt_login_redirect_hook) | action | Before the post-login redirect |
| [`simple_jwt_login_register_hook`](#simple_jwt_login_register_hook) | action | After a new user is created |
| [`simple_jwt_login_delete_user_hook`](#simple_jwt_login_delete_user_hook) | action | After a user is deleted |
| [`simple_jwt_login_jwt_payload_auth`](#simple_jwt_login_jwt_payload_auth) | filter | Before the JWT is signed on `/auth` |
| [`simple_jwt_login_no_redirect_message`](#simple_jwt_login_no_redirect_message) | filter | Before the no-redirect response on `/autologin` |
| [`simple_jwt_login_reset_password_custom_email_template`](#simple_jwt_login_reset_password_custom_email_template) | filter | Before the reset-password email is sent |
| [`simple_jwt_login_response_auth_user`](#simple_jwt_login_response_auth_user) | filter | Before the `/auth` response is returned |
| [`simple_jwt_login_response_register_user`](#simple_jwt_login_response_register_user) | filter | Before the register response is returned |
| [`simple_jwt_login_response_delete_user`](#simple_jwt_login_response_delete_user) | filter | Before the delete-user response is returned |
| [`simple_jwt_login_response_refresh_token`](#simple_jwt_login_response_refresh_token) | filter | Before the refresh-token response is returned |
| [`simple_jwt_login_response_send_reset_password`](#simple_jwt_login_response_send_reset_password) | filter | Before the send-reset-password response is returned |
| [`simple_jwt_login_response_change_user_password`](#simple_jwt_login_response_change_user_password) | filter | Before the change-password response is returned |
| [`simple_jwt_login_response_revoke_token`](#simple_jwt_login_response_revoke_token) | filter | Before the revoke-token response is returned |
| [`simple_jwt_login_response_validate_token`](#simple_jwt_login_response_validate_token) | filter | Before the validate-token response is returned |

---

## Action Hooks

Action hooks let you run side-effect code at a specific point in the request lifecycle. They do not return a value.

### `simple_jwt_login_before_endpoint`

Fires before a Simple JWT Login REST route is processed. Use it to validate requests, block specific callers, enforce policies (e.g. minimum password length), or log activity — for any endpoint.

| Parameter | Type | Description |
|-----------|------|-------------|
| `$method` | `string` | HTTP method (`GET`, `POST`, …) |
| `$endpoint` | `string` | Endpoint name (`auth`, `users`, …) |
| `$request` | `array` | Full request parameters |

Throw an `Exception` to abort the request with an error response.

---

### `simple_jwt_login_login_hook`

Fires after a user has been successfully authenticated and logged in.

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | `WP_User` | The authenticated user |

---

### `simple_jwt_login_redirect_hook`

Fires before the user is redirected to the URL configured in the Login settings. Use it to implement dynamic redirect logic based on request parameters.

| Parameter | Type | Description |
|-----------|------|-------------|
| `$url` | `string` | The configured redirect URL |
| `$request` | `array` | Full request parameters |

:::tip
Enable **"Include request parameters in the redirect URL"** in Login settings to forward custom query parameters (e.g. `&page=dashboard`) that your hook can read.
:::

---

### `simple_jwt_login_register_hook`

Fires after a new user has been created via the register endpoint.

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | `WP_User` | The newly created user |
| `$plain_text_password` | `string` | The user's plain-text password (available only at creation time) |

---

### `simple_jwt_login_delete_user_hook`

Fires immediately after a user has been deleted.

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | `WP_User` | The deleted user |

---

## Filter Hooks

Filter hooks let you inspect and modify data before it is used or returned. Always return the (modified) value.

### `simple_jwt_login_jwt_payload_auth`

Fires on the `/auth` endpoint before the JWT is signed. Use it to add custom claims to the token.

| Parameter | Type | Description |
|-----------|------|-------------|
| `$payload` | `array` | The JWT payload (modify and return) |
| `$request` | `array` | Full request parameters |

**Returns:** `array` — the modified payload.

---

### `simple_jwt_login_no_redirect_message`

Fires on the `/autologin` endpoint when **No Redirect** is selected. Use it to customise the JSON response returned to the client.

| Parameter | Type | Description |
|-----------|------|-------------|
| `$payload` | `array` | The response payload (modify and return) |
| `$request` | `array` | Full request parameters |

**Returns:** `array` — the modified response payload.

---

### `simple_jwt_login_reset_password_custom_email_template`

Fires when `POST /user/reset_password` is called. Use it to replace the default email template set in Reset Password settings with a fully custom HTML email.

| Parameter | Type | Description |
|-----------|------|-------------|
| `$template` | `string` | The current email template |
| `$request` | `array` | Full request parameters |

**Returns:** `string` — the custom email template.

---

### Response Filters

The following 7 filters share the same signature and fire immediately before their respective endpoint returns a JSON response. Use them to add, remove, or transform fields in the API response.

| Hook | Endpoint |
|------|----------|
| `simple_jwt_login_response_auth_user` | `POST /auth` |
| `simple_jwt_login_response_register_user` | `POST /users` |
| `simple_jwt_login_response_delete_user` | `DELETE /users` |
| `simple_jwt_login_response_refresh_token` | `POST /auth/refresh` |
| `simple_jwt_login_response_send_reset_password` | `POST /user/reset_password` |
| `simple_jwt_login_response_change_user_password` | `PUT /user/reset_password` |
| `simple_jwt_login_response_revoke_token` | `DELETE /auth` |
| `simple_jwt_login_response_validate_token` | `GET /auth/validate` |

**Shared signature:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | `array` | The response data (modify and return) |
| `$user` | `WP_User` | The user associated with the request |

**Returns:** `array` — the modified response.

---

## Settings Screenshot

![Hooks settings panel](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-9.png?raw=true)

---

## Code Examples

### Add custom claims to the JWT payload

Enrich the token with user metadata — roles, plan, tenant ID — so downstream services don't need a separate lookup.

```php
add_filter('simple_jwt_login_jwt_payload_auth', function (array $payload, array $request): array {
    $user = get_user_by('email', $request['email'] ?? '');
    if ($user) {
        $payload['roles'] = $user->roles;
        $payload['display_name'] = $user->display_name;
    }
    return $payload;
}, 10, 2);
```

---

### Send a welcome email after registration

```php
add_action('simple_jwt_login_register_hook', function (WP_User $user, string $password): void {
    wp_mail(
        $user->user_email,
        'Welcome to My Site',
        sprintf(
            "Hi %s,\n\nYour account is ready.\n\nEmail: %s\nPassword: %s",
            $user->display_name,
            $user->user_email,
            $password
        )
    );
}, 10, 2);
```

---

### Dynamic redirect URLs after login

Enable **"Include request parameters in the redirect URL"** in Login settings, then add `&page=dashboard` (or any value) to the login URL. The hook reads it and redirects accordingly.

```php
add_action('simple_jwt_login_redirect_hook', function (string $url, array $request): void {
    $page = $request['page'] ?? null;

    $destinations = [
        'dashboard' => 'https://mysite.com/dashboard',
        'profile'   => 'https://mysite.com/profile',
    ];

    wp_redirect($destinations[$page] ?? $url);
}, 10, 2);
```

---

### Block a specific email address on `/auth`

```php
add_action('simple_jwt_login_before_endpoint', function (string $method, string $endpoint, array $request): void {
    if ($method !== 'POST' || $endpoint !== 'auth') {
        return;
    }

    $blocked = ['banned@example.com'];

    if (in_array($request['email'] ?? '', $blocked, true)) {
        throw new Exception('This account has been suspended.');
    }
}, 10, 3);
```

---

### Enforce a minimum password length on registration

```php
add_action('simple_jwt_login_before_endpoint', function (string $method, string $endpoint, array $request): void {
    if ($method !== 'POST' || $endpoint !== 'users') {
        return;
    }

    $minLength = 8;
    $password  = $request['password'] ?? '';

    if (strlen($password) < $minLength) {
        throw new Exception("Password must be at least {$minLength} characters.");
    }
}, 10, 3);
```

---

### Add extra fields to the auth response

```php
add_filter('simple_jwt_login_response_auth_user', function (array $response, WP_User $user): array {
    $response['user_id']      = $user->ID;
    $response['display_name'] = $user->display_name;
    $response['avatar_url']   = get_avatar_url($user->ID);
    return $response;
}, 10, 2);
```
