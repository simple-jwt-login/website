---
slug: /code_examples/php/register_and_get_jwt
title: Register a WordPress user with PHP and get the jwt
sidebar_position: 1
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Introduction

In the dynamic realm of WordPress development, user authentication plays a pivotal role. 

One powerful tool in this arena is the Simple JWT Login plugin, offering seamless integration of JSON Web Tokens (JWT) for secure user registration and authentication.

In this article, we'll walk through the process of crafting a simple script to register a WordPress user, obtain a JWT, and validate its authenticity through a test call.

For this example, we can create a helper function, that will do the actual call:
```php
<?php

/**
 * @param $method string Can be one of the following: GET, POST, PUT, DELETE
 * @param $endpoint string Endpoint where we will do the call
 * @param $data array Parameters that needs to be sent to the endpoint
 * @param $headers array Request headers
 * @return string
 * @throws \Exception
 *
 */
function call($method, $endpoint, $data = array(), $headers = array())
{
    // Initialize cURL session
    $ch = curl_init();

    // Set the cURL options
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method));
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // Execute cURL session and get the result
    $result = curl_exec($ch);

    // Check for cURL errors
    if (curl_errno($ch)) {
        throw new \Exception(curl_error($ch));
    }

    // Close cURL session
    curl_close($ch);

    return $result;
}
```

## Getting Started: Registering a WordPress User

To kick things off, let's delve into the creation of a straightforward script that registers a user on a WordPress site.
We'll leverage the capabilities of the Simple JWT Login endpoint, which provides a user-friendly and efficient solution for user registration.

:::note
Please note that, in order to be able to register a new user, you need have "Allow Register: yes" in the plugin settings.
:::

```php
<?php
$domain = "http://localhost:88";
$headers = array(
    "Content-Type: application/json"
);
$data = array(
    "email" => "test". random_int(0, 10000). "@localhost.com",
    "password" => "my secret password",
    "first_name" => "my firstname",
    "last_name" => "my last name",
);

try{
   // Step 1: Register User
    $result = call("POST", $domain . "?rest_route=/simple-jwt-login/v1/users", $data, $headers);
    $responseJSON = json_decode($result, true);
    if ($responseJSON === false) {
        throw new \Exception("Response is not a JSON:", $result);
    }

    // In case of error, success will be false
    if (!$responseJSON['success']) {
        throw new \Exception($responseJSON['data']['message']);
    }

    $userID = $responseJSON['id'];
   $userID = $responseJSON['id'];
   echo "Your new user ID is: ". $userID . PHP_EOL;
} catch (\Exception $exception) {
   // Unable to do the call
   echo "Error while registering the user: ". $exception->getMessage() . PHP_EOL;
}
```

## Acquiring the JWT

Once the user registration is complete, the next step is to obtain a JSON Web Token.
The JWT serves as a secure and efficient way to authenticate users without compromising sensitive information.
Ensure that your WordPress site is configured to issue JWTs through Simple JWT Login.

:::note
Please note that, in order to use the Authentication endpoint, you need have "Allow Authentication: yes" in the plugin settings.
:::

```php
<?php
$domain = "http://localhost:88";
$headers = array(
    "Content-Type: application/json"
);
$data = array (
  "email" => "test@localhost.com",
  "password" => "my secret password",
);

try{
    $result = call("POST", $domain . "?rest_route=/simple-jwt-login/v1/auth", $data, $headers);
    $responseJSON = json_decode($result, true);
    if ($responseJSON === false) {
        throw new \Exception("Auth response is not a JSON:", $result);
    }
    // In case of error, suscess will be false
    if (!isset($responseJSON['success']) || !$responseJSON['success']) {
        $error = "Error while getting the JWT";
        if (isset($responseJSON['data']['message'])) {
            $error .= $responseJSON['data']['message'];
        }
        throw new \Exception($responseJSON['data']['message']);
    }

    if (!isset($responseJSON['data']['jwt'])) {
        throw new \Exception("The JWT is missing from API Response.");
    }
    // Your new JWT that you can use in other endpoints
    $jwt = $responseJSON['data']['jwt'];
    echo "Your new token is: ". $jwt;
}catch (\Exception $exception) {
    echo "Error while trying to get the token: ". $exception->getMessage(). PHP_EOL;
}
```

