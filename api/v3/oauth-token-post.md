# Exchange a Google code or ID token

```
POST 
/oauth/token
```

Send `code` to get the token response from Google, or `id_token` to get a WordPress JWT. If both are sent, `code` is used.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400

The token response from Google (for `code`), or a WordPress JWT (for `id_token`).

Error.
