import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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
    padding: theme.spacing(2),
  },
  content: {
    //textDecoration: "line-through",
    fontSize: 16,
    wordBreak: "break-word",
  },
}));

const TodoList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.todoContainer} container spacing={2}>
        <Grid className={classes.item} item xs={11} sm={8} md={6} lg={4}>
          <Paper className={classes.paper}>
            <Typography wrap className={classes.content}>
              xs=12
            </Typography>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Paper>
          <Paper className={classes.paper}>
            <Typography
              component="div"
              display="inline"
              className={classes.content}
            >
              mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
            </Typography>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Paper>
          <Paper className={classes.paper}>
            <Typography className={classes.content}>xs=12</Typography>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Paper>
          <Paper className={classes.paper}>
            <Typography className={classes.content}>xs=12</Typography>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Paper>
          <Paper className={classes.paper}>
            <Typography className={classes.content}>xs=12</Typography>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Paper>
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
