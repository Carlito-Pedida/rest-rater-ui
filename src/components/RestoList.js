import React, { useState, useEffect } from "react";
import styles from "../Styles/RestoList.module.css";
import RestoDetails from "./RestoDetails";
import RestoCreateUpdate from "./RestoCreateUpdate";
import Ratings from "./Ratings";
import { FaStar, FaTrashAlt, FaEdit } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

const RestoList = () => {
  const [restoList, setRestoList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rating, setRating] = useState(null);
  const [count, setCount] = useState(null);
  const [edit, setEdit] = useState(null);
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
    setCount(resto.rating_count);
    setEdit(null);
  };

  const highlighter = (high) => (evt) => {
    setHighlighted(high);
  };

  const rateClicked = (rate, resto) => {
    const newRating = rate + 1;
    fetch(`http://127.0.0.1:8000/api/restaurants/${resto.id}/rate_resto/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 2b96ffb77c3cda6c7fff0483b3e5b87e9b983cee"
      },
      body: JSON.stringify({ stars: newRating })
    })
      .then((response) => response.json())
      .then(() => {
        setRating(newRating);
        updateRestoList(resto.id, newRating);
      })
      .catch((error) => console.log(error));
  };

  const updateRestoList = (restoId, newRating) => {
    setRestoList((prevList) =>
      prevList.map((resto) =>
        resto.id === restoId ? { ...resto, rating_avg: newRating } : resto
      )
    );
  };

  const editClicked = (resto) => {
    setEdit(resto);
    setSelected(resto);
    setRating(resto.rating_avg);
    setCount(resto.rating_count);
  };

  const deleteClicked = (resto) => {
    console.log("clicked");
  };

  return (
    <React.Fragment>
      <div className={`${styles.layout}`}>
        <div>
          <h2>Restaurant</h2>
          {restoList.map((resto) => {
            return (
              <div key={resto.id} className={`${styles.leftGrid}`}>
                <div>
                  <h3
                    className={`${styles.restoname}`}
                    onClick={handleRestoClick(resto)}
                  >
                    {resto.name}
                  </h3>
                </div>
                <div className={`${styles.icons}`}>
                  <FaEdit
                    className={`${styles.editIcon}`}
                    onClick={() => editClicked(resto)}
                  />
                  <FaTrashAlt
                    className={`${styles.trashIcon}`}
                    onClick={() => deleteClicked()}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {edit ? null : (
          <div>
            <h2>Review</h2>
            <Ratings
              rating_avg={
                <div>
                  {rating ? (
                    <>
                      <FaStar className={`${rating > 0 ? styles.star : ""}`} />
                      <FaStar className={`${rating > 1 ? styles.star : ""}`} />
                      <FaStar className={`${rating > 2 ? styles.star : ""}`} />
                      <FaStar className={`${rating > 3 ? styles.star : ""}`} />
                      <FaStar className={`${rating > 4 ? styles.star : ""}`} />
                    </>
                  ) : null}
                </div>
              }
              rating_count={count ? <p>( {count} )</p> : null}
            />

            <>
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
              {selected ? (
                <div>
                  <h3>Rate it!</h3>
                  {[...Array(5)].map((e, i) => {
                    return (
                      <FaStar
                        key={i}
                        id={`${styles.rateIt}`}
                        className={`${
                          highlighted > i - 1 ? styles.rateIt : ""
                        }`}
                        onMouseEnter={highlighter(i)}
                        onMouseLeave={highlighter(-1)}
                        onClick={() => rateClicked(i, selected)}
                      />
                    );
                  })}
                </div>
              ) : null}
            </>
          </div>
        )}
        <div>{edit ? <RestoCreateUpdate resto={edit} /> : null}</div>
      </div>
    </React.Fragment>
  );
};

export default RestoList;
