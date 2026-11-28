# WordPress Two-Factor JWT Login

Require two-factor authentication before WordPress issues a JWT.

Requires the [Two Factor](https://wordpress.org/plugins/two-factor/) plugin to be installed and activated.

## What it does[​](#what-it-does "Direct link to What it does")

When enabled, users who have 2FA configured in the Two Factor plugin must complete a second authentication step before receiving a full JWT. The flow is:

1. Client sends credentials to `POST /simple-jwt-login/v1/auth`. Instead of a full JWT, the response contains a short-lived **interim JWT**.
2. Client submits the interim JWT and the user's 2FA code to `POST /simple-jwt-login/v1/auth/2fa`.
3. On success, a full JWT (and optional refresh token) is returned - identical to a normal auth response.

Users without 2FA configured receive a full JWT directly from step 1, as usual.

### Failed codes and reuse[​](#failed-codes-and-reuse "Direct link to Failed codes and reuse")

Since version 4.2.0, these rules apply to `POST /auth/2fa` and to the OAuth two-factor login form:

* Each wrong code counts as a failed attempt for the Two Factor plugin, so its rate limit applies (error code `108`). Requesting a new interim JWT from `/auth` doesn't reset the counter - only a valid code does.
* Each wrong code also fires `wp_login_failed`, so brute-force plugins can block the client.
* After too many wrong codes (30 by default, set with the Two Factor filter `two_factor_failed_attempt_limit`), the user's password is reset and the user and the admin are emailed, as on `wp-login.php`. The call answers error code `109` with a message asking the user to check their email. The user must set a new password before logging in again.
* An interim JWT can be exchanged for a JWT only once. After a valid code, call `POST /auth` again to start a new two-factor login.

## Settings[​](#settings "Direct link to Settings")

### Interim JWT TTL (minutes)[​](#interim-jwt-ttl-minutes "Direct link to Interim JWT TTL (minutes)")

How long the interim JWT (issued after the password check, before 2FA verification) remains valid. Range: 1-60 minutes.

A short TTL (for example, 5 minutes) minimizes the window in which an intercepted interim JWT could be misused.

## 2FA Endpoint[​](#2fa-endpoint "Direct link to 2FA Endpoint")

**Method:** `POST`

**Endpoint:** `/simple-jwt-login/v1/auth/2fa`

| Parameter | Type                | Description                                             |
| --------- | ------------------- | ------------------------------------------------------- |
| `JWT`     | `required` `string` | The interim JWT returned by the `/auth` endpoint        |
| `code`    | `required` `string` | The 2FA code from the user's authenticator app or email |

**Example:**

```
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/auth/2fa" \

  -H "Content-Type: application/json" \

  -d '{"JWT":"INTERIM_JWT","code":"123456"}'
```

**Response (success):**

```
{

  "success": true,

  "data": {

    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

  }

}
```

note

Users who have 2FA enabled in the Two Factor plugin but need to allow API logins without the 2FA step can use the `two_factor_user_api_login_enable` WordPress filter. This is a filter provided by the Two Factor plugin itself, not by Simple JWT Login.
