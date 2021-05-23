import PropTypes from "prop-types";
import DayShow from "./DayShow";
import { getDayString } from "../lib/component-utils.js";
import styles from "../styles/DaySchedule.module.css";
import { showType } from "../lib/types.js";

export default function DaySchedule({ shows , day}){
  const showList = shows.filter((s) => getDayString(s.day) === day)
  const showListSorted = showList.sort((a, b)=> {return a.hour - b.hour});

  const showsDisplayed = showListSorted.map((show) => {
      return <li className={styles.showList} key={show.id}>
        <DayShow show={show}/>
      </li>
    });

  return (
    <ul className={styles.inline}>{showsDisplayed}</ul>
  );
}


DaySchedule.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired
};