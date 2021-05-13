import PropTypes from "prop-types";
import DayShow from "./DayShow";
import { getDayString } from "../lib/component-utils.js";
import styles from "../styles/DaySchedule.module.css";
import { showType } from "../lib/types.js";

export default function DaySchedule({ shows , day}){
  const showList = shows.filter((s) => getDayString(s.time.day) === day)
  const showListSorted = showList.sort(function(a, b){return a.time.hour - b.time.hour});

  //this is stupid code: but its the only solution I can come up with...
  let showsDisplayedRow1 = []
  let showsDisplayedRow2 = []
  let showsDisplayedRow3 = []
  let showsDisplayedRow4 = []
  if (showListSorted.length > 7) {
    showsDisplayedRow1 = showListSorted.map((show, index) => {
      if (index < 7){
      return <li className={styles.showList} key={show.id} data-testid="day  show">
        <DayShow show={show}/>
      </li>
      }
    })
    showsDisplayedRow2 = showListSorted.map((show, index) => {
      if (index >= 7){
      return <li className={styles.showList} key={show.id} data-testid="day  show">
        <DayShow show={show}/>
      </li>
      }
    });
    showsDisplayedRow3 = showListSorted.map((show, index) => {
      if (index >= 14){
      return <li className={styles.showList} key={show.id} data-testid="day  show">
        <DayShow show={show}/>
      </li>
      }
    });
    showsDisplayedRow4 = showListSorted.map((show, index) => {
      if (index >= 21){
      return <li className={styles.showList} key={show.id} data-testid="day  show">
        <DayShow show={show}/>
      </li>
      }
    });
  }

  if (showListSorted.length <= 7) {
    showsDisplayedRow1 = showListSorted.map((show) => 
      <li className={styles.showList} key={show.id} data-testid="day show">
        <DayShow show={show}/>
      </li>
    );
  }
  return (
    <div data-testid="day schedule">
      <ul className={styles.inline} >{showsDisplayedRow1}</ul>
      <ul className={styles.inline} >{showsDisplayedRow2}</ul>
      <ul className={styles.inline} >{showsDisplayedRow3}</ul>
      <ul className={styles.inline} >{showsDisplayedRow4}</ul>
    </div>
  );
}


DaySchedule.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired
};