import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faListCheck, faArrowRight, faUsersGear } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles.module.css';
import ex from './demo.module.css';

const demos = [
  {
    icon: faCartShopping,
    title: 'Headless WooCommerce store',
    desc: 'Manage products, add to cart, and check out with only a JWT - no consumer key/secret and no nonce.',
    tags: ['WooCommerce', 'Store API', 'Vanilla JS'],
    to: '/demos/woocommerce',
  },
  {
    icon: faListCheck,
    title: 'Todo app',
    desc: 'A minimal todo app where each todo is a private WordPress post, authenticated with a JWT.',
    tags: ['WP REST API', 'Private posts', 'Vanilla JS'],
    to: '/demos/todo',
  },
  {
    icon: faUsersGear,
    title: 'WordPress user management',
    desc: 'List, search, and delete WordPress users with only a JWT - Administrator role required.',
    tags: ['WP REST API', 'Users', 'Vanilla JS'],
    to: '/demos/user-management',
  },
];

export default function DemosPage() {
  return (
    <Layout
      title="Interactive Demos"
      description="Run Simple JWT Login demos live in your browser - a headless WooCommerce store and a JWT-authenticated todo app, both in vanilla JavaScript."
    >
      <main className={styles.sectionPadding}>
        <div className="container">
          <span className={styles.sectionEyebrow}>Try it live</span>
          <h1 className={styles.sectionTitle}>Interactive Demos</h1>
          <p className={styles.sectionLead}>
            Run each demo right here in your browser against your own WordPress site.
            Nothing is sent anywhere except the WordPress URL you provide - the demos run
            entirely client-side and talk directly to your install.
          </p>

          <div className={ex.grid}>
            {demos.map(({ icon, title, desc, tags, to }) => (
              <Link key={to} to={to} className={ex.card}>
                <span className={ex.cardIconWrap}>
                  <FontAwesomeIcon icon={icon} />
                </span>
                <h3 className={ex.cardTitle}>{title}</h3>
                <p className={ex.cardDesc}>{desc}</p>
                <div className={ex.tags}>
                  {tags.map((t) => (
                    <span key={t} className={ex.tag}>{t}</span>
                  ))}
                </div>
                <span className={ex.cardCta}>
                  Open demo <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
