import React from 'react';
import Layout from '@theme/Layout';
import styles from "./styles.module.css";
import Link from "@docusaurus/core/lib/client/exports/Link";

function Contact() {
    return (
        <Layout title="Contact Us">
            <section className={styles.paddingRow}>
                <div className="container text-left">
                    <div className="row">
                        <div className="col">
                            <h1 className={styles.sectionTitle}>Connect with Us</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h2>Discord Community</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>Join our vibrant Discord community to engage in real-time discussions, share your experiences, and connect with other enthusiasts. Whether you have questions, want to share feedback, or just chat, our Discord server is the place to be.</p>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col"}>
                            <Link to={"https://discord.gg/c4AeefD8Dr"} title="Join Discord">
                                Join Discord
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.paddingRow}>
                <div className="container text-left">
                    <div className="row">
                        <div className="col">
                            <h2>GitHub Issues</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>For technical queries, bug reports, or feature suggestions, head over to our GitHub repository. Browse existing issues, submit bug reports, and engage with our development team. Your feedback is invaluable in shaping the future of our project.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Link
                                to={"https://github.com/nicumicle/simple-jwt-login/issues"}

                                title="GitHub issues"
                            >
                                Github Repository
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className={styles.paddingRow}>
                <div className="container text-left">
                    <div className="row">
                        <div className="col">
                            <h2>WordPress Forum Support</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>Explore our dedicated WordPress forum for comprehensive support. Connect with fellow users, share insights, and seek assistance on any issues you may be facing. Our community is here to help you make the most out of your experience.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Link
                                to={"https://wordpress.org/support/plugin/simple-jwt-login"}
                                title="WordPress Forum"
                            >
                                Visit WordPress Forum
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.paddingRow}>
                <div className="container text-left">
                    <div className="row">
                        <div className="col">
                            <h2>Email Support</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>
                            To streamline our support and enhance your experience, we've made some changes to how we handle inquiries.
                            </p>
                            <p>
                             As of <b>01.12.2024</b>, <b>email support will no longer be available</b>. But don’t worry – we’re still here to help!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.paddingRow}>
                <div className="container text-left">
                    <div className={"row"}>
                        <div className={"col"}>
                            <p>
                                We value your engagement and are committed to providing the support you need.
                                Choose the platform that suits you best, and let's connect!
                            </p>
                        </div>
                    </div>
                </div>
            </section>


        </Layout>
    );
}

export default Contact;