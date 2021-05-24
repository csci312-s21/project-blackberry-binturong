/*
  SongInput.js

  Allows DJ to enter information for one song.

*/
import PropTypes from "prop-types";
import { songType } from "../lib/types.js";
import { useState } from "react";
import styles from "../styles/SongInput.module.css";
import moment from "moment";

export default function SongInput({ complete, song, savedInit }) {
  const [title, setTitle] = useState(song ? song.title : "");
  const [artist, setArtist] = useState(song ? song.artist : "");
  const [album, setAlbum] = useState(song ? song.album : "");
  const [albumArt] = useState(song ? song.albumArt : "https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/music-med.png");
  const [saved, setSaved] = useState(savedInit);

  const saveSong = async (newSong) => {
    setSaved(true);
    const action = saved ? "update" : "enter";
    complete(action, newSong);
  }

  return (
    <div className={styles.row}>
      <input 
        type="text" 
        className={styles.textinput}
        placeholder="Enter song title"
        aria-label="Title"
        defaultValue={title}
        onChange={(event) => setTitle(event.target.value)}/>
      <input
        type="text"
        className={styles.textinput}
        placeholder="Enter artist" 
        aria-label="Artist"
        defaultValue={artist}
        onChange={(event) => setArtist(event.target.value)}/>
      <input 
        type="text" 
        className={styles.textinput}
        placeholder="Enter album"
        aria-label="Album"
        defaultValue={album}
        onChange={(event) => setAlbum(event.target.value)}/>
      <input 
        type="button"
        className={styles.buttoninput}
        value={saved ? "Update" : "Enter"}
        disabled={(title === "") || (artist === "") || (album === "")}
        onClick={() => saveSong({
          ...song, 
          title: title,
          artist: artist,
          album: album,
          albumArt: albumArt,
          time: (event.target.value === "Update") ? song.time : moment().format("LT")}
          )}/>
      <input
        type="button"
        value="Delete"
        onClick={() => complete("delete", {...song})}/>
      <img src={albumArt} className={styles.image}/>
    </div>
  );

}

SongInput.propTypes = {
  complete: PropTypes.func.isRequired,
  song: songType.isRequired,
  savedInit: PropTypes.bool.isRequired
}