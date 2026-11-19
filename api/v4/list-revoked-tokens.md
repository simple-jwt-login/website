# List revoked tokens

```
GET 
/revoked-tokens
```

Returns a paginated list of revoked-token records across all users, newest first. Tokens are stored hashed (SHA-256) - the raw JWT is never persisted or returned, only a masked prefix/suffix of the hash for identification.

**Requirements**

* The user must be authenticated (logged-in session with `X-WP-Nonce`, or a JWT in the header or cookie). Otherwise WordPress answers `401` `rest_forbidden`.
* The user must have the `manage_options` capability (administrator).

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 401
* 403

Paginated list of revoked tokens.

WordPress core error: the request is not authenticated (no logged-in session with a valid `X-WP-Nonce`, and no valid JWT in the header or cookie). The plugin is not called.

The user is not an administrator (`error_code` 115).
