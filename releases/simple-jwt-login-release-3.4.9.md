# New Plugin Release 3.4.9

December 4, 2022 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle.md)

[Nicu Micle](/releases/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `3.4.9` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

This update introduces several new features around password handling, autologin flexibility, and a new plugin lifecycle hook.

## New Features[​](#new-features "Direct link to New Features")

* Add a strength indicator for the JWT decryption key
* Allow setting a custom length for randomly generated passwords (default: 10 characters)
* Allow sending base64-encoded `password` and `passhash` on the `/auth` endpoint
* Add query parameters filter on autologin redirect
* Add the `simple_jwt_login_before_endpoint` hook, fired before all plugin routes are initialized

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Fix `includeRequestParameters` building incorrect redirect URLs

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [bugfix](/releases/tags/bugfix.md)
* [feature](/releases/tags/feature.md)
