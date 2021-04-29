/*
  PlaylistLogger.js

  Allows DJ to log a new playlist.

*/
import PropTypes from "prop-types";
import { playlistType } from "../lib/types.js";
import { useState } from "react";
import SongInput from "./SongInput.js";
import { getRandomIntID } from "../lib/component-utils.js";

export default function PlaylistLogger({ complete, showID, currentPlaylist }) {
  const [emptyRows, setEmptyRows] = useState([]);

  const addRow = () => {
    const emptySong = {title: "", artist: "", album: "", id: getRandomIntID(), playlistID: currentPlaylist.id}
    const newEmptyRows = emptyRows.concat([emptySong]);
    setEmptyRows(newEmptyRows);
  }

  const handleClick = (action, song) => {
    if(action === "delete" && ((song.title === "") || (song.artist === "") || (song.album === ""))) {
      const newRows = emptyRows.filter((row) => row.id !== song.id);
      setEmptyRows(newRows);
    }
    // complete(action, song);
  }
  
  const rows = (currentPlaylist.songs.concat(emptyRows)).map(
    (song) => <li key={song.id.toString()}><SongInput complete={handleClick} song={song}/></li>);

  return (
    <div>
      <ul>{rows}</ul>
      <input
        type="button"
        value="Add Row"
        onClick={() => addRow()}
      />
    </div>
  );
}

PlaylistLogger.propTypes = {
  complete: PropTypes.func.isRequired,
  showID: PropTypes.number.isRequired,
  currentPlaylist: playlistType.isRequired,
};
