/*
  ShowSnippet.js

  A simple component that displays the time, title, and DJs of a show.

  props:
    show - a show objects with title, list of DJs, hour, and duration attributes at minimum
*/
import PropTypes from "prop-types";
import { prettyTimeFormat } from "../lib/globals.js";
import styles from "../styles/ShowSnippet.module.css";

export default function ShowSnippet({ show }){
  const time = prettyTimeFormat(show.time.hour, show.time.duration);

  return (
    <div>
      <div className={styles.time}>{time}</div>
      <div className={styles.title}>{show.title}</div>
      <div className={styles.djs}>{show.DJs}</div>
    </div>
  );
}

ShowSnippet.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string.isRequired,
    DJs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    description: PropTypes.string,
    time: PropTypes.shape({
      day: PropTypes.string,
      hour: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
    }).isRequired,
    genres: PropTypes.arrayOf(PropTypes.string.isRequired),
    id: PropTypes.string.isRequired,
  }).isRequired
}