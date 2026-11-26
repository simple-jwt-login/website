import React, {useState, useMemo} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Feature from "@site/src/components/feature/feature";
import Review from "@site/src/components/review/review";
import DownloadButton from "@site/src/components/DownloadButton";
import {useCdnUrl, useCdnBase, resolveCdnUrl} from '@site/src/utils/cdn';
import { ACTIVE_INSTALLS, TOTAL_DOWNLOADS, RATING, BEST_RATING, RATING_COUNT, ACTIVE_YEARS, formatNumber } from '@site/src/data/pluginStats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt, faLock, faRocket, faWrench, faGlobe, faLink,
  faArrowsRotate, faHeart, faStar, faChartLine, faEarthEurope,
  faKey, faShieldHalved, faUserShield, faClipboardList, faBell,
  faCartShopping, faLayerGroup, faVial, faPlay,
  faBug, faCodeBranch, faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { faPhp, faWordpress } from '@fortawesome/free-brands-svg-icons'

import styles from './styles.module.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Simple JWT Login',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'WordPress Plugin',
  operatingSystem: 'WordPress 6.2+, PHP 5.5+',
  description: 'Free, open-source WordPress plugin that adds JWT authentication to the WordPress REST API. Supports login, register, auto-login, endpoint protection, token refresh, and more.',
  url: 'https://wordpress.org/plugins/simple-jwt-login/',
  downloadUrl: 'https://downloads.wordpress.org/plugin/simple-jwt-login.latest-stable.zip',
  softwareVersion: 'latest',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: String(RATING),
    bestRating: String(BEST_RATING),
    ratingCount: String(RATING_COUNT),
  },
  author: {
    '@type': 'Person',
    name: 'Nicu Micle',
    url: 'https://github.com/nicumicle',
  },
};

