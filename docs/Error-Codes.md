---
slug: /error-codes/
title: WordPress JWT Error Codes
sidebar_label: Error Codes
description: Look up every Simple JWT Login error code - what each numeric code in a WordPress JWT response means and how to fix it.
keywords: [error codes, JWT errors, WordPress REST API, troubleshooting]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Every error response from Simple JWT Login includes a numeric `error_code` field. Use the table below to look up the meaning of a specific code and how to resolve it.

Not sure where to start? See [JWT troubleshooting](./Troubleshooting.md).

Error responses follow this format:

```json
{
  "success": false,
  "data": {
    "message": "Human-readable error message",
    "error_code": 48
  }
}
```

Errors raised while authenticating a request to **another** REST route (for example `/wp/v2/posts`) use the standard WordPress REST error format instead. This happens when an [API key](./API-Keys.md) is rejected (`code`: `simple_jwt_login_api_key_error`), when the [JWT Middleware](./Configuration.mdx#jwt-middleware-for-all-wordpress-endpoints) rejects a JWT (`code`: `simple_jwt_login_middleware_error`), and for errors from the `/api-keys` management endpoints. The numeric code is in `data.error_code`:

```json
{
  "code": "simple_jwt_login_api_key_error",
  "message": "Human-readable error message",
  "data": {
    "status": 401,
    "error_code": 84
  }
}
```

:::tip
Read the code from `data.error_code` - it is in the same place in both formats.
:::

:::warning HTTP status changed in 4.2.0
Client errors that used to answer HTTP `500` now answer their real status. The `error_code` values didn't change, so code that checks `error_code` keeps working. Code that checks only the HTTP status must be updated:

- `401` - two-factor errors `106`, `107`, `109`, interim 2FA JWT used as a normal JWT `110`, JWT without the "JWT login by" claim `29`, `30`, invalid Facebook or GitHub code or token `98`, `99`, `102`, `103`, Google `id_token` issued for another client `118`
- `403` - revoked token endpoints called by a non-administrator `115`, OAuth account email not verified `111` (Auth0), `112` (GitHub), `119` (Google)
- `404` - Facebook or GitHub user not found `100`, `104`, revoked token ID not found `116`
- `422` - invalid OAuth provider or missing OAuth code or token `69`, `71`, `77`, `97`, `101`, missing reset password code `60`, API key without a name or permissions, or with an unknown permission `85`, `86`, `87`
- `429` - too many wrong two-factor codes `108`

JWT library errors (`1`-`21`) answer `400`, other validation errors answer `422`, and errors with no status of their own answer `500`.
:::

## Codes by feature

| Feature | Codes |
| :------ | :---- |
| JWT decoding, signature, expiry, audience, and user lookup | 1-22, 54, 130 |
| Revoked or 2FA-interim JWT | 55, 110 |
| [Authentication](./auth/Authentication.md) (`/auth`) | 45-48, 113, 131 |
| [Refresh](./auth/RefreshToken.md), [validate](./auth/ValidateToken.md), [revoke](./auth/RevokeToken.md) | 49-51, 53, 81-83, 131 |
| [Autologin](./Login-User.md) | 23-30, 68 |
| [Register user](./Register-User.md) | 31-38, 52 |
| [Delete user](./Delete-User.md) | 39-42 |
| [Reset password](./Reset-Password.md) | 56-63, 65, 66, 76, 93, 95, 96 |
| [Protect endpoints](./Protect-Endpoints.md) | 75, 114 |
| [API keys](./API-Keys.md) | 84-92, 132 |
| [Revoked tokens administration](./auth/RevokeToken.md#manage-revoked-tokens) | 115-117 |
| [OAuth](./integrations/OAuth/index.md) - provider and login `state` | 69, 70, 129 |
| [Google](./integrations/OAuth/Google/01_Setup.md) | 71-74, 118, 119 |
| [Auth0](./integrations/OAuth/Auth0/01_Setup.md) | 77-80, 111 |
| [Facebook](./integrations/OAuth/Facebook/01_Setup.md) | 97-100 |
| [GitHub](./integrations/OAuth/Github/01_Setup.md) | 101-104, 112 |
| [Two-Factor](./integrations/ThirdParty/02_TwoFactor.md) | 105-110, 133 |
| [AI Abilities](./integrations/ThirdParty/05_AIAbilities.md) | 120-128 |
| [Auth codes](./Auth-Codes.md) | 94 |
| Routing and plugin settings | 43, 44, 67 |

## All codes

| Error Code |                         Message                         | Description                                                                                                                                      |
|:----------:|:-------------------------------------------------------:|--------------------------------------------------------------------------------------------------------------------------------------------------|
|     1      |                  Key may not be empty                   | JWT is missing from request                                                                                                                      |
|     2      |                Wrong number of segments                 | The JWT contains 3 parts, separated by dots (Header, Payload, Signature). Your JWT does not have 2 dots in it.                                |
|     3      |                 Invalid header encoding                 | The encoding of the first part of the JWT, is invalid. This means, that the first part of your JWT is incorrect.                                 |
|     4      |                 Invalid claims encoding                 | The second part of your JWT is invalid.                                                                                                          |
|     5      |               Invalid signature encoding                | The signature that you provided in "JWT Decryption key" is invalid.                                                                              |
|     6      |                     Empty algorithm                     | This means, that your JWT has no algorithm specified.                                                                                            |
|     7      |                 Algorithm not supported                 | The algorithm present in your JWT, is not supported by this plugin.                                                                              |
|     8      |                  Algorithm not allowed                  | The provided algorithm is not allowed by this plugin.                                                                                            |
|     9      |       'kid' invalid, unable to lookup correct key       | Your JWT is malformed.                                                                                                                           |
|     10     |       'kid' invalid, unable to lookup correct key       | Your JWT is malformed.                                                                                                                           |
|     11     |              Signature verification failed              | Invalid "JWT Decryption key" provided in config.                                                                                                 |
|     12     |            `Cannot handle token prior to <date>`           | Check that this token has been created before the current time. Timestamp verified from `nbf`.                                                              |
|     13     |            `Cannot handle token prior to <date>`           | Check that this token has been created before the current time. Timestamp verified from `iat`.                                               |
|     14     |                      Expired token                      | JWT is expired.                                                                                                                                  |
|     15     |                 Algorithm not supported                 | Algorithm not supported when JWT was signed.                                                                                                     |
|     16     |               OpenSSL unable to sign data               | Error while JWT is signed with OpenSSL.                                                                                                          | 
|     17     |                Unsupported sign function                | Invalid Algorithm provided for JWT when signing                                                                                                  |
|     18     |                 Algorithm not supported                 | Invalid Algorithm while trying to verify the JWT                                                                                                 |
|     19     |                      OpenSSL error                      | This is a generic OpenSSL error.                                                                                                                 |
|     20     |             Null result with non-null input             | Decoded JWT is null.                                                                                                                             |
|     21     |             Null result with non-null input             | Encoded JWT is null                                                                                                                              | 
|     22     |                   Unknown JSON error                    | This is a generic error by JWT. More details are provided in the message.                                                                        |
|     23     |                     Wrong Request.                      | JWT is missing in the auto-login process.                                                                                                        |
|     24     |                     User not found.                     | This error occurs when the user is not found. For login and delete endpoint: there is no user in WordPress with the email or ID provided in JWT. |
|     26     |       Auto-login is not enabled on this website.        | You have to enable auto-login from plugin settings.                                                                                              | 
|     27     |               Invalid Auth Code provided.               | The Auth code provided is invalid or missing. You should use one that you have saved in your plugin settings                                     |
|     28     |          This IP is not allowed to auto-login.          | You can not auto-login from this IP. Some IP's are specified in plugin settings that can auto-login into WordPress                               | 
|     29     |             Unable to find property in JWT.             | The user sub-key property can not be found in JWT                                                                                                | 
|     30     |             Unable to find property in JWT.             | The user key property can not be found in JWT                                                                                                    |
|     31     |                Register is not allowed.                 | Register is disabled from settings                                                                                                               |
|     32     |                    Invalid Auth Code                    | Invalid auth code provided on register endpoint. You can use auth codes that are generated in your plugin settings.                              | 
|     33     |        This IP is not allowed to register users.        | You can not register users from this IP. The allowed IPs are saved in plugin settings                                                            | 
|     35     |               Missing email or password.                | Missing email or password from your register new user request                                                                                    | 
|     36     |                 Invalid email address.                  | The value provided for email is not a valid email.                                                                                               | 
|     37     |   This website does not allow users from this domain.   | The email domain is not allowed to register to this WordPress. The allowed domains are saved in plugin settings.                                 | 
|     38     |                  User already exists.                   | The user that you are trying to create already exists. Try a different email address.                                                            |
|     39     |                 Delete is not enabled.                  | The plugin delete endpoint is not enabled for this website. This can be enabled from plugin settings.                                            |
|     40     |                    Missing AUTH KEY                     | Missing Auth Key from Delete. You can find your generated auth keys in plugin settings.                                                          | 
|     41     |    You are not allowed to delete users from this IP     | You can not delete users only from the IPs that are set in plugin settings.                                                                      | 
|     42     |             The 'jwt' parameter is missing.             | The JWT parameter is missing from the request.                                                                                                   | 
|     43     |             Invalid method for this route.              | The route that you are calling does not exist.                                                                                                   | 
|     44     |                   Invalid route name.                   | Route name is invalid.                                                                                                                           | 
|     45     |             Authentication is not enabled.              | Authentication enabled is set to "No" in the plugin settings.                                                                                    |
|     46     |              Authentication missing email.              | Your request does not contain the email address.                                                                                                 | 
|     47     |            Authentication missing password.             | Password is missing from the request.                                                                                                            |
|     48     |            Authentication wrong credentials             | Email or password is incorrect.                                                                                                                  |
|     49     |               JWT payload is not correct.               | Check your JWT payload. After decoding it, it resulted null. it should be an JSON.                                                               |
|     50     |             JWT is too old to be refreshed.             | The JWT generated time is too old. You can not refresh this token.                                                                               |  
|     51     |            JWT is missing from /auth/refresh            | The JWT parameter was not sent to the /auth/refresh endpoint.                                                                                    | 
|     52     |                 Unable to create user.                  | There was an error while trying to create the user.                                                                                              |  
|     53     |             The `jwt` parameter is missing.             | The JWT is missing from reset password, revoke token, or validate user requests.                                                                            |  
|     54     |                WordPress user not found                 | Unable to find a valid user in the provided JWT.                                                                                                 |  
|     55     |                  This JWT is invalid.                   | The JWT has been revoked. It can not be used anymore.                                                                                            |  
|     56     |             Reset Password is not allowed.              | The Reset Password endpoint is disabled.                                                                                                         |  
|     57     |        Route called with invalid request method.        | The Reset Password endpoint is called with an invalid HTTP method. Only PUT and POST are allowed.                                                |  
|     58     |           Invalid Auth Code ( %s ) provided.            | The Reset Password endpoint is called with an invalid AUTH CODE.                                                                                 |  
|     59     |                Missing email parameter.                 | Missing or empty `email` parameter when calling the Reset Password endpoint.                                                                     |  
|     60     |                 Missing code parameter.                 | Missing `code` parameter when calling change user password endpoint.                                                                             |  
|     61     |             Missing `new_password` parameter.             | Missing `new_password` when calling the change user password endpoint                                                                            |  
|     62     |                 Invalid code provided.                  | The `code` and `user_email` does not match when calling the Reset Password endpoint.                                                             |  
|     63     |                Missing email parameter.                 | Missing `email` parameter when calling the Send reset password endpoint.                                                                         |  
|     64     |                       Wrong user.                       | No longer returned since 4.2.0: the Send reset password endpoint answers `200` for unknown emails so it can't be used to find which emails have an account. |  
|     65     |                   Invalid flow type.                    | Invalid plugin settings for Reset password flow.                                                                                                 |  
|     66     |  You need to add the \{\{CODE\}\} variable in email body.   | The `{{CODE}}` parameter is missing from Reset Password email body.                                                                              |  
|     67     |    `Something is wrong. We can not save the settings.`    | Something is wrong with the plugin configuration. The `_wpnonce` field is missing or it is invalid.                                              |  
|     68     |   'The JWT issuer(iss) is not allowed to auto-login.    | The JWT is issued by an authorized issuer.                                                                                                       |  
|     69     |             The Oauth provider is invalid.              | Invalid `provider` parameter provided.                                                                                                           |  
|     70     |          This Oauth provider is not available.          | OAuth provided is not enabled or unavailable.                                                                                                    |  
|     71     | The code or id_token parameter is missing from request. | The code or `id_token` parameter is missing from request when connecting with Google OAuth.                                                      |  
|     72     |            The code you provided is invalid.            | The Google OAuth endpoint has received an invalid `code`.                                                                                        |  
|     73     |            The provided id_token is invalid             | The Google OAuth endpoint has received an invalid `id_token`.                                                                                    |  
|     74     |                 Wrong user credentials.                 | The Google OAuth could not find a user in the provided JWT.                                                                                      |
|     75     |    `JWT is not present and we can not search for a user.`    | The JWT is missing from the request when accessing a protected endpoint.                                                                         |
|     76     |         The custom email subject is empty.              | The Reset Password custom email subject is empty in the plugin settings.                                                                         |
|     77     |  The code or access_token parameter is missing from request.  | The `code` or `access_token` parameter is missing when calling the Auth0 OAuth endpoint.                                                        |
|     78     |          The code you provided is invalid.              | The Auth0 authorization `code` is invalid.                                                                                                       |
|     79     |             The provided token is invalid.              | The Auth0 `access_token` is invalid or rejected by the Auth0 userinfo endpoint. Since 4.2.0 it is also returned for an opaque access token, unless **Allow opaque access tokens** is on. |
|     80     |                Wrong user credentials.                  | No WordPress user was found matching the Auth0 account.                                                                                          |
|     81     |       Refresh Token endpoint is not enabled.            | The Refresh Token endpoint is disabled in the plugin settings.                                                                                   |
|     82     |       Validate Token endpoint is not enabled.           | The Validate Token endpoint is disabled in the plugin settings.                                                                                  |
|     83     |        Revoke Token endpoint is not enabled.            | The Revoke Token endpoint is disabled in the plugin settings.                                                                                    |
|     84     |      You must be logged in to manage API keys.          | You are not authenticated or not authorized to manage this API key.                                                                              |
|     85     |              API key name is required.                  | The `name` parameter is missing when creating or updating an API key.                                                                            |
|     86     |        At least one permission is required.             | The API key has no permissions defined. Provide at least one valid permission.                                                                    |
|     87     |               Invalid permission: %s                    | The API key contains an unrecognized permission value.                                                                                           |
|     88     |              Failed to create API key.                  | A database error occurred while inserting the new API key.                                                                                       |
|     89     |                 Invalid API key ID.                     | No API key was found with the provided ID.                                                                                                       |
|     90     |              Failed to update API key.                  | A database error occurred while updating the API key.                                                                                            |
|     91     |              Failed to revoke API key.                  | A database error occurred while revoking the API key.                                                                                            |
|     92     |              Failed to delete API key.                  | A database error occurred while deleting the API key.                                                                                            |
|     93     |       This JWT can not change your password.            | The JWT provided does not match the user account whose password is being changed.                                                                |
|     94     |               Auth Code is required.                   | An auth code is required but was not provided in the request.                                                                                    |
|     95     |               Invalid email parameter.                 | The email address provided in the change-password request is invalid.                                                                            |
|     96     |               Invalid email parameter.                 | The email address provided in the send-reset-password request is invalid.                                                                        |
|     97     | The code or access_token parameter is missing from request. | The `code` or `access_token` parameter is missing when calling the Facebook OAuth endpoint.                                                 |
|     98     |          The code you provided is invalid.             | The Facebook authorization `code` is invalid.                                                                                                    |
|     99     |       The provided Facebook access_token is invalid.   | The Facebook `access_token` is invalid or rejected.                                                                                              |
|    100     |                Wrong user credentials.                 | No WordPress user was found matching the Facebook account.                                                                                       |
|    101     | The code or access_token parameter is missing from request. | The `code` or `access_token` parameter is missing when calling the GitHub OAuth endpoint.                                                   |
|    102     |          The code you provided is invalid.             | The GitHub authorization `code` is invalid.                                                                                                      |
|    103     |       The provided GitHub access_token is invalid.     | The GitHub `access_token` is invalid or rejected.                                                                                                |
|    104     |                Wrong user credentials.                 | No WordPress user was found matching the GitHub account.                                                                                         |
|    105     |   Two-factor authentication plugin is not active.      | The Two-Factor plugin is not installed/activated or the integration is not enabled in Simple JWT Login settings.                                  |
|    106     |             Invalid interim JWT claims.                | The interim JWT provided for 2FA verification has invalid or missing claims.                                                                     |
|    107     | Invalid or expired two-factor session. Please authenticate again. | The 2FA nonce has expired or is invalid. The user must authenticate from the beginning (`401`).                                                  |
|    108     |     Too many failed attempts. Please wait N seconds.   | The 2FA verification is rate-limited due to too many failed attempts.                                                                            |
|    109     |          The two-factor code is missing / Invalid two-factor code. | The 2FA code is missing or does not match. After too many wrong codes (30 by default) the user's password is reset and emailed, and the message asks the user to check their email. |
|    110     |    This JWT requires two-factor verification before it can be used. | The provided JWT is an interim 2FA JWT and cannot be used for regular authenticated operations until 2FA is completed.                    |
|    111     |             Email address is not verified.             | The Auth0 account email is not verified, and unverified emails are not allowed in the Auth0 integration settings.                                |
|    112     |   No verified primary email found in the GitHub account. | The GitHub account has no verified primary email, and unverified emails are not allowed in the GitHub integration settings.                     |
|    113     |    Authentication with `password_hash` is not enabled.    | The request sent a `password_hash` parameter, but authenticating with a password hash is disabled in the plugin settings.                       |
|    114     |  You do not have the required role to access this endpoint. | The authenticated user does not have one of the WordPress roles required to access this protected endpoint.                                  |
|    115     | You must be an administrator to manage revoked tokens. | Only users with the `manage_options` capability (administrators) can list or delete entries on the `/revoked-tokens` endpoints.                  |
|    116     |              Invalid revoked token ID.                 | The `id` passed to `DELETE /revoked-tokens/{id}` is missing, not a positive number, or no revoked token entry exists with that ID.               |
|    117     |        Failed to delete revoked token entry.           | A database error occurred while deleting the revoked token entry.                                                                                |
|    118     |   The provided id_token was not issued for this website. | The Google `id_token` audience (`aud`) does not match the Google Client ID saved in the plugin settings - it was issued for another client. Turn on **Allow tokens issued for other Google clients** to accept it (not recommended). |
|    119     |  The email address of this Google Account is not verified. | The Google `id_token` reports `email_verified: false`, so the Google Account cannot be used to log in.                                             |
|    120     |               Unknown settings section.                | AI Abilities: the requested settings section does not exist. Call `simple-jwt-login/get-settings` to list the available sections.               |
|    121     |                Unknown setting: `%s`                   | AI Abilities: the setting key does not exist in that section. Only existing keys can be changed.                                                 |
|    122     | The setting "%s" cannot be changed through AI abilities. | AI Abilities: the setting is a secret or human-only. Change it from the plugin settings page.                                                  |
|    123     |            Invalid value for setting: `%s`             | AI Abilities: the value has the wrong type, no settings were provided, or a list operation is malformed.                                         |
|    124     | No webhook matches this index and URL.                 | AI Abilities: the webhook index and URL sent to remove a webhook do not match. List the webhooks again and retry.                                |
|    125     |  A webhook needs a URL and at least one valid event.   | AI Abilities: the webhook being added has an invalid URL or no valid events.                                                                     |
|    126     |         The list item `%s` does not match.             | AI Abilities: the list item at that index no longer matches the `match` value (the settings changed meanwhile). Read the settings again and retry. |
|    127     |  `%d` is not a Simple JWT Login error code.            | AI Abilities: the `explain-error` ability was called with a code that does not belong to Simple JWT Login.                                       |
|    128     |      AI permission denied for this setting.            | AI Abilities: the change needs an AI permission that the administrator has not granted (for example, "Allow changing roles"), or it tries to assign a role with administrator capabilities. Enable it in **Integrations > AI Abilities (MCP)**. |
|    129     | The OAuth state is invalid. Please start the login again. | The browser OAuth callback `state` is missing or doesn't match the `sjl_oauth_state_<provider>` cookie set by the login start (login CSRF protection). Shown on the login page and written to the audit log. Start the login from `GET /oauth/token?provider=<provider>`. |
|    130     | The JWT was not issued for this audience (aud).        | An expected audience is set (Authentication **Expected audience**, or the JWT Rule's **Expected audience (aud)**), and the JWT's `aud` claim doesn't contain it. JWTs issued before the audience was set have no `aud` - log in again. |
|    131     |            Unable to save the refresh token.           | `/auth` or `/auth/refresh` could not save the new refresh token in the database, so no tokens were issued (`500`). Check the database and that the refresh tokens table exists, then log in again. |
|    132     | `The expires_at value must be a date such as 2030-01-31 or 2030-01-31 23:59:00 (UTC).` | The API key `expires_at` is not a valid date. Send a UTC date (`2030-01-31`, `2030-01-31 23:59:00`), an ISO 8601 date with a zone (`2030-01-31T23:59:00Z`), or `null` for no expiry. |
|    133     |          Unable to create two-factor nonce.            | `/auth` or the OAuth login could not store the two-factor session (database or object cache write failed) for a user with 2FA enabled, so no interim JWT was issued (`500`). Retry, and check the server error log. Before 4.2.0 this case shared code `107` with an expired session. |
