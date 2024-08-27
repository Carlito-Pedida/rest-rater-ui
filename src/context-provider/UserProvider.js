import React, { useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";

const UserProvider = (props) => {
  const baseUrl = "http://127.0.0.1:8000/auth/";
  const [user, setUser] = useState(null);

  const signIn = (username, password) => {
    return axios
      .post(`${baseUrl}`, { username, password }) // Replace with your API endpoint
      .then((response) => {
        const { token, user } = response.data;
        document.cookie = `loggedUserToken=${token}; path=/; secure; samesite=strict`; // Set the token in a cookie
        setUser(user); // Update the user state with the logged-in user's details
        console.log(user);

        return Promise.resolve(); // Resolve the promise to indicate success
      })
      .catch((error) => {
        return Promise.reject(error); // Reject the promise if there's an error
      });
  };

  function createAccount(username, password) {
    let littleUrl = "http://127.0.0.1:8000/api/users/";
    let userCred = { username, password };

    return axios.post(littleUrl, userCred).then((response) => {
      console.log(response);
      document.cookie = ` =${response.data.token}; path=/; secure; samesite=strict`;
      return new Promise((resolve) => resolve(response.data));
    });
  }

  // function signIn(username, password) {
  //   let user = { username, password };

  //   return axios.post(`${baseUrl}`, user).then((response) => {
  //     // localStorage.setItem("loggedUserToken", response.data.token);
  //     document.cookie = `loggedUserToken=${response.data.token}; path=/; secure; samesite=strict`;
  //     return Promise((resolve) => resolve(response.data));
  //   });
  // }

  return (
    <UserContext.Provider
      value={{
        createAccount,
        signIn
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