## Validation Through Test Call: Create a new WordPress Post

With the JWT in hand, the final step involves performing a test call to validate its authenticity. 
This is a crucial security measure to ensure that the token was issued correctly and is ready for use in subsequent authentication processes.

:::note
In order to use the JWT on all endpoint, you need to enable "All WordPress endpoints checks for JWT authentication" from the plugin General Settings.
:::

In this example, we will create a new WordPress post:
```php
<?php
$domain = "http://localhost:88";   
$jwt = "..."; // Replace with the JWT you obtained in the previous step
$headers = array(
    "Content-type: application/json",
    "Authorization: " . $jwt
);
// New Post parameters
$data = array(
    "title" => "Post Title",
    "excerpt" => "test",
);
try {
    $result = call("POST", $domain . "?rest_route=/wp/v2/posts", $data, $headers);
    $responseJSON = json_decode($result, true);

    // Final Step: Post create response
    echo "Post create Response: " . print_r($responseJSON, true) . PHP_EOL;
} catch (\Exception $exception){
  echo "Unable to create post:"  . $exception->getMessage();
}
```

## Full Example

Within this segment, you'll find a comprehensive illustration covering the following:
1. Registering a user on WordPress
2. Obtaining a JSON Web Token (JWT) 
3. Creating a new post on your WordPress website

```php
<?php

/**
 * @param $method string Can be one of the following: GET, POST, PUT, DELETE
 * @param $endpoint string Endpoint where we will do the call
 * @param $data array Parameters that needs to be sent to the endpoint
 * @param $headers array Request headers
 * @return string
 * @throws \Exception
 *
 */
function call($method, $endpoint, $data = array(), $headers = array())
{
    // Initialize cURL session
    $ch = curl_init();

    // Set the cURL options
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method));
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // Execute cURL session and get the result
    $result = curl_exec($ch);

    // Check for cURL errors
    if (curl_errno($ch)) {
        throw new \Exception(curl_error($ch));
    }

    // Close cURL session
    curl_close($ch);

    return $result;
}

$domain = "http://localhost:88";
$headers = array(
    "Content-Type: application/json"
);
$data = array(
    "email" => "test". random_int(0, 10000). "@localhost.com",
    "password" => "my secret password",
    "first_name" => "my firstname",
    "last_name" => "my last name",
);

try {
    // Step 1: Register User
    $result = call("POST", $domain . "?rest_route=/simple-jwt-login/v1/users", $data, $headers);
    $responseJSON = json_decode($result, true);
    if ($responseJSON === false) {
        throw new \Exception("Response is not a JSON:", $result);
    }

    var_dump($responseJSON);
    // In case of error, suscess will be false
    if (!$responseJSON['success']) {
        throw new \Exception($responseJSON['data']['message']);
    }

    $userID = $responseJSON['id'];

    // Step 2: Get a JWT
    $result = call("POST", $domain . "?rest_route=/simple-jwt-login/v1/auth", $data, $headers);
    $responseJSON = json_decode($result, true);
    if ($responseJSON === false) {
        throw new \Exception("Auth response is not a JSON:", $result);
    }
    // In case of error, suscess will be false
    if (!isset($responseJSON['success']) || !$responseJSON['success']) {
        $error = "Error while getting the JWT";
        if (isset($responseJSON['data']['message'])) {
            $error .= $responseJSON['data']['message'];
        }
        throw new \Exception($responseJSON['data']['message']);
    }

    if (!isset($responseJSON['data']['jwt'])) {
        throw new \Exception("The JWT is missing from API Response.");
    }
    // Your new JWT that you can use in other endpoints
    $jwt = $responseJSON['data']['jwt'];

    // Step 3: Create a new WordPress post
    $headers = array(
        "Content-type: application/json",
        "Authorization: " . $jwt
    );
    $data = array(
        "title" => "Post Title",
        "excerpt" => "test",
    );

    $result = call("POST", $domain . "?rest_route=/wp/v2/posts", $data, $headers);
    $responseJSON = json_decode($result, true);

    // Final Step: Post have been created
    echo "Post have been created: " . print_r($responseJSON, true) . PHP_EOL;

} catch (\Exception $exception) {
    echo "There was an error: " . $exception->getMessage() . PHP_EOL;
}
```