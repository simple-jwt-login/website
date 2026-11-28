# JavaScript SDK Released

October 25, 2022 ·

<!-- -->

2 min read

[![Nicu Micle](https://github.com/nicumicle.png)](/blog/authors/nicumicle)

[Nicu Micle](/blog/authors/nicumicle)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

Updated November 2026

This SDK was built for Simple JWT Login 3.x. Its `refreshToken()` method still uses the 3.x refresh flow, so for plugin 4.x see [Refresh Token](/docs/refresh-token.md).

The JavaScript SDK for Simple JWT Login is out. Install it with npm:

```
npm install simple-jwt-login
```

or with yarn:

```
yarn add simple-jwt-login
```

The source code is on GitHub: <https://github.com/simple-jwt-login/js-sdk>. Star the repository, read the code, open issues, or share it with others.

With a few lines of code, you can call any Simple JWT Login endpoint. This example registers a user:

```
import { SimpleJwtLogin } from "simple-jwt-login";



const simpleJwtLogin = new SimpleJwtLogin(

  "https://your-domain.com",

  "/simple-jwt-login/v1",

  "AUTH_KEY"

);



// The SDK passes the response to this callback instead of returning it.

simpleJwtLogin.withCallback((response, status) => {

  console.log(status, response);

});



simpleJwtLogin.registerUser(

  {

    email: "me@mydomain.com",

    password: "my-secret-password",

    nickname: "coolnickname",

  },

  "MY_AUTH_KEY"

);
```

The SDK covers every endpoint:

* Autologin to WordPress
* Delete a user
* Register a user
* Reset a user's password
* Change a user's password
* Authenticate to WordPress
* Refresh a token
* Validate a token
* Revoke a token

For a step-by-step walkthrough, see [Using the JavaScript SDK in a React App](/blog/javascript-sdk-usage-react.md).

**Tags:**

* [Release](/blog/tags/tags/release "Plugin Releases")

[Edit this page](https://github.com/simple-jwt-login/website/tree/main/blog/2022-10-25-release-js-sdk.md)
