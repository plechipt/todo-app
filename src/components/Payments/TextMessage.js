import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../Contexts/MessageContext";

import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const TextMessage = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [messageObject, setMessageObject] = useState({
    title: "Test title",
    content: "Test content",
  });

  const {
    messageValue: { message },
  } = useContext(MessageContext);

  useEffect(() => {
    setOpen(true);

    if (message === "success") {
      setMessageObject({
        title: "Success!",
        content: "Thanks for supporting this website!",
      });
    } else if (message === "error") {
      setMessageObject({
        title: "Error!",
        content: "Sorry something went wrong",
      });
    }
  }, [message]);

  return (
    <div>
      <div className={classes.root}>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>{messageObject.title}</AlertTitle>
            {messageObject.content}
          </Alert>
        </Collapse>
        <Button
          disabled={open}
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          Re-open
        </Button>
      </div>
    </div>
  );
};

export default TextMessage;
