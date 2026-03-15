# Revoke token

Revoking a token immediately invalidates it — any subsequent request using that token will be rejected. Call this endpoint when a user logs out or when you need to terminate a specific session (e.g., after a password change or suspicious activity).

note

Once a token is revoked, it cannot be un-revoked. The user must authenticate again to obtain a new token.

**METHOD** : `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/revoke`

**URL Example** : `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/revoke&JWT={{YOUR_JWT}}`

**PARAMETERS**:

| Parameter  | Type                | Description                                                                                                          |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| JWT        | `required` `string` | Your JWT                                                                                                             |
| AUTH\_CODE | `optional` `string` | Auth Code from the "Auth codes" section. Required only if the "Authentication Requires Auth Code" option is enabled. |

## Request[​](#request "Direct link to Request")

```
{
  "JWT" : "YOUR_JWT_HERE",
  "AUTH_CODE": "MySecretAuthCode"
}
```

## Responses[​](#responses "Direct link to Responses")

### 200[​](#200 "Direct link to 200")

```
{
  "success": true,
  "message": "Token was revoked"
}
```

### 400[​](#400 "Direct link to 400")

```
{
  "success": false,
  "error" : "Error message"
}
```

## Examples[​](#examples "Direct link to Examples")

### SHELL[​](#shell "Direct link to SHELL")

```
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth/revoke \
  -H "Content-type: application/json" \ 
  -d '{"JWT":"YOUR_JWT"}'
```

### PHP[​](#php "Direct link to PHP")

```
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
); 
$result = $simpleJwtLogin->revokeToken('Your JWT here', 'AUTH CODE');
```

## Screenshot[​](#screenshot "Direct link to Screenshot")

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-7.png?raw=true)
