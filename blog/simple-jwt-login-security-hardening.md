# JWT Security Hardening Guide

March 10, 2026 ·

<!-- -->

12 min read

[![Nicu Micle](https://github.com/nicumicle.png)](/blog/authors/nicumicle)

[Nicu Micle](/blog/authors/nicumicle)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

Installing Simple JWT Login takes minutes. Configuring it securely for production takes a bit more thought. The plugin ships with most sensitive features **disabled by default**, which is the right approach - but it also means the defaults aren't always sufficient for a hardened deployment.

This guide works through the main security settings in Simple JWT Login, explains the trade-offs, and gives you a concrete checklist to work from before you go live.

note

This guide covers Simple JWT Login v4. Settings that need a specific release are marked with its version.

## Threats and Defenses at a Glance[​](#threats-and-defenses-at-a-glance "Direct link to Threats and Defenses at a Glance")

Start from what an attacker might do, then check that the matching defense is on:

| Attack                                                | Defense                                                                                                                                        | Default                         |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| Guess the key and forge an admin token                | Long random key, outside the database ([section 2](#2-use-a-strong-decryption-key))                                                            | You set the key                 |
| Replay a stolen JWT                                   | Short expiration and revocation ([3](#3-set-a-short-token-expiration), [8](#8-use-token-revocation-for-logout-and-password-changes))           | 60 minutes; revoke endpoint off |
| Reuse a JWT issued for another site or app            | Expected audience, `aud` (4.2.0) ([11](#11-bind-tokens-to-your-site))                                                                          | Off                             |
| Make a visitor's browser send their cookie JWT (CSRF) | Cross-site request checks (4.1.1) ([9](#9-configure-cors-carefully))                                                                           | Always on                       |
| Log in with a stolen password                         | Two-factor authentication ([12](#12-add-a-second-factor-and-watch-the-logs))                                                                   | Off                             |
| Create accounts in bulk                               | Auth Codes, IP and email domain allowlists ([4](#4-restrict-operations-with-auth-codes), [7](#7-restrict-registration-by-ip-and-email-domain)) | Registration off                |
| List usernames through `/wp/v2/users`                 | Protect Endpoints ([5](#5-enable-endpoint-protection))                                                                                         | Off                             |
| Spoof an IP address to pass an allowlist              | Leave proxy headers untrusted ([6](#6-restrict-auto-login-by-ip-address))                                                                      | Proxy headers ignored           |

## 1. Choose the Right Signing Algorithm[​](#1-choose-the-right-signing-algorithm "Direct link to 1. Choose the Right Signing Algorithm")

The algorithm you pick determines how tokens are signed and verified.

**HMAC algorithms (HS256, HS384, HS512)** use a shared secret. Anyone who knows the secret can both sign and verify tokens. This is fine when only your WordPress server generates and validates tokens.

**RSA algorithms (RS256, RS384, RS512)** use a public/private key pair. WordPress signs tokens with the private key; anyone can verify them with the public key - without ever seeing the private key. Choose RS256 when:

* A third-party service (external API, CDN, serverless function) needs to verify tokens independently
* Your team wants to publish the verification key without exposing signing capability

For most applications, **HS256 is the right default**. If you go this route, the decryption key is everything - treat it accordingly.

**Configuration:**

```
Settings > Simple JWT Login > General > JWT Verification Rules > ELSE
```

***

## 2. Use a Strong Decryption Key[​](#2-use-a-strong-decryption-key "Direct link to 2. Use a Strong Decryption Key")

The decryption key is the foundation of your token security. If it's weak or guessable, an attacker can forge valid tokens for any user, including administrators.

Rules for production keys:

* **Minimum 32 characters**, ideally 64+
* Use a cryptographically random generator, not a human-chosen phrase
* Never commit it to version control
* Rotate it if you suspect compromise (this invalidates all existing tokens - have a plan for active sessions)

Generate a suitable key from your terminal:

```
openssl rand -base64 48
```

To keep the key out of the database, set the [key source](/docs/configuration.md#the-else-rule-required-default) to **Code** and define it in `wp-config.php`, for example from an environment variable:

```
define('SIMPLE_JWT_PRIVATE_KEY', getenv('SIMPLE_JWT_PRIVATE_KEY'));
```

A database leak then doesn't include your signing key. If you enable refresh tokens, give them their own secret: never reuse the signing key.

***

## 3. Set a Short Token Expiration[​](#3-set-a-short-token-expiration "Direct link to 3. Set a Short Token Expiration")

Long-lived tokens are a liability. If a token is stolen, the attacker has access for its entire lifetime. The shorter the window, the lower the blast radius.

**Recommended starting points:**

| Application type                   | Token TTL     |
| ---------------------------------- | ------------- |
| Web SPA (frequent use)             | 15-60 minutes |
| Mobile app                         | 1-24 hours    |
| Server-to-server                   | 5-15 minutes  |
| Auto-login links (email campaigns) | 10-30 minutes |

Pair short expiration with a **token refresh** flow so legitimate users aren't constantly forced to re-authenticate. Each refresh token works once: a successful refresh invalidates it and returns a new one. The default refresh window is 2 weeks and rolls forward on each use.

```
Settings > Simple JWT Login > Authentication > JWT Expiration (minutes)
```

***

## 4. Restrict Operations with Auth Codes[​](#4-restrict-operations-with-auth-codes "Direct link to 4. Restrict Operations with Auth Codes")

Auth Codes are optional shared secrets that gate specific plugin operations: authentication, auto-login, user registration, user deletion, and password resets. If an operation requires an Auth Code and the caller doesn't provide a valid one, the request is rejected - regardless of whether a valid JWT is present.

**Always use Auth Codes for:**

* **User registration** - without one, anyone who discovers your endpoint can create WordPress accounts
* **User deletion** - even with JWT auth, an extra key adds a meaningful barrier
* **Auto-login** - a leaked JWT alone is then not enough to open a WordPress session

Auth Code configuration lets you:

* Assign each code a **WordPress role** (new users created with that code get that role)
* Set an **expiration date** (one-time integrations, temporary access)
* Create **multiple codes** for different clients or systems

```
Settings > Simple JWT Login > Auth Codes
```

An Auth Code shipped inside a browser or mobile app is not a secret, because users can extract it. There it only tells clients apart. It is a real barrier only when your own backend makes the call.

A practical pattern: one Auth Code per external system that interacts with your API. If a system is compromised, revoke its code without affecting others.

***

## 5. Enable Endpoint Protection[​](#5-enable-endpoint-protection "Direct link to 5. Enable Endpoint Protection")

The WordPress REST API leaks more data than most developers realise. Endpoints like `/wp/v2/users` expose usernames and user IDs publicly by default. Simple JWT Login's endpoint protection feature lets you require a valid JWT for any REST route.

**Two protection modes:**

**Require a valid JWT by default:** Start from a closed position. Every REST request requires a JWT unless the route has a **Public** rule. Recommended for private APIs and admin tools.

**Allow access by default:** Only routes with a **JWT required** or **JWT + Roles** rule require authentication. Everything else is public. Suitable for content sites that need public read access but authenticated writes.

Configure per-HTTP-method granularity. A common setup for a content API:

| Route          | GET       | POST      | PUT       | DELETE    |
| -------------- | --------- | --------- | --------- | --------- |
| `/wp/v2/posts` | Public    | Protected | Protected | Protected |
| `/wp/v2/users` | Protected | Protected | Protected | Protected |
| `/wp/v2/media` | Public    | Protected | Protected | Protected |

```
Settings > Simple JWT Login > Protect Endpoints
```

Rules are evaluated top to bottom and the first match wins, so put specific rules above broad ones. Since version 4.2.0, rules match the route and method WordPress actually dispatches, so `?_method=` overrides, batch requests, and `_embed` sub-requests can't get around them.

***

## 6. Restrict Auto-Login by IP Address[​](#6-restrict-auto-login-by-ip-address "Direct link to 6. Restrict Auto-Login by IP Address")

Auto-login opens a full WordPress session, so it deserves extra hardening. If only people on a known network use it, such as an office or a VPN, accept it only from those addresses.

```
Settings > Simple JWT Login > Autologin > Access Control
```

A stolen auto-login link then fails from any other network, even if the token hasn't expired. The check uses the IP address of whoever opens the link.

Behind a reverse proxy, WordPress sees the proxy's IP address. Enable [Trust reverse proxy IP headers](/docs/configuration.md#trust-reverse-proxy-ip-headers) only if a proxy you control appends to `X-Forwarded-For`. On a directly exposed server, clients can forge that header and pass your allowlist.

For email campaigns where users click from arbitrary IPs, leave the restriction disabled and use a short token TTL instead (10-15 minutes). Also enable **safe redirects** under General, so a crafted link can't send users to another site.

***

## 7. Restrict Registration by IP and Email Domain[​](#7-restrict-registration-by-ip-and-email-domain "Direct link to 7. Restrict Registration by IP and Email Domain")

Two independent controls protect the registration endpoint:

**IP allowlist:** Only allow registration requests from known origins - your front-end server, your CI pipeline, etc.

```
Settings > Simple JWT Login > Register User > Access Control > Allowed IP Addresses
```

**Email domain allowlist:** Restrict registrations to specific email domains. Useful for internal tools or invite-only platforms where only company email addresses should be allowed.

```
Settings > Simple JWT Login > Register User > Access Control > Allowed Email Domains
```

Example: allow only `@yourcompany.com` and `@partner.com` addresses. Registrations with any other address are rejected. The check reads the submitted address and is not proof that the caller owns it.

***

## 8. Use Token Revocation for Logout and Password Changes[​](#8-use-token-revocation-for-logout-and-password-changes "Direct link to 8. Use Token Revocation for Logout and Password Changes")

JWTs are stateless by design, which means a standard logout (just deleting the client-side token) doesn't actually invalidate the token server-side. If the token was copied before logout, it remains valid until expiry.

Enable the revoke endpoint to reject a token on the server before it expires:

```
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/auth/revoke" \

  -H "Authorization: Bearer <token>"
```

This call revokes the one token you send. To end **all** of a user's sessions, turn on **Revoke sessions on password change** (4.2.0, off by default) under Authentication. A password change then deletes the user's refresh tokens and rejects every JWT issued before it, including a stolen copy you never saw.

Revoking a JWT on logout won't help if you don't call it, so it's worth building into your logout flow as a required step rather than a best-effort one.

***

## 9. Configure CORS Carefully[​](#9-configure-cors-carefully "Direct link to 9. Configure CORS Carefully")

CORS decides which websites can read your API from a browser. Since version 4.1.1 it also decides which sites the plugin trusts with a JWT:

* A header, cookie, or session JWT on a cross-site request is ignored unless **Allow origin** lists that origin.
* A `*` entry accepts header JWTs from any origin, but never cookie or session JWTs.
* JWTs in the URL or body are not covered by this check.

**For production:**

1. If your front end is on another domain, enable CORS and list its exact origin.
2. Replace `*` with that list.
3. If your front end shares your WordPress domain, leave CORS disabled.

```
Settings > Simple JWT Login > CORS
```

```
Access-Control-Allow-Origin:  https://yourfrontend.com

Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS

Access-Control-Allow-Headers: Content-Type, Authorization
```

Don't move this to Apache or Nginx only: the plugin reads its own **Allow origin** list, so your front end's JWTs would be ignored. See [Cross-site requests](/docs/configuration.md#cross-site-requests).

Where possible, send tokens as `Authorization: Bearer` and disable the JWT input sources you don't use. Tokens in URLs end up in access logs and browser history.

***

## 10. Disable What You Don't Use[​](#10-disable-what-you-dont-use "Direct link to 10. Disable What You Don't Use")

Every enabled feature is an attack surface. Simple JWT Login follows a deny-by-default approach, but over time it's easy to enable features for testing and forget to turn them off.

Before going to production, audit your settings and disable:

* **Auto-login** - if you're not using magic links
* **Register users** - if registration happens through WordPress's built-in flow
* **Delete users** - unless your application explicitly needs it
* **Reset password** - if you're using a separate password management system
* **Change password** - same as above

The fewer endpoints active, the smaller the attack surface.

***

## 11. Bind Tokens to Your Site[​](#11-bind-tokens-to-your-site "Direct link to 11. Bind Tokens to Your Site")

If two sites share a signing key, or you accept tokens from an identity provider, a token meant for one app can be valid in another. Since version 4.2.0, set **Expected audience (aud)** so a JWT is only accepted when its `aud` claim contains your value:

* For tokens your site signs, set it under **Authentication**. Your site URL is a good value. Users must log in again, because older JWTs have no `aud`.
* For tokens from another issuer, set it on the [JWT Verification Rule](/docs/configuration.md#jwt-verification-rules) - typically your app's client ID.

***

## 12. Add a Second Factor and Watch the Logs[​](#12-add-a-second-factor-and-watch-the-logs "Direct link to 12. Add a Second Factor and Watch the Logs")

**Two-factor authentication.** With the [Two Factor](/docs/integrations/third-party/two-factor.md) plugin, `/auth` returns a short-lived interim JWT, and only a valid code turns it into a full JWT. Since version 4.2.0, wrong codes count toward that plugin's rate limit, and an interim JWT can be exchanged only once. Users without 2FA configured still log in with a password.

**Audit logs.** [Audit logging](/docs/audit-logs.md) is off by default. At minimum, log failed logins, failed 2FA codes, user deletions, API key changes, and settings changes.

**API keys.** For server-to-server calls, use [API keys](/docs/api-keys.md) with only the permissions the caller needs and an expiry date, instead of an administrator's JWT.

***

## Security Hardening Checklist[​](#security-hardening-checklist "Direct link to Security Hardening Checklist")

Use this before every production deployment:

* <!-- -->
  Decryption key is 32+ characters, randomly generated, not in version control
* <!-- -->
  Algorithm selected matches your use case (HS256 for simple, RS256 for shared verification)
* <!-- -->
  Every request that carries a JWT uses HTTPS
* <!-- -->
  Token expiration is set to the shortest practical TTL for your application
* <!-- -->
  Auth Codes are enabled for registration, deletion, and auto-login
* <!-- -->
  Each Auth Code is scoped to the minimum required role
* <!-- -->
  Endpoint protection is configured, and `/wp/v2/users` is not public unless you need it
* <!-- -->
  Auto-login is limited by IP when used from known networks, and safe redirects are on
* <!-- -->
  Reverse proxy headers are trusted only behind a proxy you control
* <!-- -->
  Registration IP and email domain restrictions are configured if applicable
* <!-- -->
  Your logout flow calls the revoke endpoint
* <!-- -->
  Revoke sessions on password change is on
* <!-- -->
  CORS lists exact origins instead of `*`, or is disabled
* <!-- -->
  Unused JWT input sources are disabled
* <!-- -->
  Expected audience (`aud`) is set when keys or issuers are shared
* <!-- -->
  Administrators use 2FA, and audit logging is on
* <!-- -->
  API keys have minimal permissions and an expiry date
* <!-- -->
  All unused features (register, delete, auto-login, reset password) are disabled
* <!-- -->
  Auth Code expiration dates are set for time-limited integrations

***

## Conclusion[​](#conclusion "Direct link to Conclusion")

Simple JWT Login's security posture is only as strong as its configuration. The defaults are safe - nothing is enabled you didn't ask for - but a truly hardened production setup requires deliberate choices about algorithms, key strength, Auth Codes, endpoint protection, and CORS.

Work through the checklist above before launch and revisit it whenever you enable a new feature. The goal isn't paranoia; it's ensuring that each exposed capability is intentional, scoped, and monitored.

The [full documentation](/docs.md) covers every setting in detail, and the [error codes reference](/docs/error-codes.md) is useful for debugging unexpected rejections when you tighten restrictions and something stops working.

**Tags:**

* [Tutorial](/blog/tags/tags/tutorial "Tutorials and guides for Simple JWT Login")
* [Security](/blog/tags/tags/security "WordPress REST API security and authentication best practices")

[Edit this page](https://github.com/simple-jwt-login/website/tree/main/blog/2026-03-10-security-hardening-guide.md)
