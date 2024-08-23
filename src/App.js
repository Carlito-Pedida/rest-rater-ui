import React, { useState, useEffect } from "react";
import RestoList from "./components/RestoList";
import "./App.css";
import Ratings from "./components/Ratings";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurant Rater App</h1>
      </header>
      <div className="layout">
        <div>
          <RestoList />
        </div>
        <div>
          <Ratings />
        </div>
      </div>
    </div>
  );
}

export default App;
