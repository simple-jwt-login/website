# How to Authenticate WordPress GraphQL Queries with Simple JWT Login and WPGraphQL

March 10, 2026 ·

<!-- -->

6 min read

[![Nicu Micle](https://github.com/nicumicle.png)](/blog/authors/nicumicle.md)

[Nicu Micle](/blog/authors/nicumicle.md)

Creator of Simple JWT Login

[](https://x.com/nicumicle "X")[](https://github.com/nicumicle "GitHub")

GraphQL and headless WordPress are a natural match. WPGraphQL gives you a flexible, typed query layer over all your WordPress data. But like the REST API, it's unauthenticated by default - anyone can query it. Simple JWT Login solves that.

In this guide I'll walk through connecting Simple JWT Login to WPGraphQL so your GraphQL operations can carry a JWT, granting access to protected data and enabling authenticated mutations like creating posts or updating user profiles.

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

You'll need two plugins installed and active:

* **WPGraphQL** - available at [wpgraphql.com](https://www.wpgraphql.com)
* **Simple JWT Login** - available in the [WordPress plugin repository](https://wordpress.org/plugins/simple-jwt-login/)

No additional bridge plugin is required. Simple JWT Login's WPGraphQL integration is built in.

***

## How It Works[​](#how-it-works "Direct link to How It Works")

The integration is straightforward: Simple JWT Login generates and validates JWTs using its standard `/auth` endpoint. When a request hits the WPGraphQL endpoint (`/wp-json/graphql` or `/graphql`), Simple JWT Login intercepts it, validates the bearer token, and - if valid - sets the current WordPress user context before WPGraphQL resolves the query.

From WPGraphQL's perspective, the request simply arrives as an authenticated WordPress user. Every resolver that checks `current_user_can()` or relies on `wp_get_current_user()` works exactly as it would in a browser session.

***

## Step 1 - Configure Simple JWT Login[​](#step-1---configure-simple-jwt-login "Direct link to Step 1 - Configure Simple JWT Login")

Navigate to **Simple JWT Login** in your WordPress admin. The core settings you need:

**General tab:**

* Set a strong **JWT Decryption Key**
* Choose **HS256** as your algorithm (or RS256 for asymmetric setups)
* Set a sensible **JWT expiration** (e.g. 3600 seconds / 1 hour)

**WPGraphQL tab:**

Enable the WPGraphQL integration:

```
Settings > Simple JWT Login > WPGraphQL > Enable WPGraphQL authentication
```

That's the only required toggle. The plugin will now validate JWT tokens on every request to your GraphQL endpoint.

***

## Step 2 - Obtain a JWT[​](#step-2---obtain-a-jwt "Direct link to Step 2 - Obtain a JWT")

Use the standard auth endpoint to get a token:

```
curl -X POST "https://example.com/wp-json/simple-jwt-login/v1/auth" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "editor@example.com",
    "password": "their_password"
  }'
```

Response:

```
{
  "success": true,
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

***

## Step 3 - Make Authenticated GraphQL Queries[​](#step-3---make-authenticated-graphql-queries "Direct link to Step 3 - Make Authenticated GraphQL Queries")

Pass the token as a bearer token in the `Authorization` header on every GraphQL request:

```
curl -X POST "https://example.com/graphql" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "query": "{ viewer { id name email roles { nodes { name } } } }"
  }'
```

Without the token, `viewer` returns `null`. With it, you get the full authenticated user object:

```
{
  "data": {
    "viewer": {
      "id": "dXNlcjoyNQ==",
      "name": "Jane Editor",
      "email": "editor@example.com",
      "roles": {
        "nodes": [{ "name": "editor" }]
      }
    }
  }
}
```

***

## Step 4 - Authenticated Mutations[​](#step-4---authenticated-mutations "Direct link to Step 4 - Authenticated Mutations")

This is where the integration becomes genuinely useful. Many WPGraphQL mutations require an authenticated user. Creating a post, for example:

```
curl -X POST "https://example.com/graphql" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "query": "mutation CreatePost($input: CreatePostInput!) { createPost(input: $input) { post { id title status } } }",
    "variables": {
      "input": {
        "title": "My First API Post",
        "content": "Written via GraphQL with JWT auth.",
        "status": "PUBLISH",
        "clientMutationId": "create-post-1"
      }
    }
  }'
```

Without authentication, this mutation returns a permission error. With a valid JWT for a user who has the `editor` or `administrator` role, it succeeds and returns the created post.

***

## Using the Integration in a JavaScript Client[​](#using-the-integration-in-a-javascript-client "Direct link to Using the Integration in a JavaScript Client")

In a Next.js or React app, you'll typically store the JWT after login and attach it to every GraphQL request. Here's how that looks with a simple fetch-based client:

```
const GQL_ENDPOINT = 'https://example.com/graphql';

async function graphqlRequest(query, variables = {}, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  return response.json();
}

// Login and get a token
async function login(email, password) {
  const response = await fetch(
    'https://example.com/wp-json/simple-jwt-login/v1/auth',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }
  );
  const data = await response.json();
  return data.data.jwt;
}

// Example usage
const token = await login('editor@example.com', 'password');

const { data } = await graphqlRequest(
  `{ viewer { name email } }`,
  {},
  token
);

console.log(data.viewer); // { name: 'Jane Editor', email: 'editor@example.com' }
```

If you're using Apollo Client, set the token in your auth link:

```
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ uri: 'https://example.com/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt'); // or however you store it
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

***

## Enriching Queries with Custom JWT Claims[​](#enriching-queries-with-custom-jwt-claims "Direct link to Enriching Queries with Custom JWT Claims")

Sometimes you want to avoid an extra `viewer` query on page load by embedding user metadata directly in the token. Use the `simple_jwt_login_jwt_payload` filter to add whatever your front-end needs:

```
add_filter('simple_jwt_login_jwt_payload', function($payload, $user) {
    $payload['wp_roles']     = $user->roles;
    $payload['display_name'] = $user->display_name;
    $payload['avatar_url']   = get_avatar_url($user->ID, ['size' => 48]);
    return $payload;
}, 10, 2);
```

Your Apollo or fetch client can decode the JWT (it's just base64) and read these values without any extra network request:

```
function decodeJwtPayload(token) {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}

const payload = decodeJwtPayload(token);
console.log(payload.display_name); // "Jane Editor"
console.log(payload.wp_roles);     // ["editor"]
```

***

## Protecting the GraphQL Endpoint Itself[​](#protecting-the-graphql-endpoint-itself "Direct link to Protecting the GraphQL Endpoint Itself")

By default, WPGraphQL allows unauthenticated introspection queries, which exposes your full schema to anyone. You can lock this down at two levels:

**WPGraphQL side:** Disable public introspection in WPGraphQL settings.

**Simple JWT Login side:** Add the GraphQL endpoint to your protected routes:

```
Settings > Simple JWT Login > Protect Endpoints
Add route: /graphql
Methods: GET, POST
```

This ensures every GraphQL request - including introspection - must carry a valid JWT. Ideal for private internal APIs.

***

## Token Refresh for Long-Running Sessions[​](#token-refresh-for-long-running-sessions "Direct link to Token Refresh for Long-Running Sessions")

GraphQL apps often run as SPAs where the user stays on the page for extended periods. Implement proactive token refresh to avoid mid-session 401s:

```
function isTokenExpiringSoon(token, bufferSeconds = 300) {
  const { exp } = decodeJwtPayload(token);
  return (exp - bufferSeconds) < (Date.now() / 1000);
}

async function refreshToken(currentToken) {
  const response = await fetch(
    'https://example.com/wp-json/simple-jwt-login/v1/auth/refresh',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ JWT: currentToken }),
    }
  );
  const data = await response.json();
  return data.data.jwt;
}

// Before each GraphQL request:
if (isTokenExpiringSoon(storedToken)) {
  storedToken = await refreshToken(storedToken);
  // persist updated token
}
```

***

## Conclusion[​](#conclusion "Direct link to Conclusion")

Simple JWT Login and WPGraphQL complement each other cleanly. WPGraphQL handles the query layer; Simple JWT Login handles identity. The integration requires no extra plugins, just a single settings toggle, and the result is a fully authenticated GraphQL API that honours WordPress's existing user roles and capabilities.

From there, the hooks system gives you room to customize the JWT payload, and the endpoint protection feature lets you lock down the GraphQL route to authenticated traffic only. It's a solid foundation for any headless WordPress application built on GraphQL.

**Tags:**

* [Tutorial](/blog/tags/tags/tutorial.md "Tutorials and guides for Simple JWT Login")
* [WPGraphQL](/blog/tags/tags/wpgraphql.md "Integrating Simple JWT Login with WPGraphQL")
* [JWT Authentication](/blog/tags/tags/jwt-authentication.md "Articles about JSON Web Token (JWT) authentication")
* [Headless WordPress](/blog/tags/tags/headless-wordpress.md "Articles about headless WordPress architecture and JWT authentication")

[Edit this page](https://github.com/simple-jwt-login/website/tree/main/blog/2026-03-10-wpgraphql-jwt-authentication.md)
