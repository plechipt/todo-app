import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Contexts/LanguageContext";
import { useMutation } from "@apollo/client";
import { UpdateModeContext } from "../Contexts/UpdateModeContext";
import { TODO_UPDATE_MUTATION } from "../Api/resolvers/todo/todo";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "flex",
    justifyContent: "center",
  },
  updateForm: {
    marginTop: theme.spacing(2),
  },
  buttonsContainer: {
    marginTop: 25,
    spacing: theme.spacing(2),
  },
  cancelButton: {
    marginLeft: 15,
  },
}));

const UpdateForm = ({ todo }) => {
  const classes = useStyles();
  const {
    todo: { id, content },
  } = todo;

  const [newContent, setNewContent] = useState("");
  const [contentDidntChange, setContentDidntChange] = useState(false);

  const { englishSelected } = useContext(LanguageContext);
  const { setUpdateMode } = useContext(UpdateModeContext);
  const [updateTodo, { loading: updateLoading }] =
    useMutation(TODO_UPDATE_MUTATION);

  useEffect(() => {
    setNewContent(content);
  }, [content]);

  const handleOnUpdate = async (e) => {
    e.preventDefault();

    if (content === newContent) {
      setContentDidntChange(true);
    } else {
      await updateTodo({ variables: { id, newContent } });
      setUpdateMode(false);
    }
  };

  return (
    <div>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <form onSubmit={handleOnUpdate}>
            <TextField
              className={classes.updateForm}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              error={contentDidntChange ? true : false}
              helperText={
                englishSelected
                  ? contentDidntChange
                    ? "Please change content"
                    : ""
                  : contentDidntChange
                  ? "Prosím změnte obsah"
                  : ""
              }
              label={
                englishSelected
                  ? contentDidntChange
                    ? "Error"
                    : "Update Todo"
                  : contentDidntChange
                  ? "Error"
                  : "Změnit Úkol"
              }
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
                disabled={updateLoading}
                variant="contained"
                color="primary"
              >
                {englishSelected ? "Update" : "Změnit"}
              </Button>
              <Button
                onClick={() => setUpdateMode(false)}
                disabled={updateLoading}
                className={classes.cancelButton}
                variant="contained"
                color="primary"
              >
                {englishSelected ? "Cancel" : "Zrušit"}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateForm;
