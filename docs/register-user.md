# Register User

## Description[​](#description "Direct link to Description")

The Register User endpoint lets you create new WordPress users programmatically via the REST API. This is useful for headless registration forms, mobile app sign-ups, or any external system that needs to provision WordPress accounts without going through the standard WordPress UI.

Registration is **disabled by default**. Enable it in the plugin settings before use.

At minimum, a POST request with `email` and `password` is all that's needed. Additional profile fields are optional.

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/users`

**URL Example**: `https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/users&email=NEW_USER_EMAIL&password=NEW_USER_PASSWORD`

**PARAMETERS**:

| Parameter               | Type                 | Description                                                                                                                                        |
| ----------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| email                   | `required` `string`  | The user email address.                                                                                                                            |
| password                | `required` `string`  | The plain-text user password.                                                                                                                      |
| user\_login             | `optional` `string`  | The user’s login username.                                                                                                                         |
| user\_nicename          | `optional` `string`  | The URL-friendly username.                                                                                                                         |
| user\_url               | `optional` `string`  | The user URL.                                                                                                                                      |
| display\_name           | `optional` `string`  | The user’s display name. Default is the user’s username.                                                                                           |
| nickname                | `optional` `string`  | The user’s nickname. Default is the user’s username.                                                                                               |
| first\_name             | `optional` `string`  | The user’s first name. For new users, will be used to build the first part of the user’s display name if $display\_name is not specified.          |
| last\_name              | `optional` `string`  | The user’s last name. For new users, will be used to build the second part of the user’s display name if $display\_name is not specified.          |
| description             | `optional` `string`  | The user’s biographical description.                                                                                                               |
| rich\_editing           | `optional` `string`  | Whether to enable the rich-editor for the user. Accepts ‘true’ or ‘false’ as a string literal, not boolean. Default ‘true’.                        |
| syntax\_highlighting    | `optional` `string`  | Whether to enable the rich code editor for the user. Accepts ‘true’ or ‘false’ as a string literal, not boolean. Default ‘true’.                   |
| comment\_shortcuts      | `optional` `string`  | Whether to enable comment moderation keyboard shortcuts for the user. Accepts ‘true’ or ‘false’ as a string literal, not boolean. Default ‘false’. |
| admin\_color            | `optional` `string`  | Admin color scheme for the user. Default ‘fresh’.                                                                                                  |
| use\_ssl                | `optional` `boolean` | Whether the user should always access the admin over https. Default false.                                                                         |
| user\_registered        | `optional` `string`  | Date the user registered. Format is `Year-Month-Date Hours:Minutes:Seconds`.                                                                       |
| user\_activation\_key   | `optional` `string`  | Password reset key. Default empty.                                                                                                                 |
| spam                    | `optional` `boolean` | Multisite only. Whether the user is marked as spam. Default false.                                                                                 |
| show\_admin\_bar\_front | `optional` `string`  | Whether to display the Admin Bar for the user on the site’s front end. Accepts ‘true’ or ‘false’ as a string literal, not boolean. Default ‘true’. |
| locale                  | `optional` `string`  | User’s locale. Default empty.                                                                                                                      |
| user\_meta              | `optional` `string`  | Add user meta on user registration. It should be a JSON string. Example: `{"meta_key":"meta_value","meta_key2":"meta_value"}`                      |

## Request[​](#request "Direct link to Request")

```
{
  "email": "test@simplejwtlogin.com",
  "password": "string",
  "user_login": "myuser",
  "user_nicename": "myuser",
  "user_url": "https://simplejwtlogin.com",
  "display_name": "myuser",
  "nickname": "myuser",
  "first_name": "myuser",
  "last_name": "myuser",
  "description": "This is a sample description",
  "rich_editing": true,
  "syntax_highlighting": true,
  "comment_shortcuts": "false",
  "admin_color": "fresh",
  "use_ssl": true,
  "user_registered": "2022-01-31 23:15:30",
  "user_activation_key": "string",
  "spam": false,
  "show_admin_bar_front": true,
  "locale": ""
}
```

## Responses[​](#responses "Direct link to Responses")

### 200[​](#200 "Direct link to 200")

```
{
  "success": true,
  "id": 1,
  "message": "User was successfully created.",
  "user": {
    "ID": 1,
    "user_login": "myusser",
    "user_nicename": "My  User",
    "user_email": "myuser@simplejwtlogin.com",
    "user_url": "https://simplejwtlogin.com",
    "user_registered": "2021-01-01 23:31:50",
    "user_activation_key": "test",
    "user_status": "0",
    "display_name": "myuser",
    "user_level": 10
  },
  "roles": [
    "administrator"
  ],
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

### 400[​](#400 "Direct link to 400")

```
{
  "success": false,
  "data": {
    "message": "Error message string",
    "errorCode": 0
  }
}
```

## Examples[​](#examples "Direct link to Examples")

### SHELL[​](#shell "Direct link to SHELL")

```
curl -X POST 'https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/users' \
  -H "Content-type: application/json" \
  -d '{"email":"myemail@simplejwtlogin.com", "password":"test"}'
```

### PHP[​](#php "Direct link to PHP")

```
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->registerUser('email@simplejwtlogin.com', 'password', 'AUTH CODE');
```

### JavaScript[​](#javascript "Direct link to JavaScript")

```
var data = JSON.stringify({
    "email": "email@simplejwtlogin.com",
    "password":"my-secret-passwor",
    "AUTH_CODE":"my-auth-code"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        console.log(this.responseText);
    }
});

xhr.open("POST", "https://simplejwtlogin.com" + "/simple-jwt-login/v1/users");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
```

## Screenshot[​](#screenshot "Direct link to Screenshot")

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-4.png?raw=true)

