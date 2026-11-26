import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faKey, faShieldHalved, faLayerGroup,
  faArrowRight, faCheckCircle, faRocket, faPalette,
  faBell, faClipboardList, faToggleOn, faWrench, faGauge,
  faVial, faCode, faRotate, faUserShield, faTriangleExclamation,
  faDownload, faLock, faUserPlus, faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import Translate, {translate} from '@docusaurus/Translate';
import CheckList from '@site/src/components/CheckList';
import styles from './styles.module.css';
import v4Styles from './v4.module.css';

const BADGE_NEW = translate({id: 'v4.features.badgeNew', message: 'New'});
const BADGE_IMPROVED = translate({id: 'v4.features.badgeImproved', message: 'Improved'});

const newFeatures = [
  {
    icon: faKey,
    badge: BADGE_NEW,
    title: translate({id: 'v4.features.apiKeys.title', message: 'API Keys'}),
    desc: translate({id: 'v4.features.apiKeys.desc', message: 'Create long-lived, scoped credentials for server-to-server integrations, CI/CD pipelines, and third-party services - no JWT expiry management needed.'}),
    bullets: [
      translate({id: 'v4.features.apiKeys.bullet1', message: 'Scoped permissions: read, create, update, delete'}),
      translate({id: 'v4.features.apiKeys.bullet2', message: 'SHA-256 hashed - the key is never stored in plain text'}),
      translate({id: 'v4.features.apiKeys.bullet3', message: 'Revoke or expire keys at any time'}),
      translate({id: 'v4.features.apiKeys.bullet4', message: 'JWT authentication also accepted on the /api-keys endpoint'}),
      translate({id: 'v4.features.apiKeys.bullet5', message: 'Non-admin users can manage their own keys without admin access'}),
    ],
    link: '/docs/api-keys/',
    cta: translate({id: 'v4.features.apiKeys.cta', message: 'API Keys docs'}),
  },
  {
    icon: faShieldHalved,
    badge: BADGE_NEW,
    title: translate({id: 'v4.features.oauth.title', message: 'OAuth: 4 Providers'}),
    desc: translate({id: 'v4.features.oauth.desc', message: 'Users can sign in with Google, Auth0, Facebook, or GitHub and receive a WordPress JWT - no password form required.'}),
    bullets: [
      translate({id: 'v4.features.oauth.bullet1', message: 'Google: authorization code or ID token (Sign In With Google)'}),
      translate({id: 'v4.features.oauth.bullet2', message: 'Auth0: authorization code flow'}),
      translate({id: 'v4.features.oauth.bullet3', message: 'Facebook: authorization code flow'}),
      translate({id: 'v4.features.oauth.bullet4', message: 'GitHub: authorization code flow'}),
      translate({id: 'v4.features.oauth.bullet5', message: 'Auto-register users if no matching account exists'}),
    ],
    link: '/docs/integrations/oauth/',
    cta: translate({id: 'v4.features.oauth.cta', message: 'OAuth docs'}),
  },
  {
    icon: faLayerGroup,
    badge: BADGE_NEW,
    title: translate({id: 'v4.features.multiKeys.title', message: 'Multiple JWT Decryption Keys'}),
    desc: translate({id: 'v4.features.multiKeys.desc', message: 'Define multiple decryption keys and let the plugin pick the right one automatically based on the JWT header or payload.'}),
    bullets: [
      translate({id: 'v4.features.multiKeys.bullet1', message: 'Key selection based on JWT header or payload field'}),
      translate({id: 'v4.features.multiKeys.bullet2', message: 'Supports HS256/384/512 and RS256/384/512 per key'}),
      translate({id: 'v4.features.multiKeys.bullet3', message: 'Seamless key rotation without breaking existing tokens'}),
    ],
    link: '/docs/authentication/',
    cta: translate({id: 'v4.features.multiKeys.cta', message: 'Auth docs'}),
  },
  {
    icon: faClipboardList,
    badge: BADGE_NEW,
    title: translate({id: 'v4.features.auditLogs.title', message: 'Audit Logs'}),
    desc: translate({id: 'v4.features.auditLogs.desc', message: 'Every authentication event - logins, token issues, revocations, and errors - is now logged for auditing and debugging.'}),
    bullets: [
      translate({id: 'v4.features.auditLogs.bullet1', message: 'Logs login, register, delete, OAuth, 2FA, and token events'}),
      translate({id: 'v4.features.auditLogs.bullet2', message: 'Searchable from the WordPress admin'}),
      translate({id: 'v4.features.auditLogs.bullet3', message: 'Configurable retention period'}),
    ],
    link: '/docs/audit-logs/',
    cta: translate({id: 'v4.features.auditLogs.cta', message: 'Audit Logs docs'}),
  },
  {
    icon: faBell,
    badge: BADGE_NEW,
    title: translate({id: 'v4.features.webhooks.title', message: 'Webhooks'}),
    desc: translate({id: 'v4.features.webhooks.desc', message: 'Fire HTTP callbacks on authentication events - integrate with Slack, logging services, or any external system in real time.'}),
    bullets: [
      translate({id: 'v4.features.webhooks.bullet1', message: 'Configurable per event type'}),
      translate({id: 'v4.features.webhooks.bullet2', message: 'Custom URL, method, headers, and JSON payload'}),
      translate({id: 'v4.features.webhooks.bullet3', message: 'Works with any HTTP endpoint'}),
    ],
    link: '/docs/webhooks/',
    cta: translate({id: 'v4.features.webhooks.cta', message: 'Webhooks docs'}),
  },
  {
    icon: faGauge,
    badge: BADGE_NEW,
    title: translate({id: 'v4.features.dashboard.title', message: 'Dashboard'}),
    desc: translate({id: 'v4.features.dashboard.desc', message: 'A new at-a-glance status page shows every feature\'s state in one place - routes, security, integrations, and monitoring.'}),
    bullets: [
      translate({id: 'v4.features.dashboard.bullet1', message: 'All routes and their enabled/disabled state'}),
      translate({id: 'v4.features.dashboard.bullet2', message: 'Security - CORS, Protect Endpoints, Auth Codes, API Keys'}),
      translate({id: 'v4.features.dashboard.bullet3', message: 'Monitoring - Webhooks, Webhook Logs, Audit Logs'}),
    ],
    link: '/docs/dashboard/',
    cta: translate({id: 'v4.features.dashboard.cta', message: 'Dashboard docs'}),
  },
  {
    icon: faPalette,
    badge: BADGE_IMPROVED,
    title: translate({id: 'v4.features.settingsUi.title', message: 'Redesigned Settings UI'}),
    desc: translate({id: 'v4.features.settingsUi.desc', message: 'The plugin admin panel has been fully redesigned - cleaner layout, better grouping, and less noise so you can find what you need faster.'}),
    bullets: [
      translate({id: 'v4.features.settingsUi.bullet1', message: 'Reorganized sections for a more logical flow'}),
      translate({id: 'v4.features.settingsUi.bullet2', message: 'User identification consolidated in General settings'}),
      translate({id: 'v4.features.settingsUi.bullet3', message: 'Cleaner forms with improved field descriptions'}),
      translate({id: 'v4.features.settingsUi.bullet4', message: 'Light/Dark mode support'}),
    ],
    link: '/docs/dashboard/',
    cta: translate({id: 'v4.features.settingsUi.cta', message: 'Dashboard docs'}),
  },
  {
    icon: faUserShield,
    badge: BADGE_NEW,
    title: translate({id: 'v4.features.twoFa.title', message: '2FA Support'}),
    desc: translate({id: 'v4.features.twoFa.desc', message: 'Require a second authentication step before issuing a full JWT - compatible with the WordPress Two Factor plugin.'}),
    bullets: [
      translate({id: 'v4.features.twoFa.bullet1', message: 'Interim JWT issued after password check; 2FA code completes the flow'}),
      translate({id: 'v4.features.twoFa.bullet2', message: 'Dedicated POST /auth/2fa endpoint'}),
      translate({id: 'v4.features.twoFa.bullet3', message: 'Configurable interim JWT TTL (1-60 minutes)'}),
      translate({id: 'v4.features.twoFa.bullet4', message: 'Users without 2FA configured are unaffected'}),
    ],
    link: '/docs/integrations/third-party/two-factor/',
    cta: translate({id: 'v4.features.twoFa.cta', message: '2FA docs'}),
  },
  {
    icon: faCartShopping,
    badge: BADGE_NEW,
    title: translate({id: 'v4.features.woocommerce.title', message: 'WooCommerce'}),
    desc: translate({id: 'v4.features.woocommerce.desc', message: 'Drive a WooCommerce store with a JWT instead of a consumer key/secret - manage products and run a fully headless cart & checkout with the token alone.'}),
    bullets: [
      translate({id: 'v4.features.woocommerce.bullet1', message: 'JWT auth on every /wc/ route: CRUD (wc/v3) and the Store API (wc/store)'}),
      translate({id: 'v4.features.woocommerce.bullet2', message: 'Scoped to WooCommerce routes - works even with the global middleware off'}),
      translate({id: 'v4.features.woocommerce.bullet3', message: 'Optional Store API cart & checkout: header-JWT requests skip the CSRF nonce'}),
      translate({id: 'v4.features.woocommerce.bullet4', message: 'Admin / Shop Manager tokens manage the catalog; customers manage their own cart'}),
    ],
    link: '/docs/integrations/third-party/woocommerce/',
    cta: translate({id: 'v4.features.woocommerce.cta', message: 'WooCommerce docs'}),
  },
  {
    icon: faRotate,
    badge: BADGE_IMPROVED,
    title: translate({id: 'v4.features.refreshToken.title', message: 'Refresh Token'}),
    desc: translate({id: 'v4.features.refreshToken.desc', message: 'Refresh tokens are now more secure and configurable - rolling rotation, a separate encryption key, and custom payload support.'}),
    bullets: [
      translate({id: 'v4.features.refreshToken.bullet1', message: 'Rolling rotation: each refresh issues a new token and invalidates the old one'}),
      translate({id: 'v4.features.refreshToken.bullet2', message: 'Separate refresh token secret key, independent of the JWT signing key'}),
      translate({id: 'v4.features.refreshToken.bullet3', message: 'Custom payload merged into the newly issued JWT on refresh'}),
      translate({id: 'v4.features.refreshToken.bullet4', message: 'Auth Code protection option for the refresh endpoint'}),
    ],
    link: '/docs/refresh-token/',
    cta: translate({id: 'v4.features.refreshToken.cta', message: 'Refresh Token docs'}),
  },
  {
    icon: faVial,
    badge: BADGE_NEW,
    title: translate({id: 'v4.features.jwtDecoder.title', message: 'JWT Decoder'}),
    desc: translate({id: 'v4.features.jwtDecoder.desc', message: 'Paste any JWT directly in the WordPress admin panel to inspect its header and payload - no external tools needed.'}),
    bullets: [
      translate({id: 'v4.features.jwtDecoder.bullet1', message: 'Decodes header and payload instantly in the browser'}),
      translate({id: 'v4.features.jwtDecoder.bullet2', message: 'Token is never sent to the server'}),
      translate({id: 'v4.features.jwtDecoder.bullet3', message: 'Useful for debugging token claims and expiry'}),
    ],
    link: '/docs/dashboard/',
    cta: translate({id: 'v4.features.jwtDecoder.cta', message: 'Learn more'}),
  },
  {
    icon: faCode,
    badge: BADGE_NEW,
    title: translate({id: 'v4.features.codeExamples.title', message: 'Code Examples'}),
    desc: translate({id: 'v4.features.codeExamples.desc', message: 'Every endpoint page in the plugin admin panel now shows ready-to-copy code snippets tailored to your current settings.'}),
    bullets: [
      translate({id: 'v4.features.codeExamples.bullet1', message: 'cURL, PHP, and JavaScript examples per endpoint'}),
      translate({id: 'v4.features.codeExamples.bullet2', message: 'Examples use your configured namespace and site URL'}),
      translate({id: 'v4.features.codeExamples.bullet3', message: 'Auth Code and parameter values pre-filled from your settings'}),
    ],
    link: '/docs/code-examples/',
    cta: translate({id: 'v4.features.codeExamples.cta', message: 'Code Examples'}),
  },
  {
    icon: faLock,
    badge: BADGE_IMPROVED,
    title: translate({id: 'v4.features.protectEndpoints.title', message: 'Protect Endpoints Redesign'}),
    desc: translate({id: 'v4.features.protectEndpoints.desc', message: 'Protect Endpoints has been rethought as a single ordered rules table - each rule sets access to Public, JWT required, or JWT + Roles, and the first matching rule wins.'}),
    bullets: [
      translate({id: 'v4.features.protectEndpoints.bullet1', message: 'Unified rules table replaces separate whitelist and protected lists'}),
      translate({id: 'v4.features.protectEndpoints.bullet2', message: 'Per-rule access level - Public, JWT required, or JWT + specific Roles'}),
      translate({id: 'v4.features.protectEndpoints.bullet3', message: 'Top-to-bottom evaluation with first-match-wins logic'}),
      translate({id: 'v4.features.protectEndpoints.bullet4', message: 'Existing settings auto-migrate on first load'}),
      translate({id: 'v4.features.protectEndpoints.bullet5', message: 'Role names are validated against WordPress on save'}),
    ],
    link: '/docs/protect-endpoints/',
    cta: translate({id: 'v4.features.protectEndpoints.cta', message: 'Protect Endpoints docs'}),
  },
  {
    icon: faUserPlus,
    badge: BADGE_IMPROVED,
    title: translate({id: 'v4.features.registration.title', message: 'Registration Enhancements'}),
    desc: translate({id: 'v4.features.registration.desc', message: 'User registration is now more flexible - assign multiple default roles, trigger built-in WordPress notification emails, and use variables in reset password email subjects.'}),
    bullets: [
      translate({id: 'v4.features.registration.bullet1', message: 'Support multiple default user roles on registration'}),
      translate({id: 'v4.features.registration.bullet2', message: 'Option to send the default WordPress welcome email on registration'}),
      translate({id: 'v4.features.registration.bullet3', message: 'Option to send the default WordPress password-changed email from the change-password endpoint'}),
      translate({id: 'v4.features.registration.bullet4', message: 'Variables now supported in the reset password email subject line'}),
    ],
    link: '/docs/register-user/',
    cta: translate({id: 'v4.features.registration.cta', message: 'Register User docs'}),
  },
  {
    icon: faToggleOn,
    badge: BADGE_IMPROVED,
    title: translate({id: 'v4.features.tokenControls.title', message: 'Granular Token Controls'}),
    desc: translate({id: 'v4.features.tokenControls.desc', message: 'Enable or disable refresh, revoke, and validate token endpoints independently - ship only the surface area your app needs.'}),
    bullets: [
      translate({id: 'v4.features.tokenControls.bullet1', message: 'Toggle refresh token endpoint on/off'}),
      translate({id: 'v4.features.tokenControls.bullet2', message: 'Toggle revoke token endpoint on/off'}),
      translate({id: 'v4.features.tokenControls.bullet3', message: 'Toggle validate token endpoint on/off'}),
      translate({id: 'v4.features.tokenControls.bullet4', message: 'Optionally require the "Bearer" prefix in the Authorization header'}),
    ],
    link: '/docs/authentication/',
    cta: translate({id: 'v4.features.tokenControls.cta', message: 'Auth docs'}),
  },
  {
    icon: faWrench,
    badge: BADGE_IMPROVED,
    title: translate({id: 'v4.features.improvements.title', message: 'Improvements & Code Quality'}),
    desc: translate({id: 'v4.features.improvements.desc', message: 'Standardized HTTP status codes across all endpoints and a cleaner, more maintainable internal codebase.'}),
    bullets: [
      translate({id: 'v4.features.improvements.bullet1', message: 'Client errors return a matching HTTP status (400, 401, 403, 404, 422, or 429) instead of 500 - 404 and 429 since 4.2.0'}),
      translate({id: 'v4.features.improvements.bullet2', message: 'Refactored internal service layer for better separation of concerns'}),
      translate({id: 'v4.features.improvements.bullet3', message: 'Improved unit test coverage across all core services'}),
      translate({id: 'v4.features.improvements.bullet4', message: 'Reduced code duplication across service classes'}),
    ],
    link: '/docs/error-codes/',
    cta: translate({id: 'v4.features.improvements.cta', message: 'Error codes'}),
  },
];

