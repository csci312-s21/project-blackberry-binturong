/*
  PlaylistDetails.js

  This component displays a list of all songs in a playlist

  props:
    playlist - the playlist objecy
    songs - song table
    currShow - the show that the playlist belongs to

*/
import Link from "next/link";

import { playlistType, songType, showType } from "../lib/types.js";
import PropTypes from "prop-types";
import styles from "../styles/PlaylistDetails.module.css";
import moment from "moment";
import { compareTwoSongs } from "../lib/component-utils.js";

export default function PlaylistDetails({ playlist, songs, currShow }) {
  const playlistSongs = songs.filter((song) => song.playlistID === playlist.id);
  playlistSongs.sort((a, b) => compareTwoSongs(a,b));

  const songInfo = playlistSongs.map((song) => 
    <tr key={song.id}>
      <td>{song.timeAdded}</td>
      <td>{song.title}</td>
      <td>{song.artist}</td>
      <td>{song.album}</td>
    </tr>
  );

  const dateString = moment(playlist.date, "M-DD-YYYY").format("dddd MMMM Do YYYY");

  return (
    <div>
      <h2 className={styles.header}>
        {`Playlist for ${currShow.title} ${dateString}`}
      </h2>
      <table className={styles.songTable}>
        <tbody>
          <tr>
            <th>Time</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
          </tr>
          {songInfo}
        </tbody>
      </table>
      <Link href={`/shows/${currShow.id}`}>
        <input className={styles.returnButton} type="button" value="<< Back to show information"/>
      </Link>
    </div>
  );
}

PlaylistDetails.propTypes = {
  playlist: playlistType.isRequired,
  songs: PropTypes.arrayOf(songType).isRequired,
  currShow: showType.isRequired
}