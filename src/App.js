import React from "react";

import RestoList from "./components/RestoList";
import styles from "./Styles/App.module.css";

function App() {
  return (
    <div className={`${styles.app}`}>
      <header className={`${styles.appHeader}`}>
        <h1>Restaurant Rater</h1>
      </header>
      <RestoList />
    </div>
  );
}

export default App;