const breakingChanges = [
  {
    title: translate({id: 'v4.breaking.registerResponse.title', message: 'Register user response shape changed'}),
    detail: (
      <Translate
        id="v4.breaking.registerResponse.detail"
        values={{
          postUsers: <code>POST /users</code>,
          oldShape: <code>{'{"success":true,"id":1,"message":"...","user":{"ID":1,...},"roles":[...]}'}</code>,
          newShape: <code>{'{"success":true,"data":{"id":1,...,"roles":[...]}}'}</code>,
          data: <code>data</code>,
          message: <code>message</code>,
          userLogin: <code>user_login</code>, login: <code>login</code>,
          userNicename: <code>user_nicename</code>, nicename: <code>nicename</code>,
          userEmail: <code>user_email</code>, email: <code>email</code>,
          userUrl: <code>user_url</code>, url: <code>url</code>,
          userRegistered: <code>user_registered</code>, registered: <code>registered</code>,
          userStatus: <code>user_status</code>, status: <code>status</code>,
        }}
      >
        {'{postUsers} used to return {oldShape}. It now returns {newShape}. The user fields and roles are nested under {data}, {message} is gone, and these fields were renamed: {userLogin} → {login}, {userNicename} → {nicename}, {userEmail} → {email}, {userUrl} → {url}, {userRegistered} → {registered}, {userStatus} → {status}.'}
      </Translate>
    ),
    action: (
      <Translate id="v4.breaking.registerResponse.action" values={{data: <code>data</code>}}>
        {'Update any code that reads user fields from the register response - check both the new nesting under {data} and the renamed field keys.'}
      </Translate>
    ),
    link: '/docs/register-user/',
    linkLabel: translate({id: 'v4.breaking.registerResponse.linkLabel', message: 'Register User docs'}),
  },
  {
    title: translate({id: 'v4.breaking.legacyRegister.title', message: 'Legacy /register endpoint removed'}),
    detail: translate({id: 'v4.breaking.legacyRegister.detail', message: 'The old POST /simple-jwt-login/v1/register route no longer exists. The canonical route is POST /simple-jwt-login/v1/users.'}),
    action: translate({id: 'v4.breaking.legacyRegister.action', message: 'Update all callers to use POST /simple-jwt-login/v1/users.'}),
    link: '/docs/register-user/',
    linkLabel: translate({id: 'v4.breaking.legacyRegister.linkLabel', message: 'Register User docs'}),
  },
  {
    title: translate({id: 'v4.breaking.userIdentification.title', message: 'User Identification moved to General settings'}),
    detail: translate({id: 'v4.breaking.userIdentification.detail', message: 'The "User Identification" option (email, login, ID) has moved from the Delete User settings tab to the General settings tab. It now applies globally to all endpoints.'}),
    action: translate({id: 'v4.breaking.userIdentification.action', message: 'After upgrading, verify the User Identification value in Settings → Simple JWT Login → General.'}),
    link: '/docs/configuration/',
    linkLabel: translate({id: 'v4.breaking.userIdentification.linkLabel', message: 'General settings docs'}),
  },
  {
    title: translate({id: 'v4.breaking.settingsStorage.title', message: 'Settings storage structure reorganized'}),
    detail: (
      <Translate id="v4.breaking.settingsStorage.detail" values={{wpOptions: <code>wp_options</code>}}>
        {'The internal layout of plugin options in {wpOptions} has changed. Existing settings are migrated automatically on first load, but the old keys are removed.'}
      </Translate>
    ),
    action: translate({id: 'v4.breaking.settingsStorage.action', message: 'Review every settings tab after upgrading to confirm values carried over correctly.'}),
    link: null,
    linkLabel: null,
  },
  {
    title: (
      <Translate id="v4.breaking.authRefreshToken.title" values={{refreshToken: <code>refresh_token</code>}}>
        {'Authentication response now includes {refreshToken}'}
      </Translate>
    ),
    detail: (
      <Translate id="v4.breaking.authRefreshToken.detail" values={{postAuth: <code>POST /auth</code>, refreshToken: <code>refresh_token</code>}}>
        {'{postAuth} returns a new {refreshToken} field when the refresh token feature is enabled. The JWT field itself is unchanged.'}
      </Translate>
    ),
    action: translate({id: 'v4.breaking.authRefreshToken.action', message: 'No action needed unless your client strictly rejects unexpected response fields or you need to store the token.'}),
    link: '/docs/refresh-token/',
    linkLabel: translate({id: 'v4.breaking.authRefreshToken.linkLabel', message: 'Refresh Token docs'}),
  },
  {
    title: translate({id: 'v4.breaking.twoFa.title', message: '2FA changes the /auth flow for affected users'}),
    detail: translate({id: 'v4.breaking.twoFa.detail', message: 'Users with the Two Factor plugin configured now receive a short-lived interim JWT from /auth instead of a full JWT. A second request to POST /auth/2fa (with the interim JWT + 2FA code) is required to get the real token.'}),
    action: translate({id: 'v4.breaking.twoFa.action', message: 'Update your authentication flow to handle the interim JWT case, or leave 2FA disabled for API users.'}),
    link: '/docs/integrations/third-party/two-factor/',
    linkLabel: translate({id: 'v4.breaking.twoFa.linkLabel', message: '2FA docs'}),
  },
  {
    title: translate({id: 'v4.breaking.protectedStatus.title', message: 'Protected endpoint auth failures return 401 instead of 403'}),
    detail: translate({id: 'v4.breaking.protectedStatus.detail', message: 'When the Protect Endpoint feature blocks an unauthenticated request, the plugin previously returned HTTP 403 Forbidden. It now returns HTTP 401 Unauthorized to align with the HTTP spec.'}),
    action: translate({id: 'v4.breaking.protectedStatus.action', message: 'Update any code that checks specifically for status 403 on protected routes to handle 401 instead.'}),
    link: '/docs/protect-endpoints/',
    linkLabel: translate({id: 'v4.breaking.protectedStatus.linkLabel', message: 'Protect Endpoint docs'}),
  },
  {
    title: (
      <Translate id="v4.breaking.errorField.title" values={{errorCode: <code>errorCode</code>, errorCodeSnake: <code>error_code</code>}}>
        {'Error field renamed: {errorCode} → {errorCodeSnake}'}
      </Translate>
    ),
    detail: (
      <Translate id="v4.breaking.errorField.detail" values={{errorCode: <code>errorCode</code>, errorCodeSnake: <code>error_code</code>}}>
        {'In v3, the error field in responses was named {errorCode} (camelCase). In v4, it is renamed to {errorCodeSnake} (snake_case) to match the naming convention used across the API.'}
      </Translate>
    ),
    action: (
      <Translate
        id="v4.breaking.errorField.action"
        values={{respErrorCode: <code>response.errorCode</code>, respDataErrorCode: <code>response.data.errorCode</code>, errorCodeSnake: <code>error_code</code>}}
      >
        {'Update all error-handling code that reads {respErrorCode} (or {respDataErrorCode}) to use {errorCodeSnake} instead.'}
      </Translate>
    ),
    link: '/docs/error-codes/',
    linkLabel: translate({id: 'v4.breaking.errorField.linkLabel', message: 'Error codes docs'}),
  },
];

