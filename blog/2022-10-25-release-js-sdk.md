---
title: Release JavaScript SDK
description: The Javascript SDK 0.1.0 has been released
slug: /simple-jwt-login-js-sdk-0.1.1/
hide_table_of_contents: false
authors: nicumicle
tags: [release]
---

Finally, the JavaScript SDK for Simple JWT Login has been released.
You can now use it in your projects:

```bash
npm install "simple-jwt-login"
```

or if you prefer yarn: 
```bash
yarn add "simple-jwt-login"
```
<!--truncate-->

You can find the package code on github: [https://github.com/simple-jwt-login/js-sdk](https://github.com/simple-jwt-login/js-sdk).

Feel free to star the repository, check the code, create issues or even share it on social media.


Now, with just a few lines of code, you are able to call Simple-JWT-Login endpoints.

Here is a simple register example using the JS SDK:

```js
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
- Autologin to WordPress
- Delete a user
- Register a user
- Reset user password
- Change user password
- Authenticate into WordPress
- Refresh a token
- Validate a token
- Revoke a token



