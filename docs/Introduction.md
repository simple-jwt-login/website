---
slug: /
title: Introduction
sidebar_position: 0
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Simple-JWT-Login is a **FREE** WordPress plugin that allows you to use a JWT on WordPress REST endpoints.

Simple-JWT-Login enhances the WordPress REST API with JSON Web Token (JWT) authentication, ensuring a secure connection for mobile apps, external websites, and third-party services to access your WordPress content via REST endpoints.

The main purpose of this plugin is to allow Mobile apps, or other websites to access the content from a WordPress website via REST endpoints in a secure way.

## Requirements

- PHP version >= **5.5**
- WordPress version >= **4.4.0** 


## Installation
Here’s how you install and activate the JWT-login plugin:

- Download the Simple-JWT-login plugin from [https://wordpress.org/plugins/simple-jwt-login](https://wordpress.org/plugins/simple-jwt-login). 
- Upload the .zip file in your WordPress plugin directory.
- Activate the plugin from the “Plugins” menu in WordPress.


<b>Or you can install it directly from WordPress</b>

- Go to the *Plugins* menu in WordPress and click `Add New`
- Search for '*Simple JWT Login*' and select `Install Now`
- Activate the plugin when prompted


## Configuration

1. Go to “General section”
2. Set a “JWT Decryption key”. With this key, we will validate your JWT.
3. Choose “JWT Decryption algorithm”.
4. Save Changes

:::caution

For security reasons, please make sure you use a complex decryption key and also include special characters in your decryption key.

:::

## Request Parameters

You can send the request parameters:
 - Form Data
 - Query parameters
 - Request body ( as JSON )
 

## Get JWT from option
By default, only the REQUEST is `on`.  This means that the plugin will search in the request for the JWT. 

Also, you set to search in: 
1. REQUEST ( plugin will search for the `JWT` key : `&JWT=your_jwt`)
2. SESSION ( plugin will search for the `simple-jwt-login-token` key:  `$_SESSION['simple-jwt-login-token']`)
3. COOKIE ( plugin will search for the `simple-jwt-login-token` key: `$_COOKIE['simple-jwt-login-token']`)
4. HEADER ( plugin will search in the `Authorization` header: `Authorization: Bearer YOUR_JWT_HERE`)

If JWT is provided in multiple places, the higher number of the option will overwrite the smaller one.

For example, let's say you will send a JWT in REQUEST and in HEADER. The header JWT will be used. 

:::note

I recommend you to enable the HEADER option, and always send the JWT in the header.

:::

## Allow JWT usage on all endpoints
 
In order to use this feature, you will need to check "All WordPress endpoints checks for JWT authentication" in the "General" section.
When a JWT is found, first, you will be authenticated as the user in the JWT, and then the call to the endpoint will be made.

For example, you can create posts, as a specific user, if you provide a JWT in your request.

```bash
curl -X POST "https://simplejwtlogin.com/wp-json/wp/v2/posts?content=PostContent&title=PostTitle" \
    -d '{"JWT":"YOUR_JWT_HERE"}'
```

or 

```bash
curl -X POST "https://simplejwtlogin.com/wp-json/wp/v2/posts" \
    -H "Authorization: Bearer YOUR_JWT_HERE" \
    --form title="Title" \
    --form content="My content" \
    --form type="page"
```

For the second example, you need to make sure that you allow search for JWT in the header( you can set this in: General settings -> Get JWT token from )

:::note

When you pass the `JWT` parameter, it is not case-sensitive. You can also pass it as `jwt`.

:::

## General settings screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-2.png?raw=true)


