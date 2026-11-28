import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './cli.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear, faHeart, faDesktop, faKey, faPlug, faCodeBranch,
  faShieldHalved, faTriangleExclamation, faLaptopCode, faHandshake,
} from '@fortawesome/free-solid-svg-icons';
import sharedStyles from '../styles.module.css';

const CLI_SOURCE_URL = 'https://github.com/nicumicle/simple-jwt-login/blob/master/CLI.md';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Simple JWT Login WP-CLI commands',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'WordPress WP-CLI commands',
  operatingSystem: 'WordPress',
  description:
    'Built-in WP-CLI commands for Simple JWT Login 4.3.0+. Issue, validate and revoke JWTs, rotate signing keys, manage API keys, auth codes and settings, and read audit logs from WP-CLI.',
  url: 'https://github.com/nicumicle/simple-jwt-login',
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
    id: 'setup',
    label: 'jwt setup',
    headline: translate({id: 'ecosystem.cli.commands.setup.headline', message: 'Initial setup'}),
    description: translate({
      id: 'ecosystem.cli.commands.setup.description',
      message:
        'Generates a signing key when the configured algorithm has none, enables the /auth endpoint, and prints the endpoint URL with a sample curl request. An existing key is kept unless --force or a different --algorithm is passed.',
    }),
    lines: [
      { text: 'wp jwt setup' },
      { output: true, text: 'Generated a new HS256 signing key.' },
      { output: true, text: "curl -X POST 'https://example.com/?rest_route=/simple-jwt-login/v1/auth' -d 'username=<user>' -d 'password=<password>'" },
      { output: true, text: 'Or, from here: wp jwt login --login=<user>' },
      { output: true, text: 'Success: The /auth endpoint is enabled.' },
      { text: '' },
      { comment: true, text: '# Switch to RS256 with a new RSA key pair' },
      { text: 'wp jwt setup --algorithm=RS256' },
    ],
  },
  {
    id: 'generate',
    label: 'jwt generate',
    headline: translate({id: 'ecosystem.cli.commands.generate.headline', message: 'Issue a JWT without a password'}),
    description: translate({
      id: 'ecosystem.cli.commands.generate.description',
      message:
        'Issues a JWT for a user ID, login or email with the same claims and signing key as /auth. --ttl sets the expiration in minutes. Use wp jwt login instead when the password must be checked.',
    }),
    lines: [
      { text: 'TOKEN=$(wp jwt generate ci-bot --ttl=10)' },
      { text: 'curl -H "Authorization: Bearer $TOKEN" https://example.com/wp-json/wp/v2/users/me' },
      { text: '' },
      { comment: true, text: '# JWT and refresh token as JSON' },
      { text: 'wp jwt generate 42 --format=json' },
      { output: true, text: '{"jwt":"eyJ0eXAiOiJKV1Qi...","refresh_token":"3f2a..."}' },
    ],
  },
  {
    id: 'validate',
    label: 'jwt validate',
    headline: translate({id: 'ecosystem.cli.commands.validate.headline', message: 'Validate a token'}),
    description: translate({
      id: 'ecosystem.cli.commands.validate.description',
      message:
        'Runs the same checks as the plugin endpoints: JWT rules, signature, expiry, audience, user, and revocation. Exits with code 1 when the token is not valid. wp jwt decode prints the claims without verifying the signature.',
    }),
    lines: [
      { text: 'wp jwt validate "$TOKEN"' },
      { output: true, text: 'valid                yes' },
      { output: true, text: 'message              Token is valid.' },
      { text: '' },
      { text: 'wp jwt validate "$TOKEN" > /dev/null || exit 1' },
      { text: '' },
      { text: 'wp jwt decode "$TOKEN" --format=json | jq \'.exp\'' },
      { output: true, text: '1999999' },
    ],
  },
  {
    id: 'revoke',
    label: 'jwt revoke-all',
    headline: translate({id: 'ecosystem.cli.commands.revoke.headline', message: 'Revoke tokens'}),
    description: translate({
      id: 'ecosystem.cli.commands.revoke.description',
      message:
        'wp jwt revoke blocks one JWT and deletes the user\'s refresh tokens. wp jwt revoke-all blocks every JWT and refresh token issued to a user so far, whether or not "Revoke tokens on password change" is enabled.',
    }),
    lines: [
      { text: 'wp jwt revoke "$TOKEN"' },
      { output: true, text: 'success              yes' },
      { output: true, text: 'message              Token has been revoked.' },
      { text: '' },
      { comment: true, text: '# Lost device or leaked token' },
      { text: 'wp jwt revoke-all jane@example.com --yes' },
    ],
  },
  {
    id: 'key',
    label: 'jwt key rotate',
    headline: translate({id: 'ecosystem.cli.commands.key.headline', message: 'Rotate the signing key'}),
    description: translate({
      id: 'ecosystem.cli.commands.key.description',
      message:
        'Saves a new signing key. The old key is moved to a JWT rule for tokens with an earlier iat, so issued tokens stay valid until they expire; the daily cleanup removes the rule. --immediate rejects every token signed with the old key.',
    }),
    lines: [
      { comment: true, text: '# Scheduled rotation, issued tokens stay valid' },
      { text: 'wp jwt key rotate --yes' },
      { text: '' },
      { comment: true, text: '# Leaked key: reject every issued token now' },
      { text: 'wp jwt key rotate --immediate --yes' },
      { text: '' },
      { comment: true, text: '# Print a key without saving it' },
      { text: 'wp jwt key generate --algorithm=HS512' },
    ],
  },
  {
    id: 'config',
    label: 'jwt config',
    headline: translate({id: 'ecosystem.cli.commands.config.headline', message: 'Read and change settings'}),
    description: translate({
      id: 'ecosystem.cli.commands.config.description',
      message:
        'get, set, list, export and import, with dot-notation keys. set and import validate the new settings like an admin save. import prints a diff with secrets masked, and --dry-run saves nothing.',
    }),
    lines: [
      { text: 'wp jwt config get general.jwt_algorithm' },
      { output: true, text: 'HS256' },
      { text: 'wp jwt config set authorization.ttl 120 --type=int' },
      { text: '' },
      { text: 'wp jwt config export --file=jwt-config.json' },
      { text: 'wp jwt config import jwt-config.json --dry-run' },
      { text: 'wp jwt config import jwt-config.json --yes' },
    ],
  },
  {
    id: 'diagnostics',
    label: 'jwt doctor',
    headline: translate({id: 'ecosystem.cli.commands.diagnostics.headline', message: 'Diagnostics'}),
    description: translate({
      id: 'ecosystem.cli.commands.diagnostics.description',
      message:
        'doctor reports versions, REST URLs, endpoint status, and configuration warnings. security-report scores the configuration from 0 to 100. explain-error maps an API errorCode to its meaning and the settings to check.',
    }),
    lines: [
      { text: 'wp jwt doctor' },
      { text: 'wp jwt security-report --min-severity=warning' },
      { output: true, text: 'Score: 80/100 (grade B)' },
      { text: 'wp jwt explain-error 48' },
      { output: true, text: 'constant             ERR_AUTHENTICATION_WRONG_CREDENTIALS' },
      { output: true, text: 'http_status          401' },
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
    icon: faLaptopCode,
    title: translate({id: 'ecosystem.cli.useCases.localEnv.title', message: 'Local and preview environments'}),
    description: translate({
      id: 'ecosystem.cli.useCases.localEnv.description',
      message:
        'Provisioning scripts and Docker entrypoints can produce a site that issues JWTs, with the project settings applied, without anyone opening the admin.',
    }),
    code: `wp plugin install simple-jwt-login --activate
wp jwt setup
wp jwt config import config/jwt.json --merge --yes`,
  },
  {
    icon: faGear,
    title: translate({id: 'ecosystem.cli.useCases.ciCd.title', message: 'CI tests without a stored password'}),
    description: translate({
      id: 'ecosystem.cli.useCases.ciCd.description',
      message:
        'The pipeline issues a 10-minute token for a test user and revokes it after the run. No WordPress password is kept in CI secrets.',
    }),
    code: `TOKEN=$(wp jwt generate ci-bot --ttl=10)
curl -fsS -H "Authorization: Bearer $TOKEN" \\
  https://staging.example.com/wp-json/wp/v2/users/me
wp jwt revoke "$TOKEN"`,
  },
  {
    icon: faCodeBranch,
    title: translate({id: 'ecosystem.cli.useCases.configAsCode.title', message: 'Configuration as code'}),
    description: translate({
      id: 'ecosystem.cli.useCases.configAsCode.description',
      message:
        'Settings live in the repository and go through code review. The deploy step previews the diff, then applies it. Keep secrets out of the committed file.',
    }),
    code: `wp jwt config export --file=config/jwt.json

# deploy step
wp jwt config import config/jwt.json --merge --dry-run
wp jwt config import config/jwt.json --merge --yes`,
  },
  {
    icon: faShieldHalved,
    title: translate({id: 'ecosystem.cli.useCases.securityGate.title', message: 'Security checks in CI'}),
    description: translate({
      id: 'ecosystem.cli.useCases.securityGate.description',
      message:
        'Fail the build when the configuration has critical findings, such as a short signing key or an endpoint without an auth code.',
    }),
    code: `wp jwt security-report --min-severity=critical \\
  --format=json | jq -e '.findings | length == 0'`,
  },
  {
    icon: faTriangleExclamation,
    title: translate({id: 'ecosystem.cli.useCases.incident.title', message: 'Incident response'}),
    description: translate({
      id: 'ecosystem.cli.useCases.incident.description',
      message:
        'Revoke a user\'s sessions, invalidate a leaked signing key, and export failed requests from the audit log for the post-mortem.',
    }),
    code: `wp jwt revoke-all jane@example.com --yes
wp jwt key rotate --immediate --yes
wp jwt log analyze --hours=24
wp jwt log list --status=failure --format=csv > incident.csv`,
  },
  {
    icon: faHandshake,
    title: translate({id: 'ecosystem.cli.useCases.partners.title', message: 'Partner API keys'}),
    description: translate({
      id: 'ecosystem.cli.useCases.partners.description',
      message:
        'Create a read-only key with an expiration date for an integration, track its last use, and revoke it when the contract ends.',
    }),
    code: `wp jwt api-key create integrations --name="Partner ACME" \\
  --permissions=read --expires-at="2027-06-30 23:59:59"
wp jwt api-key list --fields=id,name,last_used_at
wp jwt api-key revoke 7`,
  },
];

