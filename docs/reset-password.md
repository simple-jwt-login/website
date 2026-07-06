# Reset password

Simple JWT Login exposes a two-step password reset flow entirely through the REST API. Step 1 requests a reset code and delivers it by email; Step 2 applies the new password using that code. Both steps share the same endpoint URL with different HTTP methods.

***

## Step 1 - Request Reset Code[​](#step-1---request-reset-code "Direct link to Step 1 - Request Reset Code")

Send the user's email address to trigger the reset flow. The plugin generates a one-time code and delivers it according to the configured Reset Flow option.

API Reference

Explore and test this step using the [interactive API reference →](/api/v4/send-reset-password-code.md)

### Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD**: `POST`

**ENDPOINT**: `/simple-jwt-login/v1/user/reset_password`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/user/reset_password&email={{email}}&AUTH_KEY={{AUTH_KEY_VALUE}}`

**PARAMETERS**:

| Parameter  | Type                | Description                                                                                                                                                                    |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `email`    | `required` `string` | The email address for which the password reset is requested.                                                                                                                   |
| `AUTH_KEY` | `optional` `string` | Auth Code value. Required only if "Require Authentication Code" is enabled. The parameter name matches the **Auth Code URL Key** in Auth Codes settings (default: `AUTH_KEY`). |

### Request[​](#request "Direct link to Request")

```
{
  "email": "test@simplejwtlogin.com"
}
```

With optional Auth Code:

```
{
  "email": "test@simplejwtlogin.com",
  "AUTH_KEY": "MY_SECRET_AUTH_KEY"
}
```

### Responses[​](#responses "Direct link to Responses")

#### 200[​](#200 "Direct link to 200")

```
{
  "success": true,
  "message": "Reset password email has been sent."
}
```

#### 400[​](#400 "Direct link to 400")

Bad request - the `email` field is missing.

```
{
  "success": false,
  "data": {
    "message": "Email is required.",
    "errorCode": 59
  }
}
```

#### 401[​](#401 "Direct link to 401")

Unauthorized - the provided auth code is invalid or missing when required.

```
{
  "success": false,
  "data": {
    "message": "Invalid auth code.",
    "errorCode": 58
  }
}
```

#### 403[​](#403 "Direct link to 403")

Forbidden - password reset is disabled in plugin settings.

```
{
  "success": false,
  "data": {
    "message": "Reset password is not allowed.",
    "errorCode": 56
  }
}
```

#### 404[​](#404 "Direct link to 404")

No WordPress user with the provided email address was found.

```
{
  "success": false,
  "data": {
    "message": "User not found.",
    "errorCode": 64
  }
}
```

#### 500[​](#500 "Direct link to 500")

Internal server error (e.g. email sending failure).

```
{
  "success": false,
  "data": {
    "message": "An unexpected error occurred.",
    "errorCode": 22
  }
}
```

### Examples[​](#examples "Direct link to Examples")

#### SHELL[​](#shell "Direct link to SHELL")

```
curl -X POST https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/user/reset_password \
  -H "Content-type: application/json" \
  -d '{"email":"test@simplejwtlogin.com"}'
```

#### PHP[​](#php "Direct link to PHP")

```
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->resetPassword('email@simplejwtlogin.com', 'AUTH CODE');
```

#### JavaScript[​](#javascript "Direct link to JavaScript")

```
fetch('https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/user/reset_password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@simplejwtlogin.com' })
}).then(r => r.json()).then(console.log);
```

### Error responses[​](#error-responses "Direct link to Error responses")

| Code | Meaning                                                            |
| ---- | ------------------------------------------------------------------ |
| `56` | Password reset is not enabled in plugin settings.                  |
| `58` | Invalid Auth Code provided.                                        |
| `59` | Email address is missing from the request.                         |
| `64` | No WordPress user found with the provided email address.           |
| `65` | Invalid flow type configured in plugin settings.                   |
| `66` | The `{{CODE}}` variable is missing from the custom email template. |

***

## Step 2 - Set New Password[​](#step-2---set-new-password "Direct link to Step 2 - Set New Password")

Submit the reset code from Step 1 along with the new password. Alternatively, if **"Allow Reset password with JWT"** is enabled in settings, a valid JWT can be used instead of the code.

API Reference

Explore and test this step using the [interactive API reference →](/api/v4/change-user-password.md)

### Endpoint[​](#endpoint-1 "Direct link to Endpoint")

**METHOD**: `PUT`

**ENDPOINT**: `/simple-jwt-login/v1/user/reset_password`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/user/reset_password&email={{email}}&code={{code}}&new_password={{new_password}}`

