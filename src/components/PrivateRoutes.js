import { Button } from "@mui/joy";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/SignupSignin.module.css";

const PrivateRoutes = () => {
  let navigate = useNavigate();
  const [token] = useCookies(["restoToken"]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className={`${styles.merchBanner}`}>
      <h2>This area is</h2>
      <h2>RESTRICTED!</h2>
      <Button onClick={handleClick}>Sign in for access</Button>
    </div>
  );
};

export default PrivateRoutes;
