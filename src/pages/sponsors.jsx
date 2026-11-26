import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved, faCodeBranch, faServer, faBook,
  faHandshake, faBuilding, faStar,
  faUsers, faBullhorn, faBolt,
} from '@fortawesome/free-solid-svg-icons';
import CheckList from '@site/src/components/CheckList';
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
  { number: `${formatNumber(ACTIVE_INSTALLS)}+`, label: translate({id: 'sponsors.stats.activeInstalls', message: 'Active installs'}) },
  { number: `${formatNumber(TOTAL_DOWNLOADS)}+`, label: translate({id: 'sponsors.stats.totalDownloads', message: 'Total downloads'}) },
  { number: `${RATING} / 5`, label: translate({id: 'sponsors.stats.rating', message: 'WordPress rating'}) },
  { number: `${ACTIVE_YEARS}+ years`, label: translate({id: 'sponsors.stats.years', message: 'In active development'}) },
];

const reasons = [
  {
    icon: faUsers,
    title: translate({id: 'sponsors.reasons.reach.title', message: 'Reach WordPress developers'}),
    description:
      translate({id: 'sponsors.reasons.reach.description', message: 'Put your brand in front of developers building headless WordPress, mobile apps, and REST API integrations.'}),
  },
  {
    icon: faShieldHalved,
    title: translate({id: 'sponsors.reasons.secure.title', message: 'Secure the stack you rely on'}),
    description:
      translate({id: 'sponsors.reasons.secure.description', message: 'If your product or clients depend on JWT authentication in WordPress, sponsoring keeps it maintained and secure.'}),
  },
  {
    icon: faBullhorn,
    title: translate({id: 'sponsors.reasons.leadership.title', message: 'Show open-source leadership'}),
    description:
      translate({id: 'sponsors.reasons.leadership.description', message: 'Back a free and open-source plugin with no paywall - a visible signal to the developer community.'}),
  },
];

const funds = [
  {
    icon: faShieldHalved,
    title: translate({id: 'sponsors.funds.security.title', message: 'Security & maintenance'}),
    description: translate({id: 'sponsors.funds.security.description', message: 'Security reviews, fast patches and compatibility with new WordPress and PHP releases.'}),
  },
  {
    icon: faCodeBranch,
    title: translate({id: 'sponsors.funds.features.title', message: 'New features'}),
    description: translate({id: 'sponsors.funds.features.description', message: 'Development time for REST API, WPGraphQL and WP-CLI features requested by the community.'}),
  },
  {
    icon: faBook,
    title: translate({id: 'sponsors.funds.docs.title', message: 'Docs & SDKs'}),
    description: translate({id: 'sponsors.funds.docs.description', message: 'Documentation, code examples and the official PHP and JavaScript SDKs.'}),
  },
  {
    icon: faServer,
    title: translate({id: 'sponsors.funds.infra.title', message: 'Infrastructure'}),
    description: translate({id: 'sponsors.funds.infra.description', message: 'Hosting for simplejwtlogin.com, demos, and CI for automated testing.'}),
  },
];

const tiers = [
  {
    amount: '$50',
    period: translate({id: 'sponsors.tiers.supporter.period', message: ' / month'}),
    label: translate({id: 'sponsors.tiers.supporter.label', message: 'Supporter'}),
    icon: faHandshake,
    benefits: [
      translate({id: 'sponsors.tiers.supporter.benefit1', message: 'Logo on the Sponsors page'}),
      translate({id: 'sponsors.tiers.supporter.benefit2', message: 'Logo in the site footer on every page'}),
      translate({id: 'sponsors.tiers.supporter.benefit3', message: 'Mention in the GitHub README'}),
      translate({id: 'sponsors.tiers.supporter.benefit4', message: 'Thank-you in every release notes post'}),
    ],
  },
  {
    amount: '$100',
    period: translate({id: 'sponsors.tiers.partner.period', message: ' / month'}),
    label: translate({id: 'sponsors.tiers.partner.label', message: 'Partner'}),
    icon: faBuilding,
    benefits: [
      translate({id: 'sponsors.tiers.partner.benefit1', message: 'Everything in Supporter'}),
      translate({id: 'sponsors.tiers.partner.benefit2', message: 'A dedicated blog post about your sponsorship'}),
      translate({id: 'sponsors.tiers.partner.benefit3', message: 'Social media shout-out when you join'}),
    ],
  },
  {
    amount: '$250',
    period: translate({id: 'sponsors.tiers.premier.period', message: ' / month'}),
    label: translate({id: 'sponsors.tiers.premier.label', message: 'Premier'}),
    icon: faStar,
    benefits: [
      translate({id: 'sponsors.tiers.premier.benefit1', message: 'Everything in Partner'}),
      translate({id: 'sponsors.tiers.premier.benefit2', message: 'Larger logo placement in the footer and Sponsors page'}),
      translate({id: 'sponsors.tiers.premier.benefit3', message: 'Large logo on the homepage'}),
      translate({id: 'sponsors.tiers.premier.benefit4', message: 'Priority triage for issues you report'}),
    ],
  },
  {
    amount: translate({id: 'sponsors.tiers.infra.amount', message: 'Services'}),
    period: translate({id: 'sponsors.tiers.infra.period', message: ' / credits'}),
    label: translate({id: 'sponsors.tiers.infra.label', message: 'Infrastructure partner'}),
    icon: faServer,
    cta: translate({id: 'sponsors.tiers.infra.cta', message: 'Offer services'}),
    benefits: [
      translate({id: 'sponsors.tiers.infra.benefit1', message: 'Hosting, CI, tooling or cloud credits instead of money'}),
      translate({id: 'sponsors.tiers.infra.benefit2', message: 'Logo on the Sponsors page and in the site footer'}),
      translate({id: 'sponsors.tiers.infra.benefit3', message: 'Credited as infrastructure partner in the GitHub README'}),
    ],
  },
];

