import React, { useState, useEffect } from "react";
import styles from "../Styles/RestoDetails.module.css";
import Ratings from "./Ratings";

const RestoDetails = (props) => {
  const { description, rating_avg } = props;
  return (
    <>
      <div>
        <p>{description}</p>
      </div>
    </>
  );
};

export default RestoDetails;
