import PropTypes from "prop-types";
import WeeklyShow from "./WeeklyShow";
import { getDayInt } from "../lib/component-utils.js";
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

  // Add useEffect when writing the onHover function

  for (let i = 0; i < 24; i++){
    showsArr.push([]);
    for (let l = 0; l < 8; l++){
      if (l===0){
        showsArr[showsArr.length-1].push(<div className={styles.scheduleTime}>{`${i<=12?i:i-12}:00${i<=11?" am":" pm"}`}</div>);
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

  const table = showsArr.map((item, key1) => {
    const rowKey = `row${key1}`;
    let count = 0;
    item.forEach((unit) => {
      if (unit === undefined) {
        count += 1;
      }
    });
    
    if (count < 7) {
      return (
        <tr key={rowKey}>
          {item.map((i, key2) => {
            let result = i;
            if (result === undefined) {
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
    
  });

  return (
    <div data-testid="schedule">
      <table>
        <tbody>
          {table}
        </tbody>
      </table>
    </div>
  );
}

WeeklySchedule.propTypes = {
  shows: PropTypes.arrayOf(showType).isRequired
};