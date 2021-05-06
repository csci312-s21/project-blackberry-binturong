/*

  This Component displays the current playlists.

  props - current playlist , allSongs
*/

import { playlistType, songType } from "../lib/types.js";
import PropTypes from "prop-types";
import styles from "../styles/DisplayCurrentPlaylist.module.css";

export default function DisplayCurrentPlaylist({ playlist, allSongs }){

let currentPlaylist;
const noShowMessage = "There's not always a show, but there's always great music!";

if(playlist !== undefined){
  const currentSongs = allSongs.filter((song) => song.playlistID === playlist.id);

  currentPlaylist = currentSongs.map((song) => 
    <li key={song.id}>
      {song.timeAdded} <strong>{song.title}</strong> <em>{song.artist}</em>
    </li>
  );
}

  return (
    <div className = {styles.DisplayCurrentPlaylist}>
      <div className={styles.header}>
        Current Playlist
      </div>
      <div className = {styles.playlist}>
        <ul>
          {playlist ? currentPlaylist : noShowMessage} 
        </ul>
      </div>
    </div>
  );
}

DisplayCurrentPlaylist.propTypes = {
  playlist: playlistType,
  allSongs: PropTypes.arrayOf(songType).isRequired
};

