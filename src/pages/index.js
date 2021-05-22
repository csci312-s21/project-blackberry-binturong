import NextThreeShows from "../components/NextThreeShows.js";
import ShowOTW from "../components/ShowOTW.js";
import DisplayCurrentShow from "../components/DisplayCurrentShow";
import PlaylistLogger from "../components/PlaylistLogger.js";
import StartShowButton from "../components/StartShowButton.js";
import ShowDetails from "../components/ShowDetails.js";
import DisplayCurrentPlaylist from "../components/DisplayCurrentPlaylist.js";
import PlaylistDetails from "../components/PlaylistDetails.js";
import Layout from "../components/Layout.js";

import moment from "moment";
import shows from "../../data/shows.json";
import { sampleSongs } from "../lib/test-utils.js";
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
  const [loggingPlaylist, setLoggingPlaylist] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [selectedShow, setSelectedShow] = useState();  // state for displaying ShowDetails
  const [selectedPlaylist, setSelectedPlaylist] = useState();  // state for displaying PlaylistDetails

  const endShow = () => {
    setLoggingPlaylist(false);
    setCurrentPlaylist();
  }

  useEffect(() => {
    if (!loggedIn) {
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
    setLoggingPlaylist(true);
    const newPlaylist = { date: moment().format("M-DD-YYYY"), showID: showId, id: getRandomIntID() };
    setCurrentPlaylist(newPlaylist);
    setAllPlaylists([...allPlaylists, newPlaylist]);
  }

  // determines the current and next three shows
  const now = moment();
  const upcomingShows = upcomingShowsArray(shows, now);
  let isOnAir = false;
  if (upcomingShows.length >= 1) {
    isOnAir = upcomingShows[0].time.hour === now.hour() * 100;
  }

  // this if statement determines whether we show the regular homeloggingPlaylist or the playlist logger
  let displayPage;
  if (loggingPlaylist && loggedIn) {
    displayPage = <PlaylistLogger complete={updateSongCollection} currentPlaylist={currentPlaylist} endShow={endShow} shows={allShows} songs={allSongs} />
  } else {
    displayPage = 
      <div>
        {loggedIn && <StartShowButton userShows={allShows} startShow={startShow}/>}
        <ShowOTW show={sotw}/>
        <p>{""}</p>
        <DisplayCurrentShow
          show={isOnAir ? upcomingShows[0] : shows.find(show => show.id === 12345)} />
        <p>{""}</p>
        <DisplayCurrentPlaylist
          playlist={currentPlaylist}
          allSongs={allSongs} />
        <p>{""}</p>
        <NextThreeShows
          shows={isOnAir ? upcomingShows.slice(1, 4) : upcomingShows.slice(0, 3)}/>
      </div>
  }

  return (
    <Layout title="WRMC 91.1 FM Middlebury College">
      {displayPage}
    </Layout>
  );
}