**PARAMETERS**:

| Parameter      | Type                | Description                                                                                                                 |
| -------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `email`        | `required` `string` | The email address of the account being reset.                                                                               |
| `code`         | `required` `string` | The reset code received by email. Not required when a valid JWT is provided and "Allow Reset password with JWT" is enabled. |
| `new_password` | `required` `string` | The new password to set for the account.                                                                                    |
| `AUTH_KEY`     | `optional` `string` | Auth Code value. Required only if "Require Authentication Code" is enabled.                                                 |
| `JWT`          | `optional` `string` | Valid JWT identifying the user. When provided and JWT-based reset is enabled, the `code` parameter is not required.         |

### Request[​](#request-1 "Direct link to Request")

```
{
  "email": "test@simplejwtlogin.com",
  "code": "MY_CODE",
  "new_password": "YOUR_SECRET_PASSWORD"
}
```

Using a JWT instead of a reset code:

```
{
  "email": "test@simplejwtlogin.com",
  "JWT": "YOUR_JWT_HERE",
  "new_password": "YOUR_SECRET_PASSWORD"
}
```

### Responses[​](#responses-1 "Direct link to Responses")

#### 200[​](#200-1 "Direct link to 200")

```
{
  "success": true,
  "message": "User password has been changed."
}
```

#### 400[​](#400-1 "Direct link to 400")

Bad request - `email`, `code`, or `new_password` is missing.

```
{
  "success": false,
  "data": {
    "message": "New password is required.",
    "errorCode": 61
  }
}
```

#### 401[​](#401-1 "Direct link to 401")

Unauthorized - the JWT is invalid or expired, or was already used for a password reset.

```
{
  "success": false,
  "data": {
    "message": "This JWT cannot be used to change the password.",
    "errorCode": 93
  }
}
```

#### 403[​](#403-1 "Direct link to 403")

Forbidden - password reset is disabled in plugin settings.

```
{
  "success": false,
  "data": {
    "message": "Reset password is not allowed.",
    "errorCode": 56
  }
}
```

#### 404[​](#404-1 "Direct link to 404")

No WordPress user with the provided email address was found.

```
{
  "success": false,
  "data": {
    "message": "User not found.",
    "errorCode": 64
  }
}
```

#### 422[​](#422 "Direct link to 422")

Unprocessable entity - the one-time reset code is invalid or expired.

```
{
  "success": false,
  "data": {
    "message": "Invalid reset password code.",
    "errorCode": 62
  }
}
```

#### 500[​](#500-1 "Direct link to 500")

Internal server error.

```
{
  "success": false,
  "data": {
    "message": "An unexpected error occurred.",
    "errorCode": 22
  }
}
```

### Examples[​](#examples-1 "Direct link to Examples")

#### SHELL[​](#shell-1 "Direct link to SHELL")

```
curl -X PUT https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/user/reset_password \
  -H "Content-type: application/json" \
  -d '{"email":"test@simplejwtlogin.com","code":"123","new_password":"test"}'
```

#### PHP[​](#php-1 "Direct link to PHP")

```
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->changePassword('email@simplejwtlogin.com', 'new password', 'code', null, 'AUTH CODE');
```

#### JavaScript[​](#javascript-1 "Direct link to JavaScript")