const awesomeFeatures = [
  {
    title: <>Autologin</>,
    description: <>Open a WordPress session from a JWT link - for example, send a renewal email that lands the member on their account page, already logged in.</>,
    image: "assets/svg/login-user-2.svg",
    alt: "Login user",
    link: "/docs/autologin/",
    version: "both",
  },
  {
    title: <>Register Users</>,
    description: <>Create WordPress users from a mobile sign-up screen, and limit who can register by Auth Code, IP, or email domain.</>,
    image: "assets/svg/create-user.svg",
    alt: "Register user",
    link: "/docs/register-user/",
    version: "both",
  },
  {
    title: <>Delete Users</>,
    description: <>Offer an account deletion button in your app. The JWT identifies the account to remove.</>,
    image: "assets/svg/delete-user.svg",
    alt: "Delete user",
    link: "/docs/delete-user/",
    version: "both",
  },
  {
    title: <>Authenticate Users</>,
    description: <>Exchange WordPress credentials for a JWT, then refresh, validate, or revoke it - the login flow for a React or mobile app.</>,
    image: "assets/svg/authenticate-user.svg",
    alt: "Authenticate user",
    link: "/docs/authentication/",
    version: "both",
  },
  {
    title: <>Change &amp; Reset Password</>,
    description: <>Build a "Forgot password" screen in your app: email a reset code, then set the new password through the REST API.</>,
    image: "assets/images/features/password.png",
    alt: "Change and Reset password",
    link: "/docs/reset-password/",
    version: "both",
  },
  {
    title: <>Limit Access by IP</>,
    description: <>Accept logins or registrations only from your backend or office network - wildcards such as <code>85.*.*.*</code> work too.</>,
    image: "assets/images/features/ip.png",
    alt: "Limit access by IP",
    link: "/docs/authentication/#access-control",
    version: "both",
  },
  {
    title: <>Create Users with Different Roles</>,
    description: <>Tie a role to each Auth Code - for example, one code for free members and another for premium - on a single endpoint.</>,
    image: "assets/images/features/roles.png",
    alt: "Roles",
    link: "/docs/register-user/#new-user-settings",
    version: "both",
  },
  {
    title: <>Integrate with Other Plugins</>,
    description: <>Send login links from MailPoet, authorize WPGraphQL queries, or call the REST routes that other plugins add.</>,
    image: "assets/images/features/plug-in.png",
    alt: "Integrate with other plugins",
    link: "/docs/mailpoet/",
    version: "both",
  },
  {
    title: <>Protect Endpoints</>,
    description: <>Require a JWT or a role per route and HTTP method - for example, stop anonymous visitors from listing <code>/wp/v2/users</code>.</>,
    image: "assets/images/features/protect-endpoints.png",
    alt: "Protect endpoints",
    link: "/docs/protect-endpoints/",
    version: "both",
  },
  {
    title: <>Use JWT on Any Endpoint</>,
    description: <>Publish a post to <code>/wp/v2/posts</code> from a mobile app as the logged-in author, without session cookies.</>,
    image: "assets/images/features/protect.png",
    alt: "JWT on other endpoints",
    link: "/docs/configuration#jwt-middleware-for-all-wordpress-endpoints",
    version: "both",
  },
  {
    title: <>Google OAuth Integration</>,
    description: <>Add Google sign-in to your front end and get a WordPress JWT back, so users have no extra password to remember.</>,
    image: "assets/images/features/google-plus.png",
    alt: "Google OAuth",
    link: "/docs/integrations/oauth/google/setup",
    version: "both",
  },
  {
    title: <>Use Google JWT on All Endpoints</>,
    description: <>Already use Google sign-in in your app? Send the Google-issued token directly to WordPress REST endpoints.</>,
    image: "assets/images/features/google-plus-jwt.png",
    alt: "Google OAuth endpoints",
    link: "/docs/integrations/oauth/#allow-usage-on-all-endpoints",
    version: "both",
  },
  {
    title: <>API Keys</>,
    description: <>Give a CI pipeline a key that can only read and create content, with an expiry date you choose.</>,
    faIcon: faKey,
    alt: "API Keys",
    link: "/docs/api-keys/",
    version: "v4",
  },
  {
    title: <>Sign In with Auth0, Facebook &amp; GitHub</>,
    description: <>Use the identity provider you already have: exchange an Auth0, Facebook, or GitHub login for a WordPress JWT.</>,
    faIcon: faShieldHalved,
    alt: "OAuth with Auth0, Facebook, and GitHub",
    link: "/docs/integrations/oauth/",
    version: "v4",
  },
  {
    title: <>Two-Factor Authentication</>,
    description: <>A stolen password alone gets no JWT: users with 2FA in the WordPress Two Factor plugin must also enter their code.</>,
    faIcon: faUserShield,
    alt: "Two-Factor Authentication",
    link: "/docs/integrations/third-party/two-factor/",
    version: "v4",
  },
  {
    title: <>Audit Logs</>,
    description: <>Find out who deleted an account or why a login failed - search authentication events in wp-admin.</>,
    faIcon: faClipboardList,
    alt: "Audit Logs",
    link: "/docs/audit-logs/",
    version: "v4",
  },
  {
    title: <>Webhooks</>,
    description: <>Post to Slack when a user registers, or forward authentication events to your logging service.</>,
    faIcon: faBell,
    alt: "Webhooks",
    link: "/docs/webhooks/",
    version: "v4",
  },
  {
    title: <>Headless WooCommerce</>,
    description: <>Build a React storefront: manage products and run the cart &amp; checkout through the WooCommerce REST and Store APIs.</>,
    faIcon: faCartShopping,
    alt: "Headless WooCommerce",
    link: "/docs/integrations/third-party/woocommerce/",
    version: "v4",
  },
  {
    title: <>Multiple JWT Decryption Keys</>,
    description: <>Accept Auth0 tokens next to your own, or rotate keys in stages - rules pick the key from a JWT header or payload claim.</>,
    faIcon: faLayerGroup,
    alt: "Multiple JWT Decryption Keys",
    link: "/docs/configuration#jwt-verification-rules",
    version: "v4",
  },
  {
    title: <>JWT Decoder</>,
    description: <>Debug a rejected token without pasting it into a third-party site: read its header and payload in wp-admin.</>,
    faIcon: faVial,
    alt: "JWT Decoder",
    link: "/docs/dashboard/",
    version: "v4",
  },
];

