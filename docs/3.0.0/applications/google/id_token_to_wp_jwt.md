# Exchange id\_token with a WordPress JWT

## Overview[​](#overview "Direct link to Overview")

The Exchange OAuth Code with Google ID Token route in Simple JWT Login enables the exchange of the OAuth code obtained during the OAuth flow with a Google ID Token. This process facilitates secure user authentication and authorization with Google services. Below are the parameters and details required for this operation.

This can be used when the OAuth process is happening in a different APP, and you need to obtain the `access_token` or the `id_token`.

note

To ensure a smooth process, it's crucial to use the identical `redirect_uri` in WordPress as the one utilized in the OAuth flow.

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/oauth/token`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/oauth/token&provider=google&code={{code}}`

| Parameter | Type                | Description                                                      |
| --------- | ------------------- | ---------------------------------------------------------------- |
| provider  | `required` `string` | Specifies the identity provider. Set this parameter to 'google'. |
| id\_token | `required` `string` | The OAuth `id_token` obtained from the OAuth flow.               |

## Request Example[​](#request-example "Direct link to Request Example")

### SHELL[​](#shell "Direct link to SHELL")

```
curl -X POST 'https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/oauth/token&provider=google&id_token={{id_token}}'
```

## Example Response[​](#example-response "Direct link to Example Response")

### Success[​](#success "Direct link to Success")

```
{
  "success": true,
  "data" : {
    "jwt": "simplejwtlogin jwt here"
  }
}
```

### Error[​](#error "Direct link to Error")

```
{
  "success": false,
  "data": {
    "message": "The code or jwt parameter is missing from request.",
    "errorCode": 71
  }
}
```
