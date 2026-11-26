---
title: CORS Setup on Apache Server
description: Step-by-step guide to configuring CORS on an Apache server so your headless frontend can call the WordPress REST API with Simple JWT Login.
keywords: [CORS, Apache, WordPress REST API, headless WordPress, JWT authentication]
slug: /cors-setup-apache/
hide_table_of_contents: false
authors: nicumicle
tags: [tutorials]
image: /assets/images/social-card.png
---

:::warning Updated November 2026
This post was written for Simple JWT Login 3.x. On current versions, set CORS in the plugin under **Settings → Simple JWT Login → CORS** instead of Apache - see [CORS](/docs/cors/). Since version 4.1.1, a browser app on another domain can authenticate with a JWT only when its origin is listed in **Allow origin**, and a `*` origin never trusts cookie or session JWTs. Use the Apache setup below only for routes the plugin doesn't handle.
:::

Browsers block JavaScript calls from one domain to another unless the server allows them with [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) headers. This tutorial shows how to add those headers on an Apache server.

<!--truncate-->
## How to Spot a CORS Issue

Call your endpoint from the browser with JavaScript. A CORS issue shows an error like this in the console:

```
Access to ... at 'http://....' from origin 'http://..' has been blocked
by CORS policy: Response to preflight request doesn't pass access control
check: No 'Access-Control-Allow-Origin' header is present in the requested resource.
```

## Fix It in Apache

Connect to your server over SSH and enable the Apache `headers` module:

```bash
sudo a2enmod headers
```

Apache confirms it:

```
Enabling module headers.
To activate the new configuration, you need to run:
  service apache2 restart
```

If the module is already on, the output is `Module headers already enabled`.

Next, open the Apache configuration file:

```bash
sudo vi /etc/apache2/apache2.conf
```

If your site runs from `/var/www/html`, find the `<Directory "/var/www/html">` block, or add it at the end of the file. Replace `https://app.example.com` with the origin of your front-end:

```
<Directory "/var/www/html">
    AllowOverride All
    Require all granted

    Header set Access-Control-Allow-Origin "https://app.example.com"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "x-requested-with, Content-Type, origin, authorization, accept"
    Header set Access-Control-Expose-Headers "Location"
    Header set Access-Control-Max-Age "600"
    Header merge Vary "Origin"

    RewriteEngine On
    RewriteCond %{REQUEST_METHOD} OPTIONS
    RewriteRule ^(.*)$ $1 [R=200,L]
</Directory>
```

Keep `AllowOverride All`: WordPress needs its `.htaccess` file for pretty permalinks and the `/wp-json/` routes. Avoid `Access-Control-Allow-Origin "*"`, because it lets any website call your API from a visitor's browser.

Don't set the same headers in Apache and in the plugin's CORS settings. Browsers reject a response that has two `Access-Control-Allow-Origin` headers.

Restart Apache to apply the changes:

```bash
sudo service apache2 restart
```

Your front-end can now call the server from the browser.
