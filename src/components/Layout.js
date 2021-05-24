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
import StartShowButton from "../components/StartShowButton.js";
import NavBar from "../components/NavBar.js";
import styles2 from "../styles/Home.module.css";
import styles from "../styles/Main.module.css";
import Link from "next/link";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useSession } from "next-auth/client";
import { useState, useEffect } from "react";
import { getCurrentPlaylist } from "../lib/component-utils.js";

export default function Layout({ title, children }) {
  const [session] = useSession();
  const [currentPlaylist, setCurrentPlaylist] = useState();

  useEffect(() => {
    const getPlaylist = async () => {
      const playlist = await getCurrentPlaylist();
      setCurrentPlaylist(playlist);
    }
    
    getPlaylist();
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <div className={styles.main_page}>
        <LoginButton/>
        <Link href="/">
          <div className={styles.icon_div}>
            <img
              src="https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/logo_large.png"
              className={styles.wrmc_icon}
            />
          </div>
        </Link>
        {session && 
          (currentPlaylist 
          ? <Link href="/log-playlist">
              <input type="button" value="Go to Current Playlist"/>
            </Link>
          : <StartShowButton/>
          )}
        <NavBar/>
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
  children: PropTypes.element.isRequired
};
