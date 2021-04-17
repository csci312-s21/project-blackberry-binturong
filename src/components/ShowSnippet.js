import PropTypes from "prop-types";
import { prettyTimeFormat } from "../lib/globals.js";
import styles from "../styles/ShowSnippet.module.css";

export default function ShowSnippet({ show }){
  const title = show.title;
  const djs = show.DJs;
  const time = prettyTimeFormat(show.time.hour, show.time.duration);

  return (
    <div><div className={styles.time}>{time}</div><div className={styles.title}>{title}</div><div className={styles.djs}>{djs}</div>
    </div>
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