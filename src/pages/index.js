import Head from "next/head";

import NavBar from "../components/NavBar.js";
import styles from "../styles/Home.module.css";

import { useState, useEffect } from "react";

export default function Home() {

  const [page, setCurrentPage] = useState("Home");
  const pageList = ["Home", "Blog", "Schedule", "Community", "About"];

  const placeholderPages = {
    "Home":<h2>This is the homepage</h2>,
    "Blog":<h2>This is the blog</h2>,
    "Schedule":<h2>This is the schedule</h2>,
    "Community":<h2>This is the community page</h2>,
    "About":<h2>This is the about page</h2>
  };

  let current = placeholderPages[page];

  return (
    <div className={styles.container}>
      <Head>
        <title>Final Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        <NavBar 
          pageList={pageList}
          currentPage={page}
          setCurrentPage={setCurrentPage}
        />
        {current}
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
