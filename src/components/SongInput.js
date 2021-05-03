/*
  SongInput.js

  Allows DJ to enter information for one song.

*/
import PropTypes from "prop-types";
import { songType } from "../lib/types.js";
import { useState } from "react";
import { root, key } from "../lib/api.js";
import styles from "../styles/SongInput.module.css";
import moment from "moment";

export default function SongInput({ complete, song }) {
  const [title, setTitle] = useState(song ? song.title : "");
  const [artist, setArtist] = useState(song ? song.artist : "");
  const [album, setAlbum] = useState(song ? song.album : "");
  const [albumArt, setAlbumArt] = useState(song ? song.albumArt : "https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/music-med.png");

  const saveSong = async (song) => {

    const image = await getAlbumArt(song);
    setAlbumArt(image);

    complete("enter", {...song, albumArt: albumArt});

  };

  const getAlbumArt = async (song) => {
    const response = await fetch(`${root}?method=album.getinfo&api_key=${key}&artist=${song.artist}&album=${song.album}&format=json`);
    
    if (!response.ok) {
      throw new Error(response.statusText);
    };

    const albumData = await response.json();
    
    if ("album" in albumData && albumData.album.image[0]["#text"] !== "") {
      return albumData.album.image[0]["#text"];
    } else {
      return "https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/music-med.png";
    }
  };

  return (
    <div className={styles.row}> 
      <input 
        type="text" 
        placeholder="Enter song title"
        aria-label="Title"
        defaultValue={title}
        className={styles.textinput}
        onChange={(event) => setTitle(event.target.value)}/>
      <input 
        type="text" 
        placeholder="Enter artist" 
        aria-label="Artist"
        defaultValue={artist}
        className={styles.textinput}
        onChange={(event) => setArtist(event.target.value)}/>
      <input 
        type="text" 
        placeholder="Enter album"
        aria-label="Album"
        defaultValue={album}
        className={styles.textinput}
        onChange={(event) => setAlbum(event.target.value)}/>
      <input 
        type="button"
        className={styles.buttoninput}
        value="Enter"
        disabled={(title === "") || (artist === "") || (album === "")}
        onClick={
          () => saveSong({...song, title: title, artist: artist, album: album, albumArt: albumArt, timeAdded: moment().toISOString()})}/>
      <input
        type="button"
        className={styles.buttoninput}
        value="Delete"
        onClick={() => complete("delete", {...song})}/>
      <img src={albumArt} className={styles.image}/>
    </div>
  );

}

SongInput.propTypes = {
  complete: PropTypes.func.isRequired,
  song: songType.isRequired
}