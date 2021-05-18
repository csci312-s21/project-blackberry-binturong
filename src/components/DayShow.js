import PropTypes from "prop-types";
import styles from "../styles/DayShow.module.css";
import { showType } from "../lib/types.js";
import { getTimeString } from "../lib/component-utils.js";
import { colors } from "../lib/component-utils.js";

export default function DayShow({ show }){
  const time = getTimeString(show.time.hour, show.time.duration);
  const genrecolor = colors[show.genres[0].toLowerCase()]

  return (
    <div className={styles.DayShow} style={{"backgroundColor": genrecolor}}>
      <div className={styles.time}>{time}</div>
      <p className={styles.ShowTitle}>{show.title}</p>
      <div className={styles.djs}>{show.DJs.join(", ")}</div>
    </div>
  );
}

DayShow.propTypes = {
  show: PropTypes.shape({showType}).isRequired
};