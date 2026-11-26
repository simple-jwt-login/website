import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
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
  description: translate({id: 'ecosystem.mailpoet.jsonLd.description', message: 'Add magic-link login to your MailPoet email campaigns. Subscribers click once and land on your site already logged in - no password required.'}),
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
  { name: 'text', required: true, desc: translate({id: 'ecosystem.mailpoet.params.text.desc', message: 'Visible link text shown to the subscriber.'}) },
  { name: 'authCode', required: false, desc: translate({id: 'ecosystem.mailpoet.params.authCode.desc', message: 'The Auth Code from Simple JWT Login → Auth Codes.'}) },
  { name: 'validity', required: false, desc: translate({id: 'ecosystem.mailpoet.params.validity.desc', message: 'Token lifetime in seconds. Default: 604800 (1 week).'}) },
  { name: 'redirectUrl', required: false, desc: translate({id: 'ecosystem.mailpoet.params.redirectUrl.desc', message: 'Override the default redirect URL after login.'}) },
  { name: 'class', required: false, desc: translate({id: 'ecosystem.mailpoet.params.class.desc', message: 'CSS class(es) to apply to the link element.'}) },
  { name: 'style', required: false, desc: translate({id: 'ecosystem.mailpoet.params.style.desc', message: 'Inline CSS styles for the link.'}) },
];

