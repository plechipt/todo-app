import React from "react";

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

  return (
    <div className={classes.root}>
      <Grid className={classes.createContainer} container>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <TextField
            className={classes.createField}
            label="Create Todo"
            fullWidth
            inputProps={{
              maxLength: 80,
            }}
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
