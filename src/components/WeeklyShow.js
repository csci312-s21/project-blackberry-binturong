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
import Link from "next/link";

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
      <Link href={`/shows/${show.id}`}>
        <p className={styles.weeklyshow_title}>{show.title}</p>
      </Link>
      <p>{show.DJs.join(", ")}</p>
    </div>
  );
}

WeeklyShow.propTypes = {
  show: PropTypes.shape({ showType }),
};
