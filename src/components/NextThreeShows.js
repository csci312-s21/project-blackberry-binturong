/*
  NextThreeShows.js
  This component displays a preview of the next three shows, not including the current show.

  props:
    shows - an array of show objects
*/
import Link from "next/link";

import PropTypes from "prop-types";
import { showType } from "../lib/types.js";
import styles from "../styles/Main.module.css";
import ShowSnippet from "../components/ShowSnippet.js";
import Table from "react-bootstrap/Table";

export default function NextThreeShows({ shows }) {
  const nextThree = shows.map((show) => (
    <tbody key={show.id}>
      <ShowSnippet show={show} />
    </tbody>
  ));

  return (
    <div className={styles.index_grid_div}>
      <div className={styles.nextshows_title}>
        Today&apos;s next three shows:
      </div>
      <Table hover borderless responsive className={styles.nextshows_table}>
        {nextThree}
      </Table>
      {nextThree.length < 3 && (
        <div className={styles.nextshows_text}>That&apos;s all for today!</div>
      )}
      <Link href="/schedule">
        <input
          className={styles.nextshows_button}
          type="button"
          value="See Full Schedule"
        />
      </Link>
    </div>
  );
}

NextThreeShows.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired,
};
