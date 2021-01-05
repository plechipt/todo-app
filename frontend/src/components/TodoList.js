import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  todoContainer: {
    justifyContent: "center",
  },
  paginationContainer: {
    justifyContent: "center",
    position: "absolute",
    bottom: 50,
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    wordBreak: "break-word",
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
      <Grid className={classes.todoContainer} container>
        <Grid className={classes.item} item xs={11} sm={8} md={6} lg={4}>
          <Paper className={classes.paper}>
            <Typography className={classes.content}>Run today</Typography>
            <div>
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
      <Grid className={classes.paginationContainer} container>
        <Grid item>
          <Pagination size="large" count={10} color="primary" />
        </Grid>
      </Grid>
    </div>
  );
};

export default TodoList;
