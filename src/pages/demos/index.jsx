import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faListCheck, faArrowRight, faUsersGear } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles.module.css';
import ex from './demo.module.css';

const demos = [
  {
    icon: faCartShopping,
    title: translate({id: 'demos.index.woocommerce.title', message: 'Headless WooCommerce store'}),
    desc: translate({id: 'demos.index.woocommerce.desc', message: 'Manage products, add to cart, and check out with only a JWT - no consumer key/secret and no nonce.'}),
    tags: ['WooCommerce', 'Store API', 'Vanilla JS'],
    to: '/demos/woocommerce',
  },
  {
    icon: faListCheck,
    title: translate({id: 'demos.index.todo.title', message: 'Todo app'}),
    desc: translate({id: 'demos.index.todo.desc', message: 'A minimal todo app where each todo is a private WordPress post, authenticated with a JWT.'}),
    tags: ['WP REST API', translate({id: 'demos.index.todo.tagPrivatePosts', message: 'Private posts'}), 'Vanilla JS'],
    to: '/demos/todo',
  },
  {
    icon: faUsersGear,
    title: translate({id: 'demos.index.userManagement.title', message: 'WordPress user management'}),
    desc: translate({id: 'demos.index.userManagement.desc', message: 'List, search, and delete WordPress users with only a JWT - Administrator role required.'}),
    tags: ['WP REST API', translate({id: 'demos.index.userManagement.tagUsers', message: 'Users'}), 'Vanilla JS'],
    to: '/demos/user-management',
  },
];

export default function DemosPage() {
  return (
    <Layout
      title={translate({id: 'demos.index.meta.title', message: 'Interactive Demos'})}
      description={translate({id: 'demos.index.meta.description', message: 'Run Simple JWT Login demos live in your browser - a headless WooCommerce store and a JWT-authenticated todo app, both in vanilla JavaScript.'})}
    >
      <main className={styles.sectionPadding}>
        <div className="container">
          <span className={styles.sectionEyebrow}><Translate id="demos.index.eyebrow">Try it live</Translate></span>
          <h1 className={styles.sectionTitle}><Translate id="demos.index.title">Interactive Demos</Translate></h1>
          <p className={styles.sectionLead}>
            <Translate id="demos.index.lead">
              {'Run each demo right here in your browser against your own WordPress site. Nothing is sent anywhere except the WordPress URL you provide - the demos run entirely client-side and talk directly to your install.'}
            </Translate>
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
                  {tags.map((t, i) => (
                    <span key={i} className={ex.tag}>{t}</span>
                  ))}
                </div>
                <span className={ex.cardCta}>
                  <Translate id="demos.index.openDemo">Open demo</Translate>{' '}
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
