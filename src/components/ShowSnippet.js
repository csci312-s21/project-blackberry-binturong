/*
  ShowSnippet.js

  A simple component that displays the time, title, and DJs of a show.

  props:
    show - a show objects with title, list of DJs
*/
import { showType } from "../lib/types.js";
import { getTimeString } from "../lib/component-utils.js";
import styles from "../styles/Main.module.css";

export default function ShowSnippet({ show }) {
  const time = getTimeString(show.time.hour, show.time.duration);

  return (
    <div className={styles.snippet_div}>
      <span className={styles.snippet_time}>{time}</span>
      <span className={styles.snippet_link}>{show.title}</span>
      <span className={styles.snippet_djs}>{show.DJs.join(", ")}</span>
    </div>
  );
}

ShowSnippet.propTypes = {
  show: showType.isRequired
}
