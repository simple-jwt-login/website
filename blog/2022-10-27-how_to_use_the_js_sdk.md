---
title: Using the JavaScript SDK in a React App
description: A real-world walkthrough of using the Simple JWT Login JavaScript SDK inside a React app to authenticate against the WordPress REST API.
keywords: [JavaScript SDK, React, JWT authentication, WordPress REST API, headless WordPress]
slug: /javascript-sdk-usage-react/
hide_table_of_contents: false
authors: nicumicle
tags: [tutorials]
image: /assets/images/social-card.png
---

:::warning Updated November 2026
This post was written for Simple JWT Login 3.x and SDK version 0.1. The steps below are updated for current tools: [Vite](https://vite.dev/) replaces Create React App, which is deprecated. The SDK's `registerUser()` call works with plugin 4.x, but its `refreshToken()` method still uses the 3.x refresh flow. For complete, current examples, see the [React code example](/docs/code-examples/react).
:::

The first version of the Simple JWT Login JavaScript SDK is out. Install it with `npm`:

```bash
npm install simple-jwt-login
```

or with `yarn`:

```bash
yarn add simple-jwt-login
```
<!--truncate-->

## Set Up the Project

Create a React project in the `my-app` folder with Vite:

```bash
npm create vite@latest my-app -- --template react
```

Then go to the new folder, install the dependencies, and start the development server:

```bash
cd my-app
npm install
npm run dev
```

Vite prints a local URL, such as `http://localhost:5173`. Open it in your browser to see the starter app.

## Install the SDK

In the `my-app` folder, run:

```bash
npm install simple-jwt-login
```

The package now appears under `dependencies` in `package.json`, and the app can import it.

## Create a Register Form

Replace the content of `src/App.jsx` with a form that has two inputs, for the email and the password, and a **Register User** button. The `handleClick` function runs when the button is clicked:

```jsx
import { useRef } from 'react';

function App() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleClick() {
    // The next section adds the SDK call here.
  }

  return (
    <div>
      <label>
        Email: <input ref={emailRef} type="email" name="email" />
      </label>
      <label>
        Password: <input ref={passwordRef} type="password" name="password" />
      </label>
      <button onClick={handleClick}>Register User</button>
    </div>
  );
}

export default App;
```

The page now shows the register form:

![React register form](/assets/images/blog/react_register_form.png "React Register Form")

## Call the SDK

Import the SDK at the top of `src/App.jsx`:

```jsx
import { SimpleJwtLogin } from 'simple-jwt-login';
```

Create a client with the address of your WordPress site and the route namespace. This example uses a local WordPress site at `http://localhost:88` with the default namespace, `/simple-jwt-login/v1`:

```jsx
const simpleJwtLogin = new SimpleJwtLogin('http://localhost:88', '/simple-jwt-login/v1');
```

The SDK methods don't return the response. Instead, they pass it to the function you register with `withCallback()`, together with the HTTP status code. Update `handleClick` to read the inputs and register the user:

```jsx
function handleClick() {
  const simpleJwtLogin = new SimpleJwtLogin('http://localhost:88', '/simple-jwt-login/v1');

  simpleJwtLogin.withCallback((response, status) => {
    console.log(status, response);
  });

  simpleJwtLogin.registerUser({
    email: emailRef.current.value,
    password: passwordRef.current.value,
  });
}
```

Turn on **User Registration** under **Settings → Simple JWT Login → Register User** first. If **Require Authentication Code** is on, pass the code as the second argument: `registerUser(params, "your-auth-code")`. Because the app runs on a different origin than WordPress, also add `http://localhost:5173` to **Allow origin** in the [CORS](/docs/cors/) settings.

## Full Code

```jsx
import { useRef } from 'react';
import { SimpleJwtLogin } from 'simple-jwt-login';

function App() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleClick() {
    const simpleJwtLogin = new SimpleJwtLogin('http://localhost:88', '/simple-jwt-login/v1');

    simpleJwtLogin.withCallback((response, status) => {
      console.log(status, response);
    });

    simpleJwtLogin.registerUser({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  }

  return (
    <div>
      <label>
        Email: <input ref={emailRef} type="email" name="email" />
      </label>
      <label>
        Password: <input ref={passwordRef} type="password" name="password" />
      </label>
      <button onClick={handleClick}>Register User</button>
    </div>
  );
}

export default App;
```

Fill in the form and click **Register User**. The browser console shows the status code and the new user:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "login": "myuser",
    "email": "myuser@example.com",
    "roles": ["subscriber"]
  }
}
```

See [Register User](/docs/register-user/) for every field in the response.

## Conclusion

The SDK lets you call WordPress from JavaScript with a few lines of code. It builds the endpoint URLs and picks the request methods, so you only need to send the required parameters.
