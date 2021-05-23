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
import styles from "../styles/Home.module.css";
import Link from "next/link";
import PropTypes from "prop-types";
import { useSession } from "next-auth/client";
import { getCurrentPlaylist } from "../lib/component-utils.js";

export default function Layout({ title, children }) {
  const [session] = useSession();

  const currentPlaylist = await getCurrentPlaylist();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div>
        <LoginButton/>
        <Link href="/"><h1>WRMC 91.1 FM</h1></Link>
        <PlayButton/>
        {session && 
          (currentPlaylist 
          ? <Link href="/log-playlist">
              <input type="button" value="Go to Current Playlist"/>
            </Link>
          : <StartShowButton/>
          )}
        <NavBar/>
        
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};
