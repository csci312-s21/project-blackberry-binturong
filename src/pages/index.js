import PlayButton from "../components/PlayButton.js";

import Head from "next/head";
import shows from "../../data/shows.json";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import NextThreeShows from "../components/NextThreeShows.js";
import LoginButton from "../components/LoginButton.js";

export default function Home() {
  const [allShows] = useState(shows);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Final Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LoginButton loggedIn={loggedIn} handleClick={setLoggedIn}/>
        <PlayButton/>
        <NextThreeShows shows={allShows}/>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
