import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../Contexts/MessageContext";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Alert, AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {},
  },
  messageContainer: {
    justifyContent: "center",
    marginTop: theme.spacing(-5),
    marginBottom: theme.spacing(7.5),
  },
}));

const TextMessage = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [messageObject, setMessageObject] = useState({
    title: "Success!",
    content: "Test",
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
        content: "Sorry, something went wrong!",
      });
    }
  }, [message]);

  return (
    <div className={classes.root}>
      {typeof message === "string" ? (
        <Grid className={classes.messageContainer} container>
          <Grid item xs={11} sm={8} md={6} lg={4}>
            <Collapse in={open}>
              <Alert
                severity={message}
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
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

export default TextMessage;
