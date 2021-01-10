import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  paginationContainer: {
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
  },
  pagination: {
    color: "white",
  },
}));

const Paginator = () => {
  const classes = useStyles();

  return (
    <div className="pagination-container">
      <Grid className={classes.paginationContainer} container>
        <Grid item>
          <Pagination
            className={classes.pagination}
            size="large"
            count={10}
            color={"primary"}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Paginator;
