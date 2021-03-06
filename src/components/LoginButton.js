/*
  LoginButton.js

  This component displays a button (using ../images/log.png) that allows a user to log into and out of their account.

  props:
    none
*/
import styles from "../styles/Main.module.css";
import { signIn, signOut, useSession } from "next-auth/client";

export default function LoginButton() {
  const [session] = useSession();

  return (
    <div>
      {session ? (
        <input
          className={styles.loginButton}
          type="button"
          aria-label="logout"
          value="Out"
          onClick={() => signOut()}
        />
      ) : (
        <input
          className={styles.loginButton}
          type="button"
          aria-label="login"
          value="In"
          onClick={() => signIn()}
        />
      )}
    </div>
  );
}
