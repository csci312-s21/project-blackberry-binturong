/*
  PlaylistLogger.js

  Allows DJ to log a new playlist.

*/
import PropTypes from "prop-types";
import { playlistType, showType, songType } from "../lib/types.js";
import { useState } from "react";
import SongInput from "./SongInput.js";
import { getRandomIntID } from "../lib/component-utils.js";
import styles from "../styles/PlaylistLogger.module.css";

export default function PlaylistLogger({ complete, currentPlaylist, endShow, shows, songs }) {
  const [emptyRows, setEmptyRows] = useState([]);

  const addRow = () => {
    const emptySong = {title: "", artist: "", album: "", playlistID: currentPlaylist.id, id: getRandomIntID()}
    const newEmptyRows = [...emptyRows, {...emptySong}];
    setEmptyRows(newEmptyRows);
  }

  const handleClick = (action, song) => {
    if (action === "delete" && ((song.title === "") || (song.artist === "") || (song.album === ""))) {
      const newRows = emptyRows.filter((row) => row.id !== song.id);
      setEmptyRows(newRows);
    } else if (action === "enter") {
      const newRows = emptyRows.filter((row) => row.id !== song.id);
      setEmptyRows(newRows);
      complete(action, song);
    } else {
      complete(action, song);
    }
  }
  
  const currentSongs = songs.filter((song) => song.playlistID === currentPlaylist.id);

  const rows = [...currentSongs, ...emptyRows].map(
    (song) => <li key={song.id}><SongInput complete={handleClick} song={song}/></li>);

  const currentShow = shows.find((show) => show.id === currentPlaylist.showID);

  return (
    <div>
      <h1 className={styles.title}>Playlist for {currentShow.title}</h1>
      <ul className={styles.rows}>{rows}</ul>
      <input
        type="button"
        value="Add Song"
        onClick={() => addRow()}
      />
      <input
        type="button"
        value="End Show"
        onClick={() => endShow()}
      />
    </div>
  );
}

PlaylistLogger.propTypes = {
  complete: PropTypes.func,
  currentPlaylist: playlistType,
  endShow: PropTypes.func,
  shows: PropTypes.arrayOf(showType),
  songs: PropTypes.arrayOf(songType)
};
