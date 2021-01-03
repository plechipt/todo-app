import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  todoContainer: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  content: {
    //textDecoration: "line-through",
    fontSize: 16,
  },
}));

const TodoList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.todoContainer} container spacing={2}>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <Typography className={classes.content}>xs=12</Typography>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default TodoList;
