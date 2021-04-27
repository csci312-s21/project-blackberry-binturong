/*
  ShowPage.js

  This component displays a comprehensive overview of all relevant information about a show, 
  including the title, DJ(s), time, description, genres, and past playlists. This page is accessed whenever the user 
  clicks on a show anywhere on the website.

  props:
    show - a show object
*/
import PropTypes from "prop-types";
import { getTimeString, getDayString } from "../lib/globals.js";
import styles from "../styles/ShowPage.module.css";

export default function ShowPage({ show }) {
  const time = getTimeString(show.time.hour, show.time.duration);
  const day = getDayString(show.time.day);

  return (
    <div>
      <h1 className={styles.showTitle}>{show.title}</h1><br/>
      <div><span className={styles.category}>Hosted By:</span> {show.DJs.join(" ")}</div><br/>
      <div><span className={styles.category}>Genre(s):</span> {show.genres.join(" ")}</div><br/>
      <div><span className={styles.category}>Time:</span> {day}, {time}</div><br/>
      <div><span className={styles.category}>Description:</span> {show.description}</div><br/>
      <div><span className={styles.category}>Playlists:</span> TODO</div>
    </div>
    );
}

ShowPage.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string.isRequired,
    DJs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.shape({
      day: PropTypes.string.isRequired,
      hour: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
    }).isRequired,
    genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired
};
