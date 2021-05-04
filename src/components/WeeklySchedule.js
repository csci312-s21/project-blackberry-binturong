import PropTypes from "prop-types";
import WeeklyShow from "./WeeklyShow";
import { getDayInt } from "../lib/globals.js";
import styles from "../styles/WeeklyShow.module.css";

export default function WeeklySchedule({ shows }){
  const showsArr = [];
  const days = ['','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const firstRow = days.map((d) => {
    return (<div className={styles.scheduleDay}>
              {d}
            </div>)
  })

  showsArr.push(firstRow);

  // Add useEffect when writing the onHover function
  for (let i = 0; i < 24; i++){
    showsArr.push([]);
    for (let l = 0; l < 8; l++){
      if (l===0){
        showsArr[showsArr.length-1].push(<div className={styles.scheduleTime}>{i+":00"}</div>);
      }
      //else {showsArr[showsArr.length-1].push(<WeeklyShow show = {{}}/>)};
      else {showsArr[showsArr.length-1].push(undefined)};
    }
  }
  
  shows.forEach((s) => {
    let day = getDayInt(s.time.day)+1;
    let time = (s.time.hour / 100)+1;
    let genre = s.genre;
    showsArr[time][day] = <WeeklyShow show = {s}/>
  })


  const table = showsArr.map((item) => {
    let count = 0;
    item.forEach((unit) => {
      if (unit === undefined) {
        count += 1;
      }
    });
    
    if (count < 7) {
      return (
        <tr>
          {item.map((i) => {
            let result = i;
            if (i === undefined) {
              result = <WeeklyShow show = {{}}/>
            }

            return (<td>
                      {result}
                    </td>);
          })}
        </tr>
      );
    }
    
  });

  return (
    <div>
      <table>
        {table}
      </table>
    </div>
  );
};


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
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
};