# Configuration

## Server[​](#server "Direct link to Server")

The Simple-JWT-Login REST API is accessible via two URL formats. Both are equivalent — choose the one that fits your WordPress permalink configuration:

* **Pretty permalinks** (recommended):
  <!-- -->
  ```
  https://{domain}/wp-json/simple-jwt-login/v1/{endpoint}
  ```
* **Query-string format** (works even without pretty permalinks):
  <!-- -->
  ```
  https://{domain}/?rest_route=/simple-jwt-login/v1/{endpoint}
  ```

## Request Parameters[​](#request-parameters "Direct link to Request Parameters")

Parameters can be sent in any of the following ways:

* **JSON request body** (recommended for POST/PUT/DELETE requests)
* **Query string** (convenient for GET requests and quick testing)
* **Form data** (`application/x-www-form-urlencoded`)

### Examples[​](#examples "Direct link to Examples")

#### Sending JWT in header:[​](#sending-jwt-in-header "Direct link to Sending JWT in header:")

```
  curl -X POST "http://localhost/wp/v2/users" -H "Authorization: YOUR_JWT"
```

#### Sending JWT as query parameters:[​](#sending-jwt-as-query-parameters "Direct link to Sending JWT as query parameters:")

```
  curl -X POST "http://localhost/wp/v2/users?jwt=YOUR_JWT"
```

or

```
  curl -X POST "http://localhost?rest_route=/wp/v2/users&jwt=YOUR_JWT"
```

#### Sending JWT as request body:[​](#sending-jwt-as-request-body "Direct link to Sending JWT as request body:")

```
  curl -X POST "http://localhost/wp/v2/users" -H "Content-type: application/json" -d '{"JWT":"JYOUR JWT"}'
```

## Initial Configuration[​](#initial-configuration "Direct link to Initial Configuration")

1. Go to **Settings → Simple JWT Login → General**.
2. Set a **JWT Decryption key** — this secret is used to sign and verify all tokens.
3. Choose a **JWT Decryption algorithm** (e.g., `HS256`).
4. Click **Save Changes**.

caution

Use a long, random string for the JWT Decryption key and include special characters. This key is equivalent to a master password — anyone who knows it can forge valid tokens.

## Where to send the JWT[​](#where-to-send-the-jwt "Direct link to Where to send the JWT")

By default, the plugin looks for the JWT in the **request parameters** (query string or body). You can also enable additional sources:

| Source                  | How to send the JWT                              |
| ----------------------- | ------------------------------------------------ |
| **REQUEST** *(default)* | Query param: `?JWT=your_jwt` or body field `JWT` |
| **SESSION**             | `$_SESSION['simple-jwt-login-token']`            |
| **COOKIE**              | `$_COOKIE['simple-jwt-login-token']`             |
| **HEADER**              | `Authorization: Bearer YOUR_JWT_HERE`            |

When a JWT is present in multiple locations, the source with the highest priority wins (HEADER > COOKIE > SESSION > REQUEST).

note

The recommended approach is to enable **HEADER** and always send the JWT as a `Bearer` token in the `Authorization` header. This is the most widely supported pattern and avoids tokens appearing in server logs.

## Allow JWT usage on all WordPress endpoints[​](#allow-jwt-usage-on-all-wordpress-endpoints "Direct link to Allow JWT usage on all WordPress endpoints")

Enable **”All WordPress endpoints check for JWT authentication”** in the General settings to use JWT authentication on any WordPress REST route — not just the Simple-JWT-Login ones.

When a JWT is found, the plugin first authenticates the request as the user identified by the token, then passes the request to WordPress. This lets you, for example, create posts or access protected data as a specific user.

```
curl -X POST "https://simplejwtlogin.com/wp-json/wp/v2/posts?content=PostContent&title=PostTitle" \
  -H "Content-type: application/json" \
  -d '{"JWT":"YOUR_JWT_HERE"}'
```

or

```
curl -X POST "https://simplejwtlogin.com/wp-json/wp/v2/posts" \
    -H "Authorization: Bearer YOUR_JWT_HERE" \
    --form title="Title" \
    --form content="My content" \
    --form type="page"
```

For the second example, you need to make sure that you allow search for JWT in the header( you can set this in: **General** settings -> **Get JWT token from** )

note

When you pass the `JWT` parameter, it is not case-sensitive. You can also pass it as `jwt`.

## General settings screenshot[​](#general-settings-screenshot "Direct link to General settings screenshot")

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-2.png?raw=true)
