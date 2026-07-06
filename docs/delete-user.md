# Delete User

The Delete User endpoint removes a WordPress user account via a REST API call authenticated with a valid JWT. The user to delete is identified from the claims inside the JWT.

Deletion is **disabled by default**. Enable it in **Settings → Simple JWT Login → Delete User**.

API Reference

Explore and test this endpoint using the [interactive API reference →](/api/v4/delete-user.md)

caution

Enable "Require Authentication Code" unless you have a specific reason not to. Without it, any holder of a valid JWT can delete their account.

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD**: `DELETE`

**ENDPOINT**: `/simple-jwt-login/v1/users`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/users&JWT={{JWT}}&AUTH_KEY={{AUTH_KEY_VALUE}}`

The JWT can be passed in any of these ways:

* Query parameter or request body: `JWT=your_token`
* Authorization header: `Authorization: Bearer YOUR_JWT`

**PARAMETERS**:

| Parameter  | Type                | Description                                                                                                                                                                    |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `JWT`      | `required` `string` | A valid JWT identifying the user to delete. Can alternatively be passed as `Authorization: Bearer <token>`.                                                                    |
| `AUTH_KEY` | `optional` `string` | Auth Code value. Required only if "Require Authentication Code" is enabled. The parameter name matches the **Auth Code URL Key** in Auth Codes settings (default: `AUTH_KEY`). |

## Request[​](#request "Direct link to Request")

```
{
  "JWT": "YOUR_JWT_HERE",
  "AUTH_KEY": "SUPER_SECRET_AUTH_CODE"
}
```

Or via Authorization header:

```
DELETE /wp-json/simple-jwt-login/v1/users
Authorization: Bearer YOUR_JWT_HERE
```

## Responses[​](#responses "Direct link to Responses")

### 200[​](#200 "Direct link to 200")

```
{
  "success": true,
  "message": "User was successfully deleted.",
  "id": 1
}
```

### 400[​](#400 "Direct link to 400")

JWT parameter is missing or cannot be decoded.

```
{
  "success": false,
  "data": {
    "message": "JWT is missing.",
    "errorCode": 42
  }
}
```

### 401[​](#401 "Direct link to 401")

JWT is invalid, has a bad signature, is expired, is revoked, or the auth code is wrong.

```
{
  "success": false,
  "data": {
    "message": "JWT has expired.",
    "errorCode": 14
  }
}
```

### 403[​](#403 "Direct link to 403")

User deletion is disabled in plugin settings, or the client IP is not on the allow-list.

```
{
  "success": false,
  "data": {
    "message": "Delete is not enabled.",
    "errorCode": 39
  }
}
```

### 404[​](#404 "Direct link to 404")

No WordPress user matches the claims in the JWT.

```
{
  "success": false,
  "data": {
    "message": "User not found.",
    "errorCode": 24
  }
}
```

### 500[​](#500 "Direct link to 500")

Internal server error.

```
{
  "success": false,
  "data": {
    "message": "An unexpected error occurred.",
    "errorCode": 22
  }
}
```

## Examples[​](#examples "Direct link to Examples")

### SHELL[​](#shell "Direct link to SHELL")

```
curl -X DELETE 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users' \
  -H "Content-type: application/json" \
  -d '{"JWT":"YOUR_JWT","AUTH_KEY":"SECRET_AUTH_CODE"}'
```

Or using the Authorization header:

```
curl -X DELETE 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users' \
  -H "Authorization: Bearer YOUR_JWT"
```

### PHP[​](#php "Direct link to PHP")

```
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$simpleJwtLogin->deleteUser('Your JWT');
```

### JavaScript[​](#javascript "Direct link to JavaScript")

```
fetch('https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT'
  }
}).then(r => r.json()).then(console.log);
```

## Error responses[​](#error-responses "Direct link to Error responses")

| Code | Meaning                                          |
| ---- | ------------------------------------------------ |
| `24` | No WordPress user matches the JWT claims.        |
| `39` | User deletion is not enabled in plugin settings. |
| `40` | Auth Code is missing when it is required.        |
| `41` | Client IP is not on the allowed IP list.         |
| `42` | JWT is missing from the request.                 |

JWT decoding errors (`1`-`22`) may also appear when the token cannot be parsed or its signature is invalid.

***

## Settings[​](#settings "Direct link to Settings")

Configure under **Settings → Simple JWT Login → Delete User**.

### Delete User[​](#delete-user "Direct link to Delete User")

![Delete User settings](/assets/images/delete-user-031b072620a9c8b0c8d17e8d9ecb64a7.png)

Enable or disable the delete endpoint. When disabled, all DELETE requests to `/users` return a 403 error.

### Require Authentication Code[​](#require-authentication-code "Direct link to Require Authentication Code")

![Require Authentication Code](data:image/png;base64,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)

When enabled, every deletion request must include a valid Auth Code alongside the JWT. The parameter name is the **Auth Code URL Key** from the Auth Codes settings (default: `AUTH_KEY`).

### Access Control[​](#access-control "Direct link to Access Control")

![Access Control settings](data:image/png;base64,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)

Comma-separated list of IP addresses allowed to call the delete endpoint. Leave blank to allow all IPs. Supports wildcards in any octet (e.g. `192.168.*.*`).
