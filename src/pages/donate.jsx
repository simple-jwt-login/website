import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faLock, faBolt, faBook, faMugHot, faSeedling, faTrophy, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import styles from './donate.module.css';
import { ACTIVE_INSTALLS, TOTAL_DOWNLOADS, RATING, ACTIVE_YEARS, formatNumber } from '@site/src/data/pluginStats';

const PAYPAL_URL =
  'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PK9BCD6AYF58Y&source=url';

const stats = [
  { number: `${formatNumber(ACTIVE_INSTALLS)}+`, label: translate({id: 'donate.stats.activeInstalls', message: 'Active installs'}) },
  { number: `${formatNumber(TOTAL_DOWNLOADS)}+`, label: translate({id: 'donate.stats.totalDownloads', message: 'Total downloads'}) },
  { number: `${RATING} / 5`, label: translate({id: 'donate.stats.rating', message: 'WordPress rating'}) },
  { number: `${ACTIVE_YEARS}+ years`, label: translate({id: 'donate.stats.years', message: 'In active development'}) },
];

const impacts = [
  {
    icon: faDesktop,
    title: translate({id: 'donate.impacts.keepLights.title', message: 'Keep the lights on'}),
    description:
      translate({id: 'donate.impacts.keepLights.description', message: 'Cover monthly hosting and infrastructure costs for simplejwtlogin.com and all associated services.'}),
  },
  {
    icon: faLock,
    title: translate({id: 'donate.impacts.audits.title', message: 'Security audits'}),
    description:
      translate({id: 'donate.impacts.audits.description', message: 'Fund regular third-party security reviews to ensure the plugin meets the highest standards for JWT handling.'}),
  },
  {
    icon: faBolt,
    title: translate({id: 'donate.impacts.features.title', message: 'New features'}),
    description:
      translate({id: 'donate.impacts.features.description', message: 'Acquire premium tools and dedicate development time to build the features most requested by the community.'}),
  },
  {
    icon: faBook,
    title: translate({id: 'donate.impacts.docs.title', message: 'Better docs & SDKs'}),
    description:
      translate({id: 'donate.impacts.docs.description', message: 'Improve documentation, code examples, and expand the official PHP and JavaScript SDKs.'}),
  },
];

const tiers = [
  {
    amount: '€5',
    label: translate({id: 'donate.tiers.coffee.label', message: 'Coffee'}),
    icon: faMugHot,
    description: translate({id: 'donate.tiers.coffee.description', message: 'A small thank-you that keeps the caffeine flowing during late-night debugging sessions.'}),
    highlight: true,
  },
  {
    amount: '€10',
    label: translate({id: 'donate.tiers.supporter.label', message: 'Supporter'}),
    icon: faSeedling,
    description: translate({id: 'donate.tiers.supporter.description', message: 'Covers a month of hosting costs and shows real commitment to the project.'}),
    highlight: false,
  },
  {
    amount: '€15',
    label: translate({id: 'donate.tiers.champion.label', message: 'Champion'}),
    icon: faTrophy,
    description: translate({id: 'donate.tiers.champion.description', message: 'Funds a security audit task or a significant new feature development sprint.'}),
    highlight: false,
  },
];

