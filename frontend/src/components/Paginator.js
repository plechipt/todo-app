import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  paginationContainer: {
    justifyContent: "center",
    position: "absolute",
    bottom: 50,
  },
}));

const Paginator = () => {
  const classes = useStyles();

  return (
    <div className="pagination-container">
      <Grid className={classes.paginationContainer} container>
        <Grid item>
          <Pagination size="large" count={10} color="primary" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Paginator;
