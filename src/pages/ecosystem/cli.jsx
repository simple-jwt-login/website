import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './cli.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faArrowsRotate, faHeart, faDesktop, faKey, faPlug } from '@fortawesome/free-solid-svg-icons';
import sharedStyles from '../styles.module.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Simple JWT Login CLI',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'WordPress WP-CLI Add-on',
  operatingSystem: 'WordPress 4.4+, PHP 5.5+',
  description:
    'WP-CLI add-on for Simple JWT Login. Generate tokens, validate JWTs, revoke sessions, and manage every plugin setting from the command line - perfect for CI/CD pipelines and staging migrations.',
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
    headline: translate({id: 'ecosystem.cli.commands.login.headline', message: 'Authenticate & get a token'}),
    description: translate({
      id: 'ecosystem.cli.commands.login.description',
      message:
        'Authenticate any WordPress user by username, email, or a combined login flag and receive a signed JWT immediately. Pipe it directly into curl, store it in a variable, or forward it to other tools.',
    }),
    lines: [
      { comment: true, text: '# Authenticate by username' },
      { text: 'wp jwt login --username=admin --password=secret' },
      { output: true, text: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      { text: '' },
      { comment: true, text: '# JSON output - parse with jq' },
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
    headline: translate({id: 'ecosystem.cli.commands.decode.headline', message: 'Inspect a JWT payload'}),
    description: translate({
      id: 'ecosystem.cli.commands.decode.description',
      message:
        'Decode any JWT and display its claims as a readable key/value table or JSON. Signature is not verified - use validate for that. Perfect for debugging token contents without a browser.',
    }),
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
    headline: translate({id: 'ecosystem.cli.commands.validate.headline', message: 'Verify signature & expiry'}),
    description: translate({
      id: 'ecosystem.cli.commands.validate.description',
      message:
        'Verify the token signature against the plugin decryption key and confirm it has not expired. Exits 0 in all cases - check the valid field in the output to drive conditional logic in scripts.',
    }),
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
    headline: translate({id: 'ecosystem.cli.commands.revoke.headline', message: 'Invalidate a token instantly'}),
    description: translate({
      id: 'ecosystem.cli.commands.revoke.description',
      message:
        'Revoke a token so it can never be used again. The signature is verified before revocation to prevent spoofed revocation attempts. Ideal for forced log-out flows and post-deployment security sweeps.',
    }),
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
    headline: translate({id: 'ecosystem.cli.commands.config.headline', message: 'Manage plugin settings'}),
    description: translate({
      id: 'ecosystem.cli.commands.config.description',
      message:
        'Get, set, list, export, and import every Simple JWT Login setting without touching the WordPress admin UI. Use dot notation for nested keys. Export/import enables reproducible config across environments.',
    }),
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
          <Link to="/docs/cli/" className={sharedStyles.btn} title={translate({id: 'ecosystem.cli.commands.fullDocsTitle', message: 'Full CLI documentation'})}>
            <Translate id="ecosystem.cli.commands.fullDocs">Full docs →</Translate>
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
    icon: faGear,
    title: translate({id: 'ecosystem.cli.useCases.ciCd.title', message: 'CI / CD pipelines'}),
    description: translate({
      id: 'ecosystem.cli.useCases.ciCd.description',
      message:
        'Generate a short-lived JWT inside your pipeline to seed test data, run authenticated smoke tests, or hit protected API endpoints - no browser, no cookies.',
    }),
    code: `TOKEN=$(wp jwt login --username=admin --password="$WP_ADMIN_PASSWORD")
curl -s -X POST https://my-site.com/wp-json/wp/v2/posts \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"title":"Smoke test post","status":"publish"}'`,
  },
  {
    icon: faArrowsRotate,
    title: translate({id: 'ecosystem.cli.useCases.migration.title', message: 'Staging → production migrations'}),
    description: translate({
      id: 'ecosystem.cli.useCases.migration.description',
      message:
        'Export the full plugin config from staging with one command, preview the diff on production in dry-run mode, then apply - fully non-interactive.',
    }),
    code: `# Export from staging
wp jwt config export --file=jwt-staging.json

# Preview changes (dry-run)
wp jwt config import jwt-staging.json --dry-run --url=https://example.com

# Apply without prompts
wp jwt config import jwt-staging.json --yes --url=https://example.com`,
  },
  {
    icon: faHeart,
    title: translate({id: 'ecosystem.cli.useCases.healthChecks.title', message: 'Automated health checks'}),
    description: translate({
      id: 'ecosystem.cli.useCases.healthChecks.description',
      message:
        'Add a cron job or monitoring script that logs in, validates the token, and alerts your team when JWT authentication breaks.',
    }),
    code: `TOKEN=$(wp jwt login --username=healthcheck --password="$HC_PASSWORD")
STATUS=$(wp jwt validate "$TOKEN" --format=json | jq -r '.valid')
[ "$STATUS" = "true" ] && echo "JWT OK" || { echo "JWT FAILED"; exit 1; }`,
  },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function CliPage() {
  return (
    <Layout
      title={translate({id: 'ecosystem.cli.meta.title', message: 'WP-CLI Add-on - Simple JWT Login'})}
      description={translate({id: 'ecosystem.cli.meta.description', message: 'Manage Simple JWT Login from the command line - generate tokens, validate JWTs, revoke sessions, and configure the plugin.'})}
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ── Hero ────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}><Translate id="ecosystem.cli.hero.badge">WP-CLI Add-on</Translate></div>
          <h1 className={styles.heroTitle}>
            <Translate id="ecosystem.cli.hero.titleLead">JWT auth at your</Translate><br />
            <span className={styles.heroAccent}><Translate id="ecosystem.cli.hero.titleAccent">fingertips</Translate></span>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="ecosystem.cli.hero.subtitle">{'Generate tokens, validate JWTs, revoke sessions, and manage every plugin setting directly from your terminal - no WordPress admin UI required.'}</Translate>
          </p>
          <div className={styles.heroCta}>
            <Link to="/docs/cli/" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.cli.hero.readDocsTitle', message: 'Read the CLI documentation'})}>
              <Translate id="ecosystem.cli.hero.readDocs">Read the docs →</Translate>
            </Link>
            <Link
              to="https://github.com/simple-jwt-login/simple-jwt-login-cli"
              className={sharedStyles.btn}
              title={translate({id: 'ecosystem.cli.hero.githubTitle', message: 'View on GitHub'})}
            >
              <Translate id="ecosystem.cli.hero.github">View on GitHub</Translate>
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
                { icon: faDesktop, text: translate({id: 'ecosystem.cli.highlights.worksAnywhere', message: 'Works anywhere WP-CLI runs'}) },
                { icon: faKey, text: translate({id: 'ecosystem.cli.highlights.commands', message: '8 commands, everything covered'}) },
                { icon: faPlug, text: translate({id: 'ecosystem.cli.highlights.requires', message: 'Requires Simple JWT Login plugin'}) },
                { icon: faHeart, text: translate({id: 'ecosystem.cli.highlights.free', message: 'Free & open source'}) },
              ].map(({ icon, text }, i) => (
                <div key={i} className={styles.highlightItem}>
                  <span className={styles.highlightIcon}><FontAwesomeIcon icon={icon} /></span>
                  <span className={styles.highlightText}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Commands ───────────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.cli.commandsSection.title">Every command you need</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="ecosystem.cli.commandsSection.lead">From token generation to full config management - the CLI covers the complete JWT lifecycle.</Translate>
            </p>
            <CommandTabs />
          </div>
        </section>

        {/* ── Use cases ──────────────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.cli.useCasesSection.title">Built for real workflows</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="ecosystem.cli.useCasesSection.lead">The CLI is designed for the scenarios where speed and automation matter most.</Translate>
            </p>
            <div className={styles.useCaseGrid}>
              {useCases.map(({ icon, title, description, code }, i) => (
                <div key={i} className={styles.useCaseCard}>
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

        {/* ── Requirements & install ─────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.cli.install.title">Get started in 60 seconds</Translate></h2>
            <div className={styles.installGrid}>

              {/* Requirements */}
              <div className={styles.requireBox}>
                <h3 className={styles.requireTitle}><Translate id="ecosystem.cli.install.requirements">Requirements</Translate></h3>
                <ul className={styles.requireList}>
                  {[
                    ['WordPress', '4.4+'],
                    ['PHP', '5.5+'],
                    ['Simple JWT Login', translate({id: 'ecosystem.cli.install.req.active', message: 'active'})],
                    ['WP-CLI', translate({id: 'ecosystem.cli.install.req.anyStable', message: 'any recent stable'})],
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
                    <strong><Translate id="ecosystem.cli.install.step1.title">Install from WordPress.org</Translate></strong>
                    <p>
                      <Translate
                        id="ecosystem.cli.install.step1.text"
                        values={{
                          menu: <em><Translate id="ecosystem.cli.install.step1.menu">Plugins → Add New</Translate></em>,
                          plugin: <code>Simple JWT Login CLI</code>,
                        }}
                      >
                        {'Go to {menu}, search for {plugin}, and click Install Now.'}
                      </Translate>
                    </p>
                  </div>
                </div>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>2</span>
                  <div>
                    <strong><Translate id="ecosystem.cli.install.step2.title">Activate the plugin</Translate></strong>
                    <p><Translate id="ecosystem.cli.install.step2.text">The add-on registers its commands automatically once activated. Simple JWT Login must be active on the same site.</Translate></p>
                  </div>
                </div>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>3</span>
                  <div>
                    <strong><Translate id="ecosystem.cli.install.step3.title">Verify the commands</Translate></strong>
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
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.cli.reference.title">Complete command reference</Translate></h2>
            <p className={styles.sectionLead}><Translate id="ecosystem.cli.reference.lead">All 8 commands at a glance.</Translate></p>
            <div className={styles.refTable}>
              {[
                { cmd: 'wp jwt login', desc: translate({id: 'ecosystem.cli.reference.login', message: 'Authenticate a user and return a JWT'}) },
                { cmd: 'wp jwt decode', desc: translate({id: 'ecosystem.cli.reference.decode', message: 'Decode a JWT payload (signature not verified)'}) },
                { cmd: 'wp jwt validate', desc: translate({id: 'ecosystem.cli.reference.validate', message: 'Verify signature and expiry of a token'}) },
                { cmd: 'wp jwt revoke', desc: translate({id: 'ecosystem.cli.reference.revoke', message: 'Permanently revoke a token'}) },
                { cmd: 'wp jwt config get', desc: translate({id: 'ecosystem.cli.reference.configGet', message: 'Read a single plugin setting'}) },
                { cmd: 'wp jwt config set', desc: translate({id: 'ecosystem.cli.reference.configSet', message: 'Update a plugin setting'}) },
                { cmd: 'wp jwt config list', desc: translate({id: 'ecosystem.cli.reference.configList', message: 'List all settings as key/value pairs'}) },
                { cmd: 'wp jwt config export', desc: translate({id: 'ecosystem.cli.reference.configExport', message: 'Export full config as JSON to stdout or file'}) },
                { cmd: 'wp jwt config import', desc: translate({id: 'ecosystem.cli.reference.configImport', message: 'Import config from a JSON file'}) },
              ].map(({ cmd, desc }) => (
                <div key={cmd} className={styles.refRow}>
                  <code className={styles.refCmd}>{cmd}</code>
                  <span className={styles.refDesc}>{desc}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <Link to="/docs/cli/" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.cli.reference.fullDocsTitle', message: 'Full CLI documentation'})}>
                <Translate id="ecosystem.cli.reference.fullDocs">Full documentation →</Translate>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h2 className={styles.ctaTitle}><Translate id="ecosystem.cli.cta.title">Ready to automate your JWT workflow?</Translate></h2>
              <p className={styles.ctaSubtitle}>
                <Translate id="ecosystem.cli.cta.subtitle">Install the add-on in minutes and bring the full power of Simple JWT Login to your terminal.</Translate>
              </p>
              <div className={styles.ctaButtons}>
                <Link to="/docs/cli/" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.cli.cta.readDocsTitle', message: 'Read the CLI documentation'})}>
                  <Translate id="ecosystem.cli.cta.getStarted">Get started →</Translate>
                </Link>
                <Link
                  to="https://github.com/simple-jwt-login/simple-jwt-login-cli"
                  className={sharedStyles.btn}
                  title={translate({id: 'ecosystem.cli.cta.githubTitle', message: 'View source on GitHub'})}
                >
                  <Translate id="ecosystem.cli.cta.github">View on GitHub</Translate>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
