---
slug: /protect-endpoints/
title: Protect Endpoints
sidebar_position: 11
author: Nicu Micle
author_url: https://github.com/nicumicle
---

This plugin allows you to protect some specific endpoints, or all endpoints. So, if an endpoint is protected,
you will need to pass a `JWT` parameter to your request, in order to be able to access the endpoint. 

## Screenshot

![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-11.png?raw=true)

## How it works

You have two options:
 - Protect all endpoints
 - Protect only specific endpoints

### a. Protect all endpoints
 This option, will apply for all endpoints, except the one you define in the "Whitelist".
 In order to skip some endpoints for being protected, you need to add each endpoint by clicking on the "Add Endpoints +".

### b. Protect only specific endpoints
  This option, will apply only for the endpoints that you defined in the "Protect endpoints".
  In order to add a new protected endpoint, you need to add each the "Add Endpoint".
  
### Examples

You save in `Protect` or `Whitelist`  the following:
  ```
   /wp/v2/users
  ```


The `Action` that you have selected, will apply for the following URLs:
  - `http://yoursite.com/?rest_route=/wp/v2/users`
  - `http://yoursite.com/wp-json/wp/v2/users`

### How to pass the JWT

The JWT can be added in header, request URI, request body, session or cookie, based on the allowed options that you have set in the plugin "General" settings.

Here is a simple example:

`http://yoursite.com/wp-json/wp/v2/users?JWT=yourJWThere`

or

`http://yoursite.com/?rest_route=/wp/v2/users&JWT=yourJWThere`
 
