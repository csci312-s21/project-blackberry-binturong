/*

  This Component will display the current playlists.

  props - current playlist , allSongs
*/

import { playlistType, songType } from "../lib/types.js";
import PropTypes from "prop-types"; 

export default function DisplayCurrentPlaylist({ playlist, allSongs }){

const currentSongs = allSongs.filter((song) => song.playlistID === playlist.id);

const cleanTime = currentSongs.map((song) => 
  song.timeAdded = new Date(song.timeAdded)
);

const currentPlaylist = currentSongs.map((song) => 
    <li key={song.id}>
      {song.timeAdded.toLocaleString("en-US")} Song: {song.title} Artist: {song.artist} Album: {song.album}
    </li>
  );

  return (
    <div>
      {currentPlaylist}
    </div>
  );
}

DisplayCurrentPlaylist.propTypes = {
  playlist: playlistType.isRequired,
  allSongs: PropTypes.arrayOf(songType).isRequired
};

