import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Feature from "@site/src/components/feature/feature";
import Review from "@site/src/components/review/review";
import Counter from '../components/counter/counter';

import styles from './styles.module.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Simple JWT Login',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'WordPress Plugin',
  operatingSystem: 'WordPress 4.4+, PHP 5.5+',
  description: 'Free, open-source WordPress plugin that adds JWT authentication to the WordPress REST API. Supports login, register, auto-login, endpoint protection, token refresh, and more.',
  url: 'https://wordpress.org/plugins/simple-jwt-login/',
  downloadUrl: 'https://downloads.wordpress.org/plugin/simple-jwt-login.latest-stable.zip',
  softwareVersion: 'latest',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    ratingCount: '50',
  },
  author: {
    '@type': 'Person',
    name: 'Nicu Micle',
    url: 'https://github.com/nicumicle',
  },
};

const awesomeFeatures = [
  {
    title: <>Auto Login</>,
    description: (
      <>Log users in instantly via URL, header, cookie, or session — perfect for magic links, email campaigns, and SSO flows.</>
    ),
    image: "assets/svg/login-user-2.svg",
    alt: "Login user",
    link: "/docs/autologin/",
  },
  {
    title: <>Register Users</>,
    description: (
      <>
        Expose a secure REST endpoint to register new WordPress users programmatically — no custom code needed.
      </>
    ),
    image: "assets/svg/create-user.svg",
    alt: "Register user",
    link: "/docs/register-user/",
  },
  {
    title: <>Delete Users</>,
    description: (
      <>Remove users securely via API using verified JWT tokens.</>
    ),
    image: "assets/svg/delete-user.svg",
    alt: "Delete user",
    link: "/docs/delete-user/",
  },
  {
    title: <>Authenticate Users</>,
    description: <>Generate, refresh, revoke, and validate JWT tokens via REST. Supports HS256/384/512 and RS256/384/512 algorithms.</>,
    image: "assets/svg/authenticate-user.svg",
    alt: "Authenticate user",
    link: "/docs/authentication/",
  },
  {
    title: <>Change &amp; Reset Password</>,
    description: <>Let users change or reset their password through the API — ideal for headless and mobile apps.</>,
    image: "assets/img/password.png",
    alt: "Change and Reset password",
    link: "/docs/change-password/",
  },
  {
    title: <>Limit Access by IP</>,
    description: <>Restrict access to trusted IPs — supports wildcards (e.g. <code>85.*.*.*</code>) for subnet-level control.</>,
    image: "assets/img/ip.png",
    alt: "Limit access by IP",
  },
  {
    title: <>Create Users with Different Roles</>,
    description: <>Assign roles at registration time — create admins, editors, or subscribers through a single endpoint.</>,
    image: "assets/img/roles.png",
    alt: "Roles",
    link: "/docs/register-user/#user-roles",
  },
  {
    title: <>Integrate with Other Plugins</>,
    description: <>First-class support for MailPoet magic-link emails, WPGraphQL authorization, and any plugin that extends the WordPress REST API.</>,
    image: "assets/img/plug-in.png",
    alt: "Integrate with other plugins",
    link: "/docs/mailpoet/",
  },
  {
    title: <>Protect Endpoints</>,
    description: <>Require a valid JWT per route — filter by HTTP method (GET, POST, PUT, DELETE) with exact or prefix matching.</>,
    image: "assets/img/protect-endpoints.png",
    alt: "Protect endpoints",
    link: "/docs/protect-endpoints/",
  },
  {
    title: <>Use JWT on Any Endpoint</>,
    description: <>Pass a JWT to any WordPress endpoint and act as a fully authenticated user — no session cookies required.</>,
    image: "assets/img/protect.png",
    alt: "JWT on other endpoints",
    link: "/docs/configuration#allow-jwt-usage-on-all-wordpress-endpoints",
  },
  {
    title: <>Google OAuth Integration</>,
    description: <>
      Let users sign in with their Google account — zero passwords, instant trust.
    </>,
    image: "assets/img/google-plus.png",
    alt: "Google Oauth",
    link: "/docs/applications/google/login/",
    beta: true,
  },
  {
    title: <>Use Google JWT on All Endpoints</>,
    description: <>
       Use Google-issued tokens to authenticate against any WordPress REST endpoint seamlessly.
    </>,
    image: "assets/img/google-plus-jwt.png",
    alt: "Google Oauth",
    link: "/docs/applications/google/setup/",
    beta: true
  },
];

