import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  createField: {
    display: "flex",
    marginBottom: 25,
  },
  submitButton: {
    marginLeft: 20,
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
          <Box display="flex" p={1}>
            <Box p={1} flexGrow={1}>
              <TextField
                className={classes.createField}
                label="Create Todo"
                fullWidth
                inputProps={{
                  maxLength: 70,
                }}
              />
            </Box>
            <Box p={1}>
              <Button
                className={classes.submitButton}
                variant="contained"
                size="large"
                color="primary"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid justify="center" alignItems="center" container spacing={3}>
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
