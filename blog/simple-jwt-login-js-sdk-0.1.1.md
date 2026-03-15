# Release JavaScript SDK

October 25, 2022 ·

<!-- -->

One min read

[![Nicu Micle](https://github.com/nicumicle.png)](/blog/authors/nicumicle.md)

[Nicu Micle](/blog/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

Finally, the JavaScript SDK for Simple JWT Login has been released. You can now use it in your projects:

```
npm install "simple-jwt-login"
```

or if you prefer yarn:

```
yarn add "simple-jwt-login"
```

You can find the package code on github: <https://github.com/simple-jwt-login/js-sdk>.

Feel free to star the repository, check the code, create issues or even share it on social media.

Now, with just a few lines of code, you are able to call Simple-JWT-Login endpoints.

Here is a simple register example using the JS SDK:

```
import { SimpleJwtLogin } from "simple-jwt-login";

const simpleJwtLogin = new SimpleJwtLogin(
  "http://your-domain.com",
  "/simple-jwt-login/v1",
  "AUTH_KEY"
);
let params = {
  email: "me@mydomain.com",
  password: "my-secret-password",
  nickname: "coolnickname",
};

let result = simpleJwtLogin.registerUser(params, "MY_AUTH_KEY");
```

And voilà. A new user is registered.

With this SDK, with just a few lines of code, you can:

* Autologin to WordPress
* Delete a user
* Register a user
* Reset user password
* Change user password
* Authenticate into WordPress
* Refresh a token
* Validate a token
* Revoke a token

**Tags:**

* [Release](/blog/tags/tags/release.md "Plugin Releases")

[Edit this page](https://github.com/simple-jwt-login/website/tree/main/blog/2022-10-25-release-js-sdk.md)
