# New Plugin Release 3.4.5

April 11, 2022 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle.md)

[Nicu Micle](/releases/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `3.4.5` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

This update introduces two new Autologin features: a redirect on failure and a shortcode for displaying error details.

## New Features[​](#new-features "Direct link to New Features")

* Add Redirect on Fail Autologin
* Shortcode for displaying Autologin errors

## Redirect on Fail[​](#redirect-on-fail "Direct link to Redirect on Fail")

This feature allows you to set a redirect URL for when Autologin fails - for example, when the JWT is invalid or expired - so you can show users a helpful error page instead of a blank screen.

## Shortcode for Autologin Errors[​](#shortcode-for-autologin-errors "Direct link to Shortcode for Autologin Errors")

The new shortcode lets you display the autologin error code or message directly on any page:

```
[simple-jwt-login:request key="error_code"]
```

```
[simple-jwt-login:request key="error_message"]
```

You can also use it to read any query parameter from the URL. For example, given:

```
https://simplejwtlogin.com?my_parameter=test&error_code=21&error_message=This is an error
```

* `[simple-jwt-login:request key="error_code"]` → `21`
* `[simple-jwt-login:request key="error_message"]` → `This is an error`
* `[simple-jwt-login:request key="my_parameter"]` → `test`

note

These shortcodes strip all HTML tags from the output.

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [feature](/releases/tags/feature.md)
