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
    icon: faToggleOn,
    badge: 'Improved',
    title: 'Granular Token Controls',
    desc: 'Enable or disable refresh, revoke, and validate token endpoints independently - ship only the surface area your app needs.',
    bullets: [
      'Toggle refresh token endpoint on/off',
      'Toggle revoke token endpoint on/off',
      'Toggle validate token endpoint on/off',
    ],
    link: '/docs/authentication/',
    cta: 'Auth docs',
  },
  {
    icon: faWrench,
    badge: 'Improved',
    title: 'Error Codes & Code Quality',
    desc: 'More precise error codes, a 401 (instead of 403) on protect-endpoint auth failures, and a cleaner internal codebase.',
    bullets: [
      'New ERR_JWT_CANNOT_CHANGE_PASSWORD error code',
      'Protect-endpoint failures now return 401',
      'Fixed typos in method and constant names',
    ],
    link: '/docs/error-codes/',
    cta: 'Error codes',
  },
];

const breakingChanges = [
  {
    title: 'Register user response shape changed',
    detail: 'POST /users used to return {"success":true,"ID":1,...}. It now returns {"success":true,"data":{"id":1,...}} - the user object is nested under "data" and "ID" is lowercase "id".',
    action: 'Update any code that reads user fields (ID, email, roles…) from the register response.',
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
];

const migrationSteps = [
  {
    n: '1',
    title: 'Update the plugin',
    desc: 'Install Simple JWT Login v4.x from the WordPress plugin directory or upload the zip directly.',
  },
  {
    n: '2',
    title: 'Work through the breaking changes',
    desc: 'Six breaking changes are listed above. Address them before going to production - register response shape, removed /register route, and User Identification location are the most likely to affect existing integrations.',
  },
  {
    n: '3',
    title: 'Re-save your settings',
    desc: 'The settings storage structure was reorganized. Open Settings → Simple JWT Login and click Save Changes on each tab to confirm your values carried over correctly.',
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
      title="Simple JWT Login v4 - API Keys, 2FA, Audit Logs, Webhooks & More"
      description="Simple JWT Login v4 introduces API Keys, 2FA support, 4 OAuth providers, Audit Logs, Webhooks, JWT Decoder, code examples, and improved refresh tokens."
    >
      <Head>
        <meta property="og:title" content="Simple JWT Login v4 - API Keys, 2FA, Audit Logs, Webhooks & More" />
        <meta property="og:description" content="v4 brings API Keys, 2FA, 4 OAuth providers, Audit Logs, Webhooks, JWT Decoder, code examples, and improved refresh tokens." />
      </Head>

      {/* ── Hero ───────────────────────────────────────────── */}
      <header className={v4Styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={v4Styles.versionBadge}>Coming soon - v4.0.0</div>
          <h1 className={v4Styles.heroTitle}>Simple JWT Login v4</h1>
          <p className={v4Styles.heroSubtitle}>
            API Keys, 2FA, Audit Logs, Webhooks, 4 OAuth providers - the biggest release yet.
          </p>
          <div className={styles.heroCta}>
            <Link to="/docs/" className={styles.actionButton} title="Read the docs">
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

        {/* ── CTA ────────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <div className={v4Styles.ctaVersion}>v4.0.0 — Coming soon</div>
              <h2 className={styles.ctaTitle}>Stay up to date</h2>
              <p className={styles.ctaSubtitle}>
                Simple JWT Login v4 is free, open-source, and in active development.
                Follow the GitHub repository to be notified when it ships.
              </p>
              <div className={styles.ctaButtons}>
                <Link
                  to="https://github.com/nicumicle/simple-jwt-login"
                  className={styles.actionButton}
                  title="Watch on GitHub"
                >
                  <FontAwesomeIcon icon={faRocket} /> Watch on GitHub
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
