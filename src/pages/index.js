import PlayButton from "../components/PlayButton.js";
import NavBar from "../components/NavBar.js";
import NextThreeShows from "../components/NextThreeShows.js";
import LoginButton from "../components/LoginButton.js";
import ShowOTW from "../components/ShowOTW.js";
import PlaylistLogger from "../components/PlaylistLogger.js";
import StartShowButton from "../components/StartShowButton.js";
import ShowDetails from "../components/ShowDetails.js";

import Head from "next/head";

import shows from "../../data/shows.json";
import playlists from "../../data/playlists.json";
import styles from "../styles/Home.module.css";

import { useState, useEffect } from "react";
import moment from "moment";

import { getRandomIntID } from "../lib/component-utils.js";

export default function WRMCWebsite() {
  const [allShows] = useState(shows);
  const [allPlaylists, setAllPlaylists] = useState(playlists);
  const [allSongs, setAllSongs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [sotw] = useState(allShows[5]); //placeholder, eventually we will want a callback: "setSotw"
  const [page, setCurrentPage] = useState("Home");
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [selectedShow, setSelectedShow] = useState();  // state for displaying ShowDetails
  const pageList = ["Home", "Blog", "Schedule", "Community", "About"];

  const endShow = () => {
    setCurrentPage("Home");
    setCurrentPlaylist();
  }

  useEffect(() => {
    if(!loggedIn) {
      endShow();
    }
  }, [loggedIn]);

  const updateSongCollection = (action, newSong) => {
    if (action === "enter") {
      const newSongs = allSongs.map((song) => ((song.id === newSong.id) ? newSong : song));
      setAllSongs(newSongs);
    } else if (action === "delete") {
      const newSongs = allSongs.filter((song) => song.id !== newSong.id);
      setAllSongs(newSongs);
    }
  };

  const startShow = (showId) => {
    setCurrentPage("Log Playlist");
    const newPlaylist = {date: moment().format("L"), showID: showId, id: getRandomIntID()};
    setCurrentPlaylist(newPlaylist);
    setAllPlaylists([...allPlaylists, newPlaylist]);
  }

  // callback function to select page in NavBar
  const selectPage = (newPage) => {
    setCurrentPage(newPage);
    setSelectedShow();
  }

  // callback function to display ShowDetails page
  const clickShow = (show) => {
    setSelectedShow(show);
    setCurrentPage("Show Details");
  }

  const placeholderPages = {
    // TODO: we should create a container component for the Home page
    // (and any other pages that end up having multiple components)
    "Home" : <div>
              <ShowOTW show={sotw} handleClick={clickShow}/> <p>{""}</p>
              <NextThreeShows shows={allShows} handleClick={clickShow}/>
             </div>,
    "Blog" : <h2>This is the blog</h2>,
    "Schedule" : <h2>This is the schedule</h2>,
    "Community" : <h2>This is the community page</h2>,
    "About" : <h2>This is the about page</h2>,
    "Show Details" : <ShowDetails show={selectedShow}/>
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>WRMC 91.1 FM Middlebury College Radio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LoginButton loggedIn={loggedIn} handleClick={setLoggedIn}/>
        {loggedIn && 
          (currentPlaylist 
          ? <input type="button" value="Go to Current Playlist" onClick={() => setCurrentPage("Log Playlist")}/>
          : <StartShowButton userShows={allShows.slice(0, 4) /* this slice is temporary */} startShow={startShow}/>
          )}
        <h1>WRMC 91.1 FM</h1>
        <PlayButton/>
        <NavBar 
          pageList={pageList}
          currentPage={page}
          setCurrentPage={selectPage}
        />
        {(page === "Log Playlist" && loggedIn)
        ? <PlaylistLogger complete={updateSongCollection} currentPlaylist={currentPlaylist} endShow={endShow} shows={allShows} songs={allSongs}/>
        : placeholderPages[page]}
        
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
