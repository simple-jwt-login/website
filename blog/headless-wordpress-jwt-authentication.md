# Headless WordPress in 2026: JWT Authentication Done Right with Simple JWT Login

March 10, 2026 ·

<!-- -->

8 min read

[![Nicu Micle](https://github.com/nicumicle.png)](/blog/authors/nicumicle.md)

[Nicu Micle](/blog/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

Headless WordPress has gone mainstream. Teams reach for it when they want WordPress's content management experience paired with a modern front-end - React, Next.js, Vue, or a mobile app. The REST API makes that possible, but it leaves one critical piece unresolved: **authentication**.

WordPress's built-in auth is cookie-based and browser-centric. It doesn't translate cleanly to API-first architectures. That's the gap Simple JWT Login fills, and in this article I'll walk through a complete, realistic setup.

## What We're Building[​](#what-were-building "Direct link to What We're Building")

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

The first setting to configure is the **JWT Decryption Key** - this is the secret used to sign and verify tokens. Treat it like a database password: long, random, and stored in a secrets manager rather than hardcoded.

```
Settings > Simple JWT Login > General > JWT Decryption Key
```

Next, select your **algorithm**. For most setups `HS256` (HMAC SHA-256) is the right default. If you need asymmetric signing - for example, to let a third-party service verify tokens without knowing the secret - switch to `RS256` and configure your public/private key pair.

Set a reasonable **JWT expiration time**. Sixty minutes is a sensible starting point for most web apps; mobile apps often use longer windows paired with token refresh.

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
    "user": {
      "ID": 42,
      "user_email": "user@example.com",
      "display_name": "Jane Doe"
    }
  }
}
```

Store this token client-side (memory or an `HttpOnly` cookie - avoid `localStorage` for sensitive apps) and attach it to subsequent requests.

The plugin also supports **username** and a combined **login field** (email or username) for the initial auth call, configurable under `General > Login by`.

***

## Making Authenticated Requests[​](#making-authenticated-requests "Direct link to Making Authenticated Requests")

Once you have a token, include it in the `Authorization` header on every protected request:

```
curl "https://example.com/wp-json/wp/v2/users/me" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

The plugin also accepts the token as a query parameter (`?JWT=<token>`) or in the request body (`{"JWT": "<token>"}`), which is handy for scenarios where setting custom headers is awkward - like certain webhook consumers.

***

## Refreshing Tokens[​](#refreshing-tokens "Direct link to Refreshing Tokens")

Short-lived tokens are more secure, but they require your client to handle expiry gracefully. Simple JWT Login provides a dedicated refresh endpoint:

```
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/auth/refresh" \
  -H "Content-Type: application/json" \
  -d '{"JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
```

The response is a new token with a fresh expiry. A typical front-end pattern: check the token's `exp` claim before each request, and if it's within a few minutes of expiry, refresh proactively rather than reacting to a 401.

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

You can also protect routes **by HTTP method**. If your front-end needs `GET` on posts to be public but `POST` (creating posts) to be authenticated, that's a single checkbox per method. No custom middleware needed.

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
    "auth_code": "YOUR_REGISTRATION_AUTH_CODE"
  }'
```

You can also configure the plugin to **generate a random password** and return it in the response - useful if you want to issue a temporary password and immediately prompt the user to change it.

IP address restrictions and email domain allowlists add further layers of control over who can register.

***

## Password Reset Flow[​](#password-reset-flow "Direct link to Password Reset Flow")

The plugin ships a full password reset flow accessible via API, which is often missing from DIY JWT implementations.

**Step 1 - Request a reset code:**

```
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/users/reset_password" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

**Step 2 - Submit the new password with the code:**

```
curl -X PUT "https://example.com/wp-json/simple-jwt-login/v1/users/reset_password" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "code": "RESET_CODE_FROM_EMAIL",
    "new_password": "new_secure_password"
  }'
```

Three reset modes are available:

* **Silent**: The reset code is returned directly in the API response (for custom email delivery).
* **Default WordPress email**: Uses WordPress's built-in email template.
* **Custom email template**: You define the subject and body using variables like `{{CODE}}`, `{{NAME}}`, and `{{EMAIL}}`.

