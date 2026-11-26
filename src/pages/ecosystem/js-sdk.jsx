import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './js-sdk.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faGlobe, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faReact, faVuejs, faNodeJs } from '@fortawesome/free-brands-svg-icons';
import sharedStyles from '../styles.module.css';
import {useCdnBase, resolveCdnUrl} from '@site/src/utils/cdn';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Simple JWT Login JavaScript Client',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'JavaScript SDK',
  operatingSystem: 'Node.js / Browser',
  description:
    'Official JavaScript client for Simple JWT Login. Authenticate users, register accounts, validate and revoke tokens from any JavaScript application - one npm package for any framework.',
  url: 'https://www.npmjs.com/package/simple-jwt-login',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'Nicu Micle', url: 'https://github.com/nicumicle' },
};

/* ── Code block component ───────────────────────────────────── */
function CodeBlock({ title, lines }) {
  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeBar}>
        <span className={clsx(styles.dot, styles.dotRed)} />
        <span className={clsx(styles.dot, styles.dotYellow)} />
        <span className={clsx(styles.dot, styles.dotGreen)} />
        <span className={styles.codeTitle}>{title || 'js'}</span>
      </div>
      <pre className={styles.codeBody}>
        {lines.map((line, i) =>
          line.comment ? (
            <span key={i} className={styles.codeComment}>{line.text}{'\n'}</span>
          ) : line.output ? (
            <span key={i} className={styles.codeOutput}>{line.text}{'\n'}</span>
          ) : (
            <span key={i} className={styles.codeLine}>{line.text}{'\n'}</span>
          )
        )}
      </pre>
    </div>
  );
}

/* ── Example tabs ───────────────────────────────────────────── */
const examples = [
  {
    id: 'auth',
    label: translate({id: 'ecosystem.jsSdk.examples.auth.label', message: "Authenticate"}),
    headline: translate({id: 'ecosystem.jsSdk.examples.auth.headline', message: "Exchange credentials for a JWT"}),
    description:
      translate({id: 'ecosystem.jsSdk.examples.auth.description', message: "Authenticate any WordPress user by email or username and receive a signed JWT. Store it in memory or in local storage and attach it to every subsequent request via the Authorization header."}),
    lines: [
      { comment: true, text: '// Authenticate a user and get a JWT' },
      { text: "import SimpleJwtLogin from 'simple-jwt-login';" },
      { text: '' },
      { text: 'const client = new SimpleJwtLogin({' },
      { text: "  siteUrl: 'https://your-wordpress-site.com'," },
      { text: "  authCode: 'your-auth-code'," },
      { text: '});' },
      { text: '' },
      { text: 'const response = await client.auth.login({' },
      { text: "  email: 'user@example.com'," },
      { text: "  password: 'secret'," },
      { text: '});' },
      { text: '' },
      { text: 'const jwt = response.data.jwt;' },
    ],
  },
  {
    id: 'register',
    label: translate({id: 'ecosystem.jsSdk.examples.register.label', message: "Register User"}),
    headline: translate({id: 'ecosystem.jsSdk.examples.register.headline', message: "Create WordPress accounts via API"}),
    description:
      translate({id: 'ecosystem.jsSdk.examples.register.description', message: "Register new WordPress users from your frontend. Optionally assign a role and receive a JWT immediately - no admin UI, no custom backend code required."}),
    lines: [
      { comment: true, text: '// Register a new user' },
      { text: 'const response = await client.users.register({' },
      { text: "  email: 'newuser@example.com'," },
      { text: "  password: 'strongpassword'," },
      { text: "  first_name: 'Jane'," },
      { text: "  last_name: 'Doe'," },
      { text: '});' },
      { text: '' },
      { text: 'console.log(response.id); // new WordPress user ID' },
    ],
  },
  {
    id: 'validate',
    label: translate({id: 'ecosystem.jsSdk.examples.validate.label', message: "Validate Token"}),
    headline: translate({id: 'ecosystem.jsSdk.examples.validate.headline', message: "Verify a JWT is still valid"}),
    description:
      translate({id: 'ecosystem.jsSdk.examples.validate.description', message: "Check that a token has not expired and its signature is intact. Call this on page load or before any protected API request to avoid unnecessary 401 errors."}),
    lines: [
      { comment: true, text: '// Validate a JWT' },
      { text: 'const result = await client.auth.validateToken({' },
      { text: '  jwt,' },
      { text: '});' },
      { text: '' },
      { text: 'if (result.success) {' },
      { text: "  console.log('Token is valid');" },
      { text: '} else {' },
      { text: '  console.warn(result.data.message);' },
      { text: '}' },
    ],
  },
  {
    id: 'refresh',
    label: translate({id: 'ecosystem.jsSdk.examples.refresh.label', message: "Refresh Token"}),
    headline: translate({id: 'ecosystem.jsSdk.examples.refresh.headline', message: "Keep sessions alive without re-login"}),
    description:
      translate({id: 'ecosystem.jsSdk.examples.refresh.description', message: "Exchange an expiring token for a fresh one without asking the user to log in again. Schedule this before expiry to maintain seamless sessions in SPAs and mobile web apps."}),
    lines: [
      { comment: true, text: '// Refresh a token before it expires' },
      { text: 'const response = await client.auth.refreshToken({' },
      { text: '  jwt: existingJwt,' },
      { text: '});' },
      { text: '' },
      { comment: true, text: '// Store the new token' },
      { text: 'const newJwt = response.data.jwt;' },
      { text: "localStorage.setItem('jwt', newJwt);" },
    ],
  },
  {
    id: 'revoke',
    label: translate({id: 'ecosystem.jsSdk.examples.revoke.label', message: "Revoke Token"}),
    headline: translate({id: 'ecosystem.jsSdk.examples.revoke.headline', message: "Sign out & invalidate a token"}),
    description:
      translate({id: 'ecosystem.jsSdk.examples.revoke.description', message: "Permanently revoke a JWT on sign-out so it can never be reused - even if someone has a copy. Pair with clearing local storage for a complete logout flow."}),
    lines: [
      { comment: true, text: '// Revoke on sign-out' },
      { text: 'await client.auth.revokeToken({ jwt });' },
      { text: '' },
      { comment: true, text: '// Clear local state' },
      { text: "localStorage.removeItem('jwt');" },
      { text: "window.location.href = '/login';" },
    ],
  },
];

