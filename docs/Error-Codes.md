---
slug: /error-codes/
title: Error codes
sidebar_position: 99
author: Nicu Micle
author_url: https://github.com/nicumicle
---

The Simple-JWT-Login plugin assigns a unique error code to each issue. This table will help you quickly identify your problem.

| Error Code |                         Message                         | Description                                                                                                                                      |
|:----------:|:-------------------------------------------------------:|--------------------------------------------------------------------------------------------------------------------------------------------------|
|     1      |                  Key may not be empty                   | JWT is missing from request                                                                                                                      |
|     2      |                Wrong number of segments                 | The JWT contains 3 parts, separated by dots(Header, Payload, Signature). So, your JWT does not have 2 dots in it.                                |
|     3      |                 Invalid header encoding                 | The encoding of the first part of the JWT, is invalid. This means, that the first part of your JWT is incorrect.                                 |
|     4      |                 Invalid claims encoding                 | The second part of your JWT is invalid.                                                                                                          |
|     5      |               Invalid signature encoding                | The signature that you provided in "JWT Decryption key" is invalid.                                                                              |
|     6      |                     Empty algorithm                     | This means, that your JWT has no algorithm specified.                                                                                            |
|     7      |                 Algorithm not supported                 | The algorithm present in your JWT, is not supported by this plugin.                                                                              |
|     8      |                  Algorithm not allowed                  | The provided algorithm is not allowed by this plugin.                                                                                            |
|     9      |       'kid' invalid, unable to lookup correct key       | Your JWT is malformed.                                                                                                                           |
|     10     |       'kid' invalid, unable to lookup correct key       | Your JWT is malformed.                                                                                                                           |
|     11     |              Signature verification failed              | Invalid "JWT Decryption key" provided in config.                                                                                                 |
|     12     |            Cannot handle token prior to ...             | Check that this token has been created before 'now'. Timestamp verified from 'nbf'.                                                              |
|     13     |            Cannot handle token prior to ...             | Check that this token has been created before 'now'. This prevents. Timestamp verified from 'iat'.                                               |
|     14     |                      Expired token                      | JWT is expired.                                                                                                                                  |
|     15     |                 Algorithm not supported                 | Algorithm not supported when JWT was signed.                                                                                                     |
|     16     |               OpenSSL unable to sign data               | Error while JWT is signed with OpenSSL.                                                                                                          | 
|     17     |                Unsupported sign function                | Invalid Algorithm provided for JWT when signing                                                                                                  |
|     18     |                 Algorithm not supported                 | Invalid Algorithm while trying to verify the JWT                                                                                                 |
|     19     |                      OpenSSL error                      | This is a generic OpenSSL error.                                                                                                                 |
|     20     |             Null result with non-null input             | Decoded JWT is null.                                                                                                                             |
|     21     |             Null result with non-null input             | Encoded JWT is null                                                                                                                              | 
|     22     |                   Unknown JSON error                    | This is a generic error by JWT. More details are provided in the message.                                                                        |
|     23     |                     Wrong Request.                      | JWT is missing in the auto-login process.                                                                                                        |
|     24     |                     User not found.                     | This error occurs when the user is not found. For login and delete endpoint: there is no user in WordPress with the email or ID provided in JWT. |
|     26     |       Auto-login is not enabled on this website.        | You have to enable auto-login from plugin settings.                                                                                              | 
|     27     |               Invalid Auth Code provided.               | The Auth code provided is invalid or missing. You should use one that you have saved in your plugin settings                                     |
|     28     |          This IP is not allowed to auto-login.          | You can not auto-login from this IP. Some IP's are specified in plugin settings that can auto-login into WordPress                               | 
|     29     |             Unable to find property in JWT.             | The user sub-key property can not be found in JWT                                                                                                | 
|     30     |             Unable to find property in JWT.             | The user key property can not be found in JWT                                                                                                    |
|     31     |                Register is not allowed.                 | Register is disabled from settings                                                                                                               |
|     32     |                    Invalid Auth Code                    | Invalid auth code provided on register endpoint. You can use auth codes that are generated in your plugin settings.                              | 
|     33     |        This IP is not allowed to register users.        | You can not register users from this IP. The allowed IPs are saved in plugin settings                                                            | 
|     35     |               Missing email or password.                | Missing email or password from your register new user request                                                                                    | 
|     36     |                 Invalid email address.                  | The value provided for email is not a valid email.                                                                                               | 
|     37     |   This website does not allow users from this domain.   | The email domain is not allowed to register to this WordPress. The allowed domains are saved in plugin settings.                                 | 
|     38     |                  User already exists.                   | The user that you are trying to create already exists. Try a different email address.                                                            |
|     39     |                 Delete is not enabled.                  | The plugin delete endpoint is not enabled for this website. This can be enabled from plugin settings.                                            |
|     40     |                    Missing AUTH KEY                     | Missing Auth Key from Delete. You can find your generated auth keys in plugin settings.                                                          | 
|     41     |    You are not allowed to delete users from this IP     | You can not delete users only from the IPs that are set in plugin settings.                                                                      | 
|     42     |             The 'jwt' parameter is missing.             | The JWT parameter is missing from the request.                                                                                                   | 
|     43     |             Invalid method for this route.              | The route that you are calling does not exist.                                                                                                   | 
|     44     |                   Invalid route name.                   | Route name is invalid.                                                                                                                           | 
|     45     |             Authentication is not enabled.              | Authentication enabled is set to "No" in the plugin settings.                                                                                    |
|     46     |              Authentication missing email.              | Your request does not contain the email address.                                                                                                 | 
|     47     |            Authentication missing password.             | Password is missing from the request.                                                                                                            |
|     48     |            Authentication wrong credentials             | Email or password is incorrect.                                                                                                                  |
|     49     |               JWT payload is not correct.               | Check your JWT payload. After decoding it, it resulted null. it should be an JSON.                                                               |
|     50     |             JWT is too old to be refreshed.             | The JWT generated time is too old. You can not refresh this token.                                                                               |  
|     51     |            JWT is missing from /auth/refresh            | The JWT parameter was not sent to the /auth/refresh endpoint.                                                                                    | 
|     52     |                 Unable to create user.                  | There was an error while trying to create the user.                                                                                              |  
|     53     |             The `jwt` parameter is missing.             | The JWT is missing from reset password, revoke token or validate user                                                                            |  
|     54     |                WordPress user not found                 | Unable to find a valid user in the provided JWT.                                                                                                 |  
|     55     |                  This JWT is invalid.                   | The JWT has been revoked. It can not be used anymore.                                                                                            |  
|     56     |             Reset Password is not allowed.              | The Reset Password endpoint is disabled.                                                                                                         |  
|     57     |        Route called with invalid request method.        | The Reset Password endpoint is called with an invalid HTTP method. Only PUT and POST are allowed.                                                |  
|     58     |           Invalid Auth Code ( %s ) provided.            | The Reset Password endpoint is called with an invalid AUTH CODE.                                                                                 |  
|     59     |                Missing email parameter.                 | Missing or empty `email` parameter when calling the Reset Password endpoint.                                                                     |  
|     60     |                 Missing code parameter.                 | Missing `code` parameter when calling change user password endpoint.                                                                             |  
|     61     |             Missing new_password parameter.             | Missing `new_password` when calling the change user password endpoint                                                                            |  
|     62     |                 Invalid code provided.                  | The `code` and `user_email` does not match when calling the Reset Password endpoint.                                                             |  
|     63     |                Missing email parameter.                 | Missing `email` parameter when calling the Send reset password endpoint.                                                                         |  
|     64     |                       Wrong user.                       | User was not found while calling the Send reset password endpoint.                                                                               |  
|     65     |                   Invalid flow type.                    | Invalid plugin settings for Reset password flow.                                                                                                 |  
|     66     |  You need to add the \{\{CODE\}\} variable in email body.   | The `{{CODE}}` parameter is missing from Reset Password email body.                                                                              |  
|     67     |    Something is wrong. We can not save the settings.    | Something is wrong with the plugin configuration. The `_wpnonce` field is missing or it is invalid.                                              |  
|     68     |   'The JWT issuer(iss) is not allowed to auto-login.    | The JWT is issued by an authorized issuer.                                                                                                       |  
|     69     |             The Oauth provider is invalid.              | Invalid `provider` parameter provided.                                                                                                           |  
|     70     |          This Oauth provider is not available.          | OAuth provided is not enabled or unavailable.                                                                                                    |  
|     71     | The code or id_token parameter is missing from request. | The code or `id_token` parameter is missing from request when connecting with Google OAuth.                                                      |  
|     72     |            The code you provided is invalid.            | The Google OAuth endpoint has received an invalid `code`.                                                                                        |  
|     73     |            The provided id_token is invalid             | The Google OAuth endpoint has received an invalid `id_token`.                                                                                    |  
|     74     |                 Wrong user credentials.                 | The Google OAuth could not find a user in the provided JWT.                                                                                      |  
 