JavaScript Client SDK

# Simple JWT Login<br />for JavaScript

One npm package to authenticate users, manage tokens, and call the WordPress REST API from any JavaScript application - browser or Node.js.

[View on npm →](https://www.npmjs.com/package/simple-jwt-login "View on npm")[GitHub](https://github.com/nicumicle/simple-jwt-login-client-js "View on GitHub")

Bash

```
// Install
npm install simple-jwt-login
```

JavaScript

```
// Authenticate a user
import SimpleJwtLogin from 'simple-jwt-login';

const client = new SimpleJwtLogin({
  siteUrl: 'https://your-wordpress-site.com',
  authCode: 'your-auth-code',
});

const { data } = await client.auth.login({ email, password });
// data.jwt - ready to use in any fetch / Axios call
```

One npm package

Browser & Node.js

Works with any JS framework

Free & open source

Compatibility

## Works with any JavaScript framework

A zero-dependency library with full ESM and CommonJS support - works in React, Vue, Angular, Svelte, or a plain script tag.

![JavaScript](/assets/images/frameworks/javascript.png)Vanilla JS

![React](/assets/images/frameworks/react.png)React / Next.js

![Vue](/assets/images/frameworks/vue.png)Vue / Nuxt

![Angular](/assets/images/frameworks/angular.png)Angular

API Reference

## Everything in the token lifecycle

Async / await API covering authentication, registration, and the full token lifecycle.

AuthenticateRegister UserValidate TokenRefresh TokenRevoke Token

### Exchange credentials for a JWT

Authenticate any WordPress user by email or username and receive a signed JWT. Store it in memory or in local storage and attach it to every subsequent request via the Authorization header.

[npm →](https://www.npmjs.com/package/simple-jwt-login "View on npm")

JavaScript

```
// Authenticate a user and get a JWT
import SimpleJwtLogin from 'simple-jwt-login';

const client = new SimpleJwtLogin({
  siteUrl: 'https://your-wordpress-site.com',
  authCode: 'your-auth-code',
});

const response = await client.auth.login({
  email: 'user@example.com',
  password: 'secret',
});

const jwt = response.data.jwt;
```

Use Cases

## Built for real JavaScript workflows

From React SPAs to server-side Node.js middleware - the client handles the auth layer so you can focus on your application.

### React / Next.js

Authenticate users from a React SPA or a Next.js app. Store the JWT in a context provider and attach it to every fetch or Axios call to your WordPress REST API.

```
import SimpleJwtLogin from 'simple-jwt-login';

const client = new SimpleJwtLogin({
  siteUrl: process.env.NEXT_PUBLIC_WP_URL,
  authCode: process.env.NEXT_PUBLIC_SJL_AUTH_CODE,
});

// In your login handler
const { data } = await client.auth.login({ email, password });
localStorage.setItem('jwt', data.jwt);

// In your API helper
const res = await fetch(`${wpUrl}/wp-json/wp/v2/posts`, {
  headers: { Authorization: localStorage.getItem('jwt') },
});
```

### Vue / Nuxt

Integrate JWT authentication into a Vue 3 or Nuxt application. Use a Pinia store to hold the token and a composable to expose login/logout actions.

```
// stores/auth.js (Pinia)
import { defineStore } from 'pinia';
import SimpleJwtLogin from 'simple-jwt-login';

const client = new SimpleJwtLogin({
  siteUrl: import.meta.env.VITE_WP_URL,
  authCode: import.meta.env.VITE_SJL_AUTH_CODE,
});

export const useAuthStore = defineStore('auth', {
  state: () => ({ jwt: null }),
  actions: {
    async login(email, password) {
      const res = await client.auth.login({ email, password });
      this.jwt = res.data.jwt;
    },
  },
});
```

### Node.js / Express

Use the client on the server side to validate tokens in Express middleware, script WordPress user creation in CI, or build a BFF that proxies authenticated WP API calls.

```
import SimpleJwtLogin from 'simple-jwt-login';

const client = new SimpleJwtLogin({
  siteUrl: process.env.WP_URL,
  authCode: process.env.SJL_AUTH_CODE,
});

// Express middleware
app.use(async (req, res, next) => {
  const jwt = req.headers.authorization;
  if (!jwt) return res.status(401).json({ error: 'Missing token' });

  const result = await client.auth.validateToken({ jwt });
  if (!result.success) return res.status(401).json({ error: 'Invalid token' });

  next();
});
```

Getting Started

## Up and running in minutes

### Requirements

* Node.js12+
* npm / yarnany
* Simple JWT Loginactive
* WordPress4.4+

1

**Install via npm**

Add the package to your project.

bash

```
npm install simple-jwt-login
# or
yarn add simple-jwt-login
```

2

**Instantiate the client**

Pass your WordPress site URL and Simple JWT Login Auth Code.

JavaScript

```
import SimpleJwtLogin from 'simple-jwt-login';

const client = new SimpleJwtLogin({
  siteUrl: 'https://your-wordpress-site.com',
  authCode: 'your-auth-code',
});
```

3

**Call the API**

Use the async API to authenticate, register, or manage tokens.

JavaScript

```
const { data } = await client.auth.login({
  email: 'user@example.com',
  password: 'secret',
});

const jwt = data.jwt;
```

Methods

## Complete method reference

All available client methods at a glance.

`auth.login()`Exchange credentials for a JWT

`auth.validateToken()`Verify a token signature and expiry

`auth.refreshToken()`Get a new token from an expiring one

`auth.revokeToken()`Permanently invalidate a token

`users.register()`Create a new WordPress user account

`users.delete()`Delete a user via a verified JWT

`users.autologin()`Generate a one-click auto-login URL

`users.changePassword()`Change the authenticated user's password

`users.resetPassword()`Trigger a password reset email

[View on npm →](https://www.npmjs.com/package/simple-jwt-login "View on npm")

## Add JWT to your JavaScript app today

One npm install and a few lines of code - that's all it takes to add WordPress JWT authentication to any JavaScript project.

[Get started →](https://www.npmjs.com/package/simple-jwt-login "View on npm")[View on GitHub](https://github.com/nicumicle/simple-jwt-login-client-js "View source on GitHub")
