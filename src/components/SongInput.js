/*
  SongInput.js

  Allows DJ to enter information for one song.

*/
import PropTypes from "prop-types";
import { songType } from "../lib/types.js";
import { useState } from "react";
import { getRandomIntID } from "../lib/component-utils.js";
import moment from "moment";

export default function SongInput({ complete, song }) {
  const [title, setTitle] = useState(song ? song.title : "");
  const [artist, setArtist] = useState(song ? song.artist : "");
  const [album, setAlbum] = useState(song ? song.album : "");
  const [saved, setSaved] = useState(false);

  const saveSong = (show) => {
    setSaved(true);
    const action = saved ? "update" : "enter";
    complete(action, show);
  }

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
          () => saveSong({...song, title: title, artist: artist, album: album, timeAdded: moment().toISOString()})}/>
      <input
        type="button"
        value="Delete"
        onClick={() => complete("delete", {...song})}/>
    </div>
  );

}

SongInput.propTypes = {
  complete: PropTypes.func.isRequired,
  song: songType.isRequired
}