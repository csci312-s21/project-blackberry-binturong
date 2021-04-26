import PropTypes from "prop-types";
import styles from "../styles/WeeklyShow.module.css";

export default function WeeklyShow({ show }){
  if (show === {} || show === undefined){
    return <div className={styles.WeeklyShow}>
    </div>
  }
  let djs = show.DJs;
  if (show.DJs !== undefined) {
    djs = show.DJs.join(", ");
  }

  return (
    <div className={styles.WeeklyShow}>
      <p className={styles.ShowTitle}>{show.title}</p>
      <p>{djs}</p>
    </div>
  )
};

WeeklyShow.propTypes = {
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
};