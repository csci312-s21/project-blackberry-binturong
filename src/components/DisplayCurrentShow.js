/*
  DisplayCurrentShow.js

  This Component will display the current show title and DJs.

  props:
    show - current show
*/
import Link from "next/link";
import { showType } from "../lib/types.js";
import styles from "../styles/Main.module.css";

export default function DisplayCurrentShow({ show }) {
  let content;
  if (show) {
    content = (
      <div>
        <div className={styles.currentshow_title}>ON AIR</div>
        <span className={styles.currentshow_text}>Current Show: </span>
        <Link href={`/shows/${show.id}`}>
          <a className={styles.currentshow_link}>{show.title}</a>
        </Link>
        <div className={styles.currentshow_djs}>
          <em>DJs: {show.DJs.join(", ")}</em>
        </div>
        <div className={styles.currentshow_text}>Call the DJ: 802 443 6423</div>
        <div className={styles.currentshow_message}>
          <strong>TUNE IN!</strong>
        </div>
      </div>
    );
  } else {
    content = (
      <div>
        <div className={styles.header}>ON AIR</div>
        <div className={styles.currentshow_text}> No current show :( </div>
      </div>
    );
  }

  return <div className={styles.index_grid_div}>{content}</div>;
}

DisplayCurrentShow.propTypes = {
  show: showType,
};
