import React from "react";
import styles from "./Styles/App.module.css";
import Router from "./Router";

function App() {
  return (
    <>
      <div className={`${styles.app}`}>
        <header className={`${styles.appHeader}`}>
          <h1>Restaurant Rater</h1>
        </header>
        <Router />
      </div>
    </>
  );
}

export default App;
