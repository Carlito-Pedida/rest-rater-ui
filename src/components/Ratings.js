import React, { useState, useEffect } from "react";

const Ratings = (props) => {
  const { rating_avg } = props;

  return <div>{rating_avg}</div>;
};

export default Ratings;
