# Revoke an API key

```
POST 
/api-keys/:id/revoke
```

Soft-deletes (revokes) an API key by recording a `revoked_at` timestamp. The key record is retained in the database but is rejected by the authentication middleware. To permanently remove the record, use `DELETE /api-keys/{id}`.

Regular users may only revoke their own keys. Administrators may revoke any key.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 401
* 403
* 404
* 500

API key revoked successfully.

WordPress core error: the request is not authenticated (no logged-in session with a valid `X-WP-Nonce`, and no valid JWT in the header or cookie). The plugin is not called.

Forbidden (`error_code` 84). One of:

* The user is not logged in.
* The user does not own this API key and is not an administrator.
* A non-administrator tries to grant a permission they do not have.

The id is not a positive number (`error_code` 89).

The revoke failed, including an administrator revoking a key id that does not exist (`error_code` 91).
