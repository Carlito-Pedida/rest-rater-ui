import React, { useState, useEffect } from "react";

const Ratings = () => {
  const [restoRate, setRestoRate] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/ratings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 2b96ffb77c3cda6c7fff0483b3e5b87e9b983cee"
      }
    })
      .then((response) => response.json())
      .then((response) => setRestoRate(response))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h2>Description</h2>
      {restoRate.map((rating) => {
        return (
          <div>
            <h4>{rating.stars}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Ratings;
