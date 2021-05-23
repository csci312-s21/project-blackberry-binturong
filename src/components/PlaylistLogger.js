/*
  PlaylistLogger.js

  Allows DJ to log a new playlist.

*/
import { useState } from "react";
import SongInput from "./SongInput.js";
import { getRandomIntID, endShow } from "../lib/component-utils.js";
import styles from "../styles/PlaylistLogger.module.css";

export default function PlaylistLogger() {
  const [emptyRows, setEmptyRows] = useState([]);

  const complete = (action, newSong) => {
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

  const currentRows = currentSongs.map(
    (song) => <li key={song.id}><SongInput complete={handleClick} song={song} savedInit/></li>);
  
  const currentEmptyRows = emptyRows.map(
    (song) => <li key={song.id}><SongInput complete={handleClick} song={song} savedInit={false}/></li>);

  const currentShow = shows.find((show) => show.id === currentPlaylist.showID);

  return (
    <div>
      <h1 className={styles.title}>Playlist for {currentShow.title}</h1>
      <ul className={styles.rows}>{[...currentRows, ...currentEmptyRows]}</ul>
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