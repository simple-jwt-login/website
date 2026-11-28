# WordPress JWT Plugin Comparison

Most WordPress JWT plugins give you a login endpoint for free and put everything else behind a paid plan. Simple JWT Login is free and open source, with every feature in the free version - no Pro plan, no add-on you must buy.

## Feature Comparison[​](#feature-comparison "Direct link to Feature Comparison")

| Feature                                                                         | Simple JWT Login    | Other JWT plugins    |
| ------------------------------------------------------------------------------- | ------------------- | -------------------- |
| JWT authentication                                                              | Free                | Free                 |
| [Refresh tokens](/docs/refresh-token.md)                                        | Free                | Paid or unavailable  |
| [Token revocation](/docs/revoke-token.md)                                       | Free                | Premium only         |
| Custom JWT claims                                                               | Free                | Via hooks or Premium |
| Secure `HttpOnly` cookie login                                                  | Coming soon         | Varies               |
| [API keys](/docs/api-keys.md)                                                   | Free                | Premium only         |
| [Audit logs](/docs/audit-logs.md)                                               | Free                | Premium only         |
| [Webhooks](/docs/webhooks.md)                                                   | Free                | Premium only         |
| [Google, Facebook, GitHub, and Auth0 login](/docs/integrations/oauth.md)        | Free                | Premium only         |
| [Two-factor authentication](/docs/integrations/third-party/two-factor.md)       | Free                | Not available        |
| [WPGraphQL](/docs/integrations/third-party/wpgraphql.md)                        | Free                | Not available        |
| [WooCommerce REST and Store API](/docs/integrations/third-party/woocommerce.md) | Free                | Not available        |
| [AI abilities (MCP)](/docs/integrations/third-party/ai-abilities.md)            | Free                | Not available        |
| Create users on first OAuth login                                               | Free                | Basic or Premium     |
| Headless WordPress focus                                                        | Strong              | Basic or SSO-focused |
| Mobile app support                                                              | Built for it        | Basic or good        |
| External API authentication                                                     | Free                | Limited or Premium   |
| Open source                                                                     | Fully open, GPLv3   | Varies               |
| Setup                                                                           | Easy, from wp-admin | Easy to complex      |
| Generic OAuth / OpenID Connect                                                  | Not yet             | Limited or Premium   |
| Enterprise SSO                                                                  | Not yet             | Premium only         |
| SAML                                                                            | Not yet             | Premium only         |

## When Another Plugin Fits Better[​](#when-another-plugin-fits-better "Direct link to When Another Plugin Fits Better")

Simple JWT Login is built for apps that log users in through the REST API. If your company signs in through SAML, an enterprise identity provider, or a generic OpenID Connect server, look at an SSO plugin instead. Those are on the roadmap, not in the plugin today.

## JWT vs Application Passwords vs Cookies[​](#jwt-vs-application-passwords-vs-cookies "Direct link to JWT vs Application Passwords vs Cookies")

WordPress has two ways to authenticate built in. Here is how a JWT compares:

|                                          | JWT (Simple JWT Login)            | Application Passwords        | Cookies and nonce                   |
| ---------------------------------------- | --------------------------------- | ---------------------------- | ----------------------------------- |
| Built into WordPress                     | Plugin                            | Since 5.6                    | Yes                                 |
| Best for                                 | Headless sites, mobile apps, SPAs | Server-to-server scripts     | Themes and plugins on the same site |
| Users log in with                        | Email or username and password    | A generated password per app | The wp-admin login form             |
| Expires                                  | Configurable                      | Until revoked                | With the session                    |
| Revoke one session                       | Yes                               | Per application              | Log out everywhere                  |
| Works cross-domain                       | With [CORS](/docs/cors.md)        | Yes                          | No                                  |
| Users sign up and reset passwords by API | Yes                               | No                           | No                                  |

Use Application Passwords for a script or integration that you control. Use a JWT when real users log in from an app that WordPress doesn't serve.

## Get Started[​](#get-started "Direct link to Get Started")

* [Install and get your first JWT in 5 minutes](/docs/quick-start.md)
* [Headless WordPress authentication](/headless-wordpress.md)
* [Code examples for Next.js, React, Angular, and Flutter](/docs/code-examples.md)
* [Download from WordPress.org](https://wordpress.org/plugins/simple-jwt-login/)