const sponsors = [
  {
    name: 'DigitalOcean',
    role: translate({id: 'sponsors.partners.digitalocean.role', message: 'Infrastructure partner'}),
    href: 'https://www.digitalocean.com/',
    logo: 'https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_horizontal_blue.svg',
  },
  {
    name: 'CodeRabbit',
    role: translate({id: 'sponsors.partners.coderabbit.role', message: 'AI code review partner'}),
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
      title={translate({id: 'sponsors.meta.title', message: 'Sponsor Simple JWT Login'})}
      description={translate({id: 'sponsors.meta.description', message: 'Sponsor Simple JWT Login, the free and open-source JWT authentication plugin for WordPress REST API, headless WP and WPGraphQL.'})}
    >
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}><Translate id="sponsors.hero.badge">{'For companies · Monthly sponsorship'}</Translate></div>
          <h1 className={styles.heroTitle}>
            <Translate id="sponsors.hero.title1">Sponsor the JWT plugin</Translate><br />
            <span className={styles.heroAccent}><Translate id="sponsors.hero.title2">your stack depends on</Translate></span>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="sponsors.hero.subtitle">
              {'Simple JWT Login powers authentication for thousands of WordPress sites, headless apps, and mobile clients. Free and open-source, forever. Company sponsorship keeps it secure, maintained, and growing.'}
            </Translate>
          </p>
          <Link to={FORM_ANCHOR} className={styles.heroCta} title={translate({id: 'sponsors.hero.ctaTitle', message: 'Go to the sponsorship form'})}>
            <Translate id="sponsors.hero.cta">{'Become a sponsor →'}</Translate>
          </Link>
        </div>
      </header>

      <main>
        <section className={styles.statsStrip}>
          <div className="container">
            <div className={styles.statsGrid}>
              {stats.map((s) => (
                <div key={s.number} className={styles.statItem}>
                  <span className={styles.statNumber}>{s.number}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}><Translate id="sponsors.why.title">Why sponsor Simple JWT Login</Translate></h2>
            <p className={styles.sectionSubtitle}>
              <Translate id="sponsors.why.subtitle">{'A small monthly budget with a direct effect on a plugin your team or clients already use.'}</Translate>
            </p>
            <div className={styles.impactGrid}>
              {reasons.map((item) => (
                <div key={item.icon.iconName} className={styles.impactCard}>
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
            <h2 className={styles.sectionTitle}><Translate id="sponsors.funds.title">What sponsorship funds</Translate></h2>
            <p className={styles.sectionSubtitle}>
              <Translate id="sponsors.funds.subtitle">Every dollar goes back into the project.</Translate>
            </p>
            <div className={styles.impactGrid}>
              {funds.map((item) => (
                <div key={item.icon.iconName} className={styles.impactCard}>
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
            <h2 className={styles.sectionTitle}><Translate id="sponsors.tiers.title">Sponsorship levels</Translate></h2>
            <p className={styles.sectionSubtitle}>
              <Translate id="sponsors.tiers.subtitle">Invoices are available. Need something custom? Just ask.</Translate>
            </p>
            <div className={sponsorStyles.tiersGrid}>
              {tiers.map((tier) => (
                <Link
                  key={tier.icon.iconName}
                  to={FORM_ANCHOR}
                  className={styles.tierCard}
                  title={translate({id: 'sponsors.tiers.cardTitle', message: 'Become a {label} sponsor'}, {label: tier.label})}
                >
                  <div className={styles.tierIcon}><FontAwesomeIcon icon={tier.icon} /></div>
                  <div className={styles.tierAmount}>{tier.amount}<span className={sponsorStyles.perMonth}>{tier.period}</span></div>
                  <div className={styles.tierLabel}>{tier.label}</div>
                  <CheckList items={tier.benefits} className={sponsorStyles.benefits} />
                  <div className={`${styles.tierCta} ${sponsorStyles.cta}`}>{tier.cta ?? translate({id: 'sponsors.tiers.defaultCta', message: 'Become a {label}'}, {label: tier.label})} →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className="container">
            <h2 className={styles.sectionTitle}><Translate id="sponsors.current.title">{'Current sponsors & infrastructure partners'}</Translate></h2>
            <p className={styles.sectionSubtitle}>
              <Translate id="sponsors.current.subtitle">Thank you to the companies that already support Simple JWT Login.</Translate>
            </p>
            <div className={sponsorStyles.logoGrid}>
              {sponsors.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[sponsorStyles.logoCard, s.dark ? sponsorStyles.logoCardDark : ''].join(' ')}
                  title={translate({id: 'sponsors.current.logoTitle', message: '{name} - {role}'}, {name: s.name, role: s.role})}
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
            <h2 className={styles.finalCtaTitle}><Translate id="sponsors.cta.title">{'Let\'s partner up'}</Translate></h2>
            <p className={styles.finalCtaSubtitle}>
              <Translate id="sponsors.cta.subtitle">{'Tell us about your company and preferred level - I\'ll reply within a few days.'}</Translate>
            </p>
            <SponsorForm />
            <p className={styles.finalCtaNote}>
              <Translate
                id="sponsors.cta.note"
                values={{
                  email: <a href={mailto('Simple JWT Login sponsorship')}>{SPONSOR_EMAIL}</a>,
                  donateLink: <Link to="/donate/"><Translate id="sponsors.cta.note.donateLink">donate page</Translate></Link>,
                }}
              >
                {'Prefer email? Write to {email}. Individual developer? See the {donateLink}.'}
              </Translate>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default SponsorsPage;
