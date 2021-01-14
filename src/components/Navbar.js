import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { UserContext } from "./Contexts/UserContext";
import { USER_DELETE_TOKENS_MUTATION } from "./Api/resolvers/user";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 100,
  },
  appBar: {
    background: "#1976D2",
  },
  logo: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  const [deleteTokens] = useMutation(USER_DELETE_TOKENS_MUTATION);

  const handleOnRedirect = (path) => {
    history.push(path);
  };

  const handleOnLogout = async () => {
    await deleteTokens();
    window.location.reload(); // Reset page
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>
            Todo List
          </Typography>
          {user ? (
            <Button onClick={handleOnLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <>
              <Button
                onClick={() => handleOnRedirect("/login")}
                color="inherit"
              >
                Login
              </Button>
              <Button
                onClick={() => handleOnRedirect("/register")}
                color="inherit"
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
