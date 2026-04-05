# New Plugin Release 3.6.5

March 14, 2026 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle.md)

[Nicu Micle](/releases/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `3.6.5` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

This is a **security and maintenance release**. We strongly recommend updating immediately.

## Security Fix[​](#security-fix "Direct link to Security Fix")

This release addresses a **Stored Cross-Site Scripting (XSS)** vulnerability identified as **CVE-2025-58648**. Stored XSS vulnerabilities allow an attacker to inject malicious scripts that are persisted on the server and executed in the browsers of other users. This fix prevents unsanitized input from being stored and rendered as HTML.

If you are running an older version, please update as soon as possible to protect your site and users.

* Fix CVE-2025-58648 - Stored Cross-Site Scripting vulnerability ([PR #162](https://github.com/nicumicle/simple-jwt-login/pull/162))

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Fix Reset Password: the function was not applying base64 encoding logic, preventing users from using special characters in their passwords ([#161](https://github.com/nicumicle/simple-jwt-login/issues/161), [PR #163](https://github.com/nicumicle/simple-jwt-login/pull/163))
* Fix PHP session initialization warning ([#159](https://github.com/nicumicle/simple-jwt-login/issues/159))

## Compatibility[​](#compatibility "Direct link to Compatibility")

* Update WordPress 6.9 Compatibility

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [bugfix](/releases/tags/bugfix.md)
* [security](/releases/tags/security.md)
