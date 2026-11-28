MailPoet Add-on

# Magic-link login<br />inside your emails

Drop one shortcode into any MailPoet template. Every subscriber gets a personalized, one-click login link - no password, no friction.

[Download free →](https://wordpress.org/plugins/simple-jwt-login-mailpoet "Download from WordPress.org")[Documentation](/docs/mailpoet.md "Read the documentation")

MailPoet shortcode

```
<!-- Drop this into any MailPoet email template -->
[custom:simple-jwt-login
  text="Log in to your account"
  authCode="your-auth-code"
  validity="604800"
  redirectUrl="https://yoursite.com/dashboard"
]

<!-- Renders to a unique, time-limited URL per recipient -->
```

One shortcode, any template

Passwordless login

Configurable token lifetime

Free & open source

How it works

## From shortcode to seamless login

1

### Install & configure

Install the add-on, activate it, and copy your Auth Code from Simple JWT Login settings.

2

### Add the shortcode

Drop the shortcode into any MailPoet email template. Set the link text, validity period, and redirect URL.

3

### Send your campaign

MailPoet renders a unique, personalized autologin URL for each subscriber when the email is sent.

4

### Subscriber clicks - done

One click logs them in and redirects them to any page on your site. No passwords, no forms.

Use Cases

## Everywhere a smooth login matters

### Newsletter re-engagement

Include a one-click "Read your exclusive content" link in your newsletter. Subscribers land on a members-only page already logged in - no friction, higher engagement.

### Abandoned cart recovery

Send a cart-recovery email with a magic link that logs the customer in and redirects them straight to checkout - remove every barrier between the email and the purchase.

### Welcome & onboarding emails

Welcome new members with a single click that logs them in and drops them on your onboarding page. First impressions matter - make the journey seamless from day one.

Reference

## Shortcode parameters

All available parameters for the `[custom:simple-jwt-login]` shortcode.

`text`required

Visible link text shown to the subscriber.

`authCode`

The Auth Code from Simple JWT Login → Auth Codes.

`validity`

Token lifetime in seconds. Default: 604800 (1 week).

`redirectUrl`

Override the default redirect URL after login.

`class`

CSS class(es) to apply to the link element.

`style`

Inline CSS styles for the link.

Getting Started

## Up and running in 4 steps

1

**Install Simple JWT Login**

Make sure the core plugin is installed and active on your WordPress site.

2

**Install the MailPoet add-on**

Search for "Simple JWT Login MailPoet" on WordPress.org, install, and activate.

3

**Copy your Auth Code**

Go to Simple JWT Login → Auth Codes. Copy the code you want to use for autologin links.

4

**Add the shortcode to your template**

Open a MailPoet email template, paste the shortcode with your auth code and desired parameters.

[Download free →](https://wordpress.org/plugins/simple-jwt-login-mailpoet "Download from WordPress.org")

## Turn every email into a one-click login

Install the free MailPoet add-on, paste one shortcode, and give every subscriber a frictionless path back to your site.

[Download free →](https://wordpress.org/plugins/simple-jwt-login-mailpoet "Download from WordPress.org")[Documentation](/docs/mailpoet.md "Read the documentation")