const reviews = [
  {
    title: <>Awesome plugin</>,
    description: <>The plugin works perfect and the support is even better!</>,
    author: <>@PDXMUSIC</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/pdxmusic/",
  },
  {
    title: <>Thanks for a great plugin</>,
    description: <>Works like a dream. Does what it needs to do. Thanks!</>,
    author: <>@lejager</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/lejager/",
  },
  {
    title: <>Amazing work</>,
    description: <>This plugin serves now as a one-stop shop for JWT authentication, esp for headless WP/web app setups. The even better part is the author who’s extremely helpful, swift in responding & fixing issues, acknowledging improvement suggestions, pleasing to talk to and patient. I hope you can keep up the dedicated work, Nicu!</>,
    author: <>@nilsnolde</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/nilsnolde/",
  },
  {
    title: <>Really good plugin, very straight forward</>,
    description: <>Really good plugin, very straight forward to use</>,
    author: <>@mdruart</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/users/mdruart/",
  },
  {
    title: <>No-Nonsense JWT (Excellence)</>,
    description: <>This is probably the very absolute best no-nonsense JWT plugin on WordPress. Exceptionally well documented, high customization, easy to setup, and works out of the box with basic setup. No nonsense ads, either. Definitely deserving the 5-star rating across the board. Recommended.</>,
    author: <>@thehinesgaphideaway</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/topic/no-nonsense-jwt-excellence/"
  },
  {
    title: <>Service & Support</>,
    description: <>JWT login plugin is awesome, their support is quite responsive and efficient.They are able to help me and guide me on my customize function to custom generate jwt using their classes.</>,
    author: <>@wintear</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/topic/service-support/",
  },
  {
    title: <>Awesome plugin</>,
    description: <>This is what I needed, works as expected. Nice work!</>,
    author: <>@graphems</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/topic/awesome-plugin-6632/",
  },
  {
    title: <>best all times</>,
    description: <>it’s the best of all JWT plugins, the responsiveness of the developer is simply incredible, he knows his project by heart and will help you efficiently.</>,
    author: <>@bigbear67</>,
    numberOfStars: 5,
    link: "https://wordpress.org/support/topic/best-all-times/",
  },
];


function RecentPosts(){
  const recentPosts =  require("../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json");

  if(recentPosts === null || typeof recentPosts.blogPosts != 'object'){
    return (<></>)
  }
  return (
      <section className={[styles.sectionPadding].join(" ")}>
        <div className="container">
          <div className="row">
            <h2 className={styles.sectionTitle}>Recent Blog Posts</h2>
          </div>
          <div className="row">
          {recentPosts.blogPosts.slice(0, 6).map((item, index) => (
              <div className="col col--4 text-center" id={"blog-post" + index} key={"key" + index}>
                <div className={styles.blogPostHomepage}>
                  <img src="assets/svg/article.svg" alt="Blog Article" title={item.metadata.title} width="100" height="100" />
                  <span className={styles.blogPostHomepageDate}>{item.metadata.formattedDate}</span>
                  <br />
                  <h3>
                      <a
                        href={`${item.metadata.permalink}`}
                        aria-label={item.metadata.title}
                        title={item.metadata.title}
                    >
                      {item.metadata.title}
                    </a>
                  </h3>
                  <br />
                  <p>{item.metadata.description}</p>

                </div>
              </div>
          ))}
          </div>
        </div>
      </section>
  )
}


