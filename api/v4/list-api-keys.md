# List API keys

```
GET 
/api-keys
```

Returns a paginated list of API keys owned by the authenticated WordPress user. Administrators (`manage_options` capability) see all keys across all users. Regular users see only their own keys.

The full key value is never returned; only the first 8-character prefix is shown (followed by `****`) to help identify keys without exposing secrets.

**Requirements**

* An active WordPress session is required (cookie-based auth or equivalent).

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 401

Paginated list of API keys.

Unauthorized. No active WordPress session. Log in to WordPress before calling this endpoint.
