Ecosystem

# Extend Simple JWT Login

Add-ons, integrations, and client SDKs that bring JWT authentication to every corner of your stack - CLI pipelines, headless frontends, email campaigns, and more.

3Add-ons

2Integrations

2Client SDKs

100%Free & open source

WordPress plugins

## Add-ons

Standalone WordPress plugins that extend Simple JWT Login with new capabilities. Install them the same way you install any WordPress plugin.

### WP-CLI (built-in)

Stable

wp jwt commands, part of the plugin since 4.3.0

Set up the plugin, issue and revoke JWTs, rotate signing keys, manage API keys, auth codes and settings, and read audit logs from WP-CLI. Replaces the deprecated Simple JWT Login CLI add-on.

DevOpsCI/CDAutomation

[Learn more](/ecosystem/cli.md "Learn more")

<!-- -->

[ →](/ecosystem/cli.md "Learn more")[GitHub](https://github.com/nicumicle/simple-jwt-login/blob/master/CLI.md "GitHub")

What it does

* Issue, validate and revoke JWTs
* Signing key rotation
* Config export / import with diff
* Diagnostics and audit log queries

[View documentation →](/docs/cli.md "View documentation")

### MailPoet Add-on

Stable

Magic-link emails, zero friction

Drop a shortcode into any MailPoet campaign and every subscriber gets a personalized, one-click login link. No passwords, no friction - just a seamless email-to-site experience.

EmailMagic LinksMailPoet

[Learn more](/ecosystem/mailpoet.md "Learn more")

<!-- -->

[ →](/ecosystem/mailpoet.md "Learn more")[Download](https://wordpress.org/plugins/simple-jwt-login-mailpoet "Download")

What it does

* personalized login links per recipient
* Works with any MailPoet template
* Time-limited, single-use tokens
* No custom code needed

[View documentation →](/docs/mailpoet.md "View documentation")

### Export & Import Add-on

Stable

Move your config in one command

Back up your complete Simple JWT Login configuration - Auth Codes, protection rules, and all settings - and restore it on any site. Ideal for staging migrations and multi-site setups.

MigrationDevOpsBackup

[Learn more](/ecosystem/export-import.md "Learn more")

<!-- -->

[ →](/ecosystem/export-import.md "Learn more")[Download](https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip "Download")

What it does

* Full config backup & restore
* Auth Codes included
* Works across any WP installs
* JSON-based, human-readable

[View documentation →](/docs/export-import.md "View documentation")

Third-party services

## Integrations

Connect Simple JWT Login to the tools you already use. Each integration is built into the core plugin - no extra downloads needed.

![WPGraphQL logo](assets/images/screenshots/third-party-integrations/wpgraphql-logo.png)

### WPGraphQL

Stable

JWT authentication for GraphQL

Use the same JWTs you issue through Simple JWT Login to authenticate any WPGraphQL query or mutation. Enable it with a single checkbox - no code, no custom middleware.

GraphQLHeadlessREST-free

* Authenticate queries & mutations
* One-checkbox setup
* Works with React, Vue, Next.js
* Same tokens as REST API

[Read the docs](/docs/integrations/third-party/wpgraphql.md "Read the docs")

<!-- -->

[ →](/docs/integrations/third-party/wpgraphql.md "Read the docs")

![Google OAuth](assets/images/features/google-plus.png)

### Google OAuth

Beta

Sign in with Google

Let users authenticate with their Google Account. Simple JWT Login exchanges a Google ID token for a WordPress JWT, giving you full control over the session without storing passwords.

OAuthSocial LoginPasswordless

* Google ID token → WordPress JWT
* Passwordless login flow
* Use Google JWT on all endpoints
* Full token lifecycle control

[Read the docs](/docs/integrations/oauth/google/setup.md "Read the docs")

<!-- -->

[ →](/docs/integrations/oauth/google/setup.md "Read the docs")

Client libraries

## SDKs

Drop-in client libraries for your frontend or backend application. Available on Packagist and npm.

![PHP](assets/images/frameworks/php.png)![Laravel](assets/images/frameworks/laravel.png)![Yii](assets/images/frameworks/yii.png)![CodeIgniter](assets/images/frameworks/codeigniter.png)

### PHP Client

One Composer package, any PHP framework

Integrate Simple JWT Login into any PHP app with a single dependency. Works out of the box with Laravel, Yii, CodeIgniter, Slim, and plain PHP.

PHPLaravelYiiComposer

`composer require "nicumicle/simple-jwt-login-client-php"`

[Learn more](/ecosystem/php-sdk.md "Learn more")

<!-- -->

[ →](/ecosystem/php-sdk.md "Learn more")[Packagist](https://packagist.org/packages/nicumicle/simple-jwt-login-client-php "Packagist")

![JavaScript](assets/images/frameworks/javascript.png)![React](assets/images/frameworks/react.png)![Vue](assets/images/frameworks/vue.png)![Angular](assets/images/frameworks/angular.png)

### JavaScript Client

npm package for any JS framework

Add Simple JWT Login authentication to React, Vue, Angular, or any JavaScript app with a handful of lines. Works in the browser and in Node.js.

JavaScriptReactVueAngular

`npm install simple-jwt-login`

[Learn more](/ecosystem/js-sdk.md "Learn more")

<!-- -->

[ →](/ecosystem/js-sdk.md "Learn more")[npm](https://www.npmjs.com/package/simple-jwt-login "npm")

## Don't see what you need?

Simple JWT Login exposes 16 action and filter hooks. Build your own integration - or open an issue on GitHub and let's discuss it.

[Browse Hooks →](/docs/hooks.md "Browse hooks documentation")[Open an issue](https://github.com/nicumicle/simple-jwt-login/issues "Open an issue on GitHub")
