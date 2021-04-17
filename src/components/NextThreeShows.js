import PropTypes from "prop-types";
import { dayToInt, compareTwoShows } from "../lib/globals.js";
import moment from "moment";
import ShowSnippet from "./ShowSnippet.js";

export default function NextThreeShows({ shows }){
  const now = moment();

  const upcomingShows = shows.filter(
    (show) => (dayToInt[show.time.day] === now.day()) && (show.time.hour > (now.hour() * 100)));

  upcomingShows.sort((a, b) => compareTwoShows(a, b));

  const nextThree = upcomingShows.slice(0, 3).map((show) => <li key={show.id}><ShowSnippet show={show}/></li>);

  return (
    <div>
      Today's next three shows:
      <ul>{nextThree}</ul>
      {(upcomingShows.length <= 3) && <div>That's all for today!</div>}
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
