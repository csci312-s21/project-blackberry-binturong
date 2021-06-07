/*
  ShowSnippet.js

  A simple component that displays the time, title, and DJs of a show.

  props:
    show - a show objects with title, list of DJs
*/
import { showType } from "../lib/types.js";
import { getTimeString } from "../lib/component-utils.js";
import styles from "../styles/Main.module.css";
import Link from "next/link";

export default function ShowSnippet({ show }) {
  const time = getTimeString(show.hour, show.duration);

  return (
    <Link href={`/shows/${show.id}`}>
      <tr className={styles.snippet_div} data-testid="show snippet">
        <td>{time}</td>
        <td>
          <strong>{show.title}</strong>
        </td>
        <td>
          <em>{show.DJs.join(", ")}</em>
        </td>
      </tr>
    </Link>
  );
}

ShowSnippet.propTypes = {
  show: showType.isRequired,
};
