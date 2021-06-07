import styles from "../styles/Main.module.css";

import PropTypes from "prop-types";

export default function ScheduleFilter({
  pageList,
  currentPage,
  setCurrentPage,
}) {
  const pages = pageList.map((p) => (
    <li
      key={p}
      className={
        p === currentPage ? styles.schedulefilter_highlight : undefined
      }
      onClick={() => setCurrentPage(p)}
    >
      {p}
    </li>
  ));

  return (
    <div className={styles.schedulefilter}>
      <ul>{pages}</ul>
    </div>
  );
}

ScheduleFilter.propTypes = {
  pageList: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
