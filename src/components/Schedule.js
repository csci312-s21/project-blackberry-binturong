import PropTypes from "prop-types";
import WeeklySchedule from "./WeeklySchedule";
import DaySchedule from "./DaySchedule";
import ScheduleNavBar from "./NavBar";
import { showType } from "../lib/types.js";
import { useState } from "react";
import styles from "../styles/Schedule.module.css";

export default function Schedule({ shows }){
  const [filter, setFilter] = useState("Week");

  const body = <div className={styles.body}>
  <ScheduleNavBar pageList = {["Week", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]} currentPage={filter}  setCurrentPage= {setFilter}/> 
  {filter === "Week" ? <WeeklySchedule shows = {shows}/> : <DaySchedule shows = {shows} day= {filter} />}

  </div>
  return <div> {body} </div>
}

WeeklySchedule.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired
};