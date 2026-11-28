# WordPress JWT Login in Next.js

This Next.js example logs a WordPress user in with a JWT. The browser talks only to Next.js, so the token stays in an `HttpOnly` cookie that JavaScript can't read, and you don't need CORS.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

* Next.js 15 or later with the App Router
* **Allow JWT Authentication** turned on - see [Authentication](/docs/authentication.md)
* **Refresh tokens** turned on, to keep users logged in - optional, see [Refresh token](/docs/refresh-token.md)
* **JWT Middleware for all WordPress endpoints** turned on - see [Integration Options](/docs/configuration.md#integration-options)

Want a working app right away? Download the [full example](#full-example).

Set the WordPress URL in `.env.local`:

```
WORDPRESS_URL=https://example.com
```

## Log In[​](#log-in "Direct link to Log In")

Keep the cookie code in one place, `app/lib/session.js`:

```
const COOKIE = {

  httpOnly: true,

  secure: process.env.NODE_ENV === 'production',

  sameSite: 'lax',

  path: '/',

};



export function saveSession(cookieStore, data) {

  cookieStore.set('wp_jwt', data.jwt, COOKIE);

  // refresh_token is only there when refresh tokens are turned on in WordPress.

  if (data.refresh_token) cookieStore.set('wp_refresh', data.refresh_token, COOKIE);

}



export function clearSession(cookieStore) {

  cookieStore.delete('wp_jwt');

  cookieStore.delete('wp_refresh');

}
```

Create `app/api/login/route.js`:

```
import { cookies } from 'next/headers';

import { saveSession } from '../../lib/session';



export async function POST(request) {

  const { email, password } = (await request.json().catch(() => null)) ?? {};

  if (typeof email !== 'string' || typeof password !== 'string') {

    return Response.json(

      { message: 'Email and password are required.' },

      { status: 400 }

    );

  }



  const url = `${process.env.WORDPRESS_URL}/wp-json/simple-jwt-login/v1/auth`;

  let response;

  let result;

  try {

    response = await fetch(url, {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ email, password }),

      cache: 'no-store',

    });

    result = await response.json();

  } catch (error) {

    console.error('WordPress login request failed', error);

    return Response.json(

      { message: 'WordPress is unavailable.' },

      { status: 502 }

    );

  }



  if (!response.ok || !result?.data?.jwt) {

    return Response.json({ message: 'Login failed.' }, { status: 401 });

  }



  saveSession(await cookies(), result.data);

  return Response.json({ success: true });

}
```

The JWT, and the refresh token when refresh tokens are on, go into `HttpOnly` cookies, so browser scripts can't read them. If two-factor authentication is on, handle the [two-factor step](/docs/integrations/third-party/two-factor.md) before you save the session.

## Call the WordPress REST API[​](#call-the-wordpress-rest-api "Direct link to Call the WordPress REST API")

Read the cookie in a server component, such as `app/profile/page.js`:

```
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';



export default async function ProfilePage({ searchParams }) {

  const token = (await cookies()).get('wp_jwt')?.value;

  if (!token) redirect('/login');



  const url = `${process.env.WORDPRESS_URL}/wp-json/wp/v2/users/me`;

  const response = await fetch(url, {

    headers: { Authorization: `Bearer ${token}` },

    cache: 'no-store',

  });

  if (response.status >= 500) throw new Error('WordPress is unavailable.');

  // An expired or invalid JWT: try the refresh token once.

  if (!response.ok && !(await searchParams).refreshed) redirect('/api/refresh');

  if (!response.ok) redirect('/login');



  const user = await response.json();

  return <h1>Hello, {user.name}</h1>;

}
```

## Refresh the Token[​](#refresh-the-token "Direct link to Refresh the Token")

Server components can't set cookies, so the page sends a rejected JWT to a route handler. Create `app/api/refresh/route.js`:

```
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';

import { clearSession, saveSession } from '../../lib/session';



// Pages can't set cookies, so the profile page sends expired sessions here to swap the refresh token.

export async function GET() {

  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('wp_refresh')?.value;



  let result;

  if (refreshToken) {

    const url = `${process.env.WORDPRESS_URL}/wp-json/simple-jwt-login/v1/auth/refresh`;

    let response;

    try {

      response = await fetch(url, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ refresh_token: refreshToken }),

        cache: 'no-store',

      });

    } catch (error) {

      console.error('WordPress refresh request failed', error);

    }

    // Keep the session when WordPress is down, so the user isn't logged out.

    if (!response || response.status >= 500) {

      return Response.json({ message: 'WordPress is unavailable.' }, { status: 502 });

    }

    result = response.ok ? await response.json().catch(() => null) : null;

  }



  if (!result?.data?.jwt) {

    clearSession(cookieStore);

    redirect('/login');

  }

  saveSession(cookieStore, result.data);

  redirect('/profile?refreshed=1');

}
```

It swaps the refresh token for a new pair and sends the user back to `/profile`. If WordPress is down, it keeps the session. The `refreshed=1` flag makes sure the page tries only once. Refresh tokens work once only, and the route saves the new one every time. Turn on refresh tokens in the plugin to use this - see [Refresh token](/docs/refresh-token.md). Without them, the user logs in again when the JWT expires.

## Log Out[​](#log-out "Direct link to Log Out")

Create `app/api/logout/route.js`:

```
import { cookies } from 'next/headers';

import { clearSession } from '../../lib/session';



export async function POST() {

  clearSession(await cookies());

  return Response.json({ success: true });

}
```

This removes the cookies only. To invalidate the token too, call the [revoke endpoint](/docs/revoke-token.md).

## Next steps[​](#next-steps "Direct link to Next steps")

* [Refresh an expired JWT](/docs/refresh-token.md)
* [Protect WordPress REST API endpoints](/docs/protect-endpoints.md)
* [Troubleshoot JWT errors](/docs/troubleshooting.md)

## Full Example[​](#full-example "Direct link to Full Example")

Download a complete app with a login form, a profile page, token refresh, and a logout button:

[Download the example (ZIP)](/assets/examples/nextjs/wordpress-jwt-nextjs.zip)

Extract the ZIP, then install the packages and create your settings file:

```
cd wordpress-jwt-nextjs

npm install

cp .env.example .env.local
```

Set your site address in `.env.local`, then start the app:

```
npm run dev
```

Open `http://localhost:3000` and log in with a WordPress email and password.

note

In production, the cookie is sent over HTTPS only. Serve both the app and WordPress over HTTPS.
