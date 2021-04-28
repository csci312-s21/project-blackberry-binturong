/*
  SongInput.js

  Allows DJ to enter information for one song.

*/
import PropTypes from "prop-types";
import { useState } from "react";
import moment from "moment";

export default function SongInput({ complete, song }) {
  const [title, setTitle] = useState(song ? song.title : "");
  const [artist, setArtist] = useState(song ? song.artist : "");
  const [album, setAlbum] = useState(song ? song.album : "");

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
        value="Enter"
        disabled={(title === "") || (artist === "") || (album === "")}
        onClick={
          () => complete({...song, title: title, artist: artist, album: album, timeAdded: moment().toISOString()})}/>
      <input
        type="button"
        value="Delete"
        onClick={() => complete()}/>
    </div>
  );

};

SongInput.propTypes = {
  complete: PropTypes.func.isRequired,
  song: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    timeAdded: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })
}