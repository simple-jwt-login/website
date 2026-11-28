Free & Open Source WordPress Plugin

![Simple JWT Login logo](assets/favicons/apple-touch-icon.png "Simple JWT Login logo")

# Simple JWT Login

JWT login, registration, and endpoint protection for the WordPress REST API -<br />for headless sites, mobile apps, and WPGraphQL. Configured from wp-admin.

[Get started →](/docs.md "Get started")[ ](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/nicumicle/simple-jwt-login/master/wordpress.org/assets/blueprints/blueprint.json "Open the Simple JWT Login live demo in WordPress Playground")

<!-- -->

[Live Demo](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/nicumicle/simple-jwt-login/master/wordpress.org/assets/blueprints/blueprint.json "Open the Simple JWT Login live demo in WordPress Playground")

[Download v4](https://github.com/nicumicle/simple-jwt-login/blob/master/download/simple-jwt-login.zip?raw=true "Download v4")

4,000

<!-- -->

+Active installs

100,000

<!-- -->

+Downloads

5

<!-- -->

/ 5Rating

100%Free

<br />

6+ yearsActive development

NewSimple JWT Login v4 is now available - API Keys, 2FA, Audit Logs, Webhooks, and more. v3 is now in maintenance mode (EOL Jan 31, 2027).[See what's new →](/v4.md "See what's new in v4")

Core Features

## From first login to token revocation

Each feature is tagged **V3** or **V4** depending on which version introduced it.

AllV3V4

V3V4

![Login user](assets/svg/login-user-2.svg "Login user")

### [Autologin](/docs/autologin.md "Login user")

Open a WordPress session from a JWT link - for example, send a renewal email that lands the member on their account page, already logged in.

[read more](/docs/autologin.md "Login user")

V3V4

![Register user](assets/svg/create-user.svg "Register user")

### [Register Users](/docs/register-user.md "Register user")

Create WordPress users from a mobile sign-up screen, and limit who can register by Auth Code, IP, or email domain.

[read more](/docs/register-user.md "Register user")

V3V4

![Delete user](assets/svg/delete-user.svg "Delete user")

### [Delete Users](/docs/delete-user.md "Delete user")

Offer an account deletion button in your app. The JWT identifies the account to remove.

[read more](/docs/delete-user.md "Delete user")

V3V4

![Authenticate user](assets/svg/authenticate-user.svg "Authenticate user")

### [Authenticate Users](/docs/authentication.md "Authenticate user")

Exchange WordPress credentials for a JWT, then refresh, validate, or revoke it - the login flow for a React or mobile app.

[read more](/docs/authentication.md "Authenticate user")

V3V4

![Change and Reset password](assets/images/features/password.png "Change and Reset password")

### [Change & Reset Password](/docs/reset-password.md "Change and Reset password")

Build a "Forgot password" screen in your app: email a reset code, then set the new password through the REST API.

[read more](/docs/reset-password.md "Change and Reset password")

V3V4

![Limit access by IP](assets/images/features/ip.png "Limit access by IP")

### [Limit Access by IP](/docs/authentication.md#access-control "Limit access by IP")

Accept logins or registrations only from your backend or office network - wildcards such as `85.*.*.*` work too.

[read more](/docs/authentication.md#access-control "Limit access by IP")

V3V4

![Roles](assets/images/features/roles.png "Roles")

### [Create Users with Different Roles](/docs/register-user.md#new-user-settings "Roles")

Tie a role to each Auth Code - for example, one code for free members and another for premium - on a single endpoint.

[read more](/docs/register-user.md#new-user-settings "Roles")

V3V4

![Integrate with other plugins](assets/images/features/plug-in.png "Integrate with other plugins")

### [Integrate with Other Plugins](/docs/mailpoet.md "Integrate with other plugins")

Send login links from MailPoet, authorize WPGraphQL queries, or call the REST routes that other plugins add.

[read more](/docs/mailpoet.md "Integrate with other plugins")

V3V4

![Protect endpoints](assets/images/features/protect-endpoints.png "Protect endpoints")

### [Protect Endpoints](/docs/protect-endpoints.md "Protect endpoints")

Require a JWT or a role per route and HTTP method - for example, stop anonymous visitors from listing `/wp/v2/users`.

[read more](/docs/protect-endpoints.md "Protect endpoints")

V3V4

![JWT on other endpoints](assets/images/features/protect.png "JWT on other endpoints")

### [Use JWT on Any Endpoint](/docs/configuration.md#jwt-middleware-for-all-wordpress-endpoints "JWT on other endpoints")

Publish a post to `/wp/v2/posts` from a mobile app as the logged-in author, without session cookies.

[read more](/docs/configuration.md#jwt-middleware-for-all-wordpress-endpoints "JWT on other endpoints")

V3V4

![Google OAuth](assets/images/features/google-plus.png "Google OAuth")

### [Google OAuth Integration](/docs/integrations/oauth/google/setup.md "Google OAuth")

Add Google sign-in to your front end and get a WordPress JWT back, so users have no extra password to remember.

[read more](/docs/integrations/oauth/google/setup.md "Google OAuth")

V3V4

![Google OAuth endpoints](assets/images/features/google-plus-jwt.png "Google OAuth endpoints")

### [Use Google JWT on All Endpoints](/docs/integrations/oauth.md#allow-usage-on-all-endpoints "Google OAuth endpoints")

Already use Google sign-in in your app? Send the Google-issued token directly to WordPress REST endpoints.

[read more](/docs/integrations/oauth.md#allow-usage-on-all-endpoints "Google OAuth endpoints")

V4

### [API Keys](/docs/api-keys.md "API Keys")

Give a CI pipeline a key that can only read and create content, with an expiry date you choose.

[read more](/docs/api-keys.md "API Keys")

V4

### [Sign In with Auth0, Facebook & GitHub](/docs/integrations/oauth.md "OAuth with Auth0, Facebook, and GitHub")

Use the identity provider you already have: exchange an Auth0, Facebook, or GitHub login for a WordPress JWT.

[read more](/docs/integrations/oauth.md "OAuth with Auth0, Facebook, and GitHub")

V4

### [Two-Factor Authentication](/docs/integrations/third-party/two-factor.md "Two-Factor Authentication")

A stolen password alone gets no JWT: users with 2FA in the WordPress Two Factor plugin must also enter their code.

[read more](/docs/integrations/third-party/two-factor.md "Two-Factor Authentication")

V4

### [Audit Logs](/docs/audit-logs.md "Audit Logs")

Find out who deleted an account or why a login failed - search authentication events in wp-admin.

[read more](/docs/audit-logs.md "Audit Logs")

V4

### [Webhooks](/docs/webhooks.md "Webhooks")

Post to Slack when a user registers, or forward authentication events to your logging service.

[read more](/docs/webhooks.md "Webhooks")

V4

### [Headless WooCommerce](/docs/integrations/third-party/woocommerce.md "Headless WooCommerce")

Build a React storefront: manage products and run the cart & checkout through the WooCommerce REST and Store APIs.

[read more](/docs/integrations/third-party/woocommerce.md "Headless WooCommerce")

V4

### [Multiple JWT Decryption Keys](/docs/configuration.md#jwt-verification-rules "Multiple JWT Decryption Keys")

Accept Auth0 tokens next to your own, or rotate keys in stages - rules pick the key from a JWT header or payload claim.

[read more](/docs/configuration.md#jwt-verification-rules "Multiple JWT Decryption Keys")

V4

### [JWT Decoder](/docs/dashboard.md "JWT Decoder")

Debug a rejected token without pasting it into a third-party site: read its header and payload in wp-admin.

[read more](/docs/dashboard.md "JWT Decoder")

Benefits

## Why developers choose Simple JWT Login

### No coding required

Keys, expiration, allowed IPs, and protected routes are all settings in wp-admin.

### 6 supported algorithms

Sign with a shared secret (HS256/384/512), or use RS256/384/512 so other services can verify tokens with only the public key.

### 4 JWT delivery methods

Authorization header, cookie, session, or request parameter. Turn off the ones your app does not use.

### Built for developers

Action and filter hooks let you add JWT claims, block a login, or change an API response from your own plugin.

### CORS per origin

List the exact front-end origins that can call your API, so a React or Vue app on another domain can log users in.

### PHP 5.5+ compatible

The plugin code runs on PHP 5.5+, so your WordPress version sets the minimum. PHP 8.2 or newer is recommended in production.

### Auto-login & magic links

Put a short-lived JWT in an email link and the subscriber lands on the page already logged in.

### Full token lifecycle

Keep a mobile user signed in with refresh tokens, and revoke the JWT when they log out.

### Free & open source

GPL 3.0 licensed, free and open-source, forever. No paid tier and no locked features.

Security

## Secure defaults you can verify

A login plugin guards your whole site. Here is how the latest v4 release limits what an attacker can do, and how the project tests and fixes it - each card links to the details.

### Off by default

Every plugin endpoint starts disabled. You expose only the operations your app needs.

[Hardening guide](/blog/simple-jwt-login-security-hardening.md)

<!-- -->

[ →](/blog/simple-jwt-login-security-hardening.md)

### Cross-site request checks

Cookie and session JWTs are ignored on cross-site requests unless you list that exact origin, which blocks CSRF.

[How it works](/docs/configuration.md#cross-site-requests)

<!-- -->

[ →](/docs/configuration.md#cross-site-requests)

### Tokens you can take back

Refresh tokens rotate on every use, JWTs can be revoked, and an optional setting ends sessions when a password changes.

[Session revocation](/docs/authentication.md#revoke-sessions-on-password-change)

<!-- -->

[ →](/docs/authentication.md#revoke-sessions-on-password-change)

### Hashed, least-privilege keys

API keys are stored only as SHA-256 hashes. Permissions follow the dispatched method, so method overrides cannot raise them.

[API key design](/docs/api-keys.md)

<!-- -->

[ →](/docs/api-keys.md)

### Security vulnerability fixes

Reported vulnerabilities are fixed and shipped in regular releases, documented in the release notes.

[Security releases](/releases/tags/security)

<!-- -->

[ →](/releases/tags/security)

### Security regression tests

A dedicated security test suite covers CSRF, user enumeration, trusted proxy IPs and ambient credentials, so fixed issues stay fixed.

[Browse the tests](https://github.com/nicumicle/simple-jwt-login/tree/master/tests/Feature/Security)

<!-- -->

[ →](https://github.com/nicumicle/simple-jwt-login/tree/master/tests/Feature/Security)

### Continuous integration

Unit, feature and cross-site test suites run automatically in GitHub Actions.

[CI workflows](https://github.com/nicumicle/simple-jwt-login/actions)

<!-- -->

[ →](https://github.com/nicumicle/simple-jwt-login/actions)

### WordPress compatibility testing

Feature tests run against a real WordPress install, alongside PHP syntax checks across multiple PHP versions and the official WordPress Plugin Check.

[View the workflows](https://github.com/nicumicle/simple-jwt-login/tree/master/.github/workflows)

<!-- -->

[ →](https://github.com/nicumicle/simple-jwt-login/tree/master/.github/workflows)

### Responsible disclosure

Found a vulnerability? Report it privately through GitHub security advisories instead of opening a public issue, so a fix can ship before details go public.

[Report a vulnerability](https://github.com/nicumicle/simple-jwt-login/security/advisories/new)

<!-- -->

[ →](https://github.com/nicumicle/simple-jwt-login/security/advisories/new)

Ecosystem

## SDKs and integrations for PHP, JavaScript, WPGraphQL, and WP-CLI

### PHP

Connect any PHP app to Simple JWT Login with one Composer package - supports Laravel, Yii, CodeIgniter, and more.

![PHP](assets/images/frameworks/php.png "PHP")![Laravel](assets/images/frameworks/laravel.png "Laravel")![Yii](assets/images/frameworks/yii.png "Yii")![CodeIgniter](assets/images/frameworks/codeigniter.png "CodeIgniter")

`composer require "nicumicle/simple-jwt-login-client-php"`

[Learn more](/ecosystem/php-sdk.md "Learn more")[Download](https://packagist.org/packages/nicumicle/simple-jwt-login-client-php "Download PHP")

### JavaScript

Add JWT authentication to React, Vue, Angular, or any JS app with an npm package and a handful of lines.

![JavaScript](assets/images/frameworks/javascript.png "JavaScript")![Vue](assets/images/frameworks/vue.png "Vue")![React](assets/images/frameworks/react.png "React")![Angular](assets/images/frameworks/angular.png "Angular")

`npm install simple-jwt-login`

[Learn more](/ecosystem/js-sdk.md "Learn more")[Download](https://www.npmjs.com/package/simple-jwt-login "Download JavaScript")

### WPGraphQL

Use your JWTs to authenticate GraphQL queries and mutations - enable it with a single checkbox.

![WPGraphQL](assets/images/screenshots/third-party-integrations/wpgraphql-logo.png "WPGraphQL")

[Learn more](/docs/integrations/third-party/wpgraphql.md "Learn more")

### MailPoet

Send magic-link login emails via MailPoet - let subscribers log in with one click, no password required.

[Learn more](/ecosystem/mailpoet.md "Learn more")[Download](https://wordpress.org/plugins/simple-jwt-login-mailpoet "Download MailPoet")

### Export & Import

Back up and restore your entire plugin configuration in one click - perfect for staging-to-production migrations.

[Learn more](/ecosystem/export-import.md "Learn more")[Download](https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip "Download Export & Import")

### WP-CLI

Built into the plugin since 4.3.0. Issue and revoke JWTs, rotate signing keys, manage API keys and settings, and read audit logs with wp jwt.

`wp jwt generate admin --ttl=10`

[Learn more](/ecosystem/cli.md "Learn more")

[View all integrations & SDKs →](/ecosystem.md "View all integrations & SDKs")

<!-- -->

Try it live

## Try the API against your own site

Run live demos right in your browser, against your own WordPress site - nothing is sent anywhere except the URL you provide.

[View all demos →](/demos.md "View all demos")

<!-- -->

One-click deploy

## Don't have a site yet? Launch one in one click

Spin up a fully installed WordPress server on DigitalOcean - with Simple JWT Login ready for headless and REST API authentication. No Marketplace setup, no terminal, no install wizard. We hand you the login.

[Deploy WordPress →](/deploy-wordpress.md "Deploy WordPress on DigitalOcean")

Quick Start

## Up and running in 3 steps

1

**Install & Activate**

Search for Simple JWT Login in the WordPress plugin directory, install, and activate in one click.

2

**Configure Settings**

Set a JWT secret key, enable the endpoints you need (all are off by default), and choose how long tokens live.

3

**Send the JWT**

Call POST /auth to get a JWT, then send it as a Bearer token to the WordPress REST API endpoints you enable.

[Get started →](/docs.md "Read the documentation")

Community

## Join the community

Simple JWT Login is built in the open, by the community. Whether you write code, speak another language, or just want to spread the word - there's a place for you.

### Star on GitHub

Show your appreciation and help others discover the project.

[Star on GitHub →](https://github.com/nicumicle/simple-jwt-login "GitHub repository")

### Contribute Code

Submit issues, propose features, or open a pull request on GitHub.

[Open a PR →](https://github.com/nicumicle/simple-jwt-login/pulls "GitHub Pull Requests")

### Rate on WordPress

Love the plugin? A 5-star review on WordPress.org makes a big difference.

[Leave a review →](https://wordpress.org/plugins/simple-jwt-login/#reviews "Rate on WordPress.org")

### Help Translate

Make JWT auth accessible in every language - join us on translate.wordpress.org.

[Start translating →](https://translate.wordpress.org/projects/wp-plugins/simple-jwt-login/ "Translate Simple JWT Login")

Reviews

## What developers are saying

<!-- -->

[@PDXMUSIC](https://wordpress.org/support/users/pdxmusic/ "\[object Object]")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")

Awesome plugin

"<!-- -->The plugin works perfect and the support is even better!<!-- -->"

<!-- -->

[@lejager](https://wordpress.org/support/users/lejager/ "\[object Object]")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")

Thanks for a great plugin

"<!-- -->Works like a dream. Does what it needs to do. Thanks!<!-- -->"

<!-- -->

[@nilsnolde](https://wordpress.org/support/users/nilsnolde/ "\[object Object]")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")

Amazing work

"<!-- -->This plugin serves now as a one-stop shop for JWT authentication, esp for headless WP/web app setups. The even better part is the author who's extremely helpful, swift in responding & fixing issues, acknowledging improvement suggestions, pleasing to talk to and patient. I hope you can keep up the dedicated work, Nicu!<!-- -->"

<!-- -->

[@mdruart](https://wordpress.org/support/users/mdruart/ "\[object Object]")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")

Really good plugin, very straight forward

"<!-- -->Really good plugin, very straight forward to use<!-- -->"

<!-- -->

[@thehinesgaphideaway](https://wordpress.org/support/topic/no-nonsense-jwt-excellence/ "\[object Object]")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")

No-Nonsense JWT (Excellence)

"<!-- -->This is probably the very absolute best no-nonsense JWT plugin on WordPress. Exceptionally well documented, high customization, easy to setup, and works out of the box with basic setup. No nonsense ads, either. Definitely deserving the 5-star rating across the board. Recommended.<!-- -->"

<!-- -->

[@wintear](https://wordpress.org/support/topic/service-support/ "\[object Object]")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")

Service & Support

"<!-- -->JWT login plugin is awesome, their support is quite responsive and efficient. They are able to help me and guide me on my customize function to custom generate jwt using their classes.<!-- -->"

<!-- -->

[@graphems](https://wordpress.org/support/topic/awesome-plugin-6632/ "\[object Object]")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")

Awesome plugin

"<!-- -->This is what I needed, works as expected. Nice work!<!-- -->"

<!-- -->

[@bigbear67](https://wordpress.org/support/topic/best-all-times/ "\[object Object]")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")![star](assets/svg/star.svg "star")

best all times

"<!-- -->it's the best of all JWT plugins, the responsiveness of the developer is simply incredible, he knows his project by heart and will help you efficiently.<!-- -->"

[View more reviews →](https://wordpress.org/support/plugin/simple-jwt-login/reviews/ "View more reviews")

## Get your first WordPress JWT in 5 minutes

Install the plugin, set a secret key, and call POST /auth. Free and open-source, forever - no account required.

[Get started →](/docs.md "Read the documentation")

[Download v4](https://github.com/nicumicle/simple-jwt-login/blob/master/download/simple-jwt-login.zip?raw=true "Download v4")
