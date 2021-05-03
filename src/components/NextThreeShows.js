/*
  NextThreeShows.js
  This component displays a preview of the next three shows, not including the current show.
  props:
    shows - an array of show objects
*/
import PropTypes from "prop-types";
import { showType } from "../lib/types.js";
import styles from "../styles/NextThreeShows.module.css";
import ShowSnippet from "../components/ShowSnippet.js"

export default function NextThreeShows({ shows, handleClick }){

  const nextThree = shows.map((show) => 
    <li className={styles.showListItem} key={show.id} onClick={() => handleClick(show)} data-testid="show snippet">
      <ShowSnippet show={show}/>
    </li>
  );

  return (
    <div className={styles.nextThreeShows}>
      <div className={styles.header}>Today&apos;s next three shows:</div>
      <ul className={styles.showList}>{nextThree}</ul>
      {(nextThree.length < 3) && <div className={styles.message}>That&apos;s all for today!</div>}
    </div>
  );
}

NextThreeShows.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired
};
