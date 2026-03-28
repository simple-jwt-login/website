import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './mailpoet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faCartShopping, faGift, faEnvelope, faKey, faClock, faHeart, faWrench, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import sharedStyles from '../styles.module.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Simple JWT Login MailPoet Add-on',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'WordPress Plugin',
  operatingSystem: 'WordPress 4.4+',
  description:
    'Add magic-link login to your MailPoet email campaigns. Subscribers click once and land on your site already logged in — no password required.',
  url: 'https://wordpress.org/plugins/simple-jwt-login-mailpoet',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'Nicu Micle', url: 'https://github.com/nicumicle' },
};

/* ── Code block ─────────────────────────────────────────────── */
function CodeBlock({ title, lines }) {
  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeBar}>
        <span className={clsx(styles.dot, styles.dotRed)} />
        <span className={clsx(styles.dot, styles.dotYellow)} />
        <span className={clsx(styles.dot, styles.dotGreen)} />
        <span className={styles.codeTitle}>{title}</span>
      </div>
      <pre className={styles.codeBody}>
        {lines.map((line, i) =>
          line.comment ? (
            <span key={i} className={styles.codeComment}>{line.text}{'\n'}</span>
          ) : line.accent ? (
            <span key={i} className={styles.codeAccent}>{line.text}{'\n'}</span>
          ) : (
            <span key={i} className={styles.codeLine}>{line.text}{'\n'}</span>
          )
        )}
      </pre>
    </div>
  );
}

/* ── Shortcode params ───────────────────────────────────────── */
const params = [
  { name: 'text', required: true, desc: 'Visible link text shown to the subscriber.' },
  { name: 'authCode', required: false, desc: 'The Auth Code from Simple JWT Login → Auth Codes.' },
  { name: 'validity', required: false, desc: 'Token lifetime in seconds. Default: 604800 (1 week).' },
  { name: 'redirectUrl', required: false, desc: 'Override the default redirect URL after login.' },
  { name: 'class', required: false, desc: 'CSS class(es) to apply to the link element.' },
  { name: 'style', required: false, desc: 'Inline CSS styles for the link.' },
];

