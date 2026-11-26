import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
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
  description: translate({id: 'ecosystem.exportImport.jsonLd.description', message: 'Copy your entire Simple JWT Login configuration - Auth Codes, protection rules, and settings - from one WordPress site to another in a few clicks.'}),
  url: 'https://github.com/simple-jwt-login/export-import',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'Nicu Micle', url: 'https://github.com/nicumicle' },
};

/* ── What gets exported ─────────────────────────────────────── */
const exportedItems = [
  { icon: faKey, label: translate({id: 'ecosystem.exportImport.exported.authCodes.label', message: 'Auth Codes'}), desc: translate({id: 'ecosystem.exportImport.exported.authCodes.desc', message: 'All your authentication codes and their permissions.'}) },
  { icon: faShield, label: translate({id: 'ecosystem.exportImport.exported.rules.label', message: 'Protection Rules'}), desc: translate({id: 'ecosystem.exportImport.exported.rules.desc', message: 'Every endpoint protection rule and HTTP method filter.'}) },
  { icon: faGear, label: translate({id: 'ecosystem.exportImport.exported.general.label', message: 'General Settings'}), desc: translate({id: 'ecosystem.exportImport.exported.general.desc', message: 'Algorithms, TTL, CORS rules, token delivery, and more.'}) },
  { icon: faLock, label: translate({id: 'ecosystem.exportImport.exported.jwt.label', message: 'JWT Configuration'}), desc: translate({id: 'ecosystem.exportImport.exported.jwt.desc', message: 'Payload fields, signing keys, and algorithm selection.'}) },
  { icon: faClipboardList, label: translate({id: 'ecosystem.exportImport.exported.lists.label', message: 'Allow / Deny Lists'}), desc: translate({id: 'ecosystem.exportImport.exported.lists.desc', message: 'IP allow/deny rules and user-role restrictions.'}) },
  { icon: faLink, label: translate({id: 'ecosystem.exportImport.exported.redirects.label', message: 'Redirect URLs'}), desc: translate({id: 'ecosystem.exportImport.exported.redirects.desc', message: 'Autologin and post-action redirect targets.'}) },
];

