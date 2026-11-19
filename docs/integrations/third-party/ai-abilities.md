# AI Abilities (MCP)

Simple JWT Login registers its actions with the [WordPress Abilities API](https://developer.wordpress.org/apis/abilities-api/), so AI agents can manage and troubleshoot the plugin for you. With the [MCP Adapter](https://github.com/WordPress/mcp-adapter) plugin installed, the abilities are available to any MCP client - Claude, Codex, Cursor, Gemini CLI, GitHub Copilot, and others.

Ask your AI client to:

* Explain why a login returns `error_code` 48, and fix the cause.
* Check the audit log for brute force or credential stuffing attacks.
* Review the setup and report security issues.
* Create an API key for a mobile app.

Requirements

WordPress **6.9 or newer**. On older versions the feature does nothing, and the settings page shows a warning.

## Setup[​](#setup "Direct link to Setup")

### 1. Install the MCP Adapter[​](#1-install-the-mcp-adapter "Direct link to 1. Install the MCP Adapter")

Install and activate the [MCP Adapter](https://github.com/WordPress/mcp-adapter/releases) plugin. Skip this step if you only call the abilities through the REST API (see [Without MCP](#without-mcp)).

### 2. Enable AI Abilities[​](#2-enable-ai-abilities "Direct link to 2. Enable AI Abilities")

Go to **Settings → Simple JWT Login → Integrations → Third Party Integrations → AI Abilities (MCP)** and turn on **Enable**. The feature is off by default, so nothing is registered until you enable it. The page also shows whether the MCP Adapter is installed and active.

#### AI access[​](#ai-access "Direct link to AI access")

| Option           | What AI agents can do                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **Read only**    | View settings, API keys, webhooks and logs, analyze the audit log, and run the diagnostics |
| **Write only**   | Change settings, revoke API keys, and remove webhooks                                      |
| **Read & write** | Both                                                                                       |

#### AI permissions[​](#ai-permissions "Direct link to AI permissions")

These cover the riskiest actions. They are all off by default.

| Permission                                  | Effect                                                                                                                                                                                                                                                            |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Allow viewing secrets**                   | Secrets are returned in clear text instead of `********`. Audit log output stays masked.                                                                                                                                                                          |
| **Allow changing roles**                    | `register.new_user_profile` (role of new users), `register.allowed_user_meta` and `auth_codes.codes.*.role` become writable. AI agents can still never make `administrator` (or any role with administrator capabilities) the new user role or an auth code role. |
| **Allow changing authentication providers** | The OAuth providers, the JWT rules (trusted issuers), how a JWT is matched to a user (`login.login_by`, `login.login_by_parameter`, `login.iss_whitelist`) and the Two-Factor integration become writable.                                                        |
| **Allow creating API keys**                 | Registers `create-api-key`. The agent receives a working key.                                                                                                                                                                                                     |
| **Allow adding webhooks**                   | Registers `add-webhook`. A webhook sends plugin events to any HTTPS URL.                                                                                                                                                                                          |

Changing roles or authentication providers, creating API keys and adding webhooks also need **Write** access. The security settings (`general.security` - safe redirects and trusted proxy IP headers) can never be changed by AI agents.

note

Turning a permission off takes effect immediately. After turning one on, restart running MCP sessions - abilities are registered when the session starts.

### 3. Connect your AI client[​](#3-connect-your-ai-client "Direct link to 3. Connect your AI client")

The integration page shows ready-to-copy commands for your site. You can connect in two ways.

#### Option 1 - WP-CLI, locally or over SSH (recommended)[​](#option-1---wp-cli-locally-or-over-ssh-recommended "Direct link to Option 1 - WP-CLI, locally or over SSH (recommended)")

The client starts WP-CLI on the server, so only someone who can already run commands there can connect. Use key-based SSH login, since the client can't answer a password prompt.

```
# Same machine
claude mcp add my-site -- wp mcp-adapter serve --server=mcp-adapter-default-server --user=admin --path=/path/to/wordpress

# Remote server over SSH
claude mcp add my-site -- ssh user@your-server wp mcp-adapter serve --server=mcp-adapter-default-server --user=admin --path=/path/to/wordpress

# WordPress in Docker
claude mcp add my-site -- docker exec -i wordpress wp mcp-adapter serve --server=mcp-adapter-default-server --user=admin --allow-root --path=/var/www/html
```

Other clients use the same command. For SSH or Docker, start it through `ssh` or `docker exec -i` as shown above.

```
# Codex CLI
codex mcp add my-site -- wp mcp-adapter serve --server=mcp-adapter-default-server --user=admin --path=/path/to/wordpress
```

Cursor (`.cursor/mcp.json`), Claude Desktop (`claude_desktop_config.json`), Gemini CLI (`~/.gemini/settings.json`) and other clients that use `mcpServers`:

```
{
    "mcpServers": {
        "my-site": {
            "command": "wp",
            "args": ["mcp-adapter", "serve", "--server=mcp-adapter-default-server", "--user=admin", "--path=/path/to/wordpress"]
        }
    }
}
```

VS Code / GitHub Copilot (`.vscode/mcp.json`):

```
{
    "servers": {
        "my-site": {
            "type": "stdio",
            "command": "wp",
            "args": ["mcp-adapter", "serve", "--server=mcp-adapter-default-server", "--user=admin", "--path=/path/to/wordpress"]
        }
    }
}
```

#### Option 2 - HTTP (no SSH access)[​](#option-2---http-no-ssh-access "Direct link to Option 2 - HTTP (no SSH access)")

Use this on shared hosting or anywhere you can't run WP-CLI. Create an Application Password in **Users → Profile → Application Passwords** for the administrator the AI acts as, then connect to the MCP endpoint with Basic authentication. Only do this over HTTPS.

```
https://example.com/wp-json/mcp/mcp-adapter-default-server
```

```
claude mcp add --transport http my-site https://example.com/wp-json/mcp/mcp-adapter-default-server \
  --header "Authorization: Basic $(printf '%s' 'admin:APPLICATION_PASSWORD' | base64 | tr -d '\n')"
```

Other clients use the same endpoint and header. `BASE64_CREDENTIALS` is the output of `printf '%s' 'admin:APPLICATION_PASSWORD' | base64`.

```
# Gemini CLI
gemini mcp add --transport http --header "Authorization: Basic BASE64_CREDENTIALS" my-site https://example.com/wp-json/mcp/mcp-adapter-default-server
```

Codex CLI (`~/.codex/config.toml`):

```
[mcp_servers.my-site]
url = "https://example.com/wp-json/mcp/mcp-adapter-default-server"
http_headers = { "Authorization" = "Basic BASE64_CREDENTIALS" }
```

Cursor (`.cursor/mcp.json`) and other clients that use `mcpServers` with a `url`:

```
{
    "mcpServers": {
        "my-site": {
            "url": "https://example.com/wp-json/mcp/mcp-adapter-default-server",
            "headers": { "Authorization": "Basic BASE64_CREDENTIALS" }
        }
    }
}
```

VS Code / GitHub Copilot (`.vscode/mcp.json`):

```
{
    "servers": {
        "my-site": {
            "type": "http",
            "url": "https://example.com/wp-json/mcp/mcp-adapter-default-server",
            "headers": { "Authorization": "Basic BASE64_CREDENTIALS" }
        }
    }
}
```

warning

These config files hold a working administrator credential. Keep them out of version control.

If you get `401 Sorry, you are not allowed to do that` with correct credentials, check that Application Passwords are available. WordPress only enables them over HTTPS or when `WP_ENVIRONMENT_TYPE` is `local`. Some hosts also strip the `Authorization` header before it reaches WordPress.

Before connecting a live site

* Start with **Read only** access and keep the AI permissions off. Switch to write access only while you need changes.
* Use a dedicated administrator account for AI agents.
* Review and confirm write actions in your AI client instead of auto-approving them.

## Available Abilities[​](#available-abilities "Direct link to Available Abilities")

| Ability                              | Access                              | Description                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `simple-jwt-login/get-settings`      | Read                                | Returns all settings, or one section, with secrets masked (unless **Allow viewing secrets** is on), the paths that are read-only right now and the granted AI permissions.                                                                                                                                                                                                                                         |
| `simple-jwt-login/diagnose`          | Read                                | Health report: versions, endpoint URLs with their enabled and auth code state, JWT input sources, valid role names, and configuration warnings.                                                                                                                                                                                                                                                                    |
| `simple-jwt-login/security-report`   | Read                                | Security review with a score (0-100), a grade (A-F) and the findings, most severe first. `min_severity` filters the list. Since version 4.2.0 it also reports authentication with `password_hash` and the OAuth backward-compatibility options (for example, **Allow tokens issued for other Google clients**). The [Dashboard](/docs/dashboard.md#security-notices) shows the same critical and warning findings. |
| `simple-jwt-login/explain-error`     | Read                                | Explains an `error_code` from a REST response or a failed settings save (for example, `2005`) and returns the related settings. Any logged-in user can run it; only administrators also get the current setting values.                                                                                                                                                                                            |
| `simple-jwt-login/inspect-jwt`       | Read                                | Checks a JWT the same way the plugin endpoints do: matching JWT rule, algorithm, signature, expiry, two-factor interim tokens, WordPress user lookup, and revocation.                                                                                                                                                                                                                                              |
| `simple-jwt-login/list-api-keys`     | Read                                | Lists API keys. Raw key values are never returned.                                                                                                                                                                                                                                                                                                                                                                 |
| `simple-jwt-login/get-audit-log`     | Read                                | Returns audit log entries, with filters.                                                                                                                                                                                                                                                                                                                                                                           |
| `simple-jwt-login/analyze-audit-log` | Read                                | Summarizes the last N hours (up to 90 days): counts and failure rates per event, a timeline, the IPs, users and API keys with the most failures, the most common failure messages, and findings such as brute force, credential stuffing, or failure spikes. Also reports events that aren't being recorded.                                                                                                       |
| `simple-jwt-login/list-webhooks`     | Read                                | Lists webhooks, with header values masked.                                                                                                                                                                                                                                                                                                                                                                         |
| `simple-jwt-login/get-webhook-logs`  | Read                                | Returns recent webhook calls with their HTTP status, with URL query values masked.                                                                                                                                                                                                                                                                                                                                 |
| `simple-jwt-login/update-settings`   | Write                               | Changes any non-secret setting in one section, validated like a save from the admin page. Some settings also need an AI permission (see [AI permissions](#ai-permissions)).                                                                                                                                                                                                                                        |
| `simple-jwt-login/create-api-key`    | Write + **Allow creating API keys** | Creates an API key. The raw key is returned once.                                                                                                                                                                                                                                                                                                                                                                  |
| `simple-jwt-login/revoke-api-key`    | Write                               | Revokes an API key.                                                                                                                                                                                                                                                                                                                                                                                                |
| `simple-jwt-login/add-webhook`       | Write + **Allow adding webhooks**   | Adds an HTTPS webhook.                                                                                                                                                                                                                                                                                                                                                                                             |
| `simple-jwt-login/remove-webhook`    | Write                               | Removes a webhook. The index and URL must both match.                                                                                                                                                                                                                                                                                                                                                              |

## Troubleshooting with AI[​](#troubleshooting-with-ai "Direct link to Troubleshooting with AI")

Paste an error into your AI client and ask it to fix the problem, for example:

```
{"success":false,"data":{"message":"Wrong user credentials.","error_code":48}}
```

The agent can:

1. Run `simple-jwt-login/diagnose` to see the endpoint URLs, what is enabled and the setup warnings.
2. Run `simple-jwt-login/explain-error` to map the `error_code` to its cause and the current values of the settings behind it.
3. Run `simple-jwt-login/inspect-jwt` on a token the client sent, to find out whether the format, signature, expiry, JWT rule, or user lookup fails.
4. Fix the cause with `simple-jwt-login/update-settings`, which validates the change like a save from the admin page.

To find out whether someone is attacking your logins, or why logins started failing, the agent runs `simple-jwt-login/analyze-audit-log` for the overview and `simple-jwt-login/get-audit-log` to look at single entries. This needs the [Audit Log](/docs/audit-logs.md) enabled, with the relevant events selected.

To review your setup, the agent runs `simple-jwt-login/security-report`.

## Editing Auth Codes and JWT Rules[​](#editing-auth-codes-and-jwt-rules "Direct link to Editing Auth Codes and JWT Rules")

Auth codes and JWT rules mix secret and non-secret fields, so `update-settings` takes a list of operations instead of a new list. `match` must equal the item's current non-secret values. Otherwise nothing is saved, so a stale index never changes the wrong item.

```
{
  "section": "auth_codes",
  "values": {
    "codes": [
      {"index": 0, "match": {"role": "subscriber"}, "set": {"role": "editor"}},
      {"index": 1, "match": {"role": "author"}, "remove": true}
    ]
  }
}
```

New auth codes and JWT rules always need a secret, so you can only add them from the admin page. Other lists, such as custom claims and protect-endpoint rules, are sent in full. Lists stored side by side, such as `rules_url`, `rules_type` and `rules_roles`, must keep the same length.

## Without MCP[​](#without-mcp "Direct link to Without MCP")

The MCP Adapter is only needed for MCP clients. The abilities are part of the WordPress Abilities API, so you can also call them through the WordPress REST API, for example with an Application Password. Other plugins can call them with `wp_get_ability()`.

```
curl -u admin:APPLICATION_PASSWORD \
  "https://example.com/wp-json/wp-abilities/v1/abilities/simple-jwt-login/explain-error/run?input[error_code]=48"
```

Run read abilities with `GET` and write abilities with `POST`. The same access level, permission checks, and secret masking apply.

## Security[​](#security "Direct link to Security")

* Only administrators (`manage_options`) can run abilities. The exception is `explain-error`, which any logged-in user can run, without the current setting values. Logged-out visitors can't run any ability.
* Users who can't run an ability can't list, describe or probe it either - through the REST API or MCP discovery, it answers as if it doesn't exist.
* AI agents can never write secrets. Secrets are masked unless **Allow viewing secrets** is on: JWT signing keys, OAuth client secrets, the refresh token key, auth code values, webhook header values, and webhook URL query values. Audit log and webhook log output is always masked, and `inspect-jwt` only reports whether a signature is valid.
* The AI access level and AI permissions can only be changed from the admin page. They, and the user's capability, are checked again on every call.
* Every change goes through the same validation as a save from the admin page. Nothing is saved when it fails.
* When [audit logging](/docs/audit-logs.md) is on, changes made by AI agents are recorded as `AI Ability Executed` and `AI Ability Failed` events.
* Audit log entries, webhook responses and JWT payloads come from outside users. An agent should treat them as data, not as instructions.
