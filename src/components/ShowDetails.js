/*
  ShowDetails.js

  This component displays a comprehensive overview of all relevant information about a show, 
  including the title, DJ(s), time, description, genres, and past playlists. This page is accessed whenever the user 
  clicks on a show anywhere on the website.

  props:
    show - a show object
*/
import PropTypes from "prop-types";
import { getTimeString, getDayString } from "../lib/component-utils.js";
import styles from "../styles/ShowDetails.module.css";

export default function ShowDetails({ show }) {
  const time = getTimeString(show.time.hour, show.time.duration);
  const day = getDayString(show.time.day);

  return (
    <div data-testid="show details page">
      <h1 className={styles.showTitle}>{show.title}</h1><br/>
      <div><span className={styles.showAttr}>Hosted By:</span> {show.DJs.join(", ")}</div><br/>
      <div><span className={styles.showAttr}>Genre(s):</span> {show.genres.join(", ")}</div><br/>
      <div><span className={styles.showAttr}>Time:</span> {day}, {time}</div><br/>
      <div><span className={styles.showAttr}>Description:</span> {show.description}</div><br/>
      <div><span className={styles.showAttr}>Playlists:</span> TODO</div>
    </div>
    );
}

ShowDetails.propTypes = {
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
  })
};