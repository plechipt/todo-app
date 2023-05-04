import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

const MOBILE_MARGIN = 20;
const DESKTOP_MARGIN = 100;

const useStyles = makeStyles((theme) => ({
  paginationContainer: {
    justifyContent: "center",
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      bottom: MOBILE_MARGIN,
    },
    [theme.breakpoints.up("sm")]: {
      bottom: DESKTOP_MARGIN,
    },
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
