import React, { useState, useMemo, useCallback } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faKey,
  faRocket,
  faCircleCheck,
  faTriangleExclamation,
  faSpinner,
  faShieldHalved,
  faServer,
  faPlug,
  faArrowUpRightFromSquare,
  faArrowRight,
  faCloud,
  faTrash,
  faCopy,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import styles from './deploy-wordpress.module.css';

// ── Constants ────────────────────────────────────────────────
const API_BASE = 'https://api.digitalocean.com/v2';
const REFERRAL_URL = 'https://m.do.co/c/7c1d4b687460';
const TOKEN_URL = 'https://cloud.digitalocean.com/account/api/tokens';

// Preferred default size (WordPress installs comfortably on 1vCPU / 2GB).
const PREFERRED_SIZE = 's-1vcpu-2gb';

// Simple JWT Login install sources. Stable comes from the WordPress.org
// directory; the v4 release candidate is shipped as a zip on the v4 branch.
const V4_RC_PLUGIN_ZIP =
  'https://github.com/nicumicle/simple-jwt-login/raw/v4/download/simple-jwt-login.zip';

// ── Helpers ──────────────────────────────────────────────────
async function doApi(path, token, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (res.status === 204) {
    return null;
  }

  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    const message =
      (body && body.message) ||
      (res.status === 401
        ? 'Invalid or expired token. Make sure it has write scope.'
        : `DigitalOcean API error (${res.status}).`);
    throw new Error(message);
  }

  return body;
}

// Newest Ubuntu LTS x64 base image - always available, no Marketplace needed.
function pickUbuntuImage(images) {
  const candidates = (images || []).filter(
    (img) =>
      img.distribution === 'Ubuntu' &&
      typeof img.slug === 'string' &&
      /^ubuntu-\d+-\d+-x64$/.test(img.slug) &&
      /LTS/i.test(img.name || ''),
  );
  const pool = candidates.length
    ? candidates
    : (images || []).filter(
        (img) => img.distribution === 'Ubuntu' && /^ubuntu-\d+-\d+-x64$/.test(img.slug || ''),
      );
  if (pool.length === 0) {
    return null;
  }
  pool.sort((a, b) => b.slug.localeCompare(a.slug, undefined, { numeric: true }));
  return pool[0].slug;
}

// Browser-side strong, bash/MySQL-safe (alphanumeric) password.
function generatePassword(length = 24) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const arr = new Uint32Array(length);
  window.crypto.getRandomValues(arr);
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += charset[arr[i] % charset.length];
  }
  return out;
}

