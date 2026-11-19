# Permanently delete an API key

```
DELETE 
/api-keys/:id
```

Permanently removes the API key record from the database. This action is irreversible. To merely disable a key while keeping its record, use `POST /api-keys/{id}/revoke` instead.

Regular users may only delete their own keys. Administrators may delete any key.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 401
* 403
* 404
* 500

API key permanently deleted.

WordPress core error: the request is not authenticated (no logged-in session with a valid `X-WP-Nonce`, and no valid JWT in the header or cookie). The plugin is not called.

Forbidden (`error_code` 84). One of:

* The user is not logged in.
* The user does not own this API key and is not an administrator.
* A non-administrator tries to grant a permission they do not have.

The id is not a positive number (`error_code` 89).

The delete failed, including an administrator deleting a key id that does not exist (`error_code` 92).
