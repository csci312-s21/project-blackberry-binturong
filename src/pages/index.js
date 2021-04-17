import Head from "next/head";
import temp_data from "../../data/temp_data.json";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import NextThreeShows from "../components/NextThreeShows.js";

export default function Home() {
  const [shows] = useState(temp_data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Final Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NextThreeShows shows={shows}/>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
