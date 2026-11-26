import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
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
  { title: translate({id: 'headlessWordpress.steps.install.title', message: 'Install the plugin'}), text: translate({id: 'headlessWordpress.steps.install.text', message: 'Add Simple JWT Login to WordPress, set a signing key, and turn on authentication.'}) },
  { title: translate({id: 'headlessWordpress.steps.token.title', message: 'Get a JWT'}), text: translate({id: 'headlessWordpress.steps.token.text', message: 'Your front end sends the user credentials to the REST API and gets a signed token back.'}) },
  { title: translate({id: 'headlessWordpress.steps.call.title', message: 'Call WordPress'}), text: translate({id: 'headlessWordpress.steps.call.text', message: 'Send the token as a Bearer header. WordPress treats the request as coming from that user.'}) },
];

const features = [
  { icon: faKey, title: translate({id: 'headlessWordpress.features.login.title', message: 'Login for any client'}), text: translate({id: 'headlessWordpress.features.login.text', message: 'Log in by email or username, or with Google, GitHub, Facebook, and Auth0.'}), to: '/docs/authentication/', link: translate({id: 'headlessWordpress.features.login.link', message: 'JWT authentication'}) },
  { icon: faUserPlus, title: translate({id: 'headlessWordpress.features.accounts.title', message: 'User accounts over REST'}), text: translate({id: 'headlessWordpress.features.accounts.text', message: 'Register users, reset passwords, and delete accounts without opening wp-login.php.'}), to: '/docs/register-user/', link: translate({id: 'headlessWordpress.features.accounts.link', message: 'User registration'}) },
  { icon: faLock, title: translate({id: 'headlessWordpress.features.protected.title', message: 'Protected endpoints'}), text: translate({id: 'headlessWordpress.features.protected.text', message: 'Require a valid JWT for any WordPress REST API route.'}), to: '/docs/protect-endpoints/', link: translate({id: 'headlessWordpress.features.protected.link', message: 'Endpoint protection'}) },
  { icon: faArrowsRotate, title: translate({id: 'headlessWordpress.features.lifecycle.title', message: 'Token lifecycle'}), text: translate({id: 'headlessWordpress.features.lifecycle.text', message: 'Refresh tokens to keep users logged in, and revoke them on logout.'}), to: '/docs/refresh-token/', link: translate({id: 'headlessWordpress.features.lifecycle.link', message: 'Refresh tokens'}) },
  { icon: faGlobe, title: translate({id: 'headlessWordpress.features.cors.title', message: 'CORS built in'}), text: translate({id: 'headlessWordpress.features.cors.text', message: 'Choose which front-end origins can call the plugin and authenticate with a JWT.'}), to: '/docs/cors/', link: translate({id: 'headlessWordpress.features.cors.link', message: 'CORS settings'}) },
  { icon: faShieldHalved, title: translate({id: 'headlessWordpress.features.twoFactor.title', message: 'Two-factor login'}), text: translate({id: 'headlessWordpress.features.twoFactor.text', message: 'Ask for a second factor before WordPress issues the final token.'}), to: '/docs/integrations/third-party/two-factor/', link: translate({id: 'headlessWordpress.features.twoFactor.link', message: 'Two-factor login'}) },
];

