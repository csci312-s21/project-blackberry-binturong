/*
  PlaylistDetails.js

  This component displays a list of all songs in a playlist

  props:
    playlist - the playlist object

*/
import Link from "next/link";
import { useState, useEffect } from "react";
import { playlistType } from "../lib/types.js";
import PropTypes from "prop-types";
import styles from "../styles/PlaylistDetails.module.css";
import moment from "moment";
import { compareTwoSongs } from "../lib/component-utils.js";

export default function PlaylistDetails({ playlist }) {
  const [currShow, setCurrShow] = useState();
  const [playlistSongs, setPlaylistSongs] = useState([]);

  useEffect(() => {
    const getShow = async () => {
      const response = await fetch("/api/shows");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const allShows = await response.json();
      setCurrShow(allShows.filter((show) => show.id === playlist.showId));
    }
    const getSongs = async () => {
      const response = await fetch("/api/songs");

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const allSongs = await response.json();

      setPlaylistSongs(allSongs.filter((song) => song.playlistId === playlist.id));
    }
    getShow();
    getSongs();
  }, []);

  playlistSongs.sort((a, b) => compareTwoSongs(a,b));

  const songInfo = playlistSongs.map((song) => 
    <tr key={song.id}>
      <td>{song.time}</td>
      <td>{song.title}</td>
      <td>{song.artist}</td>
      <td>{song.album}</td>
    </tr>
  );

  const dateString = moment(playlist.date, "M-DD-YYYY").format("dddd MMMM Do YYYY");

  let contents
  if (currShow !== undefined){
    contents =  <div>
      <h2 className={styles.header}>
        {`Playlist for ${currShow.title} ${dateString}`}
      </h2>
      <table className={styles.songTable}>
        <tbody>
          <tr>
            <th>Time</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
          </tr>
          {songInfo}
        </tbody>
      </table>
    </div>
  }

  return (
    <div>
      {contents}
    </div>
  );
}

PlaylistDetails.propTypes = {
  playlist: playlistType.isRequired
}