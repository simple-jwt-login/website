import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './export-import.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faShield, faGear, faLock, faClipboardList, faLink, faRocket, faGlobe, faFloppyDisk, faFileExport, faFileImport, faBoxArchive, faHandPointer, faHeart, faPlug, faPaperPlane, faEye, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import sharedStyles from '../styles.module.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Simple JWT Login Export-Import Add-on',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'WordPress Plugin',
  operatingSystem: 'WordPress 4.4+',
  description:
    'Copy your entire Simple JWT Login configuration - Auth Codes, protection rules, and settings - from one WordPress site to another in a few clicks.',
  url: 'https://github.com/simple-jwt-login/export-import',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'Nicu Micle', url: 'https://github.com/nicumicle' },
};

/* ── What gets exported ─────────────────────────────────────── */
const exportedItems = [
  { icon: faKey, label: 'Auth Codes', desc: 'All your authentication codes and their permissions.' },
  { icon: faShield, label: 'Protection Rules', desc: 'Every endpoint protection rule and HTTP method filter.' },
  { icon: faGear, label: 'General Settings', desc: 'Algorithms, TTL, CORS rules, token delivery, and more.' },
  { icon: faLock, label: 'JWT Configuration', desc: 'Payload fields, signing keys, and algorithm selection.' },
  { icon: faClipboardList, label: 'Allow / Deny Lists', desc: 'IP allow/deny rules and user-role restrictions.' },
  { icon: faLink, label: 'Redirect URLs', desc: 'Autologin and post-action redirect targets.' },
];

/* ── Use cases ──────────────────────────────────────────────── */
const useCases = [
  {
    icon: faRocket,
    title: 'Staging → production',
    description:
      'Perfect your configuration on staging, export it in one click, and apply it to production. No risk of config drift, no manual re-entry of settings.',
  },
  {
    icon: faGlobe,
    title: 'Multi-site replication',
    description:
      'Running a WordPress network? Export once and import to every node. Keep all your sites in sync with a single source of truth.',
  },
  {
    icon: faFloppyDisk,
    title: 'Backup & restore',
    description:
      'Before a major update or plugin change, export your configuration as a safety net. Restore it in seconds if anything goes wrong.',
  },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function ExportImportPage() {
  return (
    <Layout
      title="Export & Import Add-on - Simple JWT Login"
      description="Copy your entire Simple JWT Login configuration - Auth Codes, protection rules, and all settings - from one WordPress site to another in a few clicks."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}>Export &amp; Import Add-on</div>
          <h1 className={styles.heroTitle}>
            Move your config<br />
            <span className={styles.heroAccent}>in one click</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Export your complete Simple JWT Login setup - Auth Codes, rules, and settings -
            and reproduce it on any WordPress site instantly.
          </p>
          <div className={styles.heroCta}>
            <Link
              to="https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip"
              className={sharedStyles.actionButton}
              title="Download the add-on"
            >
              Download free →
            </Link>
            <Link to="/docs/export-import/" className={sharedStyles.btn} title="Read the documentation">
              Documentation
            </Link>
          </div>

          {/* Hero workflow preview */}
          <div className={styles.heroWorkflow}>
            <div className={styles.workflowSite}>
              <div className={styles.workflowSiteLabel}>Source site</div>
              <div className={styles.workflowSiteBox}>
                <span className={styles.workflowIcon}><FontAwesomeIcon icon={faFileExport} /></span>
                <strong>Export</strong>
                <p>Simple JWT Login → Export</p>
              </div>
            </div>
            <div className={styles.workflowArrow} aria-hidden="true">→</div>
            <div className={styles.workflowMiddle}>
              <div className={styles.workflowJson}>
                <span className={styles.workflowJsonIcon}>{ }</span>
                <span>config.json</span>
              </div>
            </div>
            <div className={styles.workflowArrow} aria-hidden="true">→</div>
            <div className={styles.workflowSite}>
              <div className={styles.workflowSiteLabel}>Destination site</div>
              <div className={styles.workflowSiteBox}>
                <span className={styles.workflowIcon}><FontAwesomeIcon icon={faFileImport} /></span>
                <strong>Import</strong>
                <p>Simple JWT Login → Import</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>

        {/* ── Highlights ────────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, styles.highlights)}>
          <div className="container">
            <div className={styles.highlightGrid}>
              {[
                { icon: faBoxArchive, text: 'Full config in one file' },
                { icon: faKey, text: 'Auth Codes included' },
                { icon: faHandPointer, text: 'No manual re-entry' },
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
            <h2 className={sharedStyles.sectionTitle}>Four steps to a perfect copy</h2>
            <div className={styles.stepsGrid}>
              {[
                { n: '1', icon: faPlug, title: 'Install on both sites', desc: 'Install Simple JWT Login and the Export-Import add-on on both the source and destination WordPress sites.' },
                { n: '2', icon: faPaperPlane, title: 'Export from source', desc: 'Go to Simple JWT Login settings on the source site and click Export to download your configuration.' },
                { n: '3', icon: faEye, title: 'Review the diff', desc: 'On the destination site paste the config. The add-on shows a diff of every change before you confirm.' },
                { n: '4', icon: faCircleCheck, title: 'Confirm & done', desc: 'Click Import. All settings, Auth Codes, and rules are applied instantly - no page reloads needed.' },
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

        {/* ── What gets exported ────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}>Coverage</span>
            <h2 className={sharedStyles.sectionTitle}>Everything, nothing left behind</h2>
            <p className={styles.sectionLead}>
              The export captures your complete configuration - every setting that matters.
            </p>
            <div className={styles.exportGrid}>
              {exportedItems.map(({ icon, label, desc }) => (
                <div key={label} className={styles.exportCard}>
                  <span className={styles.exportIcon}><FontAwesomeIcon icon={icon} /></span>
                  <div>
                    <h3 className={styles.exportLabel}>{label}</h3>
                    <p className={styles.exportDesc}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use cases ─────────────────────────────────────── */}
        <section className={clsx(sharedStyles.sectionPadding, sharedStyles.sectionGray)}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}>Use Cases</span>
            <h2 className={sharedStyles.sectionTitle}>Any time consistency matters</h2>
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

        {/* ── Installation ──────────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}>Getting Started</span>
            <h2 className={sharedStyles.sectionTitle}>Up and running in 4 steps</h2>
            <div className={styles.installSteps}>
              {[
                { n: '1', title: 'Install Simple JWT Login', desc: 'Make sure the core plugin is installed and active on all WordPress sites involved.' },
                { n: '2', title: 'Download the add-on', desc: 'Grab the zip from GitHub and upload it via Plugins → Add New → Upload Plugin on each site.' },
                { n: '3', title: 'Export your configuration', desc: 'On the source site go to Simple JWT Login settings and click Export. Save the generated JSON.' },
                { n: '4', title: 'Import on the destination', desc: 'On the destination site paste the JSON into the Import field, review the diff, and confirm.' },
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
              <Link
                to="https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip"
                className={sharedStyles.actionButton}
                title="Download the add-on"
              >
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
              <h2 className={styles.ctaTitle}>Stop re-entering config by hand</h2>
              <p className={styles.ctaSubtitle}>
                Install the free Export-Import add-on and move your complete
                Simple JWT Login setup to any site in seconds.
              </p>
              <div className={styles.ctaButtons}>
                <Link
                  to="https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip"
                  className={sharedStyles.actionButton}
                  title="Download the add-on"
                >
                  Download free →
                </Link>
                <Link to="/docs/export-import/" className={sharedStyles.btn} title="Read the documentation">
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
