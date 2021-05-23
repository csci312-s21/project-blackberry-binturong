/*
  NextThreeShows.js
  This component displays a preview of the next three shows, not including the current show.
  props:
    shows - an array of show objects
*/
import PropTypes from "prop-types";
import { showType } from "../lib/types.js";
import styles from "../styles/Main.module.css";
import ShowSnippet from "../components/ShowSnippet.js";

export default function NextThreeShows({ shows, handleClick, setCurrentPage }) {
  const nextThree = shows.map((show) => (
    <li
      key={show.id}
      onClick={() => handleClick(show)}
      data-testid="show snippet"
    >
      <ShowSnippet show={show} />
    </li>
  ));

  return (
    <div className={styles.index_grid_div}>
      <p className={styles.nextshows_title}>Today&apos;s next three shows:</p>
      <ul>{nextThree}</ul>
      {nextThree.length < 3 && (
        <div className={styles.nextshows_text}>That&apos;s all for today!</div>
      )}
      <input
        type="button"
        value="See Full Schedule"
        onClick={() => setCurrentPage("Schedule")}
      />
    </div>
  );
}

NextThreeShows.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
