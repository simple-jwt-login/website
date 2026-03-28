import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal, faEnvelope, faBoxArchive, faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';
import sharedStyles from '../styles.module.css';

/* ── Data ───────────────────────────────────────────────────── */

const addons = [
  {
    id: 'cli',
    name: 'WP-CLI Add-on',
    tagline: 'JWT from the command line',
    description:
      'Manage Simple JWT Login without ever opening the WordPress admin. Generate tokens, validate JWTs, revoke sessions, and push config between environments — all scriptable, all automatable.',
    icon: faTerminal,
    tags: ['DevOps', 'CI/CD', 'Automation'],
    status: 'stable',
    docsHref: '/docs/cli/',
    primaryHref: '/ecosystem/cli',
    primaryLabel: 'Learn more',
    secondaryHref: 'https://github.com/simple-jwt-login/simple-jwt-login-cli',
    secondaryLabel: 'GitHub',
    highlights: [
      'Generate & validate tokens',
      'Revoke sessions instantly',
      'Export / import config',
      'Staging → production migration',
    ],
  },
  {
    id: 'mailpoet',
    name: 'MailPoet Add-on',
    tagline: 'Magic-link emails, zero friction',
    description:
      'Drop a shortcode into any MailPoet campaign and every subscriber gets a personalised, one-click login link. No passwords, no friction — just a seamless email-to-site experience.',
    icon: faEnvelope,
    tags: ['Email', 'Magic Links', 'MailPoet'],
    status: 'stable',
    docsHref: '/docs/mailpoet/',
    primaryHref: '/ecosystem/mailpoet',
    primaryLabel: 'Learn more',
    secondaryHref: 'https://wordpress.org/plugins/simple-jwt-login-mailpoet',
    secondaryLabel: 'Download',
    highlights: [
      'Personalised login links per recipient',
      'Works with any MailPoet template',
      'Time-limited, single-use tokens',
      'No custom code needed',
    ],
  },
  {
    id: 'export-import',
    name: 'Export & Import Add-on',
    tagline: 'Move your config in one command',
    description:
      'Back up your complete Simple JWT Login configuration — Auth Codes, protection rules, and all settings — and restore it on any site. Ideal for staging migrations and multi-site setups.',
    icon: faBoxArchive,
    tags: ['Migration', 'DevOps', 'Backup'],
    status: 'stable',
    docsHref: '/docs/export-import/',
    primaryHref: '/ecosystem/export-import',
    primaryLabel: 'Learn more',
    secondaryHref: 'https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip',
    secondaryLabel: 'Download',
    highlights: [
      'Full config backup & restore',
      'Auth Codes included',
      'Works across any WP installs',
      'JSON-based, human-readable',
    ],
  },
];

const integrations = [
  {
    id: 'wpgraphql',
    name: 'WPGraphQL',
    tagline: 'JWT authentication for GraphQL',
    description:
      'Use the same JWT tokens you issue through Simple JWT Login to authenticate any WPGraphQL query or mutation. Enable it with a single checkbox — no code, no custom middleware.',
    logo: 'assets/img/wpgraphql/wpgraphql-logo.png',
    logoAlt: 'WPGraphQL logo',
    tags: ['GraphQL', 'Headless', 'REST-free'],
    status: 'stable',
    docsHref: '/docs/wpgraphql/',
    primaryHref: '/docs/wpgraphql/',
    primaryLabel: 'Read the docs',
    highlights: [
      'Authenticate queries & mutations',
      'One-checkbox setup',
      'Works with React, Vue, Next.js',
      'Same tokens as REST API',
    ],
  },
  {
    id: 'google',
    name: 'Google OAuth',
    tagline: 'Sign in with Google',
    description:
      'Let users authenticate with their Google account. Simple JWT Login exchanges a Google ID token for a WordPress JWT, giving you full control over the session without storing passwords.',
    logo: 'assets/img/google-plus.png',
    logoAlt: 'Google OAuth',
    tags: ['OAuth', 'Social Login', 'Passwordless'],
    status: 'beta',
    docsHref: '/docs/applications/google/setup/',
    primaryHref: '/docs/applications/google/setup/',
    primaryLabel: 'Read the docs',
    highlights: [
      'Google ID token → WordPress JWT',
      'Passwordless login flow',
      'Use Google JWT on all endpoints',
      'Full token lifecycle control',
    ],
  },
];

