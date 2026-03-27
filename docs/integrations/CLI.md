---
slug: /cli/
title: WP-CLI Add-on
sidebar_position: 10
description: Manage Simple JWT Login from the command line — generate tokens, validate JWTs, and configure the plugin without touching the WordPress admin UI.
keywords: [simple-jwt-login cli, wp-cli jwt, wp jwt login, jwt command line, wordpress jwt cli, wpcli jwt token]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

**Simple-JWT-Login CLI** is a [WP-CLI](https://wp-cli.org/) add-on that brings the full power of Simple JWT Login to your terminal. Generate tokens, inspect payloads, revoke sessions, and manage every plugin setting — all without opening the WordPress admin UI.

It is the go-to companion for DevOps pipelines, staging-to-production migrations, automated testing, and any workflow where speed and scriptability matter.

## Requirements

| Requirement | Minimum version |
|-------------|----------------|
| WordPress | 4.4+ |
| PHP | 5.5+ |
| [Simple JWT Login](https://wordpress.org/plugins/simple-jwt-login/) | active on the same site |
| [WP-CLI](https://wp-cli.org/) | any recent stable |

> The add-on automatically deactivates itself if Simple JWT Login is not installed and active.

## Installation

**From WordPress.org (recommended)**

1. In your WordPress admin go to **Plugins → Add New**.
2. Search for `Simple JWT Login CLI` and click **Install Now**.
3. Activate the plugin.

**From zip**

1. Download the latest release zip from GitHub.
2. Go to **Plugins → Add New → Upload Plugin** and upload the zip.
3. Activate the plugin.

Verify the commands are registered:

```bash
wp jwt --help
wp jwt config --help
```

---

## Commands

### `wp jwt login`

Authenticate a WordPress user and print a JWT token.

> Authentication must be enabled in **Admin → Simple JWT Login → Authentication → Allow Authentication**.

```
wp jwt login [--username=<username>] [--email=<email>] [--login=<login>] --password=<password> [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `--username` | One of three | WordPress username |
| `--email` | One of three | WordPress user email |
| `--login` | One of three | Username or email (username tried first) |
| `--password` | Yes | WordPress user password |
| `--format` | No | `text` (default) or `json` |

Priority when multiple identifiers are supplied: `--username` > `--email` > `--login`.

**Examples**

```bash
# Authenticate by username
wp jwt login --username=admin --password=secret

# JSON output
wp jwt login --username=admin --password=secret --format=json
# {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}

# Capture token for use in curl
TOKEN=$(wp jwt login --username=admin --password=secret)
curl -H "Authorization: Bearer $TOKEN" https://example.com/wp-json/wp/v2/posts
```

---

### `wp jwt decode`

Decode a JWT payload and display its claims. The signature is **not** verified — use `wp jwt validate` for that.

```
wp jwt decode <token> [--format=<format>]
```

| Argument / Option | Required | Description |
|-------------------|----------|-------------|
| `<token>` | Yes | The JWT token to decode |
| `--format` | No | `text` (default) or `json` |

```bash
wp jwt decode eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxOTk5OTk5fQ.sig
# id     1
# exp    1999999

# Extract a single claim with jq
TOKEN=$(wp jwt login --username=admin --password=secret)
wp jwt decode "$TOKEN" --format=json | jq '.exp'
```

---

### `wp jwt validate`

Verify a JWT signature against the plugin's decryption key and check that the token has not expired.

```
wp jwt validate <token> [--format=<format>]
```

| Argument / Option | Required | Description |
|-------------------|----------|-------------|
| `<token>` | Yes | The JWT token to validate |
| `--format` | No | `text` (default) or `json` |

The command always exits `0` — check the `valid` field to determine the result.

```bash
wp jwt validate "$TOKEN" --format=json
# {"valid":true,"message":"Token is valid."}

# Use in a shell script
RESULT=$(wp jwt validate "$TOKEN" --format=json)
if [ "$(echo "$RESULT" | jq -r '.valid')" = "true" ]; then
  echo "Token OK"
else
  echo "Invalid: $(echo "$RESULT" | jq -r '.message')"
fi
```

---

### `wp jwt revoke`

Revoke a JWT token so it can no longer be used. The token signature is verified before revocation.

```
wp jwt revoke <token> [--format=<format>]
```

| Argument / Option | Required | Description |
|-------------------|----------|-------------|
| `<token>` | Yes | The JWT token to revoke |
| `--format` | No | `text` (default) or `json` |

```bash
wp jwt revoke "$TOKEN" --format=json
# {"success":true,"message":"Token has been revoked."}

# Log in then immediately revoke
TOKEN=$(wp jwt login --username=admin --password=secret)
wp jwt revoke "$TOKEN"
```

---

### `wp jwt config get`

Print the current value of a plugin setting. Use dot notation for nested keys.

```
wp jwt config get <key> [--format=<format>]
```

| Argument / Option | Required | Description |
|-------------------|----------|-------------|
| `<key>` | Yes | Setting key; use dot notation for nested keys (e.g. `cors.enabled`) |
| `--format` | No | `text` (default) or `json` |

```bash
wp jwt config get allow_authentication     # 1
wp jwt config get jwt_algorithm            # HS256
wp jwt config get cors.enabled             # 1
wp jwt config get jwt_payload --format=json  # ["iat","exp","id"]
```

---

### `wp jwt config set`

Update a plugin setting and save it to the database.

```
wp jwt config set <key> <value> [--type=<type>] [--force]
```

| Argument / Option | Required | Description |
|-------------------|----------|-------------|
| `<key>` | Yes | Setting key; use dot notation for nested keys (e.g. `cors.enabled`) |
| `<value>` | Yes | New value to store |
| `--type` | No | `auto` (default), `string`, `int`, `bool`, or `json`. With `auto`, the type is inferred from the currently stored value |
| `--force` | No | Skip plugin validation and save regardless of validation errors |

```bash
# Enable authentication
wp jwt config set allow_authentication 1

# Change the JWT algorithm
wp jwt config set jwt_algorithm RS256

# Set a 2-hour TTL
wp jwt config set jwt_auth_ttl 7200 --type=int

# Set the decryption key
wp jwt config set decryption_key "my-super-secret"

# Replace payload fields with a JSON array
wp jwt config set jwt_payload '["iat","exp","id","email"]' --type=json
```

---

### `wp jwt config list`

Show all stored settings as a flat key/value table or raw JSON.

```
wp jwt config list [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `--format` | No | `text` (default) — one `key  value` line per setting, nested objects expanded with dot notation; `json` — full settings object as pretty-printed JSON |

```bash
wp jwt config list
# allow_authentication    1
# jwt_algorithm           HS256
# cors.enabled            1
# ...

wp jwt config list --format=json
```

---

### `wp jwt config export`

Export the full plugin configuration as JSON to a file or stdout.

```
wp jwt config export [--file=<path>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `--file` | No | Path to write the JSON output to. If omitted, output is printed to stdout |

```bash
# Print to stdout
wp jwt config export

# Save to a file
wp jwt config export --file=jwt-config.json

# Filter with jq
wp jwt config export | jq '.jwt_algorithm'
```

---

### `wp jwt config import`

Import plugin configuration from a JSON file produced by `wp jwt config export`.

By default the entire settings object is replaced. Use `--merge` to update only the keys present in the file. The command shows a diff of every change and asks for confirmation unless `--yes` is passed.

```
wp jwt config import <file> [--merge] [--dry-run] [--yes] [--force]
```

| Argument / Option | Required | Description |
|-------------------|----------|-------------|
| `<file>` | Yes | Path to the JSON file to import |
| `--merge` | No | Merge into existing settings instead of replacing the entire config |
| `--dry-run` | No | Show what would change without saving anything |
| `--yes` | No | Skip the confirmation prompt — useful in CI/CD pipelines |
| `--force` | No | Skip plugin validation and save regardless of validation errors |

```bash
# Preview changes without saving
wp jwt config import jwt-config.json --dry-run

# Full import with confirmation
wp jwt config import jwt-config.json

# Non-interactive (CI pipelines)
wp jwt config import jwt-config.json --yes
```

**Backup / restore workflow:**

```bash
# On the source site
wp jwt config export --file=jwt-config.json

# On the target site
wp jwt config import jwt-config.json --yes
```

---

## Common Workflows

### CI / CD token generation

```bash
# Generate a token in your pipeline and use it to seed test data
TOKEN=$(wp jwt login --username=admin --password="$WP_ADMIN_PASSWORD")
curl -s -X POST https://my-site.com/wp-json/wp/v2/posts \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello World","status":"publish"}'
```

### Staging-to-production config migration

```bash
# 1. Export from staging
wp jwt config export --file=jwt-staging.json --url=https://staging.example.com

# 2. Review the diff on production
wp jwt config import jwt-staging.json --dry-run --url=https://example.com

# 3. Apply
wp jwt config import jwt-staging.json --yes --url=https://example.com
```

### Automated token health check

```bash
TOKEN=$(wp jwt login --username=healthcheck --password="$HC_PASSWORD")
STATUS=$(wp jwt validate "$TOKEN" --format=json | jq -r '.valid')
[ "$STATUS" = "true" ] && echo "JWT OK" || echo "JWT FAILED"
```

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Authentication is not enabled.` | Authentication section disabled | `wp jwt config set allow_authentication 1` |
| `Wrong user credentials.` | Incorrect username/email or password | Verify your credentials |
| `Could not decode token…` | Token is not a valid JWT | Check you are passing the full three-part token |
| `Token is valid. / valid: false` | `wp jwt validate` reports invalid | The `message` field explains why (expired, bad signature, etc.) |
| `Token has already been revoked.` | Revoking an already-revoked token | No action needed — it was already blocked |
| `Setting "<key>" not found.` | No stored value for that key | Setting uses plugin default; use `config set` to store an explicit value |
| `Invalid JSON value: …` | Malformed JSON passed with `--type=json` | Validate with `jq . <<< "$VALUE"` before passing |
| `Cannot read file: <path>` | File does not exist or is unreadable | Check the path and file permissions |
| Plugin auto-deactivated | Simple JWT Login is not active | Install and activate Simple JWT Login first |

---

## Contributing

Contributions are welcome! Open an issue on [GitHub](https://github.com/simple-jwt-login/simple-jwt-login-cli) before submitting a pull request.

```bash
# Clone the repository
git clone https://github.com/simple-jwt-login/simple-jwt-login-cli.git
cd simple-jwt-login-cli

# Install dependencies
composer install

# Run unit tests (no Docker required)
composer tests

# Run the full quality suite
composer run check-plugin
```

See the [README](https://github.com/simple-jwt-login/simple-jwt-login-cli) for more informations.
