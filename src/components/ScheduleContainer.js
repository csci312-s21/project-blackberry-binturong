import PropTypes from "prop-types";
import WeeklySchedule from "./WeeklySchedule";
import DaySchedule from "./DaySchedule";
import ScheduleFilter from "./ScheduleFilter";
import { showType } from "../lib/types.js";
import { useState } from "react";
import styles from "../styles/Main.module.css";

export default function ScheduleContainer({ shows }) {
  const [filter, setFilter] = useState("Week");

  const pages = [
    "Week",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className={styles.schedule}>
      {filter === "Week" ? (
        <WeeklySchedule shows={shows} setFilter={setFilter} />
      ) : (
        <div>
          <ScheduleFilter
            pageList={pages}
            currentPage={filter}
            setCurrentPage={setFilter}
          />
          <DaySchedule shows={shows} day={filter} />
        </div>
      )}
    </div>
  );
}

WeeklySchedule.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired,
};
