import React, { useContext } from "react";
import Cookies from "js-cookie";
import { LanguageContext } from "../Contexts/LanguageContext";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const ProfileMenu = ({ closeProfileMenu, anchorEl, isOpen }) => {
  const { englishSelected } = useContext(LanguageContext);

  const handleOnLogout = async () => {
    Cookies.remove("token");
    sessionStorage.setItem("isAnonymous", false);
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
