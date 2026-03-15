# MailPoet

The Simple-JWT-Login MailPoet add-on lets you embed personalised, one-click login links inside your MailPoet email campaigns. When a subscriber clicks the link, they are automatically logged into your WordPress site — no password entry required.

The add-on generates a shortcode that you drop into your MailPoet email template. Each time an email is sent, the shortcode is rendered into a unique, time-limited autologin URL for that recipient.

[Download](https://wordpress.org/plugins/simple-jwt-login-mailpoet)

## Shortcode parameters[​](#shortcode-parameters "Direct link to Shortcode parameters")

| Parameter     | Description                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `text`        | The visible link text (e.g., `"Log in to your account"`)                                                              |
| `class`       | CSS class(es) to apply to the link element                                                                            |
| `style`       | Inline CSS styles for the link                                                                                        |
| `validity`    | How long the generated JWT is valid, in seconds. Default: `604800` (one week)                                         |
| `authCode`    | The Auth Code required by the Autologin endpoint. Find your codes under **Simple-JWT-Login → Auth Codes**.            |
| `redirectUrl` | Overrides the redirect URL set in Simple-JWT-Login settings. The user will be sent here after a successful autologin. |

```
[custom:simple-jwt-login text="Login" class="myClassName" style="color:red;" validity="604800" authCode="1" redirectUrl="https://simplejwtlogin.com"]
```

## Installation[​](#installation "Direct link to Installation")

1. Download the add-on from <https://wordpress.org/plugins/simple-jwt-login-mailpoet/>
2. Activate the plugin
3. Generate a short-code
4. Insert the shortcode in your email templates

## Screenshots[​](#screenshots "Direct link to Screenshots")

### Configuration[​](#configuration "Direct link to Configuration")

![](https://ps.w.org/simple-jwt-login-mailpoet/assets/screenshot-1.png)

### Email Template[​](#email-template "Direct link to Email Template")

![](https://ps.w.org/simple-jwt-login-mailpoet/assets/screenshot-2.png)

### Email preview[​](#email-preview "Direct link to Email preview")

![](https://ps.w.org/simple-jwt-login-mailpoet/assets/screenshot-3.png)
