# WordPress JWT Login in Flutter

This Flutter example logs a WordPress user in with a JWT. The app keeps the token in the Keychain on iOS and in encrypted storage on Android. Native apps don't need CORS.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

* Flutter 3.24 or later
* **Allow JWT Authentication** turned on - see [Authentication](/docs/authentication.md)
* **Refresh tokens** turned on, to keep users logged in - optional, see [Refresh token](/docs/refresh-token.md)
* **JWT Middleware for all WordPress endpoints** turned on - see [Integration Options](/docs/configuration.md#integration-options)
* A WordPress site that uses HTTPS

Want a working app right away? Download the [full example](#full-example).

Add the packages to your app:

```
flutter pub add http flutter_secure_storage
```

## Call the WordPress API[​](#call-the-wordpress-api "Direct link to Call the WordPress API")

Create `lib/wordpress_api.dart`:

```
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

## Save and Refresh the Token[​](#save-and-refresh-the-token "Direct link to Save and Refresh the Token")

Use `flutter_secure_storage`, not `shared_preferences`, which isn't encrypted. The example app keeps the JWT and the refresh token there, and loads the user through one method that refreshes an expired JWT once:

```
static const _storage = FlutterSecureStorage();

static const _jwtKey = 'wp_jwt';

static const _refreshKey = 'wp_refresh';
```

Call `_save(await api.login(email, password))` after login, and `_userName()` whenever you need the user. Refresh tokens work once only, so `_save` stores the new one every time. Turn on refresh tokens in the plugin to use this - see [Refresh token](/docs/refresh-token.md). Without them, the user logs in again when the JWT expires.

If two-factor authentication is on, handle the [two-factor step](/docs/integrations/third-party/two-factor.md) before you save the tokens.

## Log Out[​](#log-out "Direct link to Log Out")

`_logout()` deletes both tokens from the device. To invalidate the JWT on the server too, call the [revoke endpoint](/docs/revoke-token.md).

## Next steps[​](#next-steps "Direct link to Next steps")

* [Refresh an expired JWT](/docs/refresh-token.md)
* [Register users from the app](/docs/register-user.md)
* [Troubleshoot JWT errors](/docs/troubleshooting.md)

## Full Example[​](#full-example "Direct link to Full Example")

Download a complete app with a login form, a profile screen, token refresh, and tests:

[Download the example (ZIP)](/assets/examples/flutter/wordpress-jwt-flutter.zip)

Extract the ZIP, then generate the platform folders and install the packages:

```
cd wordpress_jwt_flutter

flutter create --platforms=android,ios .

flutter pub get
```

Start the app with your site address:

```
flutter run --dart-define=WORDPRESS_URL=https://example.com
```

note

Android release builds need internet access. Add `<uses-permission android:name="android.permission.INTERNET"/>` above the `<application>` tag in `android/app/src/main/AndroidManifest.xml`.
