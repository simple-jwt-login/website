---
title: "Simple JWT Login Security Hardening Guide: Lock Down Your WordPress API"
description: A practical checklist for hardening Simple JWT Login in production - covering algorithm selection, Auth Codes, IP restrictions, endpoint protection, token revocation, and more.
slug: /simple-jwt-login-security-hardening/
hide_table_of_contents: false
authors: nicumicle
tags: [tutorials]
---

Installing Simple JWT Login takes minutes. Configuring it securely for production takes a bit more thought. The plugin ships with most sensitive features **disabled by default**, which is the right approach - but it also means the defaults aren't always sufficient for a hardened deployment.

This guide works through every security-relevant setting in Simple JWT Login, explains the trade-offs, and gives you a concrete checklist to work from before you go live.

<!--truncate-->

## 1. Choose the Right Signing Algorithm

The algorithm you pick determines how tokens are signed and verified.

**HMAC algorithms (HS256, HS384, HS512)** use a shared secret. Anyone who knows the secret can both sign and verify tokens. This is fine when only your WordPress server generates and validates tokens.

**RSA algorithms (RS256, RS384, RS512)** use a public/private key pair. WordPress signs tokens with the private key; anyone can verify them with the public key - without ever seeing the private key. Choose RS256 when:

- A third-party service (external API, CDN, serverless function) needs to verify tokens independently
- Your team wants to publish the verification key without exposing signing capability

For most applications, **HS256 is the right default**. If you go this route, the decryption key is everything - treat it accordingly.

**Configuration:**
```
Settings > Simple JWT Login > General > JWT Algorithm
```

---

## 2. Use a Strong Decryption Key

The decryption key is the foundation of your token security. If it's weak or guessable, an attacker can forge valid tokens for any user, including administrators.

Rules for production keys:
- **Minimum 32 characters**, ideally 64+
- Use a cryptographically random generator, not a human-chosen phrase
- Never commit it to version control
- Rotate it if you suspect compromise (this will invalidate all existing tokens - have a plan for active sessions)

Generate a suitable key from your terminal:

```bash
openssl rand -base64 48
```

Store it in an environment variable and read it into your plugin configuration via `wp-config.php` if possible, rather than keeping it only in the database.

---

## 3. Set a Short Token Expiration

Long-lived tokens are a liability. If a token is stolen, the attacker has access for its entire lifetime. The shorter the window, the lower the blast radius.

**Recommended starting points:**

| Application type | Token TTL |
|---|---|
| Web SPA (frequent use) | 15–60 minutes |
| Mobile app | 1–24 hours |
| Server-to-server | 5–15 minutes |
| Auto-login links (email campaigns) | 10–30 minutes |

Pair short expiration with a **token refresh** flow so legitimate users aren't constantly forced to re-authenticate.

```
Settings > Simple JWT Login > General > JWT Expiration (seconds)
```

---

## 4. Restrict Operations with Auth Codes

Auth Codes are optional API keys that gate specific plugin operations: auto-login, user registration, user deletion, and password resets. If an operation requires an Auth Code and the caller doesn't provide a valid one, the request is rejected - regardless of whether a valid JWT is present.

**Always use Auth Codes for:**

- **User registration** - without one, anyone who discovers your endpoint can create WordPress accounts
- **User deletion** - even with JWT auth, an extra key adds a meaningful barrier
- **Auto-login** - prevents token-crafting attacks against your autologin endpoint

Auth Code configuration lets you:
- Assign each code a **WordPress role** (new users created with that code get that role)
- Set an **expiration date** (one-time integrations, temporary access)
- Create **multiple codes** for different clients or systems

```
Settings > Simple JWT Login > Auth Codes
```

A practical pattern: one Auth Code per external system that interacts with your API. If a system is compromised, revoke its code without affecting others.

---

## 5. Enable Endpoint Protection

The WordPress REST API leaks more data than most developers realise. Endpoints like `/wp/v2/users` expose usernames and user IDs publicly by default. Simple JWT Login's endpoint protection feature lets you require a valid JWT for any REST route.

**Two protection modes:**

**Protect all, whitelist exceptions:** Start from a closed position. Every REST request requires a JWT unless you explicitly whitelist the route. Recommended for private APIs and admin tools.

**Protect specific routes:** Only named routes require authentication. Everything else is public. Suitable for content sites that need public read access but authenticated writes.

Configure per-HTTP-method granularity. A common setup for a content API:

| Route | GET | POST | PUT | DELETE |
|---|---|---|---|---|
| `/wp/v2/posts` | Public | Protected | Protected | Protected |
| `/wp/v2/users` | Protected | Protected | Protected | Protected |
| `/wp/v2/media` | Public | Protected | Protected | Protected |

```
Settings > Simple JWT Login > Protect Endpoints
```

---

## 6. Restrict Auto-Login by IP Address

