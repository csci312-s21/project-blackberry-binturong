/*
  DisplayCurrentPlaylist.js

  This Component displays the current playlists.

  props:
    playlist - the current playlist
    allSongs - song table
*/

import { playlistType, songType } from "../lib/types.js";
import PropTypes from "prop-types";
import styles from "../styles/Main.module.css";

export default function DisplayCurrentPlaylist({ playlist, allSongs }) {

  let currentSongsList = [];

  if (playlist) {
    const currentSongs = allSongs.filter((song) => song.playlistId === playlist.id);

    currentSongsList = currentSongs.map((song) => (
      <li key={song.id} className={styles.currentlist_item}>
        {song.time} <strong>{song.title}</strong> <em>{song.artist}</em>
      </li>
    ));
  }

  const noShowMessage = "There's not always a show, but there's always great music!";
  return (
    <div className={styles.index_grid_div}>
      <p className={styles.currentplaylist_title}>Current Playlist</p>
      <div>
        <ul className={styles.currentplaylist_text}>
          {(currentSongsList.length !== 0) ? currentSongsList : noShowMessage} 
        </ul>
      </div>
    </div>
  );
}

DisplayCurrentPlaylist.propTypes = {
  playlist: playlistType,
  allSongs: PropTypes.arrayOf(songType).isRequired
};