const reference = [
  { cmd: 'wp jwt setup', desc: translate({id: 'ecosystem.cli.reference.setup', message: 'Generate a signing key if there is none and enable /auth'}) },
  { cmd: 'wp jwt login', desc: translate({id: 'ecosystem.cli.reference.login', message: 'Authenticate a user with a password and print a JWT'}) },
  { cmd: 'wp jwt generate', desc: translate({id: 'ecosystem.cli.reference.generate', message: 'Issue a JWT for a user without a password'}) },
  { cmd: 'wp jwt refresh', desc: translate({id: 'ecosystem.cli.reference.refresh', message: 'Exchange a refresh token for a new JWT'}) },
  { cmd: 'wp jwt decode', desc: translate({id: 'ecosystem.cli.reference.decode', message: 'Print the claims of a JWT (signature not verified)'}) },
  { cmd: 'wp jwt validate', desc: translate({id: 'ecosystem.cli.reference.validate', message: 'Verify signature, expiry, audience, user, and revocation'}) },
  { cmd: 'wp jwt revoke', desc: translate({id: 'ecosystem.cli.reference.revoke', message: 'Revoke a JWT and delete the user\'s refresh tokens'}) },
  { cmd: 'wp jwt revoke-all', desc: translate({id: 'ecosystem.cli.reference.revokeAll', message: 'Revoke every JWT and refresh token of a user'}) },
  { cmd: 'wp jwt key generate | rotate', desc: translate({id: 'ecosystem.cli.reference.key', message: 'Print a new signing key, or replace the stored one'}) },
  { cmd: 'wp jwt api-key create | list | revoke', desc: translate({id: 'ecosystem.cli.reference.apiKey', message: 'Manage API keys'}) },
  { cmd: 'wp jwt auth-code list | add | remove', desc: translate({id: 'ecosystem.cli.reference.authCode', message: 'Manage auth codes'}) },
  { cmd: 'wp jwt config get | set | list | export | import', desc: translate({id: 'ecosystem.cli.reference.config', message: 'Read and change the settings'}) },
  { cmd: 'wp jwt doctor', desc: translate({id: 'ecosystem.cli.reference.doctor', message: 'Versions, REST URLs, endpoint status, and configuration warnings'}) },
  { cmd: 'wp jwt security-report', desc: translate({id: 'ecosystem.cli.reference.securityReport', message: 'Security score (0-100, grade A-F) and findings'}) },
  { cmd: 'wp jwt explain-error', desc: translate({id: 'ecosystem.cli.reference.explainError', message: 'Meaning, HTTP status and related settings of an error code'}) },
  { cmd: 'wp jwt log list | analyze', desc: translate({id: 'ecosystem.cli.reference.log', message: 'Query and summarize the audit log'}) },
  { cmd: 'wp jwt webhook list | test | logs', desc: translate({id: 'ecosystem.cli.reference.webhook', message: 'List webhooks, send a test call, read the call log'}) },
  { cmd: 'wp jwt cleanup', desc: translate({id: 'ecosystem.cli.reference.cleanup', message: 'Run the daily cleanup job immediately'}) },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function CliPage() {
  return (
    <Layout
      title={translate({id: 'ecosystem.cli.meta.title', message: 'WP-CLI Commands for JWT Authentication'})}
      description={translate({id: 'ecosystem.cli.meta.description', message: 'Built-in WP-CLI commands for Simple JWT Login: issue and revoke JWTs, rotate signing keys, manage API keys and settings, and read audit logs from WP-CLI.'})}
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ── Hero ────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}><Translate id="ecosystem.cli.hero.badge">Built in since 4.3.0</Translate></div>
          <h1 className={styles.heroTitle}>
            <Translate id="ecosystem.cli.hero.titleLead">Simple JWT Login</Translate><br />
            <span className={styles.heroAccent}><Translate id="ecosystem.cli.hero.titleAccent">in WP-CLI</Translate></span>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="ecosystem.cli.hero.subtitle">{'The WP-CLI commands cover setup, token issuing and revocation, signing key rotation, API keys, auth codes, settings, diagnostics, and audit logs. They ship with the plugin - no add-on to install.'}</Translate>
          </p>
          <div className={styles.heroCta}>
            <Link to="/docs/cli/" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.cli.hero.readDocsTitle', message: 'Read the CLI documentation'})}>
              <Translate id="ecosystem.cli.hero.readDocs">Read the docs →</Translate>
            </Link>
            <Link
              to={CLI_SOURCE_URL}
              className={sharedStyles.btn}
              title={translate({id: 'ecosystem.cli.hero.githubTitle', message: 'View CLI.md on GitHub'})}
            >
              <Translate id="ecosystem.cli.hero.github">View on GitHub</Translate>
            </Link>
          </div>

          {/* Hero terminal preview */}
          <div className={styles.heroTerminalWrap}>
            <Terminal
              lines={[
                { comment: true, text: '# Generate a signing key and enable /auth' },
                { text: 'wp jwt setup' },
                { text: '' },
                { comment: true, text: '# Issue a 10-minute token for a user' },
                { text: 'TOKEN=$(wp jwt generate admin --ttl=10)' },
                { text: '' },
                { comment: true, text: '# Same checks as the REST endpoints; exit code 1 when invalid' },
                { text: 'wp jwt validate "$TOKEN"' },
                { output: true, text: 'valid                yes' },
                { output: true, text: 'message              Token is valid.' },
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
                { icon: faPlug, text: translate({id: 'ecosystem.cli.highlights.builtIn', message: 'Part of the plugin since 4.3.0'}) },
                { icon: faKey, text: translate({id: 'ecosystem.cli.highlights.commands', message: '30 commands in 18 groups'}) },
                { icon: faDesktop, text: translate({id: 'ecosystem.cli.highlights.formats', message: 'Table, JSON, CSV, and YAML output'}) },
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
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.cli.commandsSection.title">Main commands</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="ecosystem.cli.commandsSection.lead">Single results support text and JSON output. Lists support table, CSV, JSON, YAML, and count output, and column selection with --fields.</Translate>
            </p>
            <CommandTabs />
          </div>
        </section>

        {/* ── Use cases ──────────────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.cli.useCasesSection.title">Use cases for teams</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="ecosystem.cli.useCasesSection.lead">The REST API serves client applications. The CLI serves the people who operate the site: developers, DevOps, support, and security.</Translate>
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
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.cli.install.title">Enable the commands</Translate></h2>
            <div className={styles.installGrid}>

              {/* Requirements */}
              <div className={styles.requireBox}>
                <h3 className={styles.requireTitle}><Translate id="ecosystem.cli.install.requirements">Requirements</Translate></h3>
                <ul className={styles.requireList}>
                  {[
                    ['Simple JWT Login', '4.3.0+'],
                    ['WP-CLI', translate({id: 'ecosystem.cli.install.req.anyStable', message: 'any recent stable'})],
                    ['General > CLI', translate({id: 'ecosystem.cli.install.req.enabled', message: 'enabled (default)'})],
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
                    <strong><Translate id="ecosystem.cli.install.step1.title">Update Simple JWT Login</Translate></strong>
                    <p><Translate id="ecosystem.cli.install.step1.text">The commands are registered by the plugin from version 4.3.0. No other plugin is needed.</Translate></p>
                  </div>
                </div>
                <div className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>2</span>
                  <div>
                    <strong><Translate id="ecosystem.cli.install.step2.title">Remove the old add-on</Translate></strong>
                    <p><Translate id="ecosystem.cli.install.step2.text">{'The Simple JWT Login CLI plugin is deprecated. While it is active, the built-in commands are not registered. Deactivate and delete it, then check that General > CLI is on.'}</Translate></p>
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
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.cli.reference.title">Command reference</Translate></h2>
            <p className={styles.sectionLead}><Translate id="ecosystem.cli.reference.lead">Every command and subcommand.</Translate></p>
            <div className={styles.refTable}>
              {reference.map(({ cmd, desc }) => (
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
              <h2 className={styles.ctaTitle}><Translate id="ecosystem.cli.cta.title">Options, output formats, and error messages</Translate></h2>
              <p className={styles.ctaSubtitle}>
                <Translate id="ecosystem.cli.cta.subtitle">The documentation lists every option, the add-on migration notes and a troubleshooting table.</Translate>
              </p>
              <div className={styles.ctaButtons}>
                <Link to="/docs/cli/" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.cli.cta.readDocsTitle', message: 'Read the CLI documentation'})}>
                  <Translate id="ecosystem.cli.cta.getStarted">Read the docs →</Translate>
                </Link>
                <Link
                  to={CLI_SOURCE_URL}
                  className={sharedStyles.btn}
                  title={translate({id: 'ecosystem.cli.cta.githubTitle', message: 'View CLI.md on GitHub'})}
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
