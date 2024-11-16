---
title: CORS Setup on Apache Server
description: In this article, we are going to explain how to set up CORS on your server
slug: /cors-setup-apache/
hide_table_of_contents: false
authors: nicumicle
tags: [tutorials]
---

All the time I have issues setting up [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) on my server. I was always struggling with this, and this time I was thinking maybe it is a good time to create a blog article about this.

So, In this tutorial, we are going to set up CORS on an apache server.

<!--truncate-->
## How to know that there is a CORS issue?

First, try to call your endpoint from the browser using Javascript. If you see in your console something like: 

```
Access to ... at 'http://....' from origin 'http://..' has been blocked 
by CORS policy: Response to preflight request doesn't pass access control
check: No 'Access-Control-Allow-Origin' header is present in the requested resource.
```

So, if you see something related to 'CORS' in the console, that means that you have some CORS issues on your server.

## How to fix this?

The first step that you need to do, is to connect to your server via SSH.

On your server, you have to make sure that the headers mod is enabled. 
```bash
sudo a2enmod headers
```
After this, you will see something like this: 
```
Enabling module headers.
To activate the new configuration, you need to run:
  service apache2 restart
```

If the headers have been enabled before, you will get a message like this: 
```
Module headers already enabled
```

The next step is to edit the apache2 conf file.
```bash
vi /etc/apache2/apache2.conf
```

If your website is running from `/var/www/html`, in this file, search for: 

```
<Directory /var/www/html">
```
If you can not find that, just add it at the end of the file:
```bash
<Directory "/var/www/html">
    AllowOverride None
    Require all granted

    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "x-requested-with, Content-Type, origin, authorization, accept, client-security-token"
    Header set Access-Control-Expose-Headers "Content-Security-Policy, Location"
    Header set Access-Control-Max-Age "600"

    RewriteEngine On
    RewriteCond %{REQUEST_METHOD} OPTIONS
    RewriteRule ^(.*)$ $1 [R=200,L]

</Directory>
```

Now, you just need to restart the apache:
```bash
sudo service apache2 restart
```

After this, you will be able to make HTTP calls to your server from the browser.

Enjoy.