/* ── Use cases ──────────────────────────────────────────────── */
const useCases = [
  {
    icon: faRocket,
    title: translate({id: 'ecosystem.exportImport.useCases.staging.title', message: 'Staging → production'}),
    description:
      translate({id: 'ecosystem.exportImport.useCases.staging.description', message: 'Perfect your configuration on staging, export it in one click, and apply it to production. No risk of config drift, no manual re-entry of settings.'}),
  },
  {
    icon: faGlobe,
    title: translate({id: 'ecosystem.exportImport.useCases.multisite.title', message: 'Multi-site replication'}),
    description:
      translate({id: 'ecosystem.exportImport.useCases.multisite.description', message: 'Running a WordPress network? Export once and import to every node. Keep all your sites in sync with a single source of truth.'}),
  },
  {
    icon: faFloppyDisk,
    title: translate({id: 'ecosystem.exportImport.useCases.backup.title', message: 'Backup & restore'}),
    description:
      translate({id: 'ecosystem.exportImport.useCases.backup.description', message: 'Before a major update or plugin change, export your configuration as a safety net. Restore it in seconds if anything goes wrong.'}),
  },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function ExportImportPage() {
  return (
    <Layout
      title={translate({id: 'ecosystem.exportImport.meta.title', message: 'Export & Import Add-on - Simple JWT Login'})}
      description={translate({id: 'ecosystem.exportImport.meta.description', message: 'Copy your entire Simple JWT Login configuration - Auth Codes, protection rules, and all settings - from one WordPress site to another in a few clicks.'})}
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* ── Hero ──────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}><Translate id="ecosystem.exportImport.hero.badge">{'Export & Import Add-on'}</Translate></div>
          <h1 className={styles.heroTitle}>
            <Translate id="ecosystem.exportImport.hero.title1">{'Move your config'}</Translate><br />
            <span className={styles.heroAccent}><Translate id="ecosystem.exportImport.hero.title2">{'in one click'}</Translate></span>
          </h1>
          <p className={styles.heroSubtitle}>
            <Translate id="ecosystem.exportImport.hero.subtitle">{'Export your complete Simple JWT Login setup - Auth Codes, rules, and settings - and reproduce it on any WordPress site instantly.'}</Translate>
          </p>
          <div className={styles.heroCta}>
            <Link
              to="https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip"
              className={sharedStyles.actionButton}
              title={translate({id: 'ecosystem.exportImport.hero.downloadTitle', message: 'Download the add-on'})}
            >
              <Translate id="ecosystem.exportImport.hero.download">{'Download free →'}</Translate>
            </Link>
            <Link to="/docs/export-import/" className={sharedStyles.btn} title={translate({id: 'ecosystem.exportImport.hero.docsTitle', message: 'Read the documentation'})}>
              <Translate id="ecosystem.exportImport.hero.docs">{'Documentation'}</Translate>
            </Link>
          </div>

          {/* Hero workflow preview */}
          <div className={styles.heroWorkflow}>
            <div className={styles.workflowSite}>
              <div className={styles.workflowSiteLabel}><Translate id="ecosystem.exportImport.workflow.source">{'Source site'}</Translate></div>
              <div className={styles.workflowSiteBox}>
                <span className={styles.workflowIcon}><FontAwesomeIcon icon={faFileExport} /></span>
                <strong><Translate id="ecosystem.exportImport.workflow.export">{'Export'}</Translate></strong>
                <p><Translate id="ecosystem.exportImport.workflow.exportPath">{'Simple JWT Login → Export'}</Translate></p>
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
              <div className={styles.workflowSiteLabel}><Translate id="ecosystem.exportImport.workflow.destination">{'Destination site'}</Translate></div>
              <div className={styles.workflowSiteBox}>
                <span className={styles.workflowIcon}><FontAwesomeIcon icon={faFileImport} /></span>
                <strong><Translate id="ecosystem.exportImport.workflow.import">{'Import'}</Translate></strong>
                <p><Translate id="ecosystem.exportImport.workflow.importPath">{'Simple JWT Login → Import'}</Translate></p>
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
                { icon: faBoxArchive, text: translate({id: 'ecosystem.exportImport.highlights.fullConfig', message: 'Full config in one file'}) },
                { icon: faKey, text: translate({id: 'ecosystem.exportImport.highlights.authCodes', message: 'Auth Codes included'}) },
                { icon: faHandPointer, text: translate({id: 'ecosystem.exportImport.highlights.noReentry', message: 'No manual re-entry'}) },
                { icon: faHeart, text: translate({id: 'ecosystem.exportImport.highlights.free', message: 'Free & open source'}) },
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
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.exportImport.how.eyebrow">{'How it works'}</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.exportImport.how.title">{'Four steps to a perfect copy'}</Translate></h2>
            <div className={styles.stepsGrid}>
              {[
                { n: '1', icon: faPlug, title: translate({id: 'ecosystem.exportImport.how.install.title', message: 'Install on both sites'}), desc: translate({id: 'ecosystem.exportImport.how.install.desc', message: 'Install Simple JWT Login and the Export-Import add-on on both the source and destination WordPress sites.'}) },
                { n: '2', icon: faPaperPlane, title: translate({id: 'ecosystem.exportImport.how.export.title', message: 'Export from source'}), desc: translate({id: 'ecosystem.exportImport.how.export.desc', message: 'Go to Simple JWT Login settings on the source site and click Export to download your configuration.'}) },
                { n: '3', icon: faEye, title: translate({id: 'ecosystem.exportImport.how.review.title', message: 'Review the diff'}), desc: translate({id: 'ecosystem.exportImport.how.review.desc', message: 'On the destination site paste the config. The add-on shows a diff of every change before you confirm.'}) },
                { n: '4', icon: faCircleCheck, title: translate({id: 'ecosystem.exportImport.how.confirm.title', message: 'Confirm & done'}), desc: translate({id: 'ecosystem.exportImport.how.confirm.desc', message: 'Click Import. All settings, Auth Codes, and rules are applied instantly - no page reloads needed.'}) },
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
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.exportImport.coverage.eyebrow">{'Coverage'}</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.exportImport.coverage.title">{'Everything, nothing left behind'}</Translate></h2>
            <p className={styles.sectionLead}>
              <Translate id="ecosystem.exportImport.coverage.lead">{'The export captures your complete configuration - every setting that matters.'}</Translate>
            </p>
            <div className={styles.exportGrid}>
              {exportedItems.map(({ icon, label, desc }) => (
                <div key={icon.iconName} className={styles.exportCard}>
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
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.exportImport.useCases.eyebrow">{'Use Cases'}</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.exportImport.useCases.title">{'Any time consistency matters'}</Translate></h2>
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

        {/* ── Installation ──────────────────────────────────── */}
        <section className={sharedStyles.sectionPadding}>
          <div className="container">
            <span className={sharedStyles.sectionEyebrow}><Translate id="ecosystem.exportImport.install.eyebrow">{'Getting Started'}</Translate></span>
            <h2 className={sharedStyles.sectionTitle}><Translate id="ecosystem.exportImport.install.title">{'Up and running in 4 steps'}</Translate></h2>
            <div className={styles.installSteps}>
              {[
                { n: '1', title: translate({id: 'ecosystem.exportImport.install.core.title', message: 'Install Simple JWT Login'}), desc: translate({id: 'ecosystem.exportImport.install.core.desc', message: 'Make sure the core plugin is installed and active on all WordPress sites involved.'}) },
                { n: '2', title: translate({id: 'ecosystem.exportImport.install.download.title', message: 'Download the add-on'}), desc: translate({id: 'ecosystem.exportImport.install.download.desc', message: 'Grab the zip from GitHub and upload it via Plugins → Add New → Upload Plugin on each site.'}) },
                { n: '3', title: translate({id: 'ecosystem.exportImport.install.export.title', message: 'Export your configuration'}), desc: translate({id: 'ecosystem.exportImport.install.export.desc', message: 'On the source site go to Simple JWT Login settings and click Export. Save the generated JSON.'}) },
                { n: '4', title: translate({id: 'ecosystem.exportImport.install.import.title', message: 'Import on the destination'}), desc: translate({id: 'ecosystem.exportImport.install.import.desc', message: 'On the destination site paste the JSON into the Import field, review the diff, and confirm.'}) },
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
                title={translate({id: 'ecosystem.exportImport.install.downloadTitle', message: 'Download the add-on'})}
              >
                <Translate id="ecosystem.exportImport.install.download">{'Download free →'}</Translate>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <h2 className={styles.ctaTitle}><Translate id="ecosystem.exportImport.cta.title">{'Stop re-entering config by hand'}</Translate></h2>
              <p className={styles.ctaSubtitle}>
                <Translate id="ecosystem.exportImport.cta.subtitle">{'Install the free Export-Import add-on and move your complete Simple JWT Login setup to any site in seconds.'}</Translate>
              </p>
              <div className={styles.ctaButtons}>
                <Link
                  to="https://github.com/simple-jwt-login/export-import/archive/refs/heads/master.zip"
                  className={sharedStyles.actionButton}
                  title={translate({id: 'ecosystem.exportImport.cta.downloadTitle', message: 'Download the add-on'})}
                >
                  <Translate id="ecosystem.exportImport.cta.download">{'Download free →'}</Translate>
                </Link>
                <Link to="/docs/export-import/" className={sharedStyles.btn} title={translate({id: 'ecosystem.exportImport.cta.docsTitle', message: 'Read the documentation'})}>
                  <Translate id="ecosystem.exportImport.cta.docs">{'Documentation'}</Translate>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
