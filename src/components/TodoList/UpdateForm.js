import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  updateForm: {
    marginTop: 25,
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

const UpdateForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.updateForm}>
      <form>
        <TextField id="update-form" variant="outlined" fullWidth />
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
            marginLeft={"10"}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
