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

Unauthorized. No active WordPress session.

Forbidden. The authenticated user does not own this API key and does not have administrator privileges.

No API key with the provided ID was found.

Internal server error. The database revoke operation failed.
