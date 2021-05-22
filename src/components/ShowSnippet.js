/*
  ShowSnippet.js

  A simple component that displays the time, title, and DJs of a show.

  props:
    show - a show objects with title, list of DJs
*/
import { showType } from "../lib/types.js";
import { getTimeString } from "../lib/component-utils.js";
import styles from "../styles/ShowSnippet.module.css";

export default function ShowSnippet({ show }){
  const time = getTimeString(show.time.hour, show.time.duration);

  return (
    <div>
      <div className={styles.time}>{time}</div>
      <div className={styles.title}>{show.title}</div>
      <div className={styles.djs}>{show.DJs.join(", ")}</div>
    </div>
  );
}

ShowSnippet.propTypes = {
  show: showType.isRequired
}