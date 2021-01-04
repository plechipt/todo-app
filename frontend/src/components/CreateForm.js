import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  submitButton: {
    marginTop: 25,
    marginBottom: 40,
  },
}));

const CreateForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid justify="center" alignItems="center" container spacing={3}>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <TextField
            className={classes.createField}
            label="Create Todo"
            fullWidth
          />
          <Button
            className={classes.submitButton}
            variant="contained"
            size="large"
            color="primary"
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateForm;
