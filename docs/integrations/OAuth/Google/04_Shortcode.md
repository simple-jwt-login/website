---
slug: /integrations/oauth/google/shortcode
title: Google Login Shortcode for WordPress
sidebar_label: Shortcode
description: Use the Simple JWT Login shortcode to render a "Continue with Google" button on any WordPress page or post, with custom colors and size.
keywords: [WordPress shortcode, Google login button, Continue with Google, Simple JWT Login shortcode]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

## Usage

Place this shortcode anywhere on your WordPress site to render a "Continue with Google" button:

```
[simple-jwt-login-oauth provider="google"]
```

---

## Customization Options

| Option | Description | Example |
| :----- | :---------- | :------ |
| `provider` | `required` Provider name | `google` |
| `background` | Button background color | `#c8c8c8` |
| `color` | Button text color | `#f2f2f2` |
| `width` | Button width | `250px` |
| `height` | Button height | `40px` |
| `border` | Button border style | `1px solid #000` |

---

## Full Example

```
[simple-jwt-login-oauth provider="google" background="#c8c8c8" color="#f2f2f2" width="250px" height="40px" border="1px dotted blue"]
```

## Next steps

- [Set up Google OAuth](./01_Setup.md)
- [Compare all OAuth providers](../index.md)
