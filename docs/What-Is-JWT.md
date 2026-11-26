---
slug: /what-is-jwt-authentication/
title: What Is JWT Authentication in WordPress?
sidebar_label: What Is JWT?
description: Learn what a JWT is, how JWT authentication works with the WordPress REST API, and when to use it instead of cookies or Application Passwords.
keywords: [what is JWT, JWT authentication WordPress, JSON Web Token WordPress, WordPress REST API authentication, JWT explained, WordPress token authentication]
---

A JSON Web Token (JWT) is a short, signed piece of text that proves who a user is. In WordPress, an app logs a user in once, gets a JWT back, and sends that JWT with every REST API request instead of a password or a cookie.

## Why WordPress Needs It

WordPress logs users in with a cookie. That works for pages that WordPress itself serves, but not for:

- **Headless sites**, where the front end (Next.js, React, Angular) runs on another domain
- **Mobile apps**, which don't share the browser's cookies
- **Other servers and scripts** that call the WordPress REST API

These clients need a credential they can store and send themselves. A JWT is that credential.

## How It Works

1. The app sends the user's email and password to WordPress once.
2. WordPress checks them and returns a JWT signed with a secret key.
3. The app sends the JWT in the `Authorization` header of each request.
4. WordPress checks the signature and the expiry, then treats the request as coming from that user.

```http
GET /wp-json/wp/v2/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The password is sent only once. After that, the app only needs the token.

## What Is Inside a JWT

A JWT has three parts separated by dots: `header.payload.signature`.

| Part | Contains | Example |
| :--- | :------- | :------ |
| Header | The signing algorithm | `{"alg": "HS256", "typ": "JWT"}` |
| Payload | Claims about the user and the token | `{"id": 42, "email": "jane@example.com", "exp": 1767225600}` |
| Signature | A hash of the header and payload, made with the secret key | - |

The header and payload are only Base64-encoded, not encrypted. Anyone with the token can read them, so never put passwords or secrets in a JWT. The signature is what makes it safe: changing a single character of the payload breaks it, and only the server with the key can create a valid one.

## Signing Algorithms

- **HS256, HS384, HS512** use one shared secret to sign and verify. They are the simplest choice when only WordPress creates and checks tokens.
- **RS256, RS384, RS512** sign with a private key and verify with a public key. Use them when another service must verify tokens without being able to create them.

See [JWT Verification Rules](./Configuration.mdx) for how to set the key and algorithm.

## Expiry, Refresh, and Revocation

A JWT is valid until it expires, so keep the lifetime short - an hour is a common default. To keep users logged in, the app swaps a longer-lived [refresh token](./auth/RefreshToken.md) for a new JWT. To end a session early, for example on logout, [revoke the token](./auth/RevokeToken.md).

## JWT vs Other WordPress Authentication

| Method | Best for |
| :----- | :------- |
| JWT | Headless sites, mobile apps, and single-page apps where real users log in |
| Application Passwords | Scripts and integrations you control, built into WordPress since 5.6 |
| Cookie and nonce | Themes and plugins running on the WordPress site itself |

For a full comparison, see [WordPress JWT plugins compared](/wordpress-jwt-plugin-comparison).

## Keep Tokens Safe

- Always use HTTPS - anyone who sees a token can use it until it expires.
- Send tokens in the `Authorization` header, not in the URL, where they end up in server logs.
- In browsers, prefer an `HttpOnly` cookie set by your server over `localStorage`, which any script on the page can read.
- Use a long, random signing key, and keep it out of the database.

## Add JWT Authentication to WordPress

Simple JWT Login adds JWT authentication to the WordPress REST API, configured from wp-admin:

- [Quick start - get your first JWT in 5 minutes](./Quick-Start.md)
- [Code examples for Next.js, React, Angular, and Flutter](./code_examples/index.mdx)
- [Headless WordPress authentication](/headless-wordpress)
