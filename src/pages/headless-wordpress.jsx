import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate, faCartShopping, faCode, faGlobe, faKey, faLayerGroup,
  faLock, faMobileScreen, faRobot, faShieldHalved, faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faAngular, faReact, faVuejs } from '@fortawesome/free-brands-svg-icons';
import sharedStyles from './styles.module.css';
import styles from './headless-wordpress.module.css';

const PLUGIN_URL = 'https://wordpress.org/plugins/simple-jwt-login/';

const steps = [
  { title: 'Install the plugin', text: 'Add Simple JWT Login to WordPress, set a signing key, and turn on authentication.' },
  { title: 'Get a JWT', text: 'Your front end sends the user credentials to the REST API and gets a signed token back.' },
  { title: 'Call WordPress', text: 'Send the token as a Bearer header. WordPress treats the request as coming from that user.' },
];

const features = [
  { icon: faKey, title: 'Login for any client', text: 'Log in by email or username, or with Google, GitHub, Facebook, and Auth0.', to: '/docs/authentication/', link: 'JWT authentication' },
  { icon: faUserPlus, title: 'User accounts over REST', text: 'Register users, reset passwords, and delete accounts without opening wp-login.php.', to: '/docs/register-user/', link: 'User registration' },
  { icon: faLock, title: 'Protected endpoints', text: 'Require a valid JWT for any WordPress REST API route.', to: '/docs/protect-endpoints/', link: 'Endpoint protection' },
  { icon: faArrowsRotate, title: 'Token lifecycle', text: 'Refresh tokens to keep users logged in, and revoke them on logout.', to: '/docs/refresh-token/', link: 'Refresh tokens' },
  { icon: faGlobe, title: 'CORS built in', text: 'Choose which front-end origins can call the plugin and authenticate with a JWT.', to: '/docs/cors/', link: 'CORS settings' },
  { icon: faShieldHalved, title: 'Two-factor login', text: 'Ask for a second factor before WordPress issues the final token.', to: '/docs/integrations/third-party/two-factor/', link: 'Two-factor login' },
];

const stacks = [
  { icon: faCode, title: 'Next.js', text: 'Server-side login with an HttpOnly cookie.', to: '/docs/code-examples/nextjs', link: 'Next.js example' },
  { icon: faLayerGroup, title: 'Flutter', text: 'Mobile login with secure token storage.', to: '/docs/code-examples/flutter', link: 'Flutter example' },
  { icon: faMobileScreen, title: 'React Native', text: 'Expo app with secure token storage.', to: '/docs/code-examples/react-native', link: 'React Native example' },
  { icon: faReact, title: 'React', text: 'Browser login with a Vite app.', to: '/docs/code-examples/react', link: 'React example' },
  { icon: faVuejs, title: 'Vue', text: 'Browser login with a Vue 3 app.', to: '/docs/code-examples/vuejs', link: 'Vue example' },
  { icon: faAngular, title: 'Angular', text: 'Browser login with HttpClient.', to: '/docs/code-examples/angular', link: 'Angular example' },
  { icon: faCode, title: 'JavaScript', text: 'A todo app with no framework.', to: '/docs/code-examples/todo-app', link: 'JavaScript example' },
  { icon: faCartShopping, title: 'WooCommerce', text: 'Products, cart, and checkout with a JWT.', to: '/docs/code-examples/woocommerce-headless-store', link: 'Headless store example' },
  { icon: faLayerGroup, title: 'WPGraphQL', text: 'Authenticated queries and mutations.', to: '/docs/integrations/third-party/wpgraphql/', link: 'WPGraphQL guide' },
  { icon: faRobot, title: 'AI agents', text: 'Manage the plugin through MCP.', to: '/docs/integrations/third-party/ai-abilities/', link: 'MCP guide' },
];

