/*

  This Component will display the current show title and DJs.

  props - shows, an array of shows (Is this leaky abstraction)
*/

import PropTypes from "prop-types";
import { dayToInt } from "../lib/component-utils.js";
import moment from "moment";
import ShowSnippet from "./ShowSnippet.js";
import styles from "../styles/DisplayCurrentShow.module.css";


export default function DisplayCurrentShow({ shows }){
  const now = moment();

  const upcomingShows = shows.filter(
    (show) => (dayToInt[show.time.day] === now.day()) && (show.time.hour === (now.hour() * 100)));

  let showExists = (typeof upcomingShows[0] !== 'undefined')

  return (
    <div className={styles.nextThreeShows}>
      <div className={styles.header}>ON AIR</div>
      {!showExists && <div className={styles.show}> No current show :(( </div>}
      {showExists && <div className={styles.show}>Current Show: <strong>{upcomingShows[0].title}</strong></div>}
      {showExists && <div className={styles.show}><em>DJs: {upcomingShows[0].DJs.join(', ')}</em></div>}
      {showExists && <div className={styles.show}> Call the DJ: 802 443 6423 </div>}
      {(upcomingShows.length <= 3) && <div className={styles.message}>TUNE IN!</div>}
    </div>
  );
}

DisplayCurrentShow.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      DJs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      description: PropTypes.string.isRequired,
      time: PropTypes.shape({
        day: PropTypes.string.isRequired,
        hour: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
      }).isRequired,
      genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired
};


// export default function DisplayCurrentShow({ shows}){
//   const now = moment();

//   const currentShow = shows.filter((show) => (dayToInt[show.time.day] === now.day()) && (show.time.hour === (now.hour() * 100)));

//   //let displayed = currentShow[0].title;
//   console.log(currentShow);
  
//   return (
//     <div>
      
//     </div>
//   );
// }