// cloud-init script: full LAMP (Apache + mod_php + MariaDB) WordPress install,
// plugin optional. Mirrors the project CI's known-good Apache/mod_php setup.
function buildUserData({
  adminPassword,
  dbPassword,
  adminEmail,
  siteTitle,
  installPlugin,
  pluginVersion,
  rootPassword,
  enableHttps,
}) {
  // Stable installs by slug from WordPress.org; v4 RC installs from the zip on
  // the v4 branch (--force so it overrides any directory copy WP-CLI resolves).
  let pluginInstallCmd = '# Simple JWT Login install skipped';
  if (installPlugin) {
    pluginInstallCmd =
      pluginVersion === 'v4-rc'
        ? `wp plugin install ${V4_RC_PLUGIN_ZIP} --force --activate --allow-root`
        : 'wp plugin install simple-jwt-login --activate --allow-root';
  }

  const lines = [
    '#!/bin/bash',
    '# Full log for debugging: SSH in and read /var/log/wp-deploy.log',
    'exec > /var/log/wp-deploy.log 2>&1',
    'set -x',
    'export DEBIAN_FRONTEND=noninteractive',
    `ADMIN_PASS='${adminPassword}'`,
    `DB_PASS='${dbPassword}'`,
    `ADMIN_EMAIL='${adminEmail}'`,
    `SITE_TITLE='${siteTitle}'`,
    `ROOT_PASS='${rootPassword}'`,
    '# Set a root password and enable SSH password login up front, so the server',
    '# stays reachable for support/debugging even if a later install step fails.',
    'echo "root:${ROOT_PASS}" | chpasswd',
    "sed -i 's/^#\\?PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config",
    'mkdir -p /etc/ssh/sshd_config.d',
    "echo 'PasswordAuthentication yes' > /etc/ssh/sshd_config.d/99-wp-deploy.conf",
    'systemctl restart ssh 2>/dev/null || systemctl restart sshd 2>/dev/null || true',
    '# Add swap (best-effort) so small droplets do not OOM during install.',
    'if [ ! -f /swapfile ]; then',
    '  fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048',
    '  chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile',
    "  echo '/swapfile none swap sw 0 0' >> /etc/fstab",
    'fi',
    '# A fresh droplet runs apt-daily / unattended-upgrades at boot. Installing at',
    '# the same time corrupts package configure steps - this is what made the',
    '# mariadb-server install fail. Stop those jobs and wait for any apt/dpkg lock',
    '# to clear before we touch the package system.',
    'systemctl stop unattended-upgrades apt-daily.service apt-daily-upgrade.service apt-daily.timer apt-daily-upgrade.timer 2>/dev/null || true',
    'while fuser /var/lib/dpkg/lock-frontend /var/lib/dpkg/lock /var/lib/apt/lists/lock >/dev/null 2>&1; do sleep 2; done',
    '# Belt and braces: also let apt itself wait up to 10 min for any lock, and',
    '# repair any half-finished package state left over from boot.',
    'APT="apt-get -o DPkg::Lock::Timeout=600"',
    'dpkg --configure -a',
    '$APT update -y',
    '# Apache + mod_php - the same stack the project CI uses. PHP runs inside',
    '# Apache, so there is no fastcgi socket to wire (the cause of the earlier',
    '# 502/403 errors). Bring it up first with a holding page so visitors see',
    '# progress, not a connection error, while the rest installs.',
    '$APT install -y apache2',
    'systemctl enable apache2',
    'rm -f /var/www/html/index.html',
    "cat > /var/www/html/index.html <<'HOLD'",
    '<!doctype html><html><head><meta charset="utf-8"><title>Installing WordPress...</title>',
    '<meta http-equiv="refresh" content="15">',
    '<style>body{font-family:system-ui,sans-serif;background:#0d1e16;color:#e2e8f0;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;text-align:center}div{max-width:34rem;padding:2rem}h1{color:#85d8b5;font-size:1.6rem}p{color:#94a3b8;line-height:1.6}</style>',
    '</head><body><div><h1>Installing WordPress...</h1><p>Your server is setting everything up. This page refreshes automatically - your site will appear here in a few minutes.</p></div></body></html>',
    'HOLD',
    'systemctl restart apache2',
    '# If any step below fails, show a readable page instead of a bare 403/404.',
    'fail() { echo "<h1>WordPress install failed</h1><p>SSH in and read /var/log/wp-deploy.log to find the failing step.</p>" > /var/www/html/index.html; chown -R www-data:www-data /var/www/html; exit 1; }',
    '# Database + PHP. libapache2-mod-php embeds PHP in Apache; php-cli lets',
    '# WP-CLI (the `wp` command) run. These install while the holding page is live.',
    'PKGS="mariadb-server php libapache2-mod-php php-cli php-mysql php-curl php-gd php-xml php-mbstring php-zip php-intl curl unzip"',
    '# Retry once with a repair pass if the first configure fails (e.g. a service',
    '# start timed out on a busy boot) - this is what we saw with mariadb-server.',
    '$APT install -y $PKGS || { dpkg --configure -a; $APT -f install -y; $APT install -y $PKGS; }',
    '# If the database server still is not installed, stop with a clear message',
    '# instead of failing later on a missing socket.',
    'systemctl list-unit-files | grep -q "^mariadb.service" || fail',
    'systemctl enable --now mariadb',
    '# Give MariaDB time to finish starting, then wait until it actually answers',
    '# a real query - mysqladmin ping can report "alive" before it accepts',
    '# connections, which made the CREATE DATABASE / wp install steps fail.',
    'sleep 10',
    'for i in $(seq 1 30); do mysql -e "SELECT 1" >/dev/null 2>&1 && break; sleep 2; done',
    "mysql -e \"CREATE DATABASE IF NOT EXISTS wordpress; CREATE USER IF NOT EXISTS 'wordpress'@'localhost' IDENTIFIED BY '${DB_PASS}'; GRANT ALL ON wordpress.* TO 'wordpress'@'localhost'; FLUSH PRIVILEGES;\" || fail",
    '# Allow .htaccess + mod_rewrite so WordPress pretty permalinks work.',
    "cat > /etc/apache2/conf-available/wordpress.conf <<'ACONF'",
    '<Directory /var/www/html>',
    '  AllowOverride All',
    '</Directory>',
    'ACONF',
    'a2enmod rewrite',
    'a2enconf wordpress',
    'curl -sO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar',
    'chmod +x wp-cli.phar',
    'mv wp-cli.phar /usr/local/bin/wp',
    'rm -f /var/www/html/index.html',
    'cd /var/www/html',
    'wp core download --allow-root || fail',
    'wp config create --dbname=wordpress --dbuser=wordpress --dbpass="${DB_PASS}" --dbhost=localhost --allow-root || fail',
    'IP=$(curl -s http://169.254.169.254/metadata/v1/interfaces/public/0/ipv4/address)',
    '# Fall back to a public-IP service if the metadata API returns nothing, so',
    '# WordPress is never installed with an empty/broken site URL that 404s.',
    '[ -z "$IP" ] && IP=$(curl -s https://ifconfig.me)',
    'SITE_URL="http://${IP}"',
    // Optional free HTTPS via Let's Encrypt. A public CA will not certify a bare
    // IP, so derive a hostname from the IP via nip.io (it resolves straight back
    // to this IP) and let certbot obtain + install a real certificate for it.
    ...(enableHttps
      ? [
          'HOST="$(echo "$IP" | tr . -).nip.io"',
          '$APT install -y certbot python3-certbot-apache',
          'sed -i "s|#ServerName www.example.com|ServerName $HOST|" /etc/apache2/sites-available/000-default.conf',
          'systemctl reload apache2',
          '# Best-effort: stay on HTTP (the deploy still succeeds) if this fails.',
          'if certbot --apache --non-interactive --agree-tos --no-eff-email -m "$ADMIN_EMAIL" -d "$HOST" --redirect; then SITE_URL="https://$HOST"; fi',
        ]
      : ['# HTTPS not requested.']),
    'wp core install --url="$SITE_URL" --title="${SITE_TITLE}" --admin_user=admin --admin_password="${ADMIN_PASS}" --admin_email="${ADMIN_EMAIL}" --skip-email --allow-root || fail',
    pluginInstallCmd,
    'chown -R www-data:www-data /var/www/html',
    'systemctl restart apache2',
    '',
  ];
  return lines.join('\n');
}

