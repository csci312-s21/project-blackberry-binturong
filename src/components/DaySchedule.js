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
      return <td className={styles.showList} key={show.id} data-testid="day  show">
        <DayShow show={show}/>
      </td>
      }
    })
    showsDisplayedRow2 = showListSorted.map((show, index) => {
      if (index >= 7){
      return <td className={styles.showList} key={show.id} data-testid="day  show">
        <DayShow show={show}/>
      </td>
      }
    });
    showsDisplayedRow3 = showListSorted.map((show, index) => {
      if (index >= 14){
      return <td className={styles.showList} key={show.id} data-testid="day  show">
        <DayShow show={show}/>
      </td>
      }
    });
    showsDisplayedRow4 = showListSorted.map((show, index) => {
      if (index >= 21){
      return <td className={styles.showList} key={show.id} data-testid="day  show">
        <DayShow show={show}/>
      </td>
      }
    });
  }

  if (showListSorted.length <= 7) {
    showsDisplayedRow1 = showListSorted.map((show) => 
      <td className={styles.showList} key={show.id} data-testid="day show">
        <DayShow show={show}/>
      </td>
    );
  }

  console.log(showListSorted)
  return (
    <div data-testid="day schedule">
      <tr className={styles.inline} >{showsDisplayedRow1}</tr>
      <tr className={styles.inline} >{showsDisplayedRow2}</tr>
      <tr className={styles.inline} >{showsDisplayedRow3}</tr>
      <tr className={styles.inline} >{showsDisplayedRow4}</tr>
    </div>
  );
}


DaySchedule.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired
};