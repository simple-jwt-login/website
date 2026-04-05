import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './php-sdk.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faLock, faFlask, faBoxArchive, faPlug, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPhp } from '@fortawesome/free-brands-svg-icons';
import sharedStyles from '../styles.module.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Simple JWT Login PHP Client',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'PHP SDK',
  operatingSystem: 'PHP 5.5+',
  description:
    'Official PHP client for Simple JWT Login. Authenticate users, register accounts, validate and revoke tokens, and more - one Composer package for any PHP framework.',
  url: 'https://packagist.org/packages/nicumicle/simple-jwt-login-client-php',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'Nicu Micle', url: 'https://github.com/nicumicle' },
};

/* ── Code block component ───────────────────────────────────── */
function CodeBlock({ lang = 'php', title, lines }) {
  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeBar}>
        <span className={clsx(styles.dot, styles.dotRed)} />
        <span className={clsx(styles.dot, styles.dotYellow)} />
        <span className={clsx(styles.dot, styles.dotGreen)} />
        <span className={styles.codeTitle}>{title || lang}</span>
      </div>
      <pre className={styles.codeBody}>
        {lines.map((line, i) =>
          line.comment ? (
            <span key={i} className={styles.codeComment}>{line.text}{'\n'}</span>
          ) : line.output ? (
            <span key={i} className={styles.codeOutput}>{line.text}{'\n'}</span>
          ) : line.keyword ? (
            <span key={i} className={styles.codeKeyword}>{line.text}{'\n'}</span>
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
      'Authenticate any WordPress user by email or username and receive a signed JWT. Pass the token in the Authorization header for all subsequent requests to protected endpoints.',
    lines: [
      { comment: true, text: '// Authenticate a user and get a JWT' },
      { text: '$client = new SimpleJwtLoginClient($siteUrl, $authCode);' },
      { text: '' },
      { text: '$response = $client' },
      { text: "    ->withEmail('user@example.com')" },
      { text: "    ->withPassword('secret')" },
      { text: '    ->authenticate();' },
      { text: '' },
      { comment: true, text: '// $response[\'data\'][\'jwt\'] contains your token' },
      { text: "$jwt = $response['data']['jwt'];" },
      { text: "echo 'Token: ' . $jwt;" },
    ],
  },
  {
    id: 'register',
    label: 'Register User',
    headline: 'Create WordPress accounts via API',
    description:
      'Register new WordPress users programmatically. Optionally assign a role at creation time and receive a JWT immediately after registration - no admin UI required.',
    lines: [
      { comment: true, text: '// Register a new user' },
      { text: '$client = new SimpleJwtLoginClient($siteUrl, $authCode);' },
      { text: '' },
      { text: '$response = $client' },
      { text: "    ->withEmail('newuser@example.com')" },
      { text: "    ->withPassword('strongpassword')" },
      { text: "    ->withExtraParameter('first_name', 'Jane')" },
      { text: "    ->withExtraParameter('last_name', 'Doe')" },
      { text: '    ->register();' },
      { text: '' },
      { text: "echo 'New user ID: ' . \$response['id'];" },
    ],
  },
  {
    id: 'validate',
    label: 'Validate Token',
    headline: 'Verify a JWT is still valid',
    description:
      'Check that a token has not expired and its signature matches the plugin decryption key. Use this on every request to protected resources in your application.',
    lines: [
      { comment: true, text: '// Validate a JWT' },
      { text: '$client = new SimpleJwtLoginClient($siteUrl, $authCode);' },
      { text: '' },
      { text: '$response = $client' },
      { text: "    ->withJwt(\$jwt)" },
      { text: '    ->validateToken();' },
      { text: '' },
      { text: "if (\$response['success']) {" },
      { text: "    echo 'Token is valid';" },
      { text: '} else {' },
      { text: "    echo 'Token error: ' . \$response['data']['message'];" },
      { text: '}' },
    ],
  },
  {
    id: 'refresh',
    label: 'Refresh Token',
    headline: 'Keep sessions alive without re-login',
    description:
      'Exchange an expiring token for a fresh one without requiring the user to enter credentials again. Perfect for long-running sessions in SPAs and mobile apps.',
    lines: [
      { comment: true, text: '// Refresh an expiring JWT' },
      { text: '$client = new SimpleJwtLoginClient($siteUrl, $authCode);' },
      { text: '' },
      { text: '$response = $client' },
      { text: "    ->withJwt(\$existingJwt)" },
      { text: '    ->refreshToken();' },
      { text: '' },
      { text: "// Store the new token" },
      { comment: true, text: '// $response[\'data\'][\'jwt\'] is the fresh token' },
      { text: "$newJwt = \$response['data']['jwt'];" },
    ],
  },
  {
    id: 'revoke',
    label: 'Revoke Token',
    headline: 'Force-expire a token immediately',
    description:
      'Revoke a token so it can never be used again - useful for implementing sign-out, account suspension, or post-deployment security sweeps.',
    lines: [
      { comment: true, text: '// Revoke a JWT' },
      { text: '$client = new SimpleJwtLoginClient($siteUrl, $authCode);' },
      { text: '' },
      { text: '$response = $client' },
      { text: "    ->withJwt(\$jwt)" },
      { text: '    ->revokeToken();' },
      { text: '' },
      { text: "if (\$response['success']) {" },
      { text: "    echo 'Token revoked.';" },
      { text: '}' },
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
          <Link to="https://packagist.org/packages/nicumicle/simple-jwt-login-client-php" className={sharedStyles.btn} title="View on Packagist">
            Packagist →
          </Link>
        </div>
        <div className={styles.exampleCode}>
          <CodeBlock title="PHP" lines={ex.lines} />
        </div>
      </div>
    </div>
  );
}

/* ── Use-case cards ─────────────────────────────────────────── */
const useCases = [
  {
    icon: faScrewdriverWrench,
    title: 'Headless WordPress',
    description:
      'Build a decoupled frontend in Laravel, Symfony, or plain PHP while WordPress handles content. Authenticate users from your PHP app and pass JWTs to the WP REST API.',
    code: `$client = new SimpleJwtLoginClient($wpUrl, $authCode);

// Log the user in from your PHP frontend
$auth = $client
    ->withEmail($request->email)
    ->withPassword($request->password)
    ->authenticate();

$jwt = $auth['data']['jwt'];

// Now call any WP REST endpoint with the token
$posts = Http::withToken($jwt)
    ->get($wpUrl . '/wp-json/wp/v2/posts')
    ->json();`,
  },
  {
    icon: faLock,
    title: 'User registration flow',
    description:
      'Register users from your own sign-up form and immediately issue a JWT - all in one round trip, without touching the WordPress admin.',
    code: `$client = new SimpleJwtLoginClient($wpUrl, $authCode);

$response = $client
    ->withEmail($data['email'])
    ->withPassword($data['password'])
    ->withExtraParameter('first_name', $data['name'])
    ->register();

// Immediately authenticate the new user
$auth = $client
    ->withEmail($data['email'])
    ->withPassword($data['password'])
    ->authenticate();

$jwt = $auth['data']['jwt'];`,
  },
  {
    icon: faFlask,
    title: 'Automated testing',
    description:
      'Generate tokens in PHPUnit or Pest fixtures to test authenticated flows against a real WordPress instance - no browser, no cookies, no mocking.',
    code: `// In your PHPUnit setUp()
protected function setUp(): void
{
    $client = new SimpleJwtLoginClient(
        getenv('WP_URL'),
        getenv('SJL_AUTH_CODE')
    );

    $auth = $client
        ->withEmail(getenv('TEST_USER_EMAIL'))
        ->withPassword(getenv('TEST_USER_PASSWORD'))
        ->authenticate();

    $this->jwt = $auth['data']['jwt'];
}`,
  },
];

/* ── Frameworks ─────────────────────────────────────────────── */
const frameworks = [
  { src: '/assets/img/frameworks/php.png', alt: 'PHP', label: 'Plain PHP' },
  { src: '/assets/img/frameworks/laravel.png', alt: 'Laravel', label: 'Laravel' },
  { src: '/assets/img/frameworks/yii.png', alt: 'Yii', label: 'Yii' },
  { src: '/assets/img/frameworks/codeigniter.png', alt: 'CodeIgniter', label: 'CodeIgniter' },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function PhpSdkPage() {
  return (
    <Layout
      title="PHP Client SDK - Simple JWT Login"
      description="Official PHP client for Simple JWT Login. Authenticate users, register accounts, validate and revoke tokens from any PHP application - one Composer package, any framework."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}>PHP Client SDK</div>
          <h1 className={styles.heroTitle}>
            Simple JWT Login<br />
            <span className={styles.heroAccent}>for PHP</span>
          </h1>
          <p className={styles.heroSubtitle}>
            One Composer package to authenticate users, manage tokens, and call
            the WordPress REST API from any PHP application - no boilerplate required.
          </p>
          <div className={styles.heroCta}>
            <Link to="https://packagist.org/packages/nicumicle/simple-jwt-login-client-php" className={sharedStyles.actionButton} title="View on Packagist">
              View on Packagist →
            </Link>
            <Link to="https://github.com/nicumicle/simple-jwt-login-client-php" className={sharedStyles.btn} title="View on GitHub">
              GitHub
            </Link>
          </div>

          {/* Hero code preview */}
          <div className={styles.heroCodeWrap}>
              <CodeBlock
              title="Bash"
              lines={[
                { comment: true, text: '// Install' },
                { text: 'composer require "nicumicle/simple-jwt-login-client-php"' },
                { text: '' },
              ]}
              />
          </div>
           <div className={clsx(styles.heroCodeWrap,styles.marginTop)}>
            <CodeBlock
              title="PHP"
              lines={[
                { comment: true, text: '// Authenticate a user' },
                { text: '$client = new SimpleJwtLoginClient($siteUrl, $authCode);' },
                { text: '$response = $client' },
                { text: "    ->withEmail('user@example.com')" },
                { text: "    ->withPassword('secret')" },
                { text: '    ->authenticate();' },
                { text: '' },
                { text: "$jwt = \$response['data']['jwt'];" },
                { text: '' },
                { comment: true, text: '// Use the token on any WordPress endpoint' },
                { text: "curl_setopt(\$ch, CURLOPT_HTTPHEADER, ['Authorization: ' . \$jwt]);" },
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
                { icon: faBoxArchive, text: 'One Composer package' },
                { icon: faPhp, text: 'PHP 5.5+ compatible' },
                { icon: faPlug, text: 'Works with any framework' },
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
            <h2 className={sharedStyles.sectionTitle}>Works with any PHP framework</h2>
            <p className={styles.sectionLead}>
              The client is a plain PHP library with zero framework dependencies - drop it
              into Laravel, Yii, CodeIgniter, Symfony, or a standalone script.
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
              Fluent, chainable API covering authentication, registration, and the full token lifecycle.
            </p>
            <ExampleTabs />
          </div>
        </section>

        {/* ── Use cases ─────────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}>Use Cases</span>
            <h2 className={sharedStyles.sectionTitle}>Built for real PHP workflows</h2>
            <p className={styles.sectionLead}>
              From headless WordPress to automated testing - the client handles the auth layer so you can focus on your app.
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
                    ['PHP', '5.5+'],
                    ['Composer', 'any'],
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
                    <strong>Install via Composer</strong>
                    <p>Add the package to your project with a single command.</p>
                    <CodeBlock title="bash" lines={[
                      { text: 'composer require "nicumicle/simple-jwt-login-client-php"' },
                    ]} />
                  </div>
                </div>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>2</span>
                  <div>
                    <strong>Instantiate the client</strong>
                    <p>Pass your WordPress site URL and Simple JWT Login Auth Code.</p>
                    <CodeBlock title="PHP" lines={[
                      { text: "use SimpleJwtLoginClient\\SimpleJwtLoginClient;" },
                      { text: '' },
                      { text: '$client = new SimpleJwtLoginClient(' },
                      { text: "    'https://your-wordpress-site.com'," },
                      { text: "    'your-auth-code'" },
                      { text: ');' },
                    ]} />
                  </div>
                </div>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>3</span>
                  <div>
                    <strong>Call the API</strong>
                    <p>Use the fluent interface to authenticate, register, or manage tokens.</p>
                    <CodeBlock title="PHP" lines={[
                      { text: '$response = $client' },
                      { text: "    ->withEmail('user@example.com')" },
                      { text: "    ->withPassword('secret')" },
                      { text: '    ->authenticate();' },
                      { text: '' },
                      { text: "$jwt = \$response['data']['jwt'];" },
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
                { method: 'authenticate()', desc: 'Exchange credentials for a JWT token' },
                { method: 'register()', desc: 'Create a new WordPress user account' },
                { method: 'deleteUser()', desc: 'Delete a user via a verified JWT' },
                { method: 'validateToken()', desc: 'Verify a token signature and expiry' },
                { method: 'refreshToken()', desc: 'Get a new token from an expiring one' },
                { method: 'revokeToken()', desc: 'Permanently invalidate a token' },
                { method: 'autologin()', desc: 'Generate a one-click auto-login URL' },
                { method: 'changePassword()', desc: 'Change the authenticated user\'s password' },
                { method: 'resetPassword()', desc: 'Trigger a password reset email' },
              ].map(({ method, desc }) => (
                <div key={method} className={styles.refRow}>
                  <code className={styles.refMethod}>{method}</code>
                  <span className={styles.refDesc}>{desc}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link to="https://packagist.org/packages/nicumicle/simple-jwt-login-client-php" className={sharedStyles.actionButton} title="View on Packagist">
                View on Packagist →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h2 className={styles.ctaTitle}>Add JWT to your PHP app today</h2>
              <p className={styles.ctaSubtitle}>
                One Composer install and a few lines of code - that's all it takes
                to add WordPress JWT authentication to any PHP project.
              </p>
              <div className={styles.ctaButtons}>
                <Link to="https://packagist.org/packages/nicumicle/simple-jwt-login-client-php" className={sharedStyles.actionButton} title="View on Packagist">
                  Get started →
                </Link>
                <Link to="https://github.com/nicumicle/simple-jwt-login-client-php" className={sharedStyles.btn} title="View source on GitHub">
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