const perfRows = [
  {
    endpoint: translate({id: 'v4.perf.endpoint.registerUser', message: 'Register User'}),
    route: 'POST /simple-jwt-login/v1/users',
    v3: { min: '0.370s', avg: '0.471s', median: '0.418s', p95: '0.906s', max: '1.406s' },
    v4: { min: '0.233s', avg: '0.255s', median: '0.255s', p95: '0.273s', max: '0.286s' },
    deltaP95: '-70%', trend: 'better', noteRef: null,
  },
  {
    endpoint: translate({id: 'v4.perf.endpoint.autologin', message: 'Autologin with JWT'}),
    route: 'GET /simple-jwt-login/v1/autologin',
    v3: { min: '0.114s', avg: '0.133s', median: '0.127s', p95: '0.174s', max: '0.224s' },
    v4: { min: '0.113s', avg: '0.125s', median: '0.122s', p95: '0.134s', max: '0.310s' },
    deltaP95: '-23%', trend: 'better', noteRef: null,
  },
  {
    endpoint: translate({id: 'v4.perf.endpoint.createPostJwt', message: 'Create Post (JWT)'}),
    route: 'POST /wp/v2/posts (JWT bearer token)',
    v3: { min: '0.152s', avg: '0.175s', median: '0.168s', p95: '0.208s', max: '0.376s' },
    v4: { min: '0.130s', avg: '0.144s', median: '0.139s', p95: '0.170s', max: '0.227s' },
    deltaP95: '-18%', trend: 'better', noteRef: null,
  },
  {
    endpoint: translate({id: 'v4.perf.endpoint.createPostApiKey', message: 'Create Post (API Key)'}),
    route: 'POST /wp/v2/posts (API key)',
    v3: null,
    v4: { min: '0.133s', avg: '0.160s', median: '0.144s', p95: '0.279s', max: '0.357s' },
    deltaP95: translate({id: 'v4.perf.deltaNew', message: 'new'}), trend: 'new', noteRef: 1,
  },
  {
    endpoint: translate({id: 'v4.perf.endpoint.validateToken', message: 'Validate Token'}),
    route: 'POST /simple-jwt-login/v1/auth/validate',
    v3: { min: '0.080s', avg: '0.088s', median: '0.087s', p95: '0.101s', max: '0.111s' },
    v4: { min: '0.084s', avg: '0.090s', median: '0.088s', p95: '0.098s', max: '0.120s' },
    deltaP95: '-3%', trend: 'better', noteRef: null,
  },
  {
    endpoint: translate({id: 'v4.perf.endpoint.authUser', message: 'Auth User'}),
    route: 'POST /simple-jwt-login/v1/auth',
    v3: { min: '0.128s', avg: '0.138s', median: '0.136s', p95: '0.151s', max: '0.217s' },
    v4: { min: '0.146s', avg: '0.174s', median: '0.153s', p95: '0.152s', max: '0.162s' },
    deltaP95: '+1%', trend: 'neutral', noteRef: null,
  },
];

