# API Keys

API Keys are long-lived credentials that authenticate REST requests to any WordPress endpoint when the API key middleware is enabled. Unlike JWTs - which expire and carry user claims in the token - an API key is an opaque secret that maps to a WordPress user and a set of permissions.

Use API keys for:

* **Server-to-server integrations** where a persistent credential is more practical than managing token expiry
* **CI/CD pipelines** that need read or write access to WordPress content
* **Third-party services** (webhooks, schedulers) that call your WordPress REST API

## Settings[​](#settings "Direct link to Settings")

Go to **Settings → Simple JWT Login → API Keys** to configure.

![API Keys settings](data:image/png;base64,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)

### API Keys (enable/disable)[​](#api-keys-enabledisable "Direct link to API Keys (enable/disable)")

Enable or disable the API Keys feature. When disabled, the header is ignored on all requests.

#### Header name[​](#header-name "Direct link to Header name")

The HTTP header clients must send the API key in. Default: `X-API-Key`. Change this only if you need to avoid a header name collision with another system.

### Create API Key[​](#create-api-key "Direct link to Create API Key")

![Create API Key form](data:image/png;base64,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)

Use the form in the settings page to issue a new key. Fields:

| Field           | Description                                                                            |
| --------------- | -------------------------------------------------------------------------------------- |
| **Name**        | A human-readable label to identify the key (e.g., "Mobile App", "CI pipeline").        |
| **Expires at**  | Optional expiry date/time. Leave blank for a non-expiring key.                         |
| **Permissions** | One or more of: `read`, `create`, `update`, `delete`. See the permissions table below. |

After clicking **Create API Key**, a modal appears showing the raw key value. Copy it immediately - it is shown only once and cannot be recovered.

### Existing API Keys[​](#existing-api-keys "Direct link to Existing API Keys")

![Existing API Keys table](/assets/images/existing-api-keys-85db6c35193302a7e17153335a8e919b.png)

A paginated table of all keys (admins see all keys; other users see only their own). Columns: Name, Prefix, Permissions, Expires, Last Used, Action (Revoke / Delete). The `User ID` column is visible to admins only.

## How authentication works[​](#how-authentication-works "Direct link to How authentication works")

When API key authentication is enabled, Simple JWT Login intercepts every WordPress REST request and checks for the configured header. If the header is present, it looks up the key hash in the database, verifies the key is active (not revoked, not expired), and confirms the key has the required permission for the HTTP method being called.

Permission → HTTP method mapping:

| Permission | HTTP methods   |
| ---------- | -------------- |
| `read`     | `GET`          |
| `create`   | `POST`         |
| `update`   | `PUT`, `PATCH` |
| `delete`   | `DELETE`       |

The key itself is **never stored in plain text** - only its SHA-256 hash is saved. The full key is returned only once, at creation time.

## Key format[​](#key-format "Direct link to Key format")

Keys follow the pattern `sjl_` + 32 hex characters, for example:

```
sjl_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
```

The first 8 characters (`sjl_a1b2` in the example) serve as a non-secret prefix shown in the list view to help you identify keys without exposing the secret.

## Managing API keys - authentication[​](#managing-api-keys---authentication "Direct link to Managing API keys - authentication")

All API key management endpoints require the caller to be authenticated as a WordPress user. Two methods are accepted:

* **WordPress session** (cookie-based auth) - the traditional approach when calling from a browser or admin context.
* **JWT** - pass a valid JWT via the `Authorization: Bearer <token>` header, the configured JWT header/cookie, or the `JWT` query parameter. The plugin resolves the JWT to a WordPress user before processing the request.

Regular users can manage only their own keys. Administrators (`manage_options` capability) can manage all keys.

## Endpoints[​](#endpoints "Direct link to Endpoints")

API Reference

Explore and test all API key endpoints using the [interactive API reference →](/api/v4/list-api-keys.md)

***

### List API keys[​](#list-api-keys "Direct link to List API keys")

**METHOD**: `GET`

**ENDPOINT**: `/simple-jwt-login/v1/api-keys`

Returns a paginated list of API keys. Only the key prefix (first 8 characters) is returned, never the full key.

