# OAuth callback

```
GET 
/oauth/token
```

Google redirects the browser here with an authorization code. The plugin exchanges the code, logs the user in to WordPress and redirects. If the sign-in fails, the browser is redirected to the WordPress login page.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 302
* 400

Redirect to the WordPress dashboard, or to the login page if the sign-in failed.

Error.
