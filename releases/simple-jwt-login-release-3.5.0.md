# New Plugin Release 3.5.0

January 5, 2023 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle.md)

[Nicu Micle](/releases/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `3.5.0` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

This update fixes compatibility issues with Protect Endpoints, improves Reset Password, and drops legacy PHP support.

## New Features[​](#new-features "Direct link to New Features")

* Search user by email on Reset Password [#31](https://github.com/nicumicle/simple-jwt-login/issues/31)

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Fix: unable to create a post when Protect Endpoints is enabled for all endpoints [#62](https://github.com/nicumicle/simple-jwt-login/issues/62)

## Improvements[​](#improvements "Direct link to Improvements")

* Switch `get_user_by_email` to `get_user_by()` due to WordPress deprecation
* Remove `convertUserToArray` method from `WordPressData`
* Drop support for PHP 5.3 and PHP 5.4

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [bugfix](/releases/tags/bugfix.md)
* [feature](/releases/tags/feature.md)
