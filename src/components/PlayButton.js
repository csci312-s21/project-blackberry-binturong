/*
  Play.js

  This component uses a button (using ../images/headphones.png) that allows a user to open a new window with the boombox livestream.

  props:
    none
*/
import styles from "../styles/Main.module.css";
import Headphones from "./Headphones.js";

const listenNow = "http://boombox.middlebury.edu:8000/";

export default function PlayButton() {
  function click() {
    global.open(listenNow);
  }
  return (
    <div className={styles.playbutton_div} onClick={click}>
      <Headphones />
      <p className={styles.playbutton_text}>LISTEN NOW</p>
    </div>
  );
}