/* ── Use cases ──────────────────────────────────────────────── */
const useCases = [
  {
    icon: faNewspaper,
    title: 'Newsletter re-engagement',
    description:
      'Include a one-click "Read your exclusive content" link in your newsletter. Subscribers land on a members-only page already logged in — no friction, higher engagement.',
  },
  {
    icon: faCartShopping,
    title: 'Abandoned cart recovery',
    description:
      'Send a cart-recovery email with a magic link that logs the customer in and redirects them straight to checkout — remove every barrier between the email and the purchase.',
  },
  {
    icon: faGift,
    title: 'Welcome & onboarding emails',
    description:
      'Welcome new members with a single click that logs them in and drops them on your onboarding page. First impressions matter — make the journey seamless from day one.',
  },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function MailPoetPage() {
  return (
    <Layout
      title="MailPoet Add-on — Simple JWT Login"
      description="Add personalised magic-link login to your MailPoet email campaigns. One shortcode, zero passwords — subscribers click and land on your site already logged in."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}>MailPoet Add-on</div>
          <h1 className={styles.heroTitle}>
            Magic-link login<br />
            <span className={styles.heroAccent}>inside your emails</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Drop one shortcode into any MailPoet template. Every subscriber gets
            a personalised, one-click login link — no password, no friction.
          </p>
          <div className={styles.heroCta}>
            <Link to="https://wordpress.org/plugins/simple-jwt-login-mailpoet" className={sharedStyles.actionButton} title="Download from WordPress.org">
              Download free →
            </Link>
            <Link to="/docs/mailpoet/" className={sharedStyles.btn} title="Read the documentation">
              Documentation
            </Link>
          </div>

          <div className={styles.heroCodeWrap}>
            <CodeBlock
              title="MailPoet shortcode"
              lines={[
                { comment: true, text: '<!-- Drop this into any MailPoet email template -->' },
                { text: '[custom:simple-jwt-login' },
                { accent: true, text: '  text="Log in to your account"' },
                { accent: true, text: '  authCode="your-auth-code"' },
                { accent: true, text: '  validity="604800"' },
                { accent: true, text: '  redirectUrl="https://yoursite.com/dashboard"' },
                { text: ']' },
                { text: '' },
                { comment: true, text: '<!-- Renders to a unique, time-limited URL per recipient -->' },
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
                { icon: faEnvelope, text: 'One shortcode, any template' },
                { icon: faKey, text: 'Passwordless login' },
                { icon: faClock, text: 'Configurable token lifetime' },
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

        {/* ── How it works ──────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}>How it works</span>
            <h2 className={sharedStyles.sectionTitle}>From shortcode to seamless login</h2>
            <div className={styles.stepsGrid}>
              {[
                {
                  n: '1',
                  icon: faWrench,
                  title: 'Install & configure',
                  desc: 'Install the add-on, activate it, and copy your Auth Code from Simple JWT Login settings.',
                },
                {
                  n: '2',
                  icon: faEnvelope,
                  title: 'Add the shortcode',
                  desc: 'Drop the shortcode into any MailPoet email template. Set the link text, validity period, and redirect URL.',
                },
                {
                  n: '3',
                  icon: faPaperPlane,
                  title: 'Send your campaign',
                  desc: 'MailPoet renders a unique, personalised autologin URL for each subscriber when the email is sent.',
                },
                {
                  n: '4',
                  icon: faGift,
                  title: 'Subscriber clicks — done',
                  desc: 'One click logs them in and redirects them to any page on your site. No passwords, no forms.',
                },
              ].map(({ n, icon, title, desc }) => (
                <div key={n} className={styles.stepCard}>
                  <div className={styles.stepNum}>{n}</div>
                  <div className={styles.stepIcon}><FontAwesomeIcon icon={icon} /></div>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use cases ─────────────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}>Use Cases</span>
            <h2 className={sharedStyles.sectionTitle}>Everywhere a smooth login matters</h2>
            <div className={styles.useCaseGrid}>
              {useCases.map(({ icon, title, description }) => (
                <div key={title} className={styles.useCaseCard}>
                  <div className={styles.useCaseIcon}><FontAwesomeIcon icon={icon} /></div>
                  <h3 className={styles.useCaseTitle}>{title}</h3>
                  <p className={styles.useCaseDesc}>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Shortcode reference ───────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}>Reference</span>
            <h2 className={sharedStyles.sectionTitle}>Shortcode parameters</h2>
            <p className={styles.sectionLead}>All available parameters for the <code>[custom:simple-jwt-login]</code> shortcode.</p>
            <div className={styles.refTable}>
              {params.map(({ name, required, desc }) => (
                <div key={name} className={styles.refRow}>
                  <div className={styles.refLeft}>
                    <code className={styles.refParam}>{name}</code>
                    {required && <span className={styles.refRequired}>required</span>}
                  </div>
                  <span className={styles.refDesc}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Installation ──────────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}>Getting Started</span>
            <h2 className={sharedStyles.sectionTitle}>Up and running in 4 steps</h2>
            <div className={styles.installSteps}>
              {[
                { n: '1', title: 'Install Simple JWT Login', desc: 'Make sure the core plugin is installed and active on your WordPress site.' },
                { n: '2', title: 'Install the MailPoet add-on', desc: 'Search for "Simple JWT Login MailPoet" on WordPress.org, install, and activate.' },
                { n: '3', title: 'Copy your Auth Code', desc: 'Go to Simple JWT Login → Auth Codes. Copy the code you want to use for autologin links.' },
                { n: '4', title: 'Add the shortcode to your template', desc: 'Open a MailPoet email template, paste the shortcode with your auth code and desired parameters.' },
              ].map(({ n, title, desc }) => (
                <div key={n} className={styles.installStep}>
                  <span className={sharedStyles.stepNumber}>{n}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '3rem' }}>
              <Link to="https://wordpress.org/plugins/simple-jwt-login-mailpoet" className={sharedStyles.actionButton} title="Download from WordPress.org">
                Download free →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h2 className={styles.ctaTitle}>Turn every email into a one-click login</h2>
              <p className={styles.ctaSubtitle}>
                Install the free MailPoet add-on, paste one shortcode, and give every
                subscriber a frictionless path back to your site.
              </p>
              <div className={styles.ctaButtons}>
                <Link to="https://wordpress.org/plugins/simple-jwt-login-mailpoet" className={sharedStyles.actionButton} title="Download from WordPress.org">
                  Download free →
                </Link>
                <Link to="/docs/mailpoet/" className={sharedStyles.btn} title="Read the documentation">
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