**Query parameters**:

| Parameter  | Type      | Default | Description               |
| ---------- | --------- | ------- | ------------------------- |
| `page`     | `integer` | `1`     | Page number (1-based).    |
| `per_page` | `integer` | `20`    | Results per page (1–100). |

**Response 200**:

```
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 7,
        "name": "My integration key",
        "key_prefix": "sjl_a1b2****",
        "permissions": ["read", "create"],
        "expires_at": null,
        "last_used_at": "2026-04-15 10:30:00",
        "created_at": "2026-01-01 12:00:00",
        "revoked_at": null
      }
    ],
    "total": 1,
    "page": 1,
    "per_page": 20
  }
}
```

**SHELL example** (WordPress session):

```
curl 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/api-keys' \
  --cookie "wordpress_logged_in_xxx=..."
```

**SHELL example** (JWT):

```
curl 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/api-keys' \
  -H "Authorization: Bearer <your-jwt>"
```

***

### Create an API key[​](#create-an-api-key "Direct link to Create an API key")

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/api-keys`

Generates a new API key. The full plaintext key is returned **only in this response** - it cannot be retrieved later. Store it securely immediately (e.g., in a secrets manager or environment variable).

**Request body**:

```
{
  "name": "My integration key",
  "permissions": ["read", "create"],
  "expires_at": "2027-01-01 00:00:00"
}
```

| Field         | Type                | Description                                                            |
| ------------- | ------------------- | ---------------------------------------------------------------------- |
| `name`        | `required` `string` | Human-readable label for the key.                                      |
| `permissions` | `required` `array`  | One or more of: `read`, `create`, `update`, `delete`.                  |
| `expires_at`  | `optional` `string` | Expiry date/time in `Y-m-d H:i:s` format. Omit for a non-expiring key. |

**Response 200**:

```
{
  "success": true,
  "data": {
    "id": 7,
    "key": "sjl_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
    "name": "My integration key",
    "key_prefix": "sjl_a1b2",
    "permissions": ["read", "create"],
    "expires_at": "2027-01-01 00:00:00"
  }
}
```

**SHELL example** (WordPress session):

```
curl -X POST 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/api-keys' \
  --cookie "wordpress_logged_in_xxx=..." \
  -H "Content-Type: application/json" \
  -d '{"name":"CI pipeline","permissions":["read","create"]}'
```

**SHELL example** (JWT):

```
curl -X POST 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/api-keys' \
  -H "Authorization: Bearer <your-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name":"CI pipeline","permissions":["read","create"]}'
```

***

### Update an API key[​](#update-an-api-key "Direct link to Update an API key")

**METHOD**: `PUT`

**ENDPOINT**: `/simple-jwt-login/v1/api-keys/{id}`

Updates the name, permissions, and/or expiry of an existing key. The key secret itself is not changed.

**Path parameter**: `id` - numeric ID of the key (returned when listing or creating).

**Request body**:

```
{
  "name": "Updated key name",
  "permissions": ["read", "create", "update"],
  "expires_at": "2028-06-01 00:00:00"
}
```

**Response 200**:

```
{
  "success": true,
  "message": "API key updated successfully."
}
```

**SHELL example** (WordPress session):

```
curl -X PUT 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/api-keys/7' \
  --cookie "wordpress_logged_in_xxx=..." \
  -H "Content-Type: application/json" \
  -d '{"name":"Readonly key","permissions":["read"]}'
```

**SHELL example** (JWT):

```
curl -X PUT 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/api-keys/7' \
  -H "Authorization: Bearer <your-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Readonly key","permissions":["read"]}'
```

***

### Revoke an API key[​](#revoke-an-api-key "Direct link to Revoke an API key")

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/api-keys/{id}/revoke`

