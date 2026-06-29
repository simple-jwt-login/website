---
slug: /integrations/third-party/woocommerce/
title: WooCommerce
sidebar_position: 4
description: Use a JWT to authenticate the WooCommerce REST API and Store API. Manage products, and run a fully headless cart & checkout with the token alone - no consumer key/secret.
keywords: [WooCommerce JWT authentication, headless WooCommerce, WooCommerce Store API JWT, WooCommerce REST API JWT, Simple JWT Login WooCommerce, headless checkout WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Requires the [WooCommerce](https://woocommerce.com/) plugin to be installed and activated.

## What it does

When a JWT is sent on a WooCommerce REST request, the plugin authenticates the request as the identified WordPress user **before WooCommerce checks permissions** - so you can drive the store with a JWT instead of a consumer key / secret.

It covers every `/wc/` route:

- **Classic CRUD API** (`/wc/v3`, `/wc/v2`, `/wc/v1`) - products, orders, customers, coupons, settings, ...
- **Store API** (`/wc/store/v1`) - the customer-facing cart & checkout used by headless storefronts.

This works even when the global **"All WordPress endpoints check for JWT"** middleware is disabled - it is scoped to WooCommerce routes only.

:::info Capabilities still apply
A JWT only establishes **who** the user is. To manage products/orders the token must belong to an **Administrator** or **Shop Manager**. A customer token can browse, manage its own cart, and check out - but not edit the catalog or other people's orders.
:::

## Enable

Toggle **Enable** on the WooCommerce card under **Settings → Simple JWT Login → Integrations → Third Party Integrations**.

Send the token in the `Authorization` header (no consumer key/secret needed):

```bash
# List products as an admin/shop-manager
curl "https://example.com/wp-json/wc/v3/products" \
  -H "Authorization: Bearer YOUR_JWT"

# Create a product
curl -X POST "https://example.com/wp-json/wc/v3/products" \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo product","type":"simple","regular_price":"12.99"}'
```

## Store API cart & checkout

The Store API (`/wc/store/v1/cart`, `/wc/store/v1/checkout`) normally requires a **CSRF nonce** on every write (add to cart, checkout). A headless, token-only client has no nonce, so those writes are rejected with:

> Missing the Nonce header. This endpoint requires a valid nonce.

Enable **Store API cart & checkout** (second toggle on the WooCommerce card) to let requests that carry a **Bearer JWT in the `Authorization` header** skip the nonce check.

```bash
# Add an item to the cart - JWT only, no nonce
curl -X POST "https://example.com/wp-json/wc/store/v1/cart/add-item" \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{"id":123,"quantity":1}'

# Place the order
curl -X POST "https://example.com/wp-json/wc/store/v1/checkout" \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{
        "billing_address":{"first_name":"Jane","last_name":"Doe","address_1":"123 Main St","city":"Springfield","state":"CA","postcode":"12345","country":"US","email":"jane@example.com","phone":"5551234567"},
        "payment_method":"cod"
      }'
```

:::warning Security note
The nonce is WooCommerce's CSRF protection. It is **only** skipped for tokens sent in the `Authorization` header - browsers do not attach that header automatically across origins, so those requests are not exposed to CSRF. Tokens sent via **cookie or URL always keep the nonce**. Leave this toggle off unless you run a headless / decoupled storefront, and always serve the API over **HTTPS**.
:::

For logged-in (JWT) users the cart persists by user ID, so no cart cookie is needed between requests.

## Requirements summary

| Requirement | Why |
|---|---|
| WooCommerce active | Provides the `/wc/` REST routes |
| WooCommerce integration **Enabled** | Authenticates the JWT on `/wc/` routes |
| **Store API cart & checkout** toggle | Lets header-JWT requests skip the Store API nonce (cart/checkout) |
| Admin / Shop Manager token | Required only to manage products & orders |
| A payment method (e.g. Cash on Delivery) | So checkout can complete |
| HTTPS | A bearer token must never travel over plain HTTP |
| CORS enabled | For cross-origin browser clients |

See a complete browser implementation in the [Headless WooCommerce store (Vanilla JS)](../../code_examples/woocommerce-headless-store.md) code example.
