import React, { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { TODO_CREATE_MUTATION } from "./Api/resolvers/todo/todo";

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
    background: "#1976D2",
    "&:hover": {
      background: "#1976D2",
    },
  },
}));

const CreateForm = () => {
  const classes = useStyles();
  const client = useApolloClient();
  const [createTodo, { loading }] = useMutation(TODO_CREATE_MUTATION);

  const [content, setContent] = useState("");
  const [contentIsFilled, setContentIsFilled] = useState(true);

  const handleOnCreate = async (e) => {
    e.preventDefault();

    if (content === "") {
      setContentIsFilled(false);
    } else {
      await createTodo({
        variables: {
          content,
        },
      });
      client.resetStore();
      setContent("");
    }
  };

  return (
    <div className="create-container">
      <Grid className={classes.createContainer} container>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <form onSubmit={handleOnCreate}>
            <TextField
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              className={classes.createField}
              error={contentIsFilled ? false : true}
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
              color="primary"
              size="large"
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
