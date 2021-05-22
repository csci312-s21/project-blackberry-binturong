/*
  PlayButton.js

  This component uses a button (using ../images/headphones.png) that allows a user to open a new window with the boombox livestream.

  props:
    none
*/

import styles from "../styles/PlayButton.module.css";
const listenNow = "http://boombox.middlebury.edu:8000/"

export default function PlayButton(){
  function click() {
    global.open(listenNow);
  }
  return (
    <div className={styles.playContainer}>
    <input className={styles.playButton} type="button" value="LISTEN NOW" onClick = {click}/>
  </div>)
}