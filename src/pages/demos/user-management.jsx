import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShieldHalved, faDownload } from '@fortawesome/free-solid-svg-icons';
import DemoFrame from '../../components/DemoFrame';
import styles from '../styles.module.css';
import ex from './demo.module.css';

export default function UserManagementDemoPage() {
  return (
    <Layout
      title="WordPress User Management Demo"
      description="List, search, and delete WordPress users with only a JWT, live in your browser - administrator access required."
    >
      <main className={styles.sectionPadding}>
        <div className="container">
          <Link to="/demos" className={ex.back}>
            <FontAwesomeIcon icon={faArrowLeft} /> All demos
          </Link>
          <h1 className={styles.sectionTitle}>WordPress user management</h1>
          <p className={styles.sectionLead}>
            Sign in with your WordPress credentials, then list, search, and delete user
            accounts - all authenticated with a JWT in the Authorization header. Requires
            an Administrator account; any other role is denied access.
          </p>

          <div className={ex.notice}>
            <strong>Before it works,</strong> on your WordPress site: enable CORS for this
            origin and sign in with an <strong>Administrator</strong> account - listing and
            deleting other users needs the <code>list_users</code> / <code>delete_users</code>{' '}
            capability. Deleting a user reassigns their posts to the signed-in admin
            (the REST API's <code>reassign</code> parameter). Use HTTPS.
          </div>

          <div className={ex.infoBox}>
            <FontAwesomeIcon icon={faShieldHalved} className={ex.infoBoxIcon} />
            <span>
              <strong>Your data stays private.</strong> This website does not store any data
              you enter in the live example - your WordPress URL, credentials, and any details
              you submit are kept in your browser and sent only to your own WordPress site.
            </span>
          </div>

          <DemoFrame src="/demo-apps/user-management/index.html" title="User management headless demo" />

          <div style={{ marginTop: '1.5rem' }}>
            <a href="/demo-apps/user-management/index.html" download className={styles.actionButton}>
              <FontAwesomeIcon icon={faDownload} /> Download example
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
