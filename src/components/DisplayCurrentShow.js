/*
  DisplayCurrentShow.js

  This Component will display the current show title and DJs.

  props:
    show - current show
*/
import Link from "next/link";

import { showType } from "../lib/types.js";
import styles from "../styles/DisplayCurrentShow.module.css";

export default function DisplayCurrentShow({ show }){

  const showExists = (typeof show !== "undefined");

  return (
    <div className={styles.nextThreeShows}>
      <div className={styles.header}>ON AIR</div>
      {!showExists && <div className={styles.infoText}> No current show :(( </div>}
      {showExists && <div className={styles.show}>Current Show: <strong><Link href={`/shows/${show.id}`}><a>{show.title}</a></Link></strong></div>}
      {showExists && <div className={styles.infoText}><em>DJs: {show.DJs.join(", ")}</em></div>}
      {showExists && <div className={styles.infoText}> Call the DJ: 802 443 6423 </div>}
      <div className={styles.message}>TUNE IN!</div>
    </div>
  );
}

DisplayCurrentShow.propTypes = {
  show: showType
};
