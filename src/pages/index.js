import LoginButton from "../components/LoginButton.js";

import Head from "next/head";

import styles from "../styles/Home.module.css";

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Final Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LoginButton/>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
