import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import sharedStyles from './styles.module.css';
import styles from './headless-wordpress.module.css';

// One list drives both the page and the FAQPage JSON-LD, so they can't drift apart.
const groups = [
  {
    title: 'Getting started',
    faqs: [
      { q: 'What does Simple JWT Login do?', a: 'It adds JWT authentication to the WordPress REST API. Apps can log users in, register them, reset passwords, and call any REST endpoint as that user, all configured from wp-admin.', to: '/docs/', link: 'Introduction' },
      { q: 'Are any features paid?', a: 'No. Every feature is in the free version, under GPLv3, with no paid plan or add-on to buy.', to: '/wordpress-jwt-plugin-comparison', link: 'Compare JWT plugins' },
      { q: 'Which WordPress and PHP versions are supported?', a: 'WordPress 6.2 and later. The plugin code runs on PHP 5.5 to 8.5, but in practice your PHP version is set by the WordPress version you run.', to: '/docs/#compatibility', link: 'Compatibility' },
      { q: 'Why does every endpoint return "not enabled" after I install it?', a: 'Every plugin endpoint starts disabled, so you expose only what you need. Turn on Allow JWT Authentication, and any other feature you use, in the plugin settings.', to: '/docs/quick-start/', link: 'Quick start' },
    ],
  },
  {
    title: 'Logging in',
    faqs: [
      { q: 'Can users log in with a username instead of an email?', a: 'Yes. Send email, username, or login, which accepts either one, together with the password.', to: '/docs/authentication/', link: 'Authentication' },
      { q: 'Can users log in with Google, Facebook, GitHub, or Auth0?', a: 'Yes. The app exchanges the provider token for a WordPress JWT, and the plugin can create the WordPress user on the first login.', to: '/docs/integrations/oauth/', link: 'OAuth login' },
      { q: 'Does it support two-factor authentication?', a: 'Yes. With the Two Factor plugin installed, users who set up 2FA get a short-lived interim token and must pass the second step before they receive the full JWT.', to: '/docs/integrations/third-party/two-factor/', link: 'Two-factor login' },
      { q: 'How do I use the JWT on WordPress core endpoints such as /wp/v2/posts?', a: 'Turn on JWT Middleware for all WordPress endpoints. WordPress then treats any REST request with a valid JWT as coming from that user.', to: '/docs/configuration#jwt-middleware-for-all-wordpress-endpoints', link: 'JWT middleware' },
    ],
  },
  {
    title: 'Tokens',
    faqs: [
      { q: 'How long does a JWT last?', a: '60 minutes by default. You can change the expiry in the Authentication settings. Keep it short and use refresh tokens to keep users logged in.', to: '/docs/authentication/#jwt-expiration', link: 'JWT expiration' },
      { q: 'How do I keep users logged in after the JWT expires?', a: 'Turn on refresh tokens. The login response then includes a `refresh_token`, which the app exchanges for a new JWT before or after the old one expires.', to: '/docs/refresh-token/', link: 'Refresh tokens' },
      { q: 'How do I log a user out?', a: 'Revoke the JWT. A revoked token is rejected even if it has not expired yet.', to: '/docs/revoke-token/', link: 'Revoke a token' },
      { q: 'Can I add custom data to the JWT?', a: 'Yes. Choose the claims in the Authentication settings, or add your own with the `simple_jwt_login_jwt_payload_auth` filter.', to: '/docs/hooks/', link: 'Hooks' },
      { q: 'Where is the signing key stored?', a: 'In the plugin settings by default. To keep it out of the database, define `SIMPLE_JWT_PRIVATE_KEY` in `wp-config.php` instead.', to: '/docs/configuration/', link: 'Configuration' },
    ],
  },
  {
    title: 'Security',
    faqs: [
      { q: 'Should servers and scripts use a JWT?', a: 'Use an API key instead. API keys are long-lived, scoped to read, create, update, or delete, and can be revoked at any time.', to: '/docs/api-keys/', link: 'API keys' },
      { q: 'How do I require a JWT on a REST route?', a: 'Add a rule in Protect Endpoints. Requests to that route without a valid JWT are rejected.', to: '/docs/protect-endpoints/', link: 'Protect Endpoints' },
      { q: 'How do I report a security vulnerability?', a: 'Report it privately through GitHub security advisories, never in a public issue or forum.', to: '/security', link: 'Security policy' },
    ],
  },
  {
    title: 'Troubleshooting',
    faqs: [
      { q: 'Why is my JWT ignored even though I send it?', a: 'The web server most likely strips the Authorization header before it reaches PHP. Send the token in another header, such as `X-Token`, or fix the server configuration.', to: '/docs/troubleshooting/#authorization-header-is-missing', link: 'Missing Authorization header' },
      { q: 'Why does my browser app get a CORS error?', a: 'Add the app origin to Allow origin in the CORS settings, and Authorization to Allow headers. Since version 4.1.1, a JWT from another site is trusted only when its origin is listed. A `*` entry trusts the `Authorization` header, but never cookie or session JWTs.', to: '/docs/cors/', link: 'CORS' },
      { q: 'What does an error code mean?', a: 'Every error response includes an `error_code`. The error codes page explains each one and how to fix it.', to: '/docs/error-codes/', link: 'Error codes' },
    ],
  },
];

// Backticks in an answer mark code.
function Answer({ text }) {
  return <p>{text.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))}</p>;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: groups.flatMap(({ faqs }) => faqs).map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a.replaceAll('`', '') },
  })),
};

function FaqGroup({ title, faqs, gray }) {
  return (
    <section className={clsx(sharedStyles.sectionPadding, gray && sharedStyles.sectionGray)}>
      <div className="container">
        <h2 className={sharedStyles.sectionTitle}>{title}</h2>
        <div className={styles.faq}>
          {faqs.map(({ q, a, to, link }) => (
            <div key={q} className={styles.card}>
              <h3>{q}</h3>
              <Answer text={a} />
              <Link to={to}>{link} →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FaqPage() {
  return (
    <Layout
      title="WordPress JWT Authentication FAQ"
      description="Answers to common questions about Simple JWT Login - setup, login options, token expiry, refresh tokens, security, and fixing JWT errors in WordPress."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <header className={styles.hero}>
        <div className="container">
          <h1>Frequently asked <span>questions</span></h1>
          <p>Quick answers about JWT authentication for WordPress with Simple JWT Login.</p>
        </div>
      </header>

      <main>
        {groups.map((group, index) => (
          <FaqGroup key={group.title} {...group} gray={index % 2 === 1} />
        ))}
      </main>
    </Layout>
  );
}
