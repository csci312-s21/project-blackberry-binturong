import PropTypes from "prop-types";
import WeeklyShow from "./WeeklyShow";
import { getDayInt } from "../lib/component-utils.js";
import styles from "../styles/WeeklyShow.module.css";

export default function WeeklySchedule({ shows }){
  const showsArr = [];
  const days = ["","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const firstRow = days.map((d, i) => {
    const currKey = `firstrow${  i}`;
    return (<div key={currKey} className={styles.scheduleDay}>
              {d}
            </div>)
  })

  showsArr.push(firstRow);

  // Add useEffect when writing the onHover function
  for (let i = 0; i < 24; i++){
    showsArr.push([]);
    for (let l = 0; l < 8; l++){
      if (l===0){
        showsArr[showsArr.length-1].push(<div className={styles.scheduleTime}>{`${i}:00`}</div>);
      }
      else {showsArr[showsArr.length-1].push(undefined)}
    }
  }
  
  shows.forEach((s) => {
    const day = getDayInt(s.time.day)+1;
    const time = (s.time.hour / 100)+1;
    showsArr[time][day] = <WeeklyShow show = {s}/>
    if (s.time.duration === 2) {
      showsArr[time+1][day] = <WeeklyShow show = {s}/>
    }
  })


  const table = showsArr.map((item, key1) => {
    const rowKey = `row${  key1}`;
    let count = 0;
    item.forEach((unit) => {
      if (unit === undefined) {
        count += 1;
      }
    });
    
    if (count < 7) {
      return (
        <tbody>
          <tr key={rowKey}>
            {item.map((i, key2) => {
              let result = i;
              if (i === undefined) {
                result = <WeeklyShow show = {{}}/>
              }
              
              let cellKey = key1*1000+key2;
              cellKey = `cell${  cellKey}`;
              return (<td key={cellKey}>
                        {result}
                      </td>);
            })}
          </tr>
        </tbody>
      );
    }
    
  });

  return (
    <div data-testid="schedule">
      <table>
        {table}
      </table>
    </div>
  );
}


WeeklySchedule.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      DJs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      description: PropTypes.string.isRequired,
      time: PropTypes.shape({
        day: PropTypes.string.isRequired,
        hour: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
      }).isRequired,
      genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired
};