const versionSupport = [
  {
    icon: faCheckCircle,
    badge: translate({id: 'v4.support.v4.badge', message: 'Active (LTS)'}),
    badgeClass: 'featureBadgeNew',
    version: 'v4.x',
    desc: translate({id: 'v4.support.v4.desc', message: 'New features, bug fixes, security patches, and WordPress compatibility fixes.'}),
  },
  {
    icon: faLock,
    badge: translate({id: 'v4.support.v3.badge', message: 'Maintenance'}),
    badgeClass: 'featureBadgeWarn',
    version: 'v3.x',
    desc: translate({id: 'v4.support.v3.desc', message: 'Security patches and WordPress compatibility fixes only - no new features, no bug fixes. End of life is January 31, 2027.'}),
  },
];

const migrationSteps = [
  {
    n: '1',
    title: translate({id: 'v4.migration.step1.title', message: 'Update the plugin'}),
    desc: translate({id: 'v4.migration.step1.desc', message: 'Download the plugin from GitHub and upload the zip via Plugins → Add New → Upload Plugin, or install it from the WordPress plugin directory.'}),
  },
  {
    n: '2',
    title: translate({id: 'v4.migration.step2.title', message: 'Work through the breaking changes'}),
    desc: (
      <Translate
        id="v4.migration.step2.desc"
        values={{
          errorCode: <code>errorCode</code>,
          errorCodeSnake: <code>error_code</code>,
          upgradeGuide: <Link to="/docs/upgrade-v3-to-v4/"><Translate id="v4.migration.step2.upgradeGuide">upgrade guide</Translate></Link>,
        }}
      >
        {'The breaking changes are listed above. Address them before going to production - the {errorCode} → {errorCodeSnake} rename, the register response shape change, the removed /register route, and the relocated User Identification setting are the most likely to affect existing integrations. The {upgradeGuide} covers every change, including those from later 4.x releases.'}
      </Translate>
    ),
  },
  {
    n: '3',
    title: translate({id: 'v4.migration.step3.title', message: 'Validate your settings'}),
    desc: translate({id: 'v4.migration.step3.desc', message: 'Your settings are automatically migrated. Open Settings → Simple JWT Login and verify your values carried over correctly.'}),
  },
  {
    n: '4',
    title: translate({id: 'v4.migration.step4.title', message: 'Explore new features'}),
    desc: translate({id: 'v4.migration.step4.desc', message: 'Enable API Keys, Webhooks, Audit Logs, 2FA, and the 4 OAuth providers from Settings → Simple JWT Login to start using the new capabilities.'}),
  },
];

