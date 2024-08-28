import { Box, Button } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaEdit, FaLongArrowAltLeft, FaStar, FaTrashAlt } from "react-icons/fa";
import { API } from "../ApiService";
import styles from "../Styles/RestoList.module.css";
import Ratings from "./Ratings";
import RestoCreateUpdate from "./RestoCreateUpdate";
import RestoDetails from "./RestoDetails";
import ReviewList from "./ReviewList";
import LogOut from "./LogOut";

const RestoList = () => {
  const [restoList, setRestoList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rating, setRating] = useState(null);
  const [count, setCount] = useState(null);
  const [edit, setEdit] = useState(null);
  const [highlighted, setHighlighted] = useState(-1);

  const [token] = useCookies(["loggedUserToken"]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/restaurants/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["loggedUserToken"]}`
      }
    })
      .then((response) => {
        if (response.status === 401) {
          // Redirect to sign-in page if the token is invalid
          window.location.href = "/";
          return null;
        } else if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((response) => {
        if (response) {
          setRestoList(response);
        }
      })
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
        Authorization: `Token ${token["loggedUserToken"]}`
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

  const updateRestoDetail = (resto) => {
    const newRestoDetail = restoList.map((restoDetail) => {
      if (restoDetail.id === resto.id) {
        return resto;
      }
      return restoDetail;
    });
    setRestoList(newRestoDetail);
  };

  const createNewResto = (resto) => {
    const newRestoList = [...restoList, resto];
    setRestoList(newRestoList);
  };

  const createRestaurant = () => {
    setEdit({ name: "", description: "" });
    setSelected(null);
  };

  const editClicked = (resto) => {
    setEdit(resto);
  };

  const deleteClicked = (resto) => {
    API.deleteResto(resto.id)
      .then(() => handleDeleteResto(resto))
      .catch((error) => console.log(error));
  };

  const handleDeleteResto = (resto) => {
    try {
      // Show confirmation dialog
      const isConfirmed = window.confirm("Are you sure you want to delete?");

      // Proceed if the user confirms
      if (isConfirmed) {
        // Filter out the restaurant from the list
        const restoCopy = restoList.filter((r_copy) => r_copy.id !== resto.id);

        // Update the state with the new list
        setRestoList(restoCopy);
      } else {
        // If the user cancels, just return without making changes
        return;
      }
    } catch (error) {
      // Log and alert the user if there's an error
      console.error("Error deleting restaurant:", error);
      window.alert("Failed to delete the restaurant. Please try again.");
    }
  };

  return (
    <>
      <LogOut />
      <React.Fragment>
        <div className={`${styles.layout}`}>
          <div className={`${styles.leftFrame}`}>
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
                  {edit ? null : (
                    <div className={`${styles.icons}`}>
                      <FaEdit
                        className={`${styles.editIcon}`}
                        onClick={() => editClicked(resto)}
                      />
                      <FaTrashAlt
                        className={`${styles.trashIcon}`}
                        onClick={() => deleteClicked(resto)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            {edit ? null : (
              <Box>
                <Button onClick={() => createRestaurant()}>
                  Add restaurant to review
                </Button>
              </Box>
            )}
          </div>
          {edit ? null : (
            <div>
              <Ratings
                rating_avg={
                  <div>
                    {rating ? (
                      <>
                        <FaStar
                          className={`${rating > 0 ? styles.star : ""}`}
                        />
                        <FaStar
                          className={`${rating > 1 ? styles.star : ""}`}
                        />
                        <FaStar
                          className={`${rating > 2 ? styles.star : ""}`}
                        />
                        <FaStar
                          className={`${rating > 3 ? styles.star : ""}`}
                        />
                        <FaStar
                          className={`${rating > 4 ? styles.star : ""}`}
                        />
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
                  rateSystem={
                    selected ? (
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
                    ) : (
                      <ReviewList />
                    )
                  }
                />
              </>
            </div>
          )}
          <div>
            {edit ? (
              <RestoCreateUpdate
                resto={edit}
                updateRestoDetail={updateRestoDetail}
                addNewResto={createNewResto}
                setEdit={setEdit}
              />
            ) : null}
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default RestoList;
