# New Plugin Release 4.1.1

November 15, 2026 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle.md)

[Nicu Micle](/releases/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `4.1.1` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

A security release. Updating is recommended for everyone. If a browser app on another origin sends the JWT, list that origin in the CORS **Allow origin** setting before updating.

## Security[​](#security "Direct link to Security")

* Fixed a security vulnerability affecting JWT authentication of REST requests (reported via Patchstack)

## Breaking Changes[​](#breaking-changes "Direct link to Breaking Changes")

* Cross-origin browser apps that send the JWT must have their origin listed in the CORS **Allow origin** setting. A `*` entry trusts the `Authorization` header only - cookie and session JWTs are never trusted
* With CORS disabled (or **Allow origin** off), a JWT sent by a browser page on another site, even in the `Authorization` header, is ignored

Requests from the site itself, server-to-server calls, mobile apps and JWTs passed in the URL (for example, autologin links) are not affected.

Read more about [cross-site requests](/docs/configuration.md#cross-site-requests) and [CORS](/docs/cors.md).

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Fix "JWT from session" making every plugin endpoint and Protect Endpoints fail with a `500` error (call to an undefined session function)

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [security](/releases/tags/security.md)
* [bugfix](/releases/tags/bugfix.md)
