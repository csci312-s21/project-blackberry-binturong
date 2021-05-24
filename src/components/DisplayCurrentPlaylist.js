/*
  DisplayCurrentPlaylist.js

  This Component displays the current playlists.

  props:
    playlist - the current playlist
    allSongs - song table
*/

import { playlistType, songType } from "../lib/types.js";
import PropTypes from "prop-types";
import styles from "../styles/DisplayCurrentPlaylist.module.css";

export default function DisplayCurrentPlaylist({ playlist, allSongs }){
  let currentPlaylist;
  let currentSongs;
  const noShowMessage = "There's not always a show, but there's always great music!";

  if(playlist !== undefined){
    currentSongs = allSongs.filter((song) => song.playlistId === playlist.id);

    currentPlaylist = currentSongs.map((song) => 
      <li key={song.id}>
        {song.time} <strong>{song.title}</strong> <em>{song.artist}</em>
      </li>
    );
  }

  return (
    <div className = {styles.DisplayCurrentPlaylist}>
      <div className={styles.header}>
        Current Playlist
      </div>
      <div>
        <ul className = {styles.playlist}>
          {playlist && currentSongs.length!==0 ? currentPlaylist : noShowMessage} 
        </ul>
      </div>
    </div>
  );
}

DisplayCurrentPlaylist.propTypes = {
  playlist: playlistType,
  allSongs: PropTypes.arrayOf(songType).isRequired
};

