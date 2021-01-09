import React, { useState, useEffect } from "react";

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

const Todo = ({ content, completed: completedTodo }) => {
  const classes = useStyles();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(completedTodo);
  }, [completedTodo]);

  return (
    <Grid className={classes.todoContainer} container>
      <Grid className={classes.item} item xs={11} sm={8} md={6} lg={4}>
        <Paper disabled={true} className={classes.paper}>
          <Typography
            onClick={() => setCompleted(!completed)}
            className={completed ? classes.completed : classes.notCompleted}
          >
            {content}
          </Typography>
          <div className={classes.iconsContainer}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Todo;
