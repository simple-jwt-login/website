---
slug: /cli/
title: WP-CLI Commands for WordPress JWT
sidebar_label: WP-CLI
description: Built-in WP-CLI commands for Simple JWT Login - issue, validate and revoke JWTs, rotate signing keys, manage API keys, auth codes and settings, and read audit logs from WP-CLI.
keywords: [wp jwt, simple-jwt-login wp-cli, wp-cli jwt, wordpress jwt cli, jwt key rotation, wp jwt generate, wp jwt config, wordpress jwt ci cd]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Simple JWT Login registers a `wp jwt` command namespace in [WP-CLI](https://wp-cli.org/). It covers the plugin's main operations: initial setup, issuing and revoking JWTs, signing key rotation, API keys, auth codes, settings, diagnostics, audit logs, and webhooks. The commands run in the WordPress process on the server, so they do not need HTTP access to the site.

```bash
wp jwt --help
wp jwt config --help
```

:::info Since version 4.3.0
The commands are part of the plugin. The separate **Simple JWT Login CLI** add-on is deprecated and no longer needed.

While the add-on is active, the built-in commands are not registered, **General > CLI** defaults to off, and the CLI card in the admin shows a warning. Deactivate and delete the add-on to switch to the built-in commands. Scripts written for the add-on may need changes - see [Migrating from the add-on](#migrating-from-the-add-on).

On versions before 4.3.0, the commands are only available through the add-on.
:::

## Enable or disable the commands

The commands are enabled by default. To disable them, turn off **Simple JWT Login > General > CLI**, or run:

```bash
wp jwt config set cli.enabled 0
```

Once disabled, `wp jwt` is no longer registered, so it can only be turned back on from the admin.

:::warning
Anyone who can run WP-CLI on the server can issue a JWT for any user, administrators included (`wp jwt generate`), and read the signing key (`wp jwt config get`). Restrict shell access, or disable the commands on servers where WP-CLI access is shared.
:::

## Command overview

| Command | Description |
|---------|-------------|
| [`wp jwt setup`](#wp-jwt-setup) | Generate a signing key if there is none and enable `/auth` |
| [`wp jwt login`](#wp-jwt-login) | Authenticate a user with a password and print a JWT |
| [`wp jwt generate`](#wp-jwt-generate) | Issue a JWT for a user without a password |
| [`wp jwt refresh`](#wp-jwt-refresh) | Exchange a refresh token for a new JWT |
| [`wp jwt decode`](#wp-jwt-decode) | Print the claims of a JWT (signature not verified) |
| [`wp jwt validate`](#wp-jwt-validate) | Verify signature, expiry, audience, user, and revocation |
| [`wp jwt revoke`](#wp-jwt-revoke) | Revoke a JWT and delete the user's refresh tokens |
| [`wp jwt revoke-all`](#wp-jwt-revoke-all) | Revoke every JWT and refresh token of a user |
| [`wp jwt key generate` / `rotate`](#wp-jwt-key) | Print a new signing key, or replace the stored one |
| [`wp jwt api-key create` / `list` / `revoke`](#wp-jwt-api-key) | Manage API keys |
| [`wp jwt auth-code list` / `add` / `remove`](#wp-jwt-auth-code) | Manage auth codes |
| [`wp jwt config get` / `set` / `list` / `export` / `import`](#settings) | Read and change the settings |
| [`wp jwt doctor`](#wp-jwt-doctor) | Versions, REST URLs, endpoint status, and configuration warnings |
| [`wp jwt security-report`](#wp-jwt-security-report) | Security score (0-100, grade A-F) and findings |
| [`wp jwt explain-error`](#wp-jwt-explain-error) | Meaning, HTTP status and related settings of an error code |
| [`wp jwt log list` / `analyze`](#wp-jwt-log) | Query and summarize the audit log |
| [`wp jwt webhook list` / `test` / `logs`](#wp-jwt-webhook) | List webhooks, send a test call, read the call log |
| [`wp jwt cleanup`](#wp-jwt-cleanup) | Run the daily cleanup job immediately |

### Conventions

- Commands that return a single result accept `--format=text` (default) or `--format=json`.
- Commands that return a list accept `--format=table` (default), `csv`, `json`, `yaml` or `count`, and `--fields=a,b` to select columns.
- A `<user>` argument accepts a user ID, login, or email, the same as `wp user get`.
- Commands that change data ask for confirmation. Pass `--yes` to skip the prompt in scripts.
- Global WP-CLI flags work as usual, for example `--url=<site>` on Multisite or `--path=<dir>`.

:::note
With the audit log enabled, commands that change data are recorded as `cli.command.success` or `cli.command.failed` (enable the events in [Audit Logs](../AuditLogs.md)). The entry uses the WordPress user passed with the global `--user=<user>` flag. A command that disables the audit log is still recorded.
:::

## Use cases for teams

The REST API is built for client applications. The CLI is built for the people who operate the site: developers, DevOps, support, and security. The examples below show where `wp jwt` replaces manual work in the admin or custom scripts.

### Local and preview environments

A fresh WordPress install needs a signing key and an enabled `/auth` endpoint before a frontend can log in. `wp jwt setup` does both, so a `docker compose up` or a provisioning script produces a working environment without opening the admin.

```bash
wp plugin install simple-jwt-login --activate
wp jwt setup --algorithm=HS256
wp jwt config import ./config/jwt.json --merge --yes   # project defaults, see "Configuration as code"
```

### CI tests without a stored password

Integration and end-to-end tests need a valid JWT. With `wp jwt generate`, the pipeline gets a short-lived token for a dedicated test user, so no WordPress password has to be stored in CI secrets.

```bash
TOKEN=$(wp jwt generate ci-bot --ttl=10)               # valid for 10 minutes
curl -fsS -H "Authorization: Bearer $TOKEN" \
  https://staging.example.com/wp-json/wp/v2/users/me
wp jwt revoke "$TOKEN"                                 # invalidate it when the job ends
```

### Configuration as code

Keep the plugin settings in the repository and apply them on deploy. Changes go through code review, and `--dry-run` prints the exact diff (secret values masked) before anything is saved.

```bash
# Once, on the reference environment
wp jwt config export --file=config/jwt.json

# In the deploy pipeline
wp jwt config import config/jwt.json --merge --dry-run
wp jwt config import config/jwt.json --merge --yes
```

:::warning
The export contains the signing key and other secrets. Remove them from the file before committing it, and set them per environment with `wp jwt config set` or in `wp-config.php`. Import such a file with `--merge`: a full import replaces the whole settings object and would drop the stored keys.
:::

### Security checks in CI

Fail a pipeline when the configuration has critical findings, for example a short signing key or a public endpoint without an auth code.

```bash
wp jwt security-report --min-severity=critical --format=json \
  | jq -e '.findings | length == 0' > /dev/null \
  || { wp jwt security-report --min-severity=critical; exit 1; }
```

### Scheduled key rotation

`wp jwt key rotate` replaces the signing key without invalidating issued tokens: tokens signed before the rotation are accepted until they expire. This makes periodic rotation safe to run from cron.

```bash
# crontab: rotate the signing key on the 1st of every month
0 3 1 * * cd /var/www/html && wp jwt key rotate --yes
```

### Incident response

When a token, a device or a signing key is compromised, the response is a few commands instead of a database edit.

```bash
wp jwt revoke-all jane@example.com --yes      # one user: every JWT and refresh token
wp jwt key rotate --immediate --yes           # leaked key: every issued token stops working
wp jwt log analyze --hours=24                 # failure rates, top failing IPs and users
wp jwt log list --status=failure --per-page=100 --format=csv > incident.csv
```

### Integrations and partners

Create a scoped, expiring API key for a partner or a service, and revoke it when the contract ends. The key value is printed once, at creation.

```bash
wp jwt api-key create integrations --name="Partner ACME" \
  --permissions=read --expires-at="2027-06-30 23:59:59" --format=json
wp jwt api-key list --fields=id,name,key_prefix,expires_at,last_used_at
wp jwt api-key revoke 7
```

### Webhook verification

Check a webhook URL and its headers before enabling it in production. `test` sends a test payload even when the webhook is disabled and fails on a non-2xx response.

```bash
wp jwt webhook list
wp jwt webhook test 0 --event=login
```

### Support and troubleshooting

When a client reports an error, the support engineer can check the token and the configuration on the server directly.

```bash
wp jwt explain-error 48                    # what errorCode 48 means and which settings to check
wp jwt decode "$TOKEN" --format=json       # claims, without verifying the signature
wp jwt validate "$TOKEN"                   # the same checks the endpoints run
wp jwt doctor                              # endpoints, REST URLs and configuration warnings
```

## Setup

### `wp jwt setup`

Prepares a site to issue JWTs: generates a signing key when the configured algorithm has none, enables **Authentication**, and prints the `/auth` URL with a sample `curl` request.

```
wp jwt setup [--algorithm=<algorithm>] [--force]
```

| Option | Required | Description |
|--------|----------|-------------|
| `--algorithm=<algorithm>` | No | `HS256`, `HS384`, `HS512`, `RS256`, `RS384`, `RS512`, or `random`. Default: the configured algorithm. A different algorithm always gets a new key |
| `--force` | No | Generate a new key even if one exists |

A replaced key keeps validating the tokens it signed until they expire, the same as `wp jwt key rotate`. Keys defined in `wp-config.php` are not changed, and in that case the algorithm can not be changed from the command line.

```bash
wp jwt setup                               # keep the existing key, enable /auth
wp jwt setup --algorithm=RS256             # switch to RS256 with a new RSA key pair
wp jwt setup --force                       # new key, same algorithm
```

## Tokens

### `wp jwt login`

Authenticates a WordPress user with a password and prints a JWT.

:::note
**Authentication > Allow Authentication** must be enabled, or run `wp jwt config set authorization.enabled 1`.
:::

```
wp jwt login [--username=<username>] [--email=<email>] [--login=<login>] [--password=<password>] [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `--username=<username>` | One identifier | WordPress username |
| `--email=<email>` | One identifier | WordPress user email |
| `--login=<login>` | One identifier | Username or email - tried as username first, then as email |
| `--password=<password>` | No | The user's password. If omitted, it is read from a hidden prompt or from STDIN, so it does not end up in the shell history |
| `--format=<format>` | No | `text` (default) or `json` |

When more than one identifier is passed, the priority is `--username` > `--email` > `--login`. When **Refresh Token** is enabled, a refresh token is stored the same as on `/auth`. Users with two-factor authentication can not get a JWT from the command line.

```bash
wp jwt login --username=admin                      # prompts for the password
wp jwt login --email=admin@example.com --format=json < password.txt
# {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}

TOKEN=$(wp jwt login --username=admin < password.txt)
curl -H "Authorization: Bearer $TOKEN" https://example.com/wp-json/wp/v2/users/me
```

### `wp jwt generate`

Issues a JWT for a user without their password. The token has the same claims and signing key as one from `/auth`. Two-factor authentication is not applied. When **Refresh Token** is enabled, a refresh token is printed too.

```
wp jwt generate <user> [--ttl=<minutes>] [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `<user>` | Yes | User ID, login, or email |
| `--ttl=<minutes>` | No | Expiration in minutes, minimum 1. Defaults to **Authentication > JWT TTL** |
| `--format=<format>` | No | `text` (default) or `json`. In `text` format without a refresh token, only the JWT is printed, so the output can be assigned to a variable |

```bash
TOKEN=$(wp jwt generate admin --ttl=10)
wp jwt generate 42 --format=json
# {"jwt":"eyJ0eXAiOiJKV1Qi...","refresh_token":"3f2a..."}
```

### `wp jwt refresh`

Exchanges a refresh token for a new JWT and a new refresh token, like `/auth/refresh`. The endpoint checks apply. **Refresh Token** must be enabled, **Allowed IPs** must be empty (a CLI request has no client IP), and the auth code is required when the endpoint requires one. The old refresh token is invalidated.

```
wp jwt refresh <refresh-token> [--auth-code=<code>] [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `<refresh-token>` | Yes | A refresh token from `/auth`, `wp jwt login` or `wp jwt generate` |
| `--auth-code=<code>` | If the refresh endpoint requires an auth code | The auth code |
| `--format=<format>` | No | `text` (default) or `json` |

```bash
wp jwt refresh 3f2a...c9
# jwt                  eyJ0eXAiOiJKV1Qi...
# refresh_token        8b1d...e4
wp jwt refresh 3f2a...c9 --auth-code=MY_CODE --format=json | jq -r '.jwt'
```

### `wp jwt decode`

Prints the payload of a JWT. The signature is **not** verified - use `wp jwt validate` for that.

```
wp jwt decode <token> [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `<token>` | Yes | The JWT |
| `--format=<format>` | No | `text` (default, one `claim value` line per claim) or `json` |

```bash
wp jwt decode eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxOTk5OTk5fQ.sig
# id                   1
# exp                  1999999

wp jwt decode "$TOKEN" --format=json | jq '.exp'
```

### `wp jwt validate`

Validates a JWT with the same checks as the plugin endpoints: JWT rules, signature, expiry, audience, user, and revocation.

```
wp jwt validate <token> [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `<token>` | Yes | The JWT |
| `--format=<format>` | No | `text` (default) or `json` (`{"valid":true,"message":"..."}`) |

The exit code is `1` when the token is not valid, so the command can be used directly in `if` statements and CI steps.

```bash
wp jwt validate "$TOKEN"
# valid                yes
# message              Token is valid.

if wp jwt validate "$TOKEN" > /dev/null; then
  echo "Token OK"
fi
```

:::tip
`validate` and `revoke` need the signing key and algorithm (**General**), and the **Login > Login by** setting must match a claim in the token.
:::

### `wp jwt revoke`

Revokes a JWT. The signature is verified first, and the user's refresh tokens are deleted, the same as the revoke endpoint.

```
wp jwt revoke <token> [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `<token>` | Yes | The JWT to revoke |
| `--format=<format>` | No | `text` (default) or `json` |

```bash
wp jwt revoke "$TOKEN"
# success              yes
# message              Token has been revoked.
```

### `wp jwt revoke-all`

Revokes every JWT and refresh token issued to a user up to now, for example after a leaked token or a lost device. It works whether or not **Revoke tokens on password change** is enabled. Tokens issued afterwards (from the next second) are valid.

```
wp jwt revoke-all <user> [--yes]
```

| Option | Required | Description |
|--------|----------|-------------|
| `<user>` | Yes | User ID, login, or email |
| `--yes` | No | Skip the confirmation prompt |

```bash
wp jwt revoke-all jane@example.com          # prompts: "Revoke every token of jane?"
wp jwt revoke-all 42 --yes
```

### `wp jwt key`

```
wp jwt key generate [--algorithm=<algorithm>] [--format=<format>]
wp jwt key rotate [--algorithm=<algorithm>] [--immediate] [--show] [--yes]
```

| Option | Command | Description |
|--------|---------|-------------|
| `--algorithm=<algorithm>` | both | `HS256`, `HS384`, `HS512`, `RS256`, `RS384`, `RS512`, or `random` (the selected algorithm is printed). Default: the configured algorithm |
| `--format=<format>` | `generate` | `text` (default: the key, or the private then the public PEM) or `json` (`algorithm` and the key fields) |
| `--immediate` | `rotate` | Do not keep the old key: every token signed with it, or with a key kept by an earlier rotation, is rejected immediately |
| `--show` | `rotate` | Print the new key. Without it, the key is only saved |
| `--yes` | `rotate` | Skip the confirmation prompt |

`generate` prints a key without saving it: random bytes the size of the hash, hex encoded, for HS256/384/512, or an RSA key pair for RS256 (2048 bits), RS384 (3072 bits) and RS512 (4096 bits).

`rotate` saves a new key (and a new algorithm, with `--algorithm`) without breaking issued tokens:

1. New tokens are signed with the new key.
2. The old key is moved to a **JWT Rule** that matches tokens with `iat` *less than* the rotation time, so tokens issued before the rotation stay valid until they expire.
3. The daily cleanup (or `wp jwt cleanup`, or the next rotation) removes that rule once the JWT TTL plus 60 seconds has passed.

Refresh tokens keep working: when no **Refresh Token** key is set, the old key becomes the refresh token key. Your own JWT rules are not changed and are evaluated before the rotation rules. A key defined in `wp-config.php` must be changed there.

:::warning
Until its rule is removed, the old key still validates tokens. If a key leaked, use `--immediate`.

Tokens that live longer than the JWT TTL (`wp jwt generate --ttl`, or a payload without `exp`) stop working when the rule is removed.
:::

```bash
wp jwt key generate --algorithm=HS512                  # print a key to use elsewhere
wp jwt key generate --algorithm=RS256 --format=json    # RSA key pair as JSON
wp jwt key rotate --yes                                # scheduled rotation, issued tokens stay valid
wp jwt key rotate --algorithm=RS256 --show             # switch to RS256 and print the key pair
wp jwt key rotate --immediate --yes                    # leaked key: reject every issued token now
```

### `wp jwt api-key`

```
wp jwt api-key create <owner> --name=<name> --permissions=<list> [--expires-at=<date>] [--format=<format>]
wp jwt api-key list [--page=<n>] [--per-page=<n>] [--fields=<fields>] [--format=<format>]
wp jwt api-key revoke <id>
```

| Option | Command | Required | Description |
|--------|---------|----------|-------------|
| `<owner>` | `create` | Yes | User ID, login, or email of the key owner. The owner's capabilities apply, as in the admin: a user can only grant permissions they have |
| `--name=<name>` | `create` | Yes | A label for the key, for example `CI deploy` |
| `--permissions=<list>` | `create` | Yes | Comma separated: `read`, `create`, `update`, `delete` |
| `--expires-at=<date>` | `create` | No | Expiration date, `Y-m-d H:i:s` in UTC. Default: no expiration |
| `--format=<format>` | `create` | No | `text` (default) or `json` |
| `--page=<n>` | `list` | No | Page number. Default: 1 |
| `--per-page=<n>` | `list` | No | Keys per page. Default: 100 |
| `--fields=<fields>` | `list` | No | Default: `id,user_id,name,key_prefix,permissions,expires_at,last_used_at,revoked_at` |
| `--format=<format>` | `list` | No | `table` (default), `csv`, `json`, `yaml` or `count` |
| `<id>` | `revoke` | Yes | The key ID from `list`. A revoked key stays in the list with its `revoked_at` date |

The key value is printed only once, at creation. `list` shows the prefix only. See [API Keys](../API-Keys.md) for how the keys are used.

```bash
wp jwt api-key create admin --name="CI deploy" --permissions=read --format=json
wp jwt api-key create 42 --name="Mobile app" --permissions=read,create,update --expires-at="2027-01-31 23:59:59"
wp jwt api-key list --fields=id,name,key_prefix,revoked_at
wp jwt api-key revoke 3
```

### `wp jwt auth-code`

```
wp jwt auth-code list [--show] [--fields=<fields>] [--format=<format>]
wp jwt auth-code add [<code>] [--role=<role>] [--expires=<date>]
wp jwt auth-code remove <index> [--yes]
```

| Option | Command | Required | Description |
|--------|---------|----------|-------------|
| `--show` | `list` | No | Print the codes. Without it, they are masked |
| `--fields=<fields>` | `list` | No | Default: `index,code,role,expiration_date` |
| `--format=<format>` | `list` | No | `table` (default), `csv`, `json`, `yaml` or `count` |
| `<code>` | `add` | No | The code. If omitted, a random code is generated and printed once |
| `--role=<role>` | `add` | No | Role assigned to users who register with this code. Default: the **Register** setting |
| `--expires=<date>` | `add` | No | Expiration date, for example `2027-01-31 23:59:59`. Default: no expiration |
| `<index>` | `remove` | Yes | The code's `index` from `list` |
| `--yes` | `remove` | No | Skip the confirmation prompt |

See [Auth Codes](../Auth-Codes.md) for where the codes are checked.

```bash
wp jwt auth-code add --role=subscriber                       # random code, printed once
wp jwt auth-code add MY_CODE --expires="2027-01-31 23:59:59"
wp jwt auth-code list --show
wp jwt auth-code remove 0 --yes
```

## Settings

Setting keys use dot notation, with the section first: `general.jwt_algorithm`, `authorization.ttl`, `cors.enabled`. `wp jwt config list` prints every key.

### `wp jwt config get`

Prints one setting. Array values are printed as JSON.

```
wp jwt config get <key> [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `<key>` | Yes | Setting key in dot notation, for example `cors.enabled` |
| `--format=<format>` | No | `text` (default) or `json` (the JSON-encoded value, for example `"HS256"` or `true`) |

```bash
wp jwt config get authorization.enabled
# 1
wp jwt config get authorization.jwt_payload --format=json
# ["iat","exp","id"]
```

### `wp jwt config set`

Changes a setting. The resulting settings are validated the same way as a save from the admin page. Nothing is saved when validation fails.

```
wp jwt config set <key> <value> [--type=<type>] [--force]
```

| Option | Required | Description |
|--------|----------|-------------|
| `<key>` | Yes | Setting key in dot notation, inside a section (`general.jwt_algorithm`, not `jwt_algorithm`) |
| `<value>` | Yes | The new value. Booleans accept `1`, `true`, `yes` and `on`; anything else is false |
| `--type=<type>` | No | `auto` (default), `string`, `int`, `bool` or `json` |
| `--force` | No | Skip validation and save anyway. Use it only to repair settings that can not be fixed otherwise |

With `--type=auto`, the type follows the stored value: a boolean stays a boolean, an integer stays an integer, and an array expects a JSON string. A key without a stored value is saved as a string.

```bash
wp jwt config set authorization.enabled 1
wp jwt config set general.jwt_algorithm RS256
wp jwt config set authorization.ttl 120 --type=int
wp jwt config set general.decryption_key "my-super-secret"
wp jwt config set authorization.jwt_payload '["iat","exp","id","email"]' --type=json
```

### `wp jwt config list`

```
wp jwt config list [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `--format=<format>` | No | `text` (default): one `key  value` line per setting, arrays as JSON. `json`: the full settings object |

:::warning
`list` and `get` print secrets, such as the signing key, in plain text.
:::

```bash
wp jwt config list
# authorization.enabled             1
# general.jwt_algorithm             HS256
# ...
```

### `wp jwt config export`

Prints all settings as JSON, or writes them to a file, for backups or for `import` on another site.

```
wp jwt config export [--file=<path>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `--file=<path>` | No | Write the JSON to this file instead of STDOUT. The file is created with `0600` permissions |

:::warning
The export contains secrets such as the signing key. Store the file accordingly.
:::

```bash
wp jwt config export --file=jwt-config.json
wp jwt config export | jq '.general.jwt_algorithm'
```

### `wp jwt config import`

Imports settings from a JSON file created by `wp jwt config export`. By default, the **whole** settings object is replaced; `--merge` changes only the keys present in the file. The command prints a diff (`[+]` added, `[~]` changed, `[-]` removed; secret values are masked) and asks for confirmation before saving.

```
wp jwt config import <file> [--merge] [--dry-run] [--yes] [--force]
```

| Option | Required | Description |
|--------|----------|-------------|
| `<file>` | Yes | Path to the JSON file |
| `--merge` | No | Merge into the current settings instead of replacing them. Lists (for example `authorization.jwt_payload`) are replaced, not merged |
| `--dry-run` | No | Print the diff without saving |
| `--yes` | No | Skip the confirmation prompt |
| `--force` | No | Skip validation and save anyway |

A full export from Simple JWT Login 3.x is converted to the 4.x format on import.

```bash
# Copy the configuration from one site to another
wp jwt config export --file=jwt-config.json             # source site
wp jwt config import jwt-config.json --dry-run          # target site: preview
wp jwt config import jwt-config.json --yes              # target site: apply

# Change a few settings from a partial file
echo '{"cors":{"enabled":1}}' > cors.json
wp jwt config import cors.json --merge --yes
```

The same configuration can be exported and imported from the admin - see [Export and Import](./ExportImport.mdx).

## Diagnostics, logs, and webhooks

### `wp jwt doctor`

Checks the installation: plugin, WordPress and PHP versions, the REST URLs, each endpoint (enabled, auth code required), the JWT settings, and configuration warnings. Run it first when something does not work.

```
wp jwt doctor [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `--format=<format>` | No | `text` (default: summary, endpoint table and warnings table) or `json` |

```bash
wp jwt doctor
wp jwt doctor --format=json | jq '.warnings'
```

### `wp jwt security-report`

Scores the configuration from 0 to 100 (grade A-F) and lists the findings, for example a short signing key or a missing auth code. The [Dashboard](../Dashboard.md) shows the same critical and warning findings.

```
wp jwt security-report [--min-severity=<severity>] [--fields=<fields>] [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `--min-severity=<severity>` | No | Lowest severity to list: `info` (default), `warning` or `critical` |
| `--fields=<fields>` | No | Finding columns in the text table. Default: `severity,code,message,settings` |
| `--format=<format>` | No | `text` (default) or `json` (`score`, `grade`, `counts`, `findings`) |

```bash
wp jwt security-report
# Score: 80/100 (grade B)
wp jwt security-report --min-severity=warning --format=json
wp jwt security-report --fields=severity,message
```

### `wp jwt explain-error`

Explains an error code from an API response (`"errorCode": 48`) or a settings save: what it means, the HTTP status, and the settings to check. The full list is in [Error Codes](../Error-Codes.md).

```
wp jwt explain-error <code> [--format=<format>]
```

| Option | Required | Description |
|--------|----------|-------------|
| `<code>` | Yes | The error code |
| `--format=<format>` | No | `text` (default) or `json` |

```bash
wp jwt explain-error 48
# constant             ERR_AUTHENTICATION_WRONG_CREDENTIALS
# http_status          401
# explanation          Wrong username/email or password. ...
```

### `wp jwt log`

Reads the [audit log](../AuditLogs.md). **Audit Logs** must be enabled for new entries to be recorded; existing entries can be read when it is off.

```
wp jwt log list [--event-type=<event>] [--status=<success|failure>] [--user-id=<id>] [--page=<n>] [--per-page=<n>] [--fields=<fields>] [--format=<format>]
wp jwt log analyze [--hours=<hours>] [--format=<format>]
```

| Option | Command | Description |
|--------|---------|-------------|
| `--event-type=<event>` | `list` | Filter by event, for example `auth.login.failed` or `cli.command.success` |
| `--status=<status>` | `list` | `success` or `failure` |
| `--user-id=<id>` | `list` | Filter by user ID |
| `--page=<n>` | `list` | Page number. Default: 1 |
| `--per-page=<n>` | `list` | Entries per page, maximum 100. Default: 20 |
| `--fields=<fields>` | `list` | Default: `id,created_at,event_type,status,user_id,ip_address,message` |
| `--format=<format>` | `list` | `table` (default), `csv`, `json`, `yaml` or `count` |
| `--hours=<hours>` | `analyze` | Time window in hours. Default: 24 |
| `--format=<format>` | `analyze` | `text` (default) or `json` |

`list` returns entries newest first. `analyze` reports failure rates per event, the top failing IPs, users and API keys, and findings such as brute-force patterns.

```bash
wp jwt log list --status=failure --per-page=50
wp jwt log list --event-type=auth.login.failed --user-id=42 --format=csv > failed-logins.csv
wp jwt log list --event-type=cli.command.success --fields=created_at,user_id,message
wp jwt log list --status=failure --format=count
wp jwt log analyze --hours=168                       # last 7 days
```

### `wp jwt webhook`

```
wp jwt webhook list [--event=<event>] [--fields=<fields>] [--format=<format>]
wp jwt webhook test <index> [--event=<event>]
wp jwt webhook logs [--event=<event>] [--page=<n>] [--per-page=<n>] [--fields=<fields>] [--format=<format>]
```

| Option | Command | Description |
|--------|---------|-------------|
| `--event=<event>` | `list` | Filter by event, for example `login` |
| `--fields=<fields>` | `list` | Default: `index,enabled,method,url,events`. Header values are never printed |
| `--format=<format>` | `list`, `logs` | `table` (default), `csv`, `json`, `yaml` or `count` |
| `<index>` | `test` | The webhook `index` from `list` |
| `--event=<event>` | `test` | Event sent in the test payload. Default: the webhook's first event |
| `--event=<event>` | `logs` | Filter by event |
| `--page=<n>` | `logs` | Page number. Default: 1 |
| `--per-page=<n>` | `logs` | Entries per page. Default: 20 |
| `--fields=<fields>` | `logs` | Default: `id,created_at,event,method,url,status_code` |

`test` sends a test payload to the webhook immediately, even when the webhook or webhooks in general are disabled, and prints the response. It fails on a non-2xx response. The call is logged when **Webhook logs** are enabled. `logs` lists recorded calls, newest first, and requires **Webhook logs**. See [Webhooks](../Webhooks.md).

```bash
wp jwt webhook list --event=login
wp jwt webhook test 0
wp jwt webhook test 0 --event=register
wp jwt webhook logs --event=login --per-page=50
```

### `wp jwt cleanup`

Runs the daily cleanup immediately instead of waiting for WP-Cron. It deletes expired refresh tokens and revoked tokens, log entries older than their retention period, and signing keys kept by `wp jwt key rotate` once their tokens have expired. It takes no options.

```bash
wp jwt cleanup
```

## Migrating from the add-on

1. Update Simple JWT Login to 4.3.0 or later.
2. Deactivate and delete the **Simple JWT Login CLI** plugin (find its slug with `wp plugin list`).
3. If **General > CLI** is off, turn it on.
4. Check `wp jwt --help`.

Then review scripts written for the add-on:

| Change | Add-on | Built-in (4.3.0+) |
|--------|--------|-------------------|
| `wp jwt validate` exit code | Always `0`; scripts parsed the `valid` field | `1` when the token is not valid |
| `wp jwt login --password` | Required | Optional; read from a hidden prompt or STDIN |
| `wp jwt config set` / `import` | Saved without validation | Validated like an admin save; `--force` skips it |
| Setting keys | 3.x names | Section-prefixed 4.x names (see below) |

A 3.x key fails with an error that names the new key:

| 3.x | 4.x |
|-----|-----|
| `allow_authentication` | `authorization.enabled` |
| `jwt_auth_ttl` | `authorization.ttl` |
| `jwt_payload` | `authorization.jwt_payload` |
| `jwt_algorithm` | `general.jwt_algorithm` |
| `decryption_key` | `general.decryption_key` |
| `jwt_login_by` | `login.login_by` |
| `jwt_login_by_parameter` | `login.login_by_parameter` |

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `'jwt' is not a registered wp command` | The CLI is disabled, or the old add-on is active | Enable **General > CLI**, or deactivate the add-on |
| `Authentication is not enabled.` | The Authentication section is disabled | `wp jwt config set authorization.enabled 1` |
| `Wrong user credentials.` | Wrong username, email, or password | Check the credentials |
| `Please provide --username, --email, or --login` | No identifier was passed | Add `--username`, `--email` or `--login` |
| `Please provide --password` | No password was passed or entered | Pass `--password`, enter it at the prompt, or pipe it on STDIN |
| `User not found: <user>` | No user has this ID, login, or email | Check with `wp user get <user>` |
| `This user must complete two-factor authentication.` | The user has 2FA enabled | A JWT can not be created from the command line for this user |
| `Could not decode token. ...` | The token does not have three dot-separated parts | Pass the full token |
| `valid: no` (exit code 1) | `wp jwt validate` rejected the token | The `message` field contains the reason, for example an expired token or a bad signature |
| `The signing key is defined in wp-config.php. ...` | `key rotate` with the key defined in code | Change the constants in `wp-config.php` |
| `You are not allowed to Authenticate from this IP` | `refresh` with **Allowed IPs** set | A CLI request has no client IP; refresh over HTTP |
| `Token has already been revoked.` | The token was already revoked | No action needed |
| `User not found.` | No WordPress user matches the token | Make sure the token was issued for an existing user |
| `Unable to find user <claim> property in JWT.` | The **Login by** claim is not in the payload | Issue a new token, or change **Login > Login by** |
| `Setting <key> is now <new key>.` | A 3.x key was used | Use the 4.x key |
| `Validation failed: ...` | The new settings are not valid | Fix the value, or pass `--force` |
| `Setting "<key>" not found.` | The key has no stored value | The plugin default applies; `set` stores a value |
| `The current value is an array. ...` | An array setting was set without JSON | Pass `--type=json` with a JSON array or object |
| `Invalid JSON value: ...` / `Invalid JSON in <file>: ...` | Malformed JSON | Check it with `jq .` first |
| `Cannot read file: <path>` | The file does not exist or is not readable | Check the path and permissions |
| `No changes detected.` | The file matches the stored settings | No action needed |

## Next steps

- [Export and import plugin settings](./ExportImport.mdx)
- [Configure Simple JWT Login](../Configuration.mdx)
- [Audit Logs](../AuditLogs.md)
- [AI Abilities](./ThirdParty/05_AIAbilities.md) - the same diagnostics for AI agents over MCP
