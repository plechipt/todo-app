import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  paginationContainer: {
    justifyContent: "center",
    position: "absolute",
  },
  pagination: {
    color: "white",
  },
}));

const Paginator = ({ todosPerPage, totalTodos, handlePaginationChange }) => {
  const MOBILE_MARGIN = 20;
  const DESKTOP_MARGIN = 100;

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const totalPages = Math.ceil(totalTodos / todosPerPage);

  return (
    <Grid
      style={{ bottom: matches ? DESKTOP_MARGIN : MOBILE_MARGIN }}
      className={classes.paginationContainer}
      container
    >
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
