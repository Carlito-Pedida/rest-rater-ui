import React from "react";
import styles from "../Styles/Ratings.module.css";

const Ratings = (props) => {
  const { rating_avg, rating_count } = props;

  return (
    <div className={`${styles.ratingLayout}`}>
      {rating_avg}
      {rating_count}
    </div>
  );
};

export default Ratings;
