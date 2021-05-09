import styles from "../styles/ScheduleNavBar.module.css";

import PropTypes from "prop-types";

export default function ScheduleNavBar({ pageList, currentPage, setCurrentPage }) {
  const pages = pageList.map(p => {
    return (p === currentPage ?
    <li 
      key={p} 
      className={styles.navBar_highlight}
      onClick={() => setCurrentPage(p)}
    >{p}</li> : 
    <li 
      key={p} 
      onClick={() => setCurrentPage(p)}
    >{p}</li>)
  });

  return (
    <div className={styles.navBar}>
      <ul>
        {pages}
      </ul>
    </div>);
  
}

ScheduleNavBar.propTypes = {
  pageList: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};