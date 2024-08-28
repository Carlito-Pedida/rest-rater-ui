import React, { useContext, useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import { Box } from "@mui/joy";
import styles from "../Styles/SignupSignin.module.css";
import UserContext from "../context-provider/UserContext";

export default function Welcome() {
  const [advice, setAdvice] = useState("");
  const [fontSize, setFontSize] = useState("16px");

  const { signIn } = useContext(UserContext);

  const getAdvice = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((adviceData) => {
        const adviceObj = adviceData.slip;
        setAdvice(adviceObj.advice);
      });
  };

  const scaleUp = (size) => {
    setFontSize(size);
  };

  useEffect(() => {
    getAdvice();
  }, []);

  const handleSignIn = () => {
    window.location.href = "/";
  };

  const logOut = () => {
    document.cookie =
      "loggedUserToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("User logged out");
    window.location.href = "/";
  };

  return (
    <Box>
      <Card
        data-resizable
        sx={{
          margin: "auto",
          textAlign: "center",
          alignItems: "center",
          maxWidth: 350,
          // to make the demo resizable
          overflow: "auto",
          resize: "horizontal",
          "--icon-size": "100px"
        }}
      >
        <CardOverflow variant="solid" color="primary">
          <AspectRatio
            variant="outlined"
            color="primary"
            ratio="1"
            sx={{
              m: "auto",
              transform: "translateY(50%)",
              borderRadius: "50%",
              width: "var(--icon-size)",
              boxShadow: "sm",
              bgcolor: "background.surface",
              position: "relative",
              backgroundColor: "blue",
              mb: 3
            }}
          >
            <h1 className={`${styles.welcomeLogo}`}>RR</h1>
          </AspectRatio>
        </CardOverflow>
        <h3 sx={{ mt: 3 }}>🎊 Thank you for signing up! 🎊</h3>
        <CardContent sx={{ maxWidth: "40ch" }}>{advice}</CardContent>
        <CardActions
          orientation="vertical"
          buttonFlex={1}
          sx={{
            "--Button-radius": "40px",
            width: "clamp(min(100%, 160px), 50%, min(100%, 200px))"
          }}
        >
          <Button onClick={handleSignIn} variant="solid" color="success">
            Start Rating!
          </Button>
          <Button onClick={logOut} variant="plain" color="neutral">
            Log out
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
