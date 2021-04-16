import { useState } from "react";

export default function LoginButton({ loggedIn, handleClick }){
  return (
    <div>
      {(loggedIn)
        ? <input type="button" name="logout" value="Log Out" onClick = {() => handleClick(false)}/>
        : <input type="button" name="login" value="Log In" onClick = {() => handleClick(true)}/>
      }
    </div>);
}

