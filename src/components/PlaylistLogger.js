/*
  PlaylistLogger.js

  Allows DJ to log a new playlist.

*/
import PropTypes from "prop-types";
import { useState } from "react";
import SongInput from "./SongInput.js";
import { getRandomIntID } from "../lib/globals.js";

export default function PlaylistLogger({ complete, showID, playlists }) {
  const [emptyRows, setEmptyRows] = useState([]);

  const currentPlaylist = playlists.find((playlist) => playlist.showID === showID && playlist.isCurrent);

  const addRow = () => {
    const emptySong = {title: "", artist: "", album: "", id: getRandomIntID(), playlistID: currentPlaylist.id}
    const newEmptyRows = emptyRows.concat([emptySong]);
    setEmptyRows(newEmptyRows);
  }
  
  const rows = (currentPlaylist.songs.concat(emptyRows)).map(
    (song) => <li key={song.id.toString()}><SongInput complete={complete} song={song}/></li>);

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
  playlists: PropTypes.array.isRequired,
};
