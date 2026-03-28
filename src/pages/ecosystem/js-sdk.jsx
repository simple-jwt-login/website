import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './js-sdk.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive, faGlobe, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faReact, faVuejs, faNodeJs } from '@fortawesome/free-brands-svg-icons';
import sharedStyles from '../styles.module.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Simple JWT Login JavaScript Client',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'JavaScript SDK',
  operatingSystem: 'Node.js / Browser',
  description:
    'Official JavaScript client for Simple JWT Login. Authenticate users, register accounts, validate and revoke tokens from any JavaScript application — one npm package for any framework.',
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
    label: 'Authenticate',
    headline: 'Exchange credentials for a JWT',
    description:
      'Authenticate any WordPress user by email or username and receive a signed JWT. Store it in memory or localStorage and attach it to every subsequent request via the Authorization header.',
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
    label: 'Register User',
    headline: 'Create WordPress accounts via API',
    description:
      'Register new WordPress users from your frontend. Optionally assign a role and receive a JWT immediately — no admin UI, no custom backend code required.',
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
    label: 'Validate Token',
    headline: 'Verify a JWT is still valid',
    description:
      'Check that a token has not expired and its signature is intact. Call this on page load or before any protected API request to avoid unnecessary 401 errors.',
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
    label: 'Refresh Token',
    headline: 'Keep sessions alive without re-login',
    description:
      'Exchange an expiring token for a fresh one without asking the user to log in again. Schedule this before expiry to maintain seamless sessions in SPAs and mobile web apps.',
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
    label: 'Revoke Token',
    headline: 'Sign out & invalidate a token',
    description:
      'Permanently revoke a JWT on sign-out so it can never be reused — even if someone has a copy. Pair with clearing local storage for a complete logout flow.',
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
          <Link to="https://www.npmjs.com/package/simple-jwt-login" className={sharedStyles.btn} title="View on npm">
            npm →
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
      'Authenticate users from a React SPA or a Next.js app. Store the JWT in a context provider and attach it to every fetch or Axios call to your WordPress REST API.',
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
      'Integrate JWT authentication into a Vue 3 or Nuxt application. Use a Pinia store to hold the token and a composable to expose login/logout actions.',
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
      'Use the client on the server side to validate tokens in Express middleware, script WordPress user creation in CI, or build a BFF that proxies authenticated WP API calls.',
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
  { src: '/assets/img/frameworks/javascript.png', alt: 'JavaScript', label: 'Vanilla JS' },
  { src: '/assets/img/frameworks/react.png', alt: 'React', label: 'React / Next.js' },
  { src: '/assets/img/frameworks/vue.png', alt: 'Vue', label: 'Vue / Nuxt' },
  { src: '/assets/img/frameworks/angular.png', alt: 'Angular', label: 'Angular' },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function JsSdkPage() {
  return (
    <Layout
      title="JavaScript Client SDK — Simple JWT Login"
      description="Official JavaScript client for Simple JWT Login. Authenticate users, register accounts, validate and revoke tokens from React, Vue, Angular, or Node.js — one npm package."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}>JavaScript Client SDK</div>
          <h1 className={styles.heroTitle}>
            Simple JWT Login<br />
            <span className={styles.heroAccent}>for JavaScript</span>
          </h1>
          <p className={styles.heroSubtitle}>
            One npm package to authenticate users, manage tokens, and call
            the WordPress REST API from any JavaScript application — browser or Node.js.
          </p>
          <div className={styles.heroCta}>
            <Link to="https://www.npmjs.com/package/simple-jwt-login" className={sharedStyles.actionButton} title="View on npm">
              View on npm →
            </Link>
            <Link to="https://github.com/nicumicle/simple-jwt-login-client-js" className={sharedStyles.btn} title="View on GitHub">
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
                { comment: true, text: '// data.jwt — ready to use in any fetch / Axios call' },
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
                { icon: faBoxArchive, text: 'One npm package' },
                { icon: faGlobe, text: 'Browser & Node.js' },
                { icon: faReact, text: 'Works with any JS framework' },
                { icon: faHeart, text: 'Free & open source' },
              ].map(({ icon, text }) => (
                <div key={text} className={styles.highlightItem}>
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
            <span className={sharedStyles.sectionEyebrow}>Compatibility</span>
            <h2 className={sharedStyles.sectionTitle}>Works with any JavaScript framework</h2>
            <p className={styles.sectionLead}>
              A zero-dependency library with full ESM and CommonJS support — works
              in React, Vue, Angular, Svelte, or a plain script tag.
            </p>
            <div className={styles.frameworkGrid}>
              {frameworks.map(({ src, alt, label }) => (
                <div key={alt} className={styles.frameworkCard}>
                  <img src={src} alt={alt} className={styles.frameworkLogo} />
                  <span className={styles.frameworkLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Examples ──────────────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}>API Reference</span>
            <h2 className={sharedStyles.sectionTitle}>Everything in the token lifecycle</h2>
            <p className={styles.sectionLead}>
              Async / await API covering authentication, registration, and the full token lifecycle.
            </p>
            <ExampleTabs />
          </div>
        </section>

        {/* ── Use cases ─────────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}>Use Cases</span>
            <h2 className={sharedStyles.sectionTitle}>Built for real JavaScript workflows</h2>
            <p className={styles.sectionLead}>
              From React SPAs to server-side Node.js middleware — the client handles
              the auth layer so you can focus on your application.
            </p>
            <div className={styles.useCaseGrid}>
              {useCases.map(({ icon, title, description, code }) => (
                <div key={title} className={styles.useCaseCard}>
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
            <span className={sharedStyles.sectionEyebrow}>Getting Started</span>
            <h2 className={sharedStyles.sectionTitle}>Up and running in minutes</h2>
            <div className={styles.installGrid}>

              <div className={styles.requireBox}>
                <h3 className={styles.requireTitle}>Requirements</h3>
                <ul className={styles.requireList}>
                  {[
                    ['Node.js', '12+'],
                    ['npm / yarn', 'any'],
                    ['Simple JWT Login', 'active'],
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
                    <strong>Install via npm</strong>
                    <p>Add the package to your project.</p>
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
                    <strong>Instantiate the client</strong>
                    <p>Pass your WordPress site URL and Simple JWT Login Auth Code.</p>
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
                    <strong>Call the API</strong>
                    <p>Use the async API to authenticate, register, or manage tokens.</p>
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
            <span className={sharedStyles.sectionEyebrow}>Methods</span>
            <h2 className={sharedStyles.sectionTitle}>Complete method reference</h2>
            <p className={styles.sectionLead}>All available client methods at a glance.</p>
            <div className={styles.refTable}>
              {[
                { method: 'auth.login()', desc: 'Exchange credentials for a JWT token' },
                { method: 'auth.validateToken()', desc: 'Verify a token signature and expiry' },
                { method: 'auth.refreshToken()', desc: 'Get a new token from an expiring one' },
                { method: 'auth.revokeToken()', desc: 'Permanently invalidate a token' },
                { method: 'users.register()', desc: 'Create a new WordPress user account' },
                { method: 'users.delete()', desc: 'Delete a user via a verified JWT' },
                { method: 'users.autologin()', desc: 'Generate a one-click auto-login URL' },
                { method: 'users.changePassword()', desc: "Change the authenticated user's password" },
                { method: 'users.resetPassword()', desc: 'Trigger a password reset email' },
              ].map(({ method, desc }) => (
                <div key={method} className={styles.refRow}>
                  <code className={styles.refMethod}>{method}</code>
                  <span className={styles.refDesc}>{desc}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link to="https://www.npmjs.com/package/simple-jwt-login" className={sharedStyles.actionButton} title="View on npm">
                View on npm →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h2 className={styles.ctaTitle}>Add JWT to your JavaScript app today</h2>
              <p className={styles.ctaSubtitle}>
                One npm install and a few lines of code — that's all it takes to add
                WordPress JWT authentication to any JavaScript project.
              </p>
              <div className={styles.ctaButtons}>
                <Link to="https://www.npmjs.com/package/simple-jwt-login" className={sharedStyles.actionButton} title="View on npm">
                  Get started →
                </Link>
                <Link to="https://github.com/nicumicle/simple-jwt-login-client-js" className={sharedStyles.btn} title="View source on GitHub">
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
