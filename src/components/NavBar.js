/*
  NavBar.js

  This component holds the links to the other pages on the nav bar

  props:
    none
*/

import styles from "../styles/Main.module.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Nav className="m-auto">
          <Link href="/">
            <a className={styles.navbar_item}>Home</a>
          </Link>
          <Link href="/schedule">
            <a className={styles.navbar_item}>Schedule</a>
          </Link>
          <Link href="/about">
            <a className={styles.navbar_item}>About</a>
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
}
