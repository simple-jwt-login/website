import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './cli.module.css';
import sharedStyles from '../styles.module.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Simple JWT Login CLI',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'WordPress WP-CLI Add-on',
  operatingSystem: 'WordPress 4.4+, PHP 5.5+',
  description:
    'WP-CLI add-on for Simple JWT Login. Generate tokens, validate JWTs, revoke sessions, and manage every plugin setting from the command line — perfect for CI/CD pipelines and staging migrations.',
  url: 'https://github.com/simple-jwt-login/simple-jwt-login-cli',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'Nicu Micle', url: 'https://github.com/nicumicle' },
};

/* ── Terminal component ─────────────────────────────────────── */
function Terminal({ lines }) {
  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBar}>
        <span className={clsx(styles.dot, styles.dotRed)} />
        <span className={clsx(styles.dot, styles.dotYellow)} />
        <span className={clsx(styles.dot, styles.dotGreen)} />
        <span className={styles.terminalTitle}>bash</span>
      </div>
      <pre className={styles.terminalBody}>
        {lines.map((line, i) =>
          line.comment ? (
            <span key={i} className={styles.termComment}>{line.text}{'\n'}</span>
          ) : line.output ? (
            <span key={i} className={styles.termOutput}>{line.text}{'\n'}</span>
          ) : (
            <span key={i} className={styles.termCmd}>
              <span className={styles.termPrompt}>$ </span>{line.text}{'\n'}
            </span>
          )
        )}
      </pre>
    </div>
  );
}

