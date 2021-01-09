import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { TODO_CREATE_MUTATION } from "./Api/todo/todo";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  createContainer: {
    justifyContent: "center",
  },
  submitButton: {
    marginTop: 25,
    marginBottom: 15,
  },
}));

const CreateForm = () => {
  const classes = useStyles();
  const [createTodo] = useMutation(TODO_CREATE_MUTATION);
  const [content, setContent] = useState("");

  const handleOnCreate = async (e) => {
    e.preventDefault();

    await createTodo({
      variables: {
        content,
      },
    });

    window.location.reload(); // Reset page
  };

  return (
    <div className="create-container">
      <Grid className={classes.createContainer} container>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <form onSubmit={handleOnCreate}>
            <TextField
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={classes.createField}
              label="Create Todo"
              fullWidth
              inputProps={{
                maxLength: 68,
              }}
            />
            <Button
              type="submit"
              className={classes.submitButton}
              variant="contained"
              size="large"
              color="primary"
            >
              Create
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateForm;
