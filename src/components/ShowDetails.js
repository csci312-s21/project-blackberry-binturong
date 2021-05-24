/*
  ShowDetails.js

  This component displays all relevant information about a show, including the title, DJ(s), time, description, 
  genres, and past playlists. This page is accessed whenever the user clicks on a show anywhere on the website.

  props:
    show - a show object
    playlists - playlist table
*/
import PropTypes from "prop-types";
import {
  getTimeString,
  getDayString,
  compareTwoPlaylists,
} from "../lib/component-utils.js";
import styles from "../styles/Main.module.css";
import { showType, playlistType } from "../lib/types.js";

export default function ShowDetails({ show, playlists }) {
  const time = getTimeString(show.time.hour, show.time.duration);
  const day = getDayString(show.time.day);

  const playlistsForShow = playlists.filter(
    (playlist) => playlist.showID === show.id
  );

  playlistsForShow.sort((a, b) => compareTwoPlaylists(a, b)).reverse();

  const playlistDates = playlistsForShow.map((playlist) => (
    <a href={`/playlists/${playlist.id}`} key={`${playlist.id}`}>
      {playlist.date}
    </a>
  ));

  return (
    <div data-testid="show details page">
      <h1 className={styles.showdetails_title}>{show.title}</h1>
      <br />
      <div className={styles.showdetails_div}>
        <div>
          <span className={styles.showdetails_attr}>Hosted By: </span>
          {show.DJs.join(", ")}
        </div>
        <br />
        <div>
          <span className={styles.showdetails_attr}>Genre(s): </span>
          {show.genres.join(", ")}
        </div>
        <br />
        <div>
          <span className={styles.showdetails_attr}>Time: </span>
          {day}, {time}
        </div>
        <br />
        <div>
          <span className={styles.showdetails_attr}>Description: </span>
          {show.description}
        </div>
        <br />
        <div>
          <p className={styles.showdetails_attr}>Playlists: </p>
          {playlistDates.length > 0 ? (
            <ul className={styles.showdetails_time}>{playlistDates}</ul>
          ) : (
            "No playlists to display"
          )}
        </div>
      </div>
    </div>
  );
}

ShowDetails.propTypes = {
  show: showType.isRequired,
  playlists: PropTypes.arrayOf(playlistType).isRequired,
};
