# WordPress JWT Login in React Native

This React Native example logs a WordPress user in with a JWT from an Expo app. Tokens are kept in the device keychain or keystore with `expo-secure-store`, and the app refreshes an expired JWT on its own.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

* Node.js 22.13 or later, or 24.3 or later
* Expo SDK 58, and an Android or iOS device or emulator
* **Allow JWT Authentication** turned on - see [Authentication](/docs/authentication.md)
* **Refresh tokens** turned on, to keep users logged in - optional, see [Refresh token](/docs/refresh-token.md)
* **JWT Middleware for all WordPress endpoints** turned on - see [Integration Options](/docs/configuration.md#integration-options)
* A WordPress site that uses HTTPS

Native apps don't send an `Origin` header, so you don't need CORS settings for them. See [Cross-site requests](/docs/configuration.md#cross-site-requests).

Want a working app right away? Download the [full example](#full-example).

## Call the WordPress API[​](#call-the-wordpress-api "Direct link to Call the WordPress API")

Install secure storage:

```
npx expo install expo-secure-store
```

Set the WordPress URL in `.env.local`:

```
EXPO_PUBLIC_WORDPRESS_URL=https://example.com
```

Create `api.js`:

```
import * as SecureStore from 'expo-secure-store';



const WORDPRESS_URL = process.env.EXPO_PUBLIC_WORDPRESS_URL;

const JWT_KEY = 'wp_jwt';

const REFRESH_KEY = 'wp_refresh';



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



async function expired() {

  await logout();

  return Object.assign(new Error('Your session expired. Log in again.'), { expired: true });

}



async function saveSession(data) {

  await SecureStore.setItemAsync(JWT_KEY, data.jwt);

  // refresh_token is only there when refresh tokens are turned on in WordPress.

  if (data.refresh_token) await SecureStore.setItemAsync(REFRESH_KEY, data.refresh_token);

  else await SecureStore.deleteItemAsync(REFRESH_KEY);

}



export async function hasSession() {

  return Boolean(await SecureStore.getItemAsync(JWT_KEY));

}



export async function logout() {

  await SecureStore.deleteItemAsync(JWT_KEY);

  await SecureStore.deleteItemAsync(REFRESH_KEY);

}



export async function login(email, password) {

  const { ok, body } = await request('/simple-jwt-login/v1/auth', {

    method: 'POST',

    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify({ email, password }),

  });

  if (!ok || !body?.data?.jwt) throw new Error('Login failed.');

  await saveSession(body.data);

}



let refreshing = null;



// Refresh tokens work once, so parallel calls must share one refresh request.

function refresh() {

  refreshing ??= (async () => {

    const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);

    if (!refreshToken) return false;

    const { ok, body } = await request('/simple-jwt-login/v1/auth/refresh', {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ refresh_token: refreshToken }),

    });

    if (!ok || !body?.data?.jwt) return false;

    await saveSession(body.data);

    return true;

  })().finally(() => {

    refreshing = null;

  });

  return refreshing;

}



async function authorized(path) {

  const send = async () =>

    request(path, { headers: { Authorization: `Bearer ${await SecureStore.getItemAsync(JWT_KEY)}` } });

  let result = await send();

  if (!result.ok && (await refresh())) result = await send();

  if (!result.ok) throw await expired();

  return result.body;

}



export async function getUser() {

  const user = await authorized('/wp/v2/users/me');

  if (typeof user?.name !== 'string') throw await expired();

  return user;

}
```

## Store and Refresh the Token[​](#store-and-refresh-the-token "Direct link to Store and Refresh the Token")

`expo-secure-store` keeps the JWT and the refresh token encrypted on the device. Don't use `AsyncStorage`, which isn't encrypted.

When WordPress rejects the JWT, `api.js` sends the refresh token to `/auth/refresh`, saves the new pair, and retries the request once. If that fails too, the user is logged out. If WordPress is down, the session is kept. Refresh tokens work once only, so parallel calls share one refresh request. Without refresh tokens, the user logs in again when the JWT expires.

If two-factor authentication is on, handle the [two-factor step](/docs/integrations/third-party/two-factor.md) before you save the tokens.

## Log In[​](#log-in "Direct link to Log In")

Use it in `App.js`:

```
import { useEffect, useState } from 'react';

import {

  ActivityIndicator,

  Pressable,

  StyleSheet,

  Text,

  TextInput,

  View,

} from 'react-native';

import { getUser, hasSession, login, logout as endSession } from './api';



export default function App() {

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [busy, setBusy] = useState(true);



  async function run(action) {

    setError('');

    setBusy(true);

    try {

      await action();

    } catch (e) {

      setError(e.message);

    } finally {

      setBusy(false);

    }

  }



  useEffect(() => {

    run(async () => {

      if (await hasSession()) setUser(await getUser());

    });

  }, []);



  function handleLogin() {

    run(async () => {

      await login(email.trim(), password);

      setPassword('');

      setUser(await getUser());

    });

  }



  function logout() {

    run(async () => {

      await endSession();

      setUser(null);

    });

  }



  return (

    <View style={styles.screen}>

      <View style={styles.card}>

        {user ? (

          <>

            <Text style={styles.title}>Hello, {user.name}</Text>

            <Button label="Log out" onPress={logout} disabled={busy} />

          </>

        ) : (

          <>

            <Text style={styles.title}>Log in</Text>

            <Text style={styles.label}>Email</Text>

            <TextInput

              style={styles.input}

              value={email}

              onChangeText={setEmail}

              autoCapitalize="none"

              autoComplete="email"

              keyboardType="email-address"

              textContentType="username"

            />

            <Text style={styles.label}>Password</Text>

            <TextInput

              style={styles.input}

              value={password}

              onChangeText={setPassword}

              secureTextEntry

              autoComplete="current-password"

              textContentType="password"

            />

            <Button label="Log in" onPress={handleLogin} disabled={busy} />

          </>

        )}

        {busy && <ActivityIndicator style={styles.spinner} />}

        {error ? (

          <Text style={styles.error} accessibilityRole="alert">

            {error}

          </Text>

        ) : null}

      </View>

    </View>

  );

}



function Button({ label, onPress, disabled }) {

  return (

    <Pressable

      accessibilityRole="button"

      onPress={onPress}

      disabled={disabled}

      style={[styles.button, disabled && styles.buttonDisabled]}

    >

      <Text style={styles.buttonText}>{label}</Text>

    </Pressable>

  );

}



const styles = StyleSheet.create({

  screen: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f3f5f4' },

  card: { padding: 24, borderRadius: 12, backgroundColor: '#fff' },

  title: { marginBottom: 16, fontSize: 24, fontWeight: '700', color: '#17201b' },

  label: { marginBottom: 4, fontWeight: '600', color: '#17201b' },

  input: {

    marginBottom: 16,

    padding: 10,

    borderWidth: 1,

    borderColor: '#7c8a83',

    borderRadius: 6,

    fontSize: 16,

  },

  button: { alignItems: 'center', padding: 12, borderRadius: 6, backgroundColor: '#1d5e41' },

  buttonDisabled: { opacity: 0.6 },

  buttonText: { color: '#fff', fontWeight: '700' },

  spinner: { marginTop: 16 },

  error: { marginTop: 16, color: '#b42318' },

});
```

`expo-secure-store` doesn't work in the browser, so run the app on a device or emulator, not with `expo start --web`.

## Next steps[​](#next-steps "Direct link to Next steps")

* [Revoke the JWT on logout](/docs/revoke-token.md)
* [Register users from the app](/docs/register-user.md)
* [Troubleshoot JWT errors](/docs/troubleshooting.md)

## Full Example[​](#full-example "Direct link to Full Example")

Download a complete app with a login form, a profile screen, token refresh, and a logout button:

[Download the example (ZIP)](/assets/examples/react-native/wordpress-jwt-react-native.zip)

Extract the ZIP, then install the packages:

```
cd wordpress-jwt-react-native

npm install

cp .env.example .env.local
```

Set your site address in `.env.local`, then start the app and open it in Expo Go or an emulator:

```
npx expo start
```
