# New Plugin Release 3.4.8

November 5, 2022 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle.md)

[Nicu Micle](/releases/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `3.4.8` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

This update brings new filter hooks, improved security through request sanitization, and a bug fix for passwords with special characters.

## New Features[​](#new-features "Direct link to New Features")

* Add `simple_jwt_login_generate_payload` filter to allow customization of the authentication payload
* `/auth/validate` endpoint now supports both `GET` and `POST` methods

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Fix password that contains special characters [#50](https://github.com/nicumicle/simple-jwt-login/issues/50)

## Improvements[​](#improvements "Direct link to Improvements")

* Change how the user is logged in when using the Protect Endpoints feature
* Refactor `RouteService::getUserFromJWT` method
* Sanitize all data from incoming requests
* Update License to GPL v3

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [bugfix](/releases/tags/bugfix.md)
* [feature](/releases/tags/feature.md)
