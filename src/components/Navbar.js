import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { UserContext } from "./Contexts/UserContext";
import { USER_DELETE_TOKENS_MUTATION } from "./Api/resolvers/user";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

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

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  const [deleteTokens] = useMutation(USER_DELETE_TOKENS_MUTATION);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
          {true ? (
            <>
              <IconButton
                onClick={() => setDarkMode((prevMode) => !prevMode)}
                aria-label="dark mode toggle"
                color="inherit"
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
                open={open}
                id="menu-appbar"
                keepMounted
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem onClick={handleOnLogout}>Logout</MenuItem>
              </Menu>
            </>
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
