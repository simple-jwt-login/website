# New Plugin Release 4.1.0

November 11, 2026 ·

<!-- -->

3 min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle)

[Nicu Micle](/releases/authors/nicumicle)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `4.1.0` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

This release adds the AI Abilities (MCP) integration, hardens security across Protect Endpoints, registration, webhooks and integrations, cuts database work on every authenticated request and fixes CORS headers on error responses. Updating is recommended for everyone.

## New Features[​](#new-features "Direct link to New Features")

* **AI Abilities (MCP)** - let AI agents manage and troubleshoot the plugin through the WordPress Abilities API (WordPress 6.9+). Read more about the [AI Abilities integration](/docs/integrations/third-party/ai-abilities.md).
* **CORS: multiple allowed origins** - `Access-Control-Allow-Origin` now accepts a comma-separated list. The matching request origin is echoed back, and `*` echoes the request origin so credentialed requests work ([#179](https://github.com/nicumicle/simple-jwt-login/issues/179)). Read more about [CORS](/docs/cors.md).
* **New API Keys setting - Update "Last used"** - choose whether a key's "Last used" time is saved at most once per minute (the new default) or on every request. Read more about [API Keys](/docs/api-keys.md).

## Security[​](#security "Direct link to Security")

* Fix CSRF in the Force Login integration on cookie-authenticated REST requests (reported via Patchstack)
* The JWT middleware and the WooCommerce integration now check the resolved REST route instead of searching the URL
* Protect Endpoints now enforces **JWT + Roles** rules for logged-in (cookie-authenticated) users and API key owners. Read more about [Protect Endpoints](/docs/protect-endpoints.md).
* Registration never sets capability, user level or session meta keys from the request, even when they are listed in **Allowed User Meta Keys**
* Webhook calls time out after at most 30 seconds (`0` now means 30 seconds instead of no timeout), so a slow webhook endpoint can't hang logins
* Secrets (auth codes, JWT rule keys, webhook header values) are no longer written in plain text to the **Settings Saved** audit log entry

## Performance[​](#performance "Direct link to Performance")

* Login no longer creates two WordPress sessions instead of one (autologin, register with auto-login, OAuth), reducing database writes per login
* The API key "last used" timestamp is updated at most once per minute per key by default, instead of on every request
* Remove an extra database query on every API key request
* WooCommerce integration: JWT requests are authenticated without a full login, so API calls no longer create a new WordPress session, set auth cookies or fire `wp_login` on every request
* Load the WordPress admin user functions only when deleting a user, instead of on every request
* Protect Endpoints no longer checks the revoked-token table twice for every JWT-authenticated request, and checks access once per REST request instead of every time WordPress reads the route list
* The Force Login, WooCommerce and WPGraphQL integrations reuse the plugin settings instead of re-reading and decoding them on every REST request

## Bug Fixes[​](#bug-fixes "Direct link to Bug Fixes")

* Fix CORS headers missing on REST error responses (`401`/`403` from JWT authentication and protected endpoints) ([#179](https://github.com/nicumicle/simple-jwt-login/issues/179))

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [feature](/releases/tags/feature)
* [security](/releases/tags/security)
* [bugfix](/releases/tags/bugfix)
