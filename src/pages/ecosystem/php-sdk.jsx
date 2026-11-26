import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './php-sdk.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faLock, faFlask, faBoxArchive, faPlug, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPhp } from '@fortawesome/free-brands-svg-icons';
import sharedStyles from '../styles.module.css';
import {useCdnBase, resolveCdnUrl} from '@site/src/utils/cdn';

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
    label: translate({id: 'ecosystem.phpSdk.examples.auth.label', message: "Authenticate"}),
    headline: translate({id: 'ecosystem.phpSdk.examples.auth.headline', message: "Exchange credentials for a JWT"}),
    description:
      translate({id: 'ecosystem.phpSdk.examples.auth.description', message: "Authenticate any WordPress user by email or username and receive a signed JWT. Pass the token in the Authorization header for all subsequent requests to protected endpoints."}),
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
    label: translate({id: 'ecosystem.phpSdk.examples.register.label', message: "Register User"}),
    headline: translate({id: 'ecosystem.phpSdk.examples.register.headline', message: "Create WordPress accounts via API"}),
    description:
      translate({id: 'ecosystem.phpSdk.examples.register.description', message: "Register new WordPress users programmatically. Optionally assign a role at creation time and receive a JWT immediately after registration - no admin UI required."}),
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
    label: translate({id: 'ecosystem.phpSdk.examples.validate.label', message: "Validate Token"}),
    headline: translate({id: 'ecosystem.phpSdk.examples.validate.headline', message: "Verify a JWT is still valid"}),
    description:
      translate({id: 'ecosystem.phpSdk.examples.validate.description', message: "Check that a token has not expired and its signature matches the plugin decryption key. Use this on every request to protected resources in your application."}),
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
    label: translate({id: 'ecosystem.phpSdk.examples.refresh.label', message: "Refresh Token"}),
    headline: translate({id: 'ecosystem.phpSdk.examples.refresh.headline', message: "Keep sessions alive without re-login"}),
    description:
      translate({id: 'ecosystem.phpSdk.examples.refresh.description', message: "Exchange an expiring token for a fresh one without requiring the user to enter credentials again. Perfect for long-running sessions in SPAs and mobile apps."}),
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
    label: translate({id: 'ecosystem.phpSdk.examples.revoke.label', message: "Revoke Token"}),
    headline: translate({id: 'ecosystem.phpSdk.examples.revoke.headline', message: "Force-expire a token immediately"}),
    description:
      translate({id: 'ecosystem.phpSdk.examples.revoke.description', message: "Revoke a token so it can never be used again - useful for implementing sign-out, account suspension, or post-deployment security sweeps."}),
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
          <Link to="https://packagist.org/packages/nicumicle/simple-jwt-login-client-php" className={sharedStyles.btn} title={translate({id: 'ecosystem.phpSdk.examples.packagistTitle', message: 'View on Packagist'})}>
            <Translate id="ecosystem.phpSdk.examples.packagist">Packagist →</Translate>
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
    title: translate({id: 'ecosystem.phpSdk.useCases.headless.title', message: "Headless WordPress"}),
    description:
      translate({id: 'ecosystem.phpSdk.useCases.headless.description', message: "Build a decoupled frontend in Laravel, Symfony, or plain PHP while WordPress handles content. Authenticate users from your PHP app and pass JWTs to the WP REST API."}),
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
    title: translate({id: 'ecosystem.phpSdk.useCases.registration.title', message: "User registration flow"}),
    description:
      translate({id: 'ecosystem.phpSdk.useCases.registration.description', message: "Register users from your own sign-up form and immediately issue a JWT - all in one round trip, without touching the WordPress admin."}),
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
    title: translate({id: 'ecosystem.phpSdk.useCases.testing.title', message: "Automated testing"}),
    description:
      translate({id: 'ecosystem.phpSdk.useCases.testing.description', message: "Generate tokens in PHPUnit or Pest fixtures to test authenticated flows against a real WordPress instance - no browser, no cookies, no mocking."}),
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
  { src: '/assets/images/frameworks/php.png', alt: 'PHP', label: translate({id: 'ecosystem.phpSdk.frameworks.plainPhp', message: "Plain PHP"}) },
  { src: '/assets/images/frameworks/laravel.png', alt: 'Laravel', label: 'Laravel' },
  { src: '/assets/images/frameworks/yii.png', alt: 'Yii', label: 'Yii' },
  { src: '/assets/images/frameworks/codeigniter.png', alt: 'CodeIgniter', label: 'CodeIgniter' },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function PhpSdkPage() {
  const cdnBase = useCdnBase();
  return (
    <Layout
      title={translate({id: 'ecosystem.phpSdk.meta.title', message: 'PHP Client SDK - Simple JWT Login'})}
      description={translate({id: 'ecosystem.phpSdk.meta.description', message: 'Official PHP client for Simple JWT Login. Authenticate, register, validate and revoke tokens from any PHP app - one Composer package.'})}
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}><Translate id="ecosystem.phpSdk.hero.badge">PHP Client SDK</Translate></div>
          <h1 className={styles.heroTitle}>
            Simple JWT Login<br />
            <span className={styles.heroAccent}><Translate id="ecosystem.phpSdk.hero.titleAccent">for PHP</Translate></span>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="ecosystem.phpSdk.hero.subtitle">One Composer package to authenticate users, manage tokens, and call the WordPress REST API from any PHP application - no boilerplate required.</Translate>
          </p>
          <div className={styles.heroCta}>
            <Link to="https://packagist.org/packages/nicumicle/simple-jwt-login-client-php" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.phpSdk.hero.packagistTitle', message: 'View on Packagist'})}>
              <Translate id="ecosystem.phpSdk.hero.packagist">View on Packagist →</Translate>
            </Link>
            <Link to="https://github.com/nicumicle/simple-jwt-login-client-php" className={sharedStyles.btn} title={translate({id: 'ecosystem.phpSdk.hero.githubTitle', message: 'View on GitHub'})}>
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
                { icon: faBoxArchive, text: translate({id: 'ecosystem.phpSdk.highlights.composer', message: "One Composer package"}) },
                { icon: faPhp, text: translate({id: 'ecosystem.phpSdk.highlights.php', message: "PHP 5.5+ compatible"}) },
                { icon: faPlug, text: translate({id: 'ecosystem.phpSdk.highlights.framework', message: "Works with any framework"}) },
                { icon: faHeart, text: translate({id: 'ecosystem.phpSdk.highlights.free', message: "Free & open source"}) },
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
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.phpSdk.compat.eyebrow">Compatibility</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.phpSdk.compat.title">Works with any PHP framework</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="ecosystem.phpSdk.compat.lead">The client is a plain PHP library with zero framework dependencies - drop it into Laravel, Yii, CodeIgniter, Symfony, or a standalone script.</Translate>
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
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.phpSdk.api.eyebrow">API Reference</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.phpSdk.api.title">Everything in the token lifecycle</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="ecosystem.phpSdk.api.lead">Fluent, chainable API covering authentication, registration, and the full token lifecycle.</Translate>
            </p>
            <ExampleTabs />
          </div>
        </section>

        {/* ── Use cases ─────────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.phpSdk.useCases.eyebrow">Use Cases</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.phpSdk.useCases.title">Built for real PHP workflows</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="ecosystem.phpSdk.useCases.lead">From headless WordPress to automated testing - the client handles the auth layer so you can focus on your app.</Translate>
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
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.phpSdk.install.eyebrow">Getting Started</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.phpSdk.install.title">Up and running in minutes</Translate></h2>
            <div className={styles.installGrid}>

              <div className={styles.requireBox}>
                <h3 className={styles.requireTitle}><Translate id="ecosystem.phpSdk.install.requirements">Requirements</Translate></h3>
                <ul className={styles.requireList}>
                  {[
                    ['PHP', '5.5+'],
                    ['Composer', translate({id: 'ecosystem.phpSdk.install.reqAny', message: "any"})],
                    ['Simple JWT Login', translate({id: 'ecosystem.phpSdk.install.reqActive', message: "active"})],
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
                    <strong><Translate id="ecosystem.phpSdk.install.step1.title">Install via Composer</Translate></strong>
                    <p><Translate id="ecosystem.phpSdk.install.step1.desc">Add the package to your project with a single command.</Translate></p>
                    <CodeBlock title="bash" lines={[
                      { text: 'composer require "nicumicle/simple-jwt-login-client-php"' },
                    ]} />
                  </div>
                </div>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>2</span>
                  <div>
                    <strong><Translate id="ecosystem.phpSdk.install.step2.title">Instantiate the client</Translate></strong>
                    <p><Translate id="ecosystem.phpSdk.install.step2.desc">Pass your WordPress site URL and Simple JWT Login Auth Code.</Translate></p>
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
                    <strong><Translate id="ecosystem.phpSdk.install.step3.title">Call the API</Translate></strong>
                    <p><Translate id="ecosystem.phpSdk.install.step3.desc">Use the fluent interface to authenticate, register, or manage tokens.</Translate></p>
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
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.phpSdk.methods.eyebrow">Methods</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.phpSdk.methods.title">Complete method reference</Translate></h2>
            <p className={styles.sectionLead}><Translate id="ecosystem.phpSdk.methods.lead">All available client methods at a glance.</Translate></p>
            <div className={styles.refTable}>
              {[
                { method: 'authenticate()', desc: translate({id: 'ecosystem.phpSdk.methods.authenticate', message: "Exchange credentials for a JWT"}) },
                { method: 'register()', desc: translate({id: 'ecosystem.phpSdk.methods.register', message: "Create a new WordPress user account"}) },
                { method: 'deleteUser()', desc: translate({id: 'ecosystem.phpSdk.methods.deleteUser', message: "Delete a user via a verified JWT"}) },
                { method: 'validateToken()', desc: translate({id: 'ecosystem.phpSdk.methods.validateToken', message: "Verify a token signature and expiry"}) },
                { method: 'refreshToken()', desc: translate({id: 'ecosystem.phpSdk.methods.refreshToken', message: "Get a new token from an expiring one"}) },
                { method: 'revokeToken()', desc: translate({id: 'ecosystem.phpSdk.methods.revokeToken', message: "Permanently invalidate a token"}) },
                { method: 'autologin()', desc: translate({id: 'ecosystem.phpSdk.methods.autologin', message: "Generate a one-click auto-login URL"}) },
                { method: 'changePassword()', desc: translate({id: 'ecosystem.phpSdk.methods.changePassword', message: "Change the authenticated user's password"}) },
                { method: 'resetPassword()', desc: translate({id: 'ecosystem.phpSdk.methods.resetPassword', message: "Trigger a password reset email"}) },
              ].map(({ method, desc }) => (
                <div key={method} className={styles.refRow}>
                  <code className={styles.refMethod}>{method}</code>
                  <span className={styles.refDesc}>{desc}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link to="https://packagist.org/packages/nicumicle/simple-jwt-login-client-php" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.phpSdk.methods.packagistTitle', message: 'View on Packagist'})}>
                <Translate id="ecosystem.phpSdk.methods.packagist">View on Packagist →</Translate>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h2 className={styles.ctaTitle}><Translate id="ecosystem.phpSdk.cta.title">Add JWT to your PHP app today</Translate></h2>
              <p className={styles.ctaSubtitle}>
                <Translate id="ecosystem.phpSdk.cta.subtitle">{'One Composer install and a few lines of code - that\'s all it takes to add WordPress JWT authentication to any PHP project.'}</Translate>
              </p>
              <div className={styles.ctaButtons}>
                <Link to="https://packagist.org/packages/nicumicle/simple-jwt-login-client-php" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.phpSdk.cta.packagistTitle', message: 'View on Packagist'})}>
                  <Translate id="ecosystem.phpSdk.cta.getStarted">Get started →</Translate>
                </Link>
                <Link to="https://github.com/nicumicle/simple-jwt-login-client-php" className={sharedStyles.btn} title={translate({id: 'ecosystem.phpSdk.cta.githubTitle', message: 'View source on GitHub'})}>
                  <Translate id="ecosystem.phpSdk.cta.github">View on GitHub</Translate>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