Auto-login is powerful and therefore worth extra hardening. If you're using it exclusively for server-side integrations (e.g., generating login links from a specific application server), lock it down to that server's IP address.

```
Settings > Simple JWT Login > Auto Login > Allow auto-login only from these IPs
```

This renders stolen auto-login links useless from any other network, even if the token itself hasn't expired.

For email campaign auto-login where users click from arbitrary IPs, leave IP restriction disabled - but compensate with a short token TTL (10–15 minutes is reasonable for a one-time login link).

---

## 7. Restrict Registration by IP and Email Domain

Two independent controls protect the registration endpoint:

**IP allowlist:** Only allow registration requests from known origins - your front-end server, your CI pipeline, etc.

```
Settings > Simple JWT Login > Register User > Allow register only from these IPs
```

**Email domain allowlist:** Restrict registrations to specific email domains. Useful for internal tools or invite-only platforms where only company email addresses should be allowed.

```
Settings > Simple JWT Login > Register User > Allowed email domains
```

Example: allow only `@yourcompany.com` and `@partner.com` addresses. Any registration attempt with a Gmail or other address is rejected at the plugin level before WordPress processes it.

---

## 8. Use Token Revocation for Logout and Password Changes

JWT tokens are stateless by design, which means a standard logout (just deleting the client-side token) doesn't actually invalidate the token server-side. If the token was copied before logout, it remains valid until expiry.

Simple JWT Login's revoke endpoint adds server-side blacklisting:

```bash
curl -X DELETE "https://example.com/wp-json/simple-jwt-login/v1/auth/revoke" \
  -H "Authorization: Bearer <token>"
```

**Call this endpoint on:**
- User-initiated logout
- Password change
- Account suspension or deletion
- Any security event that should terminate existing sessions

This won't help if you don't call it, so it's worth building into your logout flow as a required step rather than a best-effort one.

---

## 9. Configure CORS Carefully

Simple JWT Login can add `Access-Control-Allow-Origin: *` headers to remove cross-origin friction during development. In production, this setting is a security liability - it allows any website to make authenticated requests to your API on behalf of your users.

**For production:**

1. Disable the wildcard CORS setting in the plugin.
2. Configure CORS at the web server level (Apache or Nginx) to allow only your specific front-end origin(s).

**Apache example:**

```apache
<IfModule mod_headers.c>
  SetEnvIf Origin "https://yourfrontend.com" CORS_ALLOWED=1
  Header set Access-Control-Allow-Origin "https://yourfrontend.com" env=CORS_ALLOWED
  Header set Access-Control-Allow-Headers "Authorization, Content-Type"
  Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
</IfModule>
```

**Nginx example:**

```nginx
add_header Access-Control-Allow-Origin "https://yourfrontend.com";
add_header Access-Control-Allow-Headers "Authorization, Content-Type";
add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
```

---

## 10. Disable What You Don't Use

Every enabled feature is an attack surface. Simple JWT Login follows a deny-by-default approach, but over time it's easy to enable features for testing and forget to turn them off.

Before going to production, audit your settings and disable:

- **Auto-login** - if you're not using magic links
- **Register users** - if registration happens through WordPress's built-in flow
- **Delete users** - unless your application explicitly needs it
- **Reset password** - if you're using a separate password management system
- **Change password** - same as above

The fewer endpoints active, the smaller the attack surface.

---

## Security Hardening Checklist

Use this before every production deployment:

- [ ] Decryption key is 32+ characters, randomly generated, not in version control
- [ ] Algorithm selected matches your use case (HS256 for simple, RS256 for shared verification)
- [ ] Token expiration is set to the shortest practical TTL for your application
- [ ] Auth Codes are enabled for registration, deletion, and auto-login
- [ ] Each Auth Code is scoped to the minimum required role
- [ ] Endpoint protection is configured - protect all with whitelist, or named routes
- [ ] Auto-login IP restriction is set if used for server-side integrations only
- [ ] Registration IP and email domain restrictions are configured if applicable
- [ ] Token revocation is integrated into your logout and password-change flows
- [ ] Wildcard CORS is disabled; web server handles CORS with specific origins
- [ ] All unused features (register, delete, auto-login, reset password) are disabled
- [ ] Auth Code expiration dates are set for time-limited integrations

---

## Conclusion

Simple JWT Login's security posture is only as strong as its configuration. The defaults are safe - nothing is enabled you didn't ask for - but a truly hardened production setup requires deliberate choices about algorithms, key strength, Auth Codes, endpoint protection, and CORS.

Work through the checklist above before launch and revisit it whenever you enable a new feature. The goal isn't paranoia; it's ensuring that each exposed capability is intentional, scoped, and monitored.

The [full documentation](/docs/) covers every setting in detail, and the [error codes reference](/docs/error-codes) is useful for debugging unexpected rejections when you tighten restrictions and something stops working.
