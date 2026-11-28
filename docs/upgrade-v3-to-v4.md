# Upgrade Simple JWT Login from v3 to v4

Version 4 adds API keys, audit logs, webhooks, two-factor login, and more OAuth providers, but it also changes some API responses. Most login flows keep working. This guide lists every change that can break a v3 integration and what to update.

Version 3.x gets security and WordPress compatibility fixes only until January 31, 2027 - see [Security](/security.md).

## Before You Upgrade[​](#before-you-upgrade "Direct link to Before You Upgrade")

1. Make sure the site runs **WordPress 6.2 or newer**. Version 4.2.0 dropped support for older versions.
2. Back up the database. Your settings are migrated automatically when you activate v4, and the old format is removed.
3. Upgrade a staging site first, and run your apps against it.

## API Changes[​](#api-changes "Direct link to API Changes")

### Error Code Field Renamed[​](#error-code-field-renamed "Direct link to Error Code Field Renamed")

Error responses use `error_code` instead of `errorCode`:

```
{

  "success": false,

  "data": {

    "message": "Wrong user credentials.",

    "error_code": 48

  }

}
```

Read `data.error_code` instead of `data.errorCode`. The numbers didn't change - see [Error codes](/docs/error-codes.md).

### Refresh Uses a Refresh Token[​](#refresh-uses-a-refresh-token "Direct link to Refresh Uses a Refresh Token")

In v3, you refreshed by sending the current `JWT` to `/auth/refresh`. In v4, `/auth` returns a separate `refresh_token`, and `/auth/refresh` needs it:

```
{

  "refresh_token": "a1b2c3d4e5f6..."

}
```

1. Turn on refresh tokens in the plugin settings - otherwise `/auth/refresh` returns error `81`.
2. Store the `refresh_token` from the login response.
3. Send it to `/auth/refresh`. Since version 4.2.0, each refresh token works once only, so store the new one from every refresh response.

See [Refresh token](/docs/refresh-token.md).

### Register Response Changed[​](#register-response-changed "Direct link to Register Response Changed")

The new user is nested under `data`, the fields lose the `user_` prefix, and the `message` field is gone:

| v3                     | v4                |
| ---------------------- | ----------------- |
| `id`                   | `data.id`         |
| `user.user_login`      | `data.login`      |
| `user.user_email`      | `data.email`      |
| `user.user_nicename`   | `data.nicename`   |
| `user.user_url`        | `data.url`        |
| `user.user_registered` | `data.registered` |
| `roles`                | `data.roles`      |
| `jwt`                  | `data.jwt`        |

See [Register User](/docs/register-user.md).

### Old `/register` Route Removed[​](#old-register-route-removed "Direct link to old-register-route-removed")

Register users with `POST /simple-jwt-login/v1/users`. The old `/simple-jwt-login/v1/register` route no longer exists.

### Protected Routes Return 401[​](#protected-routes-return-401 "Direct link to Protected Routes Return 401")

When [Protect Endpoints](/docs/protect-endpoints.md) blocks a request without a valid JWT, the status is now `401`, not `403`. Since version 4.2.0, other client errors that used to return `500` also return their real status, such as `401`, `403`, `404`, `422`, or `429`. Check `error_code`, not the HTTP status, to handle specific errors.

### Reset Password With an Unknown Email[​](#reset-password-with-an-unknown-email "Direct link to Reset Password With an Unknown Email")

Since version 4.2.0, requesting a reset code for an email without an account returns `200` instead of `404`, so the endpoint can't be used to find out which emails exist. See [Reset Password](/docs/reset-password.md).

## Login and Security Changes[​](#login-and-security-changes "Direct link to Login and Security Changes")

### Cross-Site Requests Need CORS[​](#cross-site-requests-need-cors "Direct link to Cross-Site Requests Need CORS")

Since version 4.1.1, a browser app on another domain can authenticate with a JWT only when its origin is listed in **Allow origin** in the [CORS](/docs/cors.md) settings. A `*` entry still trusts the `Authorization` header, but never cookie or session JWTs. Server-to-server calls, mobile apps, and requests from the site itself aren't affected. See [Cross-site requests](/docs/configuration.md#cross-site-requests).

### Two-Factor Login[​](#two-factor-login "Direct link to Two-Factor Login")

If the [Two Factor](/docs/integrations/third-party/two-factor.md) plugin is active and a user has set up 2FA, `/auth` returns a short-lived interim token instead of a JWT. Send it with the 2FA code to `POST /auth/2fa` to get the real JWT.

### OAuth Logins[​](#oauth-logins "Direct link to OAuth Logins")

Since version 4.2.0, OAuth tokens must be issued for the app configured in the plugin, and login buttons must link to `GET /oauth/token?provider=<provider>`. Each provider has an option to keep the old behavior. See [OAuth backward compatibility](/docs/integrations/oauth.md#backward-compatibility).

### Reverse Proxies[​](#reverse-proxies "Direct link to Reverse Proxies")

With **Trust reverse proxy IP headers** on, the client IP comes from the last `X-Forwarded-For` entry only. If your proxy sends the IP only in `Client-IP`, switch it to `X-Forwarded-For`. See [Trust reverse proxy IP headers](/docs/configuration.md#trust-reverse-proxy-ip-headers).

## Settings Changes[​](#settings-changes "Direct link to Settings Changes")

* **User Identification** moved from the Delete User settings to **General**, and now applies to every endpoint. Check that it has the value you expect.
* If your own code reads the `simple_jwt_login_settings` option directly, update it for the new structure.
* After upgrading, open each settings tab and check that your values carried over.

## After You Upgrade[​](#after-you-upgrade "Direct link to After You Upgrade")

* Try your login, refresh, and protected requests against the staging site.
* Look at the [Dashboard](/docs/dashboard.md) for security notices about your settings.
* See [what's new in v4](/v4.md) for the new features you can turn on.
* Stuck? See [Troubleshooting](/docs/troubleshooting.md).
