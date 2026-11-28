# WordPress JWT Login in Angular

This Angular example logs a WordPress user in with a JWT. The app runs in the browser and calls the WordPress REST API directly, so WordPress must allow its origin with CORS.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

* Node.js 22.22.3 or later, or 24.15 or later
* Angular 22, with `provideHttpClient()` in `src/app/app.config.ts`
* **Allow JWT Authentication** turned on - see [Authentication](/docs/authentication.md)
* **Refresh tokens** turned on, to keep users logged in - optional, see [Refresh token](/docs/refresh-token.md)
* **JWT Middleware for all WordPress endpoints** turned on - see [Integration Options](/docs/configuration.md#integration-options)
* **CORS** turned on, with your app's exact origin (such as `https://app.example.com`) in **Allow origin** and `Authorization` in **Allow headers** - see [CORS](/docs/cors.md)

Want a working app right away? Download the [full example](#full-example).

## Call the WordPress API[​](#call-the-wordpress-api "Direct link to Call the WordPress API")

Set the WordPress URL in `src/app/wordpress.config.ts`:

```
export const WORDPRESS_URL = 'https://example.com';
```

Create `src/app/wordpress.service.ts`:

```
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable, inject } from '@angular/core';

import { Observable, firstValueFrom } from 'rxjs';

import { WORDPRESS_URL } from './wordpress.config';



export interface WordPressUser {

  id: number;

  name: string;

}



interface TokenResponse {

  data?: { jwt?: string; refresh_token?: string };

}



interface Session {

  jwt: string;

  refreshToken?: string;

}



const SESSION_KEY = 'wp_session';



export class WordPressError extends Error {

  constructor(

    message: string,

    readonly expired = false,

  ) {

    super(message);

  }

}



@Injectable({ providedIn: 'root' })

export class WordPressService {

  private readonly http = inject(HttpClient);

  private refreshing: Promise<boolean> | null = null;



  hasSession(): boolean {

    return Boolean(this.readSession()?.jwt);

  }



  logout(): void {

    sessionStorage.removeItem(SESSION_KEY);

  }



  async login(email: string, password: string): Promise<void> {

    const url = `${WORDPRESS_URL}/wp-json/simple-jwt-login/v1/auth`;

    const body = await this.send(this.http.post<TokenResponse>(url, { email, password }), 'Login failed.');

    if (!body.data?.jwt) throw new WordPressError('Login failed.');

    this.saveSession(body.data);

  }



  async getUser(): Promise<WordPressUser> {

    const url = `${WORDPRESS_URL}/wp-json/wp/v2/users/me`;

    const get = () =>

      this.send(

        this.http.get<WordPressUser>(url, {

          headers: { Authorization: `Bearer ${this.readSession()?.jwt}` },

        }),

        'Your session expired. Log in again.',

        true,

      );

    try {

      return await get();

    } catch (error) {

      if (!(error instanceof WordPressError) || !error.expired) throw error;

      if (!(await this.refresh())) throw this.expired();

      return get().catch(() => Promise.reject(this.expired()));

    }

  }



  // Refresh tokens work once, so parallel calls must share one refresh request.

  private refresh(): Promise<boolean> {

    this.refreshing ??= (async () => {

      const refreshToken = this.readSession()?.refreshToken;

      if (!refreshToken) return false;

      const url = `${WORDPRESS_URL}/wp-json/simple-jwt-login/v1/auth/refresh`;

      try {

        const body = await this.send(

          this.http.post<TokenResponse>(url, { refresh_token: refreshToken }),

          'Refresh failed.',

          true,

        );

        if (!body.data?.jwt) return false;

        this.saveSession(body.data);

        return true;

      } catch (error) {

        if (error instanceof WordPressError && error.expired) return false;

        throw error;

      }

    })().finally(() => (this.refreshing = null));

    return this.refreshing;

  }



  private expired(): WordPressError {

    this.logout();

    return new WordPressError('Your session expired. Log in again.', true);

  }



  private readSession(): Session | null {

    try {

      return JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? 'null');

    } catch {

      return null;

    }

  }



  // refresh_token is only there when refresh tokens are turned on in WordPress.

  private saveSession(data: { jwt?: string; refresh_token?: string }): void {

    const session: Session = { jwt: data.jwt ?? '', refreshToken: data.refresh_token };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

  }



  private async send<T>(request: Observable<T>, message: string, expired = false): Promise<T> {

    try {

      return await firstValueFrom(request);

    } catch (error) {

      if (error instanceof HttpErrorResponse && (error.status === 0 || error.status >= 500)) {

        throw new WordPressError('WordPress is unavailable.');

      }

      throw new WordPressError(message, expired);

    }

  }

}
```

## Log In[​](#log-in "Direct link to Log In")

Use the service in `src/app/app.ts`:

```
import { Component, OnInit, inject, signal } from '@angular/core';

import { WordPressError, WordPressService, WordPressUser } from './wordpress.service';



@Component({

  selector: 'app-root',

  template: `

    <main>

      @if (user(); as user) {

        <h1>Hello, {{ user.name }}</h1>

        <button type="button" (click)="logout()">Log out</button>

      } @else {

        <h1>Log in</h1>

        <form method="post" (submit)="login($event)">

          <p>

            <label>

              Email

              <input name="email" type="email" autocomplete="username" required />

            </label>

          </p>

          <p>

            <label>

              Password

              <input name="password" type="password" autocomplete="current-password" required />

            </label>

          </p>

          <button type="submit" [disabled]="busy()">Log in</button>

          @if (error()) {

            <p role="alert">{{ error() }}</p>

          }

        </form>

      }

    </main>

  `,

})

export class App implements OnInit {

  private readonly wordpress = inject(WordPressService);

  protected readonly user = signal<WordPressUser | null>(null);

  protected readonly error = signal('');

  protected readonly busy = signal(true);



  async ngOnInit(): Promise<void> {

    if (this.wordpress.hasSession()) {

      await this.run(async () => this.user.set(await this.wordpress.getUser()));

    }

    this.busy.set(false);

  }



  protected async login(event: SubmitEvent): Promise<void> {

    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);

    this.busy.set(true);

    await this.run(async () => {

      const email = String(form.get('email'));

      const password = String(form.get('password'));

      await this.wordpress.login(email, password);

      this.user.set(await this.wordpress.getUser());

    });

    this.busy.set(false);

  }



  protected logout(): void {

    this.wordpress.logout();

    this.user.set(null);

  }



  private async run(action: () => Promise<void>): Promise<void> {

    this.error.set('');

    try {

      await action();

    } catch (e) {

      const error =

        e instanceof WordPressError ? e : new WordPressError('Something went wrong. Try again.');

      this.error.set(error.message);

    }

  }

}
```

## Store and Refresh the Token[​](#store-and-refresh-the-token "Direct link to Store and Refresh the Token")

The app keeps the JWT, and the refresh token when there is one, in `sessionStorage`, so the session lasts until the tab closes.

When WordPress rejects the JWT, the app sends the refresh token to `/auth/refresh`, saves the new pair, and retries the request once. If that fails too, the user is logged out. If WordPress is down, the session is kept. Refresh tokens work once only, so the app shares one refresh request between parallel calls. Turn on refresh tokens in the plugin to use this - see [Refresh token](/docs/refresh-token.md). Without them, the user logs in again when the JWT expires.

warning

Any script on the page can read `sessionStorage`. An XSS bug would let an attacker steal the refresh token and keep getting new JWTs. Keep the app free of XSS, or use a server that stores the tokens in `HttpOnly` cookies - see the [Next.js example](/docs/code-examples/nextjs.md).

If two-factor authentication is on, handle the [two-factor step](/docs/integrations/third-party/two-factor.md) before you store the token.

## Next steps[​](#next-steps "Direct link to Next steps")

* [Refresh an expired JWT](/docs/refresh-token.md)
* [Revoke the JWT on logout](/docs/revoke-token.md)
* [Troubleshoot JWT errors](/docs/troubleshooting.md)

## Full Example[​](#full-example "Direct link to Full Example")

Download a complete app with a login form, a profile view, token refresh, and a logout button:

[Download the example (ZIP)](/assets/examples/angular/wordpress-jwt-angular.zip)

Extract the ZIP, then install the packages:

```
cd wordpress-jwt-angular

npm install
```

Set your site address in `src/app/wordpress.config.ts`, then start the app:

```
npm start
```

Open `http://localhost:4200` and log in with a WordPress email and password. Add that address to **Allow origin** in the CORS settings first.
