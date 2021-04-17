import PropTypes from "prop-types";
import { prettyTimeFormat } from "../lib/globals.js";
import styles from "../styles/ShowSnippet.module.css";

export default function ShowSnippet({ title, djs, hour, duration }){
  const time = prettyTimeFormat(hour, duration);

  return (
    <div><div className={styles.time}>{time}</div><div className={styles.title}>{title}</div><div className={styles.djs}>{djs}</div>
    </div>
  );
}

ShowSnippet.propTypes = {
  title: PropTypes.string.isRequired,
  djs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  hour: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
}