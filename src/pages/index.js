import NextThreeShows from "../components/NextThreeShows.js";
import ShowOTW from "../components/ShowOTW.js";
import DisplayCurrentShow from "../components/DisplayCurrentShow";
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

  // determines the current and next three shows
  const now = moment();
  const upcomingShows = upcomingShowsArray(shows, now);
  let isOnAir = false;

  if (upcomingShows.length >= 1) {
    isOnAir = upcomingShows[0].hour === now.hour() * 100;
  }

  return (
    <Layout title="WRMC 91.1 FM Middlebury College">
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
    </Layout>
  );
}