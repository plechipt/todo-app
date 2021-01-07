import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
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
  const [login, { data: loginData }] = useMutation(USER_LOGIN_MUTATION, {
    errorPolicy: "all",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(loginData);
  }, [loginData]);

  const handleOnLogin = async () => {
    await login({
      variables: { username, password },
    });
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.formsContainer} container>
        <Grid item xs={11} sm={8} md={5} lg={3}>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            className={classes.usernameField}
            id="login-input"
            label="Username"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            className={classes.passwordField}
            id="password-input"
            label="Password"
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
