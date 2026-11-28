# Auth0 OAuth Setup for WordPress

## Create an Auth0 Application[​](#create-an-auth0-application "Direct link to Create an Auth0 Application")

1. Log in to the [Auth0 Dashboard](https://manage.auth0.com/).
2. Go to **Applications → Applications** and click **+ Create Application**.
3. Choose **Regular Web Applications** and click **Create**.
4. Open the **Settings** tab and copy the **Domain**, **Client ID**, and **Client Secret**.
5. Under **Allowed Callback URLs**, add your site's callback URL:
   <!-- -->
   ```
   https://your-site.com/?rest_route=/simple-jwt-login/v1/oauth/token&provider=auth0
   ```
6. Save your changes.

warning

Keep your credentials secure - never commit them to version control or expose them publicly. Use separate Auth0 applications for each environment (development, staging, production).

***

## Configure in WordPress[​](#configure-in-wordpress "Direct link to Configure in WordPress")

1. Go to **Simple JWT Login → Integrations → OAuth → Auth0**.
2. Enter the **Domain**, **Client ID**, and **Client Secret** from the Auth0 Dashboard.
3. Set the **Redirect URI** to match what you registered in Auth0.
4. Toggle **Enable** to activate the Auth0 provider.

| Field             | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| **Domain**        | Your Auth0 tenant domain, for example, `your-tenant.auth0.com` |
| **Client ID**     | The application Client ID                                      |
| **Client Secret** | The application Client Secret                                  |

note

Since version 4.2.0, the login is rejected when Auth0's userinfo answer has no `email_verified` claim, unless unverified emails are allowed in the Auth0 settings.

## Next steps[​](#next-steps "Direct link to Next steps")

* [Exchange an Auth0 OAuth code for tokens](/docs/integrations/oauth/auth0/exchange-code.md)
* [Exchange an Auth0 token for a WordPress JWT](/docs/integrations/oauth/auth0/exchange-token.md)