Soft-deletes the key by recording a `revoked_at` timestamp. The record is kept in the database (useful for auditing), but the middleware will reject the key immediately. To permanently remove the record, use the [permanent delete](#permanently-delete-an-api-key) endpoint.

**Path parameter**: `id` - numeric ID of the key.

**Response 200**:

```
{
  "success": true,
  "message": "API key revoked successfully."
}
```

**SHELL example** (WordPress session):

```
curl -X POST 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/api-keys/7/revoke' \
  --cookie "wordpress_logged_in_xxx=..."
```

**SHELL example** (JWT):

```
curl -X POST 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/api-keys/7/revoke' \
  -H "Authorization: Bearer <your-jwt>"
```

***

### Permanently delete an API key[​](#permanently-delete-an-api-key "Direct link to Permanently delete an API key")

**METHOD**: `DELETE`

**ENDPOINT**: `/simple-jwt-login/v1/api-keys/{id}`

Permanently removes the key record from the database. This action is irreversible. Prefer [revoke](#revoke-an-api-key) when you want to disable a key but retain the audit record.

**Path parameter**: `id` - numeric ID of the key.

**Response 200**:

```
{
  "success": true,
  "message": "API key deleted successfully."
}
```

**SHELL example** (WordPress session):

```
curl -X DELETE 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/api-keys/7' \
  --cookie "wordpress_logged_in_xxx=..."
```

**SHELL example** (JWT):

```
curl -X DELETE 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/api-keys/7' \
  -H "Authorization: Bearer <your-jwt>"
```

***

## Using an API key in requests[​](#using-an-api-key-in-requests "Direct link to Using an API key in requests")

Once you have a key, include it in the configured header on every request:

```
curl 'https://simplejwtlogin.com/wp-json/wp/v2/posts' \
  -H "X-API-Key: sjl_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4"
```

If you changed the header name in the plugin settings, use that name instead.

## Error responses[​](#error-responses "Direct link to Error responses")

All error responses from the API key endpoints follow the standard envelope:

```
{
  "success": false,
  "data": {
    "message": "Human-readable error description",
    "errorCode": 84
  }
}
```

Common error codes:

| Code | Meaning                                                                            |
| ---- | ---------------------------------------------------------------------------------- |
| `84` | Unauthorized - no active WordPress session and no valid JWT, or permission denied. |
| `85` | Bad request - key name is missing or no permissions were specified.                |
| `88` | Database insert failed when creating a key.                                        |
| `89` | No key found with the provided ID.                                                 |
| `90` | Database update failed when updating a key.                                        |
| `91` | Database operation failed when revoking a key.                                     |
| `92` | Database operation failed when permanently deleting a key.                         |

***

## FAQ[​](#faq "Direct link to FAQ")

### Can I use a JWT to manage API keys?[​](#can-i-use-a-jwt-to-manage-api-keys "Direct link to Can I use a JWT to manage API keys?")

Yes. All `/simple-jwt-login/v1/api-keys` endpoints accept a valid JWT in place of a WordPress session cookie. Pass it via `Authorization: Bearer <token>` or through whichever JWT transport is configured in the plugin settings.

### Can I use an API key instead of a JWT for Simple JWT Login's own endpoints?[​](#can-i-use-an-api-key-instead-of-a-jwt-for-simple-jwt-logins-own-endpoints "Direct link to Can I use an API key instead of a JWT for Simple JWT Login's own endpoints?")

No. API keys authenticate requests to standard WordPress REST endpoints (e.g., `/wp/v2/posts`). Simple JWT Login's own endpoints (`/simple-jwt-login/v1/auth`, `/simple-jwt-login/v1/users`, etc.) use JWT-based authentication as documented on their respective pages.

### What happens if a key expires?[​](#what-happens-if-a-key-expires "Direct link to What happens if a key expires?")

The middleware checks the `expires_at` timestamp on every request. Once the current time passes the expiry, the key is rejected as if it were revoked. Update the key with a new `expires_at` to extend its lifetime.

### Is the full key stored anywhere?[​](#is-the-full-key-stored-anywhere "Direct link to Is the full key stored anywhere?")

No. Only the SHA-256 hash of the key is persisted. The plaintext key is returned once at creation and is not recoverable. If a key is lost, revoke or delete it and create a new one.

### Who can see other users' keys?[​](#who-can-see-other-users-keys "Direct link to Who can see other users' keys?")

Regular users can only list, update, revoke, and delete their own keys. WordPress administrators (users with the `manage_options` capability) can manage all keys and will also see the `user_id` field in list responses to identify key ownership.
