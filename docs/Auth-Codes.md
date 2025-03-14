---
slug: /auth-codes/
title: Auth Codes
sidebar_position: 3
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Auth codes are optional, but you can enable them for:
 - Auto-login
 - Register User
 - Delete user
 - Reset and Change Password
 - Authenticate
 
The Auth Codes can have any format and this feature allows you to add a layer of protection to your API routes.

:::caution
For security reasons, please make sure you set complex string for the AUTH CODES values.
:::

The Auth codes contain 3 parts:
1. Authentication Key: This is the actual code that you have to add to the request.
2. WordPress new User Role: can be used when you want to create multiple user types with the create user endpoint. If you leave it blank, the value configured in the ‘Register Settings’ will be used.
3. Expiration Date: This allows you to set an expiration date for your auth codes. The format is `Y-M-D H:m:s`.
 Example : `2020-12-24 23:00:00`
 

:::note
Please note that, if you leave the expiration date blank, it will never expire.
:::



## Screenshot
![](https://github.com/nicumicle/simple-jwt-login/blob/master/wordpress.org/assets/screenshot-8.png?raw=true)
