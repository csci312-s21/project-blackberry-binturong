/*
  LoginButton.js

  This component displays a button (using ../images/log.png) that allows a user to log into and out of their account.

  props:
    loggedIn - a boolean representing whether the user is logged in
    handleClick - a function that logs the user in or out when the button is clicked
*/
import styles from "../styles/LoginButton.module.css";
import PropTypes from "prop-types";

export default function LoginButton({ loggedIn, handleClick }){
  return (
    <div className={styles.loginContainer}>
      {(loggedIn)
        ? <input className={styles.loginButton} type="button" value="Out" onClick = {() => handleClick(false)}/>
        : <input className={styles.loginButton} type="button" value="In" onClick = {() => handleClick(true)}/>
      }
    </div>);
}

LoginButton.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}