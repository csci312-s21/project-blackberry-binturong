/*
  SongInput.js

  Allows DJ to enter information for one song.

*/
import PropTypes from "prop-types";
import { songType } from "../lib/types.js";
import { useState } from "react";
import { root, key } from "../lib/api.js";
import moment from "moment";

export default function SongInput({ complete, song }) {
  const [title, setTitle] = useState(song ? song.title : "");
  const [artist, setArtist] = useState(song ? song.artist : "");
  const [album, setAlbum] = useState(song ? song.album : "");
  const [albumArt, setAlbumArt] = useState(song ? song.albumArt : "https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/music-med.png");
  const [saved, setSaved] = useState(false);

  const saveSong = (song) => {
    setSaved(true);
    getAlbumArt(song);

    const action = saved ? "update" : "enter";
    complete(action, {...song, albumArt: albumArt});
  };

  const getAlbumArt = async (song) => {
    const response = await fetch(`${root}?method=album.getinfo&api_key=${key}&artist=${song.artist}&album=${song.album}&format=json`);
    
    if (!response.ok) {
      throw new Error(response.statusText);
    };

    const albumData = await response.json();
    const smallImg = albumData.album.image[0]["#text"];
    
    if (smallImg !== "") {
      setAlbumArt(smallImg);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter song title"
        aria-label="Title"
        defaultValue={title}
        onChange={(event) => setTitle(event.target.value)}/>
      <input 
        type="text" 
        placeholder="Enter artist" 
        aria-label="Artist"
        defaultValue={artist}
        onChange={(event) => setArtist(event.target.value)}/>
      <input 
        type="text" 
        placeholder="Enter album"
        aria-label="Album"
        defaultValue={album}
        onChange={(event) => setAlbum(event.target.value)}/>
      <input 
        type="button"
        value={saved ? "Update" : "Enter"}
        disabled={(title === "") || (artist === "") || (album === "")}
        onClick={
          () => saveSong({...song, title: title, artist: artist, album: album, albumArt: albumArt, timeAdded: moment().toISOString()})}/>
      <input
        type="button"
        value="Delete"
        onClick={() => complete("delete", {...song})}/>
      <img src={albumArt}/>
    </div>
  );

}

SongInput.propTypes = {
  complete: PropTypes.func.isRequired,
  song: songType.isRequired
}