/* ── Command tab component ──────────────────────────────────── */
const commands = [
  {
    id: 'login',
    label: 'jwt login',
    headline: 'Authenticate & get a token',
    description:
      'Authenticate any WordPress user by username, email, or a combined login flag and receive a signed JWT immediately. Pipe it directly into curl, store it in a variable, or forward it to other tools.',
    lines: [
      { comment: true, text: '# Authenticate by username' },
      { text: 'wp jwt login --username=admin --password=secret' },
      { output: true, text: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      { text: '' },
      { comment: true, text: '# JSON output — parse with jq' },
      { text: 'wp jwt login --username=admin --password=secret --format=json' },
      { output: true, text: '{"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}' },
      { text: '' },
      { comment: true, text: '# Capture and use immediately with curl' },
      { text: 'TOKEN=$(wp jwt login --username=admin --password=secret)' },
      { text: 'curl -H "Authorization: Bearer $TOKEN" https://example.com/wp-json/wp/v2/posts' },
    ],
  },
  {
    id: 'decode',
    label: 'jwt decode',
    headline: 'Inspect a JWT payload',
    description:
      'Decode any JWT and display its claims as a readable key/value table or JSON. Signature is not verified — use validate for that. Perfect for debugging token contents without a browser.',
    lines: [
      { comment: true, text: '# Decode a token' },
      { text: 'wp jwt decode eyJhbGciOiJIUzI1NiJ9...' },
      { output: true, text: 'id     1' },
      { output: true, text: 'exp    1999999' },
      { output: true, text: 'iat    1711234567' },
      { text: '' },
      { comment: true, text: '# Extract a single claim with jq' },
      { text: 'TOKEN=$(wp jwt login --username=admin --password=secret)' },
      { text: 'wp jwt decode "$TOKEN" --format=json | jq \'.exp\'' },
      { output: true, text: '1999999' },
    ],
  },
  {
    id: 'validate',
    label: 'jwt validate',
    headline: 'Verify signature & expiry',
    description:
      'Verify the token signature against the plugin decryption key and confirm it has not expired. Exits 0 in all cases — check the valid field in the output to drive conditional logic in scripts.',
    lines: [
      { comment: true, text: '# Validate a token' },
      { text: 'wp jwt validate "$TOKEN" --format=json' },
      { output: true, text: '{"valid":true,"message":"Token is valid."}' },
      { text: '' },
      { comment: true, text: '# Use in a shell script' },
      { text: 'RESULT=$(wp jwt validate "$TOKEN" --format=json)' },
      { text: 'if [ "$(echo "$RESULT" | jq -r \'.valid\')" = "true" ]; then' },
      { text: '  echo "Token OK"' },
      { text: 'else' },
      { text: '  echo "Invalid: $(echo "$RESULT" | jq -r \'.message\')"' },
      { text: 'fi' },
    ],
  },
  {
    id: 'revoke',
    label: 'jwt revoke',
    headline: 'Invalidate a token instantly',
    description:
      'Revoke a token so it can never be used again. The signature is verified before revocation to prevent spoofed revocation attempts. Ideal for forced log-out flows and post-deployment security sweeps.',
    lines: [
      { comment: true, text: '# Revoke a specific token' },
      { text: 'wp jwt revoke "$TOKEN" --format=json' },
      { output: true, text: '{"success":true,"message":"Token has been revoked."}' },
      { text: '' },
      { comment: true, text: '# Log in and immediately revoke (e.g. one-time tokens)' },
      { text: 'TOKEN=$(wp jwt login --username=admin --password=secret)' },
      { text: 'wp jwt revoke "$TOKEN"' },
    ],
  },
  {
    id: 'config',
    label: 'jwt config',
    headline: 'Manage plugin settings',
    description:
      'Get, set, list, export, and import every Simple JWT Login setting without touching the WordPress admin UI. Use dot notation for nested keys. Export/import enables reproducible config across environments.',
    lines: [
      { comment: true, text: '# Read a setting' },
      { text: 'wp jwt config get jwt_algorithm' },
      { output: true, text: 'HS256' },
      { text: '' },
      { comment: true, text: '# Update a setting' },
      { text: 'wp jwt config set jwt_auth_ttl 7200 --type=int' },
      { text: '' },
      { comment: true, text: '# Export config (e.g. staging → production migration)' },
      { text: 'wp jwt config export --file=jwt-config.json' },
      { text: 'wp jwt config import jwt-config.json --yes --url=https://prod.example.com' },
    ],
  },
];

function CommandTabs() {
  const [active, setActive] = useState(0);
  const cmd = commands[active];
  return (
    <div className={styles.commandBox}>
      <div className={styles.commandTabs}>
        {commands.map((c, i) => (
          <button
            key={c.id}
            className={clsx(styles.commandTab, i === active && styles.commandTabActive)}
            onClick={() => setActive(i)}
          >
            <code>{c.label}</code>
          </button>
        ))}
      </div>
      <div className={styles.commandContent}>
        <div className={styles.commandInfo}>
          <h3 className={styles.commandHeadline}>{cmd.headline}</h3>
          <p className={styles.commandDesc}>{cmd.description}</p>
          <Link to="/docs/cli/" className={sharedStyles.btn} title="Full CLI documentation">
            Full docs →
          </Link>
        </div>
        <div className={styles.commandTerminal}>
          <Terminal lines={cmd.lines} />
        </div>
      </div>
    </div>
  );
}

/* ── Use-case cards ─────────────────────────────────────────── */
const useCases = [
  {
    icon: '⚙️',
    title: 'CI / CD pipelines',
    description:
      'Generate a short-lived JWT inside your pipeline to seed test data, run authenticated smoke tests, or hit protected API endpoints — no browser, no cookies.',
    code: `TOKEN=$(wp jwt login --username=admin --password="$WP_ADMIN_PASSWORD")
curl -s -X POST https://my-site.com/wp-json/wp/v2/posts \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"title":"Smoke test post","status":"publish"}'`,
  },
  {
    icon: '🔄',
    title: 'Staging → production migrations',
    description:
      'Export the full plugin config from staging with one command, preview the diff on production in dry-run mode, then apply — fully non-interactive.',
    code: `# Export from staging
wp jwt config export --file=jwt-staging.json

# Preview changes (dry-run)
wp jwt config import jwt-staging.json --dry-run --url=https://example.com

# Apply without prompts
wp jwt config import jwt-staging.json --yes --url=https://example.com`,
  },
  {
    icon: '❤️',
    title: 'Automated health checks',
    description:
      'Add a cron job or monitoring script that logs in, validates the token, and alerts your team when JWT authentication breaks.',
    code: `TOKEN=$(wp jwt login --username=healthcheck --password="$HC_PASSWORD")
STATUS=$(wp jwt validate "$TOKEN" --format=json | jq -r '.valid')
[ "$STATUS" = "true" ] && echo "JWT OK" || { echo "JWT FAILED"; exit 1; }`,
  },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function CliPage() {
  return (
    <Layout
      title="WP-CLI Add-on — Simple JWT Login"
      description="Manage Simple JWT Login from the command line. Generate tokens, validate JWTs, revoke sessions, and configure the plugin without touching the WordPress admin UI."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ── Hero ────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}>WP-CLI Add-on</div>
          <h1 className={styles.heroTitle}>
            JWT auth at your<br />
            <span className={styles.heroAccent}>fingertips</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Generate tokens, validate JWTs, revoke sessions, and manage every plugin
            setting directly from your terminal — no WordPress admin UI required.
          </p>
          <div className={styles.heroCta}>
            <Link to="/docs/cli/" className={sharedStyles.actionButton} title="Read the CLI documentation">
              Read the docs →
            </Link>
            <Link
              to="https://github.com/simple-jwt-login/simple-jwt-login-cli"
              className={sharedStyles.btn}
              title="View on GitHub"
            >
              View on GitHub
            </Link>
          </div>

          {/* Hero terminal preview */}
          <div className={styles.heroTerminalWrap}>
            <Terminal
              lines={[
                { comment: true, text: '# Authenticate a user and get a JWT' },
                { text: 'wp jwt login --username=admin --password=secret' },
                { output: true, text: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxOTk5OTk5fQ.sig' },
                { text: '' },
                { comment: true, text: '# Validate the token' },
                { text: 'wp jwt validate "$TOKEN" --format=json' },
                { output: true, text: '{"valid":true,"message":"Token is valid."}' },
                { text: '' },
                { comment: true, text: '# Migrate config to production' },
                { text: 'wp jwt config export --file=jwt-config.json' },
                { text: 'wp jwt config import jwt-config.json --yes --url=https://prod.example.com' },
                { output: true, text: 'Success: Configuration imported.' },
              ]}
            />
          </div>
        </div>
      </header>

      <main>

        {/* ── Highlights strip ───────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, styles.highlights)}>
          <div className="container">
            <div className={styles.highlightGrid}>
              {[
                { icon: '🖥️', text: 'Works anywhere WP-CLI runs' },
                { icon: '🔑', text: '8 commands, everything covered' },
                { icon: '🔌', text: 'Requires Simple JWT Login plugin' },
                { icon: '🆓', text: 'Free & open source' },
              ].map(({ icon, text }) => (
                <div key={text} className={styles.highlightItem}>
                  <span className={styles.highlightIcon}>{icon}</span>
                  <span className={styles.highlightText}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Commands ───────────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <h2 className={sharedStyles.sectionTitle}>Every command you need</h2>
            <p className={styles.sectionLead}>
              From token generation to full config management — the CLI covers the complete JWT lifecycle.
            </p>
            <CommandTabs />
          </div>
        </section>

        {/* ── Use cases ──────────────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <h2 className={sharedStyles.sectionTitle}>Built for real workflows</h2>
            <p className={styles.sectionLead}>
              The CLI is designed for the scenarios where speed and scriptability matter most.
            </p>
            <div className={styles.useCaseGrid}>
              {useCases.map(({ icon, title, description, code }) => (
                <div key={title} className={styles.useCaseCard}>
                  <div className={styles.useCaseHeader}>
                    <span className={styles.useCaseIcon}>{icon}</span>
                    <h3 className={styles.useCaseTitle}>{title}</h3>
                  </div>
                  <p className={styles.useCaseDesc}>{description}</p>
                  <pre className={styles.useCaseCode}><code>{code}</code></pre>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Requirements & install ─────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <h2 className={sharedStyles.sectionTitle}>Get started in 60 seconds</h2>
            <div className={styles.installGrid}>

              {/* Requirements */}
              <div className={styles.requireBox}>
                <h3 className={styles.requireTitle}>Requirements</h3>
                <ul className={styles.requireList}>
                  {[
                    ['WordPress', '4.4+'],
                    ['PHP', '5.5+'],
                    ['Simple JWT Login', 'active'],
                    ['WP-CLI', 'any recent stable'],
                  ].map(([dep, ver]) => (
                    <li key={dep} className={styles.requireItem}>
                      <span className={styles.requireDep}>{dep}</span>
                      <span className={styles.requireVer}>{ver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Install steps */}
              <div className={styles.installSteps}>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>1</span>
                  <div>
                    <strong>Install from WordPress.org</strong>
                    <p>Go to <em>Plugins → Add New</em>, search for <code>Simple JWT Login CLI</code>, and click Install Now.</p>
                  </div>
                </div>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>2</span>
                  <div>
                    <strong>Activate the plugin</strong>
                    <p>The add-on registers its commands automatically once activated. Simple JWT Login must be active on the same site.</p>
                  </div>
                </div>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>3</span>
                  <div>
                    <strong>Verify the commands</strong>
                    <Terminal lines={[
                      { text: 'wp jwt --help' },
                      { output: true, text: 'usage: wp jwt <command> [<args>]' },
                    ]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Command reference ─────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <h2 className={sharedStyles.sectionTitle}>Complete command reference</h2>
            <p className={styles.sectionLead}>All 8 commands at a glance.</p>
            <div className={styles.refTable}>
              {[
                { cmd: 'wp jwt login', desc: 'Authenticate a user and return a JWT token' },
                { cmd: 'wp jwt decode', desc: 'Decode a JWT payload (signature not verified)' },
                { cmd: 'wp jwt validate', desc: 'Verify signature and expiry of a token' },
                { cmd: 'wp jwt revoke', desc: 'Permanently revoke a token' },
                { cmd: 'wp jwt config get', desc: 'Read a single plugin setting' },
                { cmd: 'wp jwt config set', desc: 'Update a plugin setting' },
                { cmd: 'wp jwt config list', desc: 'List all settings as key/value pairs' },
                { cmd: 'wp jwt config export', desc: 'Export full config as JSON to stdout or file' },
                { cmd: 'wp jwt config import', desc: 'Import config from a JSON file' },
              ].map(({ cmd, desc }) => (
                <div key={cmd} className={styles.refRow}>
                  <code className={styles.refCmd}>{cmd}</code>
                  <span className={styles.refDesc}>{desc}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link to="/docs/cli/" className={sharedStyles.actionButton} title="Full CLI documentation">
                Full documentation →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h2 className={styles.ctaTitle}>Ready to automate your JWT workflow?</h2>
              <p className={styles.ctaSubtitle}>
                Install the add-on in minutes and bring the full power of Simple JWT Login to your terminal.
              </p>
              <div className={styles.ctaButtons}>
                <Link to="/docs/cli/" className={sharedStyles.actionButton} title="Read the CLI documentation">
                  Get started →
                </Link>
                <Link
                  to="https://github.com/simple-jwt-login/simple-jwt-login-cli"
                  className={sharedStyles.btn}
                  title="View source on GitHub"
                >
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
