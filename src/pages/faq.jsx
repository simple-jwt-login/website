import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import clsx from 'clsx';
import sharedStyles from './styles.module.css';
import styles from './headless-wordpress.module.css';

// One list drives both the page and the FAQPage JSON-LD, so they can't drift apart.
const groups = [
  {
    title: translate({id: 'faq.gettingStarted.title', message: 'Getting started'}),
    faqs: [
      { q: translate({id: 'faq.gettingStarted.q1.q', message: 'What does Simple JWT Login do?'}), a: translate({id: 'faq.gettingStarted.q1.a', message: 'It adds JWT authentication to the WordPress REST API. Apps can log users in, register them, reset passwords, and call any REST endpoint as that user, all configured from wp-admin.'}), to: '/docs/', link: translate({id: 'faq.gettingStarted.q1.link', message: 'Introduction'}) },
      { q: translate({id: 'faq.gettingStarted.q2.q', message: 'Are any features paid?'}), a: translate({id: 'faq.gettingStarted.q2.a', message: 'No. Every feature is in the free version, under GPLv3, with no paid plan or add-on to buy.'}), to: '/wordpress-jwt-plugin-comparison', link: translate({id: 'faq.gettingStarted.q2.link', message: 'Compare JWT plugins'}) },
      { q: translate({id: 'faq.gettingStarted.q3.q', message: 'Which WordPress and PHP versions are supported?'}), a: translate({id: 'faq.gettingStarted.q3.a', message: 'WordPress 6.2 and later. The plugin code runs on PHP 5.5 to 8.5, but in practice your PHP version is set by the WordPress version you run.'}), to: '/docs/#compatibility', link: translate({id: 'faq.gettingStarted.q3.link', message: 'Compatibility'}) },
      { q: translate({id: 'faq.gettingStarted.q4.q', message: 'Why does every endpoint return "not enabled" after I install it?'}), a: translate({id: 'faq.gettingStarted.q4.a', message: 'Every plugin endpoint starts disabled, so you expose only what you need. Turn on Allow JWT Authentication, and any other feature you use, in the plugin settings.'}), to: '/docs/quick-start/', link: translate({id: 'faq.gettingStarted.q4.link', message: 'Quick start'}) },
    ],
  },
  {
    title: translate({id: 'faq.loggingIn.title', message: 'Logging in'}),
    faqs: [
      { q: translate({id: 'faq.loggingIn.q1.q', message: 'Can users log in with a username instead of an email?'}), a: translate({id: 'faq.loggingIn.q1.a', message: 'Yes. Send email, username, or login, which accepts either one, together with the password.'}), to: '/docs/authentication/', link: translate({id: 'faq.loggingIn.q1.link', message: 'Authentication'}) },
      { q: translate({id: 'faq.loggingIn.q2.q', message: 'Can users log in with Google, Facebook, GitHub, or Auth0?'}), a: translate({id: 'faq.loggingIn.q2.a', message: 'Yes. The app exchanges the provider token for a WordPress JWT, and the plugin can create the WordPress user on the first login.'}), to: '/docs/integrations/oauth/', link: translate({id: 'faq.loggingIn.q2.link', message: 'OAuth login'}) },
      { q: translate({id: 'faq.loggingIn.q3.q', message: 'Does it support two-factor authentication?'}), a: translate({id: 'faq.loggingIn.q3.a', message: 'Yes. With the Two Factor plugin installed, users who set up 2FA get a short-lived interim token and must pass the second step before they receive the full JWT.'}), to: '/docs/integrations/third-party/two-factor/', link: translate({id: 'faq.loggingIn.q3.link', message: 'Two-factor login'}) },
      { q: translate({id: 'faq.loggingIn.q4.q', message: 'How do I use the JWT on WordPress core endpoints such as /wp/v2/posts?'}), a: translate({id: 'faq.loggingIn.q4.a', message: 'Turn on JWT Middleware for all WordPress endpoints. WordPress then treats any REST request with a valid JWT as coming from that user.'}), to: '/docs/configuration#jwt-middleware-for-all-wordpress-endpoints', link: translate({id: 'faq.loggingIn.q4.link', message: 'JWT middleware'}) },
    ],
  },
  {
    title: translate({id: 'faq.tokens.title', message: 'Tokens'}),
    faqs: [
      { q: translate({id: 'faq.tokens.q1.q', message: 'How long does a JWT last?'}), a: translate({id: 'faq.tokens.q1.a', message: '60 minutes by default. You can change the expiry in the Authentication settings. Keep it short and use refresh tokens to keep users logged in.'}), to: '/docs/authentication/#jwt-expiration', link: translate({id: 'faq.tokens.q1.link', message: 'JWT expiration'}) },
      { q: translate({id: 'faq.tokens.q2.q', message: 'How do I keep users logged in after the JWT expires?'}), a: translate({id: 'faq.tokens.q2.a', message: 'Turn on refresh tokens. The login response then includes a `refresh_token`, which the app exchanges for a new JWT before or after the old one expires.'}), to: '/docs/refresh-token/', link: translate({id: 'faq.tokens.q2.link', message: 'Refresh tokens'}) },
      { q: translate({id: 'faq.tokens.q3.q', message: 'How do I log a user out?'}), a: translate({id: 'faq.tokens.q3.a', message: 'Revoke the JWT. A revoked token is rejected even if it has not expired yet.'}), to: '/docs/revoke-token/', link: translate({id: 'faq.tokens.q3.link', message: 'Revoke a token'}) },
      { q: translate({id: 'faq.tokens.q4.q', message: 'Can I add custom data to the JWT?'}), a: translate({id: 'faq.tokens.q4.a', message: 'Yes. Choose the claims in the Authentication settings, or add your own with the `simple_jwt_login_jwt_payload_auth` filter.'}), to: '/docs/hooks/', link: translate({id: 'faq.tokens.q4.link', message: 'Hooks'}) },
      { q: translate({id: 'faq.tokens.q5.q', message: 'Where is the signing key stored?'}), a: translate({id: 'faq.tokens.q5.a', message: 'In the plugin settings by default. To keep it out of the database, define `SIMPLE_JWT_PRIVATE_KEY` in `wp-config.php` instead.'}), to: '/docs/configuration/', link: translate({id: 'faq.tokens.q5.link', message: 'Configuration'}) },
    ],
  },
  {
    title: translate({id: 'faq.security.title', message: 'Security'}),
    faqs: [
      { q: translate({id: 'faq.security.q1.q', message: 'Should servers and scripts use a JWT?'}), a: translate({id: 'faq.security.q1.a', message: 'Use an API key instead. API keys are long-lived, scoped to read, create, update, or delete, and can be revoked at any time.'}), to: '/docs/api-keys/', link: translate({id: 'faq.security.q1.link', message: 'API keys'}) },
      { q: translate({id: 'faq.security.q2.q', message: 'How do I require a JWT on a REST route?'}), a: translate({id: 'faq.security.q2.a', message: 'Add a rule in Protect Endpoints. Requests to that route without a valid JWT are rejected.'}), to: '/docs/protect-endpoints/', link: translate({id: 'faq.security.q2.link', message: 'Protect Endpoints'}) },
      { q: translate({id: 'faq.security.q3.q', message: 'How do I report a security vulnerability?'}), a: translate({id: 'faq.security.q3.a', message: 'Report it privately through GitHub security advisories, never in a public issue or forum.'}), to: '/security', link: translate({id: 'faq.security.q3.link', message: 'Security policy'}) },
    ],
  },
  {
    title: translate({id: 'faq.troubleshooting.title', message: 'Troubleshooting'}),
    faqs: [
      { q: translate({id: 'faq.troubleshooting.q1.q', message: 'Why is my JWT ignored even though I send it?'}), a: translate({id: 'faq.troubleshooting.q1.a', message: 'The web server most likely strips the Authorization header before it reaches PHP. Send the token in another header, such as `X-Token`, or fix the server configuration.'}), to: '/docs/troubleshooting/#authorization-header-is-missing', link: translate({id: 'faq.troubleshooting.q1.link', message: 'Missing Authorization header'}) },
      { q: translate({id: 'faq.troubleshooting.q2.q', message: 'Why does my browser app get a CORS error?'}), a: translate({id: 'faq.troubleshooting.q2.a', message: 'Add the app origin to Allow origin in the CORS settings, and Authorization to Allow headers. Since version 4.1.1, a JWT from another site is trusted only when its origin is listed. A `*` entry trusts the `Authorization` header, but never cookie or session JWTs.'}), to: '/docs/cors/', link: translate({id: 'faq.troubleshooting.q2.link', message: 'CORS'}) },
      { q: translate({id: 'faq.troubleshooting.q3.q', message: 'What does an error code mean?'}), a: translate({id: 'faq.troubleshooting.q3.a', message: 'Every error response includes an `error_code`. The error codes page explains each one and how to fix it.'}), to: '/docs/error-codes/', link: translate({id: 'faq.troubleshooting.q3.link', message: 'Error codes'}) },
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
            <div key={to + q} className={styles.card}>
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
      title={translate({id: 'faq.meta.title', message: 'WordPress JWT Authentication FAQ'})}
      description={translate({id: 'faq.meta.description', message: 'Answers to common questions about Simple JWT Login - setup, login options, token expiry, refresh tokens, security, and fixing JWT errors in WordPress.'})}
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <header className={styles.hero}>
        <div className="container">
          <h1>
            <Translate id="faq.hero.title" values={{questions: <span><Translate id="faq.hero.title.questions">questions</Translate></span>}}>
              {'Frequently asked {questions}'}
            </Translate>
          </h1>
          <p><Translate id="faq.hero.subtitle">Quick answers about JWT authentication for WordPress with Simple JWT Login.</Translate></p>
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
