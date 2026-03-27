import React from 'react';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const PAYPAL_URL =
  'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PK9BCD6AYF58Y&source=url';

const generalLinks = [
  { label: 'Documentation', to: '/docs/' },
  { label: 'API Reference', to: '/api/simple-jwt-login' },
  { label: 'Ecosystem', to: '/ecosystem/' },
  { label: 'Releases', to: '/releases/' },
  { label: 'Donate', to: '/donate/' },
];

const helpLinks = [
  { label: 'WordPress Plugin Page', href: 'https://wordpress.org/plugins/simple-jwt-login' },
  { label: 'Support Forum', href: 'https://wordpress.org/support/plugin/simple-jwt-login' },
  { label: 'Report an Issue', href: 'https://github.com/nicumicle/simple-jwt-login/issues' },
  { label: 'Contact', to: '/contact/' },
];

const connectLinks = [
  { label: 'GitHub Repository', href: 'https://github.com/nicumicle/simple-jwt-login' },
  { label: 'Discord Community', href: 'https://discord.gg/c4AeefD8Dr' },
  { label: 'X (Twitter)', href: 'https://twitter.com/simplejwtlogin' },
  { label: 'Blog', to: '/blog/' },
];

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.731-8.83-8.161-10.67H7.07l4.254 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function FooterLink({ label, to, href }) {
  if (href) {
    return (
      <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link to={to} className={styles.link}>
      {label}
    </Link>
  );
}

function LinkColumn({ title, links }) {
  return (
    <div className={styles.col}>
      <h3 className={styles.colTitle}>{title}</h3>
      <ul className={styles.linkList}>
        {links.map((l) => (
          <li key={l.label}>
            <FooterLink {...l} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* ── Sponsors banner ──────────────────────────────────── */}
      <div className={styles.sponsorsBanner}>
        <div className="container">
          <div className={styles.sponsorsInner}>
            <div className={styles.sponsorsLabel}>
              <span className={styles.sponsorsDot} />
                This project is supported by:
            </div>
            <div className={styles.sponsorsLogos}>
              <a
                href="https://www.digitalocean.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sponsorLogo}
                title="DigitalOcean — cloud infrastructure sponsor"
              >
                <img
                  src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_horizontal_blue.svg"
                  alt="DigitalOcean"
                  width="140"
                  height="auto"
                />
              </a>
            </div>
            {/* <div className={styles.sponsorsBecome}>
              <a
                href="mailto:contact@simplejwtlogin.com"
                className={styles.sponsorsBecomeCta}
              >
                Become a sponsor →
              </a>
            </div> */}
          </div>
        </div>
      </div>

      

      {/* ── Main footer columns ───────────────────────────────── */}
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>

            {/* Brand column */}
            <div className={styles.brandCol}>
              <div className={styles.brandLogo}>
                <img src="/assets/favicons/favicon.ico" alt="" width="28" height="28" />
                <span className={styles.brandName}>Simple JWT Login</span>
              </div>
              <p className={styles.brandDesc}>
                JWT authentication for WordPress — REST API, headless WP, WPGraphQL,
                and WP-CLI. Free and open-source, forever.
              </p>
              <div className={styles.socialIcons}>
                <a
                  href="https://github.com/nicumicle/simple-jwt-login"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className={styles.socialIcon}
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://discord.gg/c4AeefD8Dr"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Discord"
                  className={styles.socialIcon}
                >
                  <DiscordIcon />
                </a>
                <a
                  href="https://twitter.com/simplejwtlogin"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X (Twitter)"
                  className={styles.socialIcon}
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>

            <LinkColumn title="Links" links={generalLinks} />
            <LinkColumn title="Get Help" links={helpLinks} />
            <LinkColumn title="Connect" links={connectLinks} />

          </div>
        </div>
      </div>
    </footer>
  );
}
