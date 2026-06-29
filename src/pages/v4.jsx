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
import styles from './styles.module.css';
import v4Styles from './v4.module.css';

const newFeatures = [
  {
    icon: faKey,
    badge: 'New',
    title: 'API Keys',
    desc: 'Create long-lived, scoped credentials for server-to-server integrations, CI/CD pipelines, and third-party services - no JWT expiry management needed.',
    bullets: [
      'Scoped permissions: read, create, update, delete',
      'SHA-256 hashed - the key is never stored in plain text',
      'Revoke or expire keys at any time',
      'JWT authentication also accepted on the /api-keys endpoint',
      'Non-admin users can manage their own keys without admin access',
    ],
    link: '/docs/api-keys/',
    cta: 'API Keys docs',
  },
  {
    icon: faShieldHalved,
    badge: 'New',
    title: 'OAuth: 4 Providers',
    desc: 'Users can sign in with Google, Auth0, Facebook, or GitHub and receive a WordPress JWT - no password form required.',
    bullets: [
      'Google: authorization code or ID token (Sign In With Google)',
      'Auth0: authorization code flow',
      'Facebook: authorization code flow',
      'GitHub: authorization code flow',
      'Auto-register users if no matching account exists',
    ],
    link: '/docs/oauth/',
    cta: 'OAuth docs',
  },
  {
    icon: faLayerGroup,
    badge: 'New',
    title: 'Multiple JWT Decryption Keys',
    desc: 'Define multiple decryption keys and let the plugin pick the right one automatically based on the JWT header or payload.',
    bullets: [
      'Key selection based on JWT header or payload field',
      'Supports HS256/384/512 and RS256/384/512 per key',
      'Seamless key rotation without breaking existing tokens',
    ],
    link: '/docs/authentication/',
    cta: 'Auth docs',
  },
  {
    icon: faClipboardList,
    badge: 'New',
    title: 'Audit Logs',
    desc: 'Every authentication event - logins, token issues, revocations, and errors - is now logged for auditing and debugging.',
    bullets: [
      'Logs login, register, delete, OAuth, 2FA, and token events',
      'Searchable from the WordPress admin',
      'Configurable retention period',
    ],
    link: '/docs/audit-logs/',
    cta: 'Audit Logs docs',
  },
  {
    icon: faBell,
    badge: 'New',
    title: 'Webhooks',
    desc: 'Fire HTTP callbacks on authentication events - integrate with Slack, logging services, or any external system in real time.',
    bullets: [
      'Configurable per event type',
      'Custom URL, method, headers, and JSON payload',
      'Works with any HTTP endpoint',
    ],
    link: '/docs/webhooks/',
    cta: 'Webhooks docs',
  },
  {
    icon: faGauge,
    badge: 'New',
    title: 'Dashboard',
    desc: 'A new at-a-glance status page shows every feature\'s state in one place - routes, security, integrations, and monitoring.',
    bullets: [
      'All routes and their enabled/disabled state',
      'Security: CORS, Protect Endpoints, Auth Codes, API Keys',
      'Monitoring: Webhooks, Webhook Logs, Audit Logs',
    ],
    link: '/docs/dashboard/',
    cta: 'Dashboard docs',
  },
  {
    icon: faPalette,
    badge: 'Improved',
    title: 'Redesigned Settings UI',
    desc: 'The plugin admin panel has been fully redesigned - cleaner layout, better grouping, and less noise so you can find what you need faster.',
    bullets: [
      'Reorganized sections for a more logical flow',
      'User identification consolidated in General settings',
      'Cleaner forms with improved field descriptions',
      'Light/Dark mode support',
    ],
    link: '/docs/dashboard/',
    cta: 'Dashboard docs',
  },
  {
    icon: faUserShield,
    badge: 'New',
    title: '2FA Support',
    desc: 'Require a second authentication step before issuing a full JWT - compatible with the WordPress Two Factor plugin.',
    bullets: [
      'Interim JWT issued after password check; 2FA code completes the flow',
      'Dedicated POST /auth/2fa endpoint',
      'Configurable interim JWT TTL (1-60 minutes)',
      'Users without 2FA configured are unaffected',
    ],
    link: '/docs/integrations/third-party/two-factor/',
    cta: '2FA docs',
  },
  {
    icon: faCartShopping,
    badge: 'New',
    title: 'WooCommerce',
    desc: 'Drive a WooCommerce store with a JWT instead of a consumer key/secret - manage products and run a fully headless cart & checkout with the token alone.',
    bullets: [
      'JWT auth on every /wc/ route: CRUD (wc/v3) and the Store API (wc/store)',
      'Scoped to WooCommerce routes - works even with the global middleware off',
      'Optional Store API cart & checkout: header-JWT requests skip the CSRF nonce',
      'Admin / Shop Manager tokens manage the catalog; customers manage their own cart',
    ],
    link: '/docs/integrations/third-party/woocommerce/',
    cta: 'WooCommerce docs',
  },
  {
    icon: faRotate,
    badge: 'Improved',
    title: 'Refresh Token',
    desc: 'Refresh tokens are now more secure and configurable - rolling rotation, a separate encryption key, and custom payload support.',
    bullets: [
      'Rolling rotation: each refresh issues a new token and invalidates the old one',
      'Separate refresh token secret key, independent of the JWT signing key',
      'Custom payload merged into the newly issued JWT on refresh',
      'Auth Code protection option for the refresh endpoint',
    ],
    link: '/docs/refresh-token/',
    cta: 'Refresh Token docs',
  },
  {
    icon: faVial,
    badge: 'New',
    title: 'JWT Decoder',
    desc: 'Paste any JWT directly in the WordPress admin panel to inspect its header and payload - no external tools needed.',
    bullets: [
      'Decodes header and payload instantly in the browser',
      'Token is never sent to the server',
      'Useful for debugging token claims and expiry',
    ],
    link: '/docs/dashboard/',
    cta: 'Learn more',
  },
  {
    icon: faCode,
    badge: 'New',
    title: 'Code Examples',
    desc: 'Every endpoint page in the plugin admin panel now shows ready-to-copy code snippets tailored to your current settings.',
    bullets: [
      'cURL, PHP, and JavaScript examples per endpoint',
      'Examples use your configured namespace and site URL',
      'Auth Code and parameter values pre-filled from your settings',
    ],
    link: '/docs/code-examples/',
    cta: 'Code Examples',
  },
  {
    icon: faLock,
    badge: 'Improved',
    title: 'Protect Endpoints Redesign',
    desc: 'Protect Endpoints has been rethought as a single ordered rules table - each rule sets access to Public, JWT required, or JWT + Roles, and the first matching rule wins.',
    bullets: [
      'Unified rules table replaces separate whitelist and protected lists',
      'Per-rule access level: Public, JWT required, or JWT + specific Roles',
      'Top-to-bottom evaluation with first-match-wins logic',
      'Existing settings auto-migrate on first load',
      'Role names are validated against WordPress on save',
    ],
    link: '/docs/protect-endpoints/',
    cta: 'Protect Endpoints docs',
  },
  {
    icon: faUserPlus,
    badge: 'Improved',
    title: 'Registration Enhancements',
    desc: 'User registration is now more flexible - assign multiple default roles, trigger built-in WordPress notification emails, and use variables in reset password email subjects.',
    bullets: [
      'Support multiple default user roles on registration',
      'Option to send the default WordPress welcome email on registration',
      'Option to send the default WordPress password-changed email from the change-password endpoint',
      'Variables now supported in the reset password email subject line',
    ],
    link: '/docs/register-user/',
    cta: 'Register User docs',
  },
  {
    icon: faToggleOn,
    badge: 'Improved',
    title: 'Granular Token Controls',
    desc: 'Enable or disable refresh, revoke, and validate token endpoints independently - ship only the surface area your app needs.',
    bullets: [
      'Toggle refresh token endpoint on/off',
      'Toggle revoke token endpoint on/off',
      'Toggle validate token endpoint on/off',
      'Optionally require the "Bearer" prefix in the Authorization header',
    ],
    link: '/docs/authentication/',
    cta: 'Auth docs',
  },
  {
    icon: faWrench,
    badge: 'Improved',
    title: 'Improvements & Code Quality',
    desc: 'Standardized HTTP status codes across all endpoints and a cleaner, more maintainable internal codebase.',
    bullets: [
      'All endpoints now respond with 400, 401, 403, 422, or 500 status codes',
      'Refactored internal service layer for better separation of concerns',
      'Improved unit test coverage across all core services',
      'Reduced code duplication across service classes',
    ],
    link: '/docs/error-codes/',
    cta: 'Error codes',
  },
];

