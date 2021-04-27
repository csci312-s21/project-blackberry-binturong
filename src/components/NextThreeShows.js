/*
  NextThreeShows.js

  This component displays a preview of the next three shows, not including the current show.

  props:
    shows - an array of show objects
*/
import PropTypes from "prop-types";
import { dayToInt, compareTwoShows } from "../lib/component-utils.js";
import moment from "moment";
import ShowSnippet from "./ShowSnippet.js";
import styles from "../styles/NextThreeShows.module.css";

export default function NextThreeShows({ shows }){
  const now = moment();

  const upcomingShows = shows.filter(
    (show) => (dayToInt[show.time.day] === now.day()) && (show.time.hour > (now.hour() * 100)));

  upcomingShows.sort((a, b) => compareTwoShows(a, b));

  const nextThree = upcomingShows.slice(0, 3).map((show) => 
    <li key={show.id}>
      <ShowSnippet show={show}/>
    </li>
  );

  return (
    <div className={styles.nextThreeShows}>
      <div className={styles.header}>Today&apos;s next three shows:</div>
      <ul className={styles.showList}>{nextThree}</ul>
      {(upcomingShows.length <= 3) && <div className={styles.message}>That&apos;s all for today!</div>}
    </div>
  );
}

NextThreeShows.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.shape({
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
  ).isRequired
};