const reviews = [
  {
    title: <>Awesome plugin</>,
    description: <>The plugin works perfect and the support is even better!</>,
    author: <>@PDXMUSIC</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/pdxmusic/",
  },
  {
    title: <>Thanks for a great plugin</>,
    description: <>Works like a dream. Does what it needs to do. Thanks!</>,
    author: <>@lejager</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/lejager/",
  },
  {
    title: <>Amazing work</>,
    description: <>This plugin serves now as a one-stop shop for JWT authentication, esp for headless WP/web app setups. The even better part is the author who's extremely helpful, swift in responding &amp; fixing issues, acknowledging improvement suggestions, pleasing to talk to and patient. I hope you can keep up the dedicated work, Nicu!</>,
    author: <>@nilsnolde</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/nilsnolde/",
  },
  {
    title: <>Really good plugin, very straight forward</>,
    description: <>Really good plugin, very straight forward to use</>,
    author: <>@mdruart</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/mdruart/",
  },
  {
    title: <>No-Nonsense JWT (Excellence)</>,
    description: <>This is probably the very absolute best no-nonsense JWT plugin on WordPress. Exceptionally well documented, high customization, easy to setup, and works out of the box with basic setup. No nonsense ads, either. Definitely deserving the 5-star rating across the board. Recommended.</>,
    author: <>@thehinesgaphideaway</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/topic/no-nonsense-jwt-excellence/",
  },
  {
    title: <>Service &amp; Support</>,
    description: <>JWT login plugin is awesome, their support is quite responsive and efficient. They are able to help me and guide me on my customize function to custom generate jwt using their classes.</>,
    author: <>@wintear</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/topic/service-support/",
  },
  {
    title: <>Awesome plugin</>,
    description: <>This is what I needed, works as expected. Nice work!</>,
    author: <>@graphems</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/topic/awesome-plugin-6632/",
  },
  {
    title: <>best all times</>,
    description: <>it's the best of all JWT plugins, the responsiveness of the developer is simply incredible, he knows his project by heart and will help you efficiently.</>,
    author: <>@bigbear67</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/topic/best-all-times/",
  },
];

const GITHUB_REPO = 'https://github.com/nicumicle/simple-jwt-login';

// Same live demo as the GitHub README (WordPress Playground blueprint).
const PLAYGROUND_URL = 'https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/nicumicle/simple-jwt-login/master/wordpress.org/assets/blueprints/blueprint.json';

// Only list practices that are verifiable in the public repo - no certifications or audit claims.
const SECURITY_ITEMS = [
  { icon: faLock,         title: 'Off by default',               desc: 'Every plugin endpoint starts disabled. You expose only the operations your app needs.', href: '/blog/simple-jwt-login-security-hardening/', linkLabel: 'Hardening guide' },
  { icon: faGlobe,        title: 'Cross-site request checks',    desc: 'Cookie and session JWTs are ignored on cross-site requests unless you list that exact origin, which blocks CSRF.', href: '/docs/configuration#cross-site-requests', linkLabel: 'How it works' },
  { icon: faArrowsRotate, title: 'Tokens you can take back',     desc: 'Refresh tokens rotate on every use, JWTs can be revoked, and an optional setting ends sessions when a password changes.', href: '/docs/authentication/#revoke-sessions-on-password-change', linkLabel: 'Session revocation' },
  { icon: faKey,          title: 'Hashed, least-privilege keys', desc: 'API keys are stored only as SHA-256 hashes. Permissions follow the dispatched method, so method overrides cannot raise them.', href: '/docs/api-keys/', linkLabel: 'API key design' },
  { icon: faBug,          title: 'Security vulnerability fixes', desc: 'Reported vulnerabilities are fixed and shipped in regular releases, documented in the release notes.', href: '/releases/tags/security', linkLabel: 'Security releases' },
  { icon: faVial,         title: 'Security regression tests',    desc: 'A dedicated security test suite covers CSRF, user enumeration, trusted proxy IPs and ambient credentials, so fixed issues stay fixed.', href: `${GITHUB_REPO}/tree/master/tests/Feature/Security`, linkLabel: 'Browse the tests' },
  { icon: faCodeBranch,   title: 'Continuous integration',       desc: 'Unit, feature and cross-site test suites run automatically in GitHub Actions.', href: `${GITHUB_REPO}/actions`, linkLabel: 'CI workflows' },
  { icon: faWordpress,    title: 'WordPress compatibility testing', desc: 'Feature tests run against a real WordPress install, alongside PHP syntax checks across multiple PHP versions and the official WordPress Plugin Check.', href: `${GITHUB_REPO}/tree/master/.github/workflows`, linkLabel: 'View the workflows' },
  { icon: faEnvelope,     title: 'Responsible disclosure',       desc: 'Found a vulnerability? Report it privately through GitHub security advisories instead of opening a public issue, so a fix can ship before details go public.', href: `${GITHUB_REPO}/security/advisories/new`, linkLabel: 'Report a vulnerability' },
];

