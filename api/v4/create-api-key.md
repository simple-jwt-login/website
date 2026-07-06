# Create an API key

```
POST 
/api-keys
```

Generates a new API key for the authenticated WordPress user. The full key value (`sjl_` prefix + 32 hex characters) is returned **only in this response** - it cannot be retrieved again. Store it securely immediately.

**Permissions** One or more of: `read`, `create`, `update`, `delete`. These map to the HTTP methods the key may be used to authenticate: GET, POST, PUT/PATCH, and DELETE respectively.

**Requirements**

* An active WordPress session is required.
* `name` is required and must be non-empty.
* At least one permission must be specified.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 400
* 401
* 500

API key created. The `key` field contains the full plaintext key - save it now as it will not be returned again.

Bad request. `name` is empty, no permissions were provided, or a permission value is unrecognised.

Unauthorized. No active WordPress session.

Internal server error. The database insert for the new API key failed.
