import PropTypes from "prop-types";
import styles from "../styles/Main.module.css";
import Link from "next/link";
import { showType } from "../lib/types.js";
import { getTimeString } from "../lib/component-utils.js";
import { colors } from "../lib/component-utils.js";
import { useState } from "react";

export default function DayShow({ show }) {
  const [displayDescription, setDisplayDescription] = useState(false);

  const time = getTimeString(show.hour, show.duration);
  const genrecolor = colors[show.genres[0].toLowerCase()];

  return (
    <div>
      <Link href={`/shows/${show.id}`}>
        <div
          onMouseLeave={() => setDisplayDescription(false)}
          onMouseEnter={() => setDisplayDescription(true)}
        >
          {displayDescription ? (
            <div
              className={styles.dayshow_description}
              style={{ backgroundColor: genrecolor }}
            >
              {show.description}
            </div>
          ) : (
            <div
              className={styles.dayshow_div}
              style={{ backgroundColor: genrecolor }}
            >
              <p className={styles.dayshow_title}>{show.title}</p>
              <p className={styles.dayshow_time}>{time}</p>
              <p className={styles.dayshow_djs}>{show.DJs.join(", ")}</p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

DayShow.propTypes = {
  show: PropTypes.shape({showType}).isRequired
};