const faqs = [
  { q: 'What is headless WordPress?', a: 'Headless WordPress uses WordPress to manage content and users, while a separate front end, such as a Next.js site or a mobile app, shows it. The two communicate through the REST API or GraphQL.' },
  { q: 'Why use JWT authentication with headless WordPress?', a: 'WordPress login cookies are made for pages that WordPress serves. A JWT is a signed token that any client can send with a request, so it also works for separate front ends, mobile apps, and servers.' },
  { q: 'Does it work with WooCommerce and WPGraphQL?', a: 'Yes. The same JWT can authenticate the WooCommerce REST and Store APIs and WPGraphQL requests.' },
  { q: 'Where should the front end store the JWT?', a: 'For websites, keep it in an HttpOnly cookie set by your server. For mobile apps, use the secure storage of the device. Avoid browser local storage for sensitive apps.' },
  { q: 'Is Simple JWT Login free?', a: 'Yes. It is free and open-source, forever, with no paid tier.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const example = `const site = 'https://example.com/wp-json';

// 1. Get a JWT
const login = await fetch(site + '/simple-jwt-login/v1/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
const { data } = await login.json();

// 2. Call the WordPress REST API as that user
const me = await fetch(site + '/wp/v2/users/me', {
  headers: { Authorization: 'Bearer ' + data.jwt },
});`;

function CardGrid({ items }) {
  return (
    <div className={styles.grid}>
      {items.map(({ icon, title, text, to, link }) => (
        <div key={title} className={styles.card}>
          <FontAwesomeIcon icon={icon} className={styles.icon} aria-hidden="true" />
          <h3>{title}</h3>
          <p>{text}</p>
          <Link to={to}>{link} →</Link>
        </div>
      ))}
    </div>
  );
}

function Section({ eyebrow, title, gray, children }) {
  return (
    <section className={clsx(sharedStyles.sectionPadding, gray && sharedStyles.sectionGray)}>
      <div className="container">
        <span className={sharedStyles.sectionEyebrow}>{eyebrow}</span>
        <h2 className={sharedStyles.sectionTitle}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Actions() {
  return (
    <div className={styles.actions}>
      <Link to="/docs/quick-start/" className={sharedStyles.actionButton}>Start in 5 minutes →</Link>
      <Link to={PLUGIN_URL} className={sharedStyles.btn}>Get the free plugin</Link>
    </div>
  );
}

export default function HeadlessWordPressPage() {
  return (
    <Layout
      title="Headless WordPress Authentication"
      description="Add JWT authentication to headless WordPress - login, registration, and protected REST API endpoints for Next.js, React, Angular, Flutter, and WooCommerce."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <header className={styles.hero}>
        <div className="container">
          <h1>Headless WordPress <span>authentication with JWT</span></h1>
          <p>
            Keep WordPress for content and users. Build the front end with any
            framework, and log users in through the REST API.
          </p>
          <Actions />
        </div>
      </header>

      <main>
        <Section eyebrow="How it works" title="From WordPress login to API call">
          <ol className={styles.grid}>
            {steps.map(({ title, text }, index) => (
              <li key={title} className={styles.card}>
                <span className={styles.number} aria-hidden="true">{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className={styles.code}>
            <CodeBlock language="js" title="Log in and call WordPress">{example}</CodeBlock>
            <p>
              Calling from the browser? Add your front-end origin in{' '}
              <Link to="/docs/cors/">CORS</Link> and turn on the{' '}
              <Link to="/docs/configuration#jwt-middleware-for-all-wordpress-endpoints">JWT middleware</Link>.
            </p>
          </div>
        </Section>

        <Section eyebrow="Features" title="What a headless site needs" gray>
          <CardGrid items={features} />
        </Section>

        <Section eyebrow="Examples" title="Pick your stack">
          <CardGrid items={stacks} />
        </Section>

        <Section eyebrow="FAQ" title="Headless WordPress questions" gray>
          <div className={styles.faq}>
            {faqs.map(({ q, a }) => (
              <div key={q} className={styles.card}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </Section>

        <section className={styles.hero}>
          <div className="container">
            <h2>Go headless with WordPress</h2>
            <p>Free and open-source, forever.</p>
            <Actions />
          </div>
        </section>
      </main>
    </Layout>
  );
}
