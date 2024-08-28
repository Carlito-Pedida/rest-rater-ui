import { Box, Stack } from "@mui/joy";
import Button from "@mui/joy/Button";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import React, { useContext, useState } from "react";
import styles from "../Styles/SignupSignin.module.css";
import UserContext from "../context-provider/UserContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { createAccount } = useContext(UserContext);

  const handleSignUp = async (evt) => {
    evt.preventDefault();

    try {
      // Create account
      await createAccount(username, password);

      // Sign in with the newly created account

      // Navigate to the restaurant list page
      window.location.href = "/new_account/";
    } catch (error) {
      console.log(error);
      window.alert(
        "An error occurred while creating your account or signing in. Please try again."
      );
    }
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
        backgroundColor: "gray",
        color: "white",
        textAlign: "center"
      }}
    >
      <h2 className={`${styles.accountCreate}`}>Create an account</h2>
      <form onSubmit={handleSignUp}>
        <Stack sx={{ py: 2 }} spacing={1}>
          <FormLabel sx={{ color: "white" }} htmlFor="username">
            Username
          </FormLabel>
          <Input
            id="username"
            value={username}
            placeholder="username"
            type="text"
            onChange={(evt) => setUsername(evt.target.value)}
            required
          />
          <FormLabel sx={{ color: "white" }} htmlFor="password">
            Password
          </FormLabel>

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
              color="primary"
            >
              Create Account
            </Button>
          </Box>
        </Stack>
      </form>
      <Stack>
        <p className={`${styles.accountNone2}`}>
          Already have an account? <a href="/">Sign in here</a>
        </p>
      </Stack>
    </Box>
  );
};

export default SignUp;
