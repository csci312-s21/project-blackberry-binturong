/*
  PlaylistLogger.js

  Allows DJ to log a new playlist.

*/
import PropTypes from "prop-types";
import { useState } from "react";
import SongInput from "./SongInput.js";

export default function PlaylistLogger({ complete, showID, playlists }) {
  const [numEmptyRows, setNumEmptyRows] = useState(0);

  const clickButton = (action) => {
    complete();
    (action === "Delete") && setNumEmptyRows(numEmptyRows - 1);
  }

  const currentPlaylist = playlists.find((playlist) => playlist.showID === showID && playlist.isCurrent);
  const rows = currentPlaylist.songs.map(
    (song) => <li key={song.id}><SongInput complete={complete} song={song}/></li>);
  
  for (let i = 0; i < numEmptyRows; i++) {
    rows.push(<li key={i}><SongInput complete={complete}/></li>)
  }

  return (
    <div>
      <ul>{rows}</ul>
      <input
        type="button"
        value="Add Row"
        onClick={() => setNumEmptyRows(numEmptyRows + 1)}
      />
    </div>
  );
};

PlaylistLogger.propTypes = {
  complete: PropTypes.func.isRequired,
  showID: PropTypes.number.isRequired,
  playlists: PropTypes.array.isRequired,
};