function ExampleTabs() {
  const [active, setActive] = useState(0);
  const ex = examples[active];
  return (
    <div className={styles.exampleBox}>
      <div className={styles.exampleTabs}>
        {examples.map((e, i) => (
          <button
            key={e.id}
            className={clsx(styles.exampleTab, i === active && styles.exampleTabActive)}
            onClick={() => setActive(i)}
          >
            {e.label}
          </button>
        ))}
      </div>
      <div className={styles.exampleContent}>
        <div className={styles.exampleInfo}>
          <h3 className={styles.exampleHeadline}>{ex.headline}</h3>
          <p className={styles.exampleDesc}>{ex.description}</p>
          <Link to="https://www.npmjs.com/package/simple-jwt-login" className={sharedStyles.btn} title={translate({id: 'ecosystem.jsSdk.examples.npmTitle', message: 'View on npm'})}>
            <Translate id="ecosystem.jsSdk.examples.npm">npm →</Translate>
          </Link>
        </div>
        <div className={styles.exampleCode}>
          <CodeBlock title="JavaScript" lines={ex.lines} />
        </div>
      </div>
    </div>
  );
}

/* ── Use-case cards ─────────────────────────────────────────── */
const useCases = [
  {
    icon: faReact,
    title: 'React / Next.js',
    description:
      translate({id: 'ecosystem.jsSdk.useCases.react.description', message: "Authenticate users from a React SPA or a Next.js app. Store the JWT in a context provider and attach it to every fetch or Axios call to your WordPress REST API."}),
    code: `import SimpleJwtLogin from 'simple-jwt-login';

const client = new SimpleJwtLogin({
  siteUrl: process.env.NEXT_PUBLIC_WP_URL,
  authCode: process.env.NEXT_PUBLIC_SJL_AUTH_CODE,
});

// In your login handler
const { data } = await client.auth.login({ email, password });
localStorage.setItem('jwt', data.jwt);

// In your API helper
const res = await fetch(\`\${wpUrl}/wp-json/wp/v2/posts\`, {
  headers: { Authorization: localStorage.getItem('jwt') },
});`,
  },
  {
    icon: faVuejs,
    title: 'Vue / Nuxt',
    description:
      translate({id: 'ecosystem.jsSdk.useCases.vue.description', message: "Integrate JWT authentication into a Vue 3 or Nuxt application. Use a Pinia store to hold the token and a composable to expose login/logout actions."}),
    code: `// stores/auth.js (Pinia)
import { defineStore } from 'pinia';
import SimpleJwtLogin from 'simple-jwt-login';

const client = new SimpleJwtLogin({
  siteUrl: import.meta.env.VITE_WP_URL,
  authCode: import.meta.env.VITE_SJL_AUTH_CODE,
});

export const useAuthStore = defineStore('auth', {
  state: () => ({ jwt: null }),
  actions: {
    async login(email, password) {
      const res = await client.auth.login({ email, password });
      this.jwt = res.data.jwt;
    },
  },
});`,
  },
  {
    icon: faNodeJs,
    title: 'Node.js / Express',
    description:
      translate({id: 'ecosystem.jsSdk.useCases.node.description', message: "Use the client on the server side to validate tokens in Express middleware, script WordPress user creation in CI, or build a BFF that proxies authenticated WP API calls."}),
    code: `import SimpleJwtLogin from 'simple-jwt-login';

const client = new SimpleJwtLogin({
  siteUrl: process.env.WP_URL,
  authCode: process.env.SJL_AUTH_CODE,
});

// Express middleware
app.use(async (req, res, next) => {
  const jwt = req.headers.authorization;
  if (!jwt) return res.status(401).json({ error: 'Missing token' });

  const result = await client.auth.validateToken({ jwt });
  if (!result.success) return res.status(401).json({ error: 'Invalid token' });

  next();
});`,
  },
];

