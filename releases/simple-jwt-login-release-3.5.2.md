# New Plugin Release 3.5.2

November 2, 2023 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle.md)

[Nicu Micle](/releases/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `3.5.2` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

This update adds `iss` support to the JWT payload, tightens revoked token enforcement, and fixes several bugs.

## New Features[​](#new-features "Direct link to New Features")

* Add `iss` (issuer) claim to the JWT payload with a configurable value

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Fix: user could change their password using a revoked JWT
* Fix: protected endpoints could be accessed with a revoked token [#75](https://github.com/nicumicle/simple-jwt-login/issues/75)
* Fix user meta not being saved correctly on user registration [#86](https://github.com/nicumicle/simple-jwt-login/issues/86)
* Change route priorities from floats to integers to fix the PHP deprecation warning "Implicit conversion from float to int loses precision"

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [bugfix](/releases/tags/bugfix.md)
* [feature](/releases/tags/feature.md)
