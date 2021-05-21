/*
  LoginButton.js

  This component displays a button (using ../images/log.png) that allows a user to log into and out of their account.

  props:
    loggedIn - a boolean representing whether the user is logged in
    handleClick - a function that logs the user in or out when the button is clicked
*/
import styles from "../styles/LoginButton.module.css";
import { signIn, signOut, useSession } from "next-auth/client";

export default function LoginButton(){
  const [session] = useSession();

  return (
    <div className={styles.loginContainer}>
      {(session)
        ? <input 
            className={styles.loginButton} 
            type="button" 
            aria-label="logout" 
            value="Out" 
            onClick = {() => signOut()}
          />
        : <input 
            className={styles.loginButton} 
            type="button" 
            aria-label="login"
            value="In" 
            onClick = {() => signIn()}
          />
      }
    </div>);
}