function DonatePage() {
  return (
    <Layout
      title={translate({id: 'donate.meta.title', message: 'Donate - Support Simple JWT Login'})}
      description={translate({id: 'donate.meta.description', message: 'Support the development of Simple JWT Login, the free and open-source JWT authentication plugin for WordPress.'})}
    >
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}><Translate id="donate.hero.badge">{'Open-source · Free forever'}</Translate></div>
          <h1 className={styles.heroTitle}>
            <Translate id="donate.hero.title1">Built with love.</Translate><br /><Translate id="donate.hero.title2" values={{accent: <span className={styles.heroAccent}><Translate id="donate.hero.title2.accent">people like you</Translate></span>}}>{'Kept alive by {accent}'}</Translate>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="donate.hero.subtitle" values={{years: ACTIVE_YEARS}}>
              {'Simple JWT Login has been free and open-source for over {years} years. No premium tier, no paywalled features - just a maintainer who keeps showing up. If this plugin saves you time or makes your project possible, consider giving back.'}
            </Translate>
          </p>
          <Link to={PAYPAL_URL} className={styles.heroCta} title={translate({id: 'donate.hero.ctaTitle', message: 'Donate via PayPal'})}>
            <Translate id="donate.hero.cta">Donate via PayPal</Translate>{' '}<FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main>
        {/* ── Stats ────────────────────────────────────── */}
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

        {/* ── Where the money goes ─────────────────────── */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}><Translate id="donate.where.title">Where your donation goes</Translate></h2>
            <p className={styles.sectionSubtitle}>
              <Translate id="donate.where.subtitle">{'100% of contributions go directly into the project. No salaries, no company.'}</Translate>
            </p>
            <div className={styles.impactGrid}>
              {impacts.map((item) => (
                <div key={item.icon.iconName} className={styles.impactCard}>
                  <div className={styles.impactIcon}><FontAwesomeIcon icon={item.icon} /></div>
                  <h3 className={styles.impactTitle}>{item.title}</h3>
                  <p className={styles.impactDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Donation tiers ───────────────────────────── */}
        <section className={styles.sectionAlt}>
          <div className="container">
            <h2 className={styles.sectionTitle}><Translate id="donate.amount.title">Every amount matters</Translate></h2>
            <p className={styles.sectionSubtitle}>
              <Translate id="donate.amount.subtitle">{'Choose a suggested amount or enter your own on PayPal. Any contribution is deeply appreciated.'}</Translate>
            </p>
            <div className={styles.tiersGrid}>
              {tiers.map((tier) => (
                <Link
                  key={tier.amount}
                  to={PAYPAL_URL}
                  className={[styles.tierCard, tier.highlight ? styles.tierCardHighlight : ''].join(' ')}
                  title={translate({id: 'donate.tiers.cardTitle', message: 'Donate {amount}'}, {amount: tier.amount})}
                >
                  {tier.highlight && (
                    <div className={styles.tierBadge}><Translate id="donate.tiers.mostPopular">Most popular</Translate></div>
                  )}
                  <div className={styles.tierIcon}><FontAwesomeIcon icon={tier.icon} /></div>
                  <div className={styles.tierAmount}>{tier.amount}</div>
                  <div className={styles.tierLabel}>{tier.label}</div>
                  <p className={styles.tierDescription}>{tier.description}</p>
                  <div className={styles.tierCta}>
                    {translate({id: 'donate.tiers.cta', message: 'Donate {amount} →'}, {amount: tier.amount})}
                  </div>
                </Link>
              ))}
            </div>
            <p className={styles.tierNote}>
              <Translate id="donate.tiers.note">You can enter any custom amount on the PayPal page.</Translate>
            </p>
          </div>
        </section>

        {/* ── Personal note ────────────────────────────── */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.quoteCard}>
              <div className={styles.quoteIcon}>"</div>
              <blockquote className={`${styles.quoteText} vale-ignore`}>
                <Translate id="donate.quote.text">
                  {'I started Simple JWT Login because I needed it myself, and I open-sourced it because I believe good tools should be available to everyone. Thousands of developers now rely on it daily. Your donation - however small - tells me that this work matters, and it directly funds the time I can dedicate to making it better. Thank you.'}
                </Translate>
              </blockquote>
              <div className={styles.quoteAuthor}>
                <div className={styles.quoteAvatar}>N</div>
                <div>
                  <div className={styles.quoteAuthorName}><a href="https://github.com/nicumicle" target="_blank" rel="noopener noreferrer">Nicu Micle</a></div>
                  <div className={styles.quoteAuthorRole}><Translate id="donate.quote.role">{'Creator & maintainer of Simple JWT Login'}</Translate></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────── */}
        <section className={styles.finalCta}>
          <div className="container">
            <h2 className={styles.finalCtaTitle}><Translate id="donate.final.title">Ready to make a difference?</Translate></h2>
            <p className={styles.finalCtaSubtitle}>
              <Translate id="donate.final.subtitle">Join the developers and teams who already support this project.</Translate>
            </p>
            <Link to={PAYPAL_URL} className={styles.heroCta} title={translate({id: 'donate.final.ctaTitle', message: 'Donate now'})}>
              <Translate id="donate.final.cta">Donate now via PayPal</Translate>{' '}<FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
            </Link>
            <p className={styles.finalCtaNote}>
              <Translate
                id="donate.final.note"
                values={{
                  contactLink: (
                    <Link to="/contact/" title={translate({id: 'donate.final.note.contactTitle', message: 'Contact us'})}>
                      <Translate id="donate.final.note.contactLink">Get in touch</Translate>
                    </Link>
                  ),
                }}
              >
                {'Prefer another method? {contactLink} and we\'ll figure something out.'}
              </Translate>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default DonatePage;
