# Update an API key

```
PUT 
/api-keys/:id
```

Replaces the `name`, `permissions` and `expires_at` of an existing API key. All three are written on every call: `name` and `permissions` are required, and omitting `expires_at` removes the expiry. Regular users may only update their own keys and only grant permissions they have (see `POST /api-keys`). Administrators may update any key.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 401
* 403
* 404
* 422
* 500

API key updated successfully.

WordPress core error: the request is not authenticated (no logged-in session with a valid `X-WP-Nonce`, and no valid JWT in the header or cookie). The plugin is not called.

Forbidden (`error_code` 84). One of:

* The user is not logged in.
* The user does not own this API key and is not an administrator.
* A non-administrator tries to grant a permission they do not have.

The id is not a positive number (`error_code` 89).

Unprocessable entity. One of:

* `name` is empty (`error_code` 85).
* No permission was given (`error_code` 86) or a permission is unknown (`error_code` 87).
* `expires_at` is not a valid date (`error_code` 132).

The update failed, including an administrator updating a key id that does not exist (`error_code` 90).
