import React, { useState, useRef, useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LanguageIcon from "@material-ui/icons/Translate";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  language: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));

const SelectLanguage = () => {
  const classes = useStyles();
  const { englishSelected, setEnglishSelected } = useContext(LanguageContext);

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef();

  const handleItemClick = (value) => {
    setIsOpen(false);
    setEnglishSelected(value);
  };

  return (
    <div>
      <Button
        ref={selectRef}
        onClick={() => setIsOpen(true)}
        aria-owns={"language-menu"}
        color="inherit"
        aria-haspopup="true"
        data-ga-event-category="header"
        data-ga-event-action="language"
      >
        <LanguageIcon />
        <span className={classes.language}>
          {englishSelected ? "English" : "Czech"}
        </span>
        <ExpandMoreIcon fontSize="small" />
      </Button>
      <Menu
        onClose={() => setIsOpen(false)}
        anchorEl={selectRef.current}
        open={isOpen}
        id="simple-menu"
        keepMounted
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleItemClick(true)}>English</MenuItem>
        <MenuItem onClick={() => handleItemClick(false)}>Czech</MenuItem>
      </Menu>
    </div>
  );
};

export default SelectLanguage;