const stacks = [
  { icon: faCode, title: translate({id: 'headlessWordpress.stacks.nextjs.title', message: 'Next.js'}), text: translate({id: 'headlessWordpress.stacks.nextjs.text', message: 'Server-side login with an HttpOnly cookie.'}), to: '/docs/code-examples/nextjs', link: translate({id: 'headlessWordpress.stacks.nextjs.link', message: 'Next.js example'}) },
  { icon: faLayerGroup, title: translate({id: 'headlessWordpress.stacks.flutter.title', message: 'Flutter'}), text: translate({id: 'headlessWordpress.stacks.flutter.text', message: 'Mobile login with secure token storage.'}), to: '/docs/code-examples/flutter', link: translate({id: 'headlessWordpress.stacks.flutter.link', message: 'Flutter example'}) },
  { icon: faMobileScreen, title: translate({id: 'headlessWordpress.stacks.reactNative.title', message: 'React Native'}), text: translate({id: 'headlessWordpress.stacks.reactNative.text', message: 'Expo app with secure token storage.'}), to: '/docs/code-examples/react-native', link: translate({id: 'headlessWordpress.stacks.reactNative.link', message: 'React Native example'}) },
  { icon: faReact, title: translate({id: 'headlessWordpress.stacks.react.title', message: 'React'}), text: translate({id: 'headlessWordpress.stacks.react.text', message: 'Browser login with a Vite app.'}), to: '/docs/code-examples/react', link: translate({id: 'headlessWordpress.stacks.react.link', message: 'React example'}) },
  { icon: faVuejs, title: translate({id: 'headlessWordpress.stacks.vue.title', message: 'Vue'}), text: translate({id: 'headlessWordpress.stacks.vue.text', message: 'Browser login with a Vue 3 app.'}), to: '/docs/code-examples/vuejs', link: translate({id: 'headlessWordpress.stacks.vue.link', message: 'Vue example'}) },
  { icon: faAngular, title: translate({id: 'headlessWordpress.stacks.angular.title', message: 'Angular'}), text: translate({id: 'headlessWordpress.stacks.angular.text', message: 'Browser login with HttpClient.'}), to: '/docs/code-examples/angular', link: translate({id: 'headlessWordpress.stacks.angular.link', message: 'Angular example'}) },
  { icon: faCode, title: translate({id: 'headlessWordpress.stacks.javascript.title', message: 'JavaScript'}), text: translate({id: 'headlessWordpress.stacks.javascript.text', message: 'A todo app with no framework.'}), to: '/docs/code-examples/todo-app', link: translate({id: 'headlessWordpress.stacks.javascript.link', message: 'JavaScript example'}) },
  { icon: faCartShopping, title: translate({id: 'headlessWordpress.stacks.woocommerce.title', message: 'WooCommerce'}), text: translate({id: 'headlessWordpress.stacks.woocommerce.text', message: 'Products, cart, and checkout with a JWT.'}), to: '/docs/code-examples/woocommerce-headless-store', link: translate({id: 'headlessWordpress.stacks.woocommerce.link', message: 'Headless store example'}) },
  { icon: faLayerGroup, title: translate({id: 'headlessWordpress.stacks.wpgraphql.title', message: 'WPGraphQL'}), text: translate({id: 'headlessWordpress.stacks.wpgraphql.text', message: 'Authenticated queries and mutations.'}), to: '/docs/integrations/third-party/wpgraphql/', link: translate({id: 'headlessWordpress.stacks.wpgraphql.link', message: 'WPGraphQL guide'}) },
  { icon: faRobot, title: translate({id: 'headlessWordpress.stacks.aiAgents.title', message: 'AI agents'}), text: translate({id: 'headlessWordpress.stacks.aiAgents.text', message: 'Manage the plugin through MCP.'}), to: '/docs/integrations/third-party/ai-abilities/', link: translate({id: 'headlessWordpress.stacks.aiAgents.link', message: 'MCP guide'}) },
];

const faqs = [
  { q: translate({id: 'headlessWordpress.faq.q1.q', message: 'What is headless WordPress?'}), a: translate({id: 'headlessWordpress.faq.q1.a', message: 'Headless WordPress uses WordPress to manage content and users, while a separate front end, such as a Next.js site or a mobile app, shows it. The two communicate through the REST API or GraphQL.'}) },
  { q: translate({id: 'headlessWordpress.faq.q2.q', message: 'Why use JWT authentication with headless WordPress?'}), a: translate({id: 'headlessWordpress.faq.q2.a', message: 'WordPress login cookies are made for pages that WordPress serves. A JWT is a signed token that any client can send with a request, so it also works for separate front ends, mobile apps, and servers.'}) },
  { q: translate({id: 'headlessWordpress.faq.q3.q', message: 'Does it work with WooCommerce and WPGraphQL?'}), a: translate({id: 'headlessWordpress.faq.q3.a', message: 'Yes. The same JWT can authenticate the WooCommerce REST and Store APIs and WPGraphQL requests.'}) },
  { q: translate({id: 'headlessWordpress.faq.q4.q', message: 'Where should the front end store the JWT?'}), a: translate({id: 'headlessWordpress.faq.q4.a', message: 'For websites, keep it in an HttpOnly cookie set by your server. For mobile apps, use the secure storage of the device. Avoid browser local storage for sensitive apps.'}) },
  { q: translate({id: 'headlessWordpress.faq.q5.q', message: 'Is Simple JWT Login free?'}), a: translate({id: 'headlessWordpress.faq.q5.a', message: 'Yes. It is free and open-source, forever, with no paid tier.'}) },
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
      <Link to="/docs/quick-start/" className={sharedStyles.actionButton}><Translate id="headlessWordpress.actions.start">Start in 5 minutes →</Translate></Link>
      <Link to={PLUGIN_URL} className={sharedStyles.btn}><Translate id="headlessWordpress.actions.plugin">Get the free plugin</Translate></Link>
    </div>
  );
}

