import PlayButton from "../components/PlayButton.js";
import NavBar from "../components/NavBar.js";
import NextThreeShows from "../components/NextThreeShows.js";
import LoginButton from "../components/LoginButton.js";
import ShowOTW from "../components/ShowOTW.js";
import PlaylistLogger from "../components/PlaylistLogger.js";

import Head from "next/head";

import shows from "../../data/shows.json";
import playlists from "../../data/playlists.json";
import styles from "../styles/Home.module.css";

import { useState } from "react";

export default function Home() {
  const [allShows] = useState(shows);
  const [allPlaylists] = useState(playlists);
  const [loggedIn, setLoggedIn] = useState(false);
  const [sotw] = useState(allShows[5]); //placeholder, eventually we will want a callback: "setSotw"

  const [page, setCurrentPage] = useState("Home");
  const pageList = ["Home", "Blog", "Schedule", "Community", "About"];

  const placeholderPages = {
    "Home":<div> <ShowOTW show={sotw}/> <p>{""}</p> <NextThreeShows shows={allShows}/>  </div>,
    "Blog":<h2>This is the blog</h2>,
    "Schedule":<h2>This is the schedule</h2>,
    "Community":<h2>This is the community page</h2>,
    "About":<h2>This is the about page</h2>
  };

  const current = placeholderPages[page];

  return (
    <div className={styles.container}>
      <Head>
        <title>Final Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LoginButton loggedIn={loggedIn} handleClick={setLoggedIn}/>
        <PlayButton/>
        <NavBar 
          pageList={pageList}
          currentPage={page}
          setCurrentPage={setCurrentPage}
        />
        {current}
        <PlaylistLogger complete={undefined} showID={55} playlists={playlists}/>
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
