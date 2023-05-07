import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";
import { useMutation } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import { USER_REGISTER_MUTATION } from "../Api/resolvers/user";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    background: "#1976D2",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submitButton: {
    margin: theme.spacing(1, 0, 2),
    background: "#1976D2",
    "&:hover": {
      background: "#1976D2",
    },
  },
  loginLink: {
    color: "#1976D2",
    marginLeft: 5,
    textDecoration: "none",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const { englishSelected } = useContext(LanguageContext);
  const [register, { data: registerData, loading }] = useMutation(
    USER_REGISTER_MUTATION
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const [usernameMessageError, setUsernameMessageError] = useState("");
  const [passwordMessageError, setPasswordMessageError] = useState("");
  const [passwordConfirmMessageError, setPasswordConfirmMessageError] =
    useState("");

  const setErrorMessage = (message, field) => {
    message = message.replace(".", ""); // Remove dot from message

    if (field === "username") {
      setUsernameMessageError(message);
    }
    if (field === "password1") {
      setPasswordMessageError(message);
    }
    if (field === "password2") {
      setPasswordConfirmMessageError(message);
    }
  };

  const resetErrorMessages = () => {
    setUsernameMessageError("");
    setPasswordConfirmMessageError("");
    setPasswordConfirmMessageError("");
  };

  useEffect(() => {
    if (registerData) {
      const {
        register: { errors, user },
      } = registerData;
      const registerWasNotSuccessful = user === null;

      resetErrorMessages();

      if (registerWasNotSuccessful) {
        errors.forEach(({ messages, field }) => {
          let [message] = messages;
          setErrorMessage(message, field);
        });
      } else {
        history.push("/login");
      }
    }
  }, [registerData, history]);

  const handleOnRegister = async (e) => {
    e.preventDefault();

    await register({
      variables: {
        username,
        password1: password,
        password2: passwordConfirm,
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {englishSelected ? "Sign Up" : "Registrovat se"}
        </Typography>
        <form onSubmit={handleOnRegister} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                error={usernameMessageError !== "" ? true : false}
                helperText={
                  usernameMessageError !== "" ? usernameMessageError : ""
                }
                autoComplete="username"
                name="username"
                variant="outlined"
                id="username"
                label={englishSelected ? "Username" : "Uživatelské Jméno"}
                autoFocus
                required
                fullWidth
                InputLabelProps={{ required: false }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                error={passwordMessageError !== "" ? true : false}
                helperText={
                  passwordMessageError !== "" ? passwordMessageError : ""
                }
                type={showPasswords ? "text" : "password"}
                variant="outlined"
                name="password"
                label={englishSelected ? "Password" : "Heslo"}
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                InputLabelProps={{ required: false }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPasswordConfirm(e.target.value)}
                error={passwordConfirmMessageError !== "" ? true : false}
                helperText={
                  passwordConfirmMessageError !== ""
                    ? passwordConfirmMessageError
                    : ""
                }
                type={showPasswords ? "text" : "password"}
                variant="outlined"
                name="password"
                label={englishSelected ? "Confirm Password" : "Potvrdit Heslo"}
                id="confirm-password"
                autoComplete="confirm-password"
                fullWidth
                required
                InputLabelProps={{ required: false }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={() => setShowPasswords(!showPasswords)}
                    color="primary"
                  />
                }
                label={englishSelected ? "Show Passwords" : "Ukázat Hesla"}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            className={classes.submitButton}
            disabled={loading}
            fullWidth
            variant="contained"
            color="primary"
          >
            {englishSelected ? "Sign Up" : "Registrovat se"}
          </Button>
          <Typography color="textSecondary">
            {englishSelected ? "Already have an account?" : "Už máte účet?"}
            <Link to="/" className={classes.loginLink}>
              {englishSelected ? "Sign In" : "Přihlásit se"}
            </Link>
          </Typography>
        </form>
      </div>
    </Container>
  );
}
