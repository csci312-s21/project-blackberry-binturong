import PlayButton from "../components/PlayButton.js";
import NavBar from "../components/NavBar.js";
import NextThreeShows from "../components/NextThreeShows.js";
import LoginButton from "../components/LoginButton.js";
import ShowOTW from "../components/ShowOTW.js";
import WeeklySchedule from "../components/WeeklySchedule.js";
import DisplayCurrentShow from "../components/DisplayCurrentShow";
import PlaylistLogger from "../components/PlaylistLogger.js";
import StartShowButton from "../components/StartShowButton.js";
import ShowDetails from "../components/ShowDetails.js";
import PlaylistDetails from "../components/PlaylistDetails.js";
import Head from "next/head";

import moment from "moment";
import shows from "../../data/shows.json";
import {sampleSongs} from "../lib/test-utils.js";
import playlists from "../../data/playlists.json";
import styles from "../styles/Home.module.css";

import { upcomingShowsArray, getRandomIntID } from "../lib/component-utils.js";

import { useState, useEffect } from "react";

export default function WRMCWebsite() {
  const [allShows] = useState(shows);
  const [allPlaylists, setAllPlaylists] = useState(playlists);
  const [allSongs, setAllSongs] = useState(sampleSongs);
  const [loggedIn, setLoggedIn] = useState(false);
  const [sotw] = useState(allShows[6]); //placeholder, eventually we will want a callback: "setSotw"
  const [page, setCurrentPage] = useState("Home");
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [selectedShow, setSelectedShow] = useState();  // state for displaying ShowDetails
  const [selectedPlaylist, setSelectedPlaylist] = useState();  // state for displaying PlaylistDetails
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
      setAllSongs([...allSongs, newSong]);
    } else if (action === "update") {
      const newSongs = allSongs.map((song) => ((song.id === newSong.id) ? newSong : song));
      setAllSongs(newSongs);
    } else if (action === "delete") {
      const newSongs = allSongs.filter((song) => song.id !== newSong.id);
      setAllSongs(newSongs);
    }
  };

  const startShow = (showId) => {
    setCurrentPage("Log Playlist");
    const newPlaylist = {date: moment().format("M-DD-YYYY"), showID: showId, id: getRandomIntID()};
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


  // determines the current and next three shows
  const now = moment();
  const upcomingShows = upcomingShowsArray(shows, now);
  let isOnAir = false;
  if (upcomingShows.length>=1){
    isOnAir = upcomingShows[0].time.hour === now.hour() * 100;
  }
  // callback function to display PlaylistDetails page
  const clickPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentPage("Playlist Details");
  }

  const placeholderPages = {
    // TODO: we should create a container component for the Home page
    // (and any other pages that end up having multiple components)
    "Home" : <div>
              <ShowOTW show={sotw} handleClick={clickShow}/> 
              <p>{""}</p>
              <DisplayCurrentShow show={isOnAir ? upcomingShows[0] : shows.find(show => show.id === 12345)} handleClick={clickShow}/>
              <p>{""}</p>
              <NextThreeShows shows={isOnAir ? upcomingShows.slice(1,4) : upcomingShows.slice(0,3)} handleClick={clickShow} setCurrentPage={setCurrentPage}/>
             </div>,
    "Blog" : <h2>This is the blog</h2>,
    "Schedule" : <WeeklySchedule shows={allShows}/>,
    "Community" : <h2>This is the community page</h2>,
    "About" : <h2>This is the about page</h2>,
  };

  // this if statement determines which page to display - add more else ifs as we add more specialized pages.
  let displayPage;
  if (page === "Log Playlist" && loggedIn) {
    displayPage = <PlaylistLogger complete={updateSongCollection} currentPlaylist={currentPlaylist} endShow={endShow} shows={allShows} songs={allSongs}/>
  } else if (page === "Show Details") {
    displayPage = <ShowDetails show={selectedShow} playlists={allPlaylists} clickPlaylist={clickPlaylist}/>
  } else if (page === "Playlist Details") {
    displayPage = <PlaylistDetails playlist={selectedPlaylist} songs={allSongs} shows={allShows} backToShow={clickShow}/>
  } else {
    displayPage = placeholderPages[page]
  }

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
        {displayPage}
        
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}