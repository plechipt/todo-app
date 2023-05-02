import React, { useState, useRef } from "react";
import ProfileMenu from "./ProfileMenu";
import PaymentModal from "../Payments/PaymentModal";
import SelectLanguage from "./SelectLanguage";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import PaymentIcon from "@material-ui/icons/Payment";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "#1976D2",
  },
  logo: {
    flexGrow: 1,
  },
}));

const Navbar = ({ user, darkMode, setDarkMode }) => {
  const MOBILE_MARGIN = 50;
  const DESKTOP_MARGIN = 100;

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const profileMenuRef = useRef();
  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar
        style={{ marginBottom: matches ? DESKTOP_MARGIN : MOBILE_MARGIN }}
        className={classes.appBar}
        position="static"
      >
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>
            Todo List
          </Typography>
          {user ? (
            <>
              <SelectLanguage />
              <IconButton
                onClick={() => setDarkMode((prevMode) => !prevMode)}
                aria-label="dark mode toggle"
                color="inherit"
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton
                onClick={() => setPaymentModalIsOpen(() => true)}
                aria-label="dark mode toggle"
                color="inherit"
              >
                <PaymentIcon />
              </IconButton>
              <IconButton
                onClick={() => setProfileMenuIsOpen(true)}
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <PaymentModal
                closePaymentModal={() => setPaymentModalIsOpen(false)}
                paymentModalIsOpen={paymentModalIsOpen}
              />
              <ProfileMenu
                closeProfileMenu={() => setProfileMenuIsOpen(false)}
                anchorEl={profileMenuRef.current}
                isOpen={profileMenuIsOpen}
              />
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
