import React from 'react';
import Layout from '@theme/Layout';
import styles from "./styles.module.css";
import clsx from "clsx";
import Link from "@docusaurus/core/lib/client/exports/Link";

function Donate(){
    return (
        <Layout title="Donate">

            <h1 className={styles.sectionTitle}>Support Simple JWT Login</h1>
            <section>
                <div className="container text-left">
                    <div className={["row", styles.paddingRow].join(" ")}>
                        <div className="col">
                            <h2>🚀 Our Vision</h2>
                            <p>Welcome to the forefront of WordPress JWT! At Simple JWT Login, we're on a mission to redefine the login experience and enhance the WordPress websites.
                                <br />
                                Our vision is clear: to be the <b>#1 JWT plugin for WordPress</b>. But we need your support to make this vision a reality.</p>
                        </div>
                    </div>

                    <div className={["row", styles.paddingRow].join(" ")}>
                        <div className={"col"}>
                            <h2>💡 Why Donate?</h2>
                            <p>
                                For the past four years, we've invested time, passion, and resources into developing the Simple JWT Login plugin. Now, we're inviting you to be a part of this transformative journey.
                                <br />
                                Your contribution will enable us to:
                                <ul>
                                    <li><b>Sustain our Online Presence</b>: Cover the monthly hosting costs for <a href={"https://simplejwtlogin.com"}>https://simplejwtlogin.com</a>.</li>
                                    <li><b>Enhance User Experience</b>: Invest in refining the Simple JWT Login plugin, SDKs, and website to provide users with a cutting-edge and intuitive experience.</li>
                                    <li><b>Fuel Innovation</b>: Acquire licenses and premium plugins, allowing us to develop and implement exciting new features that will redefine Simple JWT Login.</li>
                                    <li><b>Security Audits and Improvements: Conduct regular security audits and use funds to address any vulnerabilities.</b></li>
                                    <li><b>Enhanced User Interface (UI) and User Experience (UX):</b> Use funds to improve the UI/UX for the plugin and conduct usability studies to identify areas for improvement and implement changes.</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                    <div className={["row", styles.paddingRow].join(" ")}>
                        <div className={"col"}>
                            <h2>🌟 Your Impact</h2>
                            <p>Your support matters. By contributing to Simple JWT Login, you're not just supporting a plugin – you're supporting the entire community.</p>
                        </div>
                    </div>
                    <div className={["row", styles.paddingRow].join(" ")}>
                        <div className={"col"}>
                            <h2>🤝 Be a Changemaker – Donate Today!</h2>
                            <p>
                                Your contribution, no matter the size, makes a significant impact. Join us in shaping the future of Simple JWT Login. Be a changemaker by donating to Simple JWT Login today!
                            </p>
                            <p className={["text-center", styles.paddingRow].join(" ")}>
                                <Link
                                    to={"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PK9BCD6AYF58Y&source=url"}
                                    className={styles.btn}
                                    title="Donate now"
                                >
                                    Donate now
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className={["row", styles.paddingRow].join(" ")}>
                        <div className={"col"}>
                            <h2>🌈 Thank You for Being a Pillar of Support</h2>
                            <p>
                                Whether you're a developer, WordPress enthusiast, or simply someone who values open-source, your contribution matters.<br /> Thank you for being a part of the Simple JWT Login family.
                                <br />
                                <br />
                                Together, we are better.
                            </p>
                        </div>
                    </div>


                </div>
            </section>
        </Layout>
    );
}
function Donate_Old() {
    return (
        <Layout title="Donate">
            <section className={[ styles.sectionPadding].join(" ")}>
                <div className="container text-left">
                    <div className="row">
                        <h1 className={styles.sectionTitle}>Why Your Sponsorship Matters 🚀</h1>
                    </div>
                    <div className="row">
                        <div className="col ">
                            <p>
                                <b>Simple JWT Login</b> isn't just another plugin, it's a commitment to transforming the WordPress ecosystem. Over the past four years, I've poured my heart, money, and time into developing the Simple-JWT-Login plugin. Now, I'm turning to the community for support to take this project to the next level.
                            </p>
                            <p>
                                Your sponsorship will play a pivotal role in shaping the future of WordPress. Here's how your contribution will make a difference:
                                <ul>
                                    <li>
                                        <b>Sustain Online Presence</b>: Ensure the continuous availability of <a href={"https://simplejwtlogin.com"}>https://simplejwtlogin.com</a> by covering monthly hosting costs.
                                    </li>
                                    <li>
                                        <b>Enhance User Experience</b>: Invest in refining the Simple JWT Login plugin, SDKs, and website to provide users with a cutting-edge and intuitive experience.
                                    </li>
                                    <li>
                                        <b>Fuel Innovation</b>: Your support will help acquire licenses and premium plugins, enabling us to develop and implement exciting new features that will redefine WordPress APIs.
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-left">
                            <p>
                                Join us in this journey to elevate WordPress APIs, redefine authentication, and contribute to a thriving WordPress community. Together, we can make a lasting impact.
                            </p>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col text-center"}>
                            <p>
                                Be a Part of the Change – Sponsor Simple JWT Login Today!
                            </p>
                            <Link
                                to={"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PK9BCD6AYF58Y&source=url"}
                                className={styles.btn}
                                title="One time donation"
                            >
                                One time Donation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Donate;