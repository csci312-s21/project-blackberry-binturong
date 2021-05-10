import styles from "../styles/NavBar.module.css";

import PropTypes from "prop-types";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className={styles.navBar}>
      <ul>
        <li key="Home">
          <Link href={"/"}><a>Home</a></Link>
        </li>
        <li key="Schedule">
          <Link href={"/schedule"}><a>Schedule</a></Link>
        </li>
        <li key="About">
          <Link href={"/about"}><a>About</a></Link>
        </li>
      </ul>
    </div>);
  
}