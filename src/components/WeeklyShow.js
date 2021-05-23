import PropTypes from "prop-types";
import styles from "../styles/Main.module.css";
import { showType } from "../lib/types.js";
import { colors } from "../lib/component-utils.js";

export default function WeeklyShow({ show }) {
  if (Object.keys(show).length === 0) {
    return (
      <div
        className={styles.weeklyshow}
        style={{ backgroundColor: "#DDDDDD" }}
      />
    );
  }

  const djs = show.DJs.join(", ");
  let genrecolor = colors[show.genres[0].toLowerCase()];

  if (genrecolor === undefined) {
    genrecolor = "#444444";
  }

  if (genrecolor === undefined) {
    genrecolor = "#444444";
  }

  return (
    <div className={styles.weeklyshow} style={{ backgroundColor: genrecolor }}>
      <p className={styles.weeklyshow_title}>{show.title}</p>
      <p>{djs}</p>
    </div>
  );
}

WeeklyShow.propTypes = {
  show: PropTypes.shape({ showType }).isRequired,
};
