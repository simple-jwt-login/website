---
slug: /hooks/
title: Hooks
sidebar_position: 97
author: Nicu Micle
author_url: https://github.com/nicumicle
---

This plugin allows advanced users to link some hooks with the plugin and perform some custom scripts.

You are able to enable/disable any of these hooks. 

:::note
By default, no hooks are enabled. You need to check the one that you want to use.
:::

## List Of Hooks

### 1. simple_jwt_login_login_hook
 - **type**: action
 - **parameters**: Wp_User $user
 - **description**: This hook it is called after the user has been logged in.

### 2. simple_jwt_login_redirect_hook
- **type**: action
- **parameters**: string $url, array $request
- **description**: This hook it is called before the user it will be redirected to the page he specified in the login section.

### 3. simple_jwt_login_register_hook
- **type**: action
- **parameters**: Wp_User $user, string $plain_text_password
- **description**: This hook it is called after a new user has been created.

### 4. simple_jwt_login_delete_user_hook
- **type**: action
- **parameters**: Wp_User $user
- **description**: This hook it is called right after the user has been deleted.

### 5. simple_jwt_login_jwt_payload_auth
- **type**: filter
- **parameters**: array $payload, array $request
- **return**: array $payload
- **description**: This hook is called on /auth endpoint. Here you can modify payload parameters.

### 6. simple_jwt_login_no_redirect_message
- **type**: filter
- **parameters**: array $payload, array $request
- **return**: array $payload
- **description**: This hook is called on /autologin endpoint when the option No Redirect is selected. You can customize the message and add parameters.

### 7. simple_jwt_login_reset_password_custom_email_template
- **type**: filter
- **parameters**: string $template, array $request
- **return**: string $template
- **description**: This is executed when POST /user/reset_password is called. It will replace the email template that has been added in Reset Password settings.

### 8. simple_jwt_login_response_auth_user
- **type**: filter
- **parameters**: array $response, WP_User $user
- **return**: array $response
- **description**: This is executed before displaying the response of auth endpoint.

### 9. simple_jwt_login_response_delete_user
- **type**: filter
- **parameters**: array $response, WP_User $user
- **return**: array $response
- **description**: This is executed before displaying the response of delete user endpoint.

### 10. simple_jwt_login_response_refresh_token
- **type**: filter
- **parameters**: array $response, WP_User $user
- **return**: array $response
- **description**: This is executed before displaying the response of refresh token endpoint.

### 11. simple_jwt_login_response_register_user
- **type**: filter
- **parameters**: array $response, WP_User $user
- **return**: array $response
- **description**: This is executed before displaying the response of register user endpoint.

### 12. simple_jwt_login_response_send_reset_password
- **type**: filter
- **parameters**: array $response, WP_User $user
- **return**: array $response
- **description**: This is executed before displaying the response of send reset password endpoint.

### 13. simple_jwt_login_response_change_user_password
- **type**: filter
- **parameters**: array $response, WP_User $user
- **return**: array $response
- **description**: This is executed before displaying the response of change user password endpoint.

### 14. simple_jwt_login_response_revoke_token
- **type**: filter
- **parameters**: array $response, WP_User $user
- **return**: array $response
- **description**: This is executed before displaying the response of revoke token endpoint.

### 15. simple_jwt_login_response_validate_token
- **type**: filter
- **parameters**: array $response, WP_User $user
- **return**: array $response
- **description**: This is executed before displaying the response of validate token endpoint.


### 16. simple_jwt_login_before_endpoint
- **type**: action
- **parameters**: string $method, string $endpoint, array $request
- **description**: This is executed before the simple-jwt-login rest route is initialized. You can use this for all the endpoints. Endpoints can be filtered by request method and endpoint.

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-9.png?raw=true)


## Code Examples

### Send an email after a new user has been created.

```
add_action( 'simple_jwt_login_register_hook', function($user, $password) {
    $to      = $user->user_email;
    $subject = 'Welcome';
    $message = '
               Welcome to My Site. Your new user credentials are: 
               email: ' . $to .'
               password: '. $password;
    wp_mail($to, $subject, $message);
   }, 10, 2);
```

###  Add some custom data in the JWT payload on the `/auth` endpoint 

```
add_filter('simple_jwt_login_no_redirect_message',function($payload, $request){
    $payload['myvalue'] = 'somevalue';

    return $payload;
}, 10, 2);
```

### Dynamic Redirection URLs After Login
In order to achieve this, you need to check the option `Include request parameters used for login link in the REDIRECT URL` from the Login section. After that, in your login URL, add one new parameter `&page=your_page`

```
add_action('simple_jwt_login_redirect_hook', function($url, $request){
       $page = isset($_REQUEST['page'])
           ? $_REQUEST['page']
           : null;
       if($page === null){
            wp_redirect($url);
             return;
       } 
       switch($page){
          case "page1":
              wp_redirect('https://site1.com');
              break;
           case "page2": 
              wp_redirect('https://site2.com');
              break;   
       }
}, 10, 2);
```


### Block requests on /auth for a specific email address

```
add_action('simple_jwt_login_before_endpoint', function($method, $endpoint, $request){
       if ($method !== 'POST' && $endpoint !== 'auth') {
          return;
       }
       
       if( isset($request['email']) && $request['email'] === 'test@domain.com') {
           throw new Exception('Wrong email.');
       }
}, 10, 4);
```

### Set minimum password length on register

```
add_action('simple_jwt_login_before_endpoint', function($method, $endpoint, $request){
       if ($method !== 'POST' && $endpoint !== 'users') {
          return;
       }
       
       $minLength = 8;
       
       if( isset($request['password']) && strlen($request['password']) < $minLength) {
           throw new Exception('Password is too short. Password length is minimum ' . $minLength . ' characters.');
       }
}, 10, 4);
```