const breakingChanges = [
  {
    title: 'Register user response shape changed',
    detail: 'POST /users used to return {"success":true,"ID":1,...}. It now returns {"success":true,"data":{"id":1,...}}. The user object is nested under "data", "ID" is lowercase "id", and several fields were renamed: user_login → login, user_nicename → nicename, user_email → email, user_url → url, user_registered → registered, user_activation_key → activation_key, user_status → status.',
    action: 'Update any code that reads user fields from the register response - check both the new nesting under "data" and the renamed field keys.',
    link: '/docs/register-user/',
    linkLabel: 'Register User docs',
  },
  {
    title: 'Legacy /register endpoint removed',
    detail: 'The old POST /simple-jwt-login/v1/register route no longer exists. The canonical route is POST /simple-jwt-login/v1/users.',
    action: 'Update all callers to use POST /simple-jwt-login/v1/users.',
    link: '/docs/register-user/',
    linkLabel: 'Register User docs',
  },
  {
    title: 'User Identification moved to General settings',
    detail: 'The "User Identification" option (email, login, ID) has moved from the Delete User settings tab to the General settings tab. It now applies globally to all endpoints.',
    action: 'After upgrading, verify the User Identification value in Settings → Simple JWT Login → General.',
    link: '/docs/configuration/',
    linkLabel: 'General settings docs',
  },
  {
    title: 'Settings storage structure reorganized',
    detail: 'The internal layout of plugin options in wp_options has changed. Existing settings are migrated automatically on first load, but the old keys are removed.',
    action: 'Review every settings tab after upgrading to confirm values carried over correctly.',
    link: null,
    linkLabel: null,
  },
  {
    title: 'Authentication response now includes refresh_token',
    detail: 'POST /auth returns a new "refresh_token" field when the refresh token feature is enabled. The JWT field itself is unchanged.',
    action: 'No action needed unless your client strictly rejects unexpected response fields or you need to store the token.',
    link: '/docs/refresh-token/',
    linkLabel: 'Refresh Token docs',
  },
  {
    title: '2FA changes the /auth flow for affected users',
    detail: 'Users with the Two Factor plugin configured now receive a short-lived interim JWT from /auth instead of a full JWT. A second request to POST /auth/2fa (with the interim JWT + 2FA code) is required to get the real token.',
    action: 'Update your authentication flow to handle the interim JWT case, or leave 2FA disabled for API users.',
    link: '/docs/integrations/third-party/two-factor/',
    linkLabel: '2FA docs',
  },
  {
    title: 'Error response envelope: message and error_code moved under data',
    detail: 'In v3, error responses had the form {"success":false,"message":"...","error_code":N}. In v4, both fields moved under a nested data object: {"success":false,"data":{"message":"...","error_code":N}}. Every endpoint follows this new shape.',
    action: 'Update all error-handling code to read response.data.message and response.data.error_code instead of response.message and response.error_code.',
    link: '/docs/error-codes/',
    linkLabel: 'Error codes docs',
  },
  {
    title: 'Protected endpoint auth failures return 401 instead of 403',
    detail: 'When the Protect Endpoint feature blocks an unauthenticated request, the plugin previously returned HTTP 403 Forbidden. It now returns HTTP 401 Unauthorized to align with the HTTP spec.',
    action: 'Update any code that checks specifically for status 403 on protected routes to handle 401 instead.',
    link: '/docs/protect-endpoints/',
    linkLabel: 'Protect Endpoint docs',
  },
  {
    title: 'Error field renamed: errorCode → error_code',
    detail: 'In v3, the error field in responses was named "errorCode" (camelCase). In v4, it is renamed to "error_code" (snake_case) to match the rest of the API\'s naming convention.',
    action: 'Update all error-handling code that reads response.errorCode (or response.data.errorCode) to use error_code instead.',
    link: '/docs/error-codes/',
    linkLabel: 'Error codes docs',
  },
];

