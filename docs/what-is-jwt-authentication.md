# What Is JWT Authentication in WordPress?

A JSON Web Token (JWT) is a short, signed piece of text that proves who a user is. In WordPress, an app logs a user in once, gets a JWT back, and sends that JWT with every REST API request instead of a password or a cookie.

## Why WordPress Needs It[​](#why-wordpress-needs-it "Direct link to Why WordPress Needs It")

WordPress logs users in with a cookie. That works for pages that WordPress itself serves, but not for:

* **Headless sites**, where the front end (Next.js, React, Angular) runs on another domain
* **Mobile apps**, which don't share the browser's cookies
* **Other servers and scripts** that call the WordPress REST API

These clients need a credential they can store and send themselves. A JWT is that credential.

## How It Works[​](#how-it-works "Direct link to How It Works")

1. The app sends the user's email and password to WordPress once.
2. WordPress checks them and returns a JWT signed with a secret key.
3. The app sends the JWT in the `Authorization` header of each request.
4. WordPress checks the signature and the expiry, then treats the request as coming from that user.

```
GET /wp-json/wp/v2/users/me

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The password is sent only once. After that, the app only needs the token.

## What Is Inside a JWT[​](#what-is-inside-a-jwt "Direct link to What Is Inside a JWT")

A JWT has three parts separated by dots: `header.payload.signature`.

| Part      | Contains                                                   | Example                                                      |
| --------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| Header    | The signing algorithm                                      | `{"alg": "HS256", "typ": "JWT"}`                             |
| Payload   | Claims about the user and the token                        | `{"id": 42, "email": "jane@example.com", "exp": 1767225600}` |
| Signature | A hash of the header and payload, made with the secret key | -                                                            |

The header and payload are only Base64-encoded, not encrypted. Anyone with the token can read them, so never put passwords or secrets in a JWT. The signature is what makes it safe: changing a single character of the payload breaks it, and only the server with the key can create a valid one.

## Signing Algorithms[​](#signing-algorithms "Direct link to Signing Algorithms")

* **HS256, HS384, HS512** use one shared secret to sign and verify. They are the simplest choice when only WordPress creates and checks tokens.
* **RS256, RS384, RS512** sign with a private key and verify with a public key. Use them when another service must verify tokens without being able to create them.

See [JWT Verification Rules](/docs/configuration.md) for how to set the key and algorithm.

## Expiry, Refresh, and Revocation[​](#expiry-refresh-and-revocation "Direct link to Expiry, Refresh, and Revocation")

A JWT is valid until it expires, so keep the lifetime short - an hour is a common default. To keep users logged in, the app swaps a longer-lived [refresh token](/docs/refresh-token.md) for a new JWT. To end a session early, for example on logout, [revoke the token](/docs/revoke-token.md).

## JWT vs Other WordPress Authentication[​](#jwt-vs-other-wordpress-authentication "Direct link to JWT vs Other WordPress Authentication")

| Method                | Best for                                                                  |
| --------------------- | ------------------------------------------------------------------------- |
| JWT                   | Headless sites, mobile apps, and single-page apps where real users log in |
| Application Passwords | Scripts and integrations you control, built into WordPress since 5.6      |
| Cookie and nonce      | Themes and plugins running on the WordPress site itself                   |

For a full comparison, see [WordPress JWT plugins compared](/wordpress-jwt-plugin-comparison.md).

## Keep Tokens Safe[​](#keep-tokens-safe "Direct link to Keep Tokens Safe")

* Always use HTTPS - anyone who sees a token can use it until it expires.
* Send tokens in the `Authorization` header, not in the URL, where they end up in server logs.
* In browsers, prefer an `HttpOnly` cookie set by your server over `localStorage`, which any script on the page can read.
* Use a long, random signing key, and keep it out of the database.

## Add JWT Authentication to WordPress[​](#add-jwt-authentication-to-wordpress "Direct link to Add JWT Authentication to WordPress")

Simple JWT Login adds JWT authentication to the WordPress REST API, configured from wp-admin:

* [Quick start - get your first JWT in 5 minutes](/docs/quick-start.md)
* [Code examples for Next.js, React, Angular, and Flutter](/docs/code-examples.md)
* [Headless WordPress authentication](/headless-wordpress.md)
