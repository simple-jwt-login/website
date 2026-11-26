import React, {useState, useMemo} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
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
  description: translate({id: 'homepage.jsonLd.description', message: 'Free, open-source WordPress plugin that adds JWT authentication to the WordPress REST API. Supports login, register, auto-login, endpoint protection, token refresh, and more.'}),
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
    title: <Translate id="homepage.features.autologin.title">Autologin</Translate>,
    description: <Translate id="homepage.features.autologin.description">Open a WordPress session from a JWT link - for example, send a renewal email that lands the member on their account page, already logged in.</Translate>,
    image: "assets/svg/login-user-2.svg",
    alt: translate({id: 'homepage.features.autologin.alt', message: 'Login user'}),
    link: "/docs/autologin/",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.register.title">Register Users</Translate>,
    description: <Translate id="homepage.features.register.description">Create WordPress users from a mobile sign-up screen, and limit who can register by Auth Code, IP, or email domain.</Translate>,
    image: "assets/svg/create-user.svg",
    alt: translate({id: 'homepage.features.register.alt', message: 'Register user'}),
    link: "/docs/register-user/",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.delete.title">Delete Users</Translate>,
    description: <Translate id="homepage.features.delete.description">Offer an account deletion button in your app. The JWT identifies the account to remove.</Translate>,
    image: "assets/svg/delete-user.svg",
    alt: translate({id: 'homepage.features.delete.alt', message: 'Delete user'}),
    link: "/docs/delete-user/",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.authenticate.title">Authenticate Users</Translate>,
    description: <Translate id="homepage.features.authenticate.description">Exchange WordPress credentials for a JWT, then refresh, validate, or revoke it - the login flow for a React or mobile app.</Translate>,
    image: "assets/svg/authenticate-user.svg",
    alt: translate({id: 'homepage.features.authenticate.alt', message: 'Authenticate user'}),
    link: "/docs/authentication/",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.resetPassword.title">{'Change & Reset Password'}</Translate>,
    description: <Translate id="homepage.features.resetPassword.description">{'Build a "Forgot password" screen in your app: email a reset code, then set the new password through the REST API.'}</Translate>,
    image: "assets/images/features/password.png",
    alt: translate({id: 'homepage.features.resetPassword.alt', message: 'Change and Reset password'}),
    link: "/docs/reset-password/",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.limitIp.title">Limit Access by IP</Translate>,
    description: <Translate id="homepage.features.limitIp.description" values={{code: <code>85.*.*.*</code>}}>{'Accept logins or registrations only from your backend or office network - wildcards such as {code} work too.'}</Translate>,
    image: "assets/images/features/ip.png",
    alt: translate({id: 'homepage.features.limitIp.alt', message: 'Limit access by IP'}),
    link: "/docs/authentication/#access-control",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.roles.title">Create Users with Different Roles</Translate>,
    description: <Translate id="homepage.features.roles.description">Tie a role to each Auth Code - for example, one code for free members and another for premium - on a single endpoint.</Translate>,
    image: "assets/images/features/roles.png",
    alt: translate({id: 'homepage.features.roles.alt', message: 'Roles'}),
    link: "/docs/register-user/#new-user-settings",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.plugins.title">Integrate with Other Plugins</Translate>,
    description: <Translate id="homepage.features.plugins.description">Send login links from MailPoet, authorize WPGraphQL queries, or call the REST routes that other plugins add.</Translate>,
    image: "assets/images/features/plug-in.png",
    alt: translate({id: 'homepage.features.plugins.alt', message: 'Integrate with other plugins'}),
    link: "/docs/mailpoet/",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.protectEndpoints.title">Protect Endpoints</Translate>,
    description: <Translate id="homepage.features.protectEndpoints.description" values={{code: <code>/wp/v2/users</code>}}>{'Require a JWT or a role per route and HTTP method - for example, stop anonymous visitors from listing {code}.'}</Translate>,
    image: "assets/images/features/protect-endpoints.png",
    alt: translate({id: 'homepage.features.protectEndpoints.alt', message: 'Protect endpoints'}),
    link: "/docs/protect-endpoints/",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.jwtAnyEndpoint.title">Use JWT on Any Endpoint</Translate>,
    description: <Translate id="homepage.features.jwtAnyEndpoint.description" values={{code: <code>/wp/v2/posts</code>}}>{'Publish a post to {code} from a mobile app as the logged-in author, without session cookies.'}</Translate>,
    image: "assets/images/features/protect.png",
    alt: translate({id: 'homepage.features.jwtAnyEndpoint.alt', message: 'JWT on other endpoints'}),
    link: "/docs/configuration#jwt-middleware-for-all-wordpress-endpoints",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.googleOauth.title">Google OAuth Integration</Translate>,
    description: <Translate id="homepage.features.googleOauth.description">Add Google sign-in to your front end and get a WordPress JWT back, so users have no extra password to remember.</Translate>,
    image: "assets/images/features/google-plus.png",
    alt: translate({id: 'homepage.features.googleOauth.alt', message: 'Google OAuth'}),
    link: "/docs/integrations/oauth/google/setup",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.googleJwt.title">Use Google JWT on All Endpoints</Translate>,
    description: <Translate id="homepage.features.googleJwt.description">Already use Google sign-in in your app? Send the Google-issued token directly to WordPress REST endpoints.</Translate>,
    image: "assets/images/features/google-plus-jwt.png",
    alt: translate({id: 'homepage.features.googleJwt.alt', message: 'Google OAuth endpoints'}),
    link: "/docs/integrations/oauth/#allow-usage-on-all-endpoints",
    version: "both",
  },
  {
    title: <Translate id="homepage.features.apiKeys.title">API Keys</Translate>,
    description: <Translate id="homepage.features.apiKeys.description">Give a CI pipeline a key that can only read and create content, with an expiry date you choose.</Translate>,
    faIcon: faKey,
    alt: translate({id: 'homepage.features.apiKeys.alt', message: 'API Keys'}),
    link: "/docs/api-keys/",
    version: "v4",
  },
  {
    title: <Translate id="homepage.features.oauthProviders.title">{'Sign In with Auth0, Facebook & GitHub'}</Translate>,
    description: <Translate id="homepage.features.oauthProviders.description">Use the identity provider you already have: exchange an Auth0, Facebook, or GitHub login for a WordPress JWT.</Translate>,
    faIcon: faShieldHalved,
    alt: translate({id: 'homepage.features.oauthProviders.alt', message: 'OAuth with Auth0, Facebook, and GitHub'}),
    link: "/docs/integrations/oauth/",
    version: "v4",
  },
  {
    title: <Translate id="homepage.features.twoFactor.title">Two-Factor Authentication</Translate>,
    description: <Translate id="homepage.features.twoFactor.description">A stolen password alone gets no JWT: users with 2FA in the WordPress Two Factor plugin must also enter their code.</Translate>,
    faIcon: faUserShield,
    alt: translate({id: 'homepage.features.twoFactor.alt', message: 'Two-Factor Authentication'}),
    link: "/docs/integrations/third-party/two-factor/",
    version: "v4",
  },
  {
    title: <Translate id="homepage.features.auditLogs.title">Audit Logs</Translate>,
    description: <Translate id="homepage.features.auditLogs.description">Find out who deleted an account or why a login failed - search authentication events in wp-admin.</Translate>,
    faIcon: faClipboardList,
    alt: translate({id: 'homepage.features.auditLogs.alt', message: 'Audit Logs'}),
    link: "/docs/audit-logs/",
    version: "v4",
  },
  {
    title: <Translate id="homepage.features.webhooks.title">Webhooks</Translate>,
    description: <Translate id="homepage.features.webhooks.description">Post to Slack when a user registers, or forward authentication events to your logging service.</Translate>,
    faIcon: faBell,
    alt: translate({id: 'homepage.features.webhooks.alt', message: 'Webhooks'}),
    link: "/docs/webhooks/",
    version: "v4",
  },
  {
    title: <Translate id="homepage.features.woocommerce.title">Headless WooCommerce</Translate>,
    description: <Translate id="homepage.features.woocommerce.description">{'Build a React storefront: manage products and run the cart & checkout through the WooCommerce REST and Store APIs.'}</Translate>,
    faIcon: faCartShopping,
    alt: translate({id: 'homepage.features.woocommerce.alt', message: 'Headless WooCommerce'}),
    link: "/docs/integrations/third-party/woocommerce/",
    version: "v4",
  },
  {
    title: <Translate id="homepage.features.multipleKeys.title">Multiple JWT Decryption Keys</Translate>,
    description: <Translate id="homepage.features.multipleKeys.description">Accept Auth0 tokens next to your own, or rotate keys in stages - rules pick the key from a JWT header or payload claim.</Translate>,
    faIcon: faLayerGroup,
    alt: translate({id: 'homepage.features.multipleKeys.alt', message: 'Multiple JWT Decryption Keys'}),
    link: "/docs/configuration#jwt-verification-rules",
    version: "v4",
  },
  {
    title: <Translate id="homepage.features.jwtDecoder.title">JWT Decoder</Translate>,
    description: <Translate id="homepage.features.jwtDecoder.description">Debug a rejected token without pasting it into a third-party site: read its header and payload in wp-admin.</Translate>,
    faIcon: faVial,
    alt: translate({id: 'homepage.features.jwtDecoder.alt', message: 'JWT Decoder'}),
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
  { icon: faLock,         title: translate({id: 'homepage.security.off.title', message: 'Off by default'}),               desc: translate({id: 'homepage.security.off.desc', message: 'Every plugin endpoint starts disabled. You expose only the operations your app needs.'}), href: '/blog/simple-jwt-login-security-hardening/', linkLabel: translate({id: 'homepage.security.off.linkLabel', message: 'Hardening guide'}) },
  { icon: faGlobe,        title: translate({id: 'homepage.security.csrf.title', message: 'Cross-site request checks'}),    desc: translate({id: 'homepage.security.csrf.desc', message: 'Cookie and session JWTs are ignored on cross-site requests unless you list that exact origin, which blocks CSRF.'}), href: '/docs/configuration#cross-site-requests', linkLabel: translate({id: 'homepage.security.csrf.linkLabel', message: 'How it works'}) },
  { icon: faArrowsRotate, title: translate({id: 'homepage.security.tokens.title', message: 'Tokens you can take back'}),     desc: translate({id: 'homepage.security.tokens.desc', message: 'Refresh tokens rotate on every use, JWTs can be revoked, and an optional setting ends sessions when a password changes.'}), href: '/docs/authentication/#revoke-sessions-on-password-change', linkLabel: translate({id: 'homepage.security.tokens.linkLabel', message: 'Session revocation'}) },
  { icon: faKey,          title: translate({id: 'homepage.security.keys.title', message: 'Hashed, least-privilege keys'}), desc: translate({id: 'homepage.security.keys.desc', message: 'API keys are stored only as SHA-256 hashes. Permissions follow the dispatched method, so method overrides cannot raise them.'}), href: '/docs/api-keys/', linkLabel: translate({id: 'homepage.security.keys.linkLabel', message: 'API key design'}) },
  { icon: faBug,          title: translate({id: 'homepage.security.fixes.title', message: 'Security vulnerability fixes'}), desc: translate({id: 'homepage.security.fixes.desc', message: 'Reported vulnerabilities are fixed and shipped in regular releases, documented in the release notes.'}), href: '/releases/tags/security', linkLabel: translate({id: 'homepage.security.fixes.linkLabel', message: 'Security releases'}) },
  { icon: faVial,         title: translate({id: 'homepage.security.tests.title', message: 'Security regression tests'}),    desc: translate({id: 'homepage.security.tests.desc', message: 'A dedicated security test suite covers CSRF, user enumeration, trusted proxy IPs and ambient credentials, so fixed issues stay fixed.'}), href: `${GITHUB_REPO}/tree/master/tests/Feature/Security`, linkLabel: translate({id: 'homepage.security.tests.linkLabel', message: 'Browse the tests'}) },
  { icon: faCodeBranch,   title: translate({id: 'homepage.security.ci.title', message: 'Continuous integration'}),       desc: translate({id: 'homepage.security.ci.desc', message: 'Unit, feature and cross-site test suites run automatically in GitHub Actions.'}), href: `${GITHUB_REPO}/actions`, linkLabel: translate({id: 'homepage.security.ci.linkLabel', message: 'CI workflows'}) },
  { icon: faWordpress,    title: translate({id: 'homepage.security.wpCompat.title', message: 'WordPress compatibility testing'}), desc: translate({id: 'homepage.security.wpCompat.desc', message: 'Feature tests run against a real WordPress install, alongside PHP syntax checks across multiple PHP versions and the official WordPress Plugin Check.'}), href: `${GITHUB_REPO}/tree/master/.github/workflows`, linkLabel: translate({id: 'homepage.security.wpCompat.linkLabel', message: 'View the workflows'}) },
  { icon: faEnvelope,     title: translate({id: 'homepage.security.disclosure.title', message: 'Responsible disclosure'}),       desc: translate({id: 'homepage.security.disclosure.desc', message: 'Found a vulnerability? Report it privately through GitHub security advisories instead of opening a public issue, so a fix can ship before details go public.'}), href: `${GITHUB_REPO}/security/advisories/new`, linkLabel: translate({id: 'homepage.security.disclosure.linkLabel', message: 'Report a vulnerability'}) },
];