function Docs() {
  let statistics = {
    activeInstalls: '5000',
    downloads: '80000',
    rating: '5/5',
  }

  return (
    <Layout
      title="Free WordPress JWT Authentication Plugin"
      description="Simple JWT Login is a free, open-source WordPress plugin that adds JWT authentication to the REST API. Login, register users, protect endpoints, auto-login, and more — no coding required."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img src={"assets/favicons/apple-touch-icon.png"} alt={"Simple JWT Login logo"} title={"Simple JWT Login logo"} width="120" height="120"/>
          <h1 className="hero__title">Simple JWT Login</h1>
          <h2>Free &amp; open-source JWT authentication for WordPress</h2>
          <p>Add secure token-based authentication to your WordPress REST API in minutes — no coding required.</p>
          <div style={{display:'flex', gap:'1rem', justifyContent:'center', marginTop:'1.5rem', flexWrap:'wrap'}}>
            <Link
              to={"/docs/"}
              className={styles.actionButton}
              title="Get started"
            >
              Get started →
            </Link>
            <Link
              to={"https://github.com/nicumicle/simple-jwt-login/blob/master/download/simple-jwt-login.zip?raw=true"}
              className={styles.btn}
              download={true}
              title="Download Plugin"
              style={{display:'inline-flex', alignItems:'center'}}
            >
              Download
            </Link>
          </div>
        </div>
      </header>
      <main>    

        <section className={[styles.sectionPadding, styles.sectionGreen, styles.statistics].join(" ")}>
            <div className="container">
              <div className="row">
                <h2 className={styles.sectionTitle}>Trusted by thousands of WordPress sites</h2>
              </div>
              <div className="row">
                <div className="col col--4 text-center">
                    <h3 className={styles.statisticsTitle}>Active installs</h3>
                    <h4 className={styles.statisticsNumber}>
                      <Counter number={statistics.activeInstalls} duration="5" />
                      <>+</>
                    </h4>
                </div>
                <div className="col col--4 text-center">
                  <h3 className={styles.statisticsTitle}>Downloads</h3>
                  <h4  className={styles.statisticsNumber}>
                    <Counter number={statistics.downloads} duration="5" />
                    <>+</>
                  </h4>
                </div>
                <div className="col col--4 text-center">
                  <h3 className={styles.statisticsTitle}>Rating</h3>
                  <h4 className={styles.statisticsNumber}>
                    <Counter number={statistics.rating} duration="3" />/5
                  </h4>
                </div>
              </div>
            </div>
        </section>
        {awesomeFeatures && awesomeFeatures.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                  <h2 className={styles.sectionTitle}>Everything you need for JWT authentication</h2>
              </div>
              <div className="row">
                {awesomeFeatures.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={[styles.sectionPadding, styles.sectionGray].join(" ")}>
          <div className="container">
            <div className="row">
              <h2 className={styles.sectionTitle}>Why Choose Simple JWT Login?</h2>
            </div>
            <div className={styles.whyGrid}>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>⚡</div>
                <h3 className={styles.whyCardTitle}>No coding required</h3>
                <p className={styles.whyCardDesc}>Set up JWT authentication in minutes via the WordPress admin UI — no custom code needed.</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>🔐</div>
                <h3 className={styles.whyCardTitle}>6 supported algorithms</h3>
                <p className={styles.whyCardDesc}>Choose from HS256/384/512 or RS256/384/512 to match your security policy.</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>🚀</div>
                <h3 className={styles.whyCardTitle}>4 JWT delivery methods</h3>
                <p className={styles.whyCardDesc}>Authorization header, cookie, session, or query parameter — works everywhere.</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>🛠️</div>
                <h3 className={styles.whyCardTitle}>Built for developers</h3>
                <p className={styles.whyCardDesc}>16 WordPress action and filter hooks to customize every authentication flow.</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>🌐</div>
                <h3 className={styles.whyCardTitle}>CORS-ready</h3>
                <p className={styles.whyCardDesc}>Works out of the box with React, Vue, Angular, mobile apps, WPGraphQL, and headless CMS setups.</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>🐘</div>
                <h3 className={styles.whyCardTitle}>PHP 5.5+ compatible</h3>
                <p className={styles.whyCardDesc}>Works on any PHP version from 5.5 onwards — no matter how old or new your server is.</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>🔗</div>
                <h3 className={styles.whyCardTitle}>Auto-login &amp; magic links</h3>
                <p className={styles.whyCardDesc}>Authenticate users via a tokenized URL — no password form needed. Perfect for email campaigns and passwordless flows.</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>🔄</div>
                <h3 className={styles.whyCardTitle}>Full token lifecycle</h3>
                <p className={styles.whyCardDesc}>Refresh, validate, and revoke tokens on demand to keep sessions secure and under your control.</p>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>💚</div>
                <h3 className={styles.whyCardTitle}>Free &amp; open source</h3>
                <p className={styles.whyCardDesc}>MIT-licensed, community-supported, no hidden costs — ever.</p>
              </div>
            </div>
          </div>
        </section>

        <RecentPosts></RecentPosts>

        <section className={[styles.sectionPadding].join(" ")}>
          <div className="container">
            <div className="row">
              <h2 className={styles.sectionTitle}>Drop into any stack in minutes</h2>
            </div>
            <div className="row" style={{rowGap:'1.5rem'}}>
              <div className="col col--4">
                  <div className={styles.clientCard}>
                    <div className={styles.clientCardTitle}>
                      <h3>PHP</h3>
                    </div>
                    <div className={styles.clientCardContent}>
                      <p>
                        Connect any PHP app to Simple JWT Login with one Composer package — supports Laravel, Yii, CodeIgniter, and more.
                      </p>
                      <img src={"assets/img/frameworks/php.png"} alt={"PHP"} title={"PHP"} width="40" height="40"/>
                      <img src={"assets/img/frameworks/laravel.png"}  alt={"Laravel"} title={"Laravel"} width="40" height="40"/>
                      <img src={"assets/img/frameworks/yii.png"}  alt={"Yii"} title={"Yii"} width="40" height="40"/>
                      <img src={"assets/img/frameworks/codeigniter.png"}  alt={"Codeigniter"} title={"Codeigniter"}  width="40" height="40"/>
                      <br />
                      <code>composer require "nicumicle/simple-jwt-login-client-php"</code>
                    </div>
                    <div className={styles.clientCardFooter}>
                      <a
                          href="https://packagist.org/packages/nicumicle/simple-jwt-login-client-php"
                          className={styles.btn}
                          title="Download PHP SDK"
                      >
                        Download
                      </a>
                    </div>
                  </div>
              </div>
              <div className="col col--4">
                <div className={styles.clientCard}>
                  <div className={styles.clientCardTitle}>
                    <h3>Javascript</h3>
                  </div>
                  <div className={styles.clientCardContent}>
                    <p>
                      Add JWT authentication to React, Vue, Angular, or any JS app with an npm package and a handful of lines.
                    </p>
                      <img src={"assets/img/frameworks/javascript.png"}  alt={"JavaScript"} title={"JavaScript"} width="40" height="40"/>
                      <img src={"assets/img/frameworks/vue.png"}  alt={"Vue"}  title="Vue" width="40" height="40"/>
                      <img src={"assets/img/frameworks/react.png"}  alt={"React"} title={"React"} width="40" height="40"/>
                      <img src={"assets/img/frameworks/angular.png"}  alt={"Angular"} title={"Angular"} width="40" height="40"/>
                      <br />
                    <code>npm install "simple-jwt-login"</code>
                  </div>
                  <div className={styles.clientCardFooter}>
                    <a
                        href="https://www.npmjs.com/package/simple-jwt-login"
                        className={styles.btn}
                        title="Download JS SDK"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.clientCard}>
                  <div className={styles.clientCardTitle}>
                    <h3>WPGraphQL</h3>
                  </div>
                  <div className={styles.clientCardContent}>
                    <p>
                      Use your JWT tokens to authenticate GraphQL queries and mutations — enable it with a single checkbox.
                    </p>
                    <img src={"assets/img/wpgraphql/wpgraphql-logo.png"} alt={"WPGraphQL"} title={"WPGraphQL"} style={{maxWidth:'100%', height:'40px', objectFit:'contain'}}/>
                  </div>
                  <div className={styles.clientCardFooter}>
                    <a
                        href="/docs/wpgraphql/"
                        className={styles.btn}
                        title="WPGraphQL integration docs"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.clientCard}>
                  <div className={styles.clientCardTitle}>
                    <h3>MailPoet</h3>
                  </div>
                  <div className={styles.clientCardContent}>
                    <p>
                      Send magic-link login emails via MailPoet — let subscribers log in with one click, no password required.
                    </p>
                  </div>
                  <div className={styles.clientCardFooter}>
                    <a
                        href="/docs/mailpoet/"
                        className={styles.btn}
                        title="MailPoet integration docs"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.clientCard}>
                  <div className={styles.clientCardTitle}>
                    <h3>Export &amp; Import</h3>
                  </div>
                  <div className={styles.clientCardContent}>
                    <p>
                      Back up and restore your entire plugin configuration in one click — perfect for staging-to-production migrations.
                    </p>
                  </div>
                  <div className={styles.clientCardFooter}>
                    <a
                        href="/docs/export-import/"
                        className={styles.btn}
                        title="Export and Import settings docs"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={[styles.sectionPadding, styles.sectionGray].join(" ")}>
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className={styles.sectionTitle}>
                  Start as easy as 1-2-3
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col">  
                  <span className={styles.stepNumber}>1</span> 
                  <p>
                    <b>Install & Activate</b> - Get started by installing Simple JWT Login from the WordPress plugin directory.
                  </p>
                </div>
          
              <div className="col">    
                  <span className={styles.stepNumber}>2</span> 
                  <p>
                    <b>Configure Settings</b> - Customize authentication rules, token expiration, and access control.
                  </p>
              </div>
                 
              <div className='col'>   
                  <span className={styles.stepNumber}>3</span> 
                  <p>
                    <b>Authenticate Effortlessly</b> - Use JWT tokens to authenticate users on REST API endpoints.
                  </p>
              </div>
            </div>

            <div className="row">
              <div className="col m-10">
                <a href="/docs/" className={styles.actionButton} style={{marginTop:'2rem'}}>Get started →</a>
              </div>
            </div>
          </div>
        </section>

        <section className={["contribute", styles.sectionPadding, styles.sectionGray].join(" ")}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Join the community</h2>
            <p style={{maxWidth:'640px', margin:'0 auto 3rem', color:'var(--sjl-text-muted,#64748b)'}}>
              Simple JWT Login is built in the open, by the community. Whether you write code, speak another language, or just want to spread the word — there's a place for you here.
            </p>
            <div className={[styles.whyGrid, styles.whyGrid2].join(' ')}>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>⭐</div>
                <h3 className={styles.whyCardTitle}>Star on GitHub</h3>
                <p className={styles.whyCardDesc}>Show your appreciation and help others discover the project.</p>
                <Link to="https://github.com/nicumicle/simple-jwt-login" title="GitHub repository" className={styles.communityCardLink}>Star on GitHub →</Link>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>🛠️</div>
                <h3 className={styles.whyCardTitle}>Contribute Code</h3>
                <p className={styles.whyCardDesc}>Submit issues, propose features, or open a pull request on GitHub.</p>
                <Link to="https://github.com/nicumicle/simple-jwt-login/pulls" title="GitHub Pull Requests" className={styles.communityCardLink}>Open a PR →</Link>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>📈</div>
                <h3 className={styles.whyCardTitle}>Rate on WordPress</h3>
                <p className={styles.whyCardDesc}>Love the plugin? A 5-star review on WordPress.org makes a big difference.</p>
                <Link to="https://wordpress.org/plugins/simple-jwt-login/#reviews" title="Rate on WordPress.org" className={styles.communityCardLink}>Leave a review →</Link>
              </div>
              <div className={styles.whyCard}>
                <div className={styles.whyCardIcon}>🌍</div>
                <h3 className={styles.whyCardTitle}>Help Translate</h3>
                <p className={styles.whyCardDesc}>Make JWT auth accessible in every language — join us on translate.wordpress.org.</p>
                <Link to="https://translate.wordpress.org/projects/wp-plugins/simple-jwt-login/" title="Translate Simple JWT Login" className={styles.communityCardLink}>Start translating →</Link>
              </div>
            </div>
          </div>
        </section>

        {reviews && reviews.length > 0 && (
            <section className={[styles.features, styles.sectionPadding].join(" ")}>
              <div className="container">
                <div className="row">
                  <h2 className={styles.sectionTitle}>
                    What developers are saying
                  </h2>
                </div>
                <div className="row">
                    {reviews.map((props, idx) => (
                        <div className={"col col--3"}>
                          <Review key={idx} {...props}></Review>
                        </div>
                    ))}
                  </div>
                <div className="row">
                  <div className={["col", styles.reviewsMore].join(" ")}>
                    <Link to={"https://wordpress.org/support/plugin/simple-jwt-login/reviews/"} title="View more reviews">View more Reviews</Link>
                  </div>
                </div>
              </div>
            </section>
        )}
      </main>
    </Layout>
  );
}

export default Docs;