// ── Sub-components ───────────────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      {children}
      {hint && <span className={styles.fieldHint}>{hint}</span>}
    </label>
  );
}

function CopyRow({ label, value, href }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be blocked; ignore silently.
    }
  }, [value]);

  return (
    <div className={styles.resultRow}>
      <span>{label}</span>
      <div className={styles.resultValue}>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            <code>{value}</code>
          </a>
        ) : (
          <code>{value}</code>
        )}
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconBtn}
            title={`Open ${label.toLowerCase()} in a new tab`}
            aria-label={`Open ${label.toLowerCase()} in a new tab`}
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        ) : (
          <button
            type="button"
            className={styles.iconBtn}
            onClick={copy}
            title={`Copy ${label.toLowerCase()}`}
            aria-label={`Copy ${label.toLowerCase()}`}
          >
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          </button>
        )}
      </div>
    </div>
  );
}

function ErrorBanner({ message }) {
  if (!message) {
    return null;
  }
  return (
    <div className={styles.errorBanner} role="alert">
      <FontAwesomeIcon icon={faTriangleExclamation} />
      <span>{message}</span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
function DeployWordPressPage() {
  // stage: 'token' | 'config' | 'deploying' | 'done'
  const [stage, setStage] = useState('token');
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [statusText, setStatusText] = useState('');

  // Fetched account data
  const [account, setAccount] = useState(null);
  const [regions, setRegions] = useState([]);
  const [sizesBySlug, setSizesBySlug] = useState({});
  const [sshKeys, setSshKeys] = useState([]);
  const [imageSlug, setImageSlug] = useState('');

  // Form state
  const [dropletName, setDropletName] = useState('wordpress-simple-jwt-login');
  const [siteTitle, setSiteTitle] = useState('My WordPress Site');
  const [region, setRegion] = useState('');
  const [size, setSize] = useState('');
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [installPlugin, setInstallPlugin] = useState(true);
  const [pluginVersion, setPluginVersion] = useState('stable');
  const [enableHttps, setEnableHttps] = useState(false);

  // Result
  const [result, setResult] = useState(null); // { name, ip, username, password, pluginInstalled }

  // Sizes available in the currently selected region, priced + sorted.
  const availableSizes = useMemo(() => {
    const reg = regions.find((r) => r.slug === region);
    if (!reg) {
      return [];
    }
    return reg.sizes
      .filter((slug) => slug.startsWith('s-') && sizesBySlug[slug])
      .map((slug) => sizesBySlug[slug])
      .sort((a, b) => a.price_monthly - b.price_monthly);
  }, [regions, region, sizesBySlug]);

  // Step 1: validate token + load account resources 
  const handleConnect = useCallback(
    async (e) => {
      e.preventDefault();
      if (!token.trim()) {
        return;
      }
      setBusy(true);
      setError('');
      try {
        const tk = token.trim();
        const [acct, regionsRes, sizesRes, keysRes, imagesRes] = await Promise.all([
          doApi('/account', tk),
          doApi('/regions?per_page=100', tk),
          doApi('/sizes?per_page=200', tk),
          doApi('/account/keys?per_page=200', tk),
          doApi('/images?type=distribution&per_page=200', tk),
        ]);

        const ubuntu = pickUbuntuImage(imagesRes.images);
        if (!ubuntu) {
          throw new Error('Could not find an Ubuntu base image on this account.');
        }

        const sizeMap = {};
        sizesRes.sizes.forEach((s) => {
          sizeMap[s.slug] = s;
        });

        const availRegions = regionsRes.regions.filter((r) => r.available);
        const firstRegion = availRegions[0]?.slug || '';
        const firstRegionSizes = availRegions[0]?.sizes || [];
        const defaultSize = firstRegionSizes.includes(PREFERRED_SIZE)
          ? PREFERRED_SIZE
          : firstRegionSizes.find((s) => s.startsWith('s-')) || '';

        setAccount(acct.account);
        setRegions(availRegions);
        setSizesBySlug(sizeMap);
        setSshKeys(keysRes.ssh_keys || []);
        setSelectedKeys((keysRes.ssh_keys || []).map((k) => k.id));
        setImageSlug(ubuntu);
        setRegion(firstRegion);
        setSize(defaultSize);
        setStage('config');
      } catch (err) {
        setError(err.message);
      } finally {
        setBusy(false);
      }
    },
    [token],
  );

  // Keep size valid whenever the region changes.
  const handleRegionChange = useCallback(
    (slug) => {
      setRegion(slug);
      const reg = regions.find((r) => r.slug === slug);
      const regionSizes = reg?.sizes || [];
      setSize((prev) => {
        if (regionSizes.includes(prev)) {
          return prev;
        }
        if (regionSizes.includes(PREFERRED_SIZE)) {
          return PREFERRED_SIZE;
        }
        return regionSizes.find((s) => s.startsWith('s-')) || '';
      });
    },
    [regions],
  );

  const toggleKey = useCallback((id) => {
    setSelectedKeys((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id],
    );
  }, []);

  // Step 2: create the droplet + poll until it is live
  const handleDeploy = useCallback(
    async (e) => {
      e.preventDefault();
      setBusy(true);
      setError('');
      setStage('deploying');
      setStatusText('Creating your droplet…');
      const tk = token.trim();

      const adminPassword = generatePassword();
      const dbPassword = generatePassword();
      const rootPassword = generatePassword();
      const cleanTitle = (siteTitle.trim() || 'My WordPress Site').replace(/'/g, '');

      try {
        const userData = buildUserData({
          adminPassword,
          dbPassword,
          adminEmail: account.email,
          siteTitle: cleanTitle,
          installPlugin,
          pluginVersion,
          rootPassword,
          enableHttps,
        });

        const created = await doApi('/droplets', tk, {
          method: 'POST',
          body: JSON.stringify({
            name: dropletName.trim() || 'wordpress-simple-jwt-login',
            region,
            size,
            image: imageSlug,
            ssh_keys: selectedKeys,
            backups: false,
            ipv6: true,
            monitoring: true,
            user_data: userData,
            tags: ['simple-jwt-login', 'wordpress'],
          }),
        });
        const id = created.droplet.id;

        // Poll for the droplet to become active and report its IP.
        setStatusText('Booting your server…');
        let ip = null;
        for (let attempt = 0; attempt < 96; attempt += 1) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((r) => setTimeout(r, 5000));
          // eslint-disable-next-line no-await-in-loop
          const poll = await doApi(`/droplets/${id}`, tk);
          const d = poll.droplet;
          const publicV4 = (d.networks?.v4 || []).find((n) => n.type === 'public');
          if (d.status === 'active' && publicV4) {
            ip = publicV4.ip_address;
            break;
          }
        }

        if (!ip) {
          throw new Error(
            'The droplet was created but did not report an IP in time. Check your DigitalOcean dashboard.',
          );
        }

        const httpsHost = enableHttps ? `${ip.split('.').join('-')}.nip.io` : null;
        const siteUrl = httpsHost ? `https://${httpsHost}` : `http://${ip}`;
        setResult({
          id,
          name: dropletName.trim() || 'wordpress-simple-jwt-login',
          ip,
          username: 'admin',
          password: adminPassword,
          pluginInstalled: installPlugin,
          pluginVersion,
          rootPassword,
          siteUrl,
          adminUrl: `${siteUrl}/wp-admin`,
        });
        setStage('done');
      } catch (err) {
        setError(err.message);
        setStage('config');
      } finally {
        setBusy(false);
      }
    },
    [
      token,
      dropletName,
      siteTitle,
      region,
      size,
      imageSlug,
      selectedKeys,
      installPlugin,
      pluginVersion,
      enableHttps,
      account,
    ],
  );

  const reset = useCallback(() => {
    setStage('config');
    setResult(null);
    setError('');
  }, []);

  // Permanently destroy the droplet we just created.
  const handleDelete = useCallback(async () => {
    if (!result) {
      return;
    }
    const ok = window.confirm(
      `Permanently destroy "${result.name}" (${result.ip})? This deletes the server and all its data. This cannot be undone.`,
    );
    if (!ok) {
      return;
    }
    setBusy(true);
    setError('');
    try {
      await doApi(`/droplets/${result.id}`, token.trim(), { method: 'DELETE' });
      setResult(null);
      setStage('config');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }, [result, token]);

  const selectedSize = sizesBySlug[size];

  return (
    <Layout
      title="Deploy WordPress on DigitalOcean - One Click"
      description="Spin up a fully installed WordPress site on DigitalOcean in one click, with Simple JWT Login pre-installed. Your API token never leaves your browser."
    >
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroBadge}>
            <FontAwesomeIcon icon={faCloud} /> Powered by DigitalOcean
          </div>
          <h1 className={styles.heroTitle}>
            Launch WordPress in <span className={styles.heroAccent}>one click</span>
          </h1>
          <a
            href="https://www.digitalocean.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroLogo}
            title="DigitalOcean - cloud infrastructure"
          >
            <img
              src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_horizontal_white.svg"
              alt="DigitalOcean"
              width="180"
              height="auto"
            />
          </a>
          <p className={styles.heroSubtitle}>
            Spin up a fully installed WordPress server on DigitalOcean - with
            Simple JWT Login ready for headless and REST API authentication. No
            Marketplace setup, no terminal, no install wizard. We hand you the
            login.
          </p>
          <p className={styles.heroNote}>
            <FontAwesomeIcon icon={faShieldHalved} /> Your API token is used
            only in your browser to talk to DigitalOcean. It is never sent to
            us or stored anywhere.
          </p>
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.deployGrid}>
              {/* ── Left: the interactive deployer ─────────── */}
              <div className={styles.deployCard}>
                <ErrorBanner message={error} />

                {stage === 'token' && (
                  <form onSubmit={handleConnect}>
                    <h2 className={styles.cardTitle}>
                      <FontAwesomeIcon icon={faKey} /> Connect your account
                    </h2>
                    <p className={styles.cardLead}>
                      Paste a DigitalOcean Personal Access Token with{' '}
                      <strong>write</strong> scope to get started.
                    </p>
                    <Field
                      label="DigitalOcean API token"
                      hint={
                        <>
                          Create one at{' '}
                          <Link to={TOKEN_URL}>
                            cloud.digitalocean.com/account/api/tokens
                          </Link>{' '}
                          (enable the <em>Write</em> scope).
                        </>
                      }
                    >
                      <input
                        type="password"
                        className={styles.input}
                        placeholder="dop_v1_…"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        autoComplete="off"
                        spellCheck="false"
                        required
                      />
                    </Field>
                    <button
                      type="submit"
                      className={styles.primaryBtn}
                      disabled={busy || !token.trim()}
                    >
                      {busy ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} spin /> Connecting…
                        </>
                      ) : (
                        <>
                          Connect <FontAwesomeIcon icon={faArrowRight} />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {(stage === 'config' || stage === 'deploying') && (
                  <form onSubmit={handleDeploy}>
                    <h2 className={styles.cardTitle}>
                      <FontAwesomeIcon icon={faServer} /> Configure your server
                    </h2>
                    {account && (
                      <p className={styles.cardLead}>
                        Connected as <strong>{account.email}</strong>. Base image:{' '}
                        <code>{imageSlug}</code>
                      </p>
                    )}

                    <Field label="Server name">
                      <input
                        type="text"
                        className={styles.input}
                        value={dropletName}
                        onChange={(e) => setDropletName(e.target.value)}
                        disabled={busy}
                      />
                    </Field>

                    <Field label="Site title">
                      <input
                        type="text"
                        className={styles.input}
                        value={siteTitle}
                        onChange={(e) => setSiteTitle(e.target.value)}
                        disabled={busy}
                      />
                    </Field>

                    <Field label="Region">
                      <select
                        className={styles.input}
                        value={region}
                        onChange={(e) => handleRegionChange(e.target.value)}
                        disabled={busy}
                      >
                        {regions.map((r) => (
                          <option key={r.slug} value={r.slug}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      label="Plan"
                      hint="WordPress needs at least 1 GB RAM. 512 MB plans may fail to install."
                    >
                      <select
                        className={styles.input}
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        disabled={busy}
                      >
                        {availableSizes.map((s) => (
                          <option key={s.slug} value={s.slug}>
                            {s.vcpus} vCPU · {s.memory / 1024} GB RAM · {s.disk} GB
                            SSD - ${s.price_monthly}/mo
                          </option>
                        ))}
                      </select>
                    </Field>

                    {sshKeys.length > 0 ? (
                      <Field
                        label="SSH keys"
                        hint="Selected keys are added so you can SSH in."
                      >
                        <div className={styles.keyList}>
                          {sshKeys.map((k) => (
                            <label key={k.id} className={styles.checkRow}>
                              <input
                                type="checkbox"
                                checked={selectedKeys.includes(k.id)}
                                onChange={() => toggleKey(k.id)}
                                disabled={busy}
                              />
                              <span>{k.name}</span>
                            </label>
                          ))}
                        </div>
                      </Field>
                    ) : (
                      <p className={styles.infoHint}>
                        <FontAwesomeIcon icon={faKey} /> No SSH keys on your
                        account - that is fine, you will get your WordPress admin
                        login here when the deploy finishes.
                      </p>
                    )}

                    <label className={styles.checkRow}>
                      <input
                        type="checkbox"
                        checked={installPlugin}
                        onChange={(e) => setInstallPlugin(e.target.checked)}
                        disabled={busy}
                      />
                      <span>
                        <FontAwesomeIcon icon={faPlug} /> Pre-install &amp;
                        activate Simple JWT Login
                      </span>
                    </label>

                    {installPlugin && (
                      <Field
                        label="Plugin version"
                        hint="Stable is the latest release from WordPress.org. The v4 release candidate adds API Keys, 2FA, Audit Logs, and Webhooks."
                      >
                        <select
                          className={styles.input}
                          value={pluginVersion}
                          onChange={(e) => setPluginVersion(e.target.value)}
                          disabled={busy}
                        >
                          <option value="stable">Stable (WordPress.org)</option>
                          <option value="v4-rc">v4 Release Candidate</option>
                        </select>
                      </Field>
                    )}

                    <label className={styles.checkRow}>
                      <input
                        type="checkbox"
                        checked={enableHttps}
                        onChange={(e) => setEnableHttps(e.target.checked)}
                        disabled={busy}
                      />
                      <span>
                        <FontAwesomeIcon icon={faShieldHalved} /> Set up free
                        HTTPS (Let&apos;s Encrypt)
                      </span>
                    </label>
                    {enableHttps && (
                      <p className={styles.infoHint}>
                        <span>
                          Since the droplet has no domain, we use a free{' '}
                          <code>nip.io</code> hostname (e.g.{' '}
                          <code>your-ip.nip.io</code>) and get a real
                          Let&apos;s Encrypt certificate for it. Your site URL
                          becomes that HTTPS address. If certification fails,
                          the deploy still completes over HTTP.
                        </span>
                      </p>
                    )}

                    {selectedSize && (
                      <div className={styles.priceRow}>
                        <span>Estimated cost</span>
                        <strong>
                          ${selectedSize.price_monthly}/mo · $
                          {selectedSize.price_hourly?.toFixed(3)}/hr
                        </strong>
                      </div>
                    )}

                    <button
                      type="submit"
                      className={styles.primaryBtn}
                      disabled={busy || !region || !size}
                    >
                      {stage === 'deploying' ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} spin /> {statusText}
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faRocket} /> Deploy WordPress
                        </>
                      )}
                    </button>
                    {stage === 'deploying' && (
                      <p className={styles.infoHint}>
                        Provisioning the server usually takes 2-4 minutes. Keep
                        this tab open - your login appears here when it is ready.
                      </p>
                    )}
                  </form>
                )}

                {stage === 'done' && result && (
                  <div className={styles.success}>
                    <div className={styles.successIcon}>
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                    <h2 className={styles.cardTitle}>Your WordPress server is live</h2>
                    <p className={styles.cardLead}>
                      <strong>{result.name}</strong> is up. WordPress finishes
                      installing in the background - usually 2-4 minutes.
                    </p>

                    <p className={styles.credsLabel}>
                      <FontAwesomeIcon icon={faKey} /> WordPress login
                    </p>
                    <div className={styles.creds}>
                      <CopyRow
                        label="Site"
                        value={result.siteUrl}
                        href={result.siteUrl}
                      />
                      <CopyRow
                        label="Admin"
                        value={result.adminUrl}
                        href={result.adminUrl}
                      />
                      <CopyRow label="Username" value={result.username} />
                      <CopyRow label="Password" value={result.password} />
                    </div>

                    <p className={styles.credsLabel}>
                      <FontAwesomeIcon icon={faServer} /> SSH access
                    </p>
                    <div className={styles.creds}>
                      <CopyRow label="Command" value={`ssh root@${result.ip}`} />
                      <CopyRow label="Root password" value={result.rootPassword} />
                    </div>

                    <p className={styles.warnHint}>
                      <FontAwesomeIcon icon={faTriangleExclamation} /> Save the
                      admin and SSH root passwords now - they are shown only once
                      and never leave this page.
                    </p>

                    <a
                      href={result.adminUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.primaryBtn}
                    >
                      Open wp-admin <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                    <p className={styles.infoHint}>
                      You will first see an "Installing WordPress" page that
                      auto-refreshes. A brief connection error just means the
                      server is still booting - give it a few minutes.
                      {result.pluginInstalled
                        ? ` Simple JWT Login${
                            result.pluginVersion === 'v4-rc'
                              ? ' (v4 release candidate)'
                              : ''
                          } is activated automatically once the install finishes.`
                        : ''}
                    </p>
                    <div className={styles.successActions}>
                      <button
                        type="button"
                        className={styles.secondaryBtn}
                        onClick={reset}
                        disabled={busy}
                      >
                        Deploy another
                      </button>
                      <button
                        type="button"
                        className={styles.dangerBtn}
                        onClick={handleDelete}
                        disabled={busy}
                      >
                        {busy ? (
                          <>
                            <FontAwesomeIcon icon={faSpinner} spin /> Destroying…
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faTrash} /> Destroy droplet
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Right: context / no-account path ───────── */}
              <aside className={styles.sideCard}>
                <h3 className={styles.sideTitle}>How it works</h3>
                <ol className={styles.howList}>
                  <li>Paste a DigitalOcean API token (write scope).</li>
                  <li>Pick a region and a plan.</li>
                  <li>
                    We provision an Ubuntu server, install WordPress + Simple JWT
                    Login automatically, and hand you the admin login.
                  </li>
                </ol>

                <div className={styles.divider} />

                <h3 className={styles.sideTitle}>No DigitalOcean account?</h3>
                <p className={styles.sideText}>
                  Sign up with our link and get free credit to launch your first
                  WordPress server.
                </p>
                <Link to={REFERRAL_URL} className={styles.referralBtn}>
                  Get $200 in credit <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>
                <p className={styles.sideFinePrint}>
                  Already have an account? Just paste your token on the left.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default DeployWordPressPage;