The custom template mode is ideal for headless apps that have their own transactional email design system and don't want WordPress's default styling.

***

## Auto-Login Links for Email Campaigns[​](#auto-login-links-for-email-campaigns "Direct link to Auto-Login Links for Email Campaigns")

One of the most underrated features: generate a URL that logs a user in automatically when clicked.

Enable auto-login under:

```
Settings > Simple JWT Login > Auto Login
```

Then generate a JWT for the target user and construct the URL:

```
https://example.com/?JWT=<user_jwt>&redirectUrl={{site_url}}/account/dashboard
```

When the user clicks that link, Simple JWT Login authenticates them silently and redirects them to their dashboard - already logged in.

The `redirectUrl` parameter supports dynamic variables (`{{user_id}}`, `{{user_email}}`, `{{user_first_name}}`, and more), so each link can route the user to a personalized destination. Pair this with the **MailPoet add-on** and you have one-click autologin directly inside email campaigns without a single line of custom code.

***

## Enriching the JWT with Custom Data[​](#enriching-the-jwt-with-custom-data "Direct link to Enriching the JWT with Custom Data")

Out of the box, the JWT payload contains standard claims (`sub`, `iat`, `exp`). For most front-ends you'll want to include additional user data to avoid extra API calls after login.

Use the `simple_jwt_login_jwt_payload` filter:

```
add_filter('simple_jwt_login_jwt_payload', function($payload, $user) {
    $payload['display_name'] = $user->display_name;
    $payload['roles']        = $user->roles;
    $payload['avatar']       = get_avatar_url($user->ID);
    return $payload;
}, 10, 2);
```

Your front-end can now decode the JWT and immediately render the user's name and avatar without an additional `/users/me` request.

***

## Revoking Tokens[​](#revoking-tokens "Direct link to Revoking Tokens")

When a user logs out or changes their password, you'll want to invalidate their existing tokens. Simple JWT Login provides a revoke endpoint:

```
curl -X DELETE "https://example.com/wp-json/simple-jwt-login/v1/auth/revoke" \
  -H "Authorization: Bearer <token>"
```

Revoked tokens are blacklisted server-side and will be rejected on subsequent requests, even if they haven't technically expired yet.

***

## A Note on CORS[​](#a-note-on-cors "Direct link to A Note on CORS")

If your front-end is served from a different domain than WordPress - which is almost always the case in headless setups - you'll need CORS headers. Simple JWT Login can add `Access-Control-Allow-Origin: *` automatically:

```
Settings > Simple JWT Login > General > Allow CORS
```

For production, you'll typically want to restrict this to your front-end domain via your web server config (Apache or Nginx), using the plugin's CORS setting as a development convenience only.

***

## Conclusion[​](#conclusion "Direct link to Conclusion")

Simple JWT Login takes what would otherwise be hundreds of lines of custom authentication code and turns it into a configuration exercise. Token generation, refresh, revocation, endpoint protection, user registration, password resets, and auto-login are all covered out of the box.

For teams building headless WordPress - whether the front-end is React, Next.js, Vue, or a native mobile app - it's one of the highest-leverage plugins available. The [documentation](/docs.md) is thorough, the plugin is actively maintained, and the hooks system means you're never painted into a corner when requirements get complex.

Install it, spend an hour on the settings, and your WordPress REST API will have authentication that actually fits modern development patterns.

**Tags:**

* [Tutorial](/blog/tags/tags/tutorial.md "Tutorials and guides for Simple JWT Login")
* [Headless WordPress](/blog/tags/tags/headless-wordpress.md "Articles about headless WordPress architecture and JWT authentication")
* [JWT Authentication](/blog/tags/tags/jwt-authentication.md "Articles about JSON Web Token (JWT) authentication")
* [Security](/blog/tags/tags/security.md "WordPress REST API security and authentication best practices")

[Edit this page](https://github.com/simple-jwt-login/website/tree/main/blog/2026-03-10-headless-wordpress-jwt-authentication.md)
