Built in since 4.3.0

# Simple JWT Login<br />in WP-CLI

The WP-CLI commands cover setup, token issuing and revocation, signing key rotation, API keys, auth codes, settings, diagnostics, and audit logs. They ship with the plugin - no add-on to install.

[Read the docs →](/docs/cli.md "Read the CLI documentation")[View on GitHub](https://github.com/nicumicle/simple-jwt-login/blob/master/CLI.md "View CLI.md on GitHub")

bash

```
# Generate a signing key and enable /auth
$ wp jwt setup
$ 
# Issue a 10-minute token for a user
$ TOKEN=$(wp jwt generate admin --ttl=10)
$ 
# Same checks as the REST endpoints; exit code 1 when invalid
$ wp jwt validate "$TOKEN"
valid                yes
message              Token is valid.
```

Part of the plugin since 4.3.0

30 commands in 18 groups

Table, JSON, CSV, and YAML output

Free & open source

## Main commands

Single results support text and JSON output. Lists support table, CSV, JSON, YAML, and count output, and column selection with --fields.

`jwt setup``jwt generate``jwt validate``jwt revoke-all``jwt key rotate``jwt config``jwt doctor`

### Initial setup

Generates a signing key when the configured algorithm has none, enables the /auth endpoint, and prints the endpoint URL with a sample curl request. An existing key is kept unless --force or a different --algorithm is passed.

[Full docs →](/docs/cli.md "Full CLI documentation")

bash

```
$ wp jwt setup
Generated a new HS256 signing key.
curl -X POST 'https://example.com/?rest_route=/simple-jwt-login/v1/auth' -d 'username=<user>' -d 'password=<password>'
Or, from here: wp jwt login --login=<user>
Success: The /auth endpoint is enabled.
$ 
# Switch to RS256 with a new RSA key pair
$ wp jwt setup --algorithm=RS256
```

## Use cases for teams

The REST API serves client applications. The CLI serves the people who operate the site: developers, DevOps, support, and security.

### Local and preview environments

Provisioning scripts and Docker entrypoints can produce a site that issues JWTs, with the project settings applied, without anyone opening the admin.

```
wp plugin install simple-jwt-login --activate
wp jwt setup
wp jwt config import config/jwt.json --merge --yes
```

### CI tests without a stored password

The pipeline issues a 10-minute token for a test user and revokes it after the run. No WordPress password is kept in CI secrets.

```
TOKEN=$(wp jwt generate ci-bot --ttl=10)
curl -fsS -H "Authorization: Bearer $TOKEN" \
  https://staging.example.com/wp-json/wp/v2/users/me
wp jwt revoke "$TOKEN"
```

### Configuration as code

Settings live in the repository and go through code review. The deploy step previews the diff, then applies it. Keep secrets out of the committed file.

```
wp jwt config export --file=config/jwt.json

# deploy step
wp jwt config import config/jwt.json --merge --dry-run
wp jwt config import config/jwt.json --merge --yes
```

### Security checks in CI

Fail the build when the configuration has critical findings, such as a short signing key or an endpoint without an auth code.

```
wp jwt security-report --min-severity=critical \
  --format=json | jq -e '.findings | length == 0'
```

### Incident response

Revoke a user's sessions, invalidate a leaked signing key, and export failed requests from the audit log for the post-mortem.

```
wp jwt revoke-all jane@example.com --yes
wp jwt key rotate --immediate --yes
wp jwt log analyze --hours=24
wp jwt log list --status=failure --format=csv > incident.csv
```

### Partner API keys

Create a read-only key with an expiration date for an integration, track its last use, and revoke it when the contract ends.

```
wp jwt api-key create integrations --name="Partner ACME" \
  --permissions=read --expires-at="2027-06-30 23:59:59"
wp jwt api-key list --fields=id,name,last_used_at
wp jwt api-key revoke 7
```

## Enable the commands

### Requirements

* Simple JWT Login4.3.0+
* WP-CLIany recent stable
* General > CLIenabled (default)

1

**Update Simple JWT Login**

The commands are registered by the plugin from version 4.3.0. No other plugin is needed.

2

**Remove the old add-on**

The Simple JWT Login CLI plugin is deprecated. While it is active, the built-in commands are not registered. Deactivate and delete it, then check that General > CLI is on.

3

**Verify the commands**

bash

```
$ wp jwt --help
usage: wp jwt <command> [<args>]
```

## Command reference

Every command and subcommand.

`wp jwt setup`Generate a signing key if there is none and enable /auth

`wp jwt login`Authenticate a user with a password and print a JWT

`wp jwt generate`Issue a JWT for a user without a password

`wp jwt refresh`Exchange a refresh token for a new JWT

`wp jwt decode`Print the claims of a JWT (signature not verified)

`wp jwt validate`Verify signature, expiry, audience, user, and revocation

`wp jwt revoke`Revoke a JWT and delete the user's refresh tokens

`wp jwt revoke-all`Revoke every JWT and refresh token of a user

`wp jwt key generate | rotate`Print a new signing key, or replace the stored one

`wp jwt api-key create | list | revoke`Manage API keys

`wp jwt auth-code list | add | remove`Manage auth codes

`wp jwt config get | set | list | export | import`Read and change the settings

`wp jwt doctor`Versions, REST URLs, endpoint status, and configuration warnings

`wp jwt security-report`Security score (0-100, grade A-F) and findings

`wp jwt explain-error`Meaning, HTTP status and related settings of an error code

`wp jwt log list | analyze`Query and summarize the audit log

`wp jwt webhook list | test | logs`List webhooks, send a test call, read the call log

`wp jwt cleanup`Run the daily cleanup job immediately

[Full documentation →](/docs/cli.md "Full CLI documentation")

## Options, output formats, and error messages

The documentation lists every option, the add-on migration notes and a troubleshooting table.

[Read the docs →](/docs/cli.md "Read the CLI documentation")[View on GitHub](https://github.com/nicumicle/simple-jwt-login/blob/master/CLI.md "View CLI.md on GitHub")
