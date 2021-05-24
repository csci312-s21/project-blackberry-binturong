/*
  NavBar.js

  This component holds the links to the other pages on the nav bar

  props:
    none
*/

import styles from "../styles/Main.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <div>
      <Navbar bg="light">
        <Nav className="m-auto">
          <a href={"/"} className={styles.navbar_item}>
            Home
          </a>
          <a href={"/schedule"} className={styles.navbar_item}>
            Schedule
          </a>
          <a href={"/about"} className={styles.navbar_item}>
            About
          </a>
        </Nav>
      </Navbar>
    </div>
  );
}
