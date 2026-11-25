import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved, faCodeBranch, faServer, faBook,
  faHandshake, faBuilding, faStar,
  faUsers, faBullhorn, faBolt,
} from '@fortawesome/free-solid-svg-icons';
import styles from './donate.module.css';
import sponsorStyles from './sponsors.module.css';
import { ACTIVE_INSTALLS, TOTAL_DOWNLOADS, RATING, ACTIVE_YEARS, formatNumber } from '@site/src/data/pluginStats';

const SPONSOR_EMAIL = 'contact@simplejwtlogin.com';
const mailto = (subject) => `mailto:${SPONSOR_EMAIL}?subject=${encodeURIComponent(subject)}`;
const FORM_ID = 'sponsor-form';
const FORM_ANCHOR = `#${FORM_ID}`;
const FORM_SCRIPT = 'https://form.123formbuilder.com/embed/5979635.js';

// 123FormBuilder renders the form where its script tag sits; JSX <script> tags never execute,
// so inject it on mount (client-side only).
function SponsorForm() {
  const ref = useRef(null);
  useEffect(() => {
    const host = ref.current;
    const script = document.createElement('script');
    script.src = FORM_SCRIPT;
    script.dataset.role = 'form';
    script.dataset.defaultWidth = '800px';
    script.dataset.customVars = 'hasEmbedFormStyle=1&hasTransparentBg=1';
    host.appendChild(script);
    return () => { host.innerHTML = ''; };
  }, []);
  return <div ref={ref} className={sponsorStyles.formHost} />;
}

const stats = [
  { number: `${formatNumber(ACTIVE_INSTALLS)}+`, label: 'Active installs' },
  { number: `${formatNumber(TOTAL_DOWNLOADS)}+`, label: 'Total downloads' },
  { number: `${RATING} / 5`, label: 'WordPress rating' },
  { number: `${ACTIVE_YEARS}+ years`, label: 'In active development' },
];

const reasons = [
  {
    icon: faUsers,
    title: 'Reach WordPress developers',
    description:
      'Put your brand in front of developers building headless WordPress, mobile apps and REST API integrations.',
  },
  {
    icon: faShieldHalved,
    title: 'Secure the stack you rely on',
    description:
      'If your product or clients depend on JWT authentication in WordPress, sponsoring keeps it maintained and secure.',
  },
  {
    icon: faBullhorn,
    title: 'Show open-source leadership',
    description:
      'Back a free and open-source plugin with no paywall - a visible signal to the developer community.',
  },
];

const funds = [
  {
    icon: faShieldHalved,
    title: 'Security & maintenance',
    description: 'Security reviews, fast patches and compatibility with new WordPress and PHP releases.',
  },
  {
    icon: faCodeBranch,
    title: 'New features',
    description: 'Development time for REST API, WPGraphQL and WP-CLI features requested by the community.',
  },
  {
    icon: faBook,
    title: 'Docs & SDKs',
    description: 'Documentation, code examples and the official PHP and JavaScript SDKs.',
  },
  {
    icon: faServer,
    title: 'Infrastructure',
    description: 'Hosting for simplejwtlogin.com, demos and CI for automated testing.',
  },
];

const tiers = [
  {
    amount: '$50',
    period: ' / month',
    label: 'Supporter',
    icon: faHandshake,
    benefits: [
      'Logo on the Sponsors page',
      'Logo in the site footer on every page',
      'Mention in the GitHub README',
      'Thank-you in every release notes post',
    ],
  },
  {
    amount: '$100',
    period: ' / month',
    label: 'Partner',
    icon: faBuilding,
    benefits: [
      'Everything in Supporter',
      'A dedicated blog post about your sponsorship',
      'Social media shout-out when you join',
    ],
  },
  {
    amount: '$250',
    period: ' / month',
    label: 'Premier',
    icon: faStar,
    benefits: [
      'Everything in Partner',
      'Larger logo placement in the footer and Sponsors page',
      'Large logo on the homepage',
      'Priority triage for issues you report',
    ],
  },
  {
    amount: 'Services',
    period: ' / credits',
    label: 'Infrastructure partner',
    icon: faServer,
    cta: 'Offer services',
    benefits: [
      'Hosting, CI, tooling or cloud credits instead of money',
      'Logo on the Sponsors page and in the site footer',
      'Credited as infrastructure partner in the GitHub README',
    ],
  },
];

