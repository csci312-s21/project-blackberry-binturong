/*
  WeeklyShow.js
  Shows a single show in the schedule
  props:
    show - the show to display
*/
import PropTypes from "prop-types";
import Link from "next/link";
import styles from "../styles/WeeklyShow.module.css";
import { showType } from "../lib/types.js";
import { colors } from "../lib/component-utils.js"
export default function WeeklyShow({ show }){
  if (Object.keys(show).length === 0){
    return <div className={styles.WeeklyShow} style={{"backgroundColor": "#DDDDDD"}} />
  }
  const djs = show.DJs.join(", ")
  let genrecolor = colors[show.genres[0].toLowerCase()]
  if (genrecolor === undefined) {
    genrecolor = "#444444";
  }
  if (genrecolor === undefined) {
    genrecolor = "#444444";
  }
  return (
    <div className={styles.WeeklyShow} style={{"backgroundColor": genrecolor}}>
      <p className={styles.ShowTitle}><Link href={`/shows/${show.id}`}><a>{show.title}</a></Link></p>
      <p>{djs}</p>
    </div>
  );
}
WeeklyShow.propTypes = {
  show: PropTypes.shape({showType}).isRequired
};