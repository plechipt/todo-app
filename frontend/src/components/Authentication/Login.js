import React, { useState, useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { USER_LOGIN_MUTATION } from "../Api/user";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles(() => ({
  formsContainer: {
    justifyContent: "center",
  },
  passwordField: {
    marginTop: 20,
  },
  submitButton: {
    marginTop: 25,
  },
}));

const Login = () => {
  const classes = useStyles();
  const client = useApolloClient();
  const [login, { data: loginData }] = useMutation(USER_LOGIN_MUTATION, {
    errorPolicy: "all",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [failedToLogin, setFailedToLogin] = useState(false);
  const [usernameIsNotFilled, setUsernameIsNotFilled] = useState(false);
  const [passwordIsNotFilled, setPasswordIsNotFilled] = useState(false);

  const resetErrorMessages = () => {
    setUsernameIsNotFilled(false);
    setPasswordIsNotFilled(false);
  };

  useEffect(() => {
    if (loginData) {
      const { tokenAuth } = loginData;
      const loginWasSuccessful = tokenAuth !== null;

      resetErrorMessages();

      if (loginWasSuccessful) {
        client.resetStore();
      } else {
        setFailedToLogin(true);
        setPassword("");
      }
    }
  }, [loginData, client]);

  const setErrorMessage = () => {
    setFailedToLogin(false);

    if (username === "") {
      console.log("test");
      setUsernameIsNotFilled(true);
    }
    if (password === "") {
      setPasswordIsNotFilled(true);
    }
  };

  const handleOnLogin = async () => {
    if (username === "" || password === "") {
      setErrorMessage();
    } else {
      await login({
        variables: { username, password },
      });
    }
  };

  console.log(failedToLogin);

  return (
    <div className={classes.root}>
      <Grid className={classes.formsContainer} container>
        <Grid item xs={11} sm={8} md={5} lg={3}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.usernameField}
            error={failedToLogin || usernameIsNotFilled ? true : false}
            helperText={
              /* Handle blank username */
              usernameIsNotFilled ? "Please enter your username" : ""
            }
            id="login-input"
            label="Username"
            autoComplete="none"
            fullWidth
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.passwordField}
            error={failedToLogin || passwordIsNotFilled ? true : false}
            helperText={
              /* Handle bad login or blank password */
              (failedToLogin ? "Username or password is incorrect" : "") ||
              (passwordIsNotFilled ? "Please enter your password" : "")
            }
            id="password-input"
            label="Password"
            autoComplete="one-time-code"
            fullWidth
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleOnLogin}
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            className={classes.submitButton}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
