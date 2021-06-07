/*
  WeeklySchedule.js

  Shows the whole schedule for the week.

  props:
    shows - show table
*/

import PropTypes from "prop-types";
import WeeklyShow from "./WeeklyShow";
import { dayToInt } from "../lib/component-utils.js";
import styles from "../styles/Main.module.css";
import { showType } from "../lib/types.js";
import moment from "moment";
import Table from "react-bootstrap/Table";

export default function WeeklySchedule({ shows, setFilter }) {
  const days = [
    "",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const headers = days.map((day) => (
    <th
      key={day}
      className={styles.weeklyschedule_header}
      onClick={() => setFilter(day)}
    >
      {day}
    </th>
  ));

  const showsArr = [];

  const getHour = (i) => {
    return moment(i, "H").format("h:mm a");
  };

  for (let hour = 0; hour < 24; hour++) {
    showsArr.push([]);
    for (let day = 0; day < 8; day++) {
      showsArr[showsArr.length - 1].push(
        day === 0 ? (
          <div className={styles.weeklyschedule_time}>{getHour(hour)}</div>
        ) : undefined
      );
    }
  }

  shows.forEach((show) => {
    const day = dayToInt[show.day] + 1;
    const time = show.hour / 100;
    for (let d = 0; d < show.duration; d++) {
      showsArr[time + d][day] = <WeeklyShow show={show} />;
    }
  });

  const table = showsArr.map(
    (row, key1) =>
      !row.slice(1).every((unit) => !unit) && (
        <tr key={`row${key1}`}>
          {/* eslint-disable-line */}
          {row.map((show, key2) => (
            <td key={`cell${key1 * 1000 + key2}`}>
              {show ? show : <WeeklyShow />}
            </td>
          ))}
        </tr>
      )
  );

  return (
    <div data-testid="schedule" className={styles.weekly_table}>
      <Table responsive borderless size="sm">
        <tbody>
          <tr>{headers}</tr>
          {table}
        </tbody>
      </Table>
    </div>
  );
}

WeeklySchedule.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired,
  setFilter: PropTypes.func.isRequired,
};
