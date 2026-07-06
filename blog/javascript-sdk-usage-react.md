# Using the JavaScript SDK in a React App

October 27, 2022 ·

<!-- -->

5 min read

[![Nicu Micle](https://github.com/nicumicle.png)](/blog/authors/nicumicle.md)

[Nicu Micle](/blog/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

We just released the first version for the JavaScript SDK.

This can be installed in your projects either with `npm`, either with `yarn`.

In order to add the Simple-JWT-Login SDK to your project, just type:

```
npm install "simple-jwt-login"
```

or

```
yarn add "simple-jwt-login"
```

## Set up the environment[​](#set-up-the-environment "Direct link to Set up the environment")

Now, let's start a new React project, and include the `simple-jwt-login` sdk.

In order to create a new React project in the folder `my-app`, in your console write the following:

```
npx create-react-app my-app
```

You will see a loader, and some files that are being extracted to the folder. Also, when this process finishes, you will see some instructions on how to proceed.

Now, we will switch in the console to our new project, and start the React app.

```
cd my-app
```

and then

```
npm start
```

Once the React starts, a new tab will be opened in your Browser:

![React App](/assets/images/react-homescreen-aa5af80b5e768d26622467710e754588.png "React Home-screen")

## Install the Simple-JWT-Login SDK[​](#install-the-simple-jwt-login-sdk "Direct link to Install the Simple-JWT-Login SDK")

In your terminal go the folder where you have installed the React App and type:

```
npm install "simple-jwt-login"
```

After this, open a code editor, and in your `package.json` you will see `"simple-jwt-login":"^0.1.4"`

```
"dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "simple-jwt-login": "^0.1.4",
    "web-vitals": "^2.1.4"
  },
```

At this moment, your React App, can use the simple-jwt-login SDK.

## Create a Register form[​](#create-a-register-form "Direct link to Create a Register form")

Now, let's create a form, that will allow us in the future to register users in our WordPress website.

For this tutorial, we will create the form in the `src/App.js` file.

This file looks like this:

```
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

Now, we will remove everything that is inside the `<header>` tag.

```
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
         
      </header>
    </div>
  );
}

export default App;
```

Now, let's add 2 inputs and one button that will allow us to specify the email and the password for our users and a function `handleClick` that will handle the click event from the button.

```
// import logo from './logo.svg';
import './App.css';
import {useRef} from 'react';

function App() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleClick() {
      //TODO: here we will call Simple-JWT-Login
  }
  return (
          <div className="App">
            <header className="App-header">
              Email:
              <input
                      ref={emailRef}
                      type="text"
                      id="email"
                      name="message"

              />
              Password:
              <input
                      ref={passwordRef}
                      type="text"
                      id="password"
                      name="message"
              />
              <button onClick={handleClick}>Register User</button>
            </header>
          </div>
  );
}

export default App;
```

At this moment, we have a register form:

![React register form](data:image/png;base64,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 "React Register Form")

## Add the Simple-JWT-Login SDK library[​](#add-the-simple-jwt-login-sdk-library "Direct link to Add the Simple-JWT-Login SDK library")

On this step, we need to add the simpl-jwt-login SDK in the code.

First, we need to import it. Add this line at the top of your file:

```
import {SimpleJwtLogin} from 'simple-jwt-login'
```

The code should look like this:

```
// import logo from './logo.svg';
import './App.css';
import {useRef} from 'react';
import {SimpleJwtLogin} from 'simple-jwt-login'

function App() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleClick() {
      //TODO: here we will call Simple-JWT-Login
  }
  return (
          <div className="App">
            <header className="App-header">
              Email:
              <input
                      ref={emailRef}
                      type="text"
                      id="email"
                      name="message"

              />
              Password:
              <input
                      ref={passwordRef}
                      type="text"
                      id="password"
                      name="message"
              />
              <button onClick={handleClick}>Register User</button>
            </header>
          </div>
  );
}

export default App;
```

The next step, is to initialize SimpleJWTLogin. For this example, we have a WordPress instance at `http://localhost:88` with the Simple-JWT-Login plugin installed. The plugin has the default namespace, `simple-jwt-login/v1/`.

```
const simpleJwtLogin = new SimpleJwtLogin("http://localhost:88","/simple-jwt-login/v1");
```

Next step, would be to get the values from the inputs, and call Simple-JWT-Login when the button "Register User" is clicked. In order to do this, we need to add some code in `handleClick` method:

```
  function handleClick() {
       //init SimpleJWTLogin
       const simpleJwtLogin = new SimpleJwtLogin("http://localhost:88","/simple-jwt-login/v1");
       //Prepare the Request Body with the values from the input
       const data = {email: emailRef.current.value, password:passwordRef.current.value, nickname:"tests"}
       
       //Call WordPress and create User
        let result = simpleJwtLogin.registerUser(data);
       
       //Display the result in the console
       console.log(result);
  }
```

## Wrapping up[​](#wrapping-up "Direct link to Wrapping up")

This is how our full code will look like:

```
// import logo from './logo.svg';
import './App.css';
import {useRef} from 'react';
import {SimpleJwtLogin} from 'simple-jwt-login'

function App() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleClick() {
    //init SimpleJWTLogin
    const simpleJwtLogin = new SimpleJwtLogin("http://localhost:88","/simple-jwt-login/v1");
    //Prepare the Request Body with the values from the input
    const data = {email: emailRef.current.value, password:passwordRef.current.value, nickname:"tests"}

    //Call WordPress and create User
    let result = simpleJwtLogin.registerUser(data);

    //Display the result in the console
    console.log(result);
  }
  
  
  return (
          <div className="App">
            <header className="App-header">
              Email:
              <input
                      ref={emailRef}
                      type="text"
                      id="email"
                      name="message"

              />
              Password:
              <input
                      ref={passwordRef}
                      type="text"
                      id="password"
                      name="message"
              />
              <button onClick={handleClick}>Register User</button>
            </header>
          </div>
  );
}

export default App;
```

After filling the form and click on "Register User" you will get something similar in your console:

![Register user result](/assets/images/react_register_user_console-1950e85d1d81dc9390aae1fbc3f9f246.png "The final result")

## Conclusion[​](#conclusion "Direct link to Conclusion")

Using the simple-jwt-login SDK allows you to connect to WordPress with only a couple of lines of code. You don't need to worry about the endpoints or the request methods. You just need to make sure that you send all the required parameters.

**Tags:**

* [Tutorial](/blog/tags/tags/tutorial.md "Tutorials and guides for Simple JWT Login")

[Edit this page](https://github.com/simple-jwt-login/website/tree/main/blog/2022-10-27-how_to_use_the_js_sdk.md)
