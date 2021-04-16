import PropTypes from "prop-types";

export default function NextThreeShows({ shows }){
  const dayToInt = {
    "Su": 0,
    "M": 1,
    "T": 2,
    "W": 3,
    "Th": 4,
    "F": 5,
    "S": 6
  }
  const date = new Date();

  const upcomingShows = shows.filter(
    (show) => (dayToInt[show.time.day] === date.getDay()) && (show.time.hour > (date.getHours() * 100)));

  const compareTwoShows = (a, b) => {
    if (dayToInt[a.time.day] > dayToInt[b.time.day]){
      return a
    } else if (dayToInt[a.time.day] < dayToInt[b.time.day]){
      return b
    } else {
      if (a.time.hour >= b.time.hour){
        return a
      } else {
        return b
      }
    }
  }

  upcomingShows.sort((a, b) => compareTwoShows(a, b));

  const nextThree = upcomingShows.slice(0, 3).map((show) => <li key={show.id}>{show.title}</li>);

  return (
    <div>
      <ul>{nextThree}</ul>
      {(nextThree.length <= 3) && <div>That's all for today!</div>}
    </div>
  );
}

NextThreeShows.propTypes = {
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