const perfRows = [
  {
    endpoint: 'Register User',
    v3: { min: '0.370s', avg: '0.471s', median: '0.418s', p95: '0.906s', max: '1.406s' },
    v4: { min: '0.233s', avg: '0.255s', median: '0.255s', p95: '0.273s', max: '0.286s' },
    deltaP95: '-70%', trend: 'better', noteRef: null,
  },
  {
    endpoint: 'Autologin with JWT',
    v3: { min: '0.114s', avg: '0.133s', median: '0.127s', p95: '0.174s', max: '0.224s' },
    v4: { min: '0.113s', avg: '0.125s', median: '0.122s', p95: '0.134s', max: '0.310s' },
    deltaP95: '-23%', trend: 'better', noteRef: null,
  },
  {
    endpoint: 'Create Post (JWT)',
    v3: { min: '0.152s', avg: '0.175s', median: '0.168s', p95: '0.208s', max: '0.376s' },
    v4: { min: '0.130s', avg: '0.144s', median: '0.139s', p95: '0.170s', max: '0.227s' },
    deltaP95: '-18%', trend: 'better', noteRef: null,
  },
  {
    endpoint: 'Create Post (API Key)',
    v3: null,
    v4: { min: '0.133s', avg: '0.160s', median: '0.144s', p95: '0.279s', max: '0.357s' },
    deltaP95: 'new', trend: 'new', noteRef: 1,
  },
  {
    endpoint: 'Validate Token',
    v3: { min: '0.080s', avg: '0.088s', median: '0.087s', p95: '0.101s', max: '0.111s' },
    v4: { min: '0.084s', avg: '0.090s', median: '0.088s', p95: '0.098s', max: '0.120s' },
    deltaP95: '-3%', trend: 'better', noteRef: null,
  },
  {
    endpoint: 'Auth User',
    v3: { min: '0.128s', avg: '0.138s', median: '0.136s', p95: '0.151s', max: '0.217s' },
    v4: { min: '0.146s', avg: '0.174s', median: '0.153s', p95: '0.152s', max: '0.162s' },
    deltaP95: '+1%', trend: 'neutral', noteRef: null,
  },
];

