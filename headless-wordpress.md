# Headless WordPress authentication with JWT

Keep WordPress for content and users. Build the front end with any framework, and log users in through the REST API.

[Start in 5 minutes →](/docs/quick-start.md)[Get the free plugin](https://wordpress.org/plugins/simple-jwt-login/)

How it works

## From WordPress login to API call

1. 1

   ### Install the plugin

   Add Simple JWT Login to WordPress, set a signing key, and turn on authentication.

2. 2

   ### Get a JWT

   Your front end sends the user credentials to the REST API and gets a signed token back.

3. 3

   ### Call WordPress

   Send the token as a Bearer header. WordPress treats the request as coming from that user.

Log in and call WordPress

```
const site = 'https://example.com/wp-json';



// 1. Get a JWT

const login = await fetch(site + '/simple-jwt-login/v1/auth', {

  method: 'POST',

  headers: { 'Content-Type': 'application/json' },

  body: JSON.stringify({ email, password }),

});

const { data } = await login.json();



// 2. Call the WordPress REST API as that user

const me = await fetch(site + '/wp/v2/users/me', {

  headers: { Authorization: 'Bearer ' + data.jwt },

});
```

Calling from the browser? Add your front-end origin in [CORS](/docs/cors.md) and turn on the [JWT middleware](/docs/configuration.md#jwt-middleware-for-all-wordpress-endpoints).

Features

## What a headless site needs

### Login for any client

Log in by email or username, or with Google, GitHub, Facebook, and Auth0.

[JWT authentication](/docs/authentication.md)

<!-- -->

[ →](/docs/authentication.md)

### User accounts over REST

Register users, reset passwords, and delete accounts without opening wp-login.php.

[User registration](/docs/register-user.md)

<!-- -->

[ →](/docs/register-user.md)

### Protected endpoints

Require a valid JWT for any WordPress REST API route.

[Endpoint protection](/docs/protect-endpoints.md)

<!-- -->

[ →](/docs/protect-endpoints.md)

### Token lifecycle

Refresh tokens to keep users logged in, and revoke them on logout.

[Refresh tokens](/docs/refresh-token.md)

<!-- -->

[ →](/docs/refresh-token.md)

### CORS built in

Choose which front-end origins can call the plugin and authenticate with a JWT.

[CORS settings](/docs/cors.md)

<!-- -->

[ →](/docs/cors.md)

### Two-factor login

Ask for a second factor before WordPress issues the final token.

[Two-factor login](/docs/integrations/third-party/two-factor.md)

<!-- -->

[ →](/docs/integrations/third-party/two-factor.md)

Examples

## Pick your stack

### Next.js

Server-side login with an HttpOnly cookie.

[Next.js example](/docs/code-examples/nextjs.md)

<!-- -->

[ →](/docs/code-examples/nextjs.md)

### Flutter

Mobile login with secure token storage.

[Flutter example](/docs/code-examples/flutter.md)

<!-- -->

[ →](/docs/code-examples/flutter.md)

### React Native

Expo app with secure token storage.

[React Native example](/docs/code-examples/react-native.md)

<!-- -->

[ →](/docs/code-examples/react-native.md)

### React

Browser login with a Vite app.

[React example](/docs/code-examples/react.md)

<!-- -->

[ →](/docs/code-examples/react.md)

### Vue

Browser login with a Vue 3 app.

[Vue example](/docs/code-examples/vuejs.md)

<!-- -->

[ →](/docs/code-examples/vuejs.md)

### Angular

Browser login with HttpClient.

[Angular example](/docs/code-examples/angular.md)

<!-- -->

[ →](/docs/code-examples/angular.md)

### JavaScript

A todo app with no framework.

[JavaScript example](/docs/code-examples/todo-app.md)

<!-- -->

[ →](/docs/code-examples/todo-app.md)

### WooCommerce

Products, cart, and checkout with a JWT.

[Headless store example](/docs/code-examples/woocommerce-headless-store.md)

<!-- -->

[ →](/docs/code-examples/woocommerce-headless-store.md)

### WPGraphQL

Authenticated queries and mutations.

[WPGraphQL guide](/docs/integrations/third-party/wpgraphql.md)

<!-- -->

[ →](/docs/integrations/third-party/wpgraphql.md)

### AI agents

Manage the plugin through MCP.

[MCP guide](/docs/integrations/third-party/ai-abilities.md)

<!-- -->

[ →](/docs/integrations/third-party/ai-abilities.md)

FAQ

## Headless WordPress questions

### What is headless WordPress?

Headless WordPress uses WordPress to manage content and users, while a separate front end, such as a Next.js site or a mobile app, shows it. The two communicate through the REST API or GraphQL.

### Why use JWT authentication with headless WordPress?

WordPress login cookies are made for pages that WordPress serves. A JWT is a signed token that any client can send with a request, so it also works for separate front ends, mobile apps, and servers.

### Does it work with WooCommerce and WPGraphQL?

Yes. The same JWT can authenticate the WooCommerce REST and Store APIs and WPGraphQL requests.

### Where should the front end store the JWT?

For websites, keep it in an HttpOnly cookie set by your server. For mobile apps, use the secure storage of the device. Avoid browser local storage for sensitive apps.

### Is Simple JWT Login free?

Yes. It is free and open-source, forever, with no paid tier.

## Go headless with WordPress

Free and open-source, forever.

[Start in 5 minutes →](/docs/quick-start.md)[Get the free plugin](https://wordpress.org/plugins/simple-jwt-login/)
