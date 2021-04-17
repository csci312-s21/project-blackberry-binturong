import PropTypes from "prop-types";
import { prettyTimeFormat } from "../lib/globals.js";

export default function ShowSnippet({ show }){
  const title = show.title;
  const djs = show.DJs;
  const time = prettyTimeFormat(show.time.hour, show.time.duration);

  return (
    <div><strong>{time}</strong> <strong>{title}</strong> <em>({djs})</em></div>
  );
}

ShowSnippet.propTypes = {
  show: PropTypes.shape({
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
}