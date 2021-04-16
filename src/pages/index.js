import LoginButton from "../components/LoginButton.js";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Final Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LoginButton loggedIn={loggedIn} handleClick={setLoggedIn}/>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
