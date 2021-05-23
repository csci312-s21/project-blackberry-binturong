/*
  ShowDetails.js

  This component displays all relevant information about a show, including the title, DJ(s), time, description, 
  genres, and past playlists. This page is accessed whenever the user clicks on a show anywhere on the website.

  props:
    show - a show object
*/
import Link from "next/link";

import PropTypes from "prop-types";
import { getTimeString, getDayString, compareTwoPlaylists } from "../lib/component-utils.js";
import styles from "../styles/ShowDetails.module.css";
import { showType } from "../lib/types.js";
import { useState, useEffect } from "react";

export default function ShowDetails({ show }) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const getPlaylists = async () => {
      const response = await fetch("/api/playlists");

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const fetchedPlaylists = await response.json();

      setPlaylists(fetchedPlaylists);
    }
    getPlaylists();
  }, []);

  const time = getTimeString(show.hour, show.duration);
  const day = getDayString(show.day);

  const playlistsForShow = playlists.filter((playlist) => playlist.showID === show.id);

  playlistsForShow.sort((a, b) => compareTwoPlaylists(a, b)).reverse();

  const playlistDates = playlistsForShow.map(
    (playlist) => <li key={playlist.id} data-testid="playlist-date"><Link href={`/playlists/${playlist.id}`}><a>{playlist.date}</a></Link></li>);

  return (
    <div data-testid="show details page">
      <h1 className={styles.showTitle}>{show.title}</h1><br/>
      <div><span className={styles.showAttr}>Hosted By: </span>{show.DJs.join(", ")}</div><br/>
      <div><span className={styles.showAttr}>Genre(s): </span>{show.genres.join(", ")}</div><br/>
      <div><span className={styles.showAttr}>Time: </span>{day}, {time}</div><br/>
      <div><span className={styles.showAttr}>Description: </span>{show.description}</div><br/>
      <div>
        <span className={styles.showAttr}>Playlists: </span>
        {(playlistDates.length > 0)
          ? <ul className={styles.playlistDates}>{playlistDates}</ul>
          : "No playlists to display"}
      </div>
    </div>
    );
}

ShowDetails.propTypes = {
  show: showType.isRequired
};
