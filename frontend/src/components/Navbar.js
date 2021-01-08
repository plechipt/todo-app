import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

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

  const handleOnRedirect = (path) => {
    history.push(path);
  };

  console.log(user);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>
            Todo
          </Typography>
          {user ? (
            <Button color="inherit">Logout</Button>
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
