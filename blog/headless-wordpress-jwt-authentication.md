# Headless WordPress: JWT Auth Done Right

March 10, 2026 ·

<!-- -->

9 min read

[![Nicu Micle](https://github.com/nicumicle.png)](/blog/authors/nicumicle)

[Nicu Micle](/blog/authors/nicumicle)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

[Headless WordPress](/headless-wordpress.md) has gone mainstream. Teams reach for it when they want WordPress's content management experience paired with a modern front-end - React, Next.js, Vue, or a mobile app. The REST API makes that possible, but it leaves one critical piece unresolved: **authentication**.

WordPress's built-in auth is cookie-based and browser-centric. It doesn't translate cleanly to API-first architectures. That's the gap Simple JWT Login fills, and in this article I'll walk through a complete, realistic setup.

## What You'll Build[​](#what-youll-build "Direct link to What You'll Build")

A headless WordPress backend with:

* JWT-based login (email + password → token)
* Token refresh before expiry
* Protected REST endpoints that require a valid JWT
* User registration via API
* Password reset flow
* Auto-login links for email campaigns

All of this is handled by [Simple JWT Login](https://wordpress.org/plugins/simple-jwt-login/) with zero custom PHP beyond optional hooks.

***

## Installation and Initial Configuration[​](#installation-and-initial-configuration "Direct link to Installation and Initial Configuration")

Install Simple JWT Login from the WordPress plugin repository, then navigate to **Simple JWT Login** in your WordPress admin sidebar.

The first setting to configure is the signing key, in the **ELSE** row of **JWT Verification Rules**. This secret signs and verifies tokens. Treat it like a database password: long, random, and kept out of the database where possible - the plugin can read it from `wp-config.php`.

```
Settings > Simple JWT Login > General > JWT Verification Rules
```

In the same row, select your **algorithm**. For most setups `HS256` (HMAC SHA-256) is the right default. If you need asymmetric signing - for example, to let a third-party service verify tokens without knowing the secret - switch to `RS256` and configure your public/private key pair.

Then turn on **Allow JWT Authentication** under **Authentication** - every endpoint is disabled by default. While you're there, set a reasonable **JWT Expiration**. Sixty minutes is a sensible starting point for most web apps; mobile apps often use longer windows paired with token refresh.

***

## Generating a Token[​](#generating-a-token "Direct link to Generating a Token")

Once the plugin is active, your WordPress site immediately has an authentication endpoint:

```
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/auth" \

  -H "Content-Type: application/json" \

  -d '{

    "email": "user@example.com",

    "password": "their_password"

  }'
```

A successful response looks like this:

```
{

  "success": true,

  "data": {

    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

    "refresh_token": "a1b2c3d4e5f6..."

  }

}
```

The `refresh_token` is only there when refresh tokens are turned on. Store the JWT client-side (memory or an `HttpOnly` cookie - avoid `localStorage` for sensitive apps) and attach it to subsequent requests.

Instead of `email`, you can send `username`, or `login`, which accepts either one.

***

## Making Authenticated Requests[​](#making-authenticated-requests "Direct link to Making Authenticated Requests")

Once you have a token, include it in the `Authorization` header on every protected request. To use it on WordPress's own routes such as `/wp/v2/users/me`, turn on **JWT Middleware for all WordPress endpoints** under **General → Integration Options**:

```
curl "https://example.com/wp-json/wp/v2/users/me" \

  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

The plugin can also read the token from a query parameter (`?JWT=<token>`), a cookie, or the session - see [JWT Input Sources](/docs/configuration.md#jwt-input-sources). Prefer the header: URLs end up in server logs.

***

## Refreshing Tokens[​](#refreshing-tokens "Direct link to Refreshing Tokens")

Short-lived tokens are more secure, but they require your client to handle expiry gracefully. Turn on refresh tokens, and `/auth` returns a `refresh_token` next to the JWT. Exchange it at the refresh endpoint:

```
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/auth/refresh" \

  -H "Content-Type: application/json" \

  -d '{"refresh_token": "a1b2c3d4e5f6..."}'
```

The response contains a new JWT and a new refresh token. See [Refresh token](/docs/refresh-token.md) for the details. A typical front-end pattern: check the token's `exp` claim before each request, and if it's within a few minutes of expiry, refresh proactively rather than reacting to a 401.

***

## Protecting Your REST Endpoints[​](#protecting-your-rest-endpoints "Direct link to Protecting Your REST Endpoints")

A headless WordPress site often exposes more REST routes than intended. Simple JWT Login's **Endpoint Protection** feature lets you require a valid JWT for any route.

The most secure posture for a private API: enable **"Protect all endpoints"** and then whitelist only the routes that must be public.

```
Settings > Simple JWT Login > Protect Endpoints

Mode: Protect all WordPress Endpoints
```

For a typical blog-style API you might whitelist:

* `GET /wp-json/wp/v2/posts` - public post listing
* `GET /wp-json/wp/v2/categories` - taxonomy data
* `POST /wp-json/simple-jwt-login/v1/auth` - login itself

Every other route - user data, media uploads, post creation - requires a valid JWT.

You can also protect routes **by HTTP method**. If your front-end needs `GET` on posts to be public but `POST` (creating posts) to be authenticated, add a rule for each method. Browser apps should prefer specific methods over **ALL**, because an **ALL** rule also blocks the CORS preflight - see [Troubleshooting](/docs/troubleshooting.md).

***

## User Registration via API[​](#user-registration-via-api "Direct link to User Registration via API")

If your application handles its own onboarding flow, you can create WordPress users directly through the API. First, enable registration under:

```
Settings > Simple JWT Login > Register User
```

For security, always pair registration with an **Auth Code** - an API key that must accompany registration requests. This prevents anyone with your API URL from creating arbitrary accounts.

```
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/users" \

  -H "Content-Type: application/json" \

  -d '{

    "email": "newuser@example.com",

    "password": "initial_password",

    "first_name": "Jane",

    "last_name": "Doe",

    "AUTH_KEY": "YOUR_REGISTRATION_AUTH_CODE"

  }'
```

You can also turn on **Generate a random password**, so the request doesn't need a `password` at all.

IP address restrictions and email domain allowlists add further layers of control over who can register.

***

## Password Reset Flow[​](#password-reset-flow "Direct link to Password Reset Flow")

The plugin ships a full password reset flow accessible via API, which is often missing from DIY JWT implementations.

**Step 1 - Request a reset code:**

```
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/user/reset_password" \

  -H "Content-Type: application/json" \

  -d '{"email": "user@example.com"}'
```

**Step 2 - Submit the new password with the code:**

```
curl -X PUT "https://example.com/wp-json/simple-jwt-login/v1/user/reset_password" \

  -H "Content-Type: application/json" \

  -d '{

    "email": "user@example.com",

    "code": "RESET_CODE_FROM_EMAIL",

    "new_password": "new_secure_password"

  }'
```

Three reset flows are available:

* **Save code in database only**: No email is sent, so your front end can deliver the code its own way.
* **Send default WordPress reset email**: Uses WordPress's built-in email template.
* **Send custom email**: You define the subject and body using variables like `{{CODE}}`, `{{NAME}}`, and `{{EMAIL}}`.

The custom template mode is ideal for headless apps that have their own transactional email design system and don't want WordPress's default styling.

***

## Auto-Login Links for Email Campaigns[​](#auto-login-links-for-email-campaigns "Direct link to Auto-Login Links for Email Campaigns")

One of the most underrated features: generate a URL that logs a user in automatically when clicked.

Enable auto-login under:

```
Settings > Simple JWT Login > Autologin
```

Then generate a JWT for the target user and construct the URL:

```
https://example.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=<user_jwt>&redirectUrl={{site_url}}/account/dashboard
```

When the user clicks that link, Simple JWT Login authenticates them silently and redirects them to their dashboard - already logged in.

The `redirectUrl` parameter works when **Honor the `redirectUrl` parameter** is on, and supports dynamic variables (`{{user_id}}`, `{{user_email}}`, `{{user_first_name}}`, and more), so each link can route the user to a personalized destination. Pair this with the **MailPoet add-on** and you have one-click autologin directly inside email campaigns without a single line of custom code.

***

## Enriching the JWT with Custom Data[​](#enriching-the-jwt-with-custom-data "Direct link to Enriching the JWT with Custom Data")

The JWT payload carries the claims you select under **Authentication → JWT payload parameters**, such as `id`, `email`, and `exp`. For most front-ends you'll want to include additional user data to avoid extra API calls after login.

Use the `simple_jwt_login_jwt_payload_auth` filter, which runs on `/auth` (turn it on under **Hooks** first):

```
add_filter('simple_jwt_login_jwt_payload_auth', function($payload, $request) {

    $user = get_user_by('id', $payload['id']);

    if (!$user) {

        return $payload;

    }

    $payload['display_name'] = $user->display_name;

    $payload['roles']        = $user->roles;

    $payload['avatar']       = get_avatar_url($user->ID);

    return $payload;

}, 10, 2);
```

This example assumes `id` is one of the selected payload claims. Your front-end can now decode the JWT and immediately render the user's name and avatar without an additional `/users/me` request.

***

## Revoking Tokens[​](#revoking-tokens "Direct link to Revoking Tokens")

When a user logs out or changes their password, you'll want to invalidate their existing tokens. Simple JWT Login provides a revoke endpoint:

```
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/auth/revoke" \

  -H "Authorization: Bearer <token>"
```

Revoked tokens are blocked server-side and rejected on later requests, even if they haven't technically expired yet.

***

## A Note on CORS[​](#a-note-on-cors "Direct link to A Note on CORS")

If your front-end is served from a different domain than WordPress - which is almost always the case in headless setups - you'll need CORS headers. Configure them in the plugin:

```
Settings > Simple JWT Login > CORS
```

List your front-end origin, such as `https://app.example.com`, in **Allow origin**, and include `Authorization` in **Allow headers**. Use the plugin setting rather than only your web server config: since version 4.1.1, the plugin also uses the **Allow origin** list to decide which cross-site requests may authenticate with a JWT. See [CORS](/docs/cors.md) for the details.

***

## Conclusion[​](#conclusion "Direct link to Conclusion")

Simple JWT Login takes what would otherwise be hundreds of lines of custom authentication code and turns it into a configuration exercise. Token generation, refresh, revocation, endpoint protection, user registration, password resets, and auto-login are all covered out of the box.

For teams building headless WordPress - whether the front-end is React, Next.js, Angular, or a Flutter app - it's one of the highest-leverage plugins available. Each of those has a [complete, downloadable example](/docs/code-examples.md), and the [headless WordPress guide](/headless-wordpress.md) collects them in one place. The [documentation](/docs.md) is thorough, the plugin is actively maintained, and the hooks system means you're never painted into a corner when requirements get complex.

Install it, spend an hour on the settings, and your WordPress REST API gets authentication that actually fits modern development patterns.

**Tags:**

* [Tutorial](/blog/tags/tags/tutorial "Tutorials and guides for Simple JWT Login")
* [Headless WordPress](/blog/tags/tags/headless-wordpress "Articles about headless WordPress architecture and JWT authentication")
* [JWT Authentication](/blog/tags/tags/jwt-authentication "Articles about JSON Web Token (JWT) authentication")
* [Security](/blog/tags/tags/security "WordPress REST API security and authentication best practices")

[Edit this page](https://github.com/simple-jwt-login/website/tree/main/blog/2026-03-10-headless-wordpress-jwt-authentication.md)
