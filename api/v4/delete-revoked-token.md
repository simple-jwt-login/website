# Delete a revoked-token entry

```
DELETE 
/revoked-tokens/:id
```

Removes a revoked-token record. This un-revokes the underlying JWT - if it has not yet expired, it becomes valid again for authentication. Administrators only.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 401
* 403
* 404
* 500

Revoked-token entry deleted.

WordPress core error: the request is not authenticated (no logged-in session with a valid `X-WP-Nonce`, and no valid JWT in the header or cookie). The plugin is not called.

The user is not an administrator (`error_code` 115).

The id is invalid, or no record has it (`error_code` 116).

The database delete failed (`error_code` 117).
