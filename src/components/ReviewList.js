import React, { useEffect, useState } from "react";
import styles from "../Styles/ReviewList.module.css";

const ReviewList = () => {
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/restaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 2b96ffb77c3cda6c7fff0483b3e5b87e9b983cee"
      }
    })
      .then((response) => response.json())
      .then((response) => setDescriptions(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h3>Reviews</h3>
      <div className={`${styles.reviewBox}`}>
        {descriptions.map((desc) => {
          return (
            <>
              <div>
                <p>
                  <i>
                    {desc.name} - {desc.description}
                  </i>
                </p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ReviewList;
