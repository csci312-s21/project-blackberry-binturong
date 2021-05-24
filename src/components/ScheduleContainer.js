import PropTypes from "prop-types";
import WeeklySchedule from "./WeeklySchedule";
import DaySchedule from "./DaySchedule";
import ScheduleFilter from "./ScheduleFilter";
import { showType } from "../lib/types.js";
import { useState } from "react";
import styles from "../styles/Main.module.css";

export default function FullSchedule({ shows }) {
  const [filter, setFilter] = useState("Week");

  let content;
  if (filter !== "Week") {
    content = (
      <div>
        <ScheduleFilter
          pageList={[
            "Week",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ]}
          currentPage={filter}
          setCurrentPage={setFilter}
        />
        <DaySchedule shows={shows} day={filter} />
      </div>
    );
  } else {
    content = (
      <div>
        <WeeklySchedule shows={shows} setFilter={setFilter} />
      </div>
    );
  }

  return <div className={styles.schedule}>{content}</div>;
}

WeeklySchedule.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired,
};
