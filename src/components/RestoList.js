import React, { useState, useEffect } from "react";

const RestoList = () => {
  const [restoList, setRestoList] = useState([]);

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

  return (
    <>
      <div>
        <h2>Restaurant Name</h2>
        {restoList.map((resto) => {
          return (
            <div>
              <h2>{resto.name}</h2>
              <p>{resto.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RestoList;
