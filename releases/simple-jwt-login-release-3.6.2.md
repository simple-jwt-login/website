# New Plugin Release 3.6.2

April 9, 2025 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle.md)

[Nicu Micle](/releases/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `3.6.2` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

This update fixes issues with the Protect Endpoints feature blocking WordPress admin requests and missing JWT session lookup.

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Fix: Protect Endpoints was incorrectly blocking WordPress backend (admin) endpoints [#146](https://github.com/nicumicle/simple-jwt-login/issues/146)
* Ensure Protect Endpoints searches for the JWT in the PHP session

Read more about Protect Endpoints [here](/docs/protect-endpoints.md).

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [bugfix](/releases/tags/bugfix.md)
