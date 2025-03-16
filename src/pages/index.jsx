import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Feature from "@site/src/components/feature/feature";
import Review from "@site/src/components/review/review";
import Counter from '../components/counter/counter';

import styles from './styles.module.css';

const awesomeFeatures = [
  {
    title: <>Auto Login</>,
    description: (
      <>You are able to auto-login into a WordPress website with a JWT.</>
    ),
    image: "assets/svg/login-user-2.svg",
    alt: "Login user",
    link: "/docs/autologin/",
  },
  {
    title: <>Register Users</>,
    description: (
      <>
        API endpoint that allows you to register new users in WordPress.
      </>
    ),
    image: "assets/svg/create-user.svg",
    alt: "Register user",
    link: "/docs/register-user/",
  },
  {
    title: <>Delete Users</>,
    description: (
      <>Delete Users with JWT.</>
    ),
    image: "assets/svg/delete-user.svg",
    alt: "Delete user",
    link: "/docs/delete-user/",
  },
  {
    title: <>Authenticate users</>,
    description: <>API endpoint to Generate a JWT, refresh JWT and invalidate JWT.</>,
    image: "assets/svg/authenticate-user.svg",
    alt: "Authenticate user",
    link: "/docs/authentication/",
  },
  {
    title: <>Change & Reset Password</>,
    description: <>This plugin allows you handle password change</>,
    image: "assets/img/password.png",
    alt: "Change and Reset password",
    link: "/docs/change-password/",
  },
  {
    title: <>Limit access by IP</>,
    description: <>Limit access to Simple JWT Login only for specific IP addresses.</>,
    image: "assets/img/ip.png",
    alt: "Limit access by IP",
  },
  {
    title: <>Create users with different roles</>,
    description: <>You are able to create multiple users with different roles on the same endpoint.</>,
    image: "assets/img/roles.png",
    alt: "Roles",
    link: "/docs/register-user/#new-types-of-users",
  },
  {
    title: <>Integrate with other plugins</>,
    description: <>This plugin works well in combination with other plugins that extends the WordPRess REST API.</>,
    image: "assets/img/plug-in.png",
    alt: "Integrate with other plugins",
    link: "/docs/mailpoet/",
  },
  {
    title: <>Protect endpoints</>,
    description: <>This plugin allows you to protect some specific endpoints, or all endpoints with a JWT</>,
    image: "assets/img/protect-endpoints.png",
    alt: "Protect endpoints",
    link: "/docs/protect-endpoints/",
  },
  {
    title: <>Allow JWT usage on other endpoints</>,
    description: <>Add a JWT to requests for other api endpoints and you will act as an authenticated user.</>,
    image: "assets/img/protect.png",
    alt: "JWT on other endpoints",
    link: "/docs/#allow-jwt-usage-on-all-endpoints",
  },
  {
    title: <>Google OAuth Integration</>,
    description: <>
      Login to your website with Google.
    </>,
    image: "assets/img/google-plus.png",
    alt: "Google Oauth",
    link: "/docs/applications/google/login/",
    beta: true,
  },
  {
    title: <>Use Google JWT on all endpoints</>,
    description: <>
       Use the Google JWT in order to access WordPress endpoints as an authenticated user.
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
    desciption: <>This is probably the very absolute best no-nonsense JWT plugin on WordPress. Exceptionally well documented, high customization, easy to setup, and works out of the box with basic setup. No nonsense ads, either. Definitely deserving the 5-star rating across the board. Recommended.</>,
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
    downloads: '62000',
    rating: '5/5',
  }

  return (
    <Layout title="Simple JWT Login" description="Your WordPress plugin that allows you to work with JWT">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img src={"assets/favicons/apple-touch-icon.png"}  alt={"Simple JWT Login logo"} title={"Simple JWT Login logo"} width="180" height="180"/>
          <h1 className="hero__title">Simple JWT Login</h1>
          <h2>Free & Secure WordPress JWT Authentication Plugin</h2>
          <p>Simple JWT Login is a FREE WordPress plugin that streamlines authentication for your website's REST API endpoints.</p>
          <p>With just a few clicks, you can enable secure JSON Web Token (JWT) login without writing a single line of code.</p>
          <span>
              <Link
                  to={"https://github.com/nicumicle/simple-jwt-login/blob/master/download/simple-jwt-login.zip?raw=true"}
                  className={styles.actionButton}
                  download={true}
                  title="Download Plugin"
              >
                Download
              </Link>
          </span>
        </div>
      </header>
      <main>    

        <section className={[styles.sectionPadding, styles.sectionGreen, styles.statistics].join(" ")}>
            <div className="container">
              <div className="row">
                <h2 className={styles.sectionTitle}>Plugin stats</h2>
              </div>
              <div className="row">
                <div className="col col--4 text-center">
                    <h3 className={styles.statisticsTitle}>Active installs</h3>
                    <h4 className={styles.statisticsNumber}>
                      <Counter number={statistics.activeInstalls} duration="5" />
                    </h4>
                </div>
                <div className="col col--4 text-center">
                  <h3 className={styles.statisticsTitle}>Downloads</h3>
                  <h4  className={styles.statisticsNumber}>
                    <Counter number={statistics.downloads} duration="5" />
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
                  <h2 className={styles.sectionTitle}>Some awesome features</h2>
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
              <div className="col">
                <h2 className={styles.sectionTitle}>
                  Why Choose Simple JWT Login?
                </h2>
              </div>
              <div className='col text-center'>
                <div className="text-left">
                  <p> ✅ <b>No Coding Required</b> - Set up JWT authentication in minutes, no developer needed.</p>
                  <p> ✅ <b>Secure & Reliable</b> - Protect your WordPress REST API with industry-standard JWT security.</p>
                  <p> ✅ <b>Flexible Integration</b> - Works seamlessly with mobile apps, external systems, and custom applications.</p>
                  <p> ✅ <b>Open Source & Free</b> - Enjoy full access to a community-supported, <b>cost-free</b> authentication solution.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RecentPosts></RecentPosts>

        <section className={[styles.sectionPadding].join(" ")}>
          <div className="container">
            <div className="row">
              <h2 className={styles.sectionTitle}>Easy to integrate</h2>
            </div>
            <div className="row">
              <div className="col">
                  <div className={styles.clientCard}>
                    <div className={styles.clientCardTitle}>
                      <h3>PHP</h3>
                    </div>
                    <div className={styles.clientCardContent}>
                      <p>
                        Composer package for integrating any PHP application with Simple JWT Login.
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
              <div className="col">
                <div className={styles.clientCard}>
                  <div className={styles.clientCardTitle}>
                    <h3>Javascript</h3>
                  </div>
                  <div className={styles.clientCardContent}>
                    <p>
                      Integrate your application with Simple JWT Login using the SDK with just a few lines of code.
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
            </div>
          </div>
        </section>

        <section className={[styles.sectionPadding, styles.statistics, styles.sectionGray].join(" ")}>
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
                <a href="/docs#installation" className={[styles.actionButton].join(" ")} style={{"marginTop":"40px"}}>Start Now</a>
              </div>
            </div>
          </div>
        </section>

        <section className={["contribute", styles.sectionPadding].join(" ")}>
          <div className="container text-center">
            <div className="row">
              <h2 className={styles.sectionTitle}>Contribute</h2>
            </div>
            <div className="row">
              <div className="col col--12 text-left">
                <p>
                Your support helps us grow and improve! Whether you're a developer, translator, or just someone who loves this project, there are many ways to get involved.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col col--3 text-center">
                <h3>⭐ Give us a Star on GitHub</h3>
                <p>
                  Show your appreciation and help others discover this project by starring our repository on <Link to={"https://github.com/nicumicle/simple-jwt-login"} title="GitHub stars">GitHub</Link>.
                </p>
              </div>
              <div className="col col--3 text-center">
                <h3>🛠️ Contribute to the Code</h3>
                <p>
                  Have ideas to enhance this plugin or found a bug? Check out our GitHub repository to:
                  <ul className='text-left'>
                    <li className='text-left'>Submit <Link to={"https://github.com/nicumicle/simple-jwt-login/issues"} title="Github Issues">issues</Link>.</li>
                    <li className='text-left'>Propose new <Link to={"https://github.com/nicumicle/simple-jwt-login/issues"} title="Github Issues">features</Link>.</li>
                    <li className='text-left'>Create <Link to={"https://github.com/nicumicle/simple-jwt-login/pulls"} title="Github Pull requests">pull requests</Link> to improve the code.</li>
                  </ul>
                </p>
              </div>
              <div className="col col--3 text-center">
                <h3>📈 Rate Us on WordPress</h3>
                <p>
                  Love this plugin? Share your experience by rating and reviewing it on <Link to={"https://wordpress.org/plugins/simple-jwt-login"} title="WordPress plugin">WordPress.org</Link>. Your feedback inspires us and helps others find the plugin.
                </p>
              </div>
              <div className="col col--3 text-center">
                <h3>🌍 Help Us Translate</h3>

                <p>
                  Make this plugin accessible to a global audience! Join our <Link
                    to={"https://translate.wordpress.org/projects/wp-plugins/simple-jwt-login/"} title="WordPress translate">translation</Link> efforts and help us reach more users in their native language. 
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col col--12'>
                <h3>💖 Why Your Contribution Matters </h3>
                <p>
                  Every contribution, big or small, makes a difference. Together, we can build something even better for the community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {reviews && reviews.length > 0 && (
            <section className={[styles.features, styles.sectionPadding].join(" ")}>
              <div className="container">
                <div className="row">
                  <h2 className={styles.sectionTitle}>
                    Reviews
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
