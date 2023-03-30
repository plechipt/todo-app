import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LanguageContext } from "../Contexts/LanguageContext";
import { useMutation } from "@apollo/client";
import { USER_DELETE_TOKENS_MUTATION } from "../Api/resolvers/user";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const ProfileMenu = ({ closeProfileMenu, anchorEl, isOpen }) => {
  const history = useHistory();
  const { englishSelected } = useContext(LanguageContext);
  const [deleteTokens] = useMutation(USER_DELETE_TOKENS_MUTATION);

  const handleOnLogout = async () => {
    await deleteTokens();
    sessionStorage.setItem("isAnonymous", false);
    history.go(0);
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