```
fetch('https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/user/reset_password', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@simplejwtlogin.com',
    code: '123',
    new_password: 'test'
  })
}).then(r => r.json()).then(console.log);
```

### Error responses[​](#error-responses-1 "Direct link to Error responses")

| Code | Meaning                                                        |
| ---- | -------------------------------------------------------------- |
| `56` | Password reset is not enabled in plugin settings.              |
| `60` | The reset code is missing from the request.                    |
| `61` | The new password is missing from the request.                  |
| `62` | The reset code is invalid or does not match the email address. |
| `63` | Email address is missing from the request.                     |
| `64` | No WordPress user found with the provided email address.       |
| `93` | The provided JWT cannot be used to change the password.        |

JWT decoding errors (`1`-`22`) may also appear when a JWT is supplied and cannot be parsed or its signature is invalid.

***

## Settings[​](#settings "Direct link to Settings")

Configure under **Settings → Simple JWT Login → Reset Password**.

### Password Reset[​](#password-reset "Direct link to Password Reset")

![Password Reset settings](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABX0AAAB0CAMAAADuBmGdAAADAFBMVEX4+fp2foaqr7WTmqAdIycmNUT3+Pn////i5OdsdX14gIdQV168wMRxeoLg4+XM0NO1u7/e4eOZoKaLkpj09veXnaTs7u9/h4++wsb29/h+ho16gon29veJkJbk5ejl5ul7g4qTm6Ds7vDq6+2epKlyeoLZ3N90fIS6v8KQmJ7x8vRud3+FjJOPlpza3eB1foXm6OqorbPQ09bU1tmmrLHBxMitsrfi5ObX2t2Vm6Jtdn7Q09bFys1ucnR9hYzt7/CcoqiCipHn6etweYGxtruhqK2us7i/w8d2f4d5gYjDxsrz9PXw8fLV2NuHj5bHy8+NlJpweICKkZfv8PGjqq9KT1IlNEMnNkWaoKbO0tSwtbqiqa6Ei5IkKi6MkJLIzNDy8/QxQE7r7e7o6uyGjpTEyMu9wcWOlZvd3+KBiZDk5uc+Q0fc3uCRmJ74+Pnb3uGfpapveICZn6Xu7/HZ3N60ub3o6erGy86wtLlfanWgpqu0tri3vMBXXGHT1djm5uizuLw8SleMk5kpLjKRmaB1en2LjY9scHLBxclye4N8hIvt7e7Jy8w7QERKV2P8/P3p6uq5vsLLztAhJyuXnaPW2Np8f4MqOUhESUzR0tMxNjp5foLW2dygp6zJzdCho6XZ2tu9vr5hZmnw8fO6vL4uPEt/goVVWl3DxcdeXl4zMzPR1NdrcXdmcXuyuLyssbbe4OKBhYf6+vpRVVhBRkmGjZRna26kqq/BwsTi5ealq7Glp6laX2JTWFtkaGwzOTy+wcZSXmqeo6lXYm5PW2eanZ8kJCTg4uSQk5W/wMI1Oz6FiY9OU1ZfY2f09PW4vcFvc3eEh4pdYWVGS06vr69iYmIuNDdobnVIVGGrra5qdH6nqazY296prK+eoKKUl5mXm5w4PkGGiYydnZ2ampqQkJCysrL+/v5aZXCOkZSmrbE3RVNeaXRCT1wrMDRmZmZTWWCws7RxdnhcZ3Pg4eK/v78gICBbYWhbZnJyd3m4vsGWmZskM0JgZGhRWmRNVFuQ6InGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAUsUlEQVR42u2dCVxU5d7H/8CZOQ6yyY6EoCMRsimgIh8BUcQFFxQNcUFFyVRyzSUTtVCM0kxcMM3SyKVs0TSzcsnUNF+j0pu35Za37d7221vv3d77+vm8z3PO85w5B/GWpXNLfl8/DjNnnu38z3++PPOcMwOpAAAA3A/xmwZndAsAAABuIdrZIOybU08AAADcRv1szb45DQgFAAC4k4LZzL4NmPkCAIC7Z78NpDqnIQ4AAOBepjlJjUYYAADA3UST2gJRAAAAd9MC9gUAANgXAABgXwAAALAvAADAvgAAAGBfAACAfQEAAMC+AAAA+wIAAIB9AQCg2dn3v5UxCDsAAPa9UvsOVxSl6sypcb/cvneylsZsWF777wo/qqzHMQIANC/7liyrfDO8KfseqZyqKHuuin33MpdvgH0BALCvi4rvWv6+ZcvuTdg3i+h7ZSP98bwy5tyeMqIPK79VVr5EBdvPjFHOrKAjymO0nUnzMeW8nQ5Unt94cAXRciVr/8Zl9Nrwqh2lJvtuoVOKEkG08+D5jYdvZ50u36eseX0u2R85U7VyfSidY9Nj1hUAADQf+37R8iZa9N2yJu074AybsW4fvn3ZaWUZlSgflZYuW08nlB2lpYffpyzlLVboHH2sLGcGVva/rqzpz+y7Zt+mC4vGKHvfrDLb175cOUOsWNWyN5UjobRfySqtPrSF1V25/aBylj7cp+wtvYCjBABoRvZ9syWbk+7/rsl1X8ZL9AB78L5ymlYoK1+rHUd0QXn0wLoIvm1vR2WfMmUvK3OILxwsVw6z/0ecRG/xZYYvzOu+inJoHbFiHxOdVf5IryvVO3cTdVjD5s8NVUotVh4AAM3Ovr9vKW8uXfe9uKecTVgPT+X2JFrGz8OdoAmH2M+PXqMpivIB+/fSGmU3fcSMyiay5/jKAze6cpHoA/O670ZlzByilbrR36Taj9iPMxVbFKl42BcAAPua1n0ZZWOU9Vu/4PaluTtLFSWHrdpuXa7sJdqgbNgYcWQDn+fuUP5JdFGb+/I1jI+VqXwCbFp5aDisrBxHlUrWgQMHth4gCk69c7jyVsMa5V9sw51b6LCyCccIANCM7Nt5fWXLTZs2sZv5l7HvXEU59RKbtNKKg6Wl3ytrOpzIKi2tVHYQO+XGdLtf4d40rfty+y5aoyyvtqz70u41bHr8mlK1p7T69Af0z+2lpSuVaqpWVlaXbh+zm7V1uvQDHCUAQLOx73+1lDx5GfvSI2OU4W8x++4+uEZRpt7JrmdgawU7dmlWPUEfKsqdrNDOym83HqwlYV9eZrhl7svXLTbmUPnBI1V7z9bSCabzNd9PIPv7e6tO79hfRlvYhrM4SgCAZmXfJ2+NbMK+AAAArq19Z9FjsC8AALjdvn9v9yTsCwAAbrdvJS2DfQEAwP323fR32BcAANxq3x7GNQ+JiBEAAODb1QEAAPYFAADgdvu2D6DObX/Tu97J88rKR/tessnPw11D6+zljp6a2MXL4t3qCrq590aeMJfBP8p13yfkyvfBXP+nEXjTrzC/AOz74xTGBV8F+0be+DMH7Ou2V0ejIRblWR72CGjSvqGOnhmxdqIF2s0Mh065/uR8Rwa7Hexw9Lo7jdo5ev70oU0vN+6GW0RcEHvbj+5puNdPDEKjXfy3bV2RfRdO+HH7akf2F9g33OunHEytFOwLfpv27ejoO69Z2rcRl7dvRC/2RfFhrfkNd6ZHqvFktvcobt/WFOo5c8IV2feyLu3vnem8avb9Cfw8++oJA/sC8Ivsm1fo6eWyb1pir8IpFM0meptTmJEW8hIDw9jN6FRK9qpxsCLTg3wnMhN5e94dZp+f64hN42VC2ITwJlFbfzGzp6n7ZN+27ZjUomIn9fCkvN5sNuaIoIhnYlLSI0RzHqyi9rpP7VaT+7J4uzqpW1DiH4xNesGc9v0c/er5GMPYK9p7uuwscEZSWKuuUbFeo/RXh/Y4NDAluw9R96CEBPaNl/ow9CGy712LZf3NnlnG35b7DPUNWqdVu4k9G+LnER4Zyf/8khi4bl9KmkM5/fIDKMcxwWLfgUNq+fsGZl+izBJpX9F34IKkxKVMpGJocp8KNqfE5OkrD95dCsOej2jFOjZJP2l+VIBcBuk0aZYYiQi0HjlXjXYjUhzt5UGTPZkGz3dRxIAaRcPPw7MwLJxcbXnnT64ZFREct1sLjl5Bb8i7z+RInxcGxQaOo64LvGPSC8wrD2KLaI7qZ/kmBuj21I6sz9pRNYkZRlB8kkKG8occ/lsmvUujrHLV10cmwsWxFJQHUy8VOD/Jl8da9KLtjhZcWdyUNlpk0ye1DjfyS88sPcSmzO8Z75vrf2l+AXD17JsdfjKzTNq3TS+fnE4x4yimgk32/Ciywmzf2/Jn2wdSB49b2o3t246844MpI2a6fUIbYy4ia2vZz55+qF9JaH4QBbce1u6WBJd984KSo9vOF80Zc995qQPGxt2q29eRRmkpOXKTXnBO22i6sWBxnN15rzdF19hlZ4GRE/QeZgr7sseU1LtjRlga9SopKEiWwzCmSzPyWRfxmpoWVrSb4x3smvsmDOs5NrbMqCHsO9KL5vVIZTfZZLHvgh4Rfcfq9k1N6CntK/oO7NeTnvnSGJrcp80Tp2TErNbtmxQcPKnWOsfr6WhzU5iwr2MkyZGIQIvIyRoRUd1a0DoZdtmTafB8F/UYcCzR8HPkU5l3mWnuO3l6q7D51JtFcbW+TTbkfZvfrrhJi1o850M39s95KPF/zfYVW2Rz7Yd2XBRpnvvODC/rkmgExcexi1ITLfa1ZpWpvjYyES6OtaB17pud2tHrS6MXbXf04IrirrSRkXVGLpL5pWeWCLGR+cFhC0LLh1Rckl8AXDX7Dkyop9ELpX2XxBPZY/yZinLCPH34RMBk37abc/jraSm7WXsPeTMJJXuk2k3vBGVtLfvZ0yPYTMvuEZ3hweYg8S779mVTwN3ZojnLysMrC3X7DmU3QfPkJr1gQFRXrd3keb2j/Ji8ZGeBXYhkD5p92WO/GmbU1e3tsbeweZochvGC3cX2p7C/cUrq3uku+zpY+ahUo4aw76JY+zCf+hr7sFcs9i2ILaH0ttq6r2PmQrnuK/rWxrFrqDE0sU/2IWzm12eibl/2BXL5z1jtmzeIZmdWCPsWGGMXgRaRkzWSY7XfdCISsifT4NkuihgwrNHwy2QPglJN9h3M9mQyPRRjp0H6n/+TDfFD2ZbtTcACbXPnbo3PurEtojn7EBbMJWb7svsFjgIZFB8m84jMYLN9LVllrs9HJsPFsaaf1b7s0JcMNUKv7Y4eXCNbZdoYke0ySuaXnlkixEbmZ/DGenS6JL8AuGr2XbCWaM5oad/0YXzydgv16TZ2c8mI/nqySvv6JaVE3kOdtNNOI/V1wmcSE7xCDfvK2nIZcaJWNO1hPtkZZti3Xj9xJZoz7LvothSHo4tuX74A3e0NuUkvWD8ruybdzt4SPl/u+fKMAKMzvuYne5Dnv/21HibRvKCExGQ5DOMFa+9b4exVT/rKQy+HI9Vl3xTeZnejhrBvQUJF7kmaWJHb2WLf8pQIuj2zSF95IGlf2TcfB4ucHJrYpyIHC9fAfrp9WYhYTCz2zWbzPK901wUYciRaoGXkZI3aXO2HiITsyTR4vot6DLR3F+ZoaK2zXXXZlxWaHsdGkNYmVve1bIiPk+8NW8PtGJjtcASZ7Su2iOaKHAOYw832Xat5VgZFWwYWC9vCvpasMtfnI5Ph0uJhST+rfVdrsZa9yPxjwZXFjbTRf0Gymze6yfwSmaXnspH5D/Pg5o24JL8AuFr2LYjV0tNPzn15Lmf7U4vY58vrIxfoyZrM33Dfy50zLjyzXUAPy1maW4N0V8Twua+oLZ/20tfgMjzYpMLLkwJmEC1mc9+ZbUTnvLkp0r7e4dH2GcK+PPFzu7s28YLMmqn9HqbwbrnOkh7sFJjsjL86ZA/Svskxcv/Kho2Ww9CGqPGl5xuzNDW9EJdWRq1TrWfdmJJkDWFfCspnWv4y39HGYt8kLXRvNLKv7FvYVw5N7JN9JhvEPRPN9u1jsu9DWpN9Iwz7ukbCAy0iJ2sk12iaFJGQPZkGr0/veQwuiYbcVaN374eZZdjv2bzN+frs0WjIZN8Rvf2C+1vsK7aI5uwzW/F3KdozU4yzbplOGRSzfWM7sqB3sWaVuT4fmQyXK19k+smD2cfLFWvXYTeCK4sbaaPPfZnTh/V25ZeWWXqIjczP4KsU7Ttdkl8AXC37lnvwt4HxnYR9F/u2orEx7DXdL24CDYrTk7VoSDTdw2aIqcF045ABE/oxvd7aUUvvri2oIERPyons3apRW2R/KltAs/uzVbNyOunrSSVhEfb2zL5dlhZRwS7RXH3mBH0kHm2onYewb0Jezsi4IrlJL5hRRM7WJfRCTTbVp8RGGJ3xV0dw6/7UKsFlX3vQfDs5k+vTtJeyGIY2RI3bY4bWampqda+d1om5b6feLiXJGtK+XeLYFG5sXCSZ7dvTwU5Q0dPPNbKv6FsaQQ5N7tPmEfZxUavN9vXPZYdgoG66zXyGXBDnb/hRjEQEWkROq8HXfQexleF1MhKyJ9Pg2S6KGDCs0ZC7Ktsib6/g4CT2l0+iU1ov0rfIhkz2DelD9iSLfcUW2dwr7akoTLendmSFbmVQzPaN6k/TY7s0yipTfW1kIlzacCwF5cHUSolYy15M9pXFjbTRIpuw1unfK03ml55ZMpdl5gdPvoXFYro1v/LaQDHgqtmXeZcxtm+EuOZh3ehed/MGRrD5bqchYlF3bFLigsmplJ7g6NWf6IV439ZJU7T0Tg5zOArrtTKDE9g5aFlbTo39nxuSyF5vLaIck/gZ42cKJ49k9rU/3Tp2aJ5sLl1c81AeWdgjRNh37QjH6NuNTXrB/uwc+ovsyRQ2M5vIr4kVnWlXG3WNGh0U4rIvDZjh7XG3f/0khyO7whiGNkR94hQbrE8MR4UlpU/WberXl1/zoDtE1pD2LXEw1eQ4Rljsu0SbkoUm+FntK/qWRpBDk/tUMIqdxLeb7Rs8iJ21X6KdJguO1az5fIjrox/6SESgReS0GlrnI2r4NQ8iEjIIrsFz+4oYEFmjIXfVaMvbx6PmeW7ioL5yLV80ZLLv7pi7u6Vb7Cu2yObqZ03OfVF8WoIfWalbERSzfVvdNnSScXRlVpnqayMT4dKasxSUB1MrJWMtejHZVxZ3pY0W2YUJ/V428kvPLJnLRub3TPLNLWmUX0NSoRjw2/uk8ZVcLflzLhK9VmhnaK4Cv6Z9+pEzAdf9O+xr9ZFGAPvCvleR+vRcal727Rg3BfYFAPb9j9M6KqN52beT98sE+wKA7zgDAADYFwAAAOwLAACwLwAAwL6wLwAAwL4AAAD7AgAAgH0BAAD2BQAAAPsCAADsCwAAAPYFAADYFwAAAOwLAAC/AvsCAABwO8y+KgAAADcD+wIAAOwLAACwLwAAANgXAABgXwAAALAvAADAvgAAAGBfAACAfQEAAMC+AAAA+wIAAOwLAAAA9gUAANgXAACAO+x7Q9DR8eOPD6Jr2vkN1Y8/8cTj1dNwGAAAsK9OXt3NnLpiz2vY9+9e/eSvc+du/eTV3+E4AABgX07IeJtgW+A16/r9v8h7b7+LAwEAgH1VNd+Qr802fsm1mvn+xXX/7T/hSAAAYN8b6ph1n/Lv0MH/KXan+NkmKxbbOjbedIdtpH7HZptreaKz7f5L6t/wqvnRqz++9pv1iP5z6oPmrQ0KVo0BANeLfZO22Wzv6Xcj2dqDl+mpu2y2r+7PTGb3vv5H6C+yb/Un5keffua6f5/COQH7AgCam30/v9lmS9Xv9rfZbv6Hxb7vHC+21YU32dYV2ffxv5ofbX3cbN/FmPsCAJqjfccz+47T75Yx+4632Hek6vzB9s0qbeWh29E62x1FamGdbfzXg7l9hx7bdsdc3b6hKXeNf4o1nfPetqPxTdj3CYug5z5xqX2zNp0d/ugDqvrSoaodK9jD9YeqLt6n2ffZ6pUb96xS1VMbp74L+wIAmot91VZ8aszsW2s7ujT+85Oq7+eD3rNtK2P23db3HdvRP3P73vCOLTOs7htiG7+J3Pbz7PvRYrV6j6p+uOu+f50mNevbx5z7KzX7Xqh88OT+U+q7p1ec3AH7AgCuG/sec608+DD7HmtsX2ZXH27f7rY7BndlDwfwOrY3mGiXqsF1tuncvgttR1U1wfZ0qM12Ug1sauVh6+VXHjivqVmlqrpzh1huWKRmbWe/DBQnt+8Rtviwbqp68UNVrYV9AQDXjX0LbzbOut3P7Bt/ubnvKn5JxPFodckdX7E7LzL7evIS87h9Z+jXqyX9wWZT1dVXeNZtsbHQu2IDW3nYUaUoO9Usfh7ufBqzb4OmZ0Ud/hgvDPsCAK4X+1Kx5YqzVY3s2/MH2136uq/a5p6vbUvnFtfNmHdcs2+QOqBYzn2/GTx4cOe0y859p1muOPvbqsvat+L8Cqe6j9mXLUIUKQ/wue+Y/9EKXGQFHoR9AQDXz6ctRpo/bfG02uQ1D8y+5e8tXXrcFhJtqwsYVKzZV1v3VcW6b8rSpK8Gq1/bji0d34R9L/9pi0b23TJ1lbqCz31XPqCeOqit+5Y+OkCdtlN9d3jDn7NgXwDA9fRJY0O+xZtVq32Zj99L1j9tcesx9si3gxpvK+71g2bfV47XGdc8RN617ehTfmroU3XfDGrKvuq7bxvytXzRg77uu8dYeVi/4eyec8y+pcPHXHRq9l11Yd+3hy6wax72nfsC9gUAXE/fsjOn+P/4t+x8VZx/Dfv+06ufbmXfsvPp3/A5YwAA7Ct4tvDY+PE/dFt1TTuf9hn/hsnPVuEwAABgXwAAALAvAADAvgAAAGBfAACAfQEAAMC+AAAA+wIAAIB9AQAA9gUAANgXAAAA7AsAALAvAAAA2BcAAGBfAAAAv8y+0fiGRwAAcDOrokl1RiAOAADgXiKcpDaEIg4AAOBeQhtIVWcXIRAAAOBOiopUZl91drsIrP0CAICbWBURyia93L5qgzO6BQAAALcQ7QxWhX0BAAC4mf8HTeC5087q/FkAAAAASUVORK5CYII=)

Enable or disable the password reset feature. When disabled, both Step 1 and Step 2 return a 403 error.

### Require Authentication Code[​](#require-authentication-code "Direct link to Require Authentication Code")

![Require Authentication Code](data:image/png;base64,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)

When enabled, an additional Auth Code must be included in password reset requests. The parameter name is the **Auth Code URL Key** from Auth Codes settings (default: `AUTH_KEY`).

### Reset Flow[​](#reset-flow "Direct link to Reset Flow")

![Reset Flow options](/assets/images/reset-flow-1457f0f4f16f0dc21f9eec18f7a3a616.png)

Choose how the reset code is delivered to the user after a successful Step 1 request:

| Option                                 | Behavior                                                                                                                |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Save code in database only**         | No email is sent. The reset code is saved to the database. Use this when your front-end handles its own email delivery. |
| **Send default WordPress reset email** | Uses the standard WordPress password reset email template.                                                              |
| **Send custom email**                  | Sends a customizable email with your own subject and body. Subject and body are required when this option is selected.  |

When **Send custom email** is selected, you can compose the subject and body and choose between **Plain text** or **HTML** format.

### Step 2 - Set New Password[​](#step-2---set-new-password-1 "Direct link to Step 2 - Set New Password")

![Step 2 - Set New Password](/assets/images/step-2---set-new-password-752cd54e5f2fa60ed44ce91e1a112191.png)

#### Allow JWT-based password reset (skip reset code)[​](#allow-jwt-based-password-reset-skip-reset-code "Direct link to Allow JWT-based password reset (skip reset code)")

When enabled, the `code` parameter is not required. The plugin identifies the user directly from the JWT payload. The JWT must be valid and not expired.

#### Send WordPress default password changed notification[​](#send-wordpress-default-password-changed-notification "Direct link to Send WordPress default password changed notification")

When enabled, WordPress sends its default password changed notification email to the site admin after the password is successfully updated.

***

## Features[​](#features "Direct link to Features")

### Custom email template[​](#custom-email-template "Direct link to Custom email template")

When using the **Send custom email** flow, the body supports the following variables replaced at send time:

| Variable         | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| `{{CODE}}`       | **Required.** The reset password code the user must submit in Step 2. |
| `{{NAME}}`       | User's full name (first + last)                                       |
| `{{USERNAME}}`   | WordPress username (user\_login)                                      |
| `{{EMAIL}}`      | User's email address                                                  |
| `{{NICKNAME}}`   | User's nickname                                                       |
| `{{FIRST_NAME}}` | User's first name                                                     |
| `{{LAST_NAME}}`  | User's last name                                                      |
| `{{SITE}}`       | Website URL                                                           |
| `{{IP}}`         | IP address of the client that triggered the reset                     |

Example body:

```
Welcome {{FIRST_NAME}},

Your reset code for {{SITE}} is {{CODE}}.

This request was made from: {{IP}}
```

To use a fully custom template via code, use the `simple_jwt_login_reset_password_custom_email_template` filter:

```
add_filter('simple_jwt_login_reset_password_custom_email_template', function($template, $request) {
    return "
        Hello {{FIRST_NAME}},
        Here is your reset password code.

        <b>Your code</b>: {{CODE}}
    ";
}, 10, 2);
```
