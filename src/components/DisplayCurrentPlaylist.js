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
  let currentPlaylist;
  const noShowMessage =
    "There's not always a show, but there's always great music!";

  if (playlist !== undefined) {
    const currentSongs = allSongs.filter(
      (song) => song.playlistID === playlist.id
    );

    currentPlaylist = currentSongs.map((song) => (
      <li key={song.id}>
        {song.timeAdded} <strong>{song.title}</strong> <em>{song.artist}</em>
      </li>
    ));
  }

  return (
    <div className={styles.index_grid_div}>
      <p className={styles.currentplaylist_title}>Current Playlist</p>
      <div>
        <ul className={styles.currentplaylist_text}>
          {playlist ? currentPlaylist : noShowMessage}
        </ul>
      </div>
    </div>
  );
}

DisplayCurrentPlaylist.propTypes = {
  playlist: playlistType,
  allSongs: PropTypes.arrayOf(songType).isRequired,
};
