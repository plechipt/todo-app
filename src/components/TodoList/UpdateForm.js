import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  updateForm: {
    marginTop: 25,
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 25,
    spacing: theme.spacing(2),
  },
  formButton: {
    background: "#1976D2",
    "&:hover": {
      background: "#1976D2",
    },
  },
  cancelButton: {
    marginLeft: 20,
  },
}));

const UpdateForm = ({ todo }) => {
  const classes = useStyles();

  console.log(todo);

  return (
    <div className={classes.updateForm}>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <form>
            <TextField
              id="update-form"
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 68,
              }}
            />
            <div className={classes.buttonsContainer}>
              <Button
                className={classes.formButton}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
              <Button
                className={`${classes.formButton} ${classes.cancelButton}`}
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateForm;
