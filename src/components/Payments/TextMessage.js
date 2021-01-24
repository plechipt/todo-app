import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";
import { useHistory } from "react-router-dom";
import { MessageContext } from "../Contexts/MessageContext";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Alert, AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
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
  const history = useHistory();

  const [open, setOpen] = React.useState(true);
  const [messageObject, setMessageObject] = useState({});

  const { message } = useContext(MessageContext);
  const { englishSelected } = useContext(LanguageContext);

  useEffect(() => {
    setOpen(true);

    if (message === "success") {
      setMessageObject({
        title: englishSelected ? "Success!" : "Úspěch!",
        content: englishSelected
          ? "Thanks for supporting this website!"
          : "Děkujeme za podpoření naší stránky!",
      });
    } else if (message === "error") {
      setMessageObject({
        title: "Error!",
        content: englishSelected
          ? "Sorry, something went wrong!"
          : "Promiňte, došlo k chybě!",
      });
    }
  }, [message, englishSelected]);

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
                    onClick={() => {
                      setOpen(false);
                      history.push("/");
                    }}
                    aria-label="close"
                    color="inherit"
                    size="small"
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
