# New Plugin Release 2.3.0

August 25, 2020 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/releases/authors/nicumicle)

[Nicu Micle](/releases/authors/nicumicle)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

The version `2.3.0` has been released today on [WordPress](https://wordpress.org/plugins/simple-jwt-login).

This release adds token revocation, custom payload data, and user meta on registration.

## New Features[​](#new-features "Direct link to New Features")

* Revoke tokens with the `/auth/revoke` endpoint
* Add extra parameters to the payload on the `/auth` endpoint
* Add a filter on `/auth` so you can change the payload
* Save `user_meta` when creating a user
* Set the decryption key in your WordPress PHP code
* Show the number of active hooks on the dashboard

Read more about [revoking tokens](/docs/revoke-token.md).

## Improvements[​](#improvements "Direct link to Improvements")

* Improve how settings errors are shown

***

If you encounter any issues after updating, please open an [issue](https://github.com/nicumicle/simple-jwt-login/issues) on GitHub.

**Tags:**

* [feature](/releases/tags/feature)
