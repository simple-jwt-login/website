# New Plugin Release 4.0.1

August 9, 2026 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle.md)

[Nicu Micle](/releases/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `4.0.1` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

The first patch release for the 4.x line. It narrows Protect Endpoints to REST requests, hardens Google OAuth and improves how reserved JWT claims are handled.

## Security[​](#security "Direct link to Security")

* Improve Google OAuth security. Thanks to [@FaridNarimanov](https://github.com/FaridNarimanov) for reporting it ([#174](https://github.com/nicumicle/simple-jwt-login/issues/174))

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Protect Endpoints rules now apply only to REST API endpoints, so regular front-end and admin pages are no longer affected
* Improve how reserved claims (such as `exp` and `iat`) are stripped from custom JWT payload data

Read more about [Protect Endpoints](/docs/protect-endpoints.md).

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [bugfix](/releases/tags/bugfix.md)
* [security](/releases/tags/security.md)
