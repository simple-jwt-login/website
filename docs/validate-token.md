# Validate token

Use this endpoint to verify whether a JWT is valid. On success, the response includes the corresponding WordPress user's profile, their roles, and the decoded JWT header and payload.

This endpoint is useful for:

* **Server-side token verification** before granting access to resources
* **Debugging** - inspect what user and claims a token resolves to
* **Client-side session checks** - confirm a stored token is still accepted before making other API calls

API Reference

Explore and test this endpoint using the [interactive API reference →](/api/v4/validate-jwt.md)

## Endpoint[​](#endpoint "Direct link to Endpoint")

**METHOD**: `GET` or `POST`

**ENDPOINT**: `/simple-jwt-login/v1/auth/validate`

**URL Example**: `https://{{yoursite}}/?rest_route=/simple-jwt-login/v1/auth/validate&JWT={{YOUR_JWT}}`

**PARAMETERS**:

| Parameter  | Type                | Description                                                                                                                                                                    |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `JWT`      | `required` `string` | Your JWT. Can alternatively be passed as `Authorization: Bearer <token>`.                                                                                                      |
| `AUTH_KEY` | `optional` `string` | Auth Code value. Required only if "Require Authentication Code" is enabled. The parameter name matches the **Auth Code URL Key** in Auth Codes settings (default: `AUTH_KEY`). |

## Request[​](#request "Direct link to Request")

```
{
  "JWT": "YOUR_JWT_HERE"
}
```

With optional Auth Code:

```
{
  "JWT": "YOUR_JWT_HERE",
  "AUTH_KEY": "MySecretAuthCode"
}
```

## Responses[​](#responses "Direct link to Responses")

### 200[​](#200 "Direct link to 200")

```
{
  "success": true,
  "data": {
    "user": {
      "ID": "1",
      "user_login": "myuser",
      "user_nicename": "myuser",
      "user_email": "myuser@simplejwtlogin.com",
      "user_url": "https://simplejwtlogin.com/myuser",
      "user_registered": "2021-01-01 23:31:50",
      "user_activation_key": "",
      "user_status": "0",
      "display_name": "myuser"
    },
    "roles": [
      "administrator"
    ],
    "jwt": [
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "header": {
          "typ": "JWT",
          "alg": "HS256"
        },
        "payload": {
          "iat": 1516239022,
          "email": "myuser@simplejwtlogin.com",
          "id": 1,
          "site": "https://simplejwtlogin.com",
          "username": "myuser"
        }
      }
    ]
  }
}
```

### 400[​](#400 "Direct link to 400")

Bad request - the `JWT` parameter is missing.

```
{
  "success": false,
  "data": {
    "message": "JWT is missing.",
    "errorCode": 53
  }
}
```

### 401[​](#401 "Direct link to 401")

Unauthorized - JWT is invalid, has a bad signature, is expired, or has been revoked.

```
{
  "success": false,
  "data": {
    "message": "JWT has expired.",
    "errorCode": 14
  }
}
```

### 403[​](#403 "Direct link to 403")

Forbidden - token validation is disabled in plugin settings.

```
{
  "success": false,
  "data": {
    "message": "Validate token is not enabled.",
    "errorCode": 82
  }
}
```

### 500[​](#500 "Direct link to 500")

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

## Examples[​](#examples "Direct link to Examples")

### SHELL[​](#shell "Direct link to SHELL")

```
curl -X POST https://simplejwtlogin.com/?rest_route=/simple-jwt-login/v1/auth/validate \
  -H "Content-type: application/json" \
  -d '{"JWT":"YOUR_JWT"}'
```

### PHP[​](#php "Direct link to PHP")

```
$simpleJwtLogin = new \SimpleJwtLoginClient\SimpleJwtLoginClient(
    'https://simplejwtlogin.com',
    '/simple-jwt-login/v1'
);
$result = $simpleJwtLogin->validateToken('your JWT here', 'AUTH CODE');
```

### JavaScript[​](#javascript "Direct link to JavaScript")

```
fetch('https://simplejwtlogin.com/wp-json/simple-jwt-login/v1/auth/validate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ JWT: 'YOUR_JWT_HERE' })
}).then(r => r.json()).then(console.log);
```

