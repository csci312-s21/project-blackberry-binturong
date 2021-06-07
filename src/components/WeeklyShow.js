/*
  WeeklyShow.js
  Shows a single show in the schedule
  props:
    show - the show to display
*/
import PropTypes from "prop-types";
import styles from "../styles/Main.module.css";
import { showType } from "../lib/types.js";
import { colors } from "../lib/component-utils.js";

export default function WeeklyShow({ show }) {
  if (!show) {
    return (
      <div
        className={styles.weeklyshow}
        style={{ backgroundColor: "#DDDDDD" }}
      />
    );
  }

  const genrecolor = colors[show.genres[0].toLowerCase()] || "#444444";

  return (
    <div className={styles.weeklyshow} style={{ backgroundColor: genrecolor }}>
      <p>
        <a className={styles.weeklyshow_title} href={`/shows/${show.id}`}>
          {show.title}
        </a>
      </p>
      <p>{show.DJs.join(", ")}</p>
    </div>
  );
}

WeeklyShow.propTypes = {
  show: PropTypes.shape({ showType }),
};
