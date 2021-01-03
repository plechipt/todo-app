import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  createField: {
    marginBottom: 25,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
  },
}));

const Todo = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid justify="center" alignItems="center" container spacing={3}>
        <Grid item xs={8}>
          <TextField
            className={classes.createField}
            label="Create Todo"
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Todo;
