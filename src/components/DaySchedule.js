import PropTypes from "prop-types";
import DayShow from "./DayShow";
import { getDayString } from "../lib/component-utils.js";
import styles from "../styles/Main.module.css";
import { showType } from "../lib/types.js";

export default function DaySchedule({ shows, day }) {
  const showList = shows.filter((s) => getDayString(s.day) === day);
  const showListSorted = showList.sort((a, b) => {
    return a.hour - b.hour;
  });

  const showsDisplayed = showListSorted.map((show) => {
    return (
      <li className={styles.dayschedule_item} key={show.id}>
        <DayShow show={show} />
      </li>
    );
  });

  return (
    <div data-testid="day schedule">
      <ul className={styles.dayschedule_list}>{showsDisplayed}</ul>
    </div>
  );
}

DaySchedule.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired,
};
