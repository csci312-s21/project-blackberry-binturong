import { useState } from "react";
import styles from "../styles/LoginButton.module.css";

export default function LoginButton({ loggedIn, handleClick }){
  return (
    <div>
      {(loggedIn)
        ? <input class={styles.loginButton} type="button" value="Out" onClick = {() => handleClick(false)}/>
        : <input class={styles.loginButton} type="button" value="In" onClick = {() => handleClick(true)}/>
      }
    </div>);
}

