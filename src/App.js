import React from "react";
import Router from "./Router";
import styles from "./Styles/App.module.css";

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
