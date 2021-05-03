/*

  This Component will display the current show title and DJs.

  props - shows, an array of shows
*/

import { showType } from "../lib/types.js";
import styles from "../styles/DisplayCurrentShow.module.css";


export default function DisplayCurrentShow({ show, handleClick }){

  const showExists = (typeof show !== "undefined")

  return (
    <div className={styles.nextThreeShows}>
      <div className={styles.header}>ON AIR</div>
      {!showExists && <div className={styles.infoText}> No current show :(( </div>}
      {showExists && <div onClick={() => handleClick(show)} className={styles.show}>Current Show: <strong>{show.title}</strong></div>}
      {showExists && <div className={styles.infoText}><em>DJs: {show.DJs.join(", ")}</em></div>}
      {showExists && <div className={styles.infoText}> Call the DJ: 802 443 6423 </div>}
      <div className={styles.message}>TUNE IN!</div>
    </div>
  );
}

DisplayCurrentShow.propTypes = {
  show: showType.isRequired
};
