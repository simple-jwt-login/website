---
slug: /code-examples/react
title: WordPress JWT Login in React
sidebar_label: React Login
sidebar_position: 6
description: Log in WordPress users from a React app built with Vite - get a JWT from the REST API, keep it for the session, and load the user profile.
keywords: [React WordPress JWT, React WordPress login, React headless WordPress, Vite WordPress REST API]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

This React example logs a WordPress user in with a JWT. The app runs in the browser and calls the WordPress REST API directly, so WordPress must allow its origin with CORS.

## Prerequisites

- Node.js 20.19 or later
- **Allow JWT Authentication** turned on - see [Authentication](../auth/Authentication.md)
- **Refresh tokens** turned on, to keep users logged in - optional, see [Refresh token](../auth/RefreshToken.md)
- **JWT Middleware for all WordPress endpoints** turned on - see [Integration Options](../Configuration.mdx#integration-options)
- **CORS** turned on, with your app's exact origin (such as `https://app.example.com`) in **Allow origin** and `Authorization` in **Allow headers** - see [CORS](../Cors.md)

Want a working app right away? Download the [full example](#full-example).

## Call the WordPress API

Set the WordPress URL in `.env.local`:

```bash
VITE_WORDPRESS_URL=https://example.com
```

Create `src/api.js`:

```js
const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL;
const SESSION_KEY = 'wp_session';

async function request(path, options) {
  let response;
  try {
    response = await fetch(`${WORDPRESS_URL}/wp-json${path}`, options);
  } catch {
    throw new Error('WordPress is unavailable.');
  }
  const body = await response.json().catch(() => null);
  if (response.status >= 500) throw new Error('WordPress is unavailable.');
  return { ok: response.ok, body };
}

function expired() {
  logout();
  return Object.assign(new Error('Your session expired. Log in again.'), { expired: true });
}

function readSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function saveSession(data) {
  // refresh_token is only there when refresh tokens are turned on in WordPress.
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ jwt: data.jwt, refreshToken: data.refresh_token }));
}

export function hasSession() {
  return Boolean(readSession()?.jwt);
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export async function login(email, password) {
  const { ok, body } = await request('/simple-jwt-login/v1/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!ok || !body?.data?.jwt) throw new Error('Login failed.');
  saveSession(body.data);
}

let refreshing = null;

// Refresh tokens work once, so parallel calls must share one refresh request.
function refresh() {
  refreshing ??= (async () => {
    const refreshToken = readSession()?.refreshToken;
    if (!refreshToken) return false;
    const { ok, body } = await request('/simple-jwt-login/v1/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!ok || !body?.data?.jwt) return false;
    saveSession(body.data);
    return true;
  })().finally(() => {
    refreshing = null;
  });
  return refreshing;
}

async function authorized(path) {
  const send = () => request(path, { headers: { Authorization: `Bearer ${readSession()?.jwt}` } });
  let result = await send();
  if (!result.ok && (await refresh())) result = await send();
  if (!result.ok) throw expired();
  return result.body;
}

export async function getUser() {
  const user = await authorized('/wp/v2/users/me');
  if (typeof user?.name !== 'string') throw expired();
  return user;
}
```

## Log In

Use it in `src/App.jsx`:

```jsx
import { useEffect, useState } from 'react';
import { getUser, hasSession, login, logout as endSession } from './api.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    if (!hasSession()) {
      setBusy(false);
      return;
    }
    getUser()
      .then(setUser)
      .catch((e) => setError(e.message))
      .finally(() => setBusy(false));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError('');
    setBusy(true);
    try {
      await login(form.get('email'), form.get('password'));
      setUser(await getUser());
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    endSession();
    setUser(null);
  }

  if (user) {
    return (
      <main>
        <h1>Hello, {user.name}</h1>
        <button type="button" onClick={logout}>Log out</button>
      </main>
    );
  }

  return (
    <main>
      <h1>Log in</h1>
      <form method="post" onSubmit={handleSubmit}>
        <p>
          <label>
            Email{' '}
            <input name="email" type="email" autoComplete="username" required />
          </label>
        </p>
        <p>
          <label>
            Password{' '}
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
        </p>
        <button type="submit" disabled={busy}>Log in</button>
        {error && <p role="alert">{error}</p>}
      </form>
    </main>
  );
}
```

## Store and Refresh the Token

The app keeps the JWT, and the refresh token when there is one, in `sessionStorage`, so the session lasts until the tab closes.

When WordPress rejects the JWT, the app sends the refresh token to `/auth/refresh`, saves the new pair, and retries the request once. If that fails too, the user is logged out. If WordPress is down, the session is kept. Refresh tokens work once only, so the app shares one refresh request between parallel calls. Turn on refresh tokens in the plugin to use this - see [Refresh token](../auth/RefreshToken.md). Without them, the user logs in again when the JWT expires.

:::warning
Any script on the page can read `sessionStorage`. An XSS bug would let an attacker steal the refresh token and keep getting new JWTs. Keep the app free of XSS, or use a server that stores the tokens in `HttpOnly` cookies - see the [Next.js example](./nextjs.md).
:::

If two-factor authentication is on, handle the [two-factor step](../integrations/ThirdParty/02_TwoFactor.md) before you store the token.

## Next steps

- [Refresh an expired JWT](../auth/RefreshToken.md)
- [Revoke the JWT on logout](../auth/RevokeToken.md)
- [Troubleshoot JWT errors](../Troubleshooting.md)

## Full Example

Download a complete app with a login form, a profile view, token refresh, and a logout button:

<p>
  <a className="button button--primary button--lg" href="/assets/examples/react/wordpress-jwt-react.zip" download>Download the example (ZIP)</a>
</p>

Extract the ZIP, then install the packages:

```bash
cd wordpress-jwt-react
npm install
cp .env.example .env.local
```

Set your site address in `.env.local`, then start the app:

```bash
npm run dev
```

Open `http://localhost:5173` and log in with a WordPress email and password. Add that address to **Allow origin** in the CORS settings first.
