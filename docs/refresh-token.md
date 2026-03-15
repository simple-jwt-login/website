# Refresh token

Use this endpoint to exchange an expired (or about-to-expire) JWT for a fresh one, without requiring the user to re-enter their credentials. This is the standard mechanism for keeping long-running sessions alive.

note

A token can only be refreshed within a configurable time window after it was originally issued. Once that window expires, the user must authenticate again with their credentials.

**METHOD** : `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/refresh`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/refresh&JWT={{YOUR_JWT}}`

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
     "data": {
         "jwt": "NEW_GENERATED_JWT_HERE"
     }
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
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth/refresh \
  -H "Content-type: application/json" \
  -d '{"JWT":"YOUR_EXPIRED_JWT"}'
```

### PHP[​](#php "Direct link to PHP")

```
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->refreshToken('your JWT here', 'AUTH CODE');
```

## Screenshot[​](#screenshot "Direct link to Screenshot")

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-7.png?raw=true)

## Features[​](#features "Direct link to Features")

### Refresh time to live[​](#refresh-time-to-live "Direct link to Refresh time to live")

The **Refresh TTL** controls how long (in minutes) after the original token was issued a refresh is permitted. After that window closes, the user must authenticate again using their credentials.

The default value is **2 weeks** (20,160 minutes). Adjust it in the plugin settings to match your application's security requirements.
