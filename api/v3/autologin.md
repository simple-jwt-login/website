# Autologin

```
GET 
/autologin
```

Authenticate and automatically log in a user to WordPress using a valid JSON Web Token (JWT).

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401

Successful login. The plugin redirects the user to the WordPress website.

Invalid request or authentication failure.

The JWT is expired, revoked, or not valid yet.
