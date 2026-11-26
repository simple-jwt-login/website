import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal, faEnvelope, faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import CheckList from '@site/src/components/CheckList';
import styles from './index.module.css';
import sharedStyles from '../styles.module.css';
import {useCdnUrl, useCdnBase, resolveCdnUrl} from '@site/src/utils/cdn';

/* ── Data ───────────────────────────────────────────────────── */

const addons = [
  {
    id: 'cli',
    name: translate({id: 'ecosystem.index.addons.cli.name', message: 'WP-CLI Add-on'}),
    tagline: translate({id: 'ecosystem.index.addons.cli.tagline', message: 'JWT from the command line'}),
    description:
      translate({id: 'ecosystem.index.addons.cli.description', message: 'Manage Simple JWT Login without ever opening the WordPress admin. Generate tokens, validate JWTs, revoke sessions, and push config between environments - all scriptable, all automatable.'}),
    icon: faTerminal,
    tags: [translate({id: 'ecosystem.index.addons.cli.tags.0', message: 'DevOps'}), translate({id: 'ecosystem.index.addons.cli.tags.1', message: 'CI/CD'}), translate({id: 'ecosystem.index.addons.cli.tags.2', message: 'Automation'})],
    status: 'stable',
    docsHref: '/docs/cli/',
    primaryHref: '/ecosystem/cli',
    primaryLabel: translate({id: 'ecosystem.index.addons.cli.primaryLabel', message: 'Learn more'}),
    secondaryHref: 'https://github.com/simple-jwt-login/simple-jwt-login-cli',
    secondaryLabel: 'GitHub',
    highlights: [
      translate({id: 'ecosystem.index.addons.cli.highlights.0', message: 'Generate & validate tokens'}),
      translate({id: 'ecosystem.index.addons.cli.highlights.1', message: 'Revoke sessions instantly'}),
      translate({id: 'ecosystem.index.addons.cli.highlights.2', message: 'Export / import config'}),
      translate({id: 'ecosystem.index.addons.cli.highlights.3', message: 'Staging → production migration'}),
    ],
  },
  {
    id: 'mailpoet',
    name: translate({id: 'ecosystem.index.addons.mailpoet.name', message: 'MailPoet Add-on'}),
    tagline: translate({id: 'ecosystem.index.addons.mailpoet.tagline', message: 'Magic-link emails, zero friction'}),
    description:
      translate({id: 'ecosystem.index.addons.mailpoet.description', message: 'Drop a shortcode into any MailPoet campaign and every subscriber gets a personalized, one-click login link. No passwords, no friction - just a seamless email-to-site experience.'}),
    icon: faEnvelope,
    tags: [translate({id: 'ecosystem.index.addons.mailpoet.tags.0', message: 'Email'}), translate({id: 'ecosystem.index.addons.mailpoet.tags.1', message: 'Magic Links'}), 'MailPoet'],
    status: 'stable',
    docsHref: '/docs/mailpoet/',
    primaryHref: '/ecosystem/mailpoet',
    primaryLabel: translate({id: 'ecosystem.index.addons.mailpoet.primaryLabel', message: 'Learn more'}),
    secondaryHref: 'https://wordpress.org/plugins/simple-jwt-login-mailpoet',
    secondaryLabel: translate({id: 'ecosystem.index.addons.mailpoet.secondaryLabel', message: 'Download'}),
    highlights: [
      translate({id: 'ecosystem.index.addons.mailpoet.highlights.0', message: 'personalized login links per recipient'}),
      translate({id: 'ecosystem.index.addons.mailpoet.highlights.1', message: 'Works with any MailPoet template'}),
      translate({id: 'ecosystem.index.addons.mailpoet.highlights.2', message: 'Time-limited, single-use tokens'}),
      translate({id: 'ecosystem.index.addons.mailpoet.highlights.3', message: 'No custom code needed'}),
    ],
  },
  {
    id: 'export-import',
    name: translate({id: 'ecosystem.index.addons.exportImport.name', message: 'Export & Import Add-on'}),
    tagline: translate({id: 'ecosystem.index.addons.exportImport.tagline', message: 'Move your config in one command'}),
    description:
      translate({id: 'ecosystem.index.addons.exportImport.description', message: 'Back up your complete Simple JWT Login configuration - Auth Codes, protection rules, and all settings - and restore it on any site. Ideal for staging migrations and multi-site setups.'}),
    icon: faBoxArchive,
    tags: [translate({id: 'ecosystem.index.addons.exportImport.tags.0', message: 'Migration'}), translate({id: 'ecosystem.index.addons.exportImport.tags.1', message: 'DevOps'}), translate({id: 'ecosystem.index.addons.exportImport.tags.2', message: 'Backup'})],
    status: 'stable',
    docsHref: '/docs/export-import/',
    primaryHref: '/ecosystem/export-import',
    primaryLabel: translate({id: 'ecosystem.index.addons.exportImport.primaryLabel', message: 'Learn more'}),
    secondaryHref: 'https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip',
    secondaryLabel: translate({id: 'ecosystem.index.addons.exportImport.secondaryLabel', message: 'Download'}),
    highlights: [
      translate({id: 'ecosystem.index.addons.exportImport.highlights.0', message: 'Full config backup & restore'}),
      translate({id: 'ecosystem.index.addons.exportImport.highlights.1', message: 'Auth Codes included'}),
      translate({id: 'ecosystem.index.addons.exportImport.highlights.2', message: 'Works across any WP installs'}),
      translate({id: 'ecosystem.index.addons.exportImport.highlights.3', message: 'JSON-based, human-readable'}),
    ],
  },
];

