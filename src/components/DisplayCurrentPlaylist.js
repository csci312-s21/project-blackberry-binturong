/*

  This Component displays the current playlists.

  props - current playlist , allSongs
*/

import { playlistType, songType } from "../lib/types.js";
import PropTypes from "prop-types";
import styles from "../styles/DisplayCurrentPlaylist.module.css";

export default function DisplayCurrentPlaylist({ playlist, allSongs }){

const currentSongs = allSongs.filter((song) => song.playlistID === playlist.id);

currentSongs.map((song) => song.timeAdded = new Date(song.timeAdded));

const currentPlaylist = currentSongs.map((song) => 
    <ul key={song.id}>
      {song.timeAdded.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})} <strong>{song.title}</strong> <em>{song.artist}</em>
    </ul>
  );

  return (
    <div className = {styles.DisplayCurrentPlaylist}>
      <div className={styles.header}>
        Current Playlist
      </div>
      <div className = {styles.playlist}>
        {currentPlaylist}
      </div>
    </div>
  );
}

DisplayCurrentPlaylist.propTypes = {
  playlist: playlistType.isRequired,
  allSongs: PropTypes.arrayOf(songType).isRequired
};

