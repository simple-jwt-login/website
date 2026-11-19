# New Plugin Release 3.0.0

July 11, 2021 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle.md)

[Nicu Micle](/releases/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `3.0.0` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

A major release with a rewritten plugin core, support for JSON request bodies, the Force Login integration and more ways to restrict authentication.

## New Features[​](#new-features "Direct link to New Features")

* Support JSON request bodies
* Add support for the [Force Login](/docs/integrations/third-party/force-login.md) plugin
* Show Auth Codes on the dashboard
* Use an Auth Code on the authentication endpoint
* Limit authentication by IP address, with `*` wildcards in IP restrictions
* Delete users by username

Read more about [Auth Codes](/docs/auth-codes.md).

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Fix URL-encoded `user_meta`
* Fix the user role being set to `None` when the Auth Code role is empty

## Improvements[​](#improvements "Direct link to Improvements")

* Refactor the plugin code
* Rewrite the file autoloader
* Improve how request parameters are parsed

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [feature](/releases/tags/feature.md)
* [bugfix](/releases/tags/bugfix.md)
