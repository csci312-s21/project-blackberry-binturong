/*
  SongInput.js

  Allows DJ to enter information for one song.

*/
import PropTypes from "prop-types";
import { songType } from "../lib/types.js";
import { useState, useEffect } from "react";
import { root, key } from "../lib/api.js";
import styles from "../styles/SongInput.module.css";
import moment from "moment";

export default function SongInput({ complete, song, savedInit }) {
  const [title, setTitle] = useState(song ? song.title : "");
  const [artist, setArtist] = useState(song ? song.artist : "");
  const [album, setAlbum] = useState(song ? song.album : "");
  const [albumArt, setAlbumArt] = useState(song ? song.albumArt : "https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/music-med.png");
  const [saved, setSaved] = useState(savedInit);

  useEffect(() => {
    const getAlbumArt = async (song) => {
      console.log(`${root}?method=album.getinfo&api_key=${key}&artist=${song.artist}&album=${song.album}&format=json`);
      const response = await fetch(
        `${root}?method=album.getinfo&api_key=${key}&artist=${song.artist}&album=${song.album}&format=json`
      );
      
      if (!response.ok) {
        throw new Error(response.statusText);
      };

      const albumData = await response.json();
      
      if ("album" in albumData && albumData.album.image[0]["#text"] !== "") {
        setAlbumArt(albumData.album.image[0]["#text"]);
        complete("update", {...song, albumArt: albumArt});
      }; 
    };
    
    getAlbumArt(song);
    
  }, [saved]);

  const saveSong = (song) => {
    setSaved(true);
    const action = saved ? "update" : "enter";
    complete(action, song);
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
        value={saved ? "Update" : "Enter"}
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
  song: songType.isRequired,
  savedInit: PropTypes.bool.isRequired
}