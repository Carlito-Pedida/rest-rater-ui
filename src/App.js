import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Router from "./Router";
import styles from "./Styles/App.module.css";

function App() {
  const logOut = () => {
    document.cookie =
      "loggedUserToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("User logged out");
    window.location.href = "/";
  };

  return (
    <>
      <div className={`${styles.app}`}>
        <header className={`${styles.appHeader}`}>
          <h1>Restaurant Rater</h1>
          <RiLogoutBoxRLine className={`${styles.logout}`} onClick={logOut} />
        </header>
        <Router />
      </div>
    </>
  );
}

export default App;
