import NextThreeShows from "../components/NextThreeShows.js";
import ShowOTW from "../components/ShowOTW.js";
import DisplayCurrentShow from "../components/DisplayCurrentShow";
import DisplayCurrentPlaylist from "../components/DisplayCurrentPlaylist.js";
import Layout from "../components/Layout.js";
import moment from "moment-timezone";
import shows from "../../data/shows.json";
import { sampleSongs } from "../lib/test-utils.js";
import playlists from "../../data/playlists.json";
import { upcomingShowsArray, getRandomIntID } from "../lib/component-utils.js";
import { useState, useEffect } from "react";

moment.tz.setDefault("America/New_York"); 

export default function WRMCWebsite() {
  const [shows, allShows] = useState();
  const [allPlaylists, setAllPlaylists] = useState();
  const [allSongs, setAllSongs] = useState();
  useEffect(() => {
    const getData = async () => {
      const responseShow = await fetch( "/api/shows");
      if (!responseShow.ok) {
        throw new Error(responseShow.statusText);
      }
      const showData = await responseShow.json();
      allShows(showData);

      const responseSong = await fetch( "/api/songs");
      if (!responseSong.ok) {
        throw new Error(responseSong.statusText);
      }
      const songData = await responseSong.json();
      setAllSongs(songData);

      const responseP = await fetch( "/api/playlists");
      if (!responseP.ok) {
        throw new Error(responseP.statusText);
      }
      const playlistsData = await responseP.json();
      setAllPlaylists(playlistsData);
    };
    getData();
  }, []);

/*
  useEffect(() => {
    const getShow = async () => {
      const response = await fetch("/api/shows/67");
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const show = await response.json();
      //setSelectedShow(show);
    }
    getShow();
  }, []);
*/

  let mainContents
  if (shows !== undefined && allPlaylists !== undefined){

      const now = moment();
      const upcomingShows = upcomingShowsArray(shows, now);
      let isOnAir = false;
      if (upcomingShows.length >= 1) {
        isOnAir = upcomingShows[0].hour === now.hour() * 100;
      }
      const currentPlaylist = allPlaylists.filter((p) => {
        p.current === true;
      })

      mainContents = 
      <Layout title="WRMC 91.1 FM Middlebury College">
      <ShowOTW show={shows[0]}/>
      <DisplayCurrentShow
        show={isOnAir ? upcomingShows[0] : shows.find(show => show.id === 12345)} />
      <p>{""}</p>
      <NextThreeShows
        shows={isOnAir ? upcomingShows.slice(1, 4) : upcomingShows.slice(0, 3)}/>
      <DisplayCurrentPlaylist
        playlist={currentPlaylist}
        allSongs={allSongs} />
    </Layout>
  }

  return (
    <div>
      {mainContents}
    </div>
  );
}
