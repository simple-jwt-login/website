import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faKey, faShieldHalved, faLayerGroup,
  faArrowRight, faCheckCircle, faRocket, faPalette,
  faBell, faClipboardList, faToggleOn, faWrench,
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
    title: 'Auth0 OAuth Support',
    desc: 'Users can now sign in with Auth0 (in addition to Google) and receive a WordPress JWT - no password form required.',
    bullets: [
      'Auth0 authorization code flow',
      'Google: authorization code or ID token (Sign In With Google)',
      'Auto-register users if no matching account exists',
      'GET and POST on /oauth/token',
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
      'Logs login, register, delete, and token events',
      'Searchable from the WordPress admin',
      'Configurable retention period',
    ],
    link: '/docs/',
    cta: 'Learn more',
  },
  {
    icon: faBell,
    badge: 'New',
    title: 'Webhooks',
    desc: 'Fire HTTP callbacks on authentication events - integrate with Slack, logging services, or any external system in real time.',
    bullets: [
      'Configurable per event type',
      'POST payload with event details',
      'Works with any HTTP endpoint',
    ],
    link: '/docs/',
    cta: 'Learn more',
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
    link: '/docs/',
    cta: 'Learn more',
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

const migrationSteps = [
  {
    n: '1',
    title: 'Update the plugin',
    desc: 'Install Simple JWT Login v4.x from the WordPress plugin directory or upload the zip directly.',
  },
  {
    n: '2',
    title: 'Review the redesigned settings',
    desc: 'The admin panel has been reorganised. User Identification has moved from Delete User to General settings - check your configuration.',
  },
  {
    n: '3',
    title: 'Review breaking changes',
    desc: 'User Identification has moved from Delete User to General settings. Update your configuration if you use the delete-user endpoint.',
  },
  {
    n: '4',
    title: 'Explore new features',
    desc: 'Enable API Keys, Webhooks, Audit Logs, and Auth0 from Settings → Simple JWT Login to start using the new capabilities.',
  },
];

export default function V4Page() {
  return (
    <Layout
      title="Simple JWT Login v4 - API Keys, Audit Logs, Webhooks & More"
      description="Simple JWT Login v4 introduces API Keys, Auth0 OAuth, Audit Logs, Webhooks, multiple JWT decryption keys, a redesigned UI, and granular token controls."
    >
      <Head>
        <meta property="og:title" content="Simple JWT Login v4 - API Keys, Audit Logs, Webhooks & More" />
        <meta property="og:description" content="v4 brings API Keys, Auth0 OAuth, Audit Logs, Webhooks, multiple decryption keys, and a redesigned setup wizard." />
      </Head>

      {/* ── Hero ───────────────────────────────────────────── */}
      <header className={v4Styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={v4Styles.versionBadge}>Coming soon - v4.0</div>
          <h1 className={v4Styles.heroTitle}>Simple JWT Login v4</h1>
          <p className={v4Styles.heroSubtitle}>
            API Keys, Audit Logs, Webhooks, Auth0 - the biggest release yet.
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
              { icon: faKey,              label: 'API Keys' },
              { icon: faShieldHalved,     label: 'Auth0 OAuth' },
              { icon: faClipboardList,    label: 'Audit Logs' },
              { icon: faBell,             label: 'Webhooks' },
              { icon: faLayerGroup,       label: 'Multi-Key JWT' },
              { icon: faPalette,           label: 'New UI' },
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

        {/* ── Migration guide ────────────────────────────────── */}
        <section className={clsx(styles.sectionPadding, styles.sectionGray)}>
          <div className="container">
            <span className={styles.sectionEyebrow}>Upgrade guide</span>
            <h2 className={styles.sectionTitle}>Upgrading to v4</h2>
            <p className={styles.sectionLead}>
              Most existing JWT flows continue to work without changes.
              One breaking change affects the delete-user endpoint - see step 3.
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
              <div className={v4Styles.ctaVersion}>v4.0 — Coming soon</div>
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