function RecentPosts() {
  const recentPosts = require("../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json");
  const articleIconSrc = useCdnUrl('assets/svg/article.svg');
  if (recentPosts === null || typeof recentPosts.blogPosts !== 'object') return null;
  return (
    <section className={styles.sectionPadding}>
      <div className="container">
        <span className={styles.sectionEyebrow}><Translate id="homepage.blog.eyebrow">Blog</Translate></span>
        <h2 className={styles.sectionTitle}><Translate id="homepage.blog.title">From the blog</Translate></h2>
        <div className="row">
          {recentPosts.blogPosts.slice(0, 6).map((item, index) => (
            <div className="col col--4 text-center" id={"blog-post" + index} key={"key" + index}>
              <div className={styles.blogPostHomepage}>
                <img src={articleIconSrc} alt={translate({id: 'homepage.blog.articleAlt', message: 'Blog Article'})} title={item.metadata.title} width="100" height="100" />
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
  { key: 'all', label: translate({id: 'homepage.features.filter.all', message: 'All'}) },
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
      title={translate({id: 'homepage.meta.title', message: 'Free WordPress JWT Authentication Plugin'})}
      description={translate({id: 'homepage.meta.description', message: 'Simple JWT Login is a free, open-source WordPress plugin that adds JWT authentication to the REST API - no coding required.'})}
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroEyebrow}><Translate id="homepage.hero.eyebrow">Free & Open Source WordPress Plugin</Translate></div>
          <img
            src={heroLogoSrc}
            alt={translate({id: 'homepage.hero.logoAlt', message: 'Simple JWT Login logo'})}
            title={translate({id: 'homepage.hero.logoTitle', message: 'Simple JWT Login logo'})}
            width="88"
            height="88"
            className={styles.heroLogo}
          />
          <h1 className={styles.heroTitle}>Simple JWT Login</h1>
          <p className={styles.heroSubtitle}>
            <Translate
              id="homepage.hero.subtitle"
              values={{br: <br className={styles.heroBreak} />}}
            >
              {'JWT login, registration, and endpoint protection for the WordPress REST API -{br}for headless sites, mobile apps, and WPGraphQL. Configured from wp-admin.'}
            </Translate>
          </p>
          <div className={styles.heroCta}>
            <Link to="/docs/" className={styles.actionButton} title={translate({id: 'homepage.hero.getStartedTitle', message: 'Get started'})}>
              <Translate id="homepage.hero.getStarted">Get started →</Translate>
            </Link>
            <Link to={PLAYGROUND_URL} className={styles.tryButton} title={translate({id: 'homepage.hero.liveDemoTitle', message: 'Open the Simple JWT Login live demo in WordPress Playground'})}>
              <FontAwesomeIcon icon={faPlay} /> <Translate id="homepage.hero.liveDemo">Live Demo</Translate>
            </Link>
            <DownloadButton />
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{formatNumber(ACTIVE_INSTALLS)}+</span>
              <span className={styles.heroStatLabel}><Translate id="homepage.stats.activeInstalls">Active installs</Translate></span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{formatNumber(TOTAL_DOWNLOADS)}+</span>
              <span className={styles.heroStatLabel}><Translate id="homepage.stats.downloads">Downloads</Translate></span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{RATING} / 5</span>
              <span className={styles.heroStatLabel}><Translate id="homepage.stats.rating">Rating</Translate></span>
            </div>
            <div className={styles.heroStatDivider} aria-hidden="true" />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>100%</span>
              <span className={styles.heroStatLabel}><Translate id="homepage.stats.free">Free</Translate></span>
            </div>
            <br />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{translate({id: 'homepage.stats.years', message: '{years}+ years'}, {years: ACTIVE_YEARS})}</span>
              <span className={styles.heroStatLabel}><Translate id="homepage.stats.development">Active development</Translate></span>
            </div>
          </div>
        </div>
      </header>

      {/* ── v4 Announcement Banner ────────────────────────── */}
      <div className={styles.v4Banner}>
        <div className={styles.v4BannerInner}>
          <span className={styles.v4BannerBadge}><Translate id="homepage.v4Banner.badge">New</Translate></span>
          <span className={styles.v4BannerText}><Translate id="homepage.v4Banner.text">{'Simple JWT Login v4 is now available - API Keys, 2FA, Audit Logs, Webhooks, and more. v3 is now in maintenance mode (EOL Jan 31, 2027).'}</Translate></span>
          <Link to="/v4" className={styles.v4BannerLink} title={translate({id: 'homepage.v4Banner.linkTitle', message: "See what's new in v4"})}>
            <Translate id="homepage.v4Banner.link">{"See what's new →"}</Translate>
          </Link>
        </div>
      </div>

      <main>

        {/* ── Features ──────────────────────────────────────── */}
        {awesomeFeatures.length > 0 && (
          <section className={clsx(styles.sectionPadding, styles.features)}>
            <div className="container">
              <span className={styles.sectionEyebrow}><Translate id="homepage.features.eyebrow">Core Features</Translate></span>
              <h2 className={styles.sectionTitle}><Translate id="homepage.features.title">From first login to token revocation</Translate></h2>
              <p className={styles.sectionLead}>
                <Translate
                  id="homepage.features.lead"
                  values={{v3: <strong>V3</strong>, v4: <strong>V4</strong>}}
                >
                  {'Each feature is tagged {v3} or {v4} depending on which version introduced it.'}
                </Translate>
              </p>
              <div className={styles.featureFilterBar} role="group" aria-label={translate({id: 'homepage.features.filter.ariaLabel', message: 'Filter features by version'})}>
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
            <span className={styles.sectionEyebrow}><Translate id="homepage.why.eyebrow">Benefits</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="homepage.why.title">Why developers choose Simple JWT Login</Translate></h2>
            <div className={styles.whyGrid}>
              {[
                { icon: faBolt,          title: translate({id: 'homepage.why.noCoding.title', message: 'No coding required'}),     desc: translate({id: 'homepage.why.noCoding.desc', message: 'Keys, expiration, allowed IPs, and protected routes are all settings in wp-admin.'}) },
                { icon: faLock,          title: translate({id: 'homepage.why.algorithms.title', message: '6 supported algorithms'}), desc: translate({id: 'homepage.why.algorithms.desc', message: 'Sign with a shared secret (HS256/384/512), or use RS256/384/512 so other services can verify tokens with only the public key.'}) },
                { icon: faRocket,        title: translate({id: 'homepage.why.delivery.title', message: '4 JWT delivery methods'}), desc: translate({id: 'homepage.why.delivery.desc', message: 'Authorization header, cookie, session, or request parameter. Turn off the ones your app does not use.'}) },
                { icon: faWrench,        title: translate({id: 'homepage.why.developers.title', message: 'Built for developers'}),   desc: translate({id: 'homepage.why.developers.desc', message: 'Action and filter hooks let you add JWT claims, block a login, or change an API response from your own plugin.'}) },
                { icon: faGlobe,         title: translate({id: 'homepage.why.cors.title', message: 'CORS per origin'}),        desc: translate({id: 'homepage.why.cors.desc', message: 'List the exact front-end origins that can call your API, so a React or Vue app on another domain can log users in.'}) },
                { icon: faPhp,           title: translate({id: 'homepage.why.php.title', message: 'PHP 5.5+ compatible'}),    desc: translate({id: 'homepage.why.php.desc', message: 'The plugin code runs on PHP 5.5+, so your WordPress version sets the minimum. PHP 8.2 or newer is recommended in production.'}) },
                { icon: faLink,          title: translate({id: 'homepage.why.autologin.title', message: 'Auto-login & magic links'}), desc: translate({id: 'homepage.why.autologin.desc', message: 'Put a short-lived JWT in an email link and the subscriber lands on the page already logged in.'}) },
                { icon: faArrowsRotate,  title: translate({id: 'homepage.why.lifecycle.title', message: 'Full token lifecycle'}),   desc: translate({id: 'homepage.why.lifecycle.desc', message: 'Keep a mobile user signed in with refresh tokens, and revoke the JWT when they log out.'}) },
                { icon: faHeart,         title: translate({id: 'homepage.why.free.title', message: 'Free & open source'}),     desc: translate({id: 'homepage.why.free.desc', message: 'GPL 3.0 licensed, free and open-source, forever. No paid tier and no locked features.'}) },
              ].map(({ icon, title, desc }) => (
                <div key={icon.iconName} className={styles.whyCard}>
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
            <span className={styles.sectionEyebrow}><Translate id="homepage.security.eyebrow">Security</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="homepage.security.title">Secure defaults you can verify</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="homepage.security.lead">
                {'A login plugin guards your whole site. Here is how the latest v4 release limits what an attacker can do, and how the project tests and fixes it - each card links to the details.'}
              </Translate>
            </p>
            <div className={styles.whyGrid}>
              {SECURITY_ITEMS.map(({ icon, title, desc, href, linkLabel }) => (
                <div key={href} className={styles.whyCard}>
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
            <span className={styles.sectionEyebrow}><Translate id="homepage.ecosystem.eyebrow">Ecosystem</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="homepage.ecosystem.title">SDKs and integrations for PHP, JavaScript, WPGraphQL, and WP-CLI</Translate></h2>
            <div className="row" style={{ rowGap: '1.5rem' }}>
              {[
                {
                  title: 'PHP',
                  desc: translate({id: 'homepage.ecosystem.php.desc', message: 'Connect any PHP app to Simple JWT Login with one Composer package - supports Laravel, Yii, CodeIgniter, and more.'}),
                  logos: [
                    { src: 'assets/images/frameworks/php.png', alt: 'PHP' },
                    { src: 'assets/images/frameworks/laravel.png', alt: 'Laravel' },
                    { src: 'assets/images/frameworks/yii.png', alt: 'Yii' },
                    { src: 'assets/images/frameworks/codeigniter.png', alt: 'CodeIgniter' },
                  ],
                  code: 'composer require "nicumicle/simple-jwt-login-client-php"',
                  href: '/ecosystem/php-sdk',
                  cta: translate({id: 'homepage.ecosystem.php.cta', message: 'Learn more'}),
                  download: 'https://packagist.org/packages/nicumicle/simple-jwt-login-client-php',
                },
                {
                  title: 'JavaScript',
                  desc: translate({id: 'homepage.ecosystem.js.desc', message: 'Add JWT authentication to React, Vue, Angular, or any JS app with an npm package and a handful of lines.'}),
                  logos: [
                    { src: 'assets/images/frameworks/javascript.png', alt: 'JavaScript' },
                    { src: 'assets/images/frameworks/vue.png', alt: 'Vue' },
                    { src: 'assets/images/frameworks/react.png', alt: 'React' },
                    { src: 'assets/images/frameworks/angular.png', alt: 'Angular' },
                  ],
                  code: 'npm install simple-jwt-login',
                  href: '/ecosystem/js-sdk',
                  cta: translate({id: 'homepage.ecosystem.js.cta', message: 'Learn more'}),
                  download: 'https://www.npmjs.com/package/simple-jwt-login',
                },
                {
                  title: 'WPGraphQL',
                  desc: translate({id: 'homepage.ecosystem.wpgraphql.desc', message: 'Use your JWTs to authenticate GraphQL queries and mutations - enable it with a single checkbox.'}),
                  logos: [{ src: 'assets/images/screenshots/third-party-integrations/wpgraphql-logo.png', alt: 'WPGraphQL' }],
                  href: '/docs/integrations/third-party/wpgraphql/',
                  cta: translate({id: 'homepage.ecosystem.wpgraphql.cta', message: 'Learn more'}),
                },
                {
                  title: 'MailPoet',
                  desc: translate({id: 'homepage.ecosystem.mailpoet.desc', message: 'Send magic-link login emails via MailPoet - let subscribers log in with one click, no password required.'}),
                  logos: [],
                  href: '/ecosystem/mailpoet',
                  cta: translate({id: 'homepage.ecosystem.mailpoet.cta', message: 'Learn more'}),
                  download: 'https://wordpress.org/plugins/simple-jwt-login-mailpoet',
                },
                {
                  title: translate({id: 'homepage.ecosystem.exportImport.title', message: 'Export & Import'}),
                  desc: translate({id: 'homepage.ecosystem.exportImport.desc', message: 'Back up and restore your entire plugin configuration in one click - perfect for staging-to-production migrations.'}),
                  logos: [],
                  href: '/ecosystem/export-import',
                  cta: translate({id: 'homepage.ecosystem.exportImport.cta', message: 'Learn more'}),
                  download: 'https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip',
                },
                {
                  title: 'WP-CLI',
                  desc: translate({id: 'homepage.ecosystem.cli.desc', message: 'Generate tokens, validate JWTs, revoke sessions, and manage every setting from your terminal - ideal for CI/CD.'}),
                  logos: [],
                  code: 'wp jwt login --username=admin --password=secret',
                  href: '/ecosystem/cli',
                  cta: translate({id: 'homepage.ecosystem.cli.cta', message: 'Learn more'}),
                  download: 'https://github.com/simple-jwt-login/simple-jwt-login-cli',
                },
              ].map(({ title, desc, logos, code, href, cta, download }) => (
                <div className="col col--4" key={href}>
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
                        <Link to={download} className={styles.btn} title={translate({id: 'homepage.ecosystem.downloadTitle', message: 'Download {title}'}, {title})} style={{ marginLeft: '0.5rem' }}><Translate id="homepage.ecosystem.download">Download</Translate></Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link to="/ecosystem/" className={styles.actionButton} title={translate({id: 'homepage.ecosystem.viewAllTitle', message: 'View all integrations & SDKs'})}>
                <Translate id="homepage.ecosystem.viewAll">View all integrations & SDKs →</Translate>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Demos ─────────────────────────────────────────── */}
        <section className={styles.sectionPadding}>
          <div className="container">
            <span className={styles.sectionEyebrow}><FontAwesomeIcon icon={faPlay} style={{ marginRight: '0.4rem' }} /> <Translate id="homepage.demos.eyebrow">Try it live</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="homepage.demos.title">Try the API against your own site</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="homepage.demos.lead">
                {'Run live demos right in your browser, against your own WordPress site - nothing is sent anywhere except the URL you provide.'}
              </Translate>
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/demos/" className={styles.actionButton} title={translate({id: 'homepage.demos.viewAllTitle', message: 'View all demos'})}>
                <Translate id="homepage.demos.viewAll">View all demos →</Translate>
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
                  <FontAwesomeIcon icon={faRocket} /> <Translate id="homepage.deploy.eyebrow">One-click deploy</Translate>
                </span>
                <h2 className={styles.deployBannerTitle}>
                  <Translate id="homepage.deploy.title">{"Don't have a site yet? Launch one in one click"}</Translate>
                </h2>
                <p className={styles.deployBannerText}>
                  <Translate id="homepage.deploy.text">
                    {'Spin up a fully installed WordPress server on DigitalOcean - with Simple JWT Login ready for headless and REST API authentication. No Marketplace setup, no terminal, no install wizard. We hand you the login.'}
                  </Translate>
                </p>
              </div>
              <div className={styles.deployBannerActions}>
                <Link to="/deploy-wordpress" className={styles.actionButton} title={translate({id: 'homepage.deploy.ctaTitle', message: 'Deploy WordPress on DigitalOcean'})}>
                  <Translate id="homepage.deploy.cta">Deploy WordPress →</Translate>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quick Start ───────────────────────────────────── */}
        <section className={clsx(styles.sectionPadding, styles.sectionGray)}>
          <div className="container">
            <span className={styles.sectionEyebrow}><Translate id="homepage.quickStart.eyebrow">Quick Start</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="homepage.quickStart.title">Up and running in 3 steps</Translate></h2>
            <div className={styles.installSteps}>
              {[
                {
                  n: '1',
                  title: translate({id: 'homepage.quickStart.install.title', message: 'Install & Activate'}),
                  desc: translate({id: 'homepage.quickStart.install.desc', message: 'Search for Simple JWT Login in the WordPress plugin directory, install, and activate in one click.'}),
                },
                {
                  n: '2',
                  title: translate({id: 'homepage.quickStart.configure.title', message: 'Configure Settings'}),
                  desc: translate({id: 'homepage.quickStart.configure.desc', message: 'Set a JWT secret key, enable the endpoints you need (all are off by default), and choose how long tokens live.'}),
                },
                {
                  n: '3',
                  title: translate({id: 'homepage.quickStart.send.title', message: 'Send the JWT'}),
                  desc: translate({id: 'homepage.quickStart.send.desc', message: 'Call POST /auth to get a JWT, then send it as a Bearer token to the WordPress REST API endpoints you enable.'}),
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
            <Link to="/docs/" className={styles.actionButton} style={{ marginTop: '3rem', display: 'inline-flex' }} title={translate({id: 'homepage.quickStart.ctaTitle', message: 'Read the documentation'})}>
              <Translate id="homepage.quickStart.cta">Get started →</Translate>
            </Link>
          </div>
        </section>

        {/* ── Community ─────────────────────────────────────── */}
        <section className={styles.sectionPadding}>
          <div className="container">
            <span className={styles.sectionEyebrow}><Translate id="homepage.community.eyebrow">Community</Translate></span>
            <h2 className={styles.sectionTitle}><Translate id="homepage.community.title">Join the community</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="homepage.community.lead">
                {"Simple JWT Login is built in the open, by the community. Whether you write code, speak another language, or just want to spread the word - there's a place for you."}
              </Translate>
            </p>
            <div className={clsx(styles.whyGrid, styles.whyGrid2)}>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}><FontAwesomeIcon icon={faStar} /></div>
                <h3 className={styles.whyCardTitle}><Translate id="homepage.community.star.title">Star on GitHub</Translate></h3>
                <p className={styles.whyCardDesc}><Translate id="homepage.community.star.desc">Show your appreciation and help others discover the project.</Translate></p>
                <Link to="https://github.com/nicumicle/simple-jwt-login" title={translate({id: 'homepage.community.star.linkTitle', message: 'GitHub repository'})} className={styles.communityCardLink}><Translate id="homepage.community.star.link">Star on GitHub →</Translate></Link>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}><FontAwesomeIcon icon={faWrench} /></div>
                <h3 className={styles.whyCardTitle}><Translate id="homepage.community.code.title">Contribute Code</Translate></h3>
                <p className={styles.whyCardDesc}><Translate id="homepage.community.code.desc">Submit issues, propose features, or open a pull request on GitHub.</Translate></p>
                <Link to="https://github.com/nicumicle/simple-jwt-login/pulls" title={translate({id: 'homepage.community.code.linkTitle', message: 'GitHub Pull Requests'})} className={styles.communityCardLink}><Translate id="homepage.community.code.link">Open a PR →</Translate></Link>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}><FontAwesomeIcon icon={faChartLine} /></div>
                <h3 className={styles.whyCardTitle}><Translate id="homepage.community.rate.title">Rate on WordPress</Translate></h3>
                <p className={styles.whyCardDesc}><Translate id="homepage.community.rate.desc">Love the plugin? A 5-star review on WordPress.org makes a big difference.</Translate></p>
                <Link to="https://wordpress.org/plugins/simple-jwt-login/#reviews" title={translate({id: 'homepage.community.rate.linkTitle', message: 'Rate on WordPress.org'})} className={styles.communityCardLink}><Translate id="homepage.community.rate.link">Leave a review →</Translate></Link>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}><FontAwesomeIcon icon={faEarthEurope} /></div>
                <h3 className={styles.whyCardTitle}><Translate id="homepage.community.translate.title">Help Translate</Translate></h3>
                <p className={styles.whyCardDesc}><Translate id="homepage.community.translate.desc">Make JWT auth accessible in every language - join us on translate.wordpress.org.</Translate></p>
                <Link to="https://translate.wordpress.org/projects/wp-plugins/simple-jwt-login/" title={translate({id: 'homepage.community.translate.linkTitle', message: 'Translate Simple JWT Login'})} className={styles.communityCardLink}><Translate id="homepage.community.translate.link">Start translating →</Translate></Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Reviews ───────────────────────────────────────── */}
        {reviews.length > 0 && (
          <section className={clsx(styles.features, styles.sectionPadding, styles.sectionGray)}>
            <div className="container">
              <span className={styles.sectionEyebrow}><Translate id="homepage.reviews.eyebrow">Reviews</Translate></span>
              <h2 className={styles.sectionTitle}><Translate id="homepage.reviews.title">What developers are saying</Translate></h2>
              <div className="row">
                {reviews.map((props, idx) => (
                  <div key={idx} className="col col--3 vale-ignore">
                    <Review {...props} />
                  </div>
                ))}
              </div>
              <div className={clsx("row")}>
                <div className={clsx("col", styles.reviewsMore)}>
                  <Link to="https://wordpress.org/support/plugin/simple-jwt-login/reviews/" title={translate({id: 'homepage.reviews.moreTitle', message: 'View more reviews'})}>
                    <Translate id="homepage.reviews.more">View more reviews →</Translate>
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
              <h2 className={styles.ctaTitle}><Translate id="homepage.cta.title">Get your first WordPress JWT in 5 minutes</Translate></h2>
              <p className={styles.ctaSubtitle}>
                <Translate id="homepage.cta.subtitle">
                  {'Install the plugin, set a secret key, and call POST /auth. Free and open-source, forever - no account required.'}
                </Translate>
              </p>
              <div className={styles.ctaButtons}>
                <Link to="/docs/" className={styles.actionButton} title={translate({id: 'homepage.cta.getStartedTitle', message: 'Read the documentation'})}>
                  <Translate id="homepage.cta.getStarted">Get started →</Translate>
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