## Features[​](#features "Direct link to Features")

### User roles[​](#user-roles "Direct link to User roles")

You can set the default role assigned to newly registered users (e.g., `subscriber`, `contributor`, `author`, `editor`, or any custom role). You can also assign a different role per **Auth Code** - when a user registers using a specific `AUTH_CODE`, they receive the role tied to that code. This makes it easy to support multiple user types from a single registration endpoint.

### Restrict registration[​](#restrict-registration "Direct link to Restrict registration")

Limit registrations to:

* **Specific IP addresses** - block registrations from untrusted origins
* **Specific email domains** - e.g., only allow `@yourcompany.com` addresses

### Random password generation[​](#random-password-generation "Direct link to Random password generation")

Enable “Generate a random password” to allow registration without a `password` field. The plugin generates a secure random password automatically. Password length is configurable between **6** and **255** characters.

### Auto-login after registration[​](#auto-login-after-registration "Direct link to Auto-login after registration")

Enable “Initialize force login after register” to automatically log the new user in immediately after their account is created, following the same redirect flow configured in the Autologin settings.

note

This option has no effect if the Autologin feature is disabled. In that case, the endpoint simply returns the new user's data as a JSON response.

### Custom user meta[​](#custom-user-meta "Direct link to Custom user meta")

Pass any number of custom metadata fields during registration by including a `user_meta` JSON parameter. Each key-value pair will be saved as WordPress user meta.

Example:

```
{
  “email”: “user@example.com”,
  “password”: “secret”,
  “user_meta”: “{\”plan\”:\”premium\”,\”referral_source\”:\”landing_page\”}”
}
```

***

## FAQ[​](#faq "Direct link to FAQ")

### How do I configure the Register User endpoint?[​](#how-do-i-configure-the-register-user-endpoint "Direct link to How do I configure the Register User endpoint?")

1. Go to **Settings → Simple JWT Login** in your WordPress admin.
2. Open the **Register Settings** tab.
3. Enable registration and configure the desired role, restrictions, and options.
4. Save your settings, then send a `POST` request to the endpoint.
