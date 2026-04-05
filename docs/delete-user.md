# Delete WordPress User

The Delete User endpoint allows you to remove a WordPress user account via a REST API call authenticated with a JWT. This is useful for self-service account deletion flows in mobile apps or headless front-ends.

Deletion is **disabled by default**. Enable it in the plugin settings before use.

The plugin identifies which user to delete from the JWT payload. You can configure it to look for either:

* **WordPress User ID** - the numeric user ID stored in the JWT
* **Email address** - the user's email address stored in the JWT

Configure the JWT payload key to use in the plugin settings under the **Delete User** tab.

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD** : `DELETE`

**ENDPOINT** : `/simple-jwt-login/v1/users`

**URL Example** : `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/users&JWT={{JWT}}&AUTH_KEY={{AUTH_KEY_VALUE}}`

**PARAMETERS**:

| Parameter  | Type                | Description                                                                                            |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------ |
| JWT        | `required` `string` | Your JWT                                                                                               |
| AUTH\_CODE | `optional` `string` | Auth Code from the "Auth codes" section. Required only if "Delete User Requires Auth Code" is enabled. |

## Request[​](#request "Direct link to Request")

```
{
  "JWT": "YOUR_JWT_HERE",
  "AUTH_CODE" : "SUPER_SECRET_AUTH_CODE"
}
```

## Response[​](#response "Direct link to Response")

### 200[​](#200 "Direct link to 200")

```
{
  "message": "User was successfully deleted.",
  "id": 1
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
curl -X DELETE https://simplejwtlogin.com/simple-jwt-login/v1/users \
  -H "Content-type: application/json" 
  -d '{"JWT":"YOUR_JWT","AUTH_CODE":"SECRET_AUTH_CODE"}'
```

### PHP[​](#php "Direct link to PHP")

```
$simpleJWT = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login-v1'
);
$simpleJWT->delete('Your JWT');
```

### JavaScript[​](#javascript "Direct link to JavaScript")

```
var data = JSON.stringify({
    "JWT":"YOUR_JWT",
    "AUTH_CODE":"SECRET_AUTH_CODE"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
    }
});

xhr.open("DELETE", "https://simplejwtlogin.com" + "/simple-jwt-login/v1/users");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
```

## Screenshot[​](#screenshot "Direct link to Screenshot")

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-5.png?raw=true)

## Features[​](#features "Direct link to Features")

### Limit by IP address[​](#limit-by-ip-address "Direct link to Limit by IP address")

You can limit the deletion of users to specific IP addresses for security reasons.

You can set multiple IP addresses, separated by commas.

Example:

```
  127.0.0.1, 123.123.123.123
```