const sponsors = [
  {
    name: 'DigitalOcean',
    role: 'Infrastructure partner',
    href: 'https://www.digitalocean.com/',
    logo: 'https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_horizontal_blue.svg',
  },
  {
    name: 'CodeRabbit',
    role: 'AI code review partner',
    href: 'https://coderabbit.link/nicumicle',
    // White logo, so the card has a fixed dark background
    logo: 'https://www.coderabbit.ai/press-kit/coderabbit-reverse-white.svg',
    dark: true,
  },
];

function SponsorsPage() {
  useBrokenLinks().collectAnchor(FORM_ID);
  return (
    <Layout
      title="Sponsor Simple JWT Login"
      description="Sponsor Simple JWT Login, the free and open-source JWT authentication plugin for WordPress REST API, headless WP and WPGraphQL."
    >
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}>For companies · Monthly sponsorship</div>
          <h1 className={styles.heroTitle}>
            Sponsor the JWT plugin<br />
            <span className={styles.heroAccent}>your stack depends on</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Simple JWT Login powers authentication for thousands of WordPress sites,
            headless apps and mobile clients. Free and open-source, forever.
            Company sponsorship keeps it secure, maintained and growing.
          </p>
          <Link to={FORM_ANCHOR} className={styles.heroCta} title="Go to the sponsorship form">
            Become a sponsor →
          </Link>
        </div>
      </header>

      <main>
        <section className={styles.statsStrip}>
          <div className="container">
            <div className={styles.statsGrid}>
              {stats.map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statNumber}>{s.number}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why sponsor Simple JWT Login</h2>
            <p className={styles.sectionSubtitle}>
              A small monthly budget with a direct effect on a plugin your team or clients already use.
            </p>
            <div className={styles.impactGrid}>
              {reasons.map((item) => (
                <div key={item.title} className={styles.impactCard}>
                  <div className={styles.impactIcon}><FontAwesomeIcon icon={item.icon} /></div>
                  <h3 className={styles.impactTitle}>{item.title}</h3>
                  <p className={styles.impactDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What sponsorship funds</h2>
            <p className={styles.sectionSubtitle}>
              Every dollar goes back into the project.
            </p>
            <div className={styles.impactGrid}>
              {funds.map((item) => (
                <div key={item.title} className={styles.impactCard}>
                  <div className={styles.impactIcon}><FontAwesomeIcon icon={item.icon} /></div>
                  <h3 className={styles.impactTitle}>{item.title}</h3>
                  <p className={styles.impactDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Sponsorship levels</h2>
            <p className={styles.sectionSubtitle}>
              Invoices are available. Need something custom? Just ask.
            </p>
            <div className={sponsorStyles.tiersGrid}>
              {tiers.map((tier) => (
                <Link
                  key={tier.label}
                  to={FORM_ANCHOR}
                  className={styles.tierCard}
                  title={`Become a ${tier.label} sponsor`}
                >
                  <div className={styles.tierIcon}><FontAwesomeIcon icon={tier.icon} /></div>
                  <div className={styles.tierAmount}>{tier.amount}<span className={sponsorStyles.perMonth}>{tier.period}</span></div>
                  <div className={styles.tierLabel}>{tier.label}</div>
                  <ul className={sponsorStyles.benefits}>
                    {tier.benefits.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <div className={`${styles.tierCta} ${sponsorStyles.cta}`}>{tier.cta ?? `Become a ${tier.label}`} →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Current sponsors &amp; infrastructure partners</h2>
            <p className={styles.sectionSubtitle}>
              Thank you to the companies that already support Simple JWT Login.
            </p>
            <div className={sponsorStyles.logoGrid}>
              {sponsors.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[sponsorStyles.logoCard, s.dark ? sponsorStyles.logoCardDark : ''].join(' ')}
                  title={`${s.name} - ${s.role}`}
                >
                  <img src={s.logo} alt={s.name} width="160" height="40" />
                  <span className={sponsorStyles.logoRole}>{s.role}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id={FORM_ID} className={styles.finalCta}>
          <div className="container">
            <div className={styles.impactIcon}><FontAwesomeIcon icon={faBolt} /></div>
            <h2 className={styles.finalCtaTitle}>Let&apos;s partner up</h2>
            <p className={styles.finalCtaSubtitle}>
              Tell us about your company and preferred level - I&apos;ll reply within a few days.
            </p>
            <SponsorForm />
            <p className={styles.finalCtaNote}>
              Prefer email? Write to <a href={mailto('Simple JWT Login sponsorship')}>{SPONSOR_EMAIL}</a>.
              Individual developer? See the <Link to="/donate/">donate page</Link>.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default SponsorsPage;
