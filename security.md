# Security

Simple JWT Login handles logins and tokens, so security fixes come first. This page explains how to report a vulnerability, which versions get fixes, and what changed in past security releases.

## Report a Vulnerability[​](#report-a-vulnerability "Direct link to Report a Vulnerability")

**Don't report security issues in public GitHub issues, pull requests, discussions, or the WordPress.org support forum.**

Report them privately on GitHub: **[Report a vulnerability](https://github.com/nicumicle/simple-jwt-login/security/advisories/new)**.

Include:

* The affected plugin version and, if known, the file or endpoint
* The plugin settings needed to reproduce it - export them from the plugin admin, with keys and secrets removed
* Other plugins involved, such as a two-factor or Force Login plugin, and any custom hook callbacks
* Step-by-step reproduction, ideally as HTTP requests, with the expected and actual result
* The impact, and whether you tested on a real WordPress site or in a code harness

Only test on WordPress sites you own, and never access or change other users' data.

### What Happens Next[​](#what-happens-next "Direct link to What Happens Next")

1. The report is confirmed, with follow-up questions if needed.
2. Confirmed issues are fixed in a patch release, such as `4.2.1`. Every fix ships with a regression test that reproduces the original issue.
3. The disclosure date is agreed with you. Details go public only after a fixed version is on WordPress.org.
4. With your permission, you are credited in the GitHub security advisory.

### Scope[​](#scope "Direct link to Scope")

In scope: the plugin code, its REST endpoints, admin screens, integrations (OAuth providers, two-factor, WooCommerce, WPGraphQL, Force Login, AI abilities and MCP), and the JWTs it creates.

Typically out of scope:

* Issues that need administrator access to exploit, unless they cross a boundary the plugin promises to keep - for example, AI agents changing human-only settings or reading secrets
* Options that the admin screen already flags as insecure, while they are turned on
* Vulnerabilities in WordPress core, other plugins, or the server setup
* Denial of service by request volume, missing rate limits without a concrete impact, and social engineering

Not sure whether something is in scope? Report it anyway.

## Supported Versions[​](#supported-versions "Direct link to Supported Versions")

| Version        | Security fixes                                                          |
| -------------- | ----------------------------------------------------------------------- |
| 4.x            | Active - always run the latest 4.x release                              |
| 3.x            | Security and WordPress compatibility fixes only, until January 31, 2027 |
| Older than 3.0 | None                                                                    |

Still on 3.x? Follow the [upgrade guide](/docs/upgrade-v3-to-v4.md).

## Security Releases[​](#security-releases "Direct link to Security Releases")

| Version                                              | Date          | What it fixed                                                                        |
| ---------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------ |
| [4.2.0](/releases/simple-jwt-login-release-4.2.0.md) | November 2026 | JWT audience checks, session revocation on password change, and many hardening fixes |
| [4.1.1](/releases/simple-jwt-login-release-4.1.1.md) | November 2026 | Stricter CORS origin rules for JWTs sent by browsers on other sites                  |
| [4.1.0](/releases/simple-jwt-login-release-4.1.0.md) | November 2026 | Security hardening across the plugin                                                 |
| [4.0.1](/releases/simple-jwt-login-release-4.0.1.md) | August 2026   | Google OAuth security improvement                                                    |
| [3.6.5](/releases/simple-jwt-login-release-3.6.5.md) | March 2026    | Security patch for 3.x                                                               |
| [3.5.8](/releases/simple-jwt-login-release-3.5.8.md) | February 2025 | Safe redirects against open redirect attacks                                         |
| [3.4.7](/releases/simple-jwt-login-release-3.4.7.md) | October 2022  | A JWT library vulnerability and a local file inclusion risk                          |
| [3.3.1](/releases/simple-jwt-login-release-3.3.1.md) | October 2021  | Safer view loading                                                                   |
| [3.3.0](/releases/simple-jwt-login-release-3.3.0.md) | October 2021  | Sanitized text and stronger random passwords                                         |
| [3.2.1](/releases/simple-jwt-login-release-3.2.1.md) | October 2021  | CSRF protection for admin settings                                                   |
| [1.3.1](/releases/simple-jwt-login-release-1.3.1.md) | December 2019 | Settings limited to administrators                                                   |

See every release tagged [security](/releases/tags/security).

## Built-in Protections[​](#built-in-protections "Direct link to Built-in Protections")

* **Off by default.** Every plugin endpoint starts disabled, so you expose only what your app needs.
* **Regression tests.** A [security test suite](https://github.com/nicumicle/simple-jwt-login/tree/master/tests/Feature/Security) covers CSRF, user enumeration, trusted proxy IPs, and ambient credentials, so fixed issues stay fixed.
* **Open source.** All of the code is on [GitHub](https://github.com/nicumicle/simple-jwt-login) under GPLv3, so anyone can review it.

## Secure Your Site[​](#secure-your-site "Direct link to Secure Your Site")

* [Security hardening guide](/blog/simple-jwt-login-security-hardening.md) - the settings to check before you go live
* [CORS](/docs/cors.md) - which sites may send a JWT
* [Protect Endpoints](/docs/protect-endpoints.md) - require a JWT on REST routes
* [Revoke tokens](/docs/revoke-token.md) - end a session before the JWT expires
