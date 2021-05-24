/*
  PlaylistDetails.js

  This component displays a list of all songs in a playlist

  props:
    playlist - the playlist object

*/
import { useState, useEffect } from "react";
import { playlistType, showType } from "../lib/types.js";
import styles from "../styles/PlaylistDetails.module.css";
import moment from "moment";
import { compareTwoSongs } from "../lib/component-utils.js";

export default function PlaylistDetails({ playlist, currShow }) {
  const [playlistSongs, setPlaylistSongs] = useState([]);

  console.log('top')
  console.log(playlist);
  console.log(currShow);
  console.log('buttom')
  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch("/api/songs");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const allSongs = await response.json();
      const filteredSongs = allSongs.filter((song) => song.playlistId === playlist.id)
      console.log('songs')
      console.log(filteredSongs);
      setPlaylistSongs(filteredSongs);
    }
    getSongs();
  }, []);

  let contents;
  if (currShow) {
    playlistSongs.sort((a, b) => compareTwoSongs(a,b));

  const songInfo = playlistSongs.map((song) => 
    <tr key={song.id}>
      <td>{song.time}</td>
      <td>{song.title}</td>
      <td>{song.artist}</td>
      <td>{song.album}</td>
    </tr>
  );

  const dateString = moment(playlist.date, "M-DD-YYYY").format("dddd, MMMM Do, YYYY");
    contents = 
      <div>
        <h2 className={styles.header}>Playlist for {currShow && currShow.title} - {dateString}</h2>
        {
          (songInfo)
          ? <p>No songs to display</p>
          : <table className={styles.songTable}>
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
        }
      </div>
}

  return (
    <div>
      {contents}
    </div>
  );
}

PlaylistDetails.propTypes = {
  playlist: playlistType.isRequired,
  currShow: showType.isRequired
}
