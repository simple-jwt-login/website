import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import DemoFrame from '../../components/DemoFrame';
import styles from '../styles.module.css';
import ex from './demo.module.css';

export default function TodoDemoPage() {
  return (
    <Layout
      title="Todo app - Interactive demo"
      description="A JWT-authenticated todo app where each todo is a private WordPress post, live in your browser."
    >
      <main className={styles.sectionPadding}>
        <div className="container">
          <Link to="/demos" className={ex.back}>
            <FontAwesomeIcon icon={faArrowLeft} /> All demos
          </Link>
          <h1 className={styles.sectionTitle}>Todo app</h1>
          <p className={styles.sectionLead}>
            Sign in with your WordPress credentials and manage todos - each one is stored as a
            private WordPress post, readable only by the authenticated user.
          </p>

          <div className={ex.notice}>
            <strong>Before it works,</strong> on your WordPress site: enable{' '}
            <em>Allow Authentication</em>, turn on{' '}
            <em>All WordPress endpoints check for JWT</em> (so <code>/wp/v2/posts</code> accepts
            the token), and enable CORS for this origin. See the{' '}
            <Link to="/docs/code-examples/todo-app">Todo App guide</Link>.
          </div>

          <div className={ex.infoBox}>
            <FontAwesomeIcon icon={faShieldHalved} className={ex.infoBoxIcon} />
            <span>
              <strong>Your data stays private.</strong> This website does not store any data
              you enter in the live example - your WordPress URL, credentials, and any details
              you submit are kept in your browser and sent only to your own WordPress site.
            </span>
          </div>

          <DemoFrame src="/demo-apps/todo/index.html" title="Todo app demo" height="640px" />
        </div>
      </main>
    </Layout>
  );
}
