import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faLock, faBolt, faBook, faMugHot, faSeedling, faTrophy } from '@fortawesome/free-solid-svg-icons';
import styles from './donate.module.css';

const PAYPAL_URL =
  'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PK9BCD6AYF58Y&source=url';

const stats = [
  { number: '5,000+', label: 'Active installs' },
  { number: '80,000+', label: 'Total downloads' },
  { number: '5 / 5', label: 'WordPress rating' },
  { number: '6+ years', label: 'In active development' },
];

const impacts = [
  {
    icon: faDesktop,
    title: 'Keep the lights on',
    description:
      'Cover monthly hosting and infrastructure costs for simplejwtlogin.com and all associated services.',
  },
  {
    icon: faLock,
    title: 'Security audits',
    description:
      'Fund regular third-party security reviews to ensure the plugin meets the highest standards for JWT handling.',
  },
  {
    icon: faBolt,
    title: 'New features',
    description:
      'Acquire premium tools and dedicate development time to build the features most requested by the community.',
  },
  {
    icon: faBook,
    title: 'Better docs & SDKs',
    description:
      'Improve documentation, code examples, and expand the official PHP and JavaScript SDKs.',
  },
];

const tiers = [
  {
    amount: '€5',
    label: 'Coffee',
    icon: faMugHot,
    description: 'A small thank-you that keeps the caffeine flowing during late-night debugging sessions.',
    highlight: true,
  },
  {
    amount: '€10',
    label: 'Supporter',
    icon: faSeedling,
    description: 'Covers a month of hosting costs and shows real commitment to the project.',
    highlight: false,
  },
  {
    amount: '€15',
    label: 'Champion',
    icon: faTrophy,
    description: 'Funds a security audit task or a significant new feature development sprint.',
    highlight: false,
  },
];

function DonatePage() {
  return (
    <Layout
      title="Donate - Support Simple JWT Login"
      description="Support the development of Simple JWT Login, the free and open-source JWT authentication plugin for WordPress."
    >
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}>Open-source · Free forever</div>
          <h1 className={styles.heroTitle}>
            Built with love.<br />Kept alive by <span className={styles.heroAccent}>people like you.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Simple JWT Login has been free and open-source for over six years.
            No premium tier, no paywalled features - just a maintainer who keeps
            showing up. If this plugin saves you time or makes your project possible,
            consider giving back.
          </p>
          <Link to={PAYPAL_URL} className={styles.heroCta} title="Donate via PayPal">
            Donate via PayPal ↗
          </Link>
        </div>
      </header>

      <main>
        {/* ── Stats ────────────────────────────────────── */}
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

        {/* ── Where the money goes ─────────────────────── */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Where your donation goes</h2>
            <p className={styles.sectionSubtitle}>
              100% of contributions go directly into the project. No salaries,
              no company.
            </p>
            <div className={styles.impactGrid}>
              {impacts.map((item) => (
                <div key={item.title} className={styles.impactCard}>
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
            <h2 className={styles.sectionTitle}>Every amount matters</h2>
            <p className={styles.sectionSubtitle}>
              Choose a suggested amount or enter your own on PayPal.
              Any contribution is deeply appreciated.
            </p>
            <div className={styles.tiersGrid}>
              {tiers.map((tier) => (
                <Link
                  key={tier.label}
                  to={PAYPAL_URL}
                  className={[styles.tierCard, tier.highlight ? styles.tierCardHighlight : ''].join(' ')}
                  title={`Donate ${tier.amount}`}
                >
                  {tier.highlight && (
                    <div className={styles.tierBadge}>Most popular</div>
                  )}
                  <div className={styles.tierIcon}><FontAwesomeIcon icon={tier.icon} /></div>
                  <div className={styles.tierAmount}>{tier.amount}</div>
                  <div className={styles.tierLabel}>{tier.label}</div>
                  <p className={styles.tierDescription}>{tier.description}</p>
                  <div className={styles.tierCta}>
                    Donate {tier.amount} →
                  </div>
                </Link>
              ))}
            </div>
            <p className={styles.tierNote}>
              You can enter any custom amount on the PayPal page.
            </p>
          </div>
        </section>

        {/* ── Personal note ────────────────────────────── */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.quoteCard}>
              <div className={styles.quoteIcon}>"</div>
              <blockquote className={styles.quoteText}>
                I started Simple JWT Login because I needed it myself, and I
                open-sourced it because I believe good tools should be available
                to everyone. Thousands of developers now rely on it daily. Your
                donation - however small - tells me that this work matters, and
                it directly funds the time I can dedicate to making it better.
                Thank you.
              </blockquote>
              <div className={styles.quoteAuthor}>
                <div className={styles.quoteAvatar}>N</div>
                <div>
                  <div className={styles.quoteAuthorName}><a href="https://github.com/nicumicle" target="_blank" rel="noopener noreferrer">Nicu Micle</a></div>
                  <div className={styles.quoteAuthorRole}>Creator &amp; maintainer of Simple JWT Login</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────── */}
        <section className={styles.finalCta}>
          <div className="container">
            <h2 className={styles.finalCtaTitle}>Ready to make a difference?</h2>
            <p className={styles.finalCtaSubtitle}>
              Join the developers and teams who already support this project.
            </p>
            <Link to={PAYPAL_URL} className={styles.heroCta} title="Donate now">
              Donate now via PayPal ↗
            </Link>
            <p className={styles.finalCtaNote}>
              Prefer another method?{' '}
              <Link to="/contact/" title="Contact us">Get in touch</Link> and we'll figure something out.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default DonatePage;
