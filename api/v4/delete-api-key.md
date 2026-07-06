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

Unauthorized. No active WordPress session.

Forbidden. The authenticated user does not own this API key and does not have administrator privileges.

No API key with the provided ID was found.

Internal server error. The database delete operation failed.
