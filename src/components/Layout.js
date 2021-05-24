/*
  Layout.js

  This component holds the layout for all of the other pages.

  props:
    title - the page title
    children - the page contents
*/

import Head from "next/head";
import LoginButton from "../components/LoginButton.js";
import PlayButton from "../components/PlayButton.js";
import NavBar from "../components/NavBar.js";
import styles2 from "../styles/Home.module.css";
import styles from "../styles/Main.module.css";
import Link from "next/link";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Layout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main_page}>
        <LoginButton />
        <Link href="/">
          <div className={styles.icon_div}>
            <img
              src="https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/logo_large.png"
              className={styles.wrmc_icon}
            />
          </div>
        </Link>
        <NavBar />
        <Row className={styles.index_row_center}>
          <Col xs={8} md={5} className={styles.index_column}>
            <PlayButton />
          </Col>
        </Row>
        <main className={styles2.main}>{children}</main>
      </div>
    </div>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