const integrations = [
  {
    id: 'wpgraphql',
    name: 'WPGraphQL',
    tagline: translate({id: 'ecosystem.index.integrations.wpgraphql.tagline', message: 'JWT authentication for GraphQL'}),
    description:
      translate({id: 'ecosystem.index.integrations.wpgraphql.description', message: 'Use the same JWTs you issue through Simple JWT Login to authenticate any WPGraphQL query or mutation. Enable it with a single checkbox - no code, no custom middleware.'}),
    logo: 'assets/images/screenshots/third-party-integrations/wpgraphql-logo.png',
    logoAlt: translate({id: 'ecosystem.index.integrations.wpgraphql.logoAlt', message: 'WPGraphQL logo'}),
    tags: ['GraphQL', translate({id: 'ecosystem.index.integrations.wpgraphql.tags.1', message: 'Headless'}), translate({id: 'ecosystem.index.integrations.wpgraphql.tags.2', message: 'REST-free'})],
    status: 'stable',
    docsHref: '/docs/integrations/third-party/wpgraphql/',
    primaryHref: '/docs/integrations/third-party/wpgraphql/',
    primaryLabel: translate({id: 'ecosystem.index.integrations.wpgraphql.primaryLabel', message: 'Read the docs'}),
    highlights: [
      translate({id: 'ecosystem.index.integrations.wpgraphql.highlights.0', message: 'Authenticate queries & mutations'}),
      translate({id: 'ecosystem.index.integrations.wpgraphql.highlights.1', message: 'One-checkbox setup'}),
      translate({id: 'ecosystem.index.integrations.wpgraphql.highlights.2', message: 'Works with React, Vue, Next.js'}),
      translate({id: 'ecosystem.index.integrations.wpgraphql.highlights.3', message: 'Same tokens as REST API'}),
    ],
  },
  {
    id: 'google',
    name: 'Google OAuth',
    tagline: translate({id: 'ecosystem.index.integrations.google.tagline', message: 'Sign in with Google'}),
    description:
      translate({id: 'ecosystem.index.integrations.google.description', message: 'Let users authenticate with their Google Account. Simple JWT Login exchanges a Google ID token for a WordPress JWT, giving you full control over the session without storing passwords.'}),
    logo: 'assets/images/features/google-plus.png',
    logoAlt: 'Google OAuth',
    tags: [translate({id: 'ecosystem.index.integrations.google.tags.0', message: 'OAuth'}), translate({id: 'ecosystem.index.integrations.google.tags.1', message: 'Social Login'}), translate({id: 'ecosystem.index.integrations.google.tags.2', message: 'Passwordless'})],
    status: 'beta',
    docsHref: '/docs/integrations/oauth/google/setup',
    primaryHref: '/docs/integrations/oauth/google/setup',
    primaryLabel: translate({id: 'ecosystem.index.integrations.google.primaryLabel', message: 'Read the docs'}),
    highlights: [
      translate({id: 'ecosystem.index.integrations.google.highlights.0', message: 'Google ID token → WordPress JWT'}),
      translate({id: 'ecosystem.index.integrations.google.highlights.1', message: 'Passwordless login flow'}),
      translate({id: 'ecosystem.index.integrations.google.highlights.2', message: 'Use Google JWT on all endpoints'}),
      translate({id: 'ecosystem.index.integrations.google.highlights.3', message: 'Full token lifecycle control'}),
    ],
  },
];