export default function HeadlessWordPressPage() {
  return (
    <Layout
      title={translate({id: 'headlessWordpress.meta.title', message: 'Headless WordPress Authentication'})}
      description={translate({id: 'headlessWordpress.meta.description', message: 'Add JWT authentication to headless WordPress - login, registration, and protected REST API endpoints for Next.js, React, Angular, Flutter, and WooCommerce.'})}
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <header className={styles.hero}>
        <div className="container">
          <h1>
            <Translate id="headlessWordpress.hero.title" values={{highlight: <span><Translate id="headlessWordpress.hero.title.highlight">authentication with JWT</Translate></span>}}>
              {'Headless WordPress {highlight}'}
            </Translate>
          </h1>
          <p>
            <Translate id="headlessWordpress.hero.subtitle">
              Keep WordPress for content and users. Build the front end with any framework, and log users in through the REST API.
            </Translate>
          </p>
          <Actions />
        </div>
      </header>

      <main>
        <Section
          eyebrow={translate({id: 'headlessWordpress.how.eyebrow', message: 'How it works'})}
          title={translate({id: 'headlessWordpress.how.title', message: 'From WordPress login to API call'})}
        >
          <ol className={styles.grid}>
            {steps.map(({ title, text }, index) => (
              <li key={index} className={styles.card}>
                <span className={styles.number} aria-hidden="true">{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className={styles.code}>
            <CodeBlock language="js" title={translate({id: 'headlessWordpress.how.codeTitle', message: 'Log in and call WordPress'})}>{example}</CodeBlock>
            <p>
              <Translate
                id="headlessWordpress.how.cors"
                values={{
                  cors: <Link to="/docs/cors/"><Translate id="headlessWordpress.how.cors.cors">CORS</Translate></Link>,
                  middleware: <Link to="/docs/configuration#jwt-middleware-for-all-wordpress-endpoints"><Translate id="headlessWordpress.how.cors.middleware">JWT middleware</Translate></Link>,
                }}
              >
                {'Calling from the browser? Add your front-end origin in {cors} and turn on the {middleware}.'}
              </Translate>
            </p>
          </div>
        </Section>

        <Section
          eyebrow={translate({id: 'headlessWordpress.features.eyebrow', message: 'Features'})}
          title={translate({id: 'headlessWordpress.features.title', message: 'What a headless site needs'})}
          gray
        >
          <CardGrid items={features} />
        </Section>

        <Section
          eyebrow={translate({id: 'headlessWordpress.stacks.eyebrow', message: 'Examples'})}
          title={translate({id: 'headlessWordpress.stacks.title', message: 'Pick your stack'})}
        >
          <CardGrid items={stacks} />
        </Section>

        <Section
          eyebrow={translate({id: 'headlessWordpress.faq.eyebrow', message: 'FAQ'})}
          title={translate({id: 'headlessWordpress.faq.title', message: 'Headless WordPress questions'})}
          gray
        >
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
            <h2><Translate id="headlessWordpress.cta.title">Go headless with WordPress</Translate></h2>
            <p><Translate id="headlessWordpress.cta.text">Free and open-source, forever.</Translate></p>
            <Actions />
          </div>
        </section>
      </main>
    </Layout>
  );
}
