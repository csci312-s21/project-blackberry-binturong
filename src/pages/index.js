import NextThreeShows from "../components/NextThreeShows.js";
import ShowOTW from "../components/ShowOTW.js";
import DisplayCurrentShow from "../components/DisplayCurrentShow";
import PlaylistLogger from "../components/PlaylistLogger.js";
import StartShowButton from "../components/StartShowButton.js";
import DisplayCurrentPlaylist from "../components/DisplayCurrentPlaylist.js";
import Layout from "../components/Layout.js";

import moment from "moment-timezone";
import shows from "../../data/shows.json";
import { sampleSongs } from "../lib/test-utils.js";
import playlists from "../../data/playlists.json";

import { upcomingShowsArray, getRandomIntID, getCurrentPlaylist } from "../lib/component-utils.js";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

moment.tz.setDefault("America/New_York");

export default function WRMCWebsite() {
  const [allShows] = useState(shows);
  const [allPlaylists, setAllPlaylists] = useState(playlists);
  const [allSongs, setAllSongs] = useState(sampleSongs);
  const [sotw] = useState(allShows[6]);  // placeholder, eventually we will want a callback: "setSotw"
  const [session] = useSession();

  const startShow = async (showId) => {
    const newPlaylist = { date: moment().format("M-DD-YYYY"), showID: showId, id: getRandomIntID(), current: true };
    
    const response = await fetch("/api/playlists", {
      method: "POST",
      body: JSON.stringify(newPlaylist),
      headers: new Headers({ "Content-type": "application/json" }),
    });
      
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }

  const endShow = async () => {
    const currentPlaylist = await getCurrentPlaylist();

    if (currentPlaylist) {
      const completedPlaylist = {...currentPlaylist, current:false};
      
      const response = await fetch(`/api/playlists/${completedPlaylist.id}`, {
        method: "PUT",
        body: JSON.stringify(completedPlaylist),
        headers: new Headers({ "Content-type": "application/json" }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    }
  }

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

  // determines the current and next three shows
  const now = moment();
  const upcomingShows = upcomingShowsArray(shows, now);
  let isOnAir = false;

  if (upcomingShows.length >= 1) {
    isOnAir = upcomingShows[0].time.hour === now.hour() * 100;
  }

  // this if statement determines whether we show the regular home or the playlist logger
  let displayPage;
  if (loggingPlaylist && session) {
    displayPage = <PlaylistLogger complete={updateSongCollection} currentPlaylist={currentPlaylist} endShow={endShow} shows={allShows} songs={allSongs} />
  } else {
    displayPage = 
      <div>
        {session && 
          (currentPlaylist 
          ? <input type="button" value="Go to Current Playlist" onClick={() => setLoggingPlaylist(true)}/>
          : <StartShowButton userShows={allShows.slice(0, 4) /* this slice is temporary */} startShow={startShow}/>
          )}
        <p>{""}</p>
        <ShowOTW show={sotw}/>
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