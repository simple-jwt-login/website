# Configuration

The **General** settings page is the foundation of Simple JWT Login. It controls the API route prefix, how JWTs are signed and verified, where the plugin looks for tokens in incoming requests, and global security options.

Go to **Settings → Simple JWT Login → General** to configure these options.

***

## Server[​](#server "Direct link to Server")

The Simple-JWT-Login REST API is accessible via two URL formats. Both are equivalent - choose the one that fits your WordPress permalink configuration:

* **Pretty permalinks** (recommended):
  <!-- -->
  ```
  https://{domain}/wp-json/simple-jwt-login/v1/{endpoint}
  ```
* **Query-string format** (works even without pretty permalinks):
  <!-- -->
  ```
  https://{domain}/?rest_route=/simple-jwt-login/v1/{endpoint}
  ```

## Request Parameters[​](#request-parameters "Direct link to Request Parameters")

Parameters can be sent in any of the following ways:

* **JSON request body** (recommended for POST/PUT/DELETE requests)
* **Query string** (convenient for GET requests and quick testing)
* **Form data** (`application/x-www-form-urlencoded`)

The `JWT` parameter name is case-insensitive - `jwt`, `JWT`, and `Jwt` are all accepted.

## Initial Configuration[​](#initial-configuration "Direct link to Initial Configuration")