/* ── Frameworks ─────────────────────────────────────────────── */
const frameworks = [
  { src: '/assets/images/frameworks/javascript.png', alt: 'JavaScript', label: translate({id: 'ecosystem.jsSdk.frameworks.vanillaJs', message: "Vanilla JS"}) },
  { src: '/assets/images/frameworks/react.png', alt: 'React', label: 'React / Next.js' },
  { src: '/assets/images/frameworks/vue.png', alt: 'Vue', label: 'Vue / Nuxt' },
  { src: '/assets/images/frameworks/angular.png', alt: 'Angular', label: 'Angular' },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function JsSdkPage() {
  const cdnBase = useCdnBase();
  return (
    <Layout
      title={translate({id: 'ecosystem.jsSdk.meta.title', message: 'JavaScript Client SDK - Simple JWT Login'})}
      description={translate({id: 'ecosystem.jsSdk.meta.description', message: 'Official JavaScript client for Simple JWT Login. Authenticate, register, validate and revoke tokens from React, Vue, Angular, or Node.js.'})}
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}><Translate id="ecosystem.jsSdk.hero.badge">JavaScript Client SDK</Translate></div>
          <h1 className={styles.heroTitle}>
            Simple JWT Login<br />
            <span className={styles.heroAccent}><Translate id="ecosystem.jsSdk.hero.titleAccent">for JavaScript</Translate></span>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="ecosystem.jsSdk.hero.subtitle">One npm package to authenticate users, manage tokens, and call the WordPress REST API from any JavaScript application - browser or Node.js.</Translate>
          </p>
          <div className={styles.heroCta}>
            <Link to="https://www.npmjs.com/package/simple-jwt-login" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.jsSdk.hero.npmTitle', message: 'View on npm'})}>
              <Translate id="ecosystem.jsSdk.hero.npm">View on npm →</Translate>
            </Link>
            <Link to="https://github.com/nicumicle/simple-jwt-login-client-js" className={sharedStyles.btn} title={translate({id: 'ecosystem.jsSdk.hero.githubTitle', message: 'View on GitHub'})}>
              GitHub
            </Link>
          </div>

          {/* Hero code preview */}
           <div className={styles.heroCodeWrap}>
            <CodeBlock
              title="Bash"
              lines={[
                { comment: true, text: '// Install' },
                { text: 'npm install simple-jwt-login' },
                { text: '' },
              ]}
            />
           </div> 
          <div className={clsx(styles.heroCodeWrap, styles.marginTop)}>
            <CodeBlock
              title="JavaScript"
              lines={[
                { comment: true, text: '// Authenticate a user' },
                { text: "import SimpleJwtLogin from 'simple-jwt-login';" },
                { text: '' },
                { text: 'const client = new SimpleJwtLogin({' },
                { text: "  siteUrl: 'https://your-wordpress-site.com'," },
                { text: "  authCode: 'your-auth-code'," },
                { text: '});' },
                { text: '' },
                { text: 'const { data } = await client.auth.login({ email, password });' },
                { comment: true, text: '// data.jwt - ready to use in any fetch / Axios call' },
              ]}
            />
          </div>
        </div>
      </header>

      <main>

        {/* ── Highlights ────────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, styles.highlights)}>
          <div className="container">
            <div className={styles.highlightGrid}>
              {[
                { icon: faBoxArchive, text: translate({id: 'ecosystem.jsSdk.highlights.npm', message: "One npm package"}) },
                { icon: faGlobe, text: translate({id: 'ecosystem.jsSdk.highlights.browserNode', message: "Browser & Node.js"}) },
                { icon: faReact, text: translate({id: 'ecosystem.jsSdk.highlights.framework', message: "Works with any JS framework"}) },
                { icon: faHeart, text: translate({id: 'ecosystem.jsSdk.highlights.free', message: "Free & open source"}) },
              ].map(({ icon, text }) => (
                <div key={icon.iconName} className={styles.highlightItem}>
                  <span className={styles.highlightIcon}><FontAwesomeIcon icon={icon} /></span>
                  <span className={styles.highlightText}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Supported frameworks ──────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.jsSdk.compat.eyebrow">Compatibility</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.jsSdk.compat.title">Works with any JavaScript framework</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="ecosystem.jsSdk.compat.lead">A zero-dependency library with full ESM and CommonJS support - works in React, Vue, Angular, Svelte, or a plain script tag.</Translate>
            </p>
            <div className={styles.frameworkGrid}>
              {frameworks.map(({ src, alt, label }) => (
                <div key={alt} className={styles.frameworkCard}>
                  <img src={resolveCdnUrl(cdnBase, src)} alt={alt} className={styles.frameworkLogo} />
                  <span className={styles.frameworkLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Examples ──────────────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.jsSdk.api.eyebrow">API Reference</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.jsSdk.api.title">Everything in the token lifecycle</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="ecosystem.jsSdk.api.lead">Async / await API covering authentication, registration, and the full token lifecycle.</Translate>
            </p>
            <ExampleTabs />
          </div>
        </section>

        {/* ── Use cases ─────────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.jsSdk.useCases.eyebrow">Use Cases</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.jsSdk.useCases.title">Built for real JavaScript workflows</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="ecosystem.jsSdk.useCases.lead">From React SPAs to server-side Node.js middleware - the client handles the auth layer so you can focus on your application.</Translate>
            </p>
            <div className={styles.useCaseGrid}>
              {useCases.map(({ icon, title, description, code }) => (
                <div key={icon.iconName} className={styles.useCaseCard}>
                  <div className={styles.useCaseHeader}>
                    <span className={styles.useCaseIcon}><FontAwesomeIcon icon={icon} /></span>
                    <h3 className={styles.useCaseTitle}>{title}</h3>
                  </div>
                  <p className={styles.useCaseDesc}>{description}</p>
                  <pre className={styles.useCaseCode}><code>{code}</code></pre>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Installation ──────────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.jsSdk.install.eyebrow">Getting Started</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.jsSdk.install.title">Up and running in minutes</Translate></h2>
            <div className={styles.installGrid}>

              <div className={styles.requireBox}>
                <h3 className={styles.requireTitle}><Translate id="ecosystem.jsSdk.install.requirements">Requirements</Translate></h3>
                <ul className={styles.requireList}>
                  {[
                    ['Node.js', '12+'],
                    ['npm / yarn', translate({id: 'ecosystem.jsSdk.install.reqAny', message: "any"})],
                    ['Simple JWT Login', translate({id: 'ecosystem.jsSdk.install.reqActive', message: "active"})],
                    ['WordPress', '4.4+'],
                  ].map(([dep, ver]) => (
                    <li key={dep} className={styles.requireItem}>
                      <span className={styles.requireDep}>{dep}</span>
                      <span className={styles.requireVer}>{ver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.installSteps}>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>1</span>
                  <div>
                    <strong><Translate id="ecosystem.jsSdk.install.step1.title">Install via npm</Translate></strong>
                    <p><Translate id="ecosystem.jsSdk.install.step1.desc">Add the package to your project.</Translate></p>
                    <CodeBlock title="bash" lines={[
                      { text: 'npm install simple-jwt-login' },
                      { comment: true, text: '# or' },
                      { text: 'yarn add simple-jwt-login' },
                    ]} />
                  </div>
                </div>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>2</span>
                  <div>
                    <strong><Translate id="ecosystem.jsSdk.install.step2.title">Instantiate the client</Translate></strong>
                    <p><Translate id="ecosystem.jsSdk.install.step2.desc">Pass your WordPress site URL and Simple JWT Login Auth Code.</Translate></p>
                    <CodeBlock title="JavaScript" lines={[
                      { text: "import SimpleJwtLogin from 'simple-jwt-login';" },
                      { text: '' },
                      { text: 'const client = new SimpleJwtLogin({' },
                      { text: "  siteUrl: 'https://your-wordpress-site.com'," },
                      { text: "  authCode: 'your-auth-code'," },
                      { text: '});' },
                    ]} />
                  </div>
                </div>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>3</span>
                  <div>
                    <strong><Translate id="ecosystem.jsSdk.install.step3.title">Call the API</Translate></strong>
                    <p><Translate id="ecosystem.jsSdk.install.step3.desc">Use the async API to authenticate, register, or manage tokens.</Translate></p>
                    <CodeBlock title="JavaScript" lines={[
                      { text: 'const { data } = await client.auth.login({' },
                      { text: "  email: 'user@example.com'," },
                      { text: "  password: 'secret'," },
                      { text: '});' },
                      { text: '' },
                      { text: 'const jwt = data.jwt;' },
                    ]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Method reference ──────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.jsSdk.methods.eyebrow">Methods</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.jsSdk.methods.title">Complete method reference</Translate></h2>
            <p className={styles.sectionLead}><Translate id="ecosystem.jsSdk.methods.lead">All available client methods at a glance.</Translate></p>
            <div className={styles.refTable}>
              {[
                { method: 'auth.login()', desc: translate({id: 'ecosystem.jsSdk.methods.login', message: "Exchange credentials for a JWT"}) },
                { method: 'auth.validateToken()', desc: translate({id: 'ecosystem.jsSdk.methods.validateToken', message: "Verify a token signature and expiry"}) },
                { method: 'auth.refreshToken()', desc: translate({id: 'ecosystem.jsSdk.methods.refreshToken', message: "Get a new token from an expiring one"}) },
                { method: 'auth.revokeToken()', desc: translate({id: 'ecosystem.jsSdk.methods.revokeToken', message: "Permanently invalidate a token"}) },
                { method: 'users.register()', desc: translate({id: 'ecosystem.jsSdk.methods.register', message: "Create a new WordPress user account"}) },
                { method: 'users.delete()', desc: translate({id: 'ecosystem.jsSdk.methods.delete', message: "Delete a user via a verified JWT"}) },
                { method: 'users.autologin()', desc: translate({id: 'ecosystem.jsSdk.methods.autologin', message: "Generate a one-click auto-login URL"}) },
                { method: 'users.changePassword()', desc: translate({id: 'ecosystem.jsSdk.methods.changePassword', message: "Change the authenticated user's password"}) },
                { method: 'users.resetPassword()', desc: translate({id: 'ecosystem.jsSdk.methods.resetPassword', message: "Trigger a password reset email"}) },
              ].map(({ method, desc }) => (
                <div key={method} className={styles.refRow}>
                  <code className={styles.refMethod}>{method}</code>
                  <span className={styles.refDesc}>{desc}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link to="https://www.npmjs.com/package/simple-jwt-login" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.jsSdk.methods.npmTitle', message: 'View on npm'})}>
                <Translate id="ecosystem.jsSdk.methods.npm">View on npm →</Translate>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h2 className={styles.ctaTitle}><Translate id="ecosystem.jsSdk.cta.title">Add JWT to your JavaScript app today</Translate></h2>
              <p className={styles.ctaSubtitle}>
                <Translate id="ecosystem.jsSdk.cta.subtitle">{'One npm install and a few lines of code - that\'s all it takes to add WordPress JWT authentication to any JavaScript project.'}</Translate>
              </p>
              <div className={styles.ctaButtons}>
                <Link to="https://www.npmjs.com/package/simple-jwt-login" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.jsSdk.cta.npmTitle', message: 'View on npm'})}>
                  <Translate id="ecosystem.jsSdk.cta.getStarted">Get started →</Translate>
                </Link>
                <Link to="https://github.com/nicumicle/simple-jwt-login-client-js" className={sharedStyles.btn} title={translate({id: 'ecosystem.jsSdk.cta.githubTitle', message: 'View source on GitHub'})}>
                  <Translate id="ecosystem.jsSdk.cta.github">View on GitHub</Translate>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
