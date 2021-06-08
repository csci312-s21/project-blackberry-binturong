/*
  PlaylistLogger.js

  Allows DJ to log a new playlist.

*/
import { useState, useEffect } from "react";
import SongInput from "./SongInput.js";
import {
  getRandomIntID,
  endShow,
  getCurrentPlaylist,
  compareTwoSongs,
} from "../lib/component-utils.js";
import styles from "../styles/PlaylistLogger.module.css";
import Link from "next/link";

export default function PlaylistLogger() {
  const [emptyRows, setEmptyRows] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const [currentSongs, setCurrentSongs] = useState([]);
  const [currentShow, setCurrentShow] = useState();

  useEffect(() => {
    const getPlaylist = async () => {
      const playlist = await getCurrentPlaylist();
      setCurrentPlaylist(playlist);
    };

    getPlaylist();
  }, []);

  useEffect(() => {
    const getSongs = async () => {
      const response = await fetch("/api/songs");

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const songs = await response.json();
      const currSongs = songs.filter(
        (song) => song.playlistId === currentPlaylist.id
      );
      currSongs.sort((a, b) => compareTwoSongs(a, b));
      setCurrentSongs(currSongs);
    };
    const getShow = async () => {
      const response = await fetch("/api/shows");

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const shows = await response.json();
      setCurrentShow(shows.find((show) => show.id === currentPlaylist.showId));
    };

    if (currentPlaylist) {
      getSongs();
      getShow();
    }
  }, [currentPlaylist, emptyRows, currentSongs]);

  const complete = async (action, newSong) => {
    if (action === "enter") {
      const response = await fetch("/api/songs", {
        method: "POST",
        body: JSON.stringify(newSong),
        headers: new Headers({ "Content-type": "application/json" }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } else if (action === "update") {
      const response = await fetch(`/api/songs/${newSong.id}`, {
        method: "PUT",
        body: JSON.stringify(newSong),
        headers: new Headers({ "Content-type": "application/json" }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } else if (action === "delete") {
      const response = await fetch(`/api/songs/${newSong.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    }
  };

  const addRow = () => {
    const emptySong = {
      title: "",
      artist: "",
      album: "",
      albumArt:
        "https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/music-med.png",
      playlistId: currentPlaylist.id,
      id: getRandomIntID(),
    };
    const newEmptyRows = [...emptyRows, { ...emptySong }];
    setEmptyRows(newEmptyRows);
  };

  const handleClick = (action, song) => {
    if (
      action === "delete" &&
      (song.title === "" || song.artist === "" || song.album === "")
    ) {
      const newRows = emptyRows.filter((row) => row.id !== song.id);
      setEmptyRows(newRows);
    } else if (action === "enter") {
      const newRows = emptyRows.filter((row) => row.id !== song.id);
      setEmptyRows(newRows);
      complete(action, song);
    } else {
      complete(action, song);
    }
  };

  const currentRows = currentSongs.map((song) => (
    <li key={song.id}>
      <SongInput complete={handleClick} song={song} savedInit />
    </li>
  ));

  const currentEmptyRows = emptyRows.map((song) => (
    <li key={song.id}>
      <SongInput complete={handleClick} song={song} savedInit={false} />
    </li>
  ));

  return (
    <div className={styles.playlist}>
      {currentShow && (
        <h1 className={styles.title}>Playlist for {currentShow.title}</h1>
      )}
      <ul className={styles.rows}>{[...currentRows, ...currentEmptyRows]}</ul>
      <input type="button" value="Add Song" onClick={() => addRow()} />
      <Link href="/">
        <input type="button" value="End Show" onClick={() => endShow()} />
      </Link>
    </div>
  );
}
