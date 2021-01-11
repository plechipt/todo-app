import React, { useState } from "react";

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

const Paginator = ({ todosPerPage, totalTodos, handlePaginationChange }) => {
  const classes = useStyles();
  const totalPages = Math.ceil(totalTodos / todosPerPage);

  return (
    <Grid className={classes.paginationContainer} container>
      <Grid item>
        <Pagination
          onChange={handlePaginationChange}
          className={classes.pagination}
          size="large"
          count={totalPages}
          color={"primary"}
        />
      </Grid>
    </Grid>
  );
};

export default Paginator;