1. Go to **Settings → Simple JWT Login → General**.
2. Set a **JWT secret key** and choose a **signing algorithm** in the **JWT Verification Rules** ELSE row (the required default rule). See [JWT Verification Rules](#jwt-verification-rules) below.
3. Click **Save Changes**.

caution

Use a long, random string for the JWT secret key. This key is equivalent to a master password - anyone who knows it can forge valid tokens.

***

## Route Namespace[​](#route-namespace "Direct link to Route Namespace")

![Route Namespace setting](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABX0AAACKCAMAAADBnhn0AAADAFBMVEX4+fq8wMRxeoL3+PlsdX0dIydQV17////i5OeUlJQeHh729/jq7O7l5uns7u+XnaR2foZtdn61ur7g4+WTm6B9hYyepKmPlpytsreZoKbQ09Z4gIfe4OPn6eujqq/09faJkJaLkpmgpqtveICxtrvl5ujM0NP19vfZ3N/v8PKenp6+wsZ7g4pweYGGjpTW2dx6gonu7/G6v8KVm6LX2t3c3+FzfIORmJ6mrLF0fITBxMhyeoK3vMCeo6kiIiLEyMyhqK11foXj5efO0tSFjJN5gYicoqe1tbWaoabw8fOrr7V/h4/y9PWzuLzJzdDIzM9+ho2CipGCiZHT1tnV19qprrPx8vPZ3N5KSkrs7vBJSUne3t+AiI94eHjBwsSKkZi+wMKkpKTa3eDm5+j5+fmNlJqXnaOMkJK2u7/w8PDGxsbn6Oqus7iwtbpaWlrGys1vb29TU1MjKS2ZnZ6Zn6VARUk8QUbj5eaPl52Ei5LR1NdKT1Lt7e4wMDC8wMWxsrLy8/TU1tlWXF+Um6Hy8vKgo6VDSEy/w8f8/PxdYWXAwMAlJSXo6uzDxsorMDSQkJCxtbqhp6wgJipERESBhYr+/v6JiYnGy84rKyvS1dcuLi4nLTEzOTx4foOiqa7Lz9KWmZvU1NS0ur65vsLa2trq6+xwdXhkZGTh5OWCgoI7QUS7vL86Ojqlq7Ccoqh6fH01Oz6FiIx/g4ZUWl3Nzc3Bxcnd4OLR0dGdn6KJjI/MztA2NjaBiZB+f4G5urszMzNvc3WNjY2do6hgYGBVVVWHj5VHTE+ztrhOTk5SV1rc3Nzp6ek/Pz9eY2koKCjJysqHh4dqampPVFfX2Nnh4eFYX2OtsLJlZWWlp6moqal9ho1zc3NlaW2PkpRqbnBNUlWIj5Zxd3zOfX2Wlpaamprb29x5eXlYWFhHR0eurq44PkKTl5ktMzfcpafXmJnEYGGtra3i4uL39/deXl5iZmrTiovkvr/u3d2zLS63ODnKb3G2traanZ/S0tLhtbXpzc6oJo1vAAAACXBIWXMAAAsTAAALEwEAmpwYAAAVcklEQVR42u2dd0BUV77HfzD3OhEEQXodijoSiqBIEUUBS1RQMDDKEwsYRIolJEQlL4qaKETBGkt0jW2M0diTvFWjJkZjSWKapm163WSzKbvZvq+cc8vMnaKSrMtT+H7+uDJ3zpx7ypwPv/ndw0h6AAAAbQ/xg8HscRsAAIA2wcNsUOxbPIIAAAC0GSOSJPsWGzAUAADQlhiSmH0NiHwBAKCto18D6c06jAMAALQtOjPpPTAMAADQ1niQ/jaMAgAAtDW3wb4AAAD7AgAA7AsAAAD2BQAA2BcAAADsCwAAsC8AAADYFwAAYF8AAACwLwAAwL4AAAD7Xp/7RVHcvOgDp9+LtlV80f6UmZWOIbpPvOeGN/3T32P6AADt0L5RnRgDndh386JvRfGt1ttXrPh32Pf77/7+3ad/wgQCANqdfddy+8Y5se9z1NAifkDkubZu05KjDUSrxZMUKooLT4icbdT/yreb3//CYt/aTbsl+/b/RhTrnttJ9Gux7ug3m49ue6Ol6U2imLVLNr14j45yD39UK74xix4S6w7VfbsriTyXrBYPNk1hlRx75aB43zHSPfTRpj0nPOWK//L9X//66YOYQABAR7LvNpH5NveCuOdXB8UmHbPvXsm+J5vEzRUV2XvFlgO7xM2yJbuI4gnxgGTfc3t2HX5RXGJk9q2trRPFlj2bxFco94j4xuEl4u/on+KRioqf9jH7inUHvhXfJ3PL+4eaxNoymiKyIve/RYfEPYeviE1yO/78/d/+9ve/YAIBAO3OvvO4fQ85zfuKtVuJO3EqbRTFYxb7KpmHIyJ7VZO4VbXvlCOrd3L7dnEnmsCL/VoUN9Jm8YrxLXGTboq42pNeFVvod+JPk95kRR4Sa6vppCguN3B/3yc+RIvEXex74LuY+HUMLeyCnD/976e//x9kfgEA7c++hVFXrkQtdJb3/UgUj+TSO8yY1CCKCyT7llntu0dKQHBjKvY9Jv7E7fvmrvtr2flJzL57iHi4ywRueEcuLX5hvsCO30xh9mXPvimKOSMOX2iRssbfyCb/Qin5jtKS7/6M6QMAtMs9D6+8QuQ08/BqLYtImTon0Bge+7awe3DnuH3vEZewEovE5yZNmrR3Eil53yn0oVjL7HtBbDp3TrZvHbfvPZJ9J4m1e1nxt1igW7b3Q/ENOfZdIIrmQ2LdO5PuY/ZdxNIQzOOG1eJWVvLcF5g1AEB7tW/z2l8xFnXix7WzHOxLn4gHTda87xHxxYr7uH3PiasPfcCcuulwxdGDaVb7lq0WmWs/Ej88d8TBvsZF4oWKig/r6J/PVVQsEo9w+15h1X1Ia8Ule3fx2JcV23WI5X2PinuOVhyuDcWsAQDaqX3ndLJhjoN9n1nNNj14HuJ7HkxEO5tq6+7h9s1dxFLCRIOaNrdcaDpmtS8d5vZt3iwe3OpgX4o5umRT3aK1NIVnlBdt43se3mlp2eVJ2R+Jm07cz/erHWs6KLLshu7dNzYdPPJ+F8waAKCd2ndhpwBr5mFrp4Vt2qKHuJsBAKAD2rd/QKdPirqMW3XlyqpxXYo+6RTQH/YFAIB/v32ldMPKEn5cmyc9gH0BAKCN7Fsj/7XFyja3LwAAwL6wLwAAtJ19d3HhBg/kx9PB/PgJxgkAAPD9vgAAAPsCAAC4Je2bG+Tq69LX5tToeUKvq5Tu70seGfZnnOHf7V9plIfrDehZz4hfVq1L1194QT+bURvIRmBG4i/vSELOzygc1+sqXbaZ6RRB6NuaQRioTF5QH6dP+3hd++WOc39D5hOA/2/7jhWElK5h1yjgWsgO3QLIUxC8C1zYz+FR16pvTEIM9bL9Y+aCq+8v1tjXZ1p6XNQ46jeoFSvQUwhLzmD/HUeUdBgcIUhI7XLauqTutm0UhPjIO3k1nG6km14QH5mXK9ciNLfavppqs534wMM3xDVy0I2y7+je5BmdTf+qfYe16tfYgOXXt++YITHEfs9aByH7ak5kTY/1dW7fxF6/xL528wnALWrfZspeHNkq+4YZmqNHX8++fYY5nPLKboV9jYlRPmGxPVu3Allb3OPHEY3K5wfu666BylPXbp3ijXzyHBm9nFcjR6dD1ycVjpSaGvxzYl8NTswTlrJvjqn36RtlX0ZoIrWRfVvTZT7TNp9ysq8Rkd5Y+wLQXuxLyd5EwX1TCmLZ95L5pgiLifpFuiaMc7AvUepIrd98vNLK89mLgvwDSkI9g7L8llKeFD72pTFxJsrJkr7CIVoQvCgs1bWgp1JSEt5k18hCrX19BIMl8xCy9NnE+XPOZgQ1kEt538gh4+QVOOtZV99i1b4UsJ2Kh9Z0o2JhuRP73jkkvpxJ3+fjjMVbRkqfVEMCy0eFu6v2Zc3Ksdg3aKTlF4VqX/eRcVn73MkloOvkIclEpntdh0yPsHTYsCorrjtpq/VivQ6dFentvd0ysvvvVTIP07ak8DqUEVarHDFNqlI71OogRQUMSTVz+44LceeJG+XjezK7Bje5Mf0ZFv5Fd1E76c3Kpsn9VyuXJ8MyZD1LskbK9u0j1aFcyDoRxoxQucrpfimnTVLmQemyRL/yeO/5aq+Va/CZ7uMiZx6Kh2UJ/vIYKG8gnr0oo0FCKC3ty5oeKvA3QdCMAFfeMesEdeWV+HjFJibGWlrr41VULg2dZu67D2bNE9ydzGex/1BhqAkLH9yq9p3BYt/1wTFj2KpOrUnSFZLJa37xmJBiB/suD2m2sa+wksyJGykokQlw7uDq5FF30gAlIoryTwoZLRdLzyZjSZTnoOgyuaT00basOC/EqLGvyWtxT6Nq31Sf+vTy+uwEF3IR7qQ7s4r5Cuw9NMezJtJi3xm+tH5YMDv4kaN9e8S7FBfFNRj9thePTldW61yjsXy0xb71QrXFvnleeR529u0eWeaxuIZdvp6ChzABTK7emBhh6fCqhOzkuB3aaqW4Lz4nN7fMMrIhqt+iY7sEDrGMsFrl/qDq5LMR2qG2DNLQMBqZJsW+fkyZ07arydN+Suw7mP222OGrdtLGvkrlymQoQ5Yd3b94VbQ19lUvpJkI/xqi+ak0yGtjWPk0yb5KlznLU2YUG8epvVavocw0GwT3iL7ZVCiPgfwG4pweQIPzXWjgAN50Ofb1C672lb8rT227FPt6h4eNyfBUW+sjzFAGzjr3in2dzGeerwf1ysXCB7do3ldIV5TBForvKi4Ctg7Zqn/aPu8rCP7utvZl8WrgFgpiS393CnPnDn+LfRtK5qk5CGbfZP7s/iKppIW4ftq8b3VaQbzvVNm+zIG+rOT0KBaasaci1/MVGMQspPOaqtp3Y4Yu3GVEii58oBP75rEO6OJ69o6TI1tptdYT1QSqeV+BxXJK3jeHdP194/P72Ng3hMVcz/iRC7O9u7dRF92P1RmhdlgXzcLLpQnaarl5dBnzDdbeGQVlVF2YwgxKZM9G2FJlDzbOEdqh1g5S/WTJvnn7yRTdxd6+veN09PEstZM29pUrVydDGbI8Nh/GFKt91QtpJqJ+FFF5M6XmsQSCYGL2VbvMmV7Oj2qvlWto7FuW0WDJPMhvIM7SxVTydBAPgS32Zb81ciaTZoJk+wrMnhHBamvVT0HauVfs62Q+p0dgjw+4hWPfhhyvJNqYmiUIgeQTkJX4NBVJWpJDkKx6HgqmcuPlNscV29g3hQdPfaV8Xk/pJeUW+9I+oYfVvqPH8krusGb+5k+OF4Rguz0PPuWpsn1D5Rwhy5i68E+xfQfwFZggXWGhat9c77ICH0ook+/p2dk3LZwdAuaPTuBnlNXKKuWLWI59i8NTyRL7MnL7C+M09jXJN+DknK23OUmIYa+KUDucJLDvji8cqq1WMs/6SO8hTmLfaVId6ghbqhwhVakZau0gFY6S7BsWnxsbQPb2Jb+FPTJy1U7a2FeuXJ0MZcjSeLw51mpf9UKaidCFlJnjTTRvDDsl3Mbsq3bZMpqk9lq5hsa+x8Za877yG0h6mOGZb0o0sxujFvvukDtmnSDZvln851lqay1pYM3cK/Z1Mp+me/1S0nRY+OBWzTzQ0PUUEjtV58+XcEOsd/H009YC83j+cOAWWVVBRbaxL1uP4YMlXZQp/2Gnat/k+GHTtLEvWyD+RRb7zklf2IXes7cvrQ9xsC9f2GNn8RW4eClp7rqxqKiGrdq0Glny9rEvX+x+PXt7scv6OrMvGVngpbEv0bPztbFvdA+tzXTR7MXdItQO66KZM55OcLAva1j4PGveN4i0dagjrK2S5VU1Q60dJMW+FDAo8mlH+3ZfVeNv6SRlVLOP+Tb2VSdDGbI8dlanxL77u1kvpJkIShs5gCVbU9mzU4UGKfaVuyzFvnPl2FfutaN9y1IMmrtu/A0k//qpiaKPa3ylpi9V77op9lXbHqfedWP2VVprta917qez7vZgsa+z+dQFDx2NhQ9u3btuyeTVg4q9AinYSL2iY5YPZXHbM9VSgZVsC1l2er2sqn7xSVr7ek8zPxa/UFpVusgZOjKXqWsyN9/FWLJUk/edTx5Z/Sz2DWWfnQttYl+PwN3G4PI7HOzr3b14ZXoSX4HB+btJ19Nq38B0pvcx6bKR7PO+rqHsxl+u0a+ZfFyd2pemJ1jsO2C9oXq7a6jWvoGpMZRbbzHNQH+KKYmwdHhVkK4hYoe22hHey8m0UPJpdZF1z4Mu9LSlDmWE1Yf7WZUJEaQZau0gqfZtTog3Odp3alZ+vaWTFNFM/TJs7KtOhjJkc+J3U6wg27dosPVCmomgcXGT2ffnDyqJoXA576t0WepJ+kbieV+51472dT/LYvdCaQyUN5AcZqc308j07VLTexYYbeyrtv3sLKt9ldZa7Wud+5wSd50/z/s6zGdyEpnzc6i5Hmsf3JJ532h2J7s5sXwYU1iatxDPfDwn1fW9ufJGMVNfgX9gVlRVXkPh/PNhnBylDPAeGqvsJIrxD/GKfExdk/tYqvCZ9B6qfSlsrmtBjmbP0ZZRc9Oe1dq3i29C/Kgik4N9pwUJ85Q9Dz0Tood0tdo3R5jO7rYLQXb2lVtXOC8+ku95OCuUD57h1L4j4uvlvG8azY9MTJ9bb5P31eXlZ0zubjGN6d6Sgn0Rlg4btrC7/zqbatMEIblcEPzKKFlQ6vBIDREKwi11KCOsPhwxLTquW7nNUGsGSbWvKfoOcrQvRYbwD9tKJ0NTJ5d3tbGvOhnqkD02dt4dBbJ9d4fwPQ/yhTQTwYSbwW967vBLGTZC2fMgdVmiX2Q03/Mg99rRvmyLRQrb88DHIFR5A0lJDcHMElLJUtONZ/meB6t91baP8eZ7HmT7Kq212lcz94Hlz67kex4c5rOZ7bTYx4L2QKx90KH+1u16GzVvAM43y+4WDK2vomvzTdvhPv7XLTLK6Z+oRY3sAO/lq2yUvoHzCQDs+zNXoCmtoJUvL8ulXlkxN2WHe4SRuWTj9UqN9nN2R6k6PZs6pH1v8HwCAPv+TPvmRyS38uUrBe+EwpuzwwsF4b0d1yuUMLa3k7NFIbHUMe17g+cTAHzHGQAAwL4AAABgXwAAgH0BAADAvgAAAPsCAADsC/sCAADsCwAAsC8AAADYFwAAYF8AAACwLwAAwL4AAABgXwAAuJntCwAAoM1h9tUDAABoY2BfAACAfQEAAPYFAAAA+wIAAOwLAAAA9gUAANgXAAAA7AsAALAvAAAA2BcAAGBfAACAfQEAAMC+AAAA+wIAAIB9AQCgPdq3obQzuKkpfRDvXADao31LJ2Bcbm4mlGIMAGiP9u2MYbnZwRQBAPsC2BcAAPvCvgAA2BfAvgAA2Bf2BQDAvgD2BQD2hX1hXwAA7AtgXwBgXwD7AgBgX4ApAgD2BbAvAAD2hX0BAO3Zvrf/x1XreGB4q8vePt7JyW1u/4mJgH0BgH2dL+3hE1tvX7uy/+VWeU37TphZqX24YI3lxzmz17hNdDgLYF8AkHlwal87rmdfO2avs/y488vS8RMdzgLYF4COYN9/zNzgNn6qlE3ofPftLz/5fOPwMw+cuEuvz1xxZsNvv1bsu/PtUw/MrrRmHhoyn9Lrj7N4terSBDfGbKt971r38oYzr7IHD4+/dH64Ww8p88CrfnT2S+zsXY8+9c7xRu7bt/krZsr2ZWcxWbAvAB3Jvg2ZX1deLn1Jtu+pmT90vjT7heErlr3L7HvqZGWpW5VkX/OpFRcvn7i70Zr3vfsz/eUNmS/pV/zRPvY9sWFS5YHMi/qLmSsqq86r9l322uVt57lpH37ykcplD+v1ukvDNfZlZzFZsC8AHcm+l92mWoza+VEdC0lPsbj3bebETJ4LeHy2ZF/mWL3+kUvHrPZd94L+3Re+WqD/qrOdff+Q+ble3/jkCf1rv2Un3lXte5w9KOW53QMH9PrXf8MSvRt0GvvyswD2BaAjZR7OHH/i9h8V+55nj5//ih2eYFmBTB6brjgv2Xe2m8SCSnaYKJV9eFnjbz5b8aUu81XZvifZMz9w++5028leN/GPkmL1/23JPLAHwx9gCn+Sxb3/YOZ9XNaubF/pLIB9AehI9tX98Nr5ZVVK3pfbdya37+OqfcfL9n1dKX3x4kU5S8ESv8efqlpTdalRtm8De+ZB2b4XeSzr1L6P6vVPPcpC67s2LKjMrNLYVzoLYF8AOtqehzNPOLOvlHl4XbJv51N/0Nvt97174oZHdJlfspTEm3aZhwXsh/P2mQfVvuuk+3Nfvl2qJHpl+66bjamCfQHoWPbd2XmO/vKpUmf2PW6961Z56u1tjTtfq9TYd90yVmbmMlZZw7Iqm7tuL79auSJzgv6iG7vrtsbevmu4m/VVy8Zztz9SVTX+8aqn1LMA9gWg49j3x6/c3DInNjqzb+l4N8uOsx9nP7nh7teNGvs+7Mburq1w41vLnr/ajrPMl991a7Cx7xfLHtRLeV63beyfRimbvEY9C2BfAPDXFsy+V70R9vmZVl//6+O2jz97wVkp52dhXwAA7KvlpZlPtKqCz481nDxud7EFVc5KOj8L+wIAYF8tyx5/qVUVvJaZuWZFI+YA9gUA9sXShn0BALAvgH0BgH0B7AsAgH1hXwwBALAvgH0BALAv7AsAgH0B7AsAgH1hXwAA7AtgXwBgX9gX9gUA3Bz2LZ2Acbm5mVCKMQCgPdr3wdLO4KamtBLvXADao30BAADAvgAAAPsCAACAfQEAAPYFAAAA+wIAAOwLAAAA9gUAANgXAABgXwAAALAvAAB0APt6NGIYAACgbWn0IL3ZHeMAAABti7uZ9AZPjAMAALQtngbS65NiMBAAANCWJCXpif9T7I7cLwAAtBGN7p5Jesm+eoPZ4zYAAABtgofZoFfsCwAAoI35P2mmBuVQpUF1AAAAAElFTkSuQmCC)

The **Route Namespace** is the URL prefix for all Simple JWT Login REST endpoints. The default is `simple-jwt-login/v1/`.

Change this only if you need to avoid a conflict with another plugin. The value is trimmed of leading and trailing slashes automatically.

```
https://example.com/wp-json/simple-jwt-login/v1/auth
                             ^^^^^^^^^^^^^^^^^^^
                             route namespace
```

caution

If you change the route namespace after you have already issued JWTs, any existing links that embed the old endpoint URL (e.g. autologin links in emails) will stop working.

***

## JWT Verification Rules[​](#jwt-verification-rules "Direct link to JWT Verification Rules")

![JWT Verification Rules](/assets/images/jwt-verification-rules-45f49cd24c059beebb1127d24dd66806.png)

JWT Verification Rules let you use **different signing algorithms and keys** for different tokens - chosen dynamically based on a claim inside the token itself. This is useful when:

* You accept JWTs from multiple identity providers (Auth0, Google, your own service)
* Different clients were issued tokens under different algorithms
* You want to migrate keys without forcing all users to re-authenticate at once

The rules are evaluated in order. The first rule whose condition matches is used; if none matches, the **ELSE** (default) rule is used.

### How a rule works[​](#how-a-rule-works "Direct link to How a rule works")

Each rule has three parts:

**IF** - a condition that inspects a claim in the incoming JWT

| Field          | Options                          | Description                                          |
| -------------- | -------------------------------- | ---------------------------------------------------- |
| JWT Part       | `Payload claim` / `Header claim` | Which part of the JWT to inspect                     |
| Claim Key      | text                             | The key to look up (e.g. `iss`, `alg`, `x-provider`) |
| Operator       | `equals` / `contains`            | Comparison to apply                                  |
| Expected Value | text                             | The value the claim must match                       |

**THEN USE** - the algorithm and key to apply when the condition matches

| Field                       | Description                                          |
| --------------------------- | ---------------------------------------------------- |
| Algorithm                   | `HS256`, `HS384`, `HS512`, `RS256`, `RS384`, `RS512` |
| Secret Key (HS\*)           | Symmetric secret; optionally Base64-encoded          |
| Public / Private Key (RS\*) | PEM-encoded RSA key pair                             |

**IDENTIFY** - how to look up the WordPress user from the token payload

| Field            | Options                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| Identify user by | `Email address` / `WordPress User ID` / `WordPress Username`                 |
| JWT payload key  | The payload field that holds the identifier (e.g. `email`, `sub`, `user.id`) |

Use dot notation for nested values - e.g. `user.id` to read `{ "user": { "id": 42 } }`.

### The ELSE rule (required default)[​](#the-else-rule-required-default "Direct link to The ELSE rule (required default)")

The **ELSE** row is always present and cannot be removed. It is used when no IF rule matches, or when no IF rules have been added.

The ELSE row has four steps:

**Step 1 - Key source:**

| Option                                  | Description                                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Plugin Settings *(recommended)*         | The secret is entered directly in the settings form                                                |
| Code (`wp-config.php` or custom plugin) | Define `SIMPLE_JWT_PRIVATE_KEY` (and `SIMPLE_JWT_PUBLIC_KEY` for RS\* algorithms) as PHP constants |

Storing the key in code keeps it out of the database. Example for `wp-config.php`:

```
define('SIMPLE_JWT_PRIVATE_KEY', 'my-super-secret-key');
define('SIMPLE_JWT_PUBLIC_KEY', '-----BEGIN PUBLIC KEY-----\n...');
```

**Step 2 - Algorithm:** Select the signing algorithm (`HS256`, `HS384`, `HS512`, `RS256`, `RS384`, `RS512`).

**Step 3 - Verification Key:** Enter the secret key (HS\*) or public/private key pair (RS\*). For HS\* algorithms, check "JWT key is Base64 encoded" if your key is Base64-encoded.

**Step 4 - User Identification:** Which JWT payload field identifies the WordPress user.

| Field            | Options                                                                           |
| ---------------- | --------------------------------------------------------------------------------- |
| Identify user by | `Email address` / `WordPress User ID` / `WordPress Username`                      |
| JWT payload key  | The payload field name that holds the identifier (e.g. `email`, `sub`, `user.id`) |

Use dot notation for nested values, e.g. `user.id` to read `{ "user": { "id": 42 } }`.

### Example: multi-provider setup[​](#example-multi-provider-setup "Direct link to Example: multi-provider setup")

| Rule | Condition                                  | Algorithm | Key               |
| ---- | ------------------------------------------ | --------- | ----------------- |
| IF   | `iss` equals `https://auth0.example.com/`  | RS256     | Auth0 public key  |
| IF   | `iss` equals `https://accounts.google.com` | RS256     | Google public key |
| ELSE | *(fallback)*                               | HS256     | Your site secret  |

***

## JWT Input Sources[​](#jwt-input-sources "Direct link to JWT Input Sources")

![JWT Input Sources](/assets/images/jwt-input-sources-37e5715034848b8e1f1bb6c0ddff142f.png)

The plugin must know where to look for the JWT in each incoming request. Enable at least one source. When the JWT is present in multiple locations, the higher-priority source wins.

| Source    | Default parameter name   | Default status | Example                                 |
| --------- | ------------------------ | -------------- | --------------------------------------- |
| `REQUEST` | `JWT`                    | Enabled        | `?JWT=your.token.here`                  |
| `SESSION` | `simple-jwt-login-token` | Disabled       | `$_SESSION['simple-jwt-login-token']`   |
| `COOKIE`  | `simple-jwt-login-token` | Disabled       | `$_COOKIE['simple-jwt-login-token']`    |
| `HEADER`  | `Authorization`          | Enabled        | `Authorization: Bearer your.token.here` |

You can rename the parameter for each source. For example, changing the REQUEST name from `JWT` to `token` means clients send `?token=...` instead of `?JWT=...`.

note

The recommended approach is to keep **HEADER** enabled and send tokens as `Authorization: Bearer <token>`. This is the most widely adopted pattern and avoids tokens appearing in access logs.

***

## Integration Options[​](#integration-options "Direct link to Integration Options")

![Integration Options](data:image/png;base64,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)

### JWT Middleware for all WordPress endpoints[​](#jwt-middleware-for-all-wordpress-endpoints "Direct link to JWT Middleware for all WordPress endpoints")

When enabled, **any** WordPress REST API request that includes a valid JWT will be automatically authenticated as the identified user before WordPress processes the request.

This lets you do things like creating posts or accessing user-specific data through the standard WordPress REST API (`/wp/v2/*`) using a Simple JWT Login token - without any extra plugin.

```
curl -X POST "https://example.com/wp-json/wp/v2/posts" \
  -H "Authorization: Bearer YOUR_JWT" \
  --form title="Hello World" \
  --form content="Post body here" \
  --form status="publish"
```

***

## Security Options[​](#security-options "Direct link to Security Options")

![Security Options](data:image/png;base64,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)

### Enable safe redirects[​](#enable-safe-redirects "Direct link to Enable safe redirects")

When enabled, the plugin uses WordPress's `wp_safe_redirect()` for all redirects instead of `wp_redirect()`. This restricts redirect destinations to the same host and a configured allow-list, preventing open redirect vulnerabilities.

Enable this option unless you have a specific reason to redirect to external domains.
