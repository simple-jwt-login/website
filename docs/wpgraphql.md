# WPGraphQL

Simple-JWT-Login integrates with [WPGraphQL](https://wordpress.org/plugins/wp-graphql/) to bring JWT authentication to your GraphQL layer. Once configured, any GraphQL query or mutation can require a valid JWT, making it straightforward to build secure, headless WordPress applications.

**Why use this integration?**

* Authenticate GraphQL requests with the same JWT tokens used for REST API calls
* Protect sensitive queries and mutations so only logged-in users can execute them
* Works with any front-end framework (React, Vue, Next.js, etc.) or mobile client that supports HTTP headers

## Setup Guide[​](#setup-guide "Direct link to Setup Guide")

### Enable WPGraphQL Authentication[​](#enable-wpgraphql-authentication "Direct link to Enable WPGraphQL Authentication")

Go to **Simple-JWT-Login Settings** and enable **WPGraphQL Authorization**.

![Enable WPGraphQL Authentication](/assets/img/wpgraphql/wpgraphql-enabled.png)

### Test an Unauthenticated Request[​](#test-an-unauthenticated-request "Direct link to Test an Unauthenticated Request")

Try calling a **WPGraphQL endpoint** without authentication-you should receive an **Unauthorized error**:

![Unauthorized WPGraphQL Error Example](/assets/img/wpgraphql/wpgraphql-postman-unauthorized.png)

### Authenticate and Use JWT[​](#authenticate-and-use-jwt "Direct link to Authenticate and Use JWT")

Once you authenticate and obtain a valid JWT, include it in your request headers.

Now, your API calls will be **authenticated**:

![Authenticated WPGraphQL Request with JWT](/assets/img/wpgraphql/wpgraphql-postman-jwt.png)
