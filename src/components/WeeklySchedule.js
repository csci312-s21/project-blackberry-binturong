/*
  WeeklySchedule.js

  Shows the whole schedule for the week.

  props:
    shows - show table
*/

import PropTypes from "prop-types";
import WeeklyShow from "./WeeklyShow";
<<<<<<< HEAD
import { dayToInt } from "../lib/component-utils.js";
import styles from "../styles/WeeklyShow.module.css";
import { showType } from "../lib/types.js";


export default function WeeklySchedule({ shows, setFilter}){
  const showsArr = [];
  const days = ["","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const firstRow = days.map((d, i) => {
    const currKey = `firstrow${  i}`;
    return (<div key={currKey} className={styles.Header}
    onClick={() => {setFilter(d)}}>
              {d}
            </div>)
  })
  showsArr.push(firstRow);

  const getHour = (i) => {
    let hour = i<=12 ? i : i-12;
    if (hour === 0) {
      hour = 12
    }
    return `${hour}:00${i<=11?" am":" pm"}`;
  }

  for (let i = 0; i < 24; i++){
    showsArr.push([]);
    for (let l = 0; l < 8; l++){
      if (l===0){
        showsArr[showsArr.length-1].push(<div className={styles.scheduleTime}>{getHour(i)}</div>);
      }
      else {showsArr[showsArr.length-1].push(undefined)}
    }
  }


  
  shows.forEach((s) => {
    const day = dayToInt[s.day]+1;
    const time = (s.hour / 100)+1;
    showsArr[time][day] = <WeeklyShow show = {s}/>
    if (s.duration === 2) {
      showsArr[time+1][day] = <WeeklyShow show = {s}/>
    }
  })

/*
  let showsArrSorted = []
  showsArrSorted.push(showsArr[0])
  for (let i=0; i<18; i++){
    showsArrSorted.push(showsArr[i+7])
  }
  for (let i=0; i<6; i++){
    showsArrSorted.push(showsArr[i+1])
  }
  console.log(showsArrSorted);
*/
=======
import { getDayInt } from "../lib/component-utils.js";
import styles from "../styles/Main.module.css";
import { showType } from "../lib/types.js";

export default function WeeklySchedule({ shows, setFilter }) {
  const showsArr = [];
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

  const firstRow = days.map((d, i) => {
    const currKey = `firstrow${i}`;
    return (
      <div
        key={currKey}
        className={styles.weeklyschedule_header}
        onClick={() => {
          setFilter(d);
        }}
      >
        {d}
      </div>
    );
  });
  showsArr.push(firstRow);

  const getHour = (i) => {
    let hour = i <= 12 ? i : i - 12;
    if (hour === 0) {
      hour = 12;
    }
    return `${hour}:00${i <= 11 ? " am" : " pm"}`;
  };

  for (let i = 0; i < 24; i++) {
    showsArr.push([]);
    for (let l = 0; l < 8; l++) {
      if (l === 0) {
        showsArr[showsArr.length - 1].push(
          <div className={styles.weeklyschedule_time}>{getHour(i)}</div>
        );
      } else {
        showsArr[showsArr.length - 1].push(undefined);
      }
    }
  }

  shows.forEach((s) => {
    const day = getDayInt(s.time.day) + 1;
    const time = s.time.hour / 100 + 1;
    showsArr[time][day] = <WeeklyShow show={s} />;
    if (s.time.duration === 2) {
      showsArr[time + 1][day] = <WeeklyShow show={s} />;
    }
  });
>>>>>>> 2e4d73967bed0aa2f523c552e810d2b5eadc12ab

  const table = showsArr.map((item, key1) => {
    const rowKey = `row${key1}`;
    let count = 0;
    item.forEach((unit) => {
      if (unit === undefined) {
        count += 1;
      }
    });
<<<<<<< HEAD
    
=======

>>>>>>> 2e4d73967bed0aa2f523c552e810d2b5eadc12ab
    if (count < 7) {
      return (
        <tr key={rowKey}>
          {item.map((i, key2) => {
            let result = i;
            if (result === undefined) {
<<<<<<< HEAD
              result = <WeeklyShow show ={{}} />;
            }
            let cellKey = key1*1000+key2;
            cellKey = `cell${  cellKey}`;
            return (<td key={cellKey}>
                      {result}
                    </td>);
           })}
          </tr>
      );
    }
    
=======
              result = <WeeklyShow show={{}} />;
            }
            let cellKey = key1 * 1000 + key2;
            cellKey = `cell${cellKey}`;
            return <td key={cellKey}>{result}</td>;
          })}
        </tr>
      );
    }
>>>>>>> 2e4d73967bed0aa2f523c552e810d2b5eadc12ab
  });

  return (
    <div data-testid="schedule">
      <table>
<<<<<<< HEAD
        <tbody>
          {table}
        </tbody>
=======
        <tbody>{table}</tbody>
>>>>>>> 2e4d73967bed0aa2f523c552e810d2b5eadc12ab
      </table>
    </div>
  );
}

WeeklySchedule.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired,
<<<<<<< HEAD
  setFilter: PropTypes.func.isRequired
};
=======
  setFilter: PropTypes.func.isRequired,
};
>>>>>>> 2e4d73967bed0aa2f523c552e810d2b5eadc12ab
