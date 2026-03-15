# Setup

## Create an application[​](#create-an-application "Direct link to Create an application")

To enable Google authentication in your application, follow these step-by-step instructions to create a new project and obtain the necessary credentials from the Google Developer Console.

1. Navigate to Google Developer Console <https://console.developers.google.com/apis/>
2. Create a new project
3. Once the project has been created, go to "Credentials" and click on "+Create Credentials"
4. Select "OAuth client ID"
5. Choose Application Type "Web application"
6. Configure Authorized Redirect URIs: In the "Authorized redirect URIs" section, add the URL where the OAuth flow will redirect users after successful authentication. This URL is crucial for the OAuth process.
7. Copy `client_id`, `client_secret`, and `redirect_uri`

note

If you want to use OAuth on WordPress, you need to add int the `Authorized redirect URIs` the following URL:

```
http://{{your-wordpressdomain}}/?rest_route=/simple-jwt-login/v1/oauth/token&provider=google
```

Important Notes

* Keep your credentials secure. Do not expose them in publicly accessible locations or version control systems.
* If your application has multiple environments (e.g., development, production), create separate OAuth client IDs and redirect URIs for each environment.

## Google Setup In WordPress[​](#google-setup-in-wordpress "Direct link to Google Setup In WordPress")

1. Go to Simple-JWT-Login plugin -> Applications
2. Fill `client_id`, `client_secret`, `redirect_uri`
3. Change `Allow Google` to `Yes`.

## Screenshot[​](#screenshot "Direct link to Screenshot")

![WordPress Google Settings](/assets/images/app_google_settings-ff69707e97f0ab8dd8c063fb5e672f50.png)
