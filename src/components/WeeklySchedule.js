import PropTypes from "prop-types";
import WeeklyShow from "./WeeklyShow";
import { getDayInt } from "../lib/globals.js";

export default function WeeklySchedule({ shows }){
  const showsArr = [];

  showsArr.push(
    ['','M', 'T', 'W', 'Th', 'F', 'S', 'S']
  );

  // Add useEffect when writing the onHover function
  for (let i = 0; i < 24; i++){
    showsArr.push([]);
    for (let l = 0; l < 8; l++){
      if (l===0){
        showsArr[showsArr.length-1].push(i+":00");
      }
      else {showsArr[showsArr.length-1].push(<WeeklyShow show = {{}}/>)};
    }
  }
  
  shows.forEach((s) => {
    let day = getDayInt(s.time.day)+1;
    console.log(day)
    let time = (s.time.hour / 100)+1;
    let genre = s.genre;
    showsArr[time][day] = <WeeklyShow show = {s}/>
  }) 

  const table = showsArr.map((item) => {
    return (
      <tr>
        {item.map((i) => {
          return (<td>
                    {i}
                  </td>);
        })}
      </tr>
    );
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