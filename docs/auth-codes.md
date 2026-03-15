# Auth Codes

Auth Codes are an optional security layer that adds a shared secret to your API requests. Think of them as API keys: a caller must include the correct `AUTH_CODE` value alongside their request, otherwise the plugin rejects it.

You can require an Auth Code for any combination of the following operations:

* Auto-login
* Register User
* Delete User
* Reset Password and Change Password
* Authenticate (JWT generation)

caution

Use long, random strings for Auth Code values. Short or predictable codes offer little protection. Treat them like passwords — store them securely and rotate them if they are compromised.

## Auth Code structure[​](#auth-code-structure "Direct link to Auth Code structure")

Each Auth Code has three fields:

| Field                   | Description                                                                                                                                                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authentication Key**  | The actual code value that must be included in requests as the `AUTH_CODE` parameter.                                                                                                                                                   |
| **WordPress User Role** | *(Optional)* When set, users registered using this code are assigned this role instead of the default role configured in Register Settings. Useful for creating multiple user tiers (e.g., "premium" vs "free") from a single endpoint. |
| **Expiration Date**     | *(Optional)* The date and time after which this code is no longer accepted. Format: `Y-M-D H:m:s` — e.g., `2025-12-31 23:59:59`.                                                                                                        |

note

Leaving the expiration date blank means the code never expires.

## Screenshot[​](#screenshot "Direct link to Screenshot")

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-8.png?raw=true)
