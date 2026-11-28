PHP Client SDK

# Simple JWT Login<br />for PHP

One Composer package to authenticate users, manage tokens, and call the WordPress REST API from any PHP application - no boilerplate required.

[View on Packagist →](https://packagist.org/packages/nicumicle/simple-jwt-login-client-php "View on Packagist")[GitHub](https://github.com/nicumicle/simple-jwt-login-client-php "View on GitHub")

Bash

```
// Install
composer require "nicumicle/simple-jwt-login-client-php"
```

PHP

```
// Authenticate a user
$client = new SimpleJwtLoginClient($siteUrl, $authCode);
$response = $client
    ->withEmail('user@example.com')
    ->withPassword('secret')
    ->authenticate();

$jwt = $response['data']['jwt'];

// Use the token on any WordPress endpoint
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: ' . $jwt]);
```

One Composer package

PHP 5.5+ compatible

Works with any framework

Free & open source

Compatibility

## Works with any PHP framework

The client is a plain PHP library with zero framework dependencies - drop it into Laravel, Yii, CodeIgniter, Symfony, or a standalone script.

![PHP](/assets/images/frameworks/php.png)Plain PHP

![Laravel](/assets/images/frameworks/laravel.png)Laravel

![Yii](/assets/images/frameworks/yii.png)Yii

![CodeIgniter](/assets/images/frameworks/codeigniter.png)CodeIgniter

API Reference

## Everything in the token lifecycle

Fluent, chainable API covering authentication, registration, and the full token lifecycle.

AuthenticateRegister UserValidate TokenRefresh TokenRevoke Token

### Exchange credentials for a JWT

Authenticate any WordPress user by email or username and receive a signed JWT. Pass the token in the Authorization header for all subsequent requests to protected endpoints.

[Packagist →](https://packagist.org/packages/nicumicle/simple-jwt-login-client-php "View on Packagist")

PHP

```
// Authenticate a user and get a JWT
$client = new SimpleJwtLoginClient($siteUrl, $authCode);

$response = $client
    ->withEmail('user@example.com')
    ->withPassword('secret')
    ->authenticate();

// $response['data']['jwt'] contains your token
$jwt = $response['data']['jwt'];
echo 'Token: ' . $jwt;
```

Use Cases

## Built for real PHP workflows

From headless WordPress to automated testing - the client handles the auth layer so you can focus on your app.

### Headless WordPress

Build a decoupled frontend in Laravel, Symfony, or plain PHP while WordPress handles content. Authenticate users from your PHP app and pass JWTs to the WP REST API.

```
$client = new SimpleJwtLoginClient($wpUrl, $authCode);

// Log the user in from your PHP frontend
$auth = $client
    ->withEmail($request->email)
    ->withPassword($request->password)
    ->authenticate();

$jwt = $auth['data']['jwt'];

// Now call any WP REST endpoint with the token
$posts = Http::withToken($jwt)
    ->get($wpUrl . '/wp-json/wp/v2/posts')
    ->json();
```

### User registration flow

Register users from your own sign-up form and immediately issue a JWT - all in one round trip, without touching the WordPress admin.

```
$client = new SimpleJwtLoginClient($wpUrl, $authCode);

$response = $client
    ->withEmail($data['email'])
    ->withPassword($data['password'])
    ->withExtraParameter('first_name', $data['name'])
    ->register();

// Immediately authenticate the new user
$auth = $client
    ->withEmail($data['email'])
    ->withPassword($data['password'])
    ->authenticate();

$jwt = $auth['data']['jwt'];
```

### Automated testing

Generate tokens in PHPUnit or Pest fixtures to test authenticated flows against a real WordPress instance - no browser, no cookies, no mocking.

```
// In your PHPUnit setUp()
protected function setUp(): void
{
    $client = new SimpleJwtLoginClient(
        getenv('WP_URL'),
        getenv('SJL_AUTH_CODE')
    );

    $auth = $client
        ->withEmail(getenv('TEST_USER_EMAIL'))
        ->withPassword(getenv('TEST_USER_PASSWORD'))
        ->authenticate();

    $this->jwt = $auth['data']['jwt'];
}
```

Getting Started

## Up and running in minutes

### Requirements

* PHP5.5+
* Composerany
* Simple JWT Loginactive
* WordPress4.4+

1

**Install via Composer**

Add the package to your project with a single command.

bash

```
composer require "nicumicle/simple-jwt-login-client-php"
```

2

**Instantiate the client**

Pass your WordPress site URL and Simple JWT Login Auth Code.

PHP

```
use SimpleJwtLoginClient\SimpleJwtLoginClient;

$client = new SimpleJwtLoginClient(
    'https://your-wordpress-site.com',
    'your-auth-code'
);
```

3

**Call the API**

Use the fluent interface to authenticate, register, or manage tokens.

PHP

```
$response = $client
    ->withEmail('user@example.com')
    ->withPassword('secret')
    ->authenticate();

$jwt = $response['data']['jwt'];
```

Methods

## Complete method reference

All available client methods at a glance.

`authenticate()`Exchange credentials for a JWT

`register()`Create a new WordPress user account

`deleteUser()`Delete a user via a verified JWT

`validateToken()`Verify a token signature and expiry

`refreshToken()`Get a new token from an expiring one

`revokeToken()`Permanently invalidate a token

`autologin()`Generate a one-click auto-login URL

`changePassword()`Change the authenticated user's password

`resetPassword()`Trigger a password reset email

[View on Packagist →](https://packagist.org/packages/nicumicle/simple-jwt-login-client-php "View on Packagist")

## Add JWT to your PHP app today

One Composer install and a few lines of code - that's all it takes to add WordPress JWT authentication to any PHP project.

[Get started →](https://packagist.org/packages/nicumicle/simple-jwt-login-client-php "View on Packagist")[View on GitHub](https://github.com/nicumicle/simple-jwt-login-client-php "View source on GitHub")