const migrationSteps = [
  {
    n: '1',
    title: 'Update the plugin',
    desc: 'Download the release candidate from GitHub and upload the zip via Plugins → Add New → Upload Plugin, or wait for the stable release on the WordPress plugin directory.',
  },
  {
    n: '2',
    title: 'Work through the breaking changes',
    desc: 'The breaking changes are listed above. Address them before going to production - the error envelope change, errorCode → error_code rename, register response shape, removed /register route, and User Identification location are the most likely to affect existing integrations.',
  },
  {
    n: '3',
    title: 'Re-save your settings',
    desc: 'Your settings are automatically migrated. Open Settings → Simple JWT Login and verify your values carried over correctly.',
  },
  {
    n: '4',
    title: 'Explore new features',
    desc: 'Enable API Keys, Webhooks, Audit Logs, 2FA, and the 4 OAuth providers from Settings → Simple JWT Login to start using the new capabilities.',
  },
];

export default function V4Page() {
  return (
    <Layout
      title="Simple JWT Login v4 - API Keys, 2FA, WooCommerce, Audit Logs, Webhooks & More"
      description="Simple JWT Login v4 introduces API Keys, 2FA support, 4 OAuth providers, WooCommerce JWT, Audit Logs, Webhooks, JWT Decoder, code examples, and improved refresh tokens."
    >
      <Head>
        <meta property="og:title" content="Simple JWT Login v4 - API Keys, 2FA, WooCommerce, Audit Logs, Webhooks & More" />
        <meta property="og:description" content="v4 brings API Keys, 2FA, 4 OAuth providers, WooCommerce JWT, Audit Logs, Webhooks, JWT Decoder, code examples, and improved refresh tokens." />
      </Head>

      {/* ── Hero ───────────────────────────────────────────── */}
      <header className={v4Styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={v4Styles.versionBadge}>Release Candidate - v4.0.0</div>
          <h1 className={v4Styles.heroTitle}>Simple JWT Login v4</h1>
          <p className={v4Styles.heroSubtitle}>
            API Keys, 2FA, Audit Logs, Webhooks, 4 OAuth providers - the biggest release yet.
          </p>
          <div className={styles.heroCta}>
            <Link
              to="https://github.com/nicumicle/simple-jwt-login/blob/v4/download/simple-jwt-login.zip?raw=true"
              className={styles.actionButton}
              title="Download v4 Release Candidate"
            >
              <FontAwesomeIcon icon={faDownload} /> Download RC
            </Link>
            <Link to="/docs/" className={styles.btn} title="Read the docs">
              Read the docs →
            </Link>
            <Link
              to="https://github.com/nicumicle/simple-jwt-login"
              className={styles.btn}
              title="View on GitHub"
            >
              View on GitHub
            </Link>
          </div>
          <div className={v4Styles.heroHighlights}>
            {[
              { icon: faKey,          label: 'API Keys' },
              { icon: faShieldHalved, label: '4 OAuth Providers' },
              { icon: faUserShield,   label: '2FA Support' },
              { icon: faClipboardList,label: 'Audit Logs' },
              { icon: faBell,         label: 'Webhooks' },
              { icon: faCartShopping, label: 'WooCommerce' },
              { icon: faCode,         label: 'Code Examples' },
            ].map(({ icon, label }) => (
              <div key={label} className={v4Styles.heroHighlight}>
                <FontAwesomeIcon icon={icon} className={v4Styles.heroHighlightIcon} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main>

        {/* ── What's new ─────────────────────────────────────── */}
        <section className={clsx(styles.sectionPadding)}>
          <div className="container">
            <span className={styles.sectionEyebrow}>What's new</span>
            <h2 className={styles.sectionTitle}>Everything in v4</h2>
            <div className={v4Styles.featuresGrid}>
              {newFeatures.map(({ icon, badge, title, desc, bullets, link, cta }) => (
                <div key={title} className={v4Styles.featureCard}>
                  <div className={v4Styles.featureCardHeader}>
                    <div className={v4Styles.featureCardIconWrap}>
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    <span className={clsx(v4Styles.featureBadge, badge === 'New' ? v4Styles.featureBadgeNew : v4Styles.featureBadgeImproved)}>
                      {badge}
                    </span>
                  </div>
                  <h3 className={v4Styles.featureCardTitle}>{title}</h3>
                  <p className={v4Styles.featureCardDesc}>{desc}</p>
                  <ul className={v4Styles.featureCardBullets}>
                    {bullets.map((b) => (
                      <li key={b}>
                        <FontAwesomeIcon icon={faCheckCircle} className={v4Styles.bulletIcon} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link to={link} className={v4Styles.featureCardLink} title={cta}>
                    {cta} <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Breaking changes ───────────────────────────────── */}
        <section className={clsx(styles.sectionPadding, styles.sectionGray)}>
          <div className="container">
            <span className={styles.sectionEyebrow}>v3 → v4</span>
            <h2 className={styles.sectionTitle}>Breaking Changes</h2>
            <p className={styles.sectionLead}>
              Most JWT flows continue to work without changes. Review these items before upgrading.
            </p>
            <div className={v4Styles.breakingList}>
              {breakingChanges.map(({ title, detail, action, link, linkLabel }) => (
                <div key={title} className={v4Styles.breakingItem}>
                  <FontAwesomeIcon icon={faTriangleExclamation} className={v4Styles.breakingIcon} />
                  <div className={v4Styles.breakingContent}>
                    <p className={v4Styles.breakingTitle}>{title}</p>
                    <p className={v4Styles.breakingDetail}>{detail}</p>
                    <p className={v4Styles.breakingAction}><strong>Action:</strong> {action}</p>
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

        {/* ── Migration guide ────────────────────────────────── */}
        <section className={clsx(styles.sectionPadding)}>
          <div className="container">
            <span className={styles.sectionEyebrow}>Upgrade guide</span>
            <h2 className={styles.sectionTitle}>Upgrading to v4</h2>
            <p className={styles.sectionLead}>
              Most existing JWT flows continue to work without changes.
              Review the breaking changes section above before upgrading.
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
        <section className={clsx(styles.sectionPadding, styles.sectionGray)}>
          <div className="container">
            <span className={styles.sectionEyebrow}>Benchmarks</span>
            <h2 className={styles.sectionTitle}>v3 vs v4 Performance</h2>
            <p className={styles.sectionLead}>
              Load-test results on identical infrastructure.
              All endpoints returned 100% success rate except where noted.
            </p>
            <div className={v4Styles.perfTableWrap}>
                <table className={v4Styles.perfTable}>
                  <thead>
                    <tr className={v4Styles.perfGroupRow}>
                      <th rowSpan={2} className={v4Styles.perfThEndpoint}>Endpoint</th>
                      <th colSpan={5} className={v4Styles.perfGroupV3}>v3</th>
                      <th colSpan={5} className={v4Styles.perfGroupV4}>v4</th>
                      <th rowSpan={2} className={v4Styles.perfThDelta}>Delta (p95)</th>
                    </tr>
                    <tr>
                      <th>Min</th><th>Avg</th><th>Median</th><th>P95</th><th>Max</th>
                      <th className={v4Styles.perfGroupSep}>Min</th><th>Avg</th><th>Median</th><th>P95</th><th>Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perfRows.map(({ endpoint, v3, v4, deltaP95, trend, noteRef }) => (
                      <tr key={endpoint}>
                        <td className={v4Styles.perfEndpoint}>
                          {endpoint}
                          {noteRef !== null && <sup className={v4Styles.perfSup}>{noteRef}</sup>}
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
                          <td colSpan={5} className={v4Styles.perfNa}>N/A</td>
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
            <ol className={v4Styles.perfNotesList}>
              <li>API Keys did not exist in v3; the v3 run returned 0% success rate. v4 introduces this endpoint and handles it correctly.</li>
            </ol>
            <p className={v4Styles.perfFormulaNotes}>
              <strong>Delta (p95)</strong> = <code>(v4&nbsp;p95 - v3&nbsp;p95) / v3&nbsp;p95 × 100</code>. Negative values mean v4 is faster.
            </p>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <div className={v4Styles.ctaVersion}>v4.0.0 — Release Candidate</div>
              <h2 className={styles.ctaTitle}>Try v4 today</h2>
              <p className={styles.ctaSubtitle}>
                Simple JWT Login v4 is free, open-source, and available as a release candidate.
                The stable release is coming soon to the WordPress plugin directory.
              </p>
              <div className={styles.ctaButtons}>
                <Link
                  to="https://github.com/nicumicle/simple-jwt-login/blob/v4/download/simple-jwt-login.zip?raw=true"
                  className={styles.actionButton}
                  title="Download v4 Release Candidate"
                >
                  <FontAwesomeIcon icon={faDownload} /> Download RC
                </Link>
                <Link
                  to="https://github.com/nicumicle/simple-jwt-login"
                  className={styles.btn}
                  title="View on GitHub"
                >
                  <FontAwesomeIcon icon={faRocket} /> View on GitHub
                </Link>
                <Link to="/docs/" className={styles.btn} title="Read the docs">
                  Read the docs
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
