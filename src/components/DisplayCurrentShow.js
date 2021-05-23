/*

  This Component will display the current show title and DJs.

  props - shows, an array of shows
*/

import { showType } from "../lib/types.js";
import styles from "../styles/Main.module.css";
import PropTypes from "prop-types";

export default function DisplayCurrentShow({ show, handleClick }) {
  const showExists = typeof show !== "undefined";
  let content = null;

  if (showExists) {
    content = (
      <div>
        <div className={styles.currentshow_title}>ON AIR</div>
        <span className={styles.currentshow_text}>Current Show: </span>
        <span
          className={styles.currentshow_link}
          onClick={() => handleClick(show)}
        >
          {show.title}
        </span>
        <div className={styles.currentshow_djs}>
          <em>DJs: {show.DJs.join(", ")}</em>
        </div>
        <div className={styles.currentshow_text}>
          {" "}
          Call the DJ: 802 443 6423{" "}
        </div>
        <div className={styles.currentshow_message}>
          <strong>TUNE IN!</strong>
        </div>
      </div>
    );
  } else {
    content = (
      <div>
        <div className={styles.header}>ON AIR</div>
        <div className={styles.currentshow_text}> No current show :(( </div>
      </div>
    );
  }

  return <div className={styles.index_grid_div}>{content}</div>;
}

DisplayCurrentShow.propTypes = {
  show: showType,
  handleClick: PropTypes.func.isRequired,
};
