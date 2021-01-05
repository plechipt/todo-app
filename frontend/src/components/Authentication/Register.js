import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
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

  return (
    <div className={classes.root}>
      <Grid className={classes.formsContainer} container>
        <Grid item xs={11} sm={8} md={5} lg={3}>
          <TextField
            className={classes.usernameField}
            id="username-input"
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
            className={classes.field}
            id="email-input"
            label="Email"
            fullWidth
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className={classes.field}
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
          <TextField
            className={classes.field}
            id="confirm-password-input"
            label="Confirm Password"
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
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            className={classes.submitButton}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
