/*
  ShowOTW.js

  This component displays the time, date, title and DJ's for the SOTW.

  props:
    show - a show object
*/
import { showType } from "../lib/types.js";
import styles from "../styles/Main.module.css";
import { getTimeString, getDayString } from "../lib/component-utils.js";
import Link from "next/link";

export default function ShowOTW({ show }) {
  const time = getTimeString(show.hour, show.duration);
  const day = getDayString(show.day);
  return (
    <div className={styles.index_grid_div}>
      <p className={styles.showotw_title}>Show Of The Week</p>
      <Link href={`/shows/${show.id}`}>
        <div className={styles.showotw_link}>{show.title}</div>
      </Link>
      <p className={styles.showotw_djs}>
        {show.DJs.length > 1 ? "DJs: " : "DJ: "}
        {show.DJs.join(", ")}
      </p>
      <p className={styles.showotw_text}>
        {day}, {time}
      </p>
      <p className={styles.showotw_text}>{show.description}</p>
    </div>
  );
}

ShowOTW.propTypes = {
  show: showType.isRequired,
};