function RecentPosts() {
  const recentPosts = require("../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json");
  const articleIconSrc = useCdnUrl('assets/svg/article.svg');
  if (recentPosts === null || typeof recentPosts.blogPosts !== 'object') return null;
  return (
    <section className={styles.sectionPadding}>
      <div className="container">
        <span className={styles.sectionEyebrow}>Blog</span>
        <h2 className={styles.sectionTitle}>From the blog</h2>
        <div className="row">
          {recentPosts.blogPosts.slice(0, 6).map((item, index) => (
            <div className="col col--4 text-center" id={"blog-post" + index} key={"key" + index}>
              <div className={styles.blogPostHomepage}>
                <img src={articleIconSrc} alt="Blog Article" title={item.metadata.title} width="100" height="100" />
                <span className={styles.blogPostHomepageDate}>{item.metadata.formattedDate}</span>
                <h3>
                  <a href={item.metadata.permalink} aria-label={item.metadata.title} title={item.metadata.title}>
                    {item.metadata.title}
                  </a>
                </h3>
                <p>{item.metadata.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'v3', label: 'V3' },
  { key: 'v4', label: 'V4' },
];

function matchesFeatureFilter(feature, filter) {
  if (filter === 'v3') return feature.version === 'both';
  if (filter === 'v4') return feature.version === 'v4' || feature.version === 'both';
  return true;
}

export default function HomePage() {
  const cdnBase = useCdnBase();
  const heroLogoSrc = resolveCdnUrl(cdnBase, 'assets/favicons/apple-touch-icon.png');
  const [featureFilter, setFeatureFilter] = useState('all');
  const filteredFeatures = useMemo(
    () => awesomeFeatures.filter((feature) => matchesFeatureFilter(feature, featureFilter)),
    [featureFilter]
  );
  return (
    <Layout
      title="Free WordPress JWT Authentication Plugin"
      description="Simple JWT Login is a free, open-source WordPress plugin that adds JWT authentication to the REST API - no coding required."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroEyebrow}>Free &amp; Open Source WordPress Plugin</div>
          <img
            src={heroLogoSrc}
            alt="Simple JWT Login logo"
            title="Simple JWT Login logo"
            width="88"
            height="88"
            className={styles.heroLogo}
          />
          <h1 className={styles.heroTitle}>Simple JWT Login</h1>
          <p className={styles.heroSubtitle}>
            JWT login, registration, and endpoint protection for the WordPress REST API -<br className={styles.heroBreak} />
            for headless sites, mobile apps, and WPGraphQL. Configured from wp-admin.
          </p>
          <div className={styles.heroCta}>
            <Link to="/docs/" className={styles.actionButton} title="Get started">
              Get started →
            </Link>
            <Link to={PLAYGROUND_URL} className={styles.tryButton} title="Open the Simple JWT Login live demo in WordPress Playground">
              <FontAwesomeIcon icon={faPlay} /> Live Demo
            </Link>
            <DownloadButton />
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{formatNumber(ACTIVE_INSTALLS)}+</span>
              <span className={styles.heroStatLabel}>Active installs</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{formatNumber(TOTAL_DOWNLOADS)}+</span>
              <span className={styles.heroStatLabel}>Downloads</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{RATING} / 5</span>
              <span className={styles.heroStatLabel}>Rating</span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>100%</span>
              <span className={styles.heroStatLabel}>Free</span>
            </div>
            <br />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{ACTIVE_YEARS}+ years</span>
              <span className={styles.heroStatLabel}>Active development</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── v4 Announcement Banner ────────────────────────── */}
      <div className={styles.v4Banner}>
        <div className={styles.v4BannerInner}>
          <span className={styles.v4BannerBadge}>New</span>
          <span className={styles.v4BannerText}>Simple JWT Login v4 is now available - API Keys, 2FA, Audit Logs, Webhooks, and more. v3 is now in maintenance mode (EOL Jan 31, 2027).</span>
          <Link to="/v4" className={styles.v4BannerLink} title="See what's new in v4">
            See what's new →
          </Link>
        </div>
      </div>

      <main>

        {/* ── Features ──────────────────────────────────────── */}
        {awesomeFeatures.length > 0 && (
          <section className={clsx(styles.sectionPadding, styles.features)}>
            <div className="container">
              <span className={styles.sectionEyebrow}>Core Features</span>
              <h2 className={styles.sectionTitle}>From first login to token revocation</h2>
              <p className={styles.sectionLead}>
                Each feature is tagged <strong>V3</strong> or <strong>V4</strong> depending on which version introduced it.
              </p>
              <div className={styles.featureFilterBar} role="group" aria-label="Filter features by version">
                {FEATURE_FILTERS.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    className={clsx(styles.featureFilterBtn, featureFilter === key && styles.featureFilterBtnActive)}
                    onClick={() => setFeatureFilter(key)}
                    aria-pressed={featureFilter === key}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="row">
                {filteredFeatures.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Why Choose ────────────────────────────────────── */}
        <section className={clsx(styles.sectionPadding, styles.sectionGray)}>
          <div className="container">
            <span className={styles.sectionEyebrow}>Benefits</span>
            <h2 className={styles.sectionTitle}>Why developers choose Simple JWT Login</h2>
            <div className={styles.whyGrid}>
              {[
                { icon: faBolt,          title: 'No coding required',     desc: 'Keys, expiration, allowed IPs, and protected routes are all settings in wp-admin.' },
                { icon: faLock,          title: '6 supported algorithms', desc: 'Sign with a shared secret (HS256/384/512), or use RS256/384/512 so other services can verify tokens with only the public key.' },
                { icon: faRocket,        title: '4 JWT delivery methods', desc: 'Authorization header, cookie, session, or request parameter. Turn off the ones your app does not use.' },
                { icon: faWrench,        title: 'Built for developers',   desc: 'Action and filter hooks let you add JWT claims, block a login, or change an API response from your own plugin.' },
                { icon: faGlobe,         title: 'CORS per origin',        desc: 'List the exact front-end origins that can call your API, so a React or Vue app on another domain can log users in.' },
                { icon: faPhp,           title: 'PHP 5.5+ compatible',    desc: 'The plugin code runs on PHP 5.5+, so your WordPress version sets the minimum. PHP 8.2 or newer is recommended in production.' },
                { icon: faLink,          title: 'Auto-login & magic links', desc: 'Put a short-lived JWT in an email link and the subscriber lands on the page already logged in.' },
                { icon: faArrowsRotate,  title: 'Full token lifecycle',   desc: 'Keep a mobile user signed in with refresh tokens, and revoke the JWT when they log out.' },
                { icon: faHeart,         title: 'Free & open source',     desc: 'GPL 3.0 licensed, free and open-source, forever. No paid tier and no locked features.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className={styles.whyCard}>
                  <div className={styles.whyCardIcon}><FontAwesomeIcon icon={icon} /></div>
                  <h3 className={styles.whyCardTitle}>{title}</h3>
                  <p className={styles.whyCardDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Security & maintenance ────────────────────────── */}
        <section className={styles.sectionPadding}>
          <div className="container">
            <span className={styles.sectionEyebrow}>Security</span>
            <h2 className={styles.sectionTitle}>Secure defaults you can verify</h2>
            <p className={styles.sectionLead}>
              A login plugin guards your whole site. Here is how the latest v4 release limits what an attacker can do,
              and how the project tests and fixes it - each card links to the details.
            </p>
            <div className={styles.whyGrid}>
              {SECURITY_ITEMS.map(({ icon, title, desc, href, linkLabel }) => (
                <div key={title} className={styles.whyCard}>
                  <div className={styles.whyCardIcon}><FontAwesomeIcon icon={icon} /></div>
                  <h3 className={styles.whyCardTitle}>{title}</h3>
                  <p className={styles.whyCardDesc}>{desc}</p>
                  <Link to={href} className={styles.communityCardLink}>{linkLabel} →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Recent posts ──────────────────────────────────── */}
        <RecentPosts />

        {/* ── Ecosystem ─────────────────────────────────────── */}
        <section className={styles.sectionPadding}>
          <div className="container">
            <span className={styles.sectionEyebrow}>Ecosystem</span>
            <h2 className={styles.sectionTitle}>SDKs and integrations for PHP, JavaScript, WPGraphQL, and WP-CLI</h2>
            <div className="row" style={{ rowGap: '1.5rem' }}>
              {[
                {
                  title: 'PHP',
                  desc: 'Connect any PHP app to Simple JWT Login with one Composer package - supports Laravel, Yii, CodeIgniter, and more.',
                  logos: [
                    { src: 'assets/images/frameworks/php.png', alt: 'PHP' },
                    { src: 'assets/images/frameworks/laravel.png', alt: 'Laravel' },
                    { src: 'assets/images/frameworks/yii.png', alt: 'Yii' },
                    { src: 'assets/images/frameworks/codeigniter.png', alt: 'CodeIgniter' },
                  ],
                  code: 'composer require "nicumicle/simple-jwt-login-client-php"',
                  href: '/ecosystem/php-sdk',
                  cta: 'Learn more',
                  download: 'https://packagist.org/packages/nicumicle/simple-jwt-login-client-php',
                },
                {
                  title: 'JavaScript',
                  desc: 'Add JWT authentication to React, Vue, Angular, or any JS app with an npm package and a handful of lines.',
                  logos: [
                    { src: 'assets/images/frameworks/javascript.png', alt: 'JavaScript' },
                    { src: 'assets/images/frameworks/vue.png', alt: 'Vue' },
                    { src: 'assets/images/frameworks/react.png', alt: 'React' },
                    { src: 'assets/images/frameworks/angular.png', alt: 'Angular' },
                  ],
                  code: 'npm install simple-jwt-login',
                  href: '/ecosystem/js-sdk',
                  cta: 'Learn more',
                  download: 'https://www.npmjs.com/package/simple-jwt-login',
                },
                {
                  title: 'WPGraphQL',
                  desc: 'Use your JWTs to authenticate GraphQL queries and mutations - enable it with a single checkbox.',
                  logos: [{ src: 'assets/images/screenshots/third-party-integrations/wpgraphql-logo.png', alt: 'WPGraphQL' }],
                  href: '/docs/integrations/third-party/wpgraphql/',
                  cta: 'Learn more',
                },
                {
                  title: 'MailPoet',
                  desc: 'Send magic-link login emails via MailPoet - let subscribers log in with one click, no password required.',
                  logos: [],
                  href: '/ecosystem/mailpoet',
                  cta: 'Learn more',
                  download: 'https://wordpress.org/plugins/simple-jwt-login-mailpoet',
                },
                {
                  title: 'Export & Import',
                  desc: 'Back up and restore your entire plugin configuration in one click - perfect for staging-to-production migrations.',
                  logos: [],
                  href: '/ecosystem/export-import',
                  cta: 'Learn more',
                  download: 'https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip',
                },
                {
                  title: 'WP-CLI',
                  desc: 'Generate tokens, validate JWTs, revoke sessions, and manage every setting from your terminal - ideal for CI/CD.',
                  logos: [],
                  code: 'wp jwt login --username=admin --password=secret',
                  href: '/ecosystem/cli',
                  cta: 'Learn more',
                  download: 'https://github.com/simple-jwt-login/simple-jwt-login-cli',
                },
              ].map(({ title, desc, logos, code, href, cta, download }) => (
                <div className="col col--4" key={title}>
                  <div className={styles.clientCard}>
                    <div className={styles.clientCardTitle}><h3>{title}</h3></div>
                    <div className={styles.clientCardContent}>
                      <p>{desc}</p>
                      {logos && logos.length > 0 && (
                        <div className={styles.clientCardLogos}>
                          {logos.map(({ src, alt }) => (
                            <img key={alt} src={resolveCdnUrl(cdnBase, src)} alt={alt} title={alt} width="36" height="36" />
                          ))}
                        </div>
                      )}
                      {code && <code className={styles.clientCardCode}>{code}</code>}
                    </div>
                    <div className={styles.clientCardFooter}>
                      <Link to={href} className={styles.btn} title={cta}>{cta}</Link>
                      {download && (
                        <Link to={download} className={styles.btn} title={`Download ${title}`} style={{ marginLeft: '0.5rem' }}>Download</Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link to="/ecosystem/" className={styles.actionButton} title="View all integrations &amp; SDKs">
                View all integrations &amp; SDKs →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Demos ─────────────────────────────────────────── */}
        <section className={styles.sectionPadding}>
          <div className="container">
            <span className={styles.sectionEyebrow}><FontAwesomeIcon icon={faPlay} style={{ marginRight: '0.4rem' }} /> Try it live</span>
            <h2 className={styles.sectionTitle}>Try the API against your own site</h2>
            <p className={styles.sectionLead}>
              Run live demos right in your browser, against your own WordPress site -
              nothing is sent anywhere except the URL you provide.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/demos/" className={styles.actionButton} title="View all demos">
                View all demos →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Deploy WordPress ──────────────────────────────── */}
        <section className={styles.deploySection}>
          <div className="container">
            <div className={styles.deployBanner}>
              <div className={styles.deployBannerGlow} aria-hidden="true" />
              <div className={styles.deployBannerContent}>
                <span className={styles.deployBannerEyebrow}>
                  <FontAwesomeIcon icon={faRocket} /> One-click deploy
                </span>
                <h2 className={styles.deployBannerTitle}>
                  Don&apos;t have a site yet? Launch one in one click
                </h2>
                <p className={styles.deployBannerText}>
                  Spin up a fully installed WordPress server on DigitalOcean - with Simple JWT
                  Login ready for headless and REST API authentication. No Marketplace setup,
                  no terminal, no install wizard. We hand you the login.
                </p>
              </div>
              <div className={styles.deployBannerActions}>
                <Link to="/deploy-wordpress" className={styles.actionButton} title="Deploy WordPress on DigitalOcean">
                  Deploy WordPress →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quick Start ───────────────────────────────────── */}
        <section className={clsx(styles.sectionPadding, styles.sectionGray)}>
          <div className="container">
            <span className={styles.sectionEyebrow}>Quick Start</span>
            <h2 className={styles.sectionTitle}>Up and running in 3 steps</h2>
            <div className={styles.installSteps}>
              {[
                {
                  n: '1',
                  title: 'Install & Activate',
                  desc: 'Search for Simple JWT Login in the WordPress plugin directory, install, and activate in one click.',
                },
                {
                  n: '2',
                  title: 'Configure Settings',
                  desc: 'Set a JWT secret key, enable the endpoints you need (all are off by default), and choose how long tokens live.',
                },
                {
                  n: '3',
                  title: 'Send the JWT',
                  desc: 'Call POST /auth to get a JWT, then send it as a Bearer token to the WordPress REST API endpoints you enable.',
                },
              ].map(({ n, title, desc }) => (
                <div key={n} className={styles.installStep}>
                  <span className={styles.stepNumber}>{n}</span>
                  <div className={styles.installStepContent}>
                    <strong>{title}</strong>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/docs/" className={styles.actionButton} style={{ marginTop: '3rem', display: 'inline-flex' }} title="Read the documentation">
              Get started →
            </Link>
          </div>
        </section>

        {/* ── Community ─────────────────────────────────────── */}
        <section className={styles.sectionPadding}>
          <div className="container">
            <span className={styles.sectionEyebrow}>Community</span>
            <h2 className={styles.sectionTitle}>Join the community</h2>
            <p className={styles.sectionLead}>
              Simple JWT Login is built in the open, by the community. Whether you write code,
              speak another language, or just want to spread the word - there's a place for you.
            </p>
            <div className={clsx(styles.whyGrid, styles.whyGrid2)}>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}><FontAwesomeIcon icon={faStar} /></div>
                <h3 className={styles.whyCardTitle}>Star on GitHub</h3>
                <p className={styles.whyCardDesc}>Show your appreciation and help others discover the project.</p>
                <Link to="https://github.com/nicumicle/simple-jwt-login" title="GitHub repository" className={styles.communityCardLink}>Star on GitHub →</Link>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}><FontAwesomeIcon icon={faWrench} /></div>
                <h3 className={styles.whyCardTitle}>Contribute Code</h3>
                <p className={styles.whyCardDesc}>Submit issues, propose features, or open a pull request on GitHub.</p>
                <Link to="https://github.com/nicumicle/simple-jwt-login/pulls" title="GitHub Pull Requests" className={styles.communityCardLink}>Open a PR →</Link>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}><FontAwesomeIcon icon={faChartLine} /></div>
                <h3 className={styles.whyCardTitle}>Rate on WordPress</h3>
                <p className={styles.whyCardDesc}>Love the plugin? A 5-star review on WordPress.org makes a big difference.</p>
                <Link to="https://wordpress.org/plugins/simple-jwt-login/#reviews" title="Rate on WordPress.org" className={styles.communityCardLink}>Leave a review →</Link>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}><FontAwesomeIcon icon={faEarthEurope} /></div>
                <h3 className={styles.whyCardTitle}>Help Translate</h3>
                <p className={styles.whyCardDesc}>Make JWT auth accessible in every language - join us on translate.wordpress.org.</p>
                <Link to="https://translate.wordpress.org/projects/wp-plugins/simple-jwt-login/" title="Translate Simple JWT Login" className={styles.communityCardLink}>Start translating →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Reviews ───────────────────────────────────────── */}
        {reviews.length > 0 && (
          <section className={clsx(styles.features, styles.sectionPadding, styles.sectionGray)}>
            <div className="container">
              <span className={styles.sectionEyebrow}>Reviews</span>
              <h2 className={styles.sectionTitle}>What developers are saying</h2>
              <div className="row">
                {reviews.map((props, idx) => (
                  <div key={idx} className="col col--3 vale-ignore">
                    <Review {...props} />
                  </div>
                ))}
              </div>
              <div className={clsx("row")}>
                <div className={clsx("col", styles.reviewsMore)}>
                  <Link to="https://wordpress.org/support/plugin/simple-jwt-login/reviews/" title="View more reviews">
                    View more reviews →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h2 className={styles.ctaTitle}>Get your first WordPress JWT in 5 minutes</h2>
              <p className={styles.ctaSubtitle}>
                Install the plugin, set a secret key, and call POST /auth. Free and open-source, forever -
                no account required.
              </p>
              <div className={styles.ctaButtons}>
                <Link to="/docs/" className={styles.actionButton} title="Read the documentation">
                  Get started →
                </Link>
                <DownloadButton />
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
