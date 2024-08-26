import { Box, Stack } from "@mui/joy";
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import React, { useState } from "react";
import styles from "../Styles/SignupSignin.module.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      <h3 className={`${styles.accountSign}`}>Create an account</h3>
      <form>
        <Stack sx={{ py: 2 }} spacing={1}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            name="username"
            value={username}
            placeholder="username"
            type="text"
            onChange={(evt) => setUsername(evt.target.value)}
            required
          />
          <FormLabel htmlFor="password">Password</FormLabel>

          <Input
            name="password"
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
            >
              Create Account
            </Button>
          </Box>
        </Stack>
      </form>
      <Stack>
        <p className={`${styles.accountNone}`}>
          Have an account? <a href="/">Sign in here</a>
        </p>
      </Stack>
    </Box>
  );
};

export default SignUp;
