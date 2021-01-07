import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { USER_REGISTER_MUTATION } from "../Api/user";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles(() => ({
  formsContainer: {
    justifyContent: "center",
  },
  field: {
    marginTop: 20,
  },
  submitButton: {
    marginTop: 25,
  },
}));

const Register = () => {
  const classes = useStyles();
  const [register, { data: registerData }] = useMutation(
    USER_REGISTER_MUTATION
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    console.log(registerData);
  }, [registerData]);

  const handleOnRegister = async () => {
    await register({
      variables: {
        username,
        email,
        password1: password,
        password2: passwordConfirm,
      },
    });
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.formsContainer} container>
        <Grid item xs={11} sm={8} md={5} lg={3}>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            className={classes.usernameField}
            id="username-input"
            label="Username"
            autoComplete="one-time-code"
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
            onChange={(e) => setEmail(e.target.value)}
            className={classes.field}
            id="email-input"
            label="Email"
            autoComplete="one-time-code"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            className={classes.field}
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
          <TextField
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className={classes.field}
            id="confirm-password-input"
            label="Confirm Password"
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
            onClick={handleOnRegister}
            className={classes.submitButton}
            variant="contained"
            size="large"
            color="primary"
            fullWidth
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
