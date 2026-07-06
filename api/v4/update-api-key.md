# Update an API key

```
PUT 
/api-keys/:id
```

Updates the `name`, `permissions`, and/or `expires_at` of an existing API key. Regular users may only update their own keys. Administrators (`manage_options`) may update any key.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 404
* 500

API key updated successfully.

Bad request. `name` is empty, no permissions were provided, or a permission value is unrecognised.

Unauthorized. No active WordPress session.

Forbidden. The authenticated user does not own this API key and does not have administrator privileges.

No API key with the provided ID was found.

Internal server error. The database update for the API key failed.
