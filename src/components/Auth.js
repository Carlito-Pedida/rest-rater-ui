import { Box, Stack } from "@mui/joy";
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import React, { useState } from "react";
import styles from "../Styles/SignupSignin.module.css";
import { API } from "../ApiService";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (evt) => {
    evt.preventDefault();
    const body = {
      username: username,
      password: password
    };

    API.signInUser(body)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <Box
      sx={{
        borderRadius: 13,
        py: 1,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        maxWidth: 300,
        margin: "auto",
        padding: 2,
        backgroundColor: "white",
        color: "black",
        textAlign: "center"
      }}
    >
      <h3 className={`${styles.accountSign}`}>Sign In to your Account</h3>
      <form>
        <Stack sx={{ py: 2 }} spacing={1}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            value={username}
            placeholder="username"
            type="text"
            onChange={(evt) => setUsername(evt.target.value)}
            required
          />
          <FormLabel htmlFor="password">Password</FormLabel>

          <Input
            id="password"
            value={password}
            placeholder="password"
            type="password"
            onChange={(evt) => setPassword(evt.target.value)}
            required
          />
          <Box>
            <Button
              sx={{ px: 5, my: 1, borderRadius: 15 }}
              size="md"
              type="submit"
              color="success"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </Box>
        </Stack>
      </form>
      <Stack>
        <p className={`${styles.accountNone}`}>
          No account yet? <a href="/create_account/">Sign up here</a>
        </p>
      </Stack>
    </Box>
  );
};

export default Auth;
