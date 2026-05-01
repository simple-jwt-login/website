---
slug: /code_examples/php/register_and_get_jwt
title: Register a WordPress user with PHP and get the jwt
sidebar_position: 1
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Introduction

This example walks through a complete PHP integration with Simple-JWT-Login: registering a new WordPress user, obtaining a JWT for that user, and using the token to create a WordPress post via the REST API.

It covers the three most common steps in a headless WordPress workflow:
1. **Register** - create a new user account
2. **Authenticate** - exchange credentials for a JWT
3. **Use the JWT** - call a protected endpoint

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

## Step 1: Register a WordPress user

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
    echo "Your new user ID is: " . $userID . PHP_EOL;
} catch (\Exception $exception) {
   // Unable to do the call
   echo "Error while registering the user: ". $exception->getMessage() . PHP_EOL;
}
```

## Step 2: Obtain a JWT

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
    // In case of error, success will be false
    if (!isset($responseJSON['success']) || !$responseJSON['success']) {
        $error = isset($responseJSON['data']['message'])
            ? $responseJSON['data']['message']
            : "Error while getting the JWT";
        throw new \Exception($error);
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

## Step 3: Use the JWT to create a WordPress post

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

## Full example

The script below combines all three steps: register, authenticate, and create a post.

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

    // In case of error, success will be false
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
    // In case of error, success will be false
    if (!isset($responseJSON['success']) || !$responseJSON['success']) {
        $error = isset($responseJSON['data']['message'])
            ? $responseJSON['data']['message']
            : "Error while getting the JWT";
        throw new \Exception($error);
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