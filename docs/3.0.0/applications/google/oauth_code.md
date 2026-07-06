# Exchange OAuth Code with Google ID Token

## Overview[​](#overview "Direct link to Overview")

The Exchange OAuth Code with Google ID Token route in Simple JWT Login enables the exchange of the OAuth code obtained during the OAuth flow with a Google ID Token. This process facilitates secure user authentication and authorization with Google services. Below are the parameters and details required for this operation.

This can be used when the OAuth process is happening in a different APP, and you need to obtain the `access_token` or the `id_token`.

note

For this, it is important to use the same `redirect_uri` in WordPress as the one that has been used in the OAuth flow.

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/oauth/token`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/oauth/token&provider=google&code={{code}}`

| Parameter | Type                | Description                                                                                          |
| --------- | ------------------- | ---------------------------------------------------------------------------------------------------- |
| provider  | `required` `string` | Specifies the identity provider. Set this parameter to 'google'.                                     |
| code      | `required` `string` | The OAuth code obtained from the OAuth flow. This code is used to authenticate the user with Google. |

## Request Example[​](#request-example "Direct link to Request Example")

### SHELL[​](#shell "Direct link to SHELL")

```
curl -X POST 'https://simplejwtlogin.com/?rest_route=simple-jwt-login/v1/oauth/token&code=my-code'
```

## Response Example[​](#response-example "Direct link to Response Example")

### Success[​](#success "Direct link to Success")

```
{
  "success": true,
  "data": {
    "access_token": "access token from google",
    "expires_in": 3599,
    "scope": "openid https://www.googleapis.com/auth/userinfo.email",
    "token_type": "Bearer",
    "id_token": "id token from google"
  }
}
```

### Error[​](#error "Direct link to Error")

```
{
  "success": false,
  "data": {
    "message": "The code you provided is invalid.Bad Request.Invalid_grant",
    "errorCode": 72
  }
}
```

```
{
  "success": false,
  "data": {
    "message": "The code you provided is invalid.Bad Request.Redirect_uri_mismatch",
    "errorCode": 72
  }
}
```

Security Considerations

Always ensure secure communication with the API endpoint using HTTPS.

Protect the confidentiality of the OAuth code during the exchange process.
