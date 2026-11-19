# List API keys

```
GET 
/api-keys
```

Returns a paginated list of API keys, newest first. Administrators (`manage_options`) see the keys of every user (with `user_id`); other users see only their own keys.

The full key value is never returned; only the first 8 characters are shown (followed by `****`).

**Authentication** The WordPress user must be authenticated: a logged-in session (cookie plus the `X-WP-Nonce` header for REST calls), or a JWT in the header or cookie. Without it WordPress answers `401` `rest_forbidden` before the plugin runs.

**Error format** API key errors are `WP_Error` responses (`code: simple_jwt_login_api_key_error`). When the API middleware or API keys are enabled they are rewritten into the plugin envelope (`{"success": false, "data": {"message", "error_code"}}`); see `ApiKeyError`.

## Request[​](#request "Direct link to request")

## Responses[​](#responses "Direct link to Responses")

* 200
* 401
* 403

Paginated list of API keys.

WordPress core error: the request is not authenticated (no logged-in session with a valid `X-WP-Nonce`, and no valid JWT in the header or cookie). The plugin is not called.

The user is not logged in (`error_code` 84).
