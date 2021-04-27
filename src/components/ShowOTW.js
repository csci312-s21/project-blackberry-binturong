/*
  ShowOTW.js

  This component displays the time, date, title and DJ's for the SOTW. 

  props:
    show - a show object
*/
import PropTypes from "prop-types";
import styles from "../styles/ShowOTW.module.css";
import { prettyTimeFormat, getDayString } from "../lib/globals.js";

export default function ShowOTW({ show }){
  const time = prettyTimeFormat(show.time.hour, show.time.duration);
  const day = getDayString(show.time.day);
  return (<div className={styles.showOTW}>
      <div className={styles.header}>Show Of The Week</div>
      <div className={styles.title}>{show.title}</div>
      <div className={styles.djs}>{show.DJs.length > 1 ? "DJ's: " : "DJ: "}{show.DJs.join(", ")}</div>
      <div className={styles.time}>{day}{", "}{time}</div>
      <div className={styles.description}>{show.description}</div>
    </div>)
}

ShowOTW.propTypes = {
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