/*
  SongInput.js

  Allows DJ to enter information for one song.

*/
import PropTypes from "prop-types";
import { useState } from "react";
import moment from "moment";

export default function SongInput({ complete }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter song title" 
        defaultValue={title}
        onChange={(event) => setTitle(event.target.value)}/>
      <input 
        type="text" 
        placeholder="Enter artist" 
        defaultValue={artist}
        onChange={(event) => setArtist(event.target.value)}/>
      <input 
        type="text" 
        placeholder="Enter album" 
        defaultValue={album}
        onChange={(event) => setAlbum(event.target.value)}/>
      <input 
        type="button"
        value="Enter"
        disabled={(title === "") || (artist === "") || (album === "")}
        onClick={() => complete({title: title, artist: artist, album: album, timeAdded: moment().toISOString()})}/>
      <input
        type="button" 
        value="Delete" 
        onClick={() => complete()}/>
    </div>
  );

};

SongInput.propTypes = {
  complete: PropTypes.func.isRequired,
}