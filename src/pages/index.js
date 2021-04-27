import PlayButton from "../components/PlayButton.js";
import NavBar from "../components/NavBar.js";
import NextThreeShows from "../components/NextThreeShows.js";
import LoginButton from "../components/LoginButton.js";
import ShowOTW from "../components/ShowOTW.js";
import ShowDetails from "../components/ShowDetails.js";

import Head from "next/head";

import shows from "../../data/shows.json";
import styles from "../styles/Home.module.css";

import { useState } from "react";

export default function WRMCWebsite() {
  const [allShows] = useState(shows);
  const [loggedIn, setLoggedIn] = useState(false);
  const [sotw] = useState(allShows[5]); //placeholder, eventually we will want a callback: "setSotw"
  const [page, setCurrentPage] = useState("Home");
  const [selectedShow, setSelectedShow] = useState();  // state for displaying ShowDetails
  const pageList = ["Home", "Blog", "Schedule", "Community", "About"];

  const selectPage = (newPage) => {
    setCurrentPage(newPage);
    setSelectedShow();
  }

  const clickShow = (show) => {
    setSelectedShow(show);
    setCurrentPage("");
  }

  const placeholderPages = {
    "Home" : <div>
              <ShowOTW show={sotw} handleClick={clickShow}/> <p>{""}</p>
              <NextThreeShows shows={allShows} handleClick={clickShow}/>
             </div>,
    "Blog" : <h2>This is the blog</h2>,
    "Schedule" : <h2>This is the schedule</h2>,
    "Community" : <h2>This is the community page</h2>,
    "About" : <h2>This is the about page</h2>
  };

  const current = placeholderPages[page];

  return (
    <div className={styles.container}>
      <Head>
        <title>WRMC 91.1 FM Middlebury College Radio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LoginButton loggedIn={loggedIn} handleClick={setLoggedIn}/>
        <PlayButton/>
        <NavBar 
          pageList={pageList}
          currentPage={page}
          setCurrentPage={selectPage}
        />
        {selectedShow ? <ShowDetails show={selectedShow}/> : current}
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
