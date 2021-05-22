/*
  ShowOTW.js

  This component displays the time, date, title and DJ's for the SOTW. 

  props:
    show - a show object
*/
import Link from "next/link";

import { showType } from "../lib/types.js";
import styles from "../styles/ShowOTW.module.css";
import { getTimeString, getDayString } from "../lib/component-utils.js";

export default function ShowOTW({ show }){
  const time = getTimeString(show.time.hour, show.time.duration);
  const day = getDayString(show.time.day);
  return (<div className={styles.showOTW}>
      <div className={styles.header}>Show Of The Week</div>
      <div className={styles.title} data-testid="SOTW title"><Link href={`/shows/${show.id}`}><a>{show.title}</a></Link></div>
      <div className={styles.djs}>{show.DJs.length > 1 ? "DJ's: " : "DJ: "}{show.DJs.join(", ")}</div>
      <div className={styles.time}>{day}{", "}{time}</div>
      <div className={styles.description}>{show.description}</div>
    </div>)
}

ShowOTW.propTypes = {
  show: showType.isRequired
};