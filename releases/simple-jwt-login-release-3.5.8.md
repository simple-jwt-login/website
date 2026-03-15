# New Plugin Release 3.5.8

February 14, 2025 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle.md)

[Nicu Micle](/releases/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `3.5.8` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

This update improves redirect security and ensures the JWT middleware only runs once per request.

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Use `wp_safe_redirect` for all plugin redirects to prevent open redirect vulnerabilities [#115](https://github.com/nicumicle/simple-jwt-login/issues/115)
* Ensure the JWT middleware only runs once per request [#125](https://github.com/nicumicle/simple-jwt-login/issues/125)

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [bugfix](/releases/tags/bugfix.md)