const sdks = [
  {
    id: 'php',
    name: translate({id: 'ecosystem.index.sdks.php.name', message: 'PHP Client'}),
    tagline: translate({id: 'ecosystem.index.sdks.php.tagline', message: 'One Composer package, any PHP framework'}),
    description:
      translate({id: 'ecosystem.index.sdks.php.description', message: 'Integrate Simple JWT Login into any PHP app with a single dependency. Works out of the box with Laravel, Yii, CodeIgniter, Slim, and plain PHP.'}),
    tags: ['PHP', 'Laravel', 'Yii', 'Composer'],
    logos: [
      { src: 'assets/images/frameworks/php.png', alt: 'PHP' },
      { src: 'assets/images/frameworks/laravel.png', alt: 'Laravel' },
      { src: 'assets/images/frameworks/yii.png', alt: 'Yii' },
      { src: 'assets/images/frameworks/codeigniter.png', alt: 'CodeIgniter' },
    ],
    install: 'composer require "nicumicle/simple-jwt-login-client-php"',
    primaryHref: '/ecosystem/php-sdk',
    primaryLabel: translate({id: 'ecosystem.index.sdks.php.primaryLabel', message: 'Learn more'}),
    secondaryHref: 'https://packagist.org/packages/nicumicle/simple-jwt-login-client-php',
    secondaryLabel: 'Packagist',
  },
  {
    id: 'js',
    name: translate({id: 'ecosystem.index.sdks.js.name', message: 'JavaScript Client'}),
    tagline: translate({id: 'ecosystem.index.sdks.js.tagline', message: 'npm package for any JS framework'}),
    description:
      translate({id: 'ecosystem.index.sdks.js.description', message: 'Add Simple JWT Login authentication to React, Vue, Angular, or any JavaScript app with a handful of lines. Works in the browser and in Node.js.'}),
    tags: ['JavaScript', 'React', 'Vue', 'Angular'],
    logos: [
      { src: 'assets/images/frameworks/javascript.png', alt: 'JavaScript' },
      { src: 'assets/images/frameworks/react.png', alt: 'React' },
      { src: 'assets/images/frameworks/vue.png', alt: 'Vue' },
      { src: 'assets/images/frameworks/angular.png', alt: 'Angular' },
    ],
    install: 'npm install simple-jwt-login',
    primaryHref: '/ecosystem/js-sdk',
    primaryLabel: translate({id: 'ecosystem.index.sdks.js.primaryLabel', message: 'Learn more'}),
    secondaryHref: 'https://www.npmjs.com/package/simple-jwt-login',
    secondaryLabel: 'npm',
  },
];

/* ── Sub-components ─────────────────────────────────────────── */

