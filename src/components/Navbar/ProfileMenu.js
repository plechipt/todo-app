import React from "react";
import { useMutation } from "@apollo/client";
import { USER_DELETE_TOKENS_MUTATION } from "../Api/resolvers/user";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const ProfileMenu = ({ closeProfileMenu, anchorEl, isOpen }) => {
  const [deleteTokens] = useMutation(USER_DELETE_TOKENS_MUTATION);

  const handleOnLogout = async () => {
    await deleteTokens();
    window.location.reload(); // Reset page
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
      <MenuItem onClick={handleOnLogout}>Logout</MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