export default function V4Page() {
  return (
    <Layout
      title={translate({id: 'v4.meta.title', message: "What's New in Simple JWT Login v4"})}
      description={translate({id: 'v4.meta.description', message: 'Simple JWT Login v4 introduces API Keys, 2FA, 4 OAuth providers, WooCommerce JWT, Audit Logs, Webhooks, and a JWT Decoder.'})}
    >
      <Head>
        <meta property="og:title" content={translate({id: 'v4.meta.ogTitle', message: 'Simple JWT Login v4 - API Keys, 2FA, WooCommerce, Audit Logs, Webhooks & More'})} />
        <meta property="og:description" content={translate({id: 'v4.meta.ogDescription', message: 'v4 brings API Keys, 2FA, 4 OAuth providers, WooCommerce JWT, Audit Logs, Webhooks, JWT Decoder, code examples, and improved refresh tokens.'})} />
      </Head>

      {/* ── Hero ───────────────────────────────────────────── */}
      <header className={v4Styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={v4Styles.versionBadge}>v4.0.0</div>
          <h1 className={v4Styles.heroTitle}><Translate id="v4.hero.title">Simple JWT Login v4</Translate></h1>
          <p className={v4Styles.heroSubtitle}>
            <Translate id="v4.hero.subtitle">API Keys, 2FA, Audit Logs, Webhooks, 4 OAuth providers - the biggest release yet.</Translate>
          </p>
          <div className={styles.heroCta}>
            <Link
              to="https://github.com/nicumicle/simple-jwt-login/blob/master/download/simple-jwt-login.zip?raw=true"
              className={styles.actionButton}
              title={translate({id: 'v4.hero.downloadTitle', message: 'Download v4'})}
            >
              <FontAwesomeIcon icon={faDownload} /> <Translate id="v4.hero.download">Download v4</Translate>
            </Link>
            <Link to="/docs/" className={styles.btn} title={translate({id: 'v4.hero.docsTitle', message: 'Read the docs'})}>
              <Translate id="v4.hero.docs">Read the docs →</Translate>
            </Link>
            <Link
              to="https://github.com/nicumicle/simple-jwt-login"
              className={styles.btn}
              title={translate({id: 'v4.hero.githubTitle', message: 'View on GitHub'})}
            >
              <Translate id="v4.hero.github">View on GitHub</Translate>
            </Link>
          </div>
          <div className={v4Styles.heroHighlights}>
            {[
              { icon: faKey,          label: translate({id: 'v4.hero.highlight.apiKeys', message: 'API Keys'}) },
              { icon: faShieldHalved, label: translate({id: 'v4.hero.highlight.oauth', message: '4 OAuth Providers'}) },
              { icon: faUserShield,   label: translate({id: 'v4.hero.highlight.twoFa', message: '2FA Support'}) },
              { icon: faClipboardList,label: translate({id: 'v4.hero.highlight.auditLogs', message: 'Audit Logs'}) },
              { icon: faBell,         label: translate({id: 'v4.hero.highlight.webhooks', message: 'Webhooks'}) },
              { icon: faCartShopping, label: translate({id: 'v4.hero.highlight.woocommerce', message: 'WooCommerce'}) },
              { icon: faCode,         label: translate({id: 'v4.hero.highlight.codeExamples', message: 'Code Examples'}) },
            ].map(({ icon, label }) => (
              <div key={icon.iconName} className={v4Styles.heroHighlight}>
                <FontAwesomeIcon icon={icon} className={v4Styles.heroHighlightIcon} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main>

        {/* ── What's new ─────────────────────────────────────── */}
        <section id="whats-new" className={clsx(styles.sectionPadding)}>
          <div className="container">
            <span className={styles.sectionEyebrow}><Translate id="v4.whatsNew.eyebrow">{"What's new"}</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="v4.whatsNew.title">Everything in v4</Translate></h2>
            <div className={v4Styles.featuresGrid}>
              {newFeatures.map(({ icon, badge, title, desc, bullets, link, cta }, index) => (
                <div key={index} className={v4Styles.featureCard}>
                  <div className={v4Styles.featureCardHeader}>
                    <div className={v4Styles.featureCardIconWrap}>
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    <span className={clsx(v4Styles.featureBadge, badge === BADGE_NEW ? v4Styles.featureBadgeNew : v4Styles.featureBadgeImproved)}>
                      {badge}
                    </span>
                  </div>
                  <h3 className={v4Styles.featureCardTitle}>{title}</h3>
                  <p className={v4Styles.featureCardDesc}>{desc}</p>
                  <CheckList items={bullets} className={v4Styles.featureCardBullets} />
                  <Link to={link} className={v4Styles.featureCardLink} title={cta}>
                    {cta} <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Breaking changes ───────────────────────────────── */}
        <section id="breaking-changes" className={clsx(styles.sectionPadding, styles.sectionGray)}>
          <div className="container">
            <span className={styles.sectionEyebrow}><Translate id="v4.breaking.eyebrow">v3 → v4</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="v4.breaking.title">Breaking Changes</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="v4.breaking.lead">Most JWT flows continue to work without changes. Review these items before upgrading.</Translate>
            </p>
            <div className={v4Styles.breakingList}>
              {breakingChanges.map(({ title, detail, action, link, linkLabel }, index) => (
                <div key={index} className={v4Styles.breakingItem}>
                  <FontAwesomeIcon icon={faTriangleExclamation} className={v4Styles.breakingIcon} />
                  <div className={v4Styles.breakingContent}>
                    <p className={v4Styles.breakingTitle}>{title}</p>
                    <p className={v4Styles.breakingDetail}>{detail}</p>
                    <p className={v4Styles.breakingAction}><strong><Translate id="v4.breaking.actionLabel">Action:</Translate></strong> {action}</p>
                    {link && (
                      <Link to={link} className={v4Styles.breakingLink} title={linkLabel}>
                        {linkLabel} <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Version Support Policy ─────────────────────────── */}
        <section id="version-support" className={clsx(styles.sectionPadding, styles.sectionGray)}>
          <div className="container">
            <span className={styles.sectionEyebrow}><Translate id="v4.support.eyebrow">Version Support Policy</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="v4.support.title">v3 is now in maintenance mode</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="v4.support.lead">We recommend upgrading to v4 as soon as possible. After January 31, 2027, v3.x no longer receives any updates, including security patches.</Translate>
            </p>
            <div className={clsx(styles.whyGrid, styles.whyGrid2)}>
              {versionSupport.map(({ icon, badge, badgeClass, version, desc }) => (
                <div key={version} className={styles.whyCard}>
                  <div className={styles.whyCardIcon}><FontAwesomeIcon icon={icon} /></div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <h3 className={styles.whyCardTitle}>{version}</h3>
                    <span className={clsx(v4Styles.featureBadge, v4Styles[badgeClass])}>{badge}</span>
                  </div>
                  <p className={styles.whyCardDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Migration guide ────────────────────────────────── */}
        <section id="upgrade-guide" className={clsx(styles.sectionPadding)}>
          <div className="container">
            <span className={styles.sectionEyebrow}><Translate id="v4.upgrade.eyebrow">Upgrade guide</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="v4.upgrade.title">Upgrading to v4</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="v4.upgrade.lead">Most existing JWT flows continue to work without changes. Review the breaking changes section above before upgrading.</Translate>
            </p>
            <div className={styles.installSteps}>
              {migrationSteps.map(({ n, title, desc }) => (
                <div key={n} className={styles.installStep}>
                  <span className={styles.stepNumber}>{n}</span>
                  <div className={styles.installStepContent}>
                    <strong>{title}</strong>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Performance ─────────────────────────────────────── */}
        <section id="benchmark" className={clsx(styles.sectionPadding, styles.sectionGray)}>
          <div className="container">
            <span className={styles.sectionEyebrow}><Translate id="v4.bench.eyebrow">Benchmarks</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="v4.bench.title">v3 vs v4 Performance</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="v4.bench.lead">Load-test results from 100 calls per endpoint on identical infrastructure. All endpoints returned 100% success rate except where noted.</Translate>
            </p>
          </div>
          <div className={v4Styles.perfBreakout}>
            <div className={v4Styles.perfTableWrap}>
                <table className={clsx(v4Styles.perfTable, "vale-ignore")}>
                  <thead>
                    <tr className={v4Styles.perfGroupRow}>
                      <th rowSpan={2} className={v4Styles.perfThEndpoint}><Translate id="v4.bench.endpoint">Endpoint</Translate></th>
                      <th colSpan={5} className={v4Styles.perfGroupV3}>v3</th>
                      <th colSpan={5} className={v4Styles.perfGroupV4}>v4</th>
                      <th rowSpan={2} className={v4Styles.perfThDelta}><Translate id="v4.bench.delta">Delta (p95)</Translate></th>
                    </tr>
                    <tr>
                      <th><Translate id="v4.bench.min">Min</Translate></th><th><Translate id="v4.bench.avg">Avg</Translate></th><th><Translate id="v4.bench.median">Median</Translate></th><th><Translate id="v4.bench.p95">P95</Translate></th><th><Translate id="v4.bench.max">Max</Translate></th>
                      <th className={v4Styles.perfGroupSep}><Translate id="v4.bench.min">Min</Translate></th><th><Translate id="v4.bench.avg">Avg</Translate></th><th><Translate id="v4.bench.median">Median</Translate></th><th><Translate id="v4.bench.p95">P95</Translate></th><th><Translate id="v4.bench.max">Max</Translate></th>
                    </tr>
                  </thead>
                  <tbody>
                    {perfRows.map(({ endpoint, route, v3, v4, deltaP95, trend, noteRef }) => (
                      <tr key={route}>
                        <td className={v4Styles.perfEndpoint}>
                          {endpoint}
                          {noteRef !== null && <sup className={v4Styles.perfSup}>{noteRef}</sup>}
                          <code className={v4Styles.perfEndpointPath}>{route}</code>
                        </td>
                        {v3 ? (
                          <>
                            <td className={v4Styles.perfVal}>{v3.min}</td>
                            <td className={v4Styles.perfVal}>{v3.avg}</td>
                            <td className={v4Styles.perfVal}>{v3.median}</td>
                            <td className={v4Styles.perfVal}>{v3.p95}</td>
                            <td className={v4Styles.perfVal}>{v3.max}</td>
                          </>
                        ) : (
                          <td colSpan={5} className={v4Styles.perfNa}><Translate id="v4.bench.na">N/A</Translate></td>
                        )}
                        <td className={clsx(v4Styles.perfVal, v4Styles.perfGroupSep)}>{v4.min}</td>
                        <td className={v4Styles.perfVal}>{v4.avg}</td>
                        <td className={v4Styles.perfVal}>{v4.median}</td>
                        <td className={v4Styles.perfVal}>{v4.p95}</td>
                        <td className={v4Styles.perfVal}>{v4.max}</td>
                        <td className={clsx(v4Styles.perfDelta, {
                          [v4Styles.perfBetter]: trend === 'better',
                          [v4Styles.perfWorse]: trend === 'worse',
                          [v4Styles.perfNew]: trend === 'new',
                          [v4Styles.perfNeutral]: trend === 'neutral',
                        })}>{deltaP95}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </div>
          <div className="container">
            <ol className={v4Styles.perfNotesList}>
              <li><Translate id="v4.bench.note1">API Keys did not exist in v3; the v3 run returned 0% success rate. v4 introduces this endpoint and handles it correctly.</Translate></li>
            </ol>
            <p className={v4Styles.perfFormulaNotes}>
              <Translate
                id="v4.bench.formula"
                values={{
                  delta: <strong><Translate id="v4.bench.formula.delta">Delta (p95)</Translate></strong>,
                  formula: <code>(v4&nbsp;p95 - v3&nbsp;p95) / v3&nbsp;p95 × 100</code>,
                }}
              >
                {'{delta} = {formula}. Negative values mean v4 is faster.'}
              </Translate>
            </p>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────── */}
        <section id="get-started" className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <div className={v4Styles.ctaVersion}>v4.0.0</div>
              <h2 className={styles.ctaTitle}><Translate id="v4.cta.title">Try v4 today</Translate></h2>
              <p className={styles.ctaSubtitle}>
                <Translate id="v4.cta.subtitle">Simple JWT Login v4 is free, open-source, and available now.</Translate>
              </p>
              <div className={styles.ctaButtons}>
                <Link
                  to="https://github.com/nicumicle/simple-jwt-login/blob/master/download/simple-jwt-login.zip?raw=true"
                  className={styles.actionButton}
                  title={translate({id: 'v4.cta.downloadTitle', message: 'Download v4'})}
                >
                  <FontAwesomeIcon icon={faDownload} /> <Translate id="v4.cta.download">Download v4</Translate>
                </Link>
                <Link
                  to="https://github.com/nicumicle/simple-jwt-login"
                  className={styles.btn}
                  title={translate({id: 'v4.cta.githubTitle', message: 'View on GitHub'})}
                >
                  <FontAwesomeIcon icon={faRocket} /> <Translate id="v4.cta.github">View on GitHub</Translate>
                </Link>
                <Link to="/docs/" className={styles.btn} title={translate({id: 'v4.cta.docsTitle', message: 'Read the docs'})}>
                  <Translate id="v4.cta.docs">Read the docs</Translate>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
