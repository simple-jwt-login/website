---
slug: /code-examples/flutter
title: WordPress JWT Login in Flutter
sidebar_label: Flutter Login
sidebar_position: 5
description: Log in WordPress users from a Flutter app - get a JWT, keep it in secure storage, and call the WordPress REST API from Android and iOS.
keywords: [Flutter WordPress JWT, Flutter WordPress login, Flutter WordPress REST API, WordPress mobile app authentication]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

This Flutter example logs a WordPress user in with a JWT. The app keeps the token in the Keychain on iOS and in encrypted storage on Android. Native apps don't need CORS.

## Prerequisites

- Flutter 3.24 or later
- **Allow JWT Authentication** turned on - see [Authentication](../auth/Authentication.md)
- **Refresh tokens** turned on, to keep users logged in - optional, see [Refresh token](../auth/RefreshToken.md)
- **JWT Middleware for all WordPress endpoints** turned on - see [Integration Options](../Configuration.mdx#integration-options)
- A WordPress site that uses HTTPS

Want a working app right away? Download the [full example](#full-example).

Add the packages to your app:

```bash
flutter pub add http flutter_secure_storage
```

## Call the WordPress API

Create `lib/wordpress_api.dart`:

```dart
import 'dart:convert';

import 'package:http/http.dart' as http;

class ApiException implements Exception {
  const ApiException(this.message);

  final String message;
}

/// The JWT or refresh token was rejected: refresh or log in again.
class SessionExpiredException extends ApiException {
  const SessionExpiredException() : super('Your session expired. Log in again.');
}

class Tokens {
  const Tokens(this.jwt, this.refreshToken);

  final String jwt;

  /// Only there when refresh tokens are turned on in WordPress.
  final String? refreshToken;
}

class WordPressApi {
  WordPressApi({required this.baseUrl, http.Client? client})
      : _client = client ?? http.Client();

  final String baseUrl;
  final http.Client _client;

  static const _timeout = Duration(seconds: 15);

  /// Returns the tokens for the given WordPress credentials.
  Future<Tokens> login(String email, String password) async {
    final body = await _send(
      () => _client.post(
        Uri.parse('$baseUrl/wp-json/simple-jwt-login/v1/auth'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      ),
    );
    return _tokens(body) ?? (throw const ApiException('Login failed.'));
  }

  /// Swaps a refresh token for new tokens. Each refresh token works once.
  Future<Tokens> refresh(String refreshToken) async {
    final body = await _send(
      () => _client.post(
        Uri.parse('$baseUrl/wp-json/simple-jwt-login/v1/auth/refresh'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'refresh_token': refreshToken}),
      ),
    );
    return _tokens(body) ?? (throw const SessionExpiredException());
  }

  /// Returns the display name of the logged-in user.
  Future<String> userName(String jwt) async {
    final body = await _send(
      () => _client.get(
        Uri.parse('$baseUrl/wp-json/wp/v2/users/me'),
        headers: {'Authorization': 'Bearer $jwt'},
      ),
    );
    if (body case {'name': final String name}) return name;
    throw const SessionExpiredException();
  }

  Tokens? _tokens(Object? body) {
    if (body case {'data': {'jwt': final String jwt}}) {
      final data = (body as Map)['data'] as Map;
      return Tokens(jwt, data['refresh_token'] as String?);
    }
    return null;
  }

  Future<Object?> _send(Future<http.Response> Function() request) async {
    try {
      final response = await request().timeout(_timeout);
      // A server error is an outage, not an expired session.
      if (response.statusCode >= 500) throw const ApiException('WordPress is unavailable.');
      return jsonDecode(utf8.decode(response.bodyBytes));
    } catch (_) {
      throw const ApiException('WordPress is unavailable.');
    }
  }
}
```

## Save and Refresh the Token

Use `flutter_secure_storage`, not `shared_preferences`, which isn't encrypted. The example app keeps the JWT and the refresh token there, and loads the user through one method that refreshes an expired JWT once:

```dart
static const _storage = FlutterSecureStorage();
static const _jwtKey = 'wp_jwt';
static const _refreshKey = 'wp_refresh';


```

Call `_save(await api.login(email, password))` after login, and `_userName()` whenever you need the user. Refresh tokens work once only, so `_save` stores the new one every time. Turn on refresh tokens in the plugin to use this - see [Refresh token](../auth/RefreshToken.md). Without them, the user logs in again when the JWT expires.

If two-factor authentication is on, handle the [two-factor step](../integrations/ThirdParty/02_TwoFactor.md) before you save the tokens.

## Log Out

`_logout()` deletes both tokens from the device. To invalidate the JWT on the server too, call the [revoke endpoint](../auth/RevokeToken.md).

## Next steps

- [Refresh an expired JWT](../auth/RefreshToken.md)
- [Register users from the app](../Register-User.md)
- [Troubleshoot JWT errors](../Troubleshooting.md)

## Full Example

Download a complete app with a login form, a profile screen, token refresh, and tests:

<p>
  <a className="button button--primary button--lg" href="/assets/examples/flutter/wordpress-jwt-flutter.zip" download>Download the example (ZIP)</a>
</p>

Extract the ZIP, then generate the platform folders and install the packages:

```bash
cd wordpress_jwt_flutter
flutter create --platforms=android,ios .
flutter pub get
```

Start the app with your site address:

```bash
flutter run --dart-define=WORDPRESS_URL=https://example.com
```

:::note
Android release builds need internet access. Add `<uses-permission android:name="android.permission.INTERNET"/>` above the `<application>` tag in `android/app/src/main/AndroidManifest.xml`.
:::
