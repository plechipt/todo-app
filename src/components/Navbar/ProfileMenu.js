import React, { useContext } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { LanguageContext } from "../Contexts/LanguageContext";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const ProfileMenu = ({ closeProfileMenu, anchorEl, isOpen }) => {
  const client = useApolloClient();
  const history = useHistory();
  const { englishSelected } = useContext(LanguageContext);

  const handleOnLogout = async () => {
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <Menu
      onClose={closeProfileMenu}
      open={isOpen}
      anchorEl={anchorEl}
      id="menu-appbar"
      keepMounted
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem onClick={handleOnLogout}>
        {englishSelected ? "Logout" : "Odhlásit se"}
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
