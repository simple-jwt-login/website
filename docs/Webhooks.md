---
slug: /webhooks/
title: Webhooks
sidebar_position: 14
description: Fire HTTP notifications to external endpoints on login, register, auth, and other Simple JWT Login events. Configure URL, method, headers, and a custom JSON payload.
keywords: [WordPress webhook, JWT webhook, WordPress REST API webhook, Simple JWT Login webhook, HTTP notification WordPress, event-driven WordPress]
author: Nicu Micle
author_url: https://github.com/nicumicle
---

Webhooks let you push notifications to any external HTTP endpoint when plugin events occur - no polling required. Use them to sync user activity to a CRM, trigger CI pipelines, send Slack alerts, or integrate with any service that accepts HTTP calls.

Webhooks are **disabled by default**. Enable them in **Settings → Simple JWT Login → Webhooks → Config**.

---

## Configuration

### Enable Webhooks

Toggle the **Enable Webhooks** switch at the top of the Webhooks page to activate the feature. Each individual webhook also has its own enable/disable toggle, so you can disable specific hooks without deleting them.

---

### Adding a Webhook

Click **Add Webhook** to create a new entry. Each webhook is configured with the following fields:

#### Endpoint URL

The full URL that will receive the HTTP request when the event fires.

```
https://example.com/webhook
```

#### HTTP Method

The HTTP verb to use when calling the endpoint. Supported methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.

Default: `POST`

#### Trigger Events

Select one or more events that will fire this webhook. Each event corresponds to a specific plugin action:

| Event | Trigger |
| :---- | :------ |
| `login` | User successfully auto-logged in via JWT |
| `register` | New WordPress user successfully registered |
| `auth` | User authenticated and received a JWT |
| `delete_user` | WordPress user account deleted via the API |
| `reset_password_request` | Password reset code requested |
| `reset_password` | Password successfully changed |

---

### Custom Headers

Add any number of custom HTTP headers to the webhook request. This is useful for passing authentication tokens or content-type hints to the receiving service.

Example:
```
X-Secret-Token : my-shared-secret
Content-Type   : application/json
```

---

### Custom Payload

By default, the plugin sends a standard JSON payload. To override it, enter a JSON template in the **Custom Payload** textarea.

Use the following template variables - they are replaced at delivery time with real values:

| Variable | Description |
| :------- | :---------- |
| `{{user_id}}` | WordPress user ID of the user involved in the event |
| `{{user_email}}` | Email address of the user |
| `{{event}}` | The event name that triggered the webhook (e.g. `login`) |

Example custom payload:

```json
{
  "user_id": "{{user_id}}",
  "email": "{{user_email}}",
  "event": "{{event}}",
  "source": "my-wordpress-site"
}
```

Leave the field blank to use the default payload.

---

## Webhook Logs

Every outgoing webhook request is logged. View the log under **Settings → Simple JWT Login → Webhooks → Logs**.

Each log entry shows:
- The webhook URL that was called
- The HTTP method used
- The event that triggered it
- The response status code
- The timestamp

:::tip
Webhook logs help you debug delivery failures. If a webhook is not reaching your endpoint, check the log for the HTTP status code returned by your server.
:::

---

## Security Recommendations

- Use **HTTPS** endpoints only - avoid sending event data over plain HTTP.
- Pass a shared secret in a custom header (e.g. `X-Webhook-Secret`) and verify it on the receiving side to ensure the request originated from your site.
- Validate the payload on the receiver before acting on it.

---

## Example: Notify Slack on User Registration

1. Create a Slack Incoming Webhook URL in your Slack workspace.
2. In the plugin, add a new webhook with that URL.
3. Set the method to `POST`.
4. Enable the `register` event.
5. Set a custom payload:

```json
{
  "text": "New user registered: {{user_email}}"
}
```

Slack will display the message in your chosen channel each time a new user registers.