const sdks = [
  {
    id: 'php',
    name: 'PHP Client',
    tagline: 'One Composer package, any PHP framework',
    description:
      'Integrate Simple JWT Login into any PHP app with a single dependency. Works out of the box with Laravel, Yii, CodeIgniter, Slim, and plain PHP.',
    tags: ['PHP', 'Laravel', 'Yii', 'Composer'],
    logos: [
      { src: 'assets/img/frameworks/php.png', alt: 'PHP' },
      { src: 'assets/img/frameworks/laravel.png', alt: 'Laravel' },
      { src: 'assets/img/frameworks/yii.png', alt: 'Yii' },
      { src: 'assets/img/frameworks/codeigniter.png', alt: 'CodeIgniter' },
    ],
    install: 'composer require "nicumicle/simple-jwt-login-client-php"',
    primaryHref: '/ecosystem/php-sdk',
    primaryLabel: 'Learn more',
    secondaryHref: 'https://packagist.org/packages/nicumicle/simple-jwt-login-client-php',
    secondaryLabel: 'Packagist',
  },
  {
    id: 'js',
    name: 'JavaScript Client',
    tagline: 'npm package for any JS framework',
    description:
      'Add Simple JWT Login authentication to React, Vue, Angular, or any JavaScript app with a handful of lines. Works in the browser and in Node.js.',
    tags: ['JavaScript', 'React', 'Vue', 'Angular'],
    logos: [
      { src: 'assets/img/frameworks/javascript.png', alt: 'JavaScript' },
      { src: 'assets/img/frameworks/react.png', alt: 'React' },
      { src: 'assets/img/frameworks/vue.png', alt: 'Vue' },
      { src: 'assets/img/frameworks/angular.png', alt: 'Angular' },
    ],
    install: 'npm install simple-jwt-login',
    primaryHref: '/ecosystem/js-sdk',
    primaryLabel: 'Learn more',
    secondaryHref: 'https://www.npmjs.com/package/simple-jwt-login',
    secondaryLabel: 'npm',
  },
];

/* ── Sub-components ─────────────────────────────────────────── */

function StatusBadge({ status }) {
  if (!status) return null;
  return (
    <span className={clsx(styles.badge, status === 'beta' && styles.badgeBeta)}>
      {status === 'beta' ? 'Beta' : 'Stable'}
    </span>
  );
}