/* ── Use cases ──────────────────────────────────────────────── */
const useCases = [
  {
    icon: faNewspaper,
    title: translate({id: 'ecosystem.mailpoet.useCases.newsletter.title', message: 'Newsletter re-engagement'}),
    description:
      translate({id: 'ecosystem.mailpoet.useCases.newsletter.description', message: 'Include a one-click "Read your exclusive content" link in your newsletter. Subscribers land on a members-only page already logged in - no friction, higher engagement.'}),
  },
  {
    icon: faCartShopping,
    title: translate({id: 'ecosystem.mailpoet.useCases.cart.title', message: 'Abandoned cart recovery'}),
    description:
      translate({id: 'ecosystem.mailpoet.useCases.cart.description', message: 'Send a cart-recovery email with a magic link that logs the customer in and redirects them straight to checkout - remove every barrier between the email and the purchase.'}),
  },
  {
    icon: faGift,
    title: translate({id: 'ecosystem.mailpoet.useCases.welcome.title', message: 'Welcome & onboarding emails'}),
    description:
      translate({id: 'ecosystem.mailpoet.useCases.welcome.description', message: 'Welcome new members with a single click that logs them in and drops them on your onboarding page. First impressions matter - make the journey seamless from day one.'}),
  },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function MailPoetPage() {
  return (
    <Layout
      title={translate({id: 'ecosystem.mailpoet.meta.title', message: 'MailPoet Add-on - Simple JWT Login'})}
      description={translate({id: 'ecosystem.mailpoet.meta.description', message: 'Add personalized magic-link login to your MailPoet email campaigns. One shortcode, zero passwords - subscribers click and land on your site already logged in.'})}
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}><Translate id="ecosystem.mailpoet.hero.badge">{'MailPoet Add-on'}</Translate></div>
          <h1 className={styles.heroTitle}>
            <Translate id="ecosystem.mailpoet.hero.title1">{'Magic-link login'}</Translate><br />
            <span className={styles.heroAccent}><Translate id="ecosystem.mailpoet.hero.title2">{'inside your emails'}</Translate></span>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="ecosystem.mailpoet.hero.subtitle">{'Drop one shortcode into any MailPoet template. Every subscriber gets a personalized, one-click login link - no password, no friction.'}</Translate>
          </p>
          <div className={styles.heroCta}>
            <Link to="https://wordpress.org/plugins/simple-jwt-login-mailpoet" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.mailpoet.hero.downloadTitle', message: 'Download from WordPress.org'})}>
              <Translate id="ecosystem.mailpoet.hero.download">{'Download free →'}</Translate>
            </Link>
            <Link to="/docs/mailpoet/" className={sharedStyles.btn} title={translate({id: 'ecosystem.mailpoet.hero.docsTitle', message: 'Read the documentation'})}>
              <Translate id="ecosystem.mailpoet.hero.docs">{'Documentation'}</Translate>
            </Link>
          </div>

          <div className={styles.heroCodeWrap}>
            <CodeBlock
              title={translate({id: 'ecosystem.mailpoet.code.title', message: 'MailPoet shortcode'})}
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
                { icon: faEnvelope, text: translate({id: 'ecosystem.mailpoet.highlights.shortcode', message: 'One shortcode, any template'}) },
                { icon: faKey, text: translate({id: 'ecosystem.mailpoet.highlights.passwordless', message: 'Passwordless login'}) },
                { icon: faClock, text: translate({id: 'ecosystem.mailpoet.highlights.lifetime', message: 'Configurable token lifetime'}) },
                { icon: faHeart, text: translate({id: 'ecosystem.mailpoet.highlights.free', message: 'Free & open source'}) },
              ].map(({ icon, text }) => (
                <div key={icon.iconName} className={styles.highlightItem}>
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
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.mailpoet.how.eyebrow">{'How it works'}</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.mailpoet.how.title">{'From shortcode to seamless login'}</Translate></h2>
            <div className={styles.stepsGrid}>
              {[
                {
                  n: '1',
                  icon: faWrench,
                  title: translate({id: 'ecosystem.mailpoet.how.install.title', message: 'Install & configure'}),
                  desc: translate({id: 'ecosystem.mailpoet.how.install.desc', message: 'Install the add-on, activate it, and copy your Auth Code from Simple JWT Login settings.'}),
                },
                {
                  n: '2',
                  icon: faEnvelope,
                  title: translate({id: 'ecosystem.mailpoet.how.shortcode.title', message: 'Add the shortcode'}),
                  desc: translate({id: 'ecosystem.mailpoet.how.shortcode.desc', message: 'Drop the shortcode into any MailPoet email template. Set the link text, validity period, and redirect URL.'}),
                },
                {
                  n: '3',
                  icon: faPaperPlane,
                  title: translate({id: 'ecosystem.mailpoet.how.send.title', message: 'Send your campaign'}),
                  desc: translate({id: 'ecosystem.mailpoet.how.send.desc', message: 'MailPoet renders a unique, personalized autologin URL for each subscriber when the email is sent.'}),
                },
                {
                  n: '4',
                  icon: faGift,
                  title: translate({id: 'ecosystem.mailpoet.how.click.title', message: 'Subscriber clicks - done'}),
                  desc: translate({id: 'ecosystem.mailpoet.how.click.desc', message: 'One click logs them in and redirects them to any page on your site. No passwords, no forms.'}),
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
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.mailpoet.useCases.eyebrow">{'Use Cases'}</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.mailpoet.useCases.title">{'Everywhere a smooth login matters'}</Translate></h2>
            <div className={styles.useCaseGrid}>
              {useCases.map(({ icon, title, description }) => (
                <div key={icon.iconName} className={styles.useCaseCard}>
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
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.mailpoet.ref.eyebrow">{'Reference'}</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.mailpoet.ref.title">{'Shortcode parameters'}</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate
                id="ecosystem.mailpoet.ref.lead"
                values={{code: <code>[custom:simple-jwt-login]</code>}}
              >
                {'All available parameters for the {code} shortcode.'}
              </Translate>
            </p>
            <div className={styles.refTable}>
              {params.map(({ name, required, desc }) => (
                <div key={name} className={styles.refRow}>
                  <div className={styles.refLeft}>
                    <code className={styles.refParam}>{name}</code>
                    {required && <span className={styles.refRequired}><Translate id="ecosystem.mailpoet.ref.required">{'required'}</Translate></span>}
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
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.mailpoet.install.eyebrow">{'Getting Started'}</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.mailpoet.install.title">{'Up and running in 4 steps'}</Translate></h2>
            <div className={styles.installSteps}>
              {[
                { n: '1', title: translate({id: 'ecosystem.mailpoet.install.core.title', message: 'Install Simple JWT Login'}), desc: translate({id: 'ecosystem.mailpoet.install.core.desc', message: 'Make sure the core plugin is installed and active on your WordPress site.'}) },
                { n: '2', title: translate({id: 'ecosystem.mailpoet.install.addon.title', message: 'Install the MailPoet add-on'}), desc: translate({id: 'ecosystem.mailpoet.install.addon.desc', message: 'Search for "Simple JWT Login MailPoet" on WordPress.org, install, and activate.'}) },
                { n: '3', title: translate({id: 'ecosystem.mailpoet.install.authCode.title', message: 'Copy your Auth Code'}), desc: translate({id: 'ecosystem.mailpoet.install.authCode.desc', message: 'Go to Simple JWT Login → Auth Codes. Copy the code you want to use for autologin links.'}) },
                { n: '4', title: translate({id: 'ecosystem.mailpoet.install.template.title', message: 'Add the shortcode to your template'}), desc: translate({id: 'ecosystem.mailpoet.install.template.desc', message: 'Open a MailPoet email template, paste the shortcode with your auth code and desired parameters.'}) },
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
              <Link to="https://wordpress.org/plugins/simple-jwt-login-mailpoet" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.mailpoet.install.downloadTitle', message: 'Download from WordPress.org'})}>
                <Translate id="ecosystem.mailpoet.install.download">{'Download free →'}</Translate>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h2 className={styles.ctaTitle}><Translate id="ecosystem.mailpoet.cta.title">{'Turn every email into a one-click login'}</Translate></h2>
              <p className={styles.ctaSubtitle}>
                <Translate id="ecosystem.mailpoet.cta.subtitle">{'Install the free MailPoet add-on, paste one shortcode, and give every subscriber a frictionless path back to your site.'}</Translate>
              </p>
              <div className={styles.ctaButtons}>
                <Link to="https://wordpress.org/plugins/simple-jwt-login-mailpoet" className={sharedStyles.actionButton} title={translate({id: 'ecosystem.mailpoet.cta.downloadTitle', message: 'Download from WordPress.org'})}>
                  <Translate id="ecosystem.mailpoet.cta.download">{'Download free →'}</Translate>
                </Link>
                <Link to="/docs/mailpoet/" className={sharedStyles.btn} title={translate({id: 'ecosystem.mailpoet.cta.docsTitle', message: 'Read the documentation'})}>
                  <Translate id="ecosystem.mailpoet.cta.docs">{'Documentation'}</Translate>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
