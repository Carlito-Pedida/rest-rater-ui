import React from "react";
import styles from "../Styles/SignupSignin.module.css";
import { RiLogoutBoxRLine } from "react-icons/ri";

const LogOut = () => {
  const logOut = () => {
    document.cookie =
      "loggedUserToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("User logged out");
    window.location.href = "/";
  };
  return (
    <div>
      {<RiLogoutBoxRLine className={`${styles.logout}`} onClick={logOut} />}
    </div>
  );
};

export default LogOut;