function CheckList({ items }) {
  return (
    <ul className={styles.checkList}>
      {items.map((item) => (
        <li key={item} className={styles.checkItem}>
          <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function AddonCard({ name, tagline, description, icon, tags, status, docsHref, primaryHref, primaryLabel, secondaryHref, secondaryLabel, highlights }) {
  return (
    <div className={styles.addonCard}>
      <div className={styles.addonCardInner}>
        <div className={styles.addonLeft}>
          <div className={styles.addonIcon}><FontAwesomeIcon icon={icon} /></div>
          <div className={styles.addonMeta}>
            <div className={styles.addonNameRow}>
              <h3 className={styles.addonName}>{name}</h3>
              <StatusBadge status={status} />
            </div>
            <p className={styles.addonTagline}>{tagline}</p>
            <p className={styles.addonDesc}>{description}</p>
            <div className={styles.addonTags}>
              {tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
            <div className={styles.addonActions}>
              <Link to={primaryHref} className={sharedStyles.actionButton} title={primaryLabel}>
                {primaryLabel} →
              </Link>
              {secondaryHref && (
                <Link to={secondaryHref} className={sharedStyles.btn} title={secondaryLabel}>
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className={styles.addonRight}>
          <p className={styles.highlightsLabel}>What it does</p>
          <CheckList items={highlights} />
          <Link to={docsHref} className={styles.docsLink} title="View documentation">
            View documentation →
          </Link>
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({ name, tagline, description, logo, logoAlt, tags, status, primaryHref, primaryLabel, highlights }) {
  return (
    <div className={styles.integrationCard}>
      <div className={styles.integrationHeader}>
        <div className={styles.integrationLogoWrap}>
          <img src={logo} alt={logoAlt} className={styles.integrationLogo} />
        </div>
        <div>
          <div className={styles.addonNameRow}>
            <h3 className={styles.integrationName}>{name}</h3>
            <StatusBadge status={status} />
          </div>
          <p className={styles.integrationTagline}>{tagline}</p>
        </div>
      </div>
      <p className={styles.integrationDesc}>{description}</p>
      <div className={styles.addonTags} style={{ marginBottom: '1rem' }}>
        {tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
      </div>
      <CheckList items={highlights} />
      <div className={styles.integrationFooter}>
        <Link to={primaryHref} className={sharedStyles.actionButton} title={primaryLabel}>
          {primaryLabel} →
        </Link>
      </div>
    </div>
  );
}

function SdkCard({ name, tagline, description, tags, logos, install, primaryHref, primaryLabel, secondaryHref, secondaryLabel }) {
  return (
    <div className={styles.sdkCard}>
      <div className={styles.sdkLogos}>
        {logos.map(({ src, alt }) => (
          <img key={alt} src={src} alt={alt} className={styles.sdkLogo} />
        ))}
      </div>
      <h3 className={styles.sdkName}>{name}</h3>
      <p className={styles.sdkTagline}>{tagline}</p>
      <p className={styles.sdkDesc}>{description}</p>
      <div className={styles.addonTags}>
        {tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
      </div>
      <div className={styles.sdkInstall}>
        <code>{install}</code>
      </div>
      <div className={styles.sdkActions}>
        <Link to={primaryHref} className={sharedStyles.actionButton} title={primaryLabel}>
          {primaryLabel} →
        </Link>
        {secondaryHref && (
          <Link to={secondaryHref} className={sharedStyles.btn} title={secondaryLabel}>
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function ProductsPage() {
  return (
    <Layout
      title="Products — Add-ons, Integrations & SDKs"
      description="Explore every add-on, integration, and client SDK built around Simple JWT Login — from WP-CLI to Google OAuth, MailPoet magic links, WPGraphQL, PHP and JavaScript clients."
    >
      <Head>
        <meta property="og:title" content="Products — Simple JWT Login" />
        <meta property="og:description" content="Add-ons, integrations, and SDKs that extend Simple JWT Login." />
      </Head>

      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroEyebrow}>Ecosystem</div>
          <h1 className={styles.heroTitle}>
            Extend Simple JWT Login
          </h1>
          <p className={styles.heroSubtitle}>
            Add-ons, integrations, and client SDKs that bring JWT authentication
            to every corner of your stack — CLI pipelines, headless frontends,
            email campaigns, and more.
          </p>
          <div className={styles.heroStats}>
            {[
              { n: addons.length, label: 'Add-ons' },
              { n: integrations.length, label: 'Integrations' },
              { n: sdks.length, label: 'Client SDKs' },
              { n: '100%', label: 'Free & open source' },
            ].map(({ n, label }) => (
              <div key={label} className={styles.heroStat}>
                <span className={styles.heroStatNum}>{n}</span>
                <span className={styles.heroStatLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main>

        {/* ── Add-ons ───────────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>WordPress plugins</span>
              <h2 className={sharedStyles.sectionTitle}>Add-ons</h2>
              <p className={styles.sectionLead}>
                Standalone WordPress plugins that extend Simple JWT Login with new capabilities.
                Install them the same way you install any WordPress plugin.
              </p>
            </div>
            <div className={styles.addonList}>
              {addons.map((addon) => (
                <AddonCard key={addon.id} {...addon} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Integrations ─────────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Third-party services</span>
              <h2 className={sharedStyles.sectionTitle}>Integrations</h2>
              <p className={styles.sectionLead}>
                Connect Simple JWT Login to the tools you already use. Each integration
                is built into the core plugin — no extra downloads needed.
              </p>
            </div>
            <div className={styles.integrationGrid}>
              {integrations.map((item) => (
                <IntegrationCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SDKs ──────────────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Client libraries</span>
              <h2 className={sharedStyles.sectionTitle}>SDKs</h2>
              <p className={styles.sectionLead}>
                Drop-in client libraries for your frontend or backend application.
                Available on Packagist and npm.
              </p>
            </div>
            <div className={styles.sdkGrid}>
              {sdks.map((sdk) => (
                <SdkCard key={sdk.id} {...sdk} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA strip ─────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaInner}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <div className={styles.ctaText}>
                <h2 className={styles.ctaTitle}>Don't see what you need?</h2>
                <p className={styles.ctaSubtitle}>
                  Simple JWT Login exposes 16 action and filter hooks. Build your own
                  integration — or open an issue on GitHub and let's discuss it.
                </p>
              </div>
              <div className={styles.ctaButtons}>
                <Link to="/docs/hooks/" className={sharedStyles.actionButton} title="Browse hooks documentation">
                  Browse Hooks →
                </Link>
                <Link
                  to="https://github.com/nicumicle/simple-jwt-login/issues"
                  className={sharedStyles.btn}
                  title="Open an issue on GitHub"
                >
                  Open an issue
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