## Error responses[​](#error-responses "Direct link to Error responses")

| Code | Meaning                                                    |
| ---- | ---------------------------------------------------------- |
| `53` | The JWT parameter is missing from the request.             |
| `54` | No WordPress user found for the claims in the JWT.         |
| `55` | The JWT has been revoked and can no longer be used.        |
| `82` | The validate-token feature is disabled in plugin settings. |

JWT decoding errors (`1`-`22`) may also appear when the supplied token cannot be parsed or its signature is invalid.

***

## Settings[​](#settings "Direct link to Settings")

Configure under **Settings → Simple JWT Login → Validate Token**.

### Allow Validate Token Endpoint[​](#allow-validate-token-endpoint "Direct link to Allow Validate Token Endpoint")

![Allow Validate Token Endpoint](/assets/images/allow-validate-token-endpoint-f62c72e8727b5cf12aaf211cf90afc48.png)

Enable or disable the validate token endpoint. When disabled, all requests to `/auth/validate` return a 403 error. When enabled, clients can verify a JWT and retrieve the associated WordPress user details.

### Require Authentication Code[​](#require-authentication-code "Direct link to Require Authentication Code")

![Require Authentication Code](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABX0AAAB0CAMAAADuBmGdAAADAFBMVEX///9QV17z9fb3+PkmNURsdX2ZoKb4+fri5OcdIydxeoK8wMR4gIfZ3N+6v8KXnaTx8vOTm6Dl5umLkpicoqft7u92fobq6+21ur5weIDBxMhtdn5/h4/e4OPV2Nv29/jv8fKtsrfk5ejh5OU1Oz56gon19vemrLF7g4rV19jR1NeQmJ6xtrt8hIuJkJZscHKCipHf4OJyeoOGjpSwtLmEi5LM0NJ1foWzuL3O0tSeo6nIzM+OlZuAiJDX2t2FjJP29vegp6zAxMglNEOqrK6epKry8/SPlpzGys59hYzu7/FKT1KMkJLj5eZXXF/m5+l/goUqLzOiqK0gJipNUlXa3eDb3uFzfIN5govQ09W5vsLBxcmPl52RmZ91eXy9vr9TV1rt7vAyQE/N0dSUnKPk5ufExsklKy/d3+KVnKK+wsYjKS1UWl2ssbbs7e/m6Orp6urBwsQxP03Mzs98f4PDx8v9/f0nLTF0fYTp6uzn6eteYmYpOEbr7O6us7iKkZc8Sld3e36pr7TT1dhucnVBRkl9ho2JjI6Eh4q3vMBKV2OorbPU1tl5gYiPk5XIysyMk5lVYW3Z3N6XnaO/wcNxdngeJCj5+fk5P0Klq7CHj5eZnJ6Zn6VeXl62u79mcHtjaGrJzdBhZmnU1dbY2tplaW07QURRVVijqq9ATVqPkJI9QkeMj5EzMzO9wcXLztJ4foLe4OJobG47QUXd3t+xs7ScnZ6HjpUzOT1bZnIxNjuJjI9kZGSwsLBrcXeFiY/7+/uyt7tESUykpqlHTE/EyMza2txfanWDipGmqavy9PWsr7FOWmeho6a5u72GiYxaYGOChYeYnqQvPUxrbnFfY2hJTlEsO0lFUl/W2dxibXhWXGNobnVIVGGamppkaGzO0NLKztG7vL5DUF1ZXmFSXmolJSWNjY0hISEvNTlLV2Rpc36vsrP09PUtMze2ubpueIKytbZtc3h0en+VmJo3RVOeoaPDxcaWmZuUl5mTl5i2u8CMlJy7wMR8goi1u8Bh/a8VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAUJ0lEQVR42u2deUAV5d7HR86c8/gAKat0LioQChQkKqsgEmUubIoIeBREKDUFdwM01FI0S03cLUvTXFLbTMuluq+ZdhNbbLu2L7Z327tt997e9/09s505iAXUPUp9P38cz8w8zzzz/Gbm43N+85yDJAEAADhHfB7k1x4AAIBb8Avy0ORb5sMAAAC4DZ9MVb4eCAUAALgTD6Ffj1AEAgAA3Dz6peRDkAVxAAAA92IJkiQ/hAEAANyNnyS1RxQAAMDdtId9AQAA9gUAANgXAAAA7AsAALAvAAAA2BcAAGBfAAAAsC8AAMC+AAAAYF8AAPhD2jeWj25hjW68/y8XuJjzXi3fdDZm8utw7gEAbcq+WZzzA7m7fvl30Xbl/vMsW8LXcr7VZc0WPvOX7TuD8yGM7cvNHdKSTUaDaxZWb39wNewLAGgr9r3q29e/mdiUfQ/kfsH5iVa2dw/Je2hr7NvSTRp30bEeOZK/BfYFALQR++57vd0b7dotb8K+dWxAHt/FWObihdVHN9AgeHVWXm42H89YPn+W9eL8YiXzQPmADVn5vSzPDK/eO3OyVtuyng/nnzQwNo7zTNafd2NHScf8ENk3+2ReFg1RjfKx/MG6A9s3sIdEAf69kl7wyT46Pn8mCzySz7tdt9plk6i3fU24s55CSBZf72BsKu14Wu4Xh06K/vxr76EH1wj77oldnzdmNa4BAMB5Zd957TqwBe2+bdK+jrX8S9ZQyXc8f4T/i91VwbPqqlX7lrrYt6LuziHP8b1D3zdGmqf52icrxMCZ7DtAse/3C/mO7J/IvhXrd/MDDcwoH8t55VDOHXfdwPni7OVCsRG5PG9NbBablbdt8Ulesc+0iS3meaP/ztcPMeqpQ1/On1FbfpavffBlnj+OPUFv3q+gFvZ8wt+eeYgvx0UAADif7PtNuxDG3ni9ybwvH09p3VKeP5kt51+Q945Qprcp+95Cfzwjn59mHnl8hlr7QZ7LtvH3TfY1Mg/bPPaQM53lY3kWY7v5w1p6QSh2Nef7GAtiHoFMbHrGtMlnLX+IRXTjG5z1BF9y3a6VopmX+NtsB3+AMeH3G/kOGgjzLbgIAADnk33faKe/nJH3Hb6WVzbQGFLlyTX8ZUYiVex7mu0z2Zcerz2plXpCqTykgpR5gq/dJ+zrw46b7fsEC+R8nLN8LF/D2HAyuFOxT/BqZTehQ8fkUZls06atXAh+DO3LqMfU6RCfqce9nsRMA+ujbDv/ibHRZN86taXtuAgAAG3DvnVseQX/nk3jFaenTZt2IvA5vpvRAJjsm0c5ha9N9qV5YB75/Ecq9fWTSuV/am69UXgznA0V9t0mxqLKUzdhX2d5ZdaasOg7nOeoip3G+TuMzSGJLjw+bTfZ17lpAOfHWcMnyth3tNO+lPddqOZ9K8XqLcrYl+y8g+x7Dz9KLU37DBcBAOD8se9fZr7e7oEHHqCX+CbsS0PHbj6UhN2RnR27UOR9d9TlCftW8qPZe13tyx7h2x/JHlqhTsg9wtfn5ubu5Qci5lTzLc9VCPuSgrP7G/Z1ljcsOpvz2OxeWt53fXbscPY8P3J6jRj7OjeZ874m+6pzHiortpjzvvmLKV98Hev1CVXO3jEaFwEA4Pyx7/+00/lrU/bdk092y3zkSPXu3MU05+Hva8d8L+y79bqK3Rsa2ddyfEdet8ptc0TdHzgXUwwSOT20K81aW7lY2HfreqFCw75GeadFH6HR8nJjzgMfw8YO59Uzs8i+pk2WJ4aP314XzhrZV5nvW7GNmh0n5jyI9PNPe9e+HSue6/Vas3d8Vu4JXAQAgPPLvn+95n+bsO9ZeEjYFwAAwG+37+3sWdgXAADcbt+TZd/AvgAA4Hb7vs6+bb59AQAA/F72feBl2BcAANxq3wBjzkM6YgQAAPh1dQAAgH0BAAC41b7x3T1/Yat3F+Wfv/i6rE3s0cyd+1gb9Ap+ejOXXnCWwo0aMWPrcNZNfp4t3JcrcX1aFi6vji0prfVVD0OjqPy+DYtANN1eK6LanEClXIhbDoDW2rfntSzQnsPcYt/MxykDLe7Xm2a1yL45nmf3RHeSjdjvmWsLj/3O9u1+QWvsq/W1afvmeDZzL0rBZtn3zPYCGinSvPwb7bv5VXa2VgCAfX/dvl26M/fY99dv0tbZt7lrz4l9mx7s/vfse2Z7/0X7nmWvAMC+zbJvP6vVqt7Wg9I8fctIt2H1ne8OYe0zvKMi6Rb2nptWNCxEEWOhv2fcSrqzb/dM3+i0r1YwvNP8+s7a3y5yTCjqKd7GJw0eRRrQKpAcOiiN0adjj4ykqBgSysAX5qX3Mypo9o1Yklb0whTGgoMYiwxjnahSF1v8QM8SWg60JQ2mkraMgem02JE2dRDSKQtIsqboh6KsFfuaHe3ZM9EorFBYbw/20ptniZ2TJpFUQiZFJd0aorp1VUaN76y53oOp3kAaPm/2Z2Upy6zLfJSdKiVKfHsn0DGbKtlS+u6Ppt++8J5fn8aWptvrx7LkF2h95K1KJkALg3bo+iKh9IxtHFyU4qPsp2tneklwsEH+wcHJxgnRC3qtGlYkgqXvh7F+3vS3SN59Sg+fnnnQGvCa5+nfVQu5s466rEemAyt7KkY/sS5xUldpF4MeKL2jah9F5kE7gx2MqwgA2LfZY99Cbez76rKrAuf60w1XHBHR9112wbiyV9NH0mJaYZfO8UKMPp3uK0v1LmMp86Ys6O60r1Yw3DqXzfFW/+bQIEdoas01bJR3Vz9/0oBWQchBGSKRITLixvaLGsm8rJcwR7pRQbNvQ/JFY22rDPuqY9/Bjim+kYwVD5vSr/NSZls2m02KVAektN+QHhNyWFfjmMVa2ldEWkbgMXuhUZiY1Tu+LGKl3vxY++VlGfY+7HH/Aj9f9effvOyjZqWkRQaNJLFp9k329WMXNDjHvsExZTE1meZKtu5BLKaeYhUdwS6ye5UtiRow297ALN79RF/1MGiHri/qQ9pjnRbM7rvKxb72qxoaCowTYox97RPnhKUbIRBEXUKNJ+vh0+yrN3BTYVmyd4QaclMdsWxEpsMU+h9TP7GmOOmrtItBD5TWUa2Pin21M4ixL4B9W29fuouZpdMQ5k139NxJaiZgAhkllbHUNCEzrxJatWqUhe5aluyaeaCC4cEejPk7jFUpN7Hom2h4Zm3QK5jsa7HTGG5iHPMiuYQER+gVTJkHv6JG9qUjcsxj4b2p8MgUZgtj7JJ5hn0LPAeYDkW3b78iKhywxChMbOwrXvXmk6lsRFEf5k2jvD2DVbfSERVYqSues3X7buzR3iXz0JNe0gaZK4mD87BOZt7U/eRo2n9UIvM/xpZGKTbUwqAfurZoSDWa4j7W6mOyr8XzPg/TCTHs20O04qHvRxCWwRrss/XwafY1NcAuLVRCbq4jlo3IREalMv3EmuOkr9IuBj1QWkf1Pgr7amcQ9gWwb+vtG2cVLFUSvTHD2BTbYKtVDIUL6GNojZDZEqVAfKY1lHzstK9WMLwTUz+rEwuik6zWMJbwLn1MtjboFUz2zbTSXxPqukxNZZJktQqafUOWPBVstYa42nekIqdE5Rj6KglL4SrNvu/2NB+Kbt/NYm1MgFGYWHK3eNWbj1wiQtDHR9mp1cjqKl2hMGj29bl9cFGkxWlfcZATbjJXspHvWE2hErpI0cLA+9jPvmxYmGJDLQz6oWuLhlQTyH/M2r5R5iG9wDghhn1XKcHS9yMYmxQyyN+It2ZfvQGveXar1aGE3FxHLBuRuTSODkQ7sS5x0lZpF4MWKL2jeh+FfbUzCPsC2Lf19vWd6HzMRjdcwLDwiHHCvpvpZu0sZLZRHTtZ7FTgQqd9tYJm+3pPHGK5MoxF0918gRj7qhVcxr6kslFxxr2rVdDsO7FHgc8Usq8n5X5TwthY/akbmaEgyvm4SIgiShv79vYwHYqyVhn7Ulo0ZYnZKhuL1S6ozSdT8xYa0tkvYuZpXbp9fUcxdrn46G9xLNus7FQpkSAUecxcyUY2mmwNUkKXLPpAWeNMe2bSWHUsqoZBP3RtUZGnMvalkAyxKmP3AjGUvlR8fph8d4JxQvSCWrD0/SikOyb8bMRbH/uqDeTULJ3DFqn2NddRx756ZFL6Rugn1iVOKS4Xgx4oraN6H2FfAH4X+zoWhTNLonHDdZzILAOFfUsiIgYqed9Zy2jrNVNYSgoLTSP7as/YtIJm+3a6iJV1Ipkm+FgCRN5XrSDksGSYlve1WQb0GGncu3oF1b4d6NaPJ/v2GMUKPcOYT/AswwwW/3gLCyowRLF/kJr33U8J2K7GMYu1St73PuaXVGi2yuyaBUzkfdXmczzD2URrHxZWEsoaLjnDvvOvZGUJ/qxfJgta1EfZqZr3XcAWJJWZK9lq7p8zoV4NnZ9nF5YaRXItCUhX+6qFQT90PSoiuyp6diwtlN2t5n0z7X5slNXhQ+NdekqpnxC9oBYsfT8KF3a0Zxrx1uyrNdDlUgvrSmNfEXJzHbHsjIxlQnSIfmJNcdJXaReDHiito3ofTfZVTmzMRbgFAezbCvuyxDh7ekfDvnui6idECvt6dep9d4Qixpxoz0XFY+mTeFrPW3swS291nrBW0Gzfa7vXB3Skj93xi9LmKnMelApCDuHe2pyHYTTpwGLcu1oFzb4D4nr4Cvt2iZ7XV+wmUsx50MwQeqV3p/r7DVGkBqtzHgJtRTTnQT9msVaZ81DsSR+XzVahZ/nKnAe1eXZ/z4SAp/owS/Iiz3kxZ9g38/aBCbS7UTTj4FZ1p+qsCJs1gXK+pkq2sKeClTkPYnZe1wR7vYjMtVbtCaMeBu3Q9UWB6BkbObgoQJ3zwFKL0zPSHD59rdbBhcYJ0QvqwdL3o/xvYi1xxtuY86A2MKxzcWSaQw25qY6y7IxMSIlviHZizXHSVmkXgx4ovaNaH032VfZqd+AWBLCvG1i5CvFuzbRZdBQA2BdASugoALAvpISOAgD7AgAAgH0BAAD2BQAAAPsCAADsCwAAsC8AAADYFwAAYF8AAACwLwAAwL4AAABgXwAAgH0BAADAvgAAAPsCAADQ7QsAAMDtkH0lAAAAbgb2BQAA2BcAAGBfAAAAsC8AAMC+AAAAYF8AAIB9AQAAwL4AAAD7AgAAgH0BAAD2BQAA2BcAAADsCwAAsC8AAAB32Pcy/xXl05++jZ2r47rsozvuvfeOjyw4QwCAP5V9Y2qvENTWTjo3h/XYhw+XTp1a+vCHj+EUAQD+RPbtWC5rvGg7F0d1/FH93aP9cY4AAH8a+86dLhtMTz4HI99Hne8fxegXAPBnse9ltWTdTYk+Pomb6E3tut+npavlEU2stchy4Bntf2he+rj57fe/88x1i2/ESQYAtBH7Fp+S5X+ob0dQ7sHXtOl6+b0qaYFc7lxzm3xb81qaezCgmfb96GHz0lu7TAtDOT/0UvjZmrjrM9gXANCG7XvwCll2qG+vleUrDrrYV57fSvs2TVP2vaPUvFR6h9m+N0j73s5qSQOwLwCgzdi3nOw7QH07h+xb7mLf2p2HFfvOqbm+/OACaZHIDb+mbPubvH9FbU5gzfXTN+VIUuY/XvwgWr5ZGil/IElPy5crmYer5a82TZ8kxT996pUMSaraX/5eRhP2vXeqeWnqva72ld7h66TJdZ/spudxn9flZT03RpLyqcbz9yiZh243vn9E+vpo3tu0231j8rbNhH0BAH8I+46Q5wv7XvaKvOIr+VTBfSvkFSXxmn1rX9tU8KYc3PnUTia9Ju8c8aJi3xVm+9Z+6h0zSd4Z97S8RLLJ00fsbLF9q3YtlKTrZubMODJOGl2ZM65bI/u+zKQZ61dPviVXWrdwaODx8bAvAKCt2HeFM/PwM9l3hYt9N7+38yqy7//Jb4qscLop8/A3eZMk/VsMdb+SHw+U5dlSxpn2/S5Ckj6lpZXyK9LNlMXo08LMA+f8wHJp3xf0KO770VXVd0nSj43s+4Mk1f1IA+tD4TMOHZakl2FfAEBbse9/rjCeun1K9i12sW9iPA1/y6UrRbrhaipmtu98idYrFK+UZYnMq9n3ZsO+vcXYWi2z7jt5sxTawqduN0i9cjdIpVxwMpTTEP3LRvbdKkk7lM3Lnx0uasC+AIC2Yl/mMuNMrnKx7/1Vb9aSff8t75Sk3jT29Zf3G/aNF2Pf91JTUy9fSmPfcEot3CyNokGyxynDviMUpb9AZZIPi7Gvown7WlxnnB1ulPddWT3HsV1ZqhpPqt1A9s2jRPMap323qV/RmHGIDv1O2BcA0Ga+bRFv+rZFucu3Lci+UrJsyvtKw+SdJcec9r3sTbmmpPi7VCXvW072HSLL+0niZvtS3je6xPOg9IJ8fcnTTdjX5dsWdzwkNbKvtO2RqtxbqqSpDmn0DdKALLLvmBPSxXlO+/6wcJ9UVUp53xPS1grYFwDQhr5pbMi3NkNqbF/pTWXOQ2+a89BVkgJfkWV/p32lwBE7X/zgtXApc9OpVyLJvlLYe6cSbnaxrzTygxd3HrRJVXHl5bam7Cv1f/QsX3VT7Dsu7/MBN3Q78P5p6fPY8bvF2HfrlsqTLzntK5UOrx7+kpjzkJX7EuwLAGhDv7JzoforO9/Jc3/Lzi8X9m0Vj338lviVnbc+fuhXi5aOwVkEAPxxfmFy3X9WlJcfvLpKOjf2ldbtEr8wueuwBPsCAPDr6m60b/OBfQEAsC8AAADYFwAAYF8AAACwLwAAwL4AAAD7AgAAgH0BAAD2BQAAAPsCAADsCwAAAPYFAADYFwAAAOwLAADnmX39DiMMAADgXg77SVJQCOIAAADuJSRIkjwCEQcAAHAvkyPoJTMUgQAAAHeSman+UxZyGMEAAAD3cDhkcqb2NiLIrz0AAAC34BcUgf+CAADgHPH/obfVF28r1oQAAAAASUVORK5CYII=)

When enabled, an additional Auth Code must be provided alongside the JWT to use the validate endpoint. The parameter name is the **Auth Code URL Key** from Auth Codes settings (default: `AUTH_KEY`). Configure the codes themselves in the **Auth Codes** tab.
