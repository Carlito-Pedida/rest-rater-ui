import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "../Styles/SignupSignin.module.css";
import { Button } from "@mui/joy";

const PrivateRoutes = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("loggedUserToken");

  const isAuthenticated = token !== null && token !== undefined;

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirect(true);
    }
  }, [isAuthenticated]);

  const handleClick = () => {
    navigate("/");
  };

  if (redirect) {
    return (
      <div className={`${styles.merchBanner}`}>
        <h2>This area is</h2>
        <h2>RESTRICTED!</h2>
        <Button onClick={handleClick}>Sign in for access</Button>
      </div>
    );
  }

  return <Outlet />;
};

export default PrivateRoutes;
