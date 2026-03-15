# OAuth Login

## Enable OAuth on WordPress login[​](#enable-oauth-on-wordpress-login "Direct link to Enable OAuth on WordPress login")

This ensures a seamless integration between your WordPress site and Google authentication, allowing for a secure and effective OAuth process. Once this option is enabled, on the WordPress login/register screens there will appear a new button: `Continue with Google`.

To enable OAuth on WordPress, it's crucial to ensure that you have the correct `return_uri` configured in Google.

note

Please make sure to set the following `return_uri` for "Authorized redirect URIs" in <https://console.cloud.google.com>:

```
{{your_site}}/?rest_route=/simple-jwt-login/v1/oauth/token&provider=google
```

To enable the `Continue with Google` button on your login screen, make sure you check the option `Enable OAuth on WordPress login` from WordPress.

## Create user if not exists[​](#create-user-if-not-exists "Direct link to Create user if not exists")

If you will have google users that may not have an account on WordPress, you can select the `Create user if not exists` option from WordPress. If somebody uses the OAuth flow, and if there is no user with `user_email` equal with email from google, it will automatically create a random user, with this email and a random password.

For example, a new user can have:

```
{
    "user_login": "user_23werowe",
    "user_email": "some_email@google.com",
    "password": "some-random-generated-password"
}
```

## Screenshot[​](#screenshot "Direct link to Screenshot")

![Google OAuth WordPress](/assets/images/oauth_login_google-5879378db4b48a47f8731e5b6a47f0ba.png)
