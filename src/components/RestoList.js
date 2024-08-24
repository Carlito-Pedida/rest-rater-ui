import React, { useState, useEffect } from "react";
import styles from "../Styles/RestoList.module.css";
import RestoDetails from "./RestoDetails";
import Ratings from "./Ratings";
import { FaStar } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

const RestoList = () => {
  const [restoList, setRestoList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rating, setRating] = useState(null);
  const [highlighted, setHighlighted] = useState(-1);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/restaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 2b96ffb77c3cda6c7fff0483b3e5b87e9b983cee"
      }
    })
      .then((response) => response.json())
      .then((response) => setRestoList(response))
      .catch((error) => console.log(error));
  }, []);

  const handleRestoClick = (resto) => (evt) => {
    setSelected(resto);
    setRating(resto.rating_avg);
  };

  const highlighter = (high) => (evt) => {
    setHighlighted(high);
  };

  const rateClicked = (rate, resto) => {
    fetch(`http://127.0.0.1:8000/api/restaurants/${resto.id}/rate_resto/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 2b96ffb77c3cda6c7fff0483b3e5b87e9b983cee"
      },
      body: JSON.stringify({ stars: rate + 1 })
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <div className={`${styles.layout}`}>
        <div>
          <h2>Restaurant</h2>
          {restoList.map((resto) => {
            return (
              <div key={resto.id}>
                <h2
                  className={`${styles.restoname}`}
                  onClick={handleRestoClick(resto)}
                >
                  {resto.name}
                </h2>
              </div>
            );
          })}
        </div>
        <div>
          <h2>Description</h2>
          <Ratings
            rating_avg={
              <>
                {rating ? (
                  <>
                    <FaStar className={`${rating > 0 ? styles.star : ""}`} />
                    <FaStar className={`${rating > 1 ? styles.star : ""}`} />
                    <FaStar className={`${rating > 2 ? styles.star : ""}`} />
                    <FaStar className={`${rating > 3 ? styles.star : ""}`} />
                    <FaStar className={`${rating > 4 ? styles.star : ""}`} />
                  </>
                ) : null}
              </>
            }
          />
          <RestoDetails
            description={
              selected ? (
                selected.description
              ) : (
                <h4 className={`${styles.message}`}>
                  <FaLongArrowAltLeft className={`${styles.arrow}`} />
                  Select a restaurant on the right to see ratings.
                </h4>
              )
            }
          />
          <div>
            <h3>Rate Restaurant</h3>
            {[...Array(5)].map((e, i) => {
              return (
                <FaStar
                  key={i}
                  className={`${highlighted > i - 1 ? styles.rateIt : ""}`}
                  onMouseEnter={highlighter(i)}
                  onMouseLeave={highlighter(-1)}
                  onClick={() => rateClicked(i, selected)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RestoList;