function StatusBadge({ status }) {
  if (!status) return null;
  return (
    <span className={clsx(styles.badge, status === 'beta' && styles.badgeBeta)}>
      {status === 'beta'
        ? <Translate id="ecosystem.index.status.beta">Beta</Translate>
        : <Translate id="ecosystem.index.status.stable">Stable</Translate>}
    </span>
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
          <p className={styles.highlightsLabel}><Translate id="ecosystem.index.addonCard.whatItDoes">What it does</Translate></p>
          <CheckList items={highlights} className={styles.checkList} />
          <Link to={docsHref} className={styles.docsLink} title={translate({id: 'ecosystem.index.addonCard.viewDocsTitle', message: 'View documentation'})}>
            <Translate id="ecosystem.index.addonCard.viewDocs">View documentation →</Translate>
          </Link>
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({ name, tagline, description, logo, logoAlt, tags, status, primaryHref, primaryLabel, highlights }) {
  const logoSrc = useCdnUrl(logo);
  return (
    <div className={styles.integrationCard}>
      <div className={styles.integrationHeader}>
        <div className={styles.integrationLogoWrap}>
          <img src={logoSrc} alt={logoAlt} className={styles.integrationLogo} />
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
      <CheckList items={highlights} className={styles.checkList} />
      <div className={styles.integrationFooter}>
        <Link to={primaryHref} className={sharedStyles.actionButton} title={primaryLabel}>
          {primaryLabel} →
        </Link>
      </div>
    </div>
  );
}

function SdkCard({ name, tagline, description, tags, logos, install, primaryHref, primaryLabel, secondaryHref, secondaryLabel }) {
  const cdnBase = useCdnBase();
  return (
    <div className={styles.sdkCard}>
      <div className={styles.sdkLogos}>
        {logos.map(({ src, alt }) => (
          <img key={alt} src={resolveCdnUrl(cdnBase, src)} alt={alt} className={styles.sdkLogo} />
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
export default function EcosystemPage() {
  return (
    <Layout
      title={translate({id: 'ecosystem.index.meta.title', message: 'Ecosystem - Add-ons, Integrations & SDKs'})}
      description={translate({id: 'ecosystem.index.meta.description', message: 'Explore every add-on, integration, and SDK for Simple JWT Login - WP-CLI, Google OAuth, MailPoet, WPGraphQL, PHP and JS clients.'})}
    >
      <Head>
        <meta property="og:title" content={translate({id: 'ecosystem.index.meta.ogTitle', message: 'Ecosystem - Simple JWT Login'})} />
        <meta property="og:description" content={translate({id: 'ecosystem.index.meta.ogDescription', message: 'Add-ons, integrations, and SDKs that extend Simple JWT Login.'})} />
      </Head>

      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroEyebrow}><Translate id="ecosystem.index.hero.eyebrow">Ecosystem</Translate></div>
          <h1 className={styles.heroTitle}>
            <Translate id="ecosystem.index.hero.title">Extend Simple JWT Login</Translate>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="ecosystem.index.hero.subtitle">{'Add-ons, integrations, and client SDKs that bring JWT authentication to every corner of your stack - CLI pipelines, headless frontends, email campaigns, and more.'}</Translate>
          </p>
          <div className={styles.heroStats}>
            {[
              { n: addons.length, label: translate({id: 'ecosystem.index.hero.stats.addons', message: 'Add-ons'}) },
              { n: integrations.length, label: translate({id: 'ecosystem.index.hero.stats.integrations', message: 'Integrations'}) },
              { n: sdks.length, label: translate({id: 'ecosystem.index.hero.stats.sdks', message: 'Client SDKs'}) },
              { n: '100%', label: translate({id: 'ecosystem.index.hero.stats.free', message: 'Free & open source'}) },
            ].map(({ n, label }, i) => (
              <div key={i} className={styles.heroStat}>
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
              <span className={styles.sectionEyebrow}><Translate id="ecosystem.index.addons.eyebrow">WordPress plugins</Translate></span>
              <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.index.addons.title">Add-ons</Translate></h2>
              <p className={styles.sectionLead}>
                <Translate id="ecosystem.index.addons.lead">{'Standalone WordPress plugins that extend Simple JWT Login with new capabilities. Install them the same way you install any WordPress plugin.'}</Translate>
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
              <span className={styles.sectionEyebrow}><Translate id="ecosystem.index.integrations.eyebrow">Third-party services</Translate></span>
              <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.index.integrations.title">Integrations</Translate></h2>
              <p className={styles.sectionLead}>
                <Translate id="ecosystem.index.integrations.lead">{'Connect Simple JWT Login to the tools you already use. Each integration is built into the core plugin - no extra downloads needed.'}</Translate>
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
              <span className={styles.sectionEyebrow}><Translate id="ecosystem.index.sdks.eyebrow">Client libraries</Translate></span>
              <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.index.sdks.title">SDKs</Translate></h2>
              <p className={styles.sectionLead}>
                <Translate id="ecosystem.index.sdks.lead">{'Drop-in client libraries for your frontend or backend application. Available on Packagist and npm.'}</Translate>
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
                <h2 className={styles.ctaTitle}><Translate id="ecosystem.index.cta.title">{"Don't see what you need?"}</Translate></h2>
                <p className={styles.ctaSubtitle}>
                  <Translate id="ecosystem.index.cta.subtitle">{"Simple JWT Login exposes 16 action and filter hooks. Build your own integration - or open an issue on GitHub and let's discuss it."}</Translate>
                </p>
              </div>
              <div className={styles.ctaButtons}>
                <Link to="/docs/hooks/" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.index.cta.hooksTitle', message: 'Browse hooks documentation'})}>
                  <Translate id="ecosystem.index.cta.hooks">Browse Hooks →</Translate>
                </Link>
                <Link
                  to="https://github.com/nicumicle/simple-jwt-login/issues"
                  className={sharedStyles.btn}
                  title={translate({id: 'ecosystem.index.cta.issueTitle', message: 'Open an issue on GitHub'})}
                >
                  <Translate id="ecosystem.index.cta.issue">Open an issue</Translate>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
