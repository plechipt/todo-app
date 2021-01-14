import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import {
  TODO_DELETE_MUTATION,
  TODO_TOGGLE_COMPLETED_MUTATION,
  TODO_SET_COMPLETED_MUTATION,
} from "../Api/resolvers/todo/todo";
import { UpdateModeContext } from "../Contexts/UpdateModeContext";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  todoContainer: {
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    wordBreak: "break-word",
    padding: theme.spacing(2),
  },
  completed: {
    textDecoration: "line-through",
    cursor: "pointer",
  },
  notCompleted: {
    cursor: "pointer",
  },
  iconsContainer: {
    display: "flex",
    marginLeft: 15,
  },
}));

const Todo = ({ id, content, completed: isCompleted }) => {
  const classes = useStyles();

  const [completed, setCompleted] = useState(false);
  const { toggleUpdateMode } = useContext(UpdateModeContext);

  const [deleteTodo] = useMutation(TODO_DELETE_MUTATION);
  const [setCompletedTodo] = useMutation(TODO_SET_COMPLETED_MUTATION);
  const [toggleCompleted] = useMutation(TODO_TOGGLE_COMPLETED_MUTATION);

  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  const handleOnToggleCompleted = async () => {
    setCompleted(!completed);
    await toggleCompleted({ variables: { id } });
  };

  const handleOnDelete = async () => {
    await deleteTodo({ variables: { id } });
    window.location.reload(); // Reset page
  };

  return (
    <Grid className={classes.todoContainer} container>
      <Grid className={classes.item} item xs={11} sm={8} md={6} lg={4}>
        <Paper disabled={true} className={classes.paper}>
          <Typography
            onClick={handleOnToggleCompleted}
            className={completed ? classes.completed : classes.notCompleted}
          >
            {content}
          </Typography>
          <div className={classes.iconsContainer}>
            <IconButton onClick={() => toggleUpdateMode(id)} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleOnDelete} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Todo;
