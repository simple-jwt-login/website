# Create an API key

```
POST 
/api-keys
```

Generates a new API key for the authenticated WordPress user. The full key value (`sjl_` prefix + 32 hex characters) is returned **only in this response** - it cannot be retrieved again. Store it securely immediately.

**Permissions** One or more of: `read`, `create`, `update`, `delete`. These map to the HTTP methods the key may be used to authenticate: GET, POST, PUT/PATCH, and DELETE respectively. Non-administrators can only grant permissions they have themselves: `read` needs `read`, `create` / `update` need `edit_posts`, `delete` needs `delete_posts`.

**Requirements**

* The user must be authenticated (see `GET /api-keys`).
* `name` is required and must be non-empty.
* At least one valid permission must be specified.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 403
* 422
* 500

API key created. The `key` field contains the full plaintext key - save it now as it isn't returned again.

WordPress core error: the `application/json` body is not valid JSON (for example, malformed UTF-8). The plugin is not called.

WordPress core error: the request is not authenticated (no logged-in session with a valid `X-WP-Nonce`, and no valid JWT in the header or cookie). The plugin is not called.

Forbidden (`error_code` 84). One of:

* The user is not logged in.
* The user does not own this API key and is not an administrator.
* A non-administrator tries to grant a permission they do not have.

Unprocessable entity. One of:

* `name` is empty (`error_code` 85).
* No permission was given (`error_code` 86) or a permission is unknown (`error_code` 87).
* `expires_at` is not a valid date (`error_code` 132).

The database insert failed (`error_code` 88).
