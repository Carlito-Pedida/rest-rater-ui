import React, { useState, useEffect } from "react";
import styles from "../Styles/RestoList.module.css";
import RestoDetails from "./RestoDetails";
import Ratings from "./Ratings";
import { FaStar } from "react-icons/fa";

const RestoList = () => {
  const [restoList, setRestoList] = useState([]);
  const [selected, setSelected] = useState("Select restaurant to see rating.");
  const [rating, setRating] = useState(null);

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
    setSelected(resto.description);
    setRating(resto.rating_avg);
  };
  return (
    <>
      <div className={`${styles.layout}`}>
        <div>
          <h2>Restaurant Name</h2>
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
          <h2>Restaurant Description</h2>
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
          <RestoDetails description={selected} />
        </div>
      </div>
    </>
  );
};

export default RestoList;
