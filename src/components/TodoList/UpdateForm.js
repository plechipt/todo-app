import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { UpdateModeContext } from "../Contexts/UpdateModeContext";
import { TODO_UPDATE_MUTATION } from "../Api/resolvers/todo/todo";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  updateForm: {
    marginTop: 25,
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 25,
    spacing: theme.spacing(2),
  },
  formButton: {
    background: "#1976D2",
    "&:hover": {
      background: "#1976D2",
    },
  },
  cancelButton: {
    marginLeft: 20,
  },
}));

const UpdateForm = ({ todo }) => {
  const classes = useStyles();
  const {
    todo: { id, content },
  } = todo;

  const [newContent, setNewContent] = useState("");
  const [contentDidntChange, setContentDidntChange] = useState(false);

  const { turnOffUpdateMode } = useContext(UpdateModeContext);
  const [updateTodo] = useMutation(TODO_UPDATE_MUTATION);

  useEffect(() => {
    setNewContent(content);
  }, [content]);

  const handleOnUpdate = async (e) => {
    e.preventDefault();

    if (content === newContent) {
      setContentDidntChange(true);
    } else {
      await updateTodo({ variables: { id, newContent } });
      turnOffUpdateMode();
    }
  };

  return (
    <div className={classes.updateForm}>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <form onSubmit={handleOnUpdate}>
            <TextField
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              error={contentDidntChange ? true : false}
              helperText={contentDidntChange ? "Please change content" : ""}
              label={contentDidntChange ? "Error" : "Update Todo"}
              id="update-form"
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 68,
              }}
            />
            <div className={classes.buttonsContainer}>
              <Button
                type="submit"
                className={classes.formButton}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
              <Button
                onClick={() => turnOffUpdateMode()}
                className={`${classes.formButton} ${classes.cancelButton}`}
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